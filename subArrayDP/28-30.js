var longestPalindrome = function(s) {
    let n = s.length;
    if (n < 2) return s;

    let dp = Array.from({ length: n }, () => Array(n).fill(false));
    let start = 0, maxLen = 1;

    // single characters
    for (let i = 0; i < n; i++) dp[i][i] = true;

    // length >= 2
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i + len - 1 < n; i++) {
            let j = i + len - 1;

            if (s[i] === s[j] && (len === 2 || dp[i + 1][j - 1])) {
                dp[i][j] = true;
                if (len > maxLen) {
                    maxLen = len;
                    start = i;
                }
            }
        }
    }
   
    let res = s.substring(start, start + maxLen);
    console.log(dp);
    return res
};


//console.log(longestPalindrome("abccccbadef")); // "abccccba"
console.log(longestPalindrome("forgeeksskeegfor"));