param(
    [switch]$Force
)

$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSScriptRoot
Set-Location $repo
$practiceDir = Join-Path $repo 'practice'

$date = Get-Date -Format 'yyyy-MM-dd'
$dayDir = Join-Path $practiceDir "days\$date"
$marker = Join-Path $dayDir '.done'

# If today's practice set has already completed and shipped, skip silently unless -Force
if (-not $Force -and (Test-Path $marker)) {
    exit 0
}

$logDir = Join-Path $repo 'logs'
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Force -Path $logDir | Out-Null }
$log = Join-Path $logDir 'remind.log'

function Invoke-NodeTask([string]$name, [string]$script, [string[]]$cmdArgs) {
    Write-Output "[$date] $name..." | Out-File -FilePath $log -Append -Encoding utf8
    $prev = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    try {
        & node $script @cmdArgs 2>&1 | Out-File -FilePath $log -Append -Encoding utf8
        return $LASTEXITCODE
    } catch {
        Add-Content $log "[$date] $name exception: $_"
        return 1
    } finally {
        $ErrorActionPreference = $prev
    }
}

# 1. Fetch today's multi-platform problem set (Codeforces, LeetCode, CodeChef)
Invoke-NodeTask "Fetching multi-platform daily practice set" "$practiceDir\cli\pick.js" @('--date', $date, '--platform', 'all') | Out-Null

# 2. Automatically generate reference solutions and sample tests
Invoke-NodeTask "Solving daily practice set" "$practiceDir\cli\solve.js" @('--date', $date) | Out-Null

# 3. Ensure all explanation docs, intuitions, and Mermaid diagrams are generated
Invoke-NodeTask "Generating explanations" "$practiceDir\cli\explain.js" @('--date', $date) | Out-Null

# 4. Verify solutions, create branch, push, open PR, and auto-merge if green
Invoke-NodeTask "Running automated ship and PR pipeline" "$practiceDir\cli\ship.js" @('--date', $date) | Out-Null

$dayDir = Join-Path $practiceDir "days\$date"
$readme = Join-Path $dayDir 'README.md'
$count = 0
if (Test-Path "$dayDir\set.json") {
    $count = (Get-Content "$dayDir\set.json" -Raw | ConvertFrom-Json).problems.Count
}
$hasSolutions = (Get-ChildItem "$dayDir\solutions" -Filter *.js -ErrorAction SilentlyContinue).Count -gt 0
$hasExplanations = (Get-ChildItem "$dayDir\explanations" -Filter *.md -ErrorAction SilentlyContinue).Count -gt 0

# 3. Make sure the studio is running so the toast's "Open studio" button lands somewhere.
$port = 3333
$studioUrl = "http://localhost:$port/#/$date"
if (-not (Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue)) {
    Start-Process -FilePath 'node' -ArgumentList 'apps/visualizer/server.js' -WorkingDirectory $repo -WindowStyle Hidden
}

# 4. Streak, from the same store the dashboard uses.
$streak = 0
try {
    $streak = [int](node -e "process.stdout.write(String(require('./src/lib/store').streaks().current))")
} catch {
    Add-Content $log "[$date] streak lookup failed: $_"
}

$title = "AlgoPulse - Day ready ($date)"
if ($count -gt 0) {
    $body = "$count problems are waiting, each with a story, walkthrough and tests."
    if ($streak -gt 0) { $body += " You're on a $streak-day streak - keep it going!" }
} else {
    $body = 'Could not build today''s set - check practice/remind.log'
}

[Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime] | Out-Null
[Windows.Data.Xml.Dom.XmlDocument, Windows.Data.Xml.Dom.XmlDocument, ContentType = WindowsRuntime] | Out-Null
$e = { param($s) [Security.SecurityElement]::Escape($s) }
$xml = New-Object Windows.Data.Xml.Dom.XmlDocument
$xml.LoadXml("<toast scenario='reminder' activationType='protocol' launch='$(& $e $studioUrl)'><visual><binding template='ToastGeneric'><text>$(& $e $title)</text><text>$(& $e $body)</text></binding></visual><actions><action content='Open studio' activationType='protocol' arguments='$(& $e $studioUrl)'/><action content='Later' arguments='dismiss' activationType='system'/></actions></toast>")
$appId = '{1AC14E77-02E7-4E5D-B744-2EB1AE5198B7}\WindowsPowerShell\v1.0\powershell.exe'
[Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier($appId).Show([Windows.UI.Notifications.ToastNotification]::new($xml))

# Mark today's practice set as completed only if all problems have solutions
if ((Test-Path "$dayDir\set.json") -and $count -gt 0) {
    $solvedCount = (Get-ChildItem "$dayDir\solutions" -Filter *.js -ErrorAction SilentlyContinue).Count
    if ($solvedCount -ge $count) {
        Set-Content -Path $marker -Value (Get-Date -Format 'o')
    }
}

