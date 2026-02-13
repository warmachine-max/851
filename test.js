"use strict";

function solve() {
    const n = 6;
    const k = 2; 
    // The original array (0-indexed: 5 is at index 0, 8 is at index 1...)
    const b = [5, 8, -1, 3, 4, 5]; 

    const NEG_INF = Number.MIN_SAFE_INTEGER;

    let dp = Array.from({ length: n + 1 }, () => new Array(k + 1).fill(NEG_INF));

    // Fill the 0-th column with 0 (Same as before)
    for (let i = 0; i <= n; i++) {
        dp[i][0] = 0; 
    }

    for (let l = 1; l <= k; l++) {
        for (let i = 1; i <= n; i++) {
            let v = dp[i - 1][l];
            let sum = 0;

            for (let j = i; j >= 1; j--) {
                // --- THE CHANGE ---
                // j is 1, 2, 3... but b is indexed 0, 1, 2...
                // So we use b[j-1]
                sum += b[j - 1]; 
                
                if (dp[j - 1][l - 1] !== NEG_INF) {
                    let total = sum + dp[j - 1][l - 1];
                    if (total > v) {
                        v = total;
                    }
                }
            }
            dp[i][l] = v;
        }
    }

    console.log("Final Maximum Sum:", dp[n][k]);
}

solve();


"use strict";

function solve3D() {
    const n = 6;
    const k = 2;
    const b = [5, 8, -1, 3, 4, 5]; 

    const NEG_INF = Number.MIN_SAFE_INTEGER;

    // dp[elements_used][parts_formed][is_currently_building]
    // size: [n+1][k+1][2]
    let dp = Array.from({ length: n + 1 }, () => 
        Array.from({ length: k + 1 }, () => [NEG_INF, NEG_INF])
    );

    // Base Case: 0 parts formed, not building = 0 profit
    for (let i = 0; i <= n; i++) {
        dp[i][0][0] = 0;
    }

    for (let l = 1; l <= k; l++) {
        for (let i = 1; i <= n; i++) {
            
            // --- STATE 1: BUILDING (Including b[i-1]) ---
            // Choice A: Start a brand new l-th part using b[i-1]
            // Choice B: Extend the l-th part that was already being built at i-1
            let prevBest = Math.max(dp[i - 1][l - 1][0], dp[i - 1][l - 1][1]);
            
            let startNew = prevBest === NEG_INF ? NEG_INF : prevBest + b[i - 1];
            let extendOld = dp[i - 1][l][1] === NEG_INF ? NEG_INF : dp[i - 1][l][1] + b[i - 1];
            
            dp[i][l][1] = Math.max(startNew, extendOld);

            // --- STATE 0: RESTING (Ignoring b[i-1]) ---
            // Just take the best of what we had at the previous element
            dp[i][l][0] = Math.max(dp[i - 1][l][0], dp[i - 1][l][1]);
        }
    }

    const finalAns = Math.max(dp[n][k][0], dp[n][k][1]);
    console.log("3D DP Final Result:", finalAns);
}

solve3D();