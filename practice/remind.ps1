param(
    [switch]$Force
)

$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSScriptRoot
Set-Location $repo

$date = Get-Date -Format 'yyyy-MM-dd'
$dayDir = Join-Path $PSScriptRoot "days\$date"
$marker = Join-Path $dayDir '.done'

# If today's practice set has already completed and shipped, skip silently unless -Force
if (-not $Force -and (Test-Path $marker)) {
    exit 0
}

$log = Join-Path $PSScriptRoot 'remind.log'


# 1. Fetch today's multi-platform problem set (Codeforces, LeetCode, CodeChef)
try {
    Write-Output "[$date] Fetching multi-platform daily practice set..." | Out-File -FilePath $log -Append
    node "$PSScriptRoot\pick.js" --date $date --platform all *>> $log
} catch {
    Add-Content $log "[$date] pick failed: $_"
}

# 2. Automatically generate reference solutions and sample tests
try {
    Write-Output "[$date] Solving daily practice set..." | Out-File -FilePath $log -Append
    node "$PSScriptRoot\solve.js" --date $date *>> $log
} catch {
    Add-Content $log "[$date] solve failed: $_"
}

# 3. Ensure all explanation docs, intuitions, and Mermaid diagrams are generated
try {
    Write-Output "[$date] Generating explanations..." | Out-File -FilePath $log -Append
    node "$PSScriptRoot\explain.js" --date $date *>> $log
} catch {
    Add-Content $log "[$date] explain generation failed: $_"
}

# 4. Verify solutions, create branch, push, open PR, and auto-merge if green
try {
    Write-Output "[$date] Running automated ship and PR pipeline..." | Out-File -FilePath $log -Append
    node "$PSScriptRoot\ship.js" --date $date *>> $log
} catch {
    Add-Content $log "[$date] ship failed: $_"
}

$dayDir = Join-Path $PSScriptRoot "days\$date"
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
    Start-Process -FilePath 'node' -ArgumentList 'visualizer/server.js' -WorkingDirectory $repo -WindowStyle Hidden
}

# 4. Streak, from the same store the dashboard uses.
$streak = 0
try {
    $streak = [int](node -e "process.stdout.write(String(require('./practice/lib/store').streaks().current))")
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

# Mark today's practice set as completed so subsequent unlock/wake triggers don't re-run
if (Test-Path $dayDir) {
    Set-Content -Path $marker -Value (Get-Date -Format 'o')
}

