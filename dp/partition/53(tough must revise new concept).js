"use strict";
// important note :: understand the brute force first, then the optimal. 
// The optimal is a "knight's upgrade" of the brute force, so it will make more sense after you understand the brute force.
/**
 * PROBLEM: Maximum Sum of K Non-Intersecting Subarrays
 * * REVISION STRATEGY:
 * 1. Understand Brute Force: It "shouts" back to all previous indices to find a start point.
 * 2. Understand Optimal: It only "talks" to its immediate neighbor to see if a streak is continuing.
 */

// =========================================================================
// APPROACH 1: THE "HUMAN INVENTION" (BRUTE FORCE)
// Complexity: O(N^2 * K)
// =========================================================================
function solveBruteForce(n, k, b) {
    const NEG_INF = Number.MIN_SAFE_INTEGER;
    
    // dp[i][l] = Max sum using first 'i' elements to form 'l' subarrays
    let dp = Array.from({ length: n + 1 }, () => new Array(k + 1).fill(NEG_INF));

    // BASE CASE: 0 subarrays always sum to 0 (Java does this automatically)
    for (let i = 0; i <= n; i++) dp[i][0] = 0;

    // OUTER LOOP: We must solve for 1 part, then 2, then 3... up to K.
    // Each 'l' layer depends on the 'l-1' layer.
    for (let l = 1; l <= k; l++) {
        for (let i = 1; i <= n; i++) {
            
            // OPTION 1: The current element b[i-1] is NOT part of any subarray.
            // We just take the best result we had at the previous index (i-1).
            let v = dp[i - 1][l]; 

            let currentSubarraySum = 0;

            // OPTION 2: b[i-1] IS the end of the l-th subarray.
            // WE NEED A LOOP: We check every possible starting point 'j' for this l-th part.
            // This is the "Hard Work" loop that makes it O(N^2).
            for (let j = i; j >= 1; j--) {
                currentSubarraySum += b[j - 1]; 
                
                // If we found a valid best sum for (l-1) parts before index j
                if (dp[j - 1][l - 1] !== NEG_INF) {
                    let total = currentSubarraySum + dp[j - 1][l - 1];
                    if (total > v) v = total;
                }
            }
            dp[i][l] = v;
        }
    }
    return dp[n][k];
}

// =========================================================================
// APPROACH 2: THE "KNIGHT'S UPGRADE" (OPTIMAL 3D DP)
// Complexity: O(N * K)
// =========================================================================
function solveOptimal3D(n, k, b) {
    const NEG_INF = Number.MIN_SAFE_INTEGER;

    // dp[index][parts][state]
    // State 0: RESTING (The current element is NOT being used in a subarray right now)
    // State 1: BUILDING (The current element IS being used to build the l-th subarray)
    let dp = Array.from({ length: n + 1 }, () => 
        Array.from({ length: k + 1 }, () => [NEG_INF, NEG_INF])
    );

    // BASE CASE: 0 parts formed, sitting idle = 0 profit
    for (let i = 0; i <= n; i++) dp[i][0][0] = 0;

    for (let l = 1; l <= k; l++) {
        for (let i = 1; i <= n; i++) {
            
            // --- STATE 1: BUILDING LOGIC (The Shortcut) ---
            // Instead of a 'j' loop, we make a simple 1-step decision:
            
            // Choice A: Start a brand NEW l-th subarray using the current element.
            // (We look at the best finished result of l-1 parts from the previous index)
            let prevBestFinished = Math.max(dp[i - 1][l - 1][0], dp[i - 1][l - 1][1]);
            let startNew = prevBestFinished === NEG_INF ? NEG_INF : prevBestFinished + b[i - 1];

            // Choice B: Continue BUILDING the l-th subarray that was already started.
            // (We just add the current element to the 'Building' state of the previous index)
            let extendOld = dp[i - 1][l][1] === NEG_INF ? NEG_INF : dp[i - 1][l][1] + b[i - 1];

            dp[i][l][1] = Math.max(startNew, extendOld);

            // --- STATE 0: RESTING LOGIC ---
            // We choose not to use the current element.
            // The best answer is simply the best of either state from the previous index.
            dp[i][l][0] = Math.max(dp[i - 1][l][0], dp[i - 1][l][1]);
        }
    }

    // Final result: Best of either 'Resting' or 'Building' after using all elements
    return Math.max(dp[n][k][0], dp[n][k][1]);
}

// --- TEST CASE ---
const n = 6;
const k = 2;
const b = [5, 8, -1, 3, 4, 5];

console.log("--- Results ---");
console.log("Brute Force Result:", solveBruteForce(n, k, b)); // Output: 25
console.log("Optimal 3D Result: ", solveOptimal3D(n, k, b));  // Output: 25