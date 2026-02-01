var minimumK = function(nums) {
   let right = nums.reduce((a,b) => a + b, 0);
   let sum = right
   let left = 1
   let upperBound
   while (left < right) {
      let mid = Math.floor((left + right) / 2);
      let count = 0
      if(sum%mid === 0) {
         count = count + sum/mid
      }else{
         count = count + Math.floor(sum/mid) + 1
      }

      if(count <= mid *mid) {
         upperBound = mid
         right = mid - 1
      }else{
         left = mid + 1
      }
   }
   
   function helper(n){
     let count = 0
     for(let num of nums) {
        if(num % n === 0) {
           count = count + num / n
        }else{
           count = count + Math.floor(num / n) + 1
        }
     }
     return count <= n * n
   }

   let low = 1
   let high = upperBound

   while(low < high) {
      let mid = Math.floor((low + high) / 2);
      if(helper(mid)) {
         high = mid
      }else{
         low = mid + 1
      }
   }
   
   
    
}


console.log(minimumK([3,7,5])); // 1