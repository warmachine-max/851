let summa  = (nums) =>{
  let m = nums.length
  let n = nums[0].length

  let directions = [[0,1],[1,0],[-1,0],[0,-1]]
  let visited = Array.from({length:m},()=>Array(n).fill(false))
  
  let maxVal = -Infinity
  
   for(let i=0;i<m;i++){
    for(let j=0;j<n;j++){
      if(nums[i][j]===-1){
        visited[i][j] = true
      }else{
        maxVal = Math.max(maxVal, nums[i][j])
      }
    }
   }

    function helper(i,j){
       let map  = new Map()
       map.set(nums[i][j],1)
       function dfs(i,j){
        visited[i][j] = true
          for(const [dx,dy] of directions){
          let x = i + dx
          let y = j + dy
           if(x>=0 && x<m && y>=0 && y<n && !visited[x][y]){
            map.set(nums[x][y], (map.get(nums[x][y]) || 0) + 1)
             dfs(x,y)
           }
        }
       } 
       dfs(i,j)
       return map
    }

    let res = []
    let total  = 0
    for(let i=0;i<m;i++){
      for(let j=0;j<n;j++){
        if(!visited[i][j]){
          let fortress = helper(i,j)
          console.log(fortress)
            let sorted = Array.from(fortress.keys()).sort((a,b)=>a-b)
              for(let i = 0;i<sorted.length;i++){
                let upperBound  = Math.ceil(maxVal/sorted[i])
                 for(let j =2;j<=upperBound;j++){
                    if(fortress.has(sorted[i]*j)){
                      total  = total +(fortress.get(sorted[i]) +fortress.get(sorted[i]*j)) 
                      * (sorted[i]*j + sorted[i])
                    }
                 }
                 total = total + (fortress.get(sorted[i]) * (sorted[i]))
              }
        }
      }
    }
    
    return total 
    
}





const matrix = [
  [ 2,  4, -1],
  [-1, -1, 18],
  [ 9,  3, -1]
];
console.log(summa(matrix));


// Expected Output: 54