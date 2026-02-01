let getGlobalRanking = (n, m, ratings) => {
  // 1. Correct Matrix Initialization
  let sRR = Array.from({length: m}, () => new Array(m).fill(0));

  // 2. Loop through N (Users), not M (Songs)
  for (let i = 0; i < n; i++) {
    let cUR = ratings[i]; // Current User's List

    // Compare pairs based on their order in cUR
    for (let i1 = 0; i1 < m; i1++) {
      for (let j1 = i1 + 1; j1 < m; j1++) {
        let songA = cUR[i1]; // This song appeared earlier
        let songB = cUR[j1]; // This song appeared later
        sRR[songA][songB] += 1; // So A beats B
      }
    }
  }

  // 3. Adjacency List Initialization fix
  let adj = Array.from({length: m}, () => []);
  let indegre = new Array(m).fill(0);

  for (let i = 0; i < m; i++) {
    for (let j = i + 1; j < m; j++) {
      if (sRR[i][j] > n / 2) {
        adj[i].push(j);
        indegre[j]++;
      } else if (sRR[i][j] === n / 2 && n % 2 === 0) {
        adj[i].push(j);
        indegre[j]++;
      } else {
        adj[j].push(i);
        indegre[i]++;
      }
    }
  }

  // 4. Kahn's Algorithm (Your logic was perfect here!)
  let stack = [];
  for (let i = 0; i < indegre.length; i++) {
    if (indegre[i] === 0) {
      stack.push(i);
    }
  }

  let res = [];
  while (stack.length) {
    let curr = stack.shift();
    res.push(curr);
    for (let nei of adj[curr]) {
      indegre[nei]--;
      if (indegre[nei] === 0) {
        stack.push(nei);
      }
    }
  }

  return res.length === m ? res : -1;
}