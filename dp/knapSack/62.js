function knapsack(W, val, wt) {
    let n = wt.length;
    let dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));
    // dp[i][j] explanation:
    // The maximum value that can be attained with a knapsack capacity of j using the first i items.

    // Build table dp[][] in bottom-up manner
    for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= W; j++) {

            // If there is no item or the knapsack's capacity is 0
            if (i === 0 || j === 0)
                dp[i][j] = 0;
            else {
                let pick = 0;

                // Pick ith item if it does not exceed the capacity of knapsack
                if (wt[i - 1] <= j) pick = val[i - 1] + dp[i - 1][j - wt[i - 1]];
                   
                // Don't pick the ith item
                let notPick = dp[i - 1][j];

                dp[i][j] = Math.max(pick, notPick);
            }
        }
    }
    return dp[n][W];
}

// Driver code
let val = [1, 2, 3];
let wt = [4, 5, 1];
let W = 4;

console.log(knapsack(W, val, wt));
