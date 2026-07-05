
function getThresholds(s, A) {
    const n = s.length;
    const limit = new Array(n);
    const freq = new Array(26).fill(0);
    let left = 0;

    for (let i = 0; i < n; i++) {
        let charIdx = s.charCodeAt(i) - 97;
        freq[charIdx]++;

        while (freq[charIdx] > A[charIdx]) {
            let leftCharIdx = s.charCodeAt(left) - 97;
            freq[leftCharIdx]--;
            left++;
        }
        limit[i] = left;
    }
    return limit;
}

function solveElite2D(s, targetK, A) {
    
    const n = s.length;
    if (n === 0) return targetK === 0 ? "1" : "0";
    const limit = getThresholds(s, A);

    let dp = Array.from({ length: targetK + 1 }, () => new Array(n + 1).fill(0n));
    dp[0][0] = 1n;

    for (let k = 1; k <= targetK; k++) {
       
        let pref = new Array(n + 1).fill(0n);
        for (let i = 0; i <= n; i++) {
            pref[i + 1] = pref[i] + dp[k - 1][i];
        }

        for (let i = 1; i <= n; i++) {
            let L = limit[i - 1]; 
            let R = i         
            if (L <= R) {
                dp[k][i] = pref[R] - pref[L];
            }
        }
    }

    return dp[targetK][n].toString();
}

// --- TEST DRIVE ---

const s = "abcabc";
const A = [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const K = 3;
console.log(solveElite2D(s, K, A)); 

// "a bc abc " ,," a bca bc",,  "ab c abc",, "ab ca bc",, "ab cab c",, "abc a bc",, "abc ab c",, i think this must be the answer !