"use strict";

function solveCiscoPods(pods, n, connections, queries) {
    // 1. Build Adjacency List
    const adj = Array.from({ length: pods + 1 }, () => []);
    for (const [u, v] of connections) {
        adj[u].push(v);
        adj[v].push(u);
    }

    // 2. Map every pod to a Region ID and group pods by Region
    const podToRegion = new Array(pods + 1).fill(-1);
    const regions = []; // Stores sorted active pods for each region
    let regionIdCounter = 0;

    for (let i = 1; i <= pods; i++) {
        if (podToRegion[i] === -1) {
            const currentRegionPods = [];
            const queue = [i];
            podToRegion[i] = regionIdCounter;

            while (queue.length > 0) {
                const u = queue.shift();
                currentRegionPods.push(u);
                for (const v of adj[u]) {
                    if (podToRegion[v] === -1) {
                        podToRegion[v] = regionIdCounter;
                        queue.push(v);
                    }
                }
            }
            // Sort pods in region to easily find the minimum active one
            currentRegionPods.sort((a, b) => a - b);
            regions.push(currentRegionPods);
            regionIdCounter++;
        }
    }

    // 3. Track active status
    const isActive = new Array(pods + 1).fill(true);
    // Track the index of the "current smallest active pod" for each region
    const minActiveIdx = new Array(regions.length).fill(0);

    const results = [];

    // 4. Process Queries
    for (const [type, podId] of queries) {
        const rId = podToRegion[podId];

        if (type === 1) { // Data-sending
            // Find the first pod in this region's sorted list that is still active
            let found = false;
            while (minActiveIdx[rId] < regions[rId].length) {
                const smallestPodInRange = regions[rId][minActiveIdx[rId]];
                if (isActive[smallestPodInRange]) {
                    results.push(smallestPodInRange);
                    found = true;
                    break;
                }
                minActiveIdx[rId]++; // Permanently skip inactive pods at the start
            }
            if (!found) results.push(-1);

        } else if (type === 2) { // Database failure
            isActive[podId] = false;
        }
    }

    return results;
}

// --- Console Test Case ---
const podsCount = 5;
const connections = [[1, 2], [2, 3], [4, 5]]; 
const queries = [
    [1, 2], // Query: Send data to pod 2. Region {1,2,3}. Min active: 1
    [2, 1], // Query: Pod 1 fails.
    [1, 3], // Query: Send data to pod 3. Region {1,2,3}. Min active: 2
    [1, 5], // Query: Send data to pod 5. Region {4,5}. Min active: 4
];

console.log(solveCiscoPods(podsCount, 3, connections, queries)); 
// Expected Output: [1, 2, 4]