/**
 * Algorithmic Visualizer & Diagram Skillsets
 * Generates rich, syntactically valid Mermaid diagrams and state walkthroughs
 * based on the core algorithmic paradigm and problem metadata.
 */

function detectParadigm(tags = [], name = '') {
  const t = tags.map((x) => x.toLowerCase()).join(' ') + ' ' + name.toLowerCase();

  if (t.includes('binary search')) return 'binary-search';
  if (t.includes('two pointer') || t.includes('two pointers') || t.includes('sliding window')) return 'two-pointers';
  if (t.includes('dp') || t.includes('dynamic programming')) return 'dp';
  if (t.includes('tree') || t.includes('graph') || t.includes('dfs') || t.includes('bfs')) return 'graph';
  if (t.includes('greedy')) return 'greedy';
  if (t.includes('math') || t.includes('number theory')) return 'math';
  if (t.includes('string') || t.includes('strings')) return 'strings';
  return 'general';
}

function generateParadigmFlowchart(paradigm, problem) {
  switch (paradigm) {
    case 'binary-search':
      return `\`\`\`mermaid
flowchart TD
    Start["Initialize Search Space: Low = Min, High = Max"] --> Mid["Compute Mid = Low + (High - Low) / 2"]
    Mid --> Pred{"Predicate: isFeasible(Mid)?"}
    Pred -- Yes --> Save["Record Mid as Candidate Answer"]
    Save --> NarrowLow["Adjust Range: Search Better Feasibility"]
    Pred -- No --> NarrowHigh["Adjust Range: Discard Infeasible Half"]
    NarrowLow --> Check{"Low <= High?"}
    NarrowHigh --> Check
    Check -- Yes --> Mid
    Check -- No --> Return["Return Optimal Verified Answer"]
\`\`\``;

    case 'two-pointers':
      return `\`\`\`mermaid
flowchart LR
    L["Init Left Pointer = 0"] --> Cond{"R < N?"}
    Cond -- Yes --> Expand["Expand Right: Add arr[R] to Window"]
    Expand --> Check{"Window Condition Met?"}
    Check -- No --> Shrink["Shrink Left: Remove arr[L], L++"]
    Shrink --> Check
    Check -- Yes --> Update["Update Global Optimal Metric"]
    Update --> StepR["Increment Right Pointer (R++)"]
    StepR --> Cond
    Cond -- No --> Done["Return Best Metric Result"]
\`\`\``;

    case 'dp':
      return `\`\`\`mermaid
flowchart TD
    Base["Initialize Base Cases: dp[0] or memo cache"] --> Sub["Iterate Over Subproblems i = 1..N"]
    Sub --> Transitions["Evaluate Transitions: dp[i] = optimal(dp[prev] + cost)"]
    Transitions --> StateUpdate["Update State Table / Rolling Buffers"]
    StateUpdate --> BoundCheck{"Subproblems Completed?"}
    BoundCheck -- No --> Sub
    BoundCheck -- Yes --> Result["Extract Optimal Value from dp[Target]"]
\`\`\``;

    case 'graph':
      return `\`\`\`mermaid
flowchart TD
    Start["Initialize Adjacency List & Visited Array"] --> Push["Push Start Node to Queue / Stack"]
    Push --> Loop{"Queue / Stack Empty?"}
    Loop -- No --> Pop["Pop Current Node U"]
    Pop --> Neighbors["Iterate Neighbors V of Node U"]
    Neighbors --> Visited{"V Already Visited?"}
    Visited -- No --> Mark["Mark Visited & Record Edge / Distance"]
    Mark --> PushV["Push V to Queue / Stack"]
    Visited -- Yes --> NextNeighbor["Skip / Check Cycle"]
    PushV --> Loop
    NextNeighbor --> Loop
    Loop -- Yes --> Complete["Return Traversal / Shortest Path Tree"]
\`\`\``;

    case 'greedy':
      return `\`\`\`mermaid
flowchart TD
    Input["Read Problem Parameters: ${problem.name}"] --> Sort["Sort / Prioritize by Local Optimal Metric"]
    Sort --> Iter{"Remaining Elements / Operations?"}
    Iter -- Yes --> LocalPick["Select Local Best Choice (Exchange Argument)"]
    LocalPick --> Invariant["Update Invariant & Resource Count"]
    Invariant --> Iter
    Iter -- No --> Output["Emit Global Optimal Output"]
\`\`\``;

    case 'math':
      return `\`\`\`mermaid
flowchart TD
    A["Parse Input Values"] --> B["Identify Mathematical Invariant / Symmetries"]
    B --> C{"Is Closed-Form Formula Available?"}
    C -- Yes --> D["Compute Direct Formula O(1) or O(log N)"]
    C -- No --> E["Apply Modular Arithmetic / GCD / Factorization"]
    D --> F["Check Integer Bounds (Safe Integer < 2^53 - 1)"]
    E --> F
    F --> G["Emit Verified Result"]
\`\`\``;

    default:
      return `\`\`\`mermaid
flowchart TD
    Start["Read Input Instance: ${problem.name}"] --> Check{"Check Boundary & Base Cases"}
    Check -- Base Case --> FastReturn["Direct O(1) Return"]
    Check -- General --> Process["Execute Core Algorithm Logic"]
    Process --> Update["Update State & Accumulators"]
    Update --> Emit["Buffer Output Result"]
\`\`\``;
  }
}

function generateSequenceWalkthrough(paradigm, problem) {
  return `\`\`\`mermaid
sequenceDiagram
    participant In as Input Data
    participant Engine as Algorithmic Engine (${problem.platform || 'CP'})
    participant State as State Tracker / Invariant
    participant Out as Output Buffer

    In->>Engine: Stream Problem Instance
    Engine->>State: Initialize Boundary Pointers & State
    loop Processing Steps
        Engine->>State: Evaluate Feasibility & Optimal Transition
        State-->>Engine: Updated Invariant / Bound
    end
    Engine->>Out: Append Computed Optimal Result
\`\`\``;
}

module.exports = {
  detectParadigm,
  generateParadigmFlowchart,
  generateSequenceWalkthrough,
};
