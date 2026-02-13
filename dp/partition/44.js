let optimizedSample = (a, b) => {
    let n = a.length;
    let dp = Array.from({ length: n + 1 }, () => [Infinity, Infinity]);

    dp[0][0] = 0; // Start

    for (let i = 1; i <= n; i++) {
        // To be a Microservice at i:
        // Previous server could have been anything (Micro or Monolith)
        dp[i][0] = Math.min(dp[i - 1][0], dp[i - 1][1]) + a[i - 1];

        // To be a Monolith at i:
        if (i >= 2) {
            // Option A: Start a NEW monolith of length 2
            let startNew = dp[i - 2][0] + b[i - 2] + b[i - 1];
            let startNewFromMono = dp[i - 2][1] + b[i - 2] + b[i - 1];

            // Option B: Continue an EXISTING monolith
            let continueMono = dp[i - 1][1] + b[i - 1];

            dp[i][1] = Math.min(startNew, startNewFromMono, continueMono);
        }
    }

    return Math.min(dp[n][0], dp[n][1]);
}

let a = [3, 5, 2, 1, 9];
let b = [1, 1, 10, 5, 3];
console.log(optimizedSample(a, b)); // Result: 13