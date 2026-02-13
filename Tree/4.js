/**
 * @param {number} n - Number of nodes
 * @param {number[][]} edges - Array of [u, v] pairs
 * @param {number[]} values - Node values (0-indexed)
 * @return {number}
 */
var maxSubtreeSum = function(n, edges, values) {
    const adj = Array.from({ length: n + 1 }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }

    let maxSum = -Infinity;

    function dfs(curr, prev) {
        // Using BigInt for high-precision sums
        let currentSubtreeSum = BigInt(values[curr - 1]);

        for (const neighbor of adj[curr]) {
            if (neighbor === prev) continue; 

            // Accumulate the sum from the recursive child call
            currentSubtreeSum += dfs(neighbor, curr);
        }

        // Global update: check if this specific subtree is the largest found so far
        if (maxSum === -Infinity || currentSubtreeSum > maxSum) {
            maxSum = currentSubtreeSum;
        }

        return currentSubtreeSum;
    }

    dfs(1, -1);
    return Number(maxSum);
};

// --- TEST CASE ---
/**
 * Tree Structure:
 * 1(val:5)
 * /   \
 * 2(val:2) 3(val:-10)
 * /   \
 * 4(val:20) 5(val:1)
 * * Subtrees:
 * Node 2: Sum = 2
 * Node 4: Sum = 20
 * Node 5: Sum = 1
 * Node 3: Sum = -10 + 20 + 1 = 11
 * Node 1: Sum = 5 + 2 + 11 = 18
 * * Result should be 20 (The subtree rooted at Node 4)
 */

const n = 5;
const edges = [[1, 2], [1, 3], [3, 4], [3, 5]];
const values = [5, 2, -10, 20, 1];

console.log("Maximum Subtree Sum:", maxSubtreeSum(n, edges, values)); 
// Output: 20