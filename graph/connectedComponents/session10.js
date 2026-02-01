/**
 * Problem: Connect components in F to match G with minimum operations.
 * Logic: 
 * 1. Identify "Islands" in G using Component IDs.
 * 2. Delete edges in F that cross between two different G-islands.
 * 3. Add edges to bridge "sub-islands" within each G-island.
 */

const solve = (n, m1, m2, edgesF, edgesG) => {
    // Adjacency list for Graph G
    const adjG = Array.from({ length: n + 1 }, () => []);
    for (const [u, v] of edgesG) {
        adjG[u].push(v);
        adjG[v].push(u);
    }

    // --- STEP 1: Find Component IDs in G ---
    const componentID = new Array(n + 1).fill(0);
    let idCounter = 0;

    for (let i = 1; i <= n; i++) {
        if (componentID[i] === 0) {
            idCounter++;
            // Iterative DFS (Stack) to avoid Stack Overflow
            let stack = [i];
            componentID[i] = idCounter;
            while (stack.length > 0) {
                let curr = stack.pop();
                for (let neighbor of adjG[curr]) {
                    if (componentID[neighbor] === 0) {
                        componentID[neighbor] = idCounter;
                        stack.push(neighbor);
                    }
                }
            }
        }
    }

    // --- STEP 2: Keep or Kill Edges in F ---
    let operations = 0;
    const adjF_Clean = Array.from({ length: n + 1 }, () => []);

    for (const [u, v] of edgesF) {
        if (componentID[u] === componentID[v]) {
            // Keep: They belong to the same island in G
            adjF_Clean[u].push(v);
            adjF_Clean[v].push(u);
        } else {
            // Kill: This edge connects two different islands in G
            operations++;
        }
    }

    // --- STEP 3: Bridge the Sub-islands in F ---
    const visitedF = new Array(n + 1).fill(false);
    // Map to track how many sub-islands exist for each G-ComponentID
    const subIslandCount = new Map();

    for (let i = 1; i <= n; i++) {
        if (!visitedF[i]) {
            let gid = componentID[i];
            subIslandCount.set(gid, (subIslandCount.get(gid) || 0) + 1);
            
            // Iterative DFS to mark the whole sub-island
            let stack = [i];
            visitedF[i] = true;
            while (stack.length > 0) {
                let curr = stack.pop();
                for (let neighbor of adjF_Clean[curr]) {
                    if (!visitedF[neighbor]) {
                        visitedF[neighbor] = true;
                        stack.push(neighbor);
                    }
                }
            }
        }
    }

    // Formula: Add (Count - 1) bridges for every G-component
    for (let count of subIslandCount.values()) {
        operations += (count - 1);
    }

    return operations;
};

// --- TEST CASE ---
// N=3, F=[1-2, 2-3], G=[1-3]
const n = 3;
const edgesF = [[1, 2], [2, 3]];
const edgesG = [[1, 3]];
console.log("Minimum Operations:", solve(n, 2, 1, edgesF, edgesG)); // Result: 3