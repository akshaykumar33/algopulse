param(
    [Parameter(Position=0)]
    [string]$Action = 'Start'
)

$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSScriptRoot
$vizPort = 3333
$ttsPort = 3334

function Get-PortProcess([int]$port) {
    try {
        $conn = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
        if ($conn) {
            return Get-Process -Id $conn.OwningProcess -ErrorAction SilentlyContinue
        }
    } catch {}
    return $null
}

if ($Action -eq 'Status') {
    $vp = Get-PortProcess $vizPort
    $tp = Get-PortProcess $ttsPort
    Write-Output "--- AlgoPulse App Services ---"
    if ($vp) {
        Write-Output "  [OK] Visualizer Studio: ACTIVE (PID: $($vp.Id), Port: $vizPort) -> http://localhost:$vizPort"
    } else {
        Write-Output "  [OFF] Visualizer Studio: STOPPED (Port: $vizPort)"
    }
    if ($tp) {
        Write-Output "  [OK] Neural TTS Server: ACTIVE (PID: $($tp.Id), Port: $ttsPort) -> http://localhost:$ttsPort"
    } else {
        Write-Output "  [OFF] Neural TTS Server: STOPPED (Port: $ttsPort)"
    }
    exit 0
}

if ($Action -eq 'Stop' -or $Action -eq 'Restart') {
    $vp = Get-PortProcess $vizPort
    if ($vp) {
        Stop-Process -Id $vp.Id -Force -ErrorAction SilentlyContinue
        Write-Output "  Stopped Visualizer Studio (PID: $($vp.Id))"
    }
    $tp = Get-PortProcess $ttsPort
    if ($tp) {
        Stop-Process -Id $tp.Id -Force -ErrorAction SilentlyContinue
        Write-Output "  Stopped Neural TTS Server (PID: $($tp.Id))"
    }
    if ($Action -eq 'Stop') {
        exit 0
    }
}

# Start or Restart
$tp = Get-PortProcess $ttsPort
if (-not $tp) {
    $python = Join-Path $repo 'tools\tts\.venv\Scripts\python.exe'
    if (Test-Path $python) {
        $p = Start-Process -FilePath $python -ArgumentList 'tools/tts/server.py' -WorkingDirectory $repo -WindowStyle Hidden -PassThru
        Start-Sleep -Milliseconds 600
        Write-Output "  [OK] Started Neural TTS Server (PID: $($p.Id), Port: $ttsPort)"
    } else {
        Write-Warning "Python TTS venv not found at tools/tts/.venv"
    }
} else {
    Write-Output "  [OK] Neural TTS Server already running (PID: $($tp.Id), Port: $ttsPort)"
}

$vp = Get-PortProcess $vizPort
if (-not $vp) {
    $p = Start-Process -FilePath 'node' -ArgumentList 'apps/visualizer/server.js' -WorkingDirectory $repo -WindowStyle Hidden -PassThru
    Start-Sleep -Milliseconds 600
    Write-Output "  [OK] Started Visualizer Studio (PID: $($p.Id), Port: $vizPort) -> http://localhost:$vizPort"
} else {
    Write-Output "  [OK] Visualizer Studio already running (PID: $($vp.Id), Port: $vizPort)"
}
