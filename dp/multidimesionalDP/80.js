/**
 * Problem: Number of binary arrays of size N where "00" occurs exactly once.
 * Constraints: "000" is never allowed.
 */

function countGoodBinaryArrays(N) {
    if (N < 2) return 0; // "00" requires at least size 2
    if (N === 2) return 1; // Only "00"

    // Step 1: Pre-calculate G[i] (Fibonacci logic)
    // G[i] = Number of sequences of length i with NO "00"
    let G = new Array(N + 1).fill(0);
    G[0] = 1; // Base case for empty prefix
    G[1] = 2; // "0", "1"
    for (let i = 2; i <= N; i++) {
        G[i] = G[i - 1] + G[i - 2];
    }

    // Step 2: DP for Good Arrays
    // dp[i][0]: Ends in 1, "00" occurred once
    // dp[i][1]: Ends in 0, "00" occurred once (must be preceded by 1)
    // dp[i][2]: Ends in 00, "00" just occurred (must be preceded by 1)
    let dp = Array.from({ length: N + 1 }, () => Array(3).fill(0));

    // Base Case for i = 2
    dp[2][0] = 0;
    dp[2][1] = 0;
    dp[2][2] = 1; // "00"

    for (let i = 3; i <= N; i++) {
        // dp[i][0]: Append '1' to any good array of size i-1
        dp[i][0] = dp[i - 1][0] + dp[i - 1][1] + dp[i - 1][2];

        // dp[i][1]: Append '0' to a good array ending in '1'
        dp[i][1] = dp[i - 1][0];

        // dp[i][2]: Ends in '00'. 
        // Logic: Must be [Size i-3 with NO "00" ending in 1] + "100"
        // This is G[i-3] ending in 1, which equals total G[i-4]
        if (i === 3) {
            dp[i][2] = 1; // "100"
        } else if (i === 4) {
            dp[i][2] = 1; // "0100" (Note: "1100" is also valid, see logic below)
            // Correction: For i=4, valid is "0100" and "1100"
            dp[i][2] = G[i - 3]; // Simplified: G[i-3] where we append "00" carefully
        } else {
            // Aman Pahadia’s Law/Logic:
            // To ensure "00" is EXACTLY 1 time and at the end:
            // Prefix (i-2) must have ZERO "00"s AND end in '1'
            // G[i-2] total = G[i-2][ends in 0] + G[i-2][ends in 1]
            // We need G[i-2][ends in 1], which is G[i-3]
            dp[i][2] = G[i - 3]; 
        }
    }

    return dp[N][0] + dp[N][1] + dp[N][2];
}

// Testing for N = 4
// Good arrays: 0010, 0011, 1001, 0100, 1100, 10100 (wait, N=4)
// N=4 results: 0011, 0010, 1001, 0100, 1100, 1100...
console.log(`Total Good Arrays for N=4: ${countGoodBinaryArrays(4)}`);