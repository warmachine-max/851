function maxSumWithFlippedSigns(nums) {
    if (nums.length === 0) return 0;

    const n = nums.length;
    // dp[i][0] = Best sum ending at i with a (+) sign
    // dp[i][1] = Best sum ending at i with a (-) sign
    const dp = Array.from({ length: n }, () => [0, 0]);

    // BASE CASE: The First Number
    dp[0][0] = nums[0];          // Enforced: Start as positive
    dp[0][1] = -Infinity;        // Illegal: Cannot start with a flip

    for (let i = 1; i < n; i++) {
        const val = nums[i];

        // 1. Positive State (+):
        // Can follow a (+) or a (-) state. 
        // We take the max of previous states and add current value.
        dp[i][0] = val + Math.max(dp[i - 1][0], dp[i - 1][1]);

        // 2. Negative State (-):
        // RESTRICTION: Must follow a (+) state.
        // We take the previous positive sum and subtract current value.
        dp[i][1] = -val + dp[i - 1][0];
    }

    console.log("DP Table:", dp);

    // Final answer is the maximum of the two possible ending states
    return Math.max(dp[n - 1][0], dp[n - 1][1]);
}

// Example: [-1, -2, -3]
const result = maxSumWithFlippedSigns([-1, -2, -3,-8]);
console.log("The correct logical answer is:", result); // Output: 0