let countPartitionWaysWithLogs = (arr,boundary)=>{
    let n = arr.length;

    let dp = new Array(n + 1);

    dp[1] = 1
    for (let i = 2; i <= n; i++) {
        let sum = 0
        let j = i-1
        sum  = arr[i] + arr[j]

        while(sum <= boundary && j > 0){
            dp[i] += dp[j]
            j--
            sum += arr[j]
        }
    }
    return dp[n]
}



console.log(countPartitionWaysWithLogs([1, 1, 4, 1, 1], 4));