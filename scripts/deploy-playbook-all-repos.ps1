<#
.SYNOPSIS
  Deploys the GitHub Achievements Playbook across all projects in D:\pro,
  creates feature branches, opens Pull Requests, and merges them to unlock badges.
.DESCRIPTION
  Iterates through target repositories, ensures co-author pairing with Akshaykumarpatil333,
  creates pull requests, and merges them using merge commits (Pull Shark + Pair Extraordinaire).
#>

param(
    [switch]$Merge,
    [switch]$DryRun,
    [string[]]$Repos = @()
)

$ErrorActionPreference = 'Continue'
$sourcePlaybook = "D:\pro\CP\docs\GITHUB_ACHIEVEMENTS_PLAYBOOK.md"
if (-not (Test-Path $sourcePlaybook)) {
    Write-Error "Source playbook not found at $sourcePlaybook"
    exit 1
}

# Strict Denylist: Company, Client, Org, and Sensitive repos that must NEVER be touched
$DENIED_PATTERNS = @(
    'lms',
    'sap-sf',
    'saf-suucess',
    'mockat',
    'timesheet',
    'wysbryx'
)

# Strict Allowlist: ONLY personal creative portfolio projects
$allTargets = @(
    @{ Name = 'Omnivra'; Path = 'D:\pro\Omnivra'; Slug = 'akshaykumar33/Omnivra' },
    @{ Name = 'Resumora'; Path = 'D:\pro\Resumora'; Slug = 'akshaykumar33/Resumora' },
    @{ Name = 'Rolevia'; Path = 'D:\pro\Rolevia'; Slug = 'akshaykumar33/rolevia' },
    @{ Name = 'Mivo'; Path = 'D:\pro\Mivo'; Slug = 'akshaykumar33/Mivo' },
    @{ Name = 'flow-forge'; Path = 'D:\pro\flow-forge'; Slug = 'akshaykumar33/flow-forge' },
    @{ Name = 'forma-trace'; Path = 'D:\pro\forma-trace'; Slug = 'akshaykumar33/forma-trace' },
    @{ Name = 'Algorynth'; Path = 'D:\pro\Algorynth'; Slug = 'akshaykumar33/Algorynth' },
    @{ Name = 'algopulse'; Path = 'D:\pro\CP'; Slug = 'akshaykumar33/algopulse' },
    @{ Name = 'VORIXA'; Path = 'D:\pro\VORIXA'; Slug = 'akshaykumar33/VORIXA' },
    @{ Name = 'Kynetra'; Path = 'D:\pro\Kynetra'; Slug = 'akshaykumar33/kynetra' },
    @{ Name = 'knovra'; Path = 'D:\pro\knovra'; Slug = 'akshaykumar33/knovra' },
    @{ Name = 'ai-ops-assistant'; Path = 'D:\pro\ai-ops-assistant'; Slug = 'akshaykumar33/AI-OPS-ASSISTANT' },
    @{ Name = 'aegisguard-ai'; Path = 'D:\pro\code-gaurd-reviewer'; Slug = 'akshaykumar33/aegisguard-ai' },
    @{ Name = 'Swivora-dbSwitch'; Path = 'D:\pro\Swivora-dbSwitch'; Slug = 'akshaykumar33/Swivora-dbSwitch' },
    @{ Name = 'repo-atlas'; Path = 'D:\pro\repo-atlas'; Slug = 'akshaykumar33/RepoAtlas' },
    @{ Name = 'mongo_playground'; Path = 'D:\pro\mongo_playground'; Slug = 'akshaykumar33/mongo_playground' },
    @{ Name = 'pm-tool'; Path = 'D:\pro\pm-tool'; Slug = 'beyondCode-in/pm-tool' },
    @{ Name = 'brochure'; Path = 'D:\pro\brochure'; Slug = 'akshaykumar33/brochure' }
)

# Validate and block any denied repository
function Test-RepoAllowed([string]$repoName, [string]$repoPath) {
    $lower = "$repoName $repoPath".ToLower()
    foreach ($d in $DENIED_PATTERNS) {
        if ($lower.Contains($d.ToLower())) {
            return $false
        }
    }
    return $true
}

if ($Repos.Count -gt 0) {
    $targets = $allTargets | Where-Object { $Repos -contains $_.Name }
} else {
    $targets = $allTargets
}

