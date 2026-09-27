$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSScriptRoot
Set-Location $repo

$date = Get-Date -Format 'yyyy-MM-dd'
$log = Join-Path $PSScriptRoot 'remind.log'

# 1. Fetch today's multi-platform problem set (Codeforces, LeetCode, CodeChef)
try {
    Write-Output "[$date] Fetching multi-platform daily practice set..." | Out-File -FilePath $log -Append
    node "$PSScriptRoot\pick.js" --date $date --platform all *>> $log
} catch {
    Add-Content $log "[$date] pick failed: $_"
}

# 2. Ensure all explanation docs, intuitions, and Mermaid diagrams are generated
try {
    node "$PSScriptRoot\explain.js" --date $date *>> $log
} catch {
    Add-Content $log "[$date] explain generation failed: $_"
}

$dayDir = Join-Path $PSScriptRoot "days\$date"
$readme = Join-Path $dayDir 'README.md'
$count = 0
if (Test-Path "$dayDir\set.json") {
    $count = (Get-Content "$dayDir\set.json" -Raw | ConvertFrom-Json).problems.Count
}
$hasSolutions = (Get-ChildItem "$dayDir\solutions" -Filter *.js -ErrorAction SilentlyContinue).Count -gt 0
$hasExplanations = (Get-ChildItem "$dayDir\explanations" -Filter *.md -ErrorAction SilentlyContinue).Count -gt 0

$title = "CP Daily Practice (06:00 AM) - $date"
if ($count -gt 0) {
    $body = "$count problems are ready with full explanations, intuitions, and diagrams. Solve them in solutions/ or attempts/."
} else {
    $body = 'Could not build today''s set - check practice/remind.log'
}

[Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime] | Out-Null
[Windows.Data.Xml.Dom.XmlDocument, Windows.Data.Xml.Dom.XmlDocument, ContentType = WindowsRuntime] | Out-Null
$xml = New-Object Windows.Data.Xml.Dom.XmlDocument
$xml.LoadXml("<toast scenario='reminder'><visual><binding template='ToastGeneric'><text>$([Security.SecurityElement]::Escape($title))</text><text>$([Security.SecurityElement]::Escape($body))</text></binding></visual><actions><action content='Dismiss' arguments='dismiss' activationType='system'/></actions></toast>")
$appId = '{1AC14E77-02E7-4E5D-B744-2EB1AE5198B7}\WindowsPowerShell\v1.0\powershell.exe'
[Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier($appId).Show([Windows.UI.Notifications.ToastNotification]::new($xml))

if (Test-Path $readme) { Start-Process $readme }
