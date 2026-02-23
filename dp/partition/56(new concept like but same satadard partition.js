// function minPartitions_Quadratic(arr) {
//     const n = arr.length;
//     if (n === 0) return 0;

//     const ans = new Int32Array(n);
//     const INF = 1e8;

//     for (let i = 0; i < n; i++) {
//         // Option 1: Standalone (1 + best answer before this element)
//         let prevAns = (i === 0) ? 0 : ans[i - 1];
//         let resStandalone = 1 + prevAns;

//         // Option 2: Look back for every match
//         let resMatching = INF;
//         for (let j = i - 1; j >= 0; j--) {
//             if (arr[j] === arr[i]) {
//                 // We found a bridge [j...i]. 
//                 // Cost = 1 (for the bridge) + best answer before the bridge (ans[j-1])
//                 let beforeJ = (j === 0) ? 0 : ans[j - 1];
//                 resMatching = Math.min(resMatching, 1 + beforeJ);
//             }
//         }

//         ans[i] = Math.min(resStandalone, resMatching);
//     }
//     return ans[n - 1];
// }

// console.log("Test 1 [1, 2, 1, 3, 3]:", minPartitions_Quadratic([1, 2, 1, 3, 3]));

function minPartitions_Linear(arr) {
    const n = arr.length;
    if (n === 0) return 0;

    const ans = new Int32Array(n);
    const k = new Map(); // Stores { value: min_cost_to_start_bridge }
    const INF = 1e8;

    for (let i = 0; i < n; i++) {
        // Option 1: Standalone
        let prevAns = (i === 0) ? 0 : ans[i - 1];
        let resStandalone = 1 + prevAns;

        // Option 2: Optimized Bridge Lookup
        let resMatching = INF;
        if (k.has(arr[i])) {
            resMatching = k.get(arr[i]);
        }

        ans[i] = Math.min(resStandalone, resMatching);

        // Update Map: Store the best "entry price" to jump FROM this value later.
        // The price to start a bridge at index i is (1 + answer before i).
        let currentEntryCost = 1 + prevAns;
        
        if (!k.has(arr[i]) || currentEntryCost < k.get(arr[i])) {
            k.set(arr[i], currentEntryCost);
        }
    }
    return ans[n - 1];
}

// [1, 2, 1, 2, 1]