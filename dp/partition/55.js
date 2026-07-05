/**
 * Problem: Minimum Removals to Partition into "Good" Subarrays
 * Logic: Find Max Kept Elements, then subtract from Total.
 * * @param {number[]} b - The input array (1-indexed conceptually)
 * @param {number} n - Size of the array
 * @returns {number} - Minimum elements to remove
 */
function minRemovals(b, n) {
    // dp[i] stores the maximum elements we can keep from the first i elements
    // Initialize with 0. size n + 1 for 1-based indexing convenience.
    let dp = new Array(n + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        // Step 1: Carry forward the previous best result (Skip/Remove current element)
        dp[i] = Math.max(dp[i], dp[i - 1]);

        // Step 2: Try to START a "Good" subarray at index i
        // Current value is b[i-1] because of JS 0-based array indexing
        let val = b[i - 1]; 
        let target = i + val;

        if (target <= n) {
            // Formula: dp[target] = max(existing_best, best_before_start + current_subarray_size)
            // Subarray size is (val + 1)
            dp[target] = Math.max(dp[target], dp[i - 1] + (val + 1));
        }
    }

    console.log("DP Array (Max Kept):", dp);
    // Result is total elements minus maximum elements kept
    return n - dp[n];
}

// Example Walkthrough:
const arr = [3 , 5 , 6 , 8,1];
console.log("Minimum Removals:", minRemovals(arr, arr.length)); 
// Output: 1 (Removes b[0] to make the rest perfect)