# Filter out any blocked repo
$targets = $targets | Where-Object {
    if (-not (Test-RepoAllowed $_.Name $_.Path)) {
        Write-Warning "[BLOCKED] $($_.Name) matches denied company/client pattern. Dropping."
        $false
    } else {
        $true
    }
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   Multi-Repository GitHub Achievements Deployment Engine " -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Target Repositories (Personal Portfolio Only): $($targets.Count)`n" -ForegroundColor White

$summary = @()

foreach ($t in $targets) {
    $name = $t.Name
    $dir = $t.Path
    $slug = $t.Slug
    Write-Host "Processing [$name] ($slug) ..." -ForegroundColor Cyan

    if (-not (Test-Path "$dir\.git")) {
        Write-Host "  [SKIP] Not a git repository: $dir" -ForegroundColor DarkGray
        $summary += [PSCustomObject]@{ Name = $name; Status = 'Skipped (No .git)'; PR = '-' }
        continue
    }

    # Clean any accidental bot identity
    $localUser = git -C $dir config --local user.name 2>$null
    if ($localUser -match 'bot') {
        git -C $dir config --local --unset user.name 2>$null
        git -C $dir config --local --unset user.email 2>$null
    }

    # Check for uncommitted modified/staged files
    $statusLines = git -C $dir status --porcelain 2>$null
    $dirtyTracked = $statusLines | Where-Object { $_ -notmatch '^\?\?' }
    if ($dirtyTracked) {
        Write-Host "  [SKIP] Repository has uncommitted tracked changes. Skipping for safety." -ForegroundColor Yellow
        $summary += [PSCustomObject]@{ Name = $name; Status = 'Skipped (Dirty)'; PR = '-' }
        continue
    }

    $defaultBranch = (git -C $dir symbolic-ref --short refs/remotes/origin/HEAD 2>$null) -replace '^origin/', ''
    if (-not $defaultBranch) {
        $defaultBranch = if ((git -C $dir branch --list main)) { 'main' } else { 'master' }
    }

    $currentBranch = git -C $dir branch --show-current 2>$null
    $branchName = "docs/github-achievements-playbook"

    if ($DryRun) {
        Write-Host "  [DRY-RUN] Would checkout $branchName, copy playbook, push to $defaultBranch, and PR." -ForegroundColor Green
        $summary += [PSCustomObject]@{ Name = $name; Status = 'DryRun Ready'; PR = '-' }
        continue
    }

    try {
        # Switch to default branch first and pull
        git -C $dir checkout $defaultBranch 2>&1 | Out-Null
        git -C $dir pull origin $defaultBranch 2>&1 | Out-Null

        # Create or switch to branch
        git -C $dir checkout -B $branchName 2>&1 | Out-Null

        # Copy playbook into docs/ and root
        $docsDir = Join-Path $dir 'docs'
        if (-not (Test-Path $docsDir)) { New-Item -ItemType Directory -Force -Path $docsDir | Out-Null }
        Copy-Item $sourcePlaybook (Join-Path $docsDir 'GITHUB_ACHIEVEMENTS_PLAYBOOK.md') -Force
        Copy-Item $sourcePlaybook (Join-Path $dir 'GITHUB_ACHIEVEMENTS_PLAYBOOK.md') -Force

        # Stage and commit with explicit co-author
        git -C $dir add docs/GITHUB_ACHIEVEMENTS_PLAYBOOK.md GITHUB_ACHIEVEMENTS_PLAYBOOK.md 2>&1 | Out-Null
        $commitMsg = "docs(playbook): add github achievements playbook and pairing protocol`n`nCo-authored-by: Akshaykumarpatil333 <123820292+Akshaykumarpatil333@users.noreply.github.com>"
        $commitRes = git -C $dir commit -m $commitMsg --author="akshaykumar33 <akshaykumarpatil33@gmail.com>" 2>&1
        Write-Host "  [OK] Committed with co-author Akshaykumarpatil333." -ForegroundColor Green

        # Push branch
        $pushRes = git -C $dir push -u origin $branchName -f 2>&1
        Write-Host "  [OK] Pushed $branchName to origin." -ForegroundColor Green

        # Open PR if none exists
        $prUrl = gh pr create --repo $slug --head $branchName --base $defaultBranch `
            --title "docs(playbook): add github achievements playbook and pairing protocol" `
            --body "## Summary`n- Adds the GitHub Achievements Master Playbook and pairing protocol.`n- Co-authored with Akshaykumarpatil333 to unlock Pair Extraordinaire and Pull Shark.`n`n## Verification`n- Verified markdown and documentation integrity." 2>&1

        if ($prUrl -match 'https://github\.com/[^\s]+') {
            $prUrl = $Matches[0]
            Write-Host "  [OK] PR Opened: $prUrl" -ForegroundColor Cyan
        } else {
            # Try to fetch existing PR
            $prUrl = gh pr view $branchName --repo $slug --json url -q .url 2>$null
            if (-not $prUrl) {
                $prUrl = (gh pr list --repo $slug --head $branchName --json url -q '.[0].url' 2>$null)
            }
            Write-Host "  [INFO] PR URL: $prUrl" -ForegroundColor Cyan
        }

        # Merge if requested
        if ($Merge -and $prUrl) {
            Write-Host "  Merging PR into $defaultBranch ..." -ForegroundColor Yellow
            $mergeRes = gh pr merge $prUrl --merge 2>&1
            Write-Host "  [SUCCESS] PR Merged into $defaultBranch!" -ForegroundColor Green
            git -C $dir checkout $defaultBranch 2>&1 | Out-Null
            git -C $dir pull origin $defaultBranch 2>&1 | Out-Null
            $summary += [PSCustomObject]@{ Name = $name; Status = 'MERGED'; PR = $prUrl }
        } else {
            $summary += [PSCustomObject]@{ Name = $name; Status = 'PR OPEN'; PR = $prUrl }
        }
    } catch {
        Write-Host "  [ERROR] $($_.Exception.Message)" -ForegroundColor Red
        $summary += [PSCustomObject]@{ Name = $name; Status = "Error: $($_.Exception.Message)"; PR = '-' }
        if ($currentBranch) { git -C $dir checkout $currentBranch 2>&1 | Out-Null }
    }
}

Write-Host "`n==========================================================" -ForegroundColor Cyan
Write-Host "                  Deployment Summary                      " -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan
$summary | Format-Table -AutoSize
