/**
 * Function to find the maximum number of edges in a Prime-Degree Graph.
 * @param {number} n - Number of nodes in the graph.
 */
function maxPrimeDegreeEdges(n) {
    if (n <= 2) return 0;

    // 1. Sieve of Eratosthenes to get primes up to N-1
    let limit = n - 1;
    let isPrime = new Array(limit + 1).fill(true);
    isPrime[0] = isPrime[1] = false;

    for (let p = 2; p * p <= limit; p++) {
        if (isPrime[p]) {
            for (let i = p * p; i <= limit; i += p) {
                isPrime[i] = false;
            }
        }
    }

    let primes = [];
    for (let p = 2; p <= limit; p++) {
        if (isPrime[p]) primes.push(p);
    }

    if (primes.length === 0) return 0;

    // 2. Largest prime P <= N-1
    let p = primes[primes.length - 1];
    
    // 3. Apply Handshaking Lemma: Total Sum of Degrees must be Even
    let degreeSum = n * p;

    if (degreeSum % 2 === 0) {
        return degreeSum / 2;
    } else {
        /* If N*P is odd, it means both N and P are odd.
           We must change at least one node's degree to an even prime (2).
           (N-1) nodes with degree P + (1) node with degree 2.
           Since (N-1) is even, (N-1)*P is even, and adding 2 keeps it even.
        */
        let adjustedSum = (n - 1) * p + 2;
        return adjustedSum / 2;
    }
}

// Testing with N = 12
let n = 12;
console.log(`Max edges for N=${n}:`, maxPrimeDegreeEdges(n)); // Output: 66

// Testing with N = 5
console.log(`Max edges for N=5:`, maxPrimeDegreeEdges(5));   // Output: 7 dry run for n = 12?