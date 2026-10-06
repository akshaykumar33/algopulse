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
    [string]$Time = '00:00',
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

# Triggers: 1) Daily schedule, 2) User logon
$triggerDaily = New-ScheduledTaskTrigger -Daily -At $at
$triggerLogon = New-ScheduledTaskTrigger -AtLogOn -User $env:USERNAME
$triggers = @($triggerDaily, $triggerLogon)

# Catch up if PC was asleep, wake if supported, run on battery
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -WakeToRun

Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $triggers -Settings $settings `
    -Description 'AlgoPulse: build the daily practice set and show a reminder toast.' -Force | Out-Null

# Add SessionUnlock trigger via Task Scheduler COM API (triggers when laptop lid is opened / screen unlocked)
try {
    $ts = New-Object -ComObject Schedule.Service
    $ts.Connect()
    $root = $ts.GetFolder('\')
    $task = $root.GetTask($taskName)
    $def = $task.Definition
    $unlockTrigger = $def.Triggers.Create(11) # TASK_TRIGGER_SESSION_STATE_CHANGE
    $unlockTrigger.StateChange = 8           # TASK_SESSION_UNLOCK
    $unlockTrigger.UserId = "$env:USERDOMAIN\$env:USERNAME"
    $unlockTrigger.Enabled = $true
    $def.Settings.WakeToRun = $true
    $def.Settings.StartWhenAvailable = $true
    $root.RegisterTaskDefinition($taskName, $def, 6, $null, $null, 3) | Out-Null
} catch {
    Write-Warning "Could not register SessionUnlock trigger: $_"
}

Write-Output "Daily reminder configured for $($at.ToString('HH:mm')) (with wake/logon/unlock catch-up). Test it now with: npm run remind"

