/**
 * Formal Tree DP Solution: Maximum Weight Independent Set
 * @param {number} n - Number of nodes
 * @param {number[][]} edges - 2D array of edges [u, v]
 * @param {number[]} values - 1-indexed array of node weights
 * @returns {number} Maximum possible non-adjacent sum
 */
function solveTreeDP(n, edges, values) {
    // 1. Initialize the Adjacency List
    const adj = Array.from({ length: n + 1 }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }

    // 2. Initialize the Explicit DP Table: Size (N + 1) x 2
    // dp[i][0] = state for leaving node i
    // dp[i][1] = state for taking node i
    const dp = Array.from({ length: n + 1 }, () => [0, 0]);

    /**
     * Post-Order DFS to populate the DP table bottom-up
     * @param {number} node - Current node being processed
     * @param {number} parent - Parent denotation to prevent cycles
     */
    function dfs(node, parent) {
        // Initialize base states for the current frame
        dp[node][0] = 0;             // Base case for LEAVE
        dp[node][1] = values[node];   // Base case for TAKE (gets its own weight)

        // Traverse through child subtrees
        for (const neighbor of adj[node]) {
            
            // EXCLUDE THE PARENT: Formal guardrail
            if (neighbor === parent) {
                continue;
            }

            // Compute subproblems first (Bottom-Up execution)
            dfs(neighbor, node);

            // --- STATE TRANSITIONS ---
            
            // Rule 1: If we TAKE 'node', children MUST be LEFT behind
            dp[node][1] += dp[neighbor][0];

            // Rule 2: If we LEAVE 'node', we greedily pick the best state of each child
            dp[node][0] += Math.max(dp[neighbor][0], dp[neighbor][1]);
        }
    }

    // 3. Fire up the Tree DP execution from Root (Node 1, Parent 0)
    dfs(1, 0);

    // The global optimal solution is the max of both configurations at the root
    return Math.max(dp[1][0], dp[1][1]);
}

// === EXECUTING THE TEST CASE ===
const n = 4;
const edges = [[1, 2], [2, 3], [3, 4]];
const values = [0, 1000, 100, 1, 100]; // 1-indexed (Node 1=1000, Node 2=100, Node 3=1, Node 4=100)

console.log("Max Tree DP Sum:", solveTreeDP(n, edges, values)); 
// Output: 1100 (Optimal choice selects Node 1 and Node 4)