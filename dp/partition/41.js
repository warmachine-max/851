/**
 * @param {number[]} nums - The input array (0-indexed internally)
 * @param {number} k - Number of partitions
 */
const solvePartitionDP1Based = (nums, k) => {
    const n = nums.length;
    
    // 1. Pre-calculate maxTable: O(N^2)
    // We keep this 0-indexed for easy array access later
    let maxTable = Array.from({ length: n }, () => new Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        let currMax = -Infinity;
        for (let j = i; j < n; j++) {
            currMax = Math.max(currMax, nums[j]);
            maxTable[i][j] = currMax;
        }
    }

    // 0 based indexing for maxTable, but we will use 1-based indexing for dp to match the problem statement
    // 2. DP Table: dp[count_of_elements][partitions]
    // dp[i][k] = first 'i' elements divided into 'k' parts
    let dp = Array.from({ length: n + 1 }, () => new Array(k + 1).fill(Infinity));

    // 3. Base Case: 1 Partition (k = 1)
    for (let i = 1; i <= n; i++) {
        // First 'i' elements = maxTable from index 0 to i-1
        dp[i][1] = maxTable[0][i - 1];
    }

    // 4. Main Transitions
    for (let currentK = 2; currentK <= k; currentK++) {
        for (let i = currentK; i <= n; i++) {
            
            // j is the START of the last partition (1-based)
            // It goes from the current end (i) back to the minimum needed (currentK)
            for (let j = i; j >= currentK; j--) {
                
                // We combine the best result of the (j-1) elements 
                // with the max of the remaining part [j...i]
                // Note: maxTable uses 0-indexing, so we use j-1 and i-1
                let costOfLastPart = maxTable[j - 1][i - 1];
                // j -1 ,,i -1, is because maxTable is 0-indexed, while dp is 1-indexed
                let totalCost = dp[j - 1][currentK - 1] + costOfLastPart;
                
                dp[i][currentK] = Math.min(dp[i][currentK], totalCost);
            }
        }
    }

    return dp[n][k];
};

// --- Test ---
let nums = [3, 8, 1, 3];
let k = 2;
console.log("Min Sum of Maxima (1-based):", solvePartitionDP1Based(nums, k)); 
// Logic: [3] | [8, 1, 3] => 3 + 8 = 11