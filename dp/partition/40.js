function minBeautifulSubstrings(s) {
    const n = s.length;
    const dp = new Array(n + 1).fill(Infinity);
    dp[0] = 0;

    // 1. Pre-compute powers of 5 into a Set for O(1) lookup
    const powers = new Set();
    let p = 1;
    // 2^15 is 32768, so for N=15, we only need a few powers
    // We'll go up to a safe limit (e.g., 2^50 if N is large)
    for (let i = 0; i < 22; i++) { 
        powers.add(p);
        p *= 5;
    }

    for (let i = 1; i <= n; i++) {
        // Only look back if the current character isn't a leading zero
        // Actually, we check s[j] inside the loop for leading zeros
        for (let j = i - 1; j >= 0; j--) {
            if (s[j] === '0') continue; // Leading zero constraint

            // Convert binary substring s[j...i] to decimal
            let val = parseInt(s.substring(j, i), 2);

            if (powers.has(val)) {
                dp[i] = Math.min(dp[i], dp[j] + 1);
            }
        }
    }

    return dp[n] === Infinity ? -1 : dp[n];
}