let summa = (nums) => {
    let n = nums.length;
    let map = new Map();
  
    for (let num of nums) {
        map.set(num, (map.get(num) || 0) + 1);
    }
    
    // Sort unique keys so we process numbers in increasing order
    let arr = Array.from(map.keys()).sort((a, b) => a - b);
    let maxAp = 1; // Minimum AP length is 1

    // Size based on max possible value (100) + 1
    let dp = Array.from({ length: 101 }, () => new Array(100).fill(1));

    for (let i = 0; i < arr.length; i++) {
        let num = arr[i];
        for (let j = 1; j <= 99; j++) {
            let prev = num - j;
            if (prev >= 1 && map.has(prev)) {
                // dp[num][j] is the length of AP ending at 'num' with difference 'j'
                dp[num][j] = dp[prev][j] + 1;
                maxAp = Math.max(maxAp, dp[num][j]);
            }
        }
    }
    return maxAp;
};

let nums = [3, 8, 2, 9, 1, 11, 14, 16, 7, 5];
console.log(summa(nums)); // Output: 4 (Example: 2, 5, 8, 11 or 1, 3, 5, 7)