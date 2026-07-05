/**
 * Problem: Coin Combinations I (Permutations)
 * Logic: dp[sum] = sum of ways to reach (sum - coin) for all coins.
 */

function solveCoinCombinations(n, targetSum, coins) {
    const MOD = 1000000007;
    
    // Initialize DP array with 0s, size targetSum + 1
    const dp = new Array(targetSum + 1).fill(0);

    // Base Case: One way to make sum 0 (using no coins)
    dp[0] = 1;

    // OUTER LOOP: The current sum we are trying to build
    for (let currentSum = 1; currentSum <= targetSum; currentSum++) {
        
        // INNER LOOP: Try every coin for the current sum
        for (let i = 0; i < n; i++) {
            let coinValue = coins[i];

            if (currentSum - coinValue >= 0) {
                // Add the ways to make the remaining sum
                dp[currentSum] = (dp[currentSum] + dp[currentSum - coinValue]) % MOD;
            }
        }
    }
    
    let res  =  dp[targetSum];
    console.log("DP Array:", dp); // Debug: Print the DP array to verify values
    return res;
}

// --- Test Case ---
const n = 6
const x = 4
const coins = [1, 3,  2 , 4 ,2 ,1];

console.log("Total distinct ways to produce sum " + x + ":");
console.log(solveCoinCombinations(n, x, coins)); 
