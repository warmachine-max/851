

let solve = (wells)=>{
    const n = wells.length;
    let rank = new Array(n).fill(0)
    let parent = new Array(n)

    function findParent(n){
        if (parent[x] !== x){
            parent[x] = find(parent[x]);
        } 
        return x;
    }

    function union(i,j){
        let pi = findParent(i)
        let pj = findParent(j)

        if(pi === pj) return false
         
        if(rank[pi]<rank[pj]){
           parent[pi] = pj 
        }else if(rank[pi]>rank[pj]){
           parent[pj] = pi
        }else{
             parent[pi] = pj 
             rank[pi]++
        }
        return true
    }

    function helper(time){
        let component  = n
        for(let i = 0;i<n;i++){
            parent[i] = i
        }
      for(let i = 0;i<n;i++){
        for(let j = i+1;j<n;j++){
            let dist = Math.abs(wells[i][0]-wells[j][0]) + Math.abs(wells[j][1]-wells[j][1])

            if(time>=Math.ceil(dist/2)){
               if(union(i,j)){
                component--
               }
               if (component === 1) return true;
            }
        }
      }
      return component === 1
    }
    let low = 0
    let high = 2*e^9
    let ans  = low
    while(low<=high){
        let mid = Math.floor((low+high)/2)
        if(helper(mid)){
            low = mid + 1
            ans = low
        }else{
            high = mid -1
        }
    }
    return ans
}
const test1 = [[0, 0], [2, 2]];
console.log("Test 1 Result (Expect 2):", solve(test1));

const test2 = [[0, 0], [0, 4], [4, 0], [4, 4]];
console.log("Test 2 Result (Expect 2):", solve(test2));

const test3 = [[1, 1], [1, 2], [1, 3]];
console.log("Test 3 Result (Expect 1):", solve(test3));