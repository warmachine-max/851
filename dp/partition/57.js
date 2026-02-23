function minCostToWater(n, radii, costs) {
    let dp = new Array(n + 1).fill(Infinity);
    dp[0] = 0;

    // 1. DISCOVERY (Forward)
    for (let i = 0; i <= n; i++) {
        let L = Math.max(0, i - radii[i]);
        let R = Math.min(n, i + radii[i]);
        if (dp[L] !== Infinity) dp[R] = Math.min(dp[R], dp[L] + costs[i]);
    }

    // 2. HEALING (Backward) - The "Solid Ground" maker
    for (let i = n - 1; i >= 0; i--) {
        dp[i] = Math.min(dp[i], dp[i + 1]);
    }

    // 3. CONNECTION (Forward) - Your Core Logic once more!
    for (let i = 0; i <= n; i++) {
        let L = Math.max(0, i - radii[i]);
        let R = Math.min(n, i + radii[i]);
        if (dp[L] !== Infinity) dp[R] = Math.min(dp[R], dp[L] + costs[i]);
    }

    return dp[n] === Infinity ? -1 : dp[n];
}
const radii = [0, 0, 2, 0, 1, 0]; 
const costs = [0, 0, 100, 0, 50, 0];

console.log(minCostToWater(n, radii, costs));