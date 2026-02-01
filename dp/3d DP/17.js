"use strict";

/**
 * Standard JS version using your exact hard-coded logic.
 * No "prev" variables, just direct array indexing.
 */
function solve(n, b, d) {
    // 1. Initialize the 3D DP table: dp[n+1][3][3]
    // Fill with 0 to handle the i-2 lookback safely when i=2
    const dp = Array.from({ length: n + 1 }, () => 
        Array.from({ length: 3 }, () => new Float64Array(3).fill(0))
    );

    // 2. Base Cases (Day 1)
    // We set all entry states for Day 1
    dp[1][1][1] = b[1]; 
    dp[1][1][2] = b[1]; 
    dp[1][2][1] = d[1]; 
    dp[1][2][2] = d[1]; 

    if (n < 2) return Math.max(b[1], d[1]);

    // 3. The Engine (Your exact logic)
    let i = 2; 
    while(i <= n) {
        // Lane 1 Today, Lane 1 Yesterday (Streak of 2)
        // Must have come from Lane 2 at i-2
        dp[i][1][1] = b[i] + b[i-1] + Math.max(dp[i-2][2][2], dp[i-2][2][1]);

        // Lane 1 Today, Lane 2 Yesterday (Switch)
        dp[i][1][2] = b[i] + d[i-1] + Math.max(dp[i-2][1][1], dp[i-2][1][2], dp[i-2][2][1]);

        // Lane 2 Today, Lane 1 Yesterday (Switch)
        dp[i][2][1] = d[i] + b[i-1] + Math.max(dp[i-2][2][1], dp[i-2][2][2], dp[i-2][1][2]);

        // Lane 2 Today, Lane 2 Yesterday (Streak of 2)
        // Must have come from Lane 1 at i-2
        dp[i][2][2] = d[i] + d[i-1] + Math.max(dp[i-2][1][2], dp[i-2][1][1]);

        i++;
    }

    // 4. Final Output (Maximum of all states on the last day)
    return Math.max(dp[n][1][1], dp[n][1][2], dp[n][2][2], dp[n][2][1]);
}

// --- TEST CASE ---
const n = 4;
const laneA = [0, 10, 10, 10, 10]; // index 0 is filler
const laneB = [0, 1, 1, 1, 1];
console.log("Max Sum:", solve(n, laneA, laneB));