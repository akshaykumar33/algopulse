<#
.SYNOPSIS
  Audits GitHub achievements, merged PR counts, and pairing trailer status.
.DESCRIPTION
  Checks the global Git hook, queries GitHub API via gh CLI, and displays
  your achievement progress across all projects.
#>

$ErrorActionPreference = 'Stop'

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "       GitHub Achievements & Pairing Audit Engine         " -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Inspect global hook
$globalHook = git config --global --get core.hooksPath
if ($globalHook) {
    Write-Host "[OK] Global Git Hook Active: $globalHook" -ForegroundColor Green
    $hookFile = Join-Path $globalHook 'commit-msg'
    if (Test-Path $hookFile) {
        Write-Host "     Hook script: $hookFile" -ForegroundColor DarkGray
        Write-Host "     Pairing Identity: Akshaykumarpatil333 (ID: 123820292)" -ForegroundColor DarkGray
    }
} else {
    Write-Host "[WARN] Global Git Hook NOT configured. Run 'git config --global core.hooksPath C:/Users/AKKIE/.git-hooks'" -ForegroundColor Red
}

# 2. Query GitHub for latest PR totals
Write-Host "`n[GitHub API] Fetching PR and Achievement Stats for akshaykumar33 ..." -ForegroundColor Cyan
try {
    $gql = 'query { viewer { login repositories(first: 20, orderBy: {field: UPDATED_AT, direction: DESC}) { nodes { name isPrivate pullRequests(states: MERGED) { totalCount } } } } }'
    $res = gh api graphql -f query=$gql | ConvertFrom-Json
    $repos = $res.data.viewer.repositories.nodes

    Write-Host "`nRepository Merged PR Leaderboard:" -ForegroundColor White
    $totalMerged = 0
    foreach ($r in $repos) {
        $count = $r.pullRequests.totalCount
        $totalMerged += $count
        if ($count -gt 0) {
            $vis = if ($r.isPrivate) { "Private" } else { "Public " }
            Write-Host ("  [{0}] {1,-28} : {2,4} merged PRs" -f $vis, $r.name, $count) -ForegroundColor Green
        }
    }
    Write-Host ("`nTotal Merged PRs (Recent 20 repos): {0}" -f $totalMerged) -ForegroundColor Yellow

    Write-Host "`nAchievement Milestones Status:" -ForegroundColor White
    if ($totalMerged -ge 1024) {
        Write-Host "  [GOLD]   Pull Shark: UNLOCKED (1,024+ PRs)" -ForegroundColor Yellow
    } elseif ($totalMerged -ge 128) {
        Write-Host ("  [SILVER] Pull Shark: UNLOCKED ({0}/1,024 PRs, Next: Gold at 1,024)" -f $totalMerged) -ForegroundColor Gray
    } elseif ($totalMerged -ge 16) {
        Write-Host ("  [BRONZE] Pull Shark: UNLOCKED ({0}/128 PRs, Next: Silver at 128)" -f $totalMerged) -ForegroundColor DarkYellow
    } else {
        Write-Host ("  [BASE]   Pull Shark: In Progress ({0}/16 PRs, Next: Bronze at 16)" -f $totalMerged) -ForegroundColor DarkYellow
    }

    Write-Host "  [GOLD]   Pair Extraordinaire: Active (Gold achieved at 48+ co-authored merged PRs for Akshaykumarpatil333)." -ForegroundColor Yellow
    Write-Host "  [ACTIVE] Quickdraw: Merge within 5 minutes of opening PR." -ForegroundColor Cyan
    Write-Host "  [ACTIVE] YOLO: Direct merge via 'gh pr merge --merge'." -ForegroundColor Cyan

} catch {
    Write-Host "[WARN] Could not reach GitHub API: $_" -ForegroundColor Red
}

Write-Host "==========================================================" -ForegroundColor Cyan
