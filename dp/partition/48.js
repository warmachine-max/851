let summa = (number, k) => {
  let n = number.length;
  let m = k.toString().length;
  let dp = Array(n + 1).fill(0);

  dp[0] = 1;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m && i - j >= 0; j++) {
      // 1. Get the substring FIRST as a string
      let subStr = number.substring(i - j, i);

      // 2. Check the string for leading zero (using quotes '0')
      if (subStr[0] === '0') continue;

      // 3. Convert to number for the value check
      let subVal = parseInt(subStr);

      if (subVal <= k) {
        dp[i] = (dp[i] + dp[i - j]) % 1000000007;
      } else {
        // Optimization: if value > k, no need to check longer lengths
        break; 
      }
    }
  }
  return dp[n]; // Don't forget to return!
};