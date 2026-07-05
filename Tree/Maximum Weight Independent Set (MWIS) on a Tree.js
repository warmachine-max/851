/**
 * Helper to build adjacency list
 */
function buildAdjacencyList(n, edges) {
    const adj = Array.from({ length: n + 1 }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }
    return adj;
}

/**
 * Calculates Maximum Weight Independent Set on a Tree
 */
function solveTreeIndependentSet(n, values, edges) {
    const adj = buildAdjacencyList(n, edges);
    console.log("Adjacency List:", adj);
    const MOD = 1000000007n;

    const dp = Array.from({ length: n + 1 }, () => [0, 0]);
    const ways = Array.from({ length: n + 1 }, () => [1n, 1n]);

    function dfs(u, p) {
        dp[u][1] = values[u]; 
        dp[u][0] = 0;         

        for (const v of adj[u]) {
            if (v === p) continue;
            dfs(v, u);

            // CASE 1: INCLUDING NODE U (Must exclude children)
            dp[u][1] += dp[v][0];
            ways[u][1] = (ways[u][1] * ways[v][0]) % MOD;

            // CASE 2: EXCLUDING NODE U (Pick best from children)
            if (dp[v][1] > dp[v][0]) {
                dp[u][0] += dp[v][1];
                ways[u][0] = (ways[u][0] * ways[v][1]) % MOD;
            } else if (dp[v][0] > dp[v][1]) {
                dp[u][0] += dp[v][0];
                ways[u][0] = (ways[u][0] * ways[v][0]) % MOD;
            } else if(dp[v][0] === dp[v][1]) {
                dp[u][0] += dp[v][0]; 
                ways[u][0] = (ways[u][0] * (ways[v][0] + ways[v][1])) % MOD;
            }
        }
    }

    dfs(1, -1);

    let finalMax, finalWays;
    if (dp[1][1] > dp[1][0]) {
        finalMax = dp[1][1];
        finalWays = ways[1][1];
    } else if (dp[1][0] > dp[1][1]) {
        finalMax = dp[1][0];
        finalWays = ways[1][0];
    } else {
        finalMax = dp[1][1];
        finalWays = (ways[1][0] + ways[1][1]) % MOD;
    }

    console.log("DP Table (Include, Exclude):");
    for (let i = 1; i <= n; i++) {
        console.log(`Node ${i}: Include = ${dp[i][1]} (Ways: ${ways[i][1]}), Exclude = ${dp[i][0]} (Ways: ${ways[i][0]})`);
    }
    return { maxSum: finalMax, totalWays: finalWays.toString() };
}

// --- RUNNING THE TEST ---

const n = 7;
// values[0] is padding for 1-based indexing
const nodeValues = [0, 10, 5, 5, 2, 3, 2, 3]; 
const edgeList = [
    [1, 2], [1, 3], // Root to children
    [2, 4], [2, 5], // Child 2 to grandchildren
    [3, 6], [3, 7]  // Child 3 to grandchildren
];

const result = solveTreeIndependentSet(n, nodeValues, edgeList);

console.log("--- Tree Result ---");
console.log("Maximum Subset Sum:", result.maxSum);
console.log("Number of Ways:", result.totalWays);

  //          (10)
  //          [1]  <-- Root
  //         /   \
  //       /       \
  //     (5)       (5)
  //     [2]       [3]
  //    /   \     /   \
  //  (2)   (3) (2)   (3)
  //  [4]   [5] [6]   [7]