function maxSubarraySum(arr, m, k) {
    const n = arr.length;
    
    // 1. Create a 2D array: dp[k + 1][n + 1]
    // dp[j][i] = max sum using j subarrays within the first i elements
    let dp = Array.from({ length: k + 1 }, () => new Array(n + 1).fill(0));

    // 2. Prefix Sums for O(1) range queries
    let prefixSum = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        prefixSum[i] = prefixSum[i - 1] + arr[i - 1];
    }

    // 3. The "Sensible" Loops: Outer loop is K (number of segments)
    for (let j = 1; j <= k; j++) {
        // i starts from j * m because you need space for 'j' segments of size 'm'
        for (let i = j * m; i <= n; i++) {
            
            // The "Pick" logic:
            // Current segment sum: prefixSum[i] - prefixSum[i - m]
            // PLUS the best we did with (j-1) segments ending at or before (i-m)
            let pick = (prefixSum[i] - prefixSum[i - m]) + dp[j - 1][i - m];
            
            // The "Skip" logic:
            // Just take the best result we had at the previous index for the same 'j'
            let skip = dp[j][i - 1];

            dp[j][i] = Math.max(pick, skip);
        }
    }

    return dp[k][n];
}

// Quick Test
const arr = [8, 10, -5, -8, 1, 10, 10, 11];
console.log(maxSubarraySum(arr, 2, 3)); // Expected: 50