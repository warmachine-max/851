/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var longestPalindromicSubsequence = function(s, k_limit) {
    const n = s.length;

    // 1. Create the 3D Table: dp[i][j][k]
    // i = start index, j = end index, k = operations used
    const dp = Array.from({ length: n }, () => 
        Array.from({ length: n }, () => new Array(k_limit + 1).fill(0))
    );

    // Helper: Calculate the "Circular Tax" to make two characters match
    const getCost = (charA, charB) => {
        let v1 = charA.charCodeAt(0) - 97; // 'a' -> 0, 'b' -> 1...
        let v2 = charB.charCodeAt(0) - 97;
        let diff = Math.abs(v1 - v2);
        // Shortest path: either direct distance or wrapping around z-a
        return Math.min(diff, 26 - diff);
    };

    // 2. Base Case: Every single letter is a palindrome of length 1 
    // This fills the "foundation" for all budget levels
    for (let i = 0; i < n; i++) {
        for (let budget = 0; budget <= k_limit; budget++) {
            dp[i][i][budget] = 1;
        }
    }

    // 3. Main DP Engine: Solve for length 2 up to N
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            let j = i + len - 1;
            
            // Calculate cost to match the characters at the ends
            let costToMatch = getCost(s[i], s[j]);

            for (let currentK = 0; currentK <= k_limit; currentK++) {
                
                // CHOICE 1: Skip s[i] or s[j]
                // We spend 0 budget, so we stay on the current 'currentK' page
                let skipLeft = dp[i + 1][j][currentK];
                let skipRight = dp[i][j - 1][currentK];
                dp[i][j][currentK] = Math.max(skipLeft, skipRight);

                // CHOICE 2: Force Match s[i] and s[j]
                // Only if our current budget is enough to pay the "tax"
                if (currentK >= costToMatch) {
                    // If len is 2 (e.g., "ab"), the inner part is empty (length 0)
                    let inner = (len === 2) ? 0 : dp[i + 1][j - 1][currentK - costToMatch];
                    
                    // Take the best of Skipping vs. Matching
                    dp[i][j][currentK] = Math.max(dp[i][j][currentK], 2 + inner);
                }
            }
        }
    }

    // Return the absolute best found for the full string with max budget
    return dp[0][n - 1][k_limit];
};