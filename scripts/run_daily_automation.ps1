<#
.SYNOPSIS
  AlgoPulse Master Autonomous Daily Runner
  Executes daily curriculum generation, zero-defect verification, 3-platform parallel submissions via Chrome CDP,
  knowledge base synchronization, and segregated GitHub PR generation and merge commits.
#>

param(
    [string]$Date,
    [switch]$Fast,
    [int]$MaxDays = 1
)

$ErrorActionPreference = 'Continue'
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
Set-Location $repoRoot

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$logDir = Join-Path $repoRoot "logs"
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir | Out-Null }
$runLog = Join-Path $logDir ("automation_" + (Get-Date -Format "yyyyMMdd_HHmmss") + ".log")

Write-Output "[$timestamp] Starting AlgoPulse Autonomous CP Pipeline..." | Tee-Object -FilePath $runLog -Append

# 1. Ensure Chrome CDP (Port 9222) is active
Write-Output "Checking Chrome CDP on port 9222..." | Tee-Object -FilePath $runLog -Append
try {
    $cdpTest = Invoke-WebRequest -Uri "http://127.0.0.1:9222/json/version" -TimeoutSec 3 -UseBasicParsing -ErrorAction Stop
    Write-Output "[OK] Chrome CDP is already listening on port 9222." | Tee-Object -FilePath $runLog -Append
} catch {
    Write-Output "Chrome CDP will be automatically launched by the submission runner." | Tee-Object -FilePath $runLog -Append
}

# 2. Build Autonomous CLI Arguments
$nodeArgs = @('src/cli/autonomous.js')
if ($Date) {
    $nodeArgs += @('--date', $Date)
}
if ($Fast) {
    $nodeArgs += '--fast'
}
if ($MaxDays -gt 0) {
    $nodeArgs += @('--max-days', $MaxDays.ToString())
}

# 3. Execute Continuous Autonomous Daemon
$cmdStr = $nodeArgs -join ' '
Write-Output "Executing: node $cmdStr" | Tee-Object -FilePath $runLog -Append
& node $nodeArgs 2>&1 | Tee-Object -FilePath $runLog -Append

$exitCode = $LASTEXITCODE
$endTimestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
Write-Output "[$endTimestamp] AlgoPulse Pipeline finished with exit code $exitCode." | Tee-Object -FilePath $runLog -Append
exit $exitCode
