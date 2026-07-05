const fs = require('fs');

function solve() {
    // Read input (simulating Scanner using synchronous read from stdin)
    const input = fs.readFileSync(0, 'utf8').split(/\s+/);
    let idx = 0;

    const n = parseInt(input[idx++]);
    const k = parseInt(input[idx++]);
    
    const MAXN = 30;
    const MAXK = 15;
    const MAXSUM = 150;

    const a = new Array(n + 1).fill(0);
    const b = new Array(n + 1).fill(0);

    for (let i = 1; i <= n; i++) a[i] = parseInt(input[idx++]);
    for (let i = 1; i <= n; i++) b[i] = parseInt(input[idx++]);

    let dp = Array.from({ length: n + 1 }, () => 
        Array.from({ length: k + 1 }, () => 
            Array.from({ length: MAXSUM + 1 }, () => 
                new Array(MAXSUM + 1).fill(false)
            )
        )
    );

    dp[0][0][0][0] = true;
    for (let i = 1; i <= n; i++) {
        dp[i][0][0][0] = true;
    }

    for (let i = 1; i <= n; i++) {
        for (let pick = 1; pick <= k; pick++) {
            for (let sum1 = 0; sum1 <= MAXSUM; sum1++) {
                for (let sum2 = 0; sum2 <= MAXSUM; sum2++) {
                    if (dp[i - 1][pick][sum1][sum2]) {
                        dp[i][pick][sum1][sum2] = true;
                    } 
                    else if (sum1 >= a[i] && sum2 >= b[i] && dp[i - 1][pick - 1][sum1 - a[i]][sum2 - b[i]]) {
                        dp[i][pick][sum1][sum2] = true;
                    }
                }
            }
        }
    }

    let finalAnswer = 0;
    for (let sum1 = 0; sum1 <= MAXSUM; sum1++) {
        for (let sum2 = 0; sum2 <= MAXSUM; sum2++) {
            if (dp[n][k][sum1][sum2]) {
                const answer = Math.min(sum1, sum2);
                finalAnswer = Math.max(finalAnswer, answer);
            }
        }
    }

    console.log(finalAnswer);
}

solve();