/**
 * PROBLEM: Zig-Zag Sequence with Missing Values (-1)
 * TIME COMPLEXITY: O(n * m) - Optimized via Prefix Sums
 * SPACE COMPLEXITY: O(n * m) - Can be optimized to O(m) using rolling arrays
 * * LOGIC: 
 * We track two states for each position:
 * 1. dp[i][j]: Valid sequences of length 'i' ending in 'j' where the last move was a DECREASE (b[i-1] > b[i]).
 * 2. dp2[i][j]: Valid sequences of length 'i' ending in 'j' where the last move was an INCREASE (b[i-1] < b[i]).
 */

const MOD = 1000000007n;

function solveZigZag(n, m, b) {
    // 1-indexed DP tables to match the problem's natural counting
    // BigInt64Array is used for faster execution and lower memory overhead in V8
    const dp = Array.from({ length: n + 1 }, () => new BigInt64Array(m + 1).fill(0n));
    const dp2 = Array.from({ length: n + 1 }, () => new BigInt64Array(m + 1).fill(0n));
    
    // Prefix arrays allow us to calculate Range Sums in O(1) instead of O(m)
    const prefix = Array.from({ length: n + 1 }, () => new BigInt64Array(m + 1).fill(0n));
    const prefix2 = Array.from({ length: n + 1 }, () => new BigInt64Array(m + 1).fill(0n));

    // --- BASE CASE: Initialize Position 1 ---
    if (b[1] === -1) {
        // If the first value is a wildcard, every value from 1 to M is a valid start
        for (let j = 1; j <= m; j++) {
            dp[1][j] = 1n;
            dp2[1][j] = 1n;
        }
    } else {
        // If the first value is fixed, only that specific "Column" is active
        const g = b[1];
        dp[1][g] = 1n;
        dp2[1][g] = 1n;
    }

    // Pre-calculate Row 1 Prefix Sums for the next row to use
    // below for loop is like  we can go prefix [i][1 to m] as well as prefix2 [i][1 to m] 
    // each of prefix [i][1 to m] as well as prefix2 [i][1 to m]  can go to 1  to m respectively
    for (let j = 1; j <= m; j++) {
        prefix[1][j] = (prefix[1][j - 1] + dp[1][j]) % MOD;
        prefix2[1][j] = (prefix2[1][j - 1] + dp2[1][j]) % MOD;
    }

    // --- MAIN DP TRANSITION (Row 2 to N) ---
    for (let i = 2; i <= n; i++) {
        
        // CASE 1: Current position is a Wildcard (-1)
        // We must calculate the possibilities for EVERY value of j (1 to M)
        if (b[i] === -1) {
            for (let j = 1; j <= m; j++) {
                if (i % 2 !== 0) { 
                    // ODD INDEX: Pattern is b[i-1] < b[i] > b[i+1]
                    // Current step must be a Down-Trend (b[i-1] > b[i]) or Up-Trend (b[i-1] < b[i])
                    
                    // DOWN-TREND logic: Current 'j' must be smaller than previous 'k' (k > j)
                    dp[i][j] = (prefix[i - 1][m] - prefix[i - 1][j] + MOD) % MOD;
                    
                    // UP-TREND logic: Current 'j' must be larger than previous 'k' (k < j)
                    dp2[i][j] = prefix2[i - 1][j - 1];
                } else { 
                    // EVEN INDEX: Opposite parity logic
                    dp[i][j] = prefix[i - 1][j - 1];
                    dp2[i][j] = (prefix2[i - 1][m] - prefix2[i - 1][j] + MOD) % MOD;
                }
            }
        } 
        // CASE 2: Current position is a FIXED Value (g)
        // Only one "Cell" in this row needs to be calculated; others remain zero.
        else {
            const g = b[i];
            if (i % 2 !== 0) {
                // Calculation for the specific value 'g' using prefix sums from previous row
                dp[i][g] = (prefix[i - 1][m] - prefix[i - 1][g] + MOD) % MOD;
                dp2[i][g] = prefix2[i - 1][g - 1];
            } else {
                dp[i][g] = prefix[i - 1][g - 1];
                dp2[i][g] = (prefix2[i - 1][m] - prefix2[i - 1][g] + MOD) % MOD;
            }
        }

        // --- UPDATE PREFIX SUMS ---
        // Crucial step: Once row 'i' is full, we create the "Report" for row 'i+1'
        for (let j = 1; j <= m; j++) {
            prefix[i][j] = (prefix[i][j - 1] + dp[i][j]) % MOD;
            prefix2[i][j] = (prefix2[i][j - 1] + dp2[i][j]) % MOD;
        }
    }

    // --- FINAL AGGREGATION ---
    let ans = 0n;
    if (b[n] === -1) {
        // If the last element is -1, sum every possible valid ending
        for (let j = 1; j <= m; j++) {
            ans = (ans + dp[n][j] + dp2[n][j]) % MOD;
        }
    } else {
        // If fixed, just sum the two directions for that specific value
        const g = b[n];
        ans = (dp[n][g] + dp2[n][g]) % MOD;
    }

    return ans.toString();
}