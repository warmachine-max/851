/**
 * Final Performance-First Solution
 * Uses direct array indexing for O(1) prime checks.
 */
function solvePrimePartition(S) {
    const N = S.length;
    const MOD = 1000000007;
    const MAX_PRIME = 1000000;

    // --- 1. PRECOMPUTE PRIMES (Sieve of Eratosthenes) ---
    // Direct lookup array: 0 = not prime, 1 = prime
    const isPrime = new Uint8Array(MAX_PRIME + 1).fill(1);
    isPrime[0] = isPrime[1] = 0;

    for (let p = 2; p * p <= MAX_PRIME; p++) {
        if (isPrime[p] === 1) {
            for (let i = p * p; i <= MAX_PRIME; i += p) {
                isPrime[i] = 0;
            }
        }
    }

    // --- 2. DYNAMIC PROGRAMMING ---
    const dp = new Uint32Array(N + 1);
    dp[0] = 1; 

    for (let i = 1; i <= N; i++) {
        // Look back up to 6 digits (since max prime is 999,999)
        for (let len = 1; len <= 6 && i - len >= 0; len++) {
            
            // Optimization: Avoid substring() if possible for speed
            // But for clarity, we'll use it here to handle the leading zero check
            let sub = S.substring(i - len, i);
            
            // Rule: No leading zero
            if (sub[0] === '0') continue;

            let num = parseInt(sub);
            
            // DIRECT LOOKUP: Using the array we already built
            if (num <= MAX_PRIME && isPrime[num] === 1) {
                dp[i] = (dp[i] + dp[i - len]) % MOD;
            }
        }
    }

    return dp[N];
}

// Example Run:
const input = "235";
console.log("Total Ways:", solvePrimePartition(input));