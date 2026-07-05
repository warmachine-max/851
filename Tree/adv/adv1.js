let solve = (n, q, rawBossesFromInput, queries) => {
    // 1. Fixed: Corrected to square brackets for array access
    let adj = Array.from({ length: n + 1 }, () => []);
    for (let i = 0; i < rawBossesFromInput.length; i++) {
        let bose = rawBossesFromInput[i];
        adj[bose].push(i + 2);
        adj[i + 2].push(bose);
    }

    let maxLogVal = 17;
    let up = Array.from({ length: n + 1 }, () => new Array(maxLogVal).fill(0));

    function dfs(node, parent) {
        up[node][0] = parent;

        // Fill out the powers of 2 for the current node
        for (let i = 1; i < maxLogVal; i++) {
            if (up[node][i - 1] !== 0 && up[up[node][i - 1]][i - 1] !== 0) {
                up[node][i] = up[up[node][i - 1]][i - 1];
            } else {
                up[node][i] = 0;
            }
        }

        // Fixed: Moved this OUTSIDE the power-of-2 loop
        for (let neighbor of adj[node]) {
            if (neighbor === parent) {
                continue;
            }
            dfs(neighbor, node);
        }
    }

    function getKthAncestor(node, k) {
        let remainingK = k;
        let j = maxLogVal - 1; // Fixed: Start index at 16, not 17

        while (remainingK > 0 && j >= 0) {
            let currPow = Math.pow(2, j);
            if (remainingK >= currPow) {
                node = up[node][j]; // Fixed: Move the actual node up the tree
                remainingK -= currPow;
                
                if (node === 0) {
                    return -1;
                }
            }
            j--;
        }
        return node;
    }

    // Run preprocessing
    dfs(1, 0);

    // Process and print queries
    for (let query of queries) {
        let [currentNode, k] = query;
        let ans = getKthAncestor(currentNode, k);
        console.log(`Node: ${currentNode}, K: ${k} -> Boss: ${ans}`);
    }
};

// --- Test Data Execution ---
const n = 5;
const q = 3;
const rawBossesFromInput = [1, 1, 3, 3]; 
const queries = [
    [4, 1], // Should be 3
    [4, 2], // Should be 1
    [4, 3]  // Should be -1
];

solve(n, q, rawBossesFromInput, queries);