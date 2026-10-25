# Pull Request Sizing & Segregation Rules

1. **Max 50 Changes Per PR (Strict Hard Limit):** Every pull request must contain **no more than 50 changed files**. Never bundle massive, multi-platform or hundreds-of-file changes into a single monolithic PR.
2. **Systematic Segregation:**
   - Segregate changes logically by domain, platform, or cohesive feature batch.
   - For daily competitive programming solutions, split PRs into clean, dedicated batches (e.g., Codeforces batch $\le 50$ files, LeetCode batch $\le 50$ files, CodeChef batch $\le 50$ files, curriculum/tests batch $\le 50$ files).
3. **Branch-First Development:**
   - Never commit directly to `main`.
   - Create focused feature branches: `<type>/<scope>-<slug>`.
4. **Conventional Commits:**
   - Standard format: `<type>(<scope>): <lowercase imperative subject>`.
5. **No AI Attribution:**
   - Zero AI trailers, co-author markers, or watermarks in commit messages, code, or PR bodies.
6. **Owner Merge Approval:**
   - Always present the PR link and checks, and request explicit owner confirmation before any merge.
