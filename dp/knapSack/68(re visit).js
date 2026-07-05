/**
 * @param {number[]} nums - The available coins
 * @param {number} K - Exactly how many coins to pick
 * @param {number} M - The divisor for the sum
 */
function solveStandard3D(nums, K, M) {
    const n = nums.length;
    const maxPossibleSum = nums.reduce((a, b) => a + b, 0);

    // 1. Initialize 3D DP: dp[n + 1][K + 1][maxPossibleSum + 1]
    // dp[i][k][s] = number of ways using first 'i' coins to pick 'k' coins for sum 's'
    const dp = Array.from({ length: n + 1 }, () => 
        Array.from({ length: K + 1 }, () => 
            new Array(maxPossibleSum + 1).fill(0)
        )
    );

    // Base Case: 0 coins picked from 0 elements gives a sum of 0
    dp[0][0][0] = 1;

    // 2. Fill the table using only incrementing loops
    for (let i = 1; i <= n; i++) {
        let coinValue = nums[i - 1]; // Current coin we are considering

        for (let k = 0; k <= K; k++) {
            for (let s = 0; s <= maxPossibleSum; s++) {
                
                // Choice 1: Don't include the current coin
                // The ways remain the same as what we had with i-1 coins
                dp[i][k][s] = dp[i - 1][k][s];

                // Choice 2: Include the current coin (if k > 0 and sum allows)
                if (k > 0 && s >= coinValue) {
                    dp[i][k][s] += dp[i - 1][k - 1][s - coinValue];
                }
            }
        }
    }

    // 3. YOUR PATH: The final filter loop
    let totalWays = 0;
    for (let s = 0; s <= maxPossibleSum; s++) {
        if (s % M === 0) {
            totalWays += dp[n][K][s];
        }
    }

    return totalWays;
}

// --- Test Case ---
const coins = [1, 2, 3, 4]; 
const K = 2; // Pick exactly 2
const M = 3; // Sum divisible by 3
console.log("Total ways:", solveStandard3D(coins, K, M));


/**
 * Optimized 2D DP for Exactly K elements and Sum % M == 0
 */
function solveOptimized2D(nums, K, M) {
    const n = nums.length;
    const maxPossibleSum = nums.reduce((a, b) => a + b, 0);

    // Only 2D now: [K + 1][maxPossibleSum + 1]
    // Saves MASSIVE amounts of memory compared to the 3D version.
    let dp = Array.from({ length: K + 1 }, () => new Array(maxPossibleSum + 1).fill(0));

    dp[0][0] = 1;

    for (let i = 0; i < n; i++) {
        let coinValue = nums[i];

        // BACKWARD loops are the key to using only one 2D table
        for (let k = K; k >= 1; k--) {
            for (let s = maxPossibleSum; s >= coinValue; s--) {
                // Current ways = existing ways + ways using (k-1) coins for (s - value)
                dp[k][s] += dp[k - 1][s - coinValue];
            }
        }
    }

    // Final filter
    let totalWays = 0;
    for (let s = 0; s <= maxPossibleSum; s++) {
        if (s % M === 0) totalWays += dp[K][s];
    }

    return totalWays;
}