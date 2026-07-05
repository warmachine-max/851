/**
 * @param {number[]} nums - The input array
 * @param {number} P - EXACT number of single elements to delete
 * @param {number} Q - EXACT number of adjacent pairs to delete
 * @param {number} R - EXACT number of adjacent triplets to delete
 */
function solveMaxSumExact(nums, P, Q, R) {
    const n = nums.length;
    const memo = new Map();

    function dp(i, p, q, r) {
        // 1. Base Case: Reached the end of the array
        if (i >= n) {
            // ONLY valid if all quotas are exactly zero
            return (p === 0 && q === 0 && r === 0) ? 0 : -Infinity;
        }

        // 2. Check Cache
        const key = `${i},${p},${q},${r}`;
        if (memo.has(key)) return memo.get(key);

        // --- TRANSITIONS ---
        
        // Choice 1: Keep the current element (only if space allows for remaining deletions)
        let res = nums[i] + dp(i + 1, p, q, r);

        // Choice 2: Delete 1 element (P)
        if (p > 0) {
            res = Math.max(res, dp(i + 1, p - 1, q, r));
        }

        // Choice 3: Delete an adjacent pair (Q)
        if (q > 0 && i + 1 < n) {
            res = Math.max(res, dp(i + 2, p, q - 1, r));
        }

        // Choice 4: Delete an adjacent triplet (R)
        if (r > 0 && i + 2 < n) {
            res = Math.max(res, dp(i + 3, p, q, r - 1));
        }

        memo.set(key, res);
        return res;
    }

    const finalResult = dp(0, P, Q, R);
    return finalResult === -Infinity ? "No Valid Path" : finalResult;
}

const nums = [10, -5, 20, 30, -10, -10, 50];
console.log(solveMaxSumExact(nums, 1, 1, 1));