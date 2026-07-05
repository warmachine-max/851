/**
 * PROBLEM: Longest Subsequence with Constant Pair-Sum Modulo K
 * MAIN IDEA: 
 * 1. For a fixed target sum 'S', the sequence must alternate remainders: [r1, r2, r1, r2...].
 * 2. If current remainder is 'curr', the previous MUST be '(S - curr + k) % k'.
 * 3. Use a "Scoreboard" (last_best) to store the max length ending in each remainder.
 * 4. Complexity: O(K * N) -> We check all K possible target sums.
 */

function longestValidSubsequence_NK(nums, k) {
    let n = nums.length;
    let maxOverall = 0;

    // Loop through every possible "Bucket" (Target Sum S % K)
    for (let S = 0; S < k; S++) {
        
        // last_best[r] = Longest chain found so far that ends with a number % k == r
        let last_best = new Array(k).fill(0);
        
        /* DRY RUN for nums = [1, 2, 3, 4, 5], k = 2, S = 1 (Sums must be odd)
           ---------------------------------------------------------------
           Initial: last_best = [0, 0] (Index 0 = Even rem, Index 1 = Odd rem)

           1. x = 1 (rem 1): 
              Needed = (1 - 1 + 2) % 2 = 0. 
              last_best[1] = last_best[0] + 1 = 1. -> Board: [0, 1]

           2. x = 2 (rem 0): 
              Needed = (1 - 0 + 2) % 2 = 1. 
              last_best[0] = last_best[1] + 1 = 2. -> Board: [2, 1] (Seq: [1, 2])

           3. x = 3 (rem 1): 
              Needed = (1 - 1 + 2) % 2 = 0. 
              last_best[1] = last_best[0] + 1 = 3. -> Board: [2, 3] (Seq: [1, 2, 3])

           4. x = 4 (rem 0): 
              Needed = (1 - 0 + 2) % 2 = 1. 
              last_best[0] = last_best[1] + 1 = 4. -> Board: [4, 3] (Seq: [1, 2, 3, 4])

           5. x = 5 (rem 1): 
              Needed = (1 - 1 + 2) % 2 = 0. 
              last_best[1] = last_best[0] + 1 = 5. -> Board: [4, 5] (Seq: [1, 2, 3, 4, 5])
           ---------------------------------------------------------------
        */

        for (let x of nums) {
            let current_rem = x % k;
            
            // The "Nullifier" formula: ensures index is positive and in-bounds
            let needed_prev_rem = (S - current_rem + k) % k;
            
            // CORE TRANSITION: Look at the scoreboard for the partner remainder
            last_best[current_rem] = last_best[needed_prev_rem] + 1;
            
            maxOverall = Math.max(maxOverall, last_best[current_rem]);
        }
    }
    return maxOverall;
}

let nums = [1, 2, 3, 4, 5];
let k = 2;
console.log("Max Length:", longestValidSubsequence_NK(nums, k)); // Output: 5