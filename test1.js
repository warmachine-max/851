let summa  = (nums,k) =>{
    let n = nums.length;
    let prefix  = Array(n).fill(0);
    prefix[0] = nums[0];


    for(let i = 1; i < n; i++){
        prefix[i] = prefix[i-1] + nums[i];
    }


    let dp = Array.from({length : n}, () => Array(n).fill(-Infinity))

    function solve(i,j,curK,conversionFactor){
        if(curK === 1){
            if(conversionFactor === 1){
                return 1 * (prefix[j] - prefix[i-1])
            }else{
                return  -1 * (prefix[j] - prefix[i-1]);
            }
        }

        if(dp[i][j] !== -Infinity){
            return dp[i][j];
        }
        let res = -Infinity;

         for(let p = i;p<j;p++){
            if(curK === k){
                if(conversionFactor === 1){
                   res = Math.max(res, prefix[p] + solve(p+1,j+1,curK-1,-1));
                }else{
                    res = Math.max(res, prefix[p] - solve(p+1,j+1,curK-1,-1)) 
                }
               
            }else{
                if(conversionFactor === 1){
                    res = Math.max(res, prefix[j] - prefix[p] + solve(p+1,j+1,curK-1,-1));
                }else{
                     res = Math.max(res, prefix[j] - prefix[i-1] + solve(p+1,j+1,curK-1,1));
                }
                
            }

            dp[i][j] = res
            return res;      
    }
}

   
   //     // base case}
    
//      but if  k = 1 or k = n 
//      we can do somethinge thing like 
//     if(k === 1 ) {
//         partition (i,j)
//       prefix[i]
//       // depending upon partion end
//     }if(k === n){
//          partition (i,j)
//          res = prefix[n] - prefix[i-1];
//     }else{
//         res = prefix[j] - prefix[i-1];
//     }
// }

 let res =  solve(0,n-k,k,1)
 console.log(dp)
 return res;
}



let nums  = [8,9,11,12,14,15,16,17,18,19];

let k = 4

console.log(summa(nums))