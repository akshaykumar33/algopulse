param(
    [string]$Time = '00:00',
    [switch]$Remove
)

$ErrorActionPreference = 'Stop'
$taskName = 'AlgoPulse Daily Autonomous Engine'

if ($Remove) {
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue
    Write-Output "Removed the '$taskName' scheduled task."
    return
}

$at = [datetime]::ParseExact($Time, 'HH:mm', $null)
$script = Join-Path $PSScriptRoot 'run_daily_automation.ps1'
$action = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument "-NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File `"$script`""

$triggerDaily = New-ScheduledTaskTrigger -Daily -At $at
$triggerLogon = New-ScheduledTaskTrigger -AtLogOn -User $env:USERNAME
$triggers = @($triggerDaily, $triggerLogon)

$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -WakeToRun

Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $triggers -Settings $settings -Description 'AlgoPulse: Continuous Autonomous Competitive Programming Daily Engine' -Force | Out-Null

try {
    $ts = New-Object -ComObject Schedule.Service
    $ts.Connect()
    $root = $ts.GetFolder('\')
    $task = $root.GetTask($taskName)
    $def = $task.Definition
    $unlockTrigger = $def.Triggers.Create(11)
    $unlockTrigger.StateChange = 8
    $unlockTrigger.UserId = "$env:USERDOMAIN\$env:USERNAME"
    $unlockTrigger.Enabled = $true
    $def.Settings.WakeToRun = $true
    $def.Settings.StartWhenAvailable = $true
    $root.RegisterTaskDefinition($taskName, $def, 6, $null, $null, 3) | Out-Null
} catch {
    Write-Warning "Could not register SessionUnlock trigger: $_"
}

Write-Output "Successfully installed '$taskName'!"
Write-Output "Scheduled Daily Trigger: $($at.ToString('HH:mm')) (12:00 AM)"
Write-Output "Startup Trigger: On User Logon ($env:USERNAME)"
Write-Output "Catch-up: Starts immediately if PC was powered off during scheduled time."
