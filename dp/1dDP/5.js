function solveLikePseudocode(N, costsArray) {
    // We add a dummy '0' at the start so City 1 is at index 1
    let cost = [0, ...costsArray]; 
    let dp = new Array(N + 1).fill(0);

    // City 1: Start
    dp[1] = 0;

    // City 2: Must come from City 1
    dp[2] = Math.abs(cost[2] - cost[1]);

    // City 3: Must come from City 2
    dp[3] = dp[2] + Math.abs(cost[3] - cost[2]);

    // City 4 onwards
    for (let i = 4; i <= N; i++) {
        let jump1 = dp[i - 1] + Math.abs(cost[i] - cost[i - 1]);
        let jump3 = dp[i - 3] + Math.abs(cost[i] - cost[i - 3]);
        dp[i] = Math.min(jump1, jump3);
    }

    return dp[N]; // Now we can just return N!
}