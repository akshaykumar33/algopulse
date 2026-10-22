param (
    [string]$File
)

$runner = Join-Path (Split-Path -Parent $PSScriptRoot) "src\runner\run.js"

if ($File) {
    node $runner $File
} else {
    node $runner
}
