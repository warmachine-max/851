let summa = (p) => {
    // 1. Setup the 1-indexed array
    let arr = [0, ...p];
    let n = p.length; // Use original length for the loop bounds

    let parent = new Array(n + 1);
    let size = new Array(n + 1);

    for (let i = 0; i <= n; i++) {
        size[i] = 1;
        parent[i] = i;
    }

    // 2. DSU Functions (With Path Compression)
    function findParent(x) {
        if (parent[x] === x) return x;
        // Path Compression: directly link node to the ultimate root
        return parent[x] = findParent(parent[x]);
    }

    function union(u, v) {
        let roota = findParent(u);
        let rootb = findParent(v);

        if (roota === rootb) return;

        // Union by Size: attach smaller tree to larger tree
        if (size[roota] < size[rootb]) {
            parent[roota] = rootb;
            size[rootb] += size[roota];
        } else {
            parent[rootb] = roota;
            size[roota] += size[rootb];
        }
    }

    // 3. Build the cycles using the permutation
    for (let i = 1; i <= n; i++) {
        union(i, arr[i]);
    }

    // 4. Extract sizes for unique cycle leaders
    let sizeArr = [];
    for (let i = 1; i <= n; i++) {
        if (parent[i] === i) {
            sizeArr.push(BigInt(size[i]));
        }
    }

    // 5. INFUSED EUCLID LOGIC
    const gcd = (a, b) => {
        while (b !== 0n) {
            a %= b;
            [a, b] = [b, a]; // Swap
        }
        return a;
    };

    const lcm = (a, b) => {
        if (a === 0n || b === 0n) return 0n;
        return (a / gcd(a, b)) * b;
    };

    // 6. The Array Chain (Final Result)
    let finalResult = sizeArr[0];
    for (let i = 1; i < sizeArr.length; i++) {
        finalResult = lcm(finalResult, sizeArr[i]);
    }

    return finalResult.toString();
}

const p = [3, 1, 2, 5, 4];
console.log("Turns required:", summa(p)); // Output: 6



// lcm find letts assume [8  5 2 ]
/**
 * DRY RUN EXAMPLE: sizeArr = [8, 5, 2]
 * * STEP 1: First Pair (8 and 5)
 * -------------------------------------------
 * acc = 8n, curr = 5n
 * Find GCD(8, 5) via Euclidean Algorithm:
 * 8 % 5 = 3
 * 5 % 3 = 2
 * 3 % 2 = 1
 * 2 % 1 = 0  --> GCD is 1
 * * Calculate LCM(8, 5):
 * Formula: (8 * 5) / 1 = 40
 * Result: 40n
 * * STEP 2: Result with Next Number (40 and 2)
 * -------------------------------------------
 * acc = 40n, curr = 2n
 * Find GCD(40, 2):
 * 40 % 2 = 0 --> GCD is 2
 * * Calculate LCM(40, 2):
 * Formula: (40 * 2) / 2 = 40
 * * FINAL RESULT: 40n
 */