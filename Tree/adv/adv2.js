function solveCompanyQueriesII_Reinvented(n, q, rawBossesFromInput, queries) {
    // ==========================================
    // 1. DATA STRUCTURE SETUP & PREPROCESSING
    // ==========================================
    const maxLogVal = 17; // 2^16 handles deep trees up to 65,536 nodes smoothly
    const adj = Array.from({ length: n + 1 }, () => []);
    const depth = new Array(n + 1).fill(0);
    const up = Array.from({ length: n + 1 }, () => new Array(maxLogVal).fill(0));

    // Build the tree adjacency list
    for (let i = 0; i < rawBossesFromInput.length; i++) {
        let boss = rawBossesFromInput[i];
        let employee = i + 2; // Input values represent bosses for Employees 2, 3, 4...
        adj[boss].push(employee);
        adj[employee].push(boss); 
    }

    // DFS to precalculate depths and the 2^i binary lifting ancestor table
    function dfs(node, parent, currentDepth) {
        up[node][0] = parent;       // Immediate boss
        depth[node] = currentDepth; // Level in the company tree

        for (let i = 1; i < maxLogVal; i++) {
            let halfWay = up[node][i - 1];
            if (halfWay !== 0) {
                up[node][i] = up[halfWay][i - 1]; // Leapfrog trick
            } else {
                up[node][i] = 0;
            }
        }

        for (let neighbor of adj[node]) {
            if (neighbor !== parent) {
                dfs(neighbor, node, currentDepth + 1);
            }
        }
    }

    // Run DFS starting from the General Director (Node 1, Parent 0, Depth 0)
    dfs(1, 0, 0);

    // ==========================================
    // 2. THE REINVENTED LCA ENGINE
    // ==========================================
    function getLCA(u, v) {
        
        // --- PHASE 1: BRING THEM TO THE SAME FLOOR ---
        if (depth[u] < depth[v]) {
            let temp = u; u = v; v = temp;
        }

        let diff = depth[u] - depth[v];
        let j = maxLogVal - 1;

        while (diff > 0 && j >= 0) {
            let jumpSize = Math.pow(2, j);
            if (diff >= jumpSize) {
                u = up[u][j];
                diff -= jumpSize;
            }
            j--;
        }

        // Quick check: If they are already standing on the same node, it's a match!
        if (u === v) return u;

        // --- PHASE 2: YOUR OPTIMIZED RANGE STEPPING LOGIC ---
        
        // Stage 1: Find the exact power-of-two ceiling where they share a boss
        let upperBound = maxLogVal - 1;
        for (let i = 0; i < maxLogVal; i++) {
            if (up[u][i] === up[v][i]) {
                upperBound = i;
                break; // Break instantly! We found the ceiling (e.g., 64)
            }
        }

        // Stage 2: Start right at the highest safe power (upperBound - 1) and count DOWN
        // This beautifully fits your breakdown (e.g., checks 32, then 16, 8, 4, 2, 1)
        let i = upperBound - 1;
        while (i >= 0) {
            // If ancestors are DIFFERENT, it's 100% safe to append this jump piece
            if (up[u][i] !== up[v][i]) {
                u = up[u][i]; 
                v = up[v][i]; 
            }
            i--; // Transition smoothly to the next smaller component
        }

        // Both nodes are now perfectly positioned exactly 1 floor below the common boss
        return up[u][0];
    }

    // ==========================================
    // 3. EXECUTE QUERIES AND DISPLAY OUTPUT
    // ==========================================
    const results = [];
    for (let query of queries) {
        let [u, v] = query;
        let ans = getLCA(u, v);
        results.push(ans);
        console.log(`LCA of Employee ${u} & Employee ${v} -> Boss ${ans}`);
    }
    return results;
}

// ==========================================
// VERIFICATION TEST CASE
// ==========================================
// Constructing a sample company tree
const n = 5; 
const q = 3;
const rawBossesFromInput = [1, 1, 3, 3]; 
const queries = [
    [4, 5], // Shared boss should be 3
    [4, 2], // Shared boss should be 1
    [2, 3]  // Shared boss should be 1
];

console.log("Executing your custom-engineered binary lifting structure:");
solveCompanyQueriesII_Reinvented(n, q, rawBossesFromInput, queries);