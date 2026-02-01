
let summa = (n, activationDay, source, destination, edges) => {
    let adj = Array.from({ length: n + 1 }, () => []);
    // Records the EARLIEST day we can reach a node
    let leastTime = new Array(n + 1).fill(Infinity);
    // Records the SHORTEST steps to reach a node AT that earliest time
    let leastDist = new Array(n + 1).fill(Infinity);

    for (let [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }

    let queue = [];
    // node, time, dist
    queue.push([source, 0, 0]);
    leastTime[source] = 0;
    leastDist[source] = 0;

    while (queue.length) {
        // For 1800 rating, we sort to ensure we always process the earliest time first
        queue.sort((a, b) => a[1] - b[1] || a[2] - b[2]);
        let [u, t, d] = queue.shift();

        // Optimization: if we already found a better time for this node, skip it
        if (t > leastTime[u]) continue;
        if (u === destination) continue; // Keep searching for other nodes or stop here

        for (let v of adj[u]) {
            // THE CALCULATION: Travel time (t+1) vs Opening Time
            let arrivalTime = Math.max(t + 1, activationDay[v]);
            let arrivalDist = d + 1;

            // Priority 1: Found a faster day to reach node V
            // Priority 2: Found a shorter distance for the same day
            if (arrivalTime < leastTime[v] || (arrivalTime === leastTime[v] && arrivalDist < leastDist[v])) {
                leastTime[v] = arrivalTime;
                leastDist[v] = arrivalDist;
                queue.push([v, arrivalTime, arrivalDist]);
            }
        }
    }
    console.log(leastTime)
    return leastTime[destination];
}

const n = 6;
const source = 1;
const destination = 6;

// Activation: Node 2 is a HUGE delay
const activationDay = [-1, 0, 1, 0, 1, 2, 0]; 

const edges = [
    [1, 2], [2, 6], // Path A: Direct but slow (Wait for Node 2)
    [1, 3], [3, 4], [4, 5], [5, 6] // Path B: Long but fast (No waiting)
];
console.log(summa(n,activationDay,source,destination,edges))