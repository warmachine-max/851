function solveTwoLaneTravel(n, a, b) {
    // dp[i][0] = Max money in Lane A; dp[i][1] = Max money in Lane B
    let dp = Array.from({ length: n + 1 }, () => [0, 0]);

    // --- Day 1 (Initialization) ---
    dp[1][0] = a[1];
    dp[1][1] = b[1];

    // --- Day 2 to N ---
    for (let i = 2; i <= n; i++) {
        // Option A: Stay in A from i-1 OR Jump from B from i-2
        let stayA = dp[i - 1][0];
        let jumpToA = (i >= 2) ? (dp[i - 2] ? dp[i - 2][1] : 0) : 0;
        dp[i][0] = Math.max(stayA, jumpToA) + a[i];

        // Option B: Stay in B from i-1 OR Jump from A from i-2
        let stayB = dp[i - 1][1];
        let jumpToB = (i >= 2) ? (dp[i - 2] ? dp[i - 2][0] : 0) : 0;
        dp[i][1] = Math.max(stayB, jumpToB) + b[i];
    }

    console.log(dp)
    return { 
        laneA_Final: dp[n][0], 
        laneB_Final: dp[n][1],
        maxTotal: Math.max(dp[n][0], dp[n][1])
    };
}

// Test Case
const A = [0, 10, 10, 10]; 
const B = [0, 1, 1, 100];
const n = 3;
console.log(solveTwoLaneTravel(n, A, B));