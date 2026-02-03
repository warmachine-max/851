let countPartitionWaysWithLogs = (arr, boundary) => {
    let n = arr.length;

    // 1. Fix: Size it n+1 and fill with 0 so we can add to it
    let dp = new Array(n + 1).fill(0);

    // 2. Fix: The "Earth" - 1 way to partition nothing
    dp[0] = 1;

    for (let i = 1; i <= n; i++) {
        let sum = 0;
        let j = i; // The Scout starts exactly at the current item

        // 3. Fix: The Scout walks back from i to 1
        while (j >= 1) {
            sum += arr[j - 1]; // arr[j-1] is the current element because of 0-indexing

            if (sum <= boundary) {
                dp[i] += dp[j - 1]; // Inherit history from BEFORE this box
                j--;
            } else {
                break; // Boundary hit! Stop the Scout.
            }
        }
    }
    return dp[n];
};

console.log(countPartitionWaysWithLogs([1, 1, 4, 1, 1], 4)); // Should output: 4

// ============================================================
// DRY RUN BOARD: Array [1, 1, 4, 1, 1] | Boundary M = 4
// ============================================================

// STEP 0: Base Case
// dp[0] = 1 
// (Meaning: 1 way to have an empty partition)

// ------------------------------------------------------------
// STEP 1: Index 1 (Value = 1)
// - Scout checks [1]: Sum = 1. Valid!
// - Reach back to dp[0] (1 way).
// - dp[1] = 1
// ------------------------------------------------------------
// STEP 2: Index 2 (Value = 1)
// - Scout checks [1]: Sum = 1. Valid! Reach dp[1] (+1 way)
// - Scout checks [1, 1]: Sum = 2. Valid! Reach dp[0] (+1 way)
// - dp[2] = 1 + 1 = 2
// ------------------------------------------------------------
// STEP 3: Index 3 (Value = 4)
// - Scout checks [4]: Sum = 4. Valid! Reach dp[2] (+2 ways)
// - Scout checks [1, 4]: Sum = 5. TOO HEAVY! (Blocked)
// - dp[3] = 2
// ------------------------------------------------------------
// STEP 4: Index 4 (Value = 1)
// - Scout checks [1]: Sum = 1. Valid! Reach dp[3] (+2 ways)
// - Scout checks [4, 1]: Sum = 5. TOO HEAVY! (Blocked)
// - dp[4] = 2
// ------------------------------------------------------------
// STEP 5: Index 5 (Value = 1)
// - Scout checks [1]: Sum = 1. Valid! Reach dp[4] (+2 ways)
// - Scout checks [1, 1]: Sum = 2. Valid! Reach dp[3] (+2 ways)
// - Scout checks [4, 1, 1]: Sum = 6. TOO HEAVY! (Blocked)
// - dp[5] = 2 + 2 = 4
// ------------------------------------------------------------

// FINAL DP TABLE: [1, 1, 2, 2, 2, 4]
// TOTAL WAYS: 4
// ============================================================