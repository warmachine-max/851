function solveOptimal(b) {
    const n = b.length;
    if (n === 0) return 0;

    // dp2[i]: Max sum if we pick a pair ending at i
    const dp2 = new Array(n).fill(0);
    // dp3[i]: Max sum if we pick a triplet ending at i
    const dp3 = new Array(n).fill(0);
    // prefBest[i]: max of all dp2 and dp3 values up to index i
    const prefBest = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        // --- CHOICE 1: PICK 2 ---
        if (i >= 1) {
            let currentPair = b[i] + b[i - 1];
            // Rule: 1 house gap. If we finish at i, we look back to i-3
            let bestBefore = (i >= 3) ? prefBest[i - 3] : 0;
            dp2[i] = currentPair + bestBefore;
        }

        // --- CHOICE 2: PICK 3 ---
        if (i >= 2) {
            let currentTriplet = b[i] + b[i - 1] + b[i - 2];
            // Rule: 2 house gap. If we finish at i, we look back to i-5
            let bestBefore = (i >= 5) ? prefBest[i - 5] : 0;
            dp3[i] = currentTriplet + bestBefore;
        }

        // --- UPDATE RUNNING MAX ---
        let currentMax = Math.max(dp2[i], dp3[i]);
        prefBest[i] = (i > 0) ? Math.max(prefBest[i - 1], currentMax) : currentMax;
    }

    return prefBest[n - 1];
}