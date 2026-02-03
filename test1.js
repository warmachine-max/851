/**
 * Optimized Partitioning using Traditional 2D Memoization
 */
function solveMinimizeMaxSum(arr, k) {
    const n = arr.length;
    
    // 1. Build Subarray Max Table (Your Overlapping Logic)
    let maxTable = Array.from({ length: n }, () => Array(n).fill(0));
    for (let i = 0; i < n; i++) maxTable[i][i] = arr[i];
    
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            let j = i + len - 1;
            maxTable[i][j] = Math.max(maxTable[i][j - 1], maxTable[i + 1][j]);
        }
    }

    // 2. Initialize 2D Memo Array
    // Rows: current index (0 to n)
    // Cols: partitions remaining (0 to k)
    const memo = Array.from({ length: n + 1 }, () => Array(k + 1).fill(-1));

    function dp(index, kRemaining) {
        // Base Case: If we've already calculated this state, return it immediately
        if (memo[index][kRemaining] !== -1) {
            return memo[index][kRemaining];
        }

        // Base Case: Only 1 partition left - it must cover all remaining elements
        if (kRemaining === 1) {
            return maxTable[index][n - 1];
        }

        let minSum = Infinity;

        // Phase 2: Constrained Search (i <= n - kRemaining)
        for (let i = index; i <= n - kRemaining; i++) {
            // G_current is the max of the current subarray [index...i]
            const currentMax = maxTable[index][i];
            
            // Recurse for the next part
            const res = dp(i + 1, kRemaining - 1);
            
            if (res !== Infinity) {
                minSum = Math.min(minSum, currentMax + res);
            }
        }

        // Save the result in the 2D array before returning
        memo[index][kRemaining] = minSum;
        return minSum;
    }

    return dp(0, k);
}

// --- Verification ---
const arr = [10, 2, 3, 15, 20, 1, 100]
const result = solveMinimizeMaxSum(arr, 3);
console.log("Final Result:", result); // Output: 9