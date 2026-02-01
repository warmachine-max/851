function countOddJourneys(arr) {
    const n = arr.length;

    // dp[i][0] = Count of journeys ending at index i with an EVEN sum
    // dp[i][1] = Count of journeys ending at index i with an ODD sum
    let dp = Array.from({ length: n + 1 }, () => [0, 0]);

    // --- STEP 1: INITIALIZATION (Index 1) ---
    // We look at the first number in the array
    if (arr[0] % 2 === 0) {
        dp[1][0] = 1; // It's even
    } else {
        dp[1][1] = 1; // It's odd
    }

    console.log(`Step 1 (Val: ${arr[0]}): Odd Ways: ${dp[1][1]}, Even Ways: ${dp[1][0]}`);

    // --- STEP 2: JUMPING (Indices 2 to n) ---
    for (let i = 2; i <= n; i++) {
        let currentVal = arr[i - 1];
        
        // Look back at one step and two steps
        let prev1 = dp[i - 1];
        let prev2 = (i - 2 >= 1) ? dp[i - 2] : [0, 0];

        if (currentVal % 2 === 0) {
            // EVEN NUMBER: Parity stays the same
            // (Odd + Even = Odd) and (Even + Even = Even)
            dp[i][1] = prev1[1] + prev2[1]; 
            dp[i][0] = prev1[0] + prev2[0];
        } else {
            // ODD NUMBER: Parity FLIPS
            // (Even + Odd = Odd) and (Odd + Odd = Even)
            dp[i][1] = prev1[0] + prev2[0]; // All previous even paths become odd
            dp[i][0] = prev1[1] + prev2[1]; // All previous odd paths become even
        }

        console.log(`Step ${i} (Val: ${currentVal}): Odd Ways: ${dp[i][1]}, Even Ways: ${dp[i][0]}`);
    }

    return {
        totalOdd: dp[n][1],
        totalEven: dp[n][0]
    };
}

// Running your specific test case
const arr = [5, 4, 2, 6];
const result = countOddJourneys(arr);

console.log("\n--- FINAL RESULT ---");
console.log(`Journeys starting at index 1 and ending at index ${arr.length}:`);
console.log(`Odd Sum Journeys: ${result.totalOdd}`);
console.log(`Even Sum Journeys: ${result.totalEven}`);