param (
    [string]$File
)

if ($File) {
    node "$PSScriptRoot\run.js" $File
} else {
    node "$PSScriptRoot\run.js"
}
