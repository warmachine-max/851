/**
 * Shortest path in unweighted graph using Infinity initialization
 */
function findShortestPath(n, e, edges, s) {
    // 1. Create Adjacency List
    const adj = Array.from({ length: n + 1 }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }

    // 2. Initialize distances with Infinity
    const distance = new Array(n + 1).fill(Infinity);
    const queue = [];

    // 3. Set source distance to 0 and add to queue
    distance[s] = 0;
    queue.push(s);

    while (queue.length > 0) {
        const curr = queue.shift();

        for (const neighbor of adj[curr]) {
            // Check if the path through 'curr' is shorter than current known distance
            // Since weights are 1, we check if: distance[curr] + 1 < current distance
            if (distance[neighbor] > distance[curr] + 1) {
                distance[neighbor] = distance[curr] + 1;
                queue.push(neighbor);
            }
        }
    }

    // 4. Print results
    console.log(`Source Node: ${s}`);
    for (let i = 1; i <= n; i++) {
        const distOutput = distance[i] === Infinity ? "Unreachable" : distance[i];
        console.log(`Node ${i} -> Shortest Distance: ${distOutput}`);
    }
}

// --- Console Test Case ---
const n_nodes = 6;
const e_edges = 5;
const edgeList = [
    [1, 2],
    [2, 3],
    [3, 4],
    [1, 5],
    [5, 4]
    // Node 6 remains disconnected to test Infinity
];
const source = 1;

findShortestPath(n_nodes, e_edges, edgeList, source);