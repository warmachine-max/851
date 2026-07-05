function processSubarrayQueries(nums, queries) {
    const n = nums.length;

    // 1. Precompute Prefix Sum Array
    const P = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        P[i + 1] = P[i] + nums[i];
    }

    // 2. Precompute Prefix-of-Prefix Sum Array
    const PP = new Array(n + 2).fill(0);
    for (let i = 0; i <= n; i++) {
        PP[i + 1] = PP[i] + P[i];
    }
    console.log(`Prefix Sum Array (P): ${P}`);
    console.log(`Prefix-of-Prefix Sum Array (PP): ${PP}`);

    // 3. Process each query in O(1) time
    const results = [];
    
    for (let q = 0; q < queries.length; q++) {
        const [L, R] = queries[q];
        const len = R - L + 1;
        console.log(`Processing query ${q + 1}: Range [${L}, ${R}] (Length: ${len})`);
        // This is the clean algebraic formula for any isolated window [L, R]
        console.log(`PP[R + 2]: ${PP[R + 2]}, PP[L + 1]: ${PP[L + 1]},  P[L]: ${ P[L]}, len: ${len}`);
        const totalSum = PP[R + 2] - PP[L + 1] - (len * P[L]);
        
        results.push({
            query: `Range [${L}, ${R}] (Elements: ${nums.slice(L, R + 1)})`,
            totalNestedSubarraySum: totalSum
        });
    }

    return results;
}

// --- Driver Test Run ---
const nums = [1, 2, 3, 4, 5];

// We can pass as many queries as we want!
const queries = [
    [3, 4], // Elements [4, 5] -> Subarrays: [4], [5], [4,5] -> Total: 18
    // [1, 2], // Elements [2, 3] -> Subarrays: [2], [3], [2,3] -> Total: 10
    // [0, 2] , // Elements [1, 2, 3] -> Subarrays: [1],[2],[3],[1,2],[2,3],[1,2,3] -> Total: 20
    // [0,3]// Elements [1, 2, 3, 4] -> Subarrays: [1],[2],[3],[4],[1,2],[2,3],[3,4],[1,2,3],[2,3,4],[1,2,3,4] -> Total: 50
];

const output = processSubarrayQueries(nums, queries);
console.log(JSON.stringify(output, null, 2));