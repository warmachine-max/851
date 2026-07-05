
let solve =(n, q, rawBossesFromInput, queries)=>{
    let adj = Array.from({ length: n + 1 }, () => []);

    for(let i = 0;i<rawBossesFromInput.length;i++){
        let bose  = rawBossesFromInput[i]
        adj(bose).push(i+2)
        adj(i+2).push(bose)
    }

    let maxLogVal = 17
    let up = Array.from({length:n+1},()=> new Array(maxLogVal).fill(0))

    function dfs(node, parent){
      up[node][0] = parent

      for(let i = 1;i<maxLogVal;i++){

        if(up[up[node][i-1]][i-1] !== 0){
            up[node][i] = up[up[node][i-1]][i-1]
        }else{
            up[node][i] = 0;
        }

            for(let neighbor of adj[node]){
                if(neighbor === parent){
                    continue;
                }

                dfs(neighbor, node)
            } 
      }

      function getKthAncestor(node, k){
        let x
        let remainingK = k

        let j = maxLogVal

        while(remainingK > 0 && j >= 0){
             let currPow  = Math.pow(2, j)
            if(remainingK >= currPow){
                x = up[node][j]
                remainingK -= currPow
                if(node === 0){
                    return -1
                }
            }
            j--
       }


       return x
      
    }
    dfs(1,0)

    for(let query of queries){
        let [node, k] = query
        let ans = getKthAncestor(node, k)
        console.log(ans)
      }
}
}


console.log(solve(n, q, rawBossesFromInput, queries));


const n = 5;
const q = 3;
const rawBossesFromInput = [1, 1, 3, 3]; // Employee 2->1, 3->1, 4->3, 5->3
const queries = [
    [4, 1], // Who is 1 level above 4? (Should be 3)
    [4, 2], // Who is 2 levels above 4? (Should be 1)
    [4, 3]  // Who is 3 levels above 4? (Should be -1)
];