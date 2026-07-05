/**
 * @param {number} n
 * @param {number[][]} rides
 * @return {number}
 */
var maxTaxiEarnings = function(n, rides) {
    const m = rides.length;

    // 1. Sort rides by END time (Ascending)
    // This allows us to process the timeline linearly.
    rides.sort((a, b) => a[1] - b[1]);

    // 2. Pre-calculate profits and extract endTimes for Binary Search
    const endTimes = rides.map(r => r[1]);
    
    // 3. dp[i] = max profit using a subset of the first i rides.
    // dp[0] is a dummy base case (0 profit).
    const dp = new Array(m + 1).fill(0n);

    for (let i = 1; i <= m; i++) {
        const [start, end, tip] = rides[i - 1];
        const currentProfit = BigInt(end - start + tip);

        // CHOICE 1: Skip this ride
        // The max profit remains the same as the result for the previous ride.
        const skip = dp[i - 1];

        // CHOICE 2: Take this ride
        // We need the max profit from the latest ride that finished BEFORE this one started.
        // We binary search for 'start' in our sorted 'endTimes' array.
        const prevRideIdx = findLastCompatible(endTimes, start);
        
        // If findLastCompatible returns -1, no ride finished early enough.
        // Otherwise, add currentProfit to the DP value at that index.
        const take = currentProfit + (prevRideIdx !== -1 ? dp[prevRideIdx + 1] : 0n);

        // Store the best of the two choices
        dp[i] = skip > take ? skip : take;
    }

    // Convert BigInt back to Number for the final result
    return Number(dp[m]);
};

/**
 * Binary Search: Find the index of the rightmost element <= target
 */
function findLastCompatible(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let result = -1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        // If this ride ends at or before our current ride starts, it's compatible.
        if (arr[mid] <= target) {
            result = mid; // Potential candidate, but check if there's a later one
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return result;
}

// n = 10
// rides = [[1, 6, 1], [3, 10, 2], [10, 12, 3]]


/**
 * @param {number} n
 * @param {number[][]} rides
 * @return {number}
 */
var maxTaxiEarnings = function(n, rides) {
    // 1. Create the 'Timeline Buckets'
    // Each index 'i' represents a city point.
    // We store an array of [start, profit] for every ride ending there.
    const endAt = Array.from({ length: n + 1 }, () => []);

    for (let i = 0; i < rides.length; i++) {
        const [start, end, tip] = rides[i];
        const profit = end - start + tip;
        endAt[end].push([start, profit]);
    }

    // 2. DP Array (The Taxi's Bank Account)
    // dp[i] = max earnings possible by the time we reach city i.
    // We use BigInt because total profit can exceed Number.MAX_SAFE_INTEGER (2^53 - 1)
    const dp = new BigInt64Array(n + 1);

    // 3. Drive through the cities 1 to n
    for (let i = 1; i <= n; i++) {
        // Option 1: Just drive from city (i-1) to i without a passenger.
        // Your current max is at least what you had at the previous city.
        dp[i] = dp[i - 1];

        // Option 2: Check all passengers waiting to be dropped off at city i.
        const ridesEndingHere = endAt[i];
        for (let j = 0; j < ridesEndingHere.length; j++) {
            const [start, profit] = ridesEndingHere[j];
            
            // Total = (earnings before the ride started) + (profit of this ride)
            const currentTotal = dp[start] + BigInt(profit);
            
            if (currentTotal > dp[i]) {
                dp[i] = currentTotal;
            }
        }
    }

    // Convert BigInt back to a standard Number for LeetCode's return type
    return Number(dp[n]);
};