/**
 * Problem: Minimum Starting Energy to reach Destination
 * Approach: Binary Search on Answer + Topological Sort (DP)
 * * Time Complexity: O((V + E) * log(Range))
 * Space Complexity: O(V + E)
 */

function findMinEnergy(V, edgeList, powers, source, destination) {
    // 1. Build Adjacency List & Calculate In-Degrees
    // This allows us to traverse the graph efficiently.
    const adj = Array.from({ length: V }, () => []);
    const inDegree = new Array(V).fill(0);
    
    for (const [u, v, w] of edgeList) {
        adj[u].push({ to: v, weight: w });
        inDegree[v]++;
    }

    // 2. Pre-calculate Topological Order (Kahn's Algorithm)
    // We do this ONCE outside the Binary Search to save time.
    // It ensures we only process a node after all its "parent" nodes are done.
    let topoOrder = [];
    let queue = [];
    let tempInDegree = [...inDegree];

    for (let i = 0; i < V; i++) {
        if (tempInDegree[i] === 0) queue.push(i);
    }

    while (queue.length > 0) {
        let u = queue.shift();
        topoOrder.push(u);
        for (let edge of adj[u]) {
            tempInDegree[edge.to]--;
            if (tempInDegree[edge.to] === 0) queue.push(edge.to);
        }
    }

    // 3. The Check Function: Can we survive with 'mid' starting energy?
    function canSurvive(startEnergy) {
        // dp[i] stores the MAXIMUM energy we can have at node i.
        // We initialize with -Infinity to represent unreachable nodes.
        let dp = new Array(V).fill(-Infinity);
        
        // Initial energy after stepping into the source node and getting its power.
        dp[source] = startEnergy + powers[source];
        
        // If the entry power itself kills us, this startEnergy is invalid.
        if (dp[source] < 0) return false;

        for (let u of topoOrder) {
            // Skip nodes we haven't reached or where we ran out of fuel.
            if (dp[u] === -Infinity || dp[u] < 0) continue;
            
            // Optimization: If we reach the destination with any fuel, this startEnergy works.
            if (u === destination) return true;

            for (let edge of adj[u]) {
                // RULE: Must have enough fuel to clear the gate (edge weight).
                if (dp[u] >= edge.weight) {
                    // RESULT: Energy after crossing and receiving the next node's power.
                    let energyAfterArrival = dp[u] - edge.weight + powers[edge.to];
                    
                    /**
                     * Math.max ensures we store the path that reaches the next node 
                     * with the HIGHEST fuel capacity. This gives us the best chance 
                     * to clear future gates/weights.
                     */
                    dp[edge.to] = Math.max(dp[edge.to], energyAfterArrival);
                }
            }
        }
        
        /**
         * Final check: Did we arrive at the destination node with 0 or more fuel?
         * If yes, we successfully navigated the journey.
         */
        return dp[destination] >= 0;
    }

    // 4. Binary Search for the Minimum Starting Value
    let low = 0;
    let high = 2000000000; // 2 * 10^9 (Standard max range for integer problems)
    let result = high;

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        
        if (canSurvive(mid)) {
            /**
             * If we finish with positive fuel, this mid is a valid answer.
             * We shrink the BS window (high = mid - 1) to see if a 
             * smaller starting fuel also works.
             */
            result = mid;
            high = mid - 1;
        } else {
            // If we stalled/failed, we need a bigger tank.
            low = mid + 1;
        }
    }

    return result;
}

// --- EXAMPLE EXECUTION ---
const V = 6;
const edges = [
    [0, 1, 5], [0, 2, 3],
    [1, 3, 6], [1, 2, 2],
    [2, 4, 4], [2, 5, 2], [2, 3, 7],
    [3, 5, 1], [3, 4, 1],
    [4, 5, 2]
];
const powers = [0, 1, -2, 4, 2, -1];
const source = 0;
const destination = 5;

console.log("Minimum Starting Energy Needed:", findMinEnergy(V, edges, powers, source, destination));