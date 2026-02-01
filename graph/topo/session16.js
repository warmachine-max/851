function solveMenagerie(n, a, costs) {
    // a[i] is what animal (i+1) fears. Example: a[0] = 3 means Animal 1 fears Animal 3.
    // costs[i] is cost of animal (i+1). Example: costs[0] is cost of Animal 1.
    
    // Standard Adjacency List (1-indexed)
    // adj[u] will store the animal that u fears.
    const adj = new Array(n + 1); 
    const inDegree = new Array(n + 1).fill(0);
    const sold = new Array(n + 1).fill(false);
    const order = [];
    let totalMoney = 0;

    // 1. Build the Graph (1-indexed)
    for (let i = 1; i <= n; i++) {
        let u = i;          // The animal
        let v = a[i - 1];   // The animal it fears
        adj[u] = v;         // Edge: u -> v
        inDegree[v]++;      // v is being feared by u
    }

    // 2. Phase 1: The Dominoes (In-Degree 0)
    let queue = [];
    for (let i = 1; i <= n; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }

    let head = 0;
    while (head < queue.length) {
        let u = queue[head++];
        if (sold[u]) continue;

        sold[u] = true;
        order.push(u);
        
        // Double money because the scary animal (adj[u]) hasn't been sold yet
        totalMoney += costs[u - 1] * 2;

        let v = adj[u];
        inDegree[v]--;
        if (inDegree[v] === 0) {
            queue.push(v);
        }
    }

    // 3. Phase 2: The Cycles (Finding hidden merry-go-rounds)
    for (let i = 1; i <= n; i++) {
        if (!sold[i]) {
            let cycle = [];
            let curr = i;

            // Extract the cycle nodes
            while (!sold[curr]) {
                sold[curr] = true;
                cycle.push(curr);
                curr = adj[curr];
            }

            // Find the cheapest animal in this specific cycle
            let minPos = 0;
            for (let j = 1; j < cycle.length; j++) {
                // costs is 0-indexed, so we use animal number - 1
                if (costs[cycle[j] - 1] < costs[cycle[minPos] - 1]) {
                    minPos = j;
                }
            }

            // Standard Circular Traversal:
            // Start selling from the animal the cheapest one fears.
            for (let j = 0; j < cycle.length; j++) {
                let indexInCycleArr = (minPos + 1 + j) % cycle.length;
                let animal = cycle[indexInCycleArr];
                
                order.push(animal);
                
                // If it's the very last one in this cycle loop (the cheapest sacrifice)
                if (j === cycle.length - 1) {
                    totalMoney += costs[animal - 1];     // 1x
                } else {
                    totalMoney += costs[animal - 1] * 2; // 2x
                }
            }
        }
    }

    return { totalMoney, order };
}

// --- Example ---
const n = 5;
const a = [3, 4, 4, 1, 3]; // 1->3, 2->4, 3->4, 4->1, 5->3
const costs = [10, 20, 30, 40, 50]; 

const result = solveMenagerie(n, a, costs);
console.log("Max Profit:", result.totalMoney);
console.log("Order:", result.order.join(" "));