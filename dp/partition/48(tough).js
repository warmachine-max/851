/**
 * @param {string} s - The input string of digits
 * @param {number} k - The maximum value allowed for any partition
 * @return {number} - Total ways to partition the string
 */
function numberOfWays(s, k) {
    const n = s.length;
    const MOD = 1e9 + 7;
    
    // dp[i] represents the number of ways to partition the prefix s[0...i-1]
    // We use a BigInt array if the counts exceed standard 32-bit limits, 
    // though standard Number with % MOD usually suffices.
    const dp = new Array(n + 1).fill(0);
    
    // Base case: There is 1 way to partition an empty string
    dp[0] = 1;

    for (let i = 1; i <= n; i++) {
        // We look back at most 10-12 digits because K <= 10^9 (10 digits)
        // This keeps our complexity at O(N) rather than O(N^2)
        for (let len = 1; len <= Math.min(i, 11); len++) {
            let start = i - len;
            
            // --- THE "ZERO" WALL ---
            // If the block starts with '0', it's generally invalid 
            // unless the problem explicitly allows '0' as a standalone digit.
            if (s[start] === '0') {
                // If the block is "0", you might count it once if K >= 0,
                // but usually, '0' cannot start a multi-digit number like "05".
                // In most LC-style problems, a leading zero means the block is invalid.
                continue; 
            }

            // Extract the number and compare with K
            let blockStr = s.substring(start, i);
            let blockValue = Number(blockStr);

            if (blockValue <= k) {
                dp[i] = (dp[i] + dp[start]) % MOD;
            } else {
                // Since we are increasing 'len', once blockValue > k,
                // any longer substring starting at the same point will also be > k.
                break; 
            }
        }
    }

    return dp[n];
}

// Example Test:
// s = "1234", k = 1000
// dp[4] = dp[3] ("123" | "4") + dp[2] ("12" | "34") + dp[1] ("1" | "234")
console.log(numberOfWays("1234", 1000)); // Output: 4