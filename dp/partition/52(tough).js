// const n = 3;
// const s = "aab";
// const targetK = 3;
// const A = [1,1,1,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

// const memo = Array.from({ length: n + 1 }, () => new Array(targetK + 1).fill(-1));

// function solve(idx, k) {
//     if (idx === n) return k === 0 ? 1 : 0;
//     if (k === 0) return 0;
//     if (memo[idx][k] !== -1) return memo[idx][k];

//     let totalWays = 0;
//     let freq = new Array(26).fill(0);

//     for (let j = idx; j <= n - k; j++) {
//         let charIdx = s.charCodeAt(j) - 97;
//         freq[charIdx]++;

//         if (freq[charIdx] <= A[charIdx]) {
//             if (k === 1) {
//                 // EXPLICIT LOGIC: 
//                 // If j is not the end, we don't 'solve' yet. 
//                 // We just let the loop continue (j++).
//                 if (j === n - 1) {
//                     totalWays += solve(j + 1, k - 1);
//                 }
//             } else {
//                 // We have a choice: Partition now OR continue j++.
//                 totalWays += solve(j + 1, k - 1);
//             }
//         } else {
//             // THE WALL: String is Bad. Even at k=1, if it's bad, the path dies.
//             break; 
//         }
//     }

//     return memo[idx][k] = totalWays;
// }

// console.log("--------------------------------------");
// console.log("Final Result:", solve(0, targetK));
// console.log("--------------------------------------");



/**
 * Optimized Partition DP
 * Time Complexity: O(N^2 + N*K)
 * Space Complexity: O(N) - (Using space-optimized DP layers)
 */

// function solveUtopia(s, targetK, A) {
//     const n = s.length;

//     // --- STEP 1: PRE-CALCULATE THE "WALL" (limit array) ---
//     // limit[i] tells us the leftmost index 'j' such that s[j...i] is a "Good" string.
//     const limit = new Array(n + 1).fill(0);

//     for (let i = 1; i <= n; i++) {
//         let freq = new Array(26).fill(0);
//         let leftmost = i;
        
//         // Look backward to find the longest valid suffix ending at i
//         for (let j = i; j >= 1; j--) {
//             let charIdx = s.charCodeAt(j - 1) - 97;
//             freq[charIdx]++;
            
//             if (freq[charIdx] <= A[charIdx]) {
//                 leftmost = j;
//             } else {
//                 break; // We hit the constraint "Wall"
//             }
//         }
//         limit[i] = leftmost;
//     }

//     // --- STEP 2: DP WITH PREFIX SUM LEDGER ---
//     // dp[i] = number of ways to partition prefix of length i into 'p' parts.
//     let dp = new Array(n + 1).fill(0n);
//     dp[0] = 1n; // Base case: 1 way to have 0 parts (empty string)

//     for (let p = 1; p <= targetK; p++) {
//         let nextDp = new Array(n + 1).fill(0n);
        
//         // Build the Prefix Sum Ledger for the PREVIOUS layer (p-1)
//         // pref[i] stores the sum of dp[0...i-1]
//         let pref = new Array(n + 2).fill(0n);
//         for (let i = 0; i <= n; i++) {
//             pref[i + 1] = pref[i] + dp[i];
//         }

//         for (let i = 1; i <= n; i++) {
//             // A part ending at i can start at any j from limit[i] to i.
//             // This means we need to look at dp[j-1] from the previous k-layer.
//             // The range for j-1 is [limit[i]-1, i-1].
//             let L = limit[i] - 1;
//             let R = i - 1;
            
//             if (L <= R) {
//                 // The "2x+1" Shortcut: Constant time range sum!
//                 nextDp[i] = pref[R + 1] - pref[L];
//             }
//         }
        
//         // Move to the next partition layer
//         dp = nextDp;
//     }

//     return dp[n].toString(); // Convert BigInt to string for output
// }

// // --- Example Usage ---
// const s = "aba";
// const targetK = 2;
// const A = [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];

// console.log("Result =",solveUtopia(s, targetK, A));