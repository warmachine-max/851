/**
 * Calculates the exact total number of even and odd sum journeys.
 * No Modulo. Uses BigInt for precise whole numbers.
 */
function countJourneysFinal(A, B) {
    const n = A.length;

    // --- INITIALIZATION (Index 1) ---
    // BigInt(val) ensures we can handle negative numbers safely with % 2n
    let dpa_even = (BigInt(A[0]) % 2n === 0n) ? 1n : 0n;
    let dpa_odd  = (BigInt(A[0]) % 2n !== 0n) ? 1n : 0n;
    
    let dpb_even = (BigInt(B[0]) % 2n === 0n) ? 1n : 0n;
    let dpb_odd  = (BigInt(B[0]) % 2n !== 0n) ? 1n : 0n;

    // --- THE ENGINE (Index 2 to n) ---
    for (let i = 1; i < n; i++) {
        // Step 1: Collect ALL runners from the previous milestone (both lanes)
        let total_prev_even = dpa_even + dpb_even;
        let total_prev_odd  = dpa_odd + dpb_odd;

        // Step 2: Lane A logic - current value a[i]
        // Note: Using absolute values for parity check because % in JS can return -1
        let valA = BigInt(A[i]);
        if (valA % 2n === 0n) {
            // Even: Keeps incoming parity
            dpa_even = total_prev_even;
            dpa_odd  = total_prev_odd;
        } else {
            // Odd: Swaps incoming parity
            dpa_even = total_prev_odd;
            dpa_odd  = total_prev_even;
        }

        // Step 3: Lane B logic - current value b[i]
        let valB = BigInt(B[i]);
        if (valB % 2n === 0n) {
            // Even: Keeps incoming parity
            dpb_even = total_prev_even;
            dpb_odd  = total_prev_odd;
        } else {
            // Odd: Swaps incoming parity
            dpb_even = total_prev_odd;
            dpb_odd  = total_prev_even;
        }
    }

    // --- FINAL AGGREGATION ---
    return {
        evenJourneys: dpa_even + dpb_even,
        oddJourneys:  dpa_odd + dpb_odd
    };
}

// --- TEST DRIVE ---
const laneA = [5, 4, 2, 6]; 
const laneB = [2, 3, 1, 8];

const result = countJourneysFinal(laneA, laneB);

console.log(`--- TOTAL JOURNEYS STARTING AT 1 AND ENDING AT ${laneA.length} ---`);
console.log(`Even Sum Journeys: ${result.evenJourneys.toString()}`);
console.log(`Odd Sum Journeys:  ${result.oddJourneys.toString()}`);