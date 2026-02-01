"use strict";

function solve(N, easy, medium, hard) {
    if (N === 0) return 0;

    // Initialize 2D DP array: dp[N+1][3]
    // 0: Easy, 1: Medium, 2: Hard
    let dp = Array.from({ length: N + 1 }, () => [0, 0, 0]);

    // --- Base Cases (Day 1) ---
    dp[1][0] = easy[1];
    dp[1][1] = medium[1];
    dp[1][2] = hard[1];

    if (N === 1) return Math.max(...dp[1]);

    // --- Base Cases (Day 2) ---
    // Rule: Anything can follow anything on Day 2 if we assume 
    // rules only kick in when enough history (i-2) exists.
    let max1 = Math.max(...dp[1]);
    dp[2][0] = easy[2] + max1;
    dp[2][1] = medium[2] + max1;
    dp[2][2] = hard[2] + max1;

    if (N === 2) return Math.max(...dp[2]);

    // --- Base Cases (Day 3) ---
    // Applying your specific convincing logic for Day 3
    dp[3][0] = easy[3] + Math.max(...dp[2]);
    dp[3][1] = medium[3] + easy[2] + dp[1][1]; // med[3] + easy[2] + med[1]
    dp[3][2] = hard[3] + easy[2] + dp[1][0];   // hard[3] + easy[2] + easy[1] (assuming whatever i-1 is easy)

    // --- The Core Loop (Day 4 to N) ---
    for (let i = 4; i <= N; i++) {
        // Line 1: Easy is the "Reset" - can follow any task from yesterday
        dp[i][0] = easy[i] + Math.max(dp[i - 1][0], dp[i - 1][1], dp[i - 1][2]);

        // Line 2: Medium is the "Rhythm" - needs Easy (i-1) and Med (i-2)
        dp[i][1] = medium[i] + easy[i - 1] + dp[i - 2][1];

        // Line 3: Hard is the "Foundation" - needs Easy (i-1) and Easy (i-2)
        // (Note: This is the specific version of your 3 lines)
        dp[i][2] = hard[i] + easy[i - 1] + dp[i - 2][0];

        /* Guardian Note: If the question requires the "Special Paths" (M-E-H or H-E-H), 
           you would add these two lines here. But per your "Convincing Three":
        */
        // dp[i][2] = Math.max(dp[i][2], hard[i] + medium[i-1] + easy[i-2] + (i >= 3 ? dp[i-3][1] : 0));
        // dp[i][2] = Math.max(dp[i][2], hard[i] + hard[i-1] + easy[i-2] + (i >= 3 ? dp[i-3][0] : 0));
    }

    return Math.max(dp[N][0], dp[N][1], dp[N][2]);
}

// Example usage:
const N = 5;
const easy = [0, 10, 10, 10, 10, 10];
const med = [0, 20, 20, 20, 20, 20];
const hard = [0, 30, 30, 30, 30, 30];

console.log("Maximum Points:", solve(N, easy, med, hard));