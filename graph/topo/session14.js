function solve(n, edges) {
    const adj = Array.from({ length: n }, () => []);
    const inDegree = new Array(n).fill(0);

    // 1. Build Directed Graph
    for (let [u, v] of edges) {
        adj[u].push(v);
        inDegree[v]++;
    }

    // 2. Initial Batch
    let queue = [];
    for (let i = 0; i < n; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }

    let seconds = 0;
    let count = 0;

    // 3. Level-Order BFS
    while (queue.length > 0) {
        let size = queue.length;
        // If we want to return total seconds, we increment here
        if (size > 0) seconds++; 
        
        let nextBatch = [];
        for (let i = 0; i < size; i++) {
            let curr = queue[i];
            count++;

            for (let neighbor of adj[curr]) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] === 0) {
                    nextBatch.push(neighbor);
                }
            }
        }
        queue = nextBatch;
    }

    return count === n ? seconds : -1;
}