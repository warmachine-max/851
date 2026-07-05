/**
 * Velavan's Target Sum Optimization
 * Logic: Bottom-Up DP with a 2D Boolean Table
 */

function solveTargetSum(matrix, K) {
    const N = matrix.length;
    const M = matrix[0].length;
    
    // Determine the max possible sum to set the table width
    // Or just use a safe limit like 100 for this test case
    const MAX_SUM = 100; 

    // Create the N*MAX_SUM boolean table (dp[rows][possible_sums])
    // Using N + 1 to keep row indexing intuitive (1 to N)
    let dp = Array.from({ length: N + 1 }, () => Array(MAX_SUM).fill(false));

    // --- Phase 1: Hardcode Row 1 ---
    console.log("--- Phase 1: Initializing Row 1 ---");
    for (let val of matrix[0]) {
        if (val < MAX_SUM) {
            dp[1][val] = true;
            console.log(`dp[1][${val}] set to true`);
        }
    }

    // --- Phase 2: Propagate through remaining rows ---
    console.log("\n--- Phase 2: Propagating True Values ---");
    for (let i = 2; i <= N; i++) {
        let currentLevelElements = matrix[i - 1];
        
        for (let s = 0; s < MAX_SUM; s++) {
            // If the sum 's' was possible in the PREVIOUS row
            if (dp[i - 1][s] === true) {
                // Try adding each element of the CURRENT row
                for (let val of currentLevelElements) {
                    if (s + val < MAX_SUM) {
                        dp[i][s + val] = true;
                    }
                }
            }
        }
        
        // Log the possible sums at this stage
        let possibleAtThisRow = dp[i].map((val, idx) => val ? idx : null).filter(v => v !== null);
        console.log(`Row ${i} processed. Possible sums so far:`, possibleAtThisRow.join(', '));
    }

    // --- Phase 3: Find the result closest to K ---
    let closestSum = -1;
    let minDiff = Infinity;

    for (let s = 0; s < MAX_SUM; s++) {
        if (dp[N][s]) {
            let diff = Math.abs(s - K);
            if (diff < minDiff) {
                minDiff = diff;
                closestSum = s;
            }
        }
    }

    return closestSum;
}

// --- Your Test Case ---
const N = 4;
const K = 25;
const matrix = [
    [2, 8, 10],  // Row 1
    [3, 4, 12],  // Row 2
    [1, 7, 9],   // Row 3
    [5, 6, 15]   // Row 4
];

const result = solveTargetSum(matrix, K);

console.log("\n--- FINAL RESULT ---");
console.log(`Target K: ${K}`);
console.log(`Closest Sum Found: ${result}`);
console.log(`Difference: ${Math.abs(result - K)}`);