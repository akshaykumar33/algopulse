<#
.SYNOPSIS
  Registers (or updates) the daily "CP Daily Practice" reminder in Windows Task Scheduler.

.DESCRIPTION
  Runs practice/remind.ps1 every day at -Time: builds the day's set, starts the studio
  if needed, and shows a toast with an "Open studio" button. Runs as the current user,
  only when logged on, with no elevation. Re-run with a different -Time to change it;
  run with -Remove to uninstall.

.EXAMPLE
  npm run remind:install -- -Time 18:30
.EXAMPLE
  npm run remind:install -- -Remove
#>
param(
    [string]$Time = '12:00',
    [switch]$Remove
)

$ErrorActionPreference = 'Stop'
$taskName = 'CP Daily Practice'

if ($Remove) {
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue
    Write-Output "Removed the '$taskName' reminder."
    return
}

$at = [datetime]::ParseExact($Time, 'HH:mm', $null)
$script = Join-Path $PSScriptRoot 'remind.ps1'
$action = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument "-NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File `"$script`""
$trigger = New-ScheduledTaskTrigger -Daily -At $at
# Catch up if the PC was asleep at reminder time.
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries

Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings `
    -Description 'AlgoPulse: build the daily practice set and show a reminder toast.' -Force | Out-Null

Write-Output "Daily reminder set for $($at.ToString('HH:mm')). Test it now with: npm run remind"
