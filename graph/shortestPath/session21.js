let summa = (n, edges, colors, source, destination) => {
    let distArr = new Array(n + 1).fill(Infinity);
    let adjArr = Array.from({ length: n + 1 }, () => []);
    // color[node][0] will store the Max Blue nodes found for that node so far
    let color = Array.from({ length: n + 1 }, () => [0, 0]); 

    // 1. Build Adjacency List (Unweighted - fixed)
    for (let [u, v] of edges) {
        adjArr[u].push(v);
        adjArr[v].push(u);
    }

    distArr[source] = 0;
    let stack = [];
    
    // 2. Initialize Source (fixed initial stack structure)
    let startB = colors[source] === "Blue" ? 1 : 0;
    let startR = colors[source] === "Red" ? 1 : 0;
    stack.push([source, 0, startB, startR]);
    color[source] = [startB, startR];

    while (stack.length) {
        let [currNode, dist, B, R] = stack.shift();

        for (let nei of adjArr[currNode]) {
            let nextB = B + (colors[nei] === "Blue" ? 1 : 0);
            let nextR = R + (colors[nei] === "Red" ? 1 : 0);

            // CASE 1: Found a strictly shorter path (fixed: added dist update)
            if (distArr[nei] > 1 + distArr[currNode]) {
                distArr[nei] = 1 + distArr[currNode];
                color[nei][0] = nextB;
                color[nei][1] = nextR;
                stack.push([nei, distArr[nei], nextB, nextR]);
            } 
            // CASE 2: Same distance, check if this path is BETTER (fixed logic)
            else if (distArr[nei] === 1 + distArr[currNode]) {
                // Priority: We want more Blue nodes (color[nei][0] is current best B)
                if (color[nei][0] < nextB) {
                    color[nei][0] = nextB;
                    color[nei][1] = nextR;
                    stack.push([nei, distArr[nei], nextB, nextR]); 
                }
            }
        }
    }

    return {
        "Shortest Distance": distArr[destination],
        "Max Blue Nodes": color[destination][0]
    };
}

const n = 6;
const edges = [[1, 2], [1, 3], [1, 4], [2, 6], [3, 6], [4, 5], [5, 6]];
const colors = ["", "Red", "Blue", "Blue", "Red", "Blue", "Blue"]; 
const source = 1;
const destination = 6;

console.log(summa(n, edges, colors, source, destination));