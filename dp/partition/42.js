/**
 * @param {string} s
 * @return {number}
 */
var minimumSubstringsInPartition = function(s) {
    const n = s.length;
    // dp[i] stores the min partitions for prefix s[0...i-1]
    const dp = new Int32Array(n + 1).fill(n + 1); 
    dp[0] = 0;

    for (let i = 1; i <= n; i++) {
        // We initialize a new Map for each 'end' position i
        const freqMap = new Map();
        let maxFreq = 0;

        // Traverse backwards from i to 1
        for (let j = i; j >= 1; j--) {
            const char = s[j - 1];
            
            // Update frequency in the Map
            const newCount = (freqMap.get(char) || 0) + 1;
            freqMap.set(char, newCount);
            
            // Track the maximum frequency seen in the current substring s[j-1...i-1]
            if (newCount > maxFreq) {
                maxFreq = newCount;
            }

            const subLen = i - j + 1;

            /**
             * The "Balanced" Condition:
             * total_length === max_frequency * number_of_unique_characters
             */
            if (subLen === maxFreq * freqMap.size) {
                // If the substring is balanced, update dp[i]
                if (dp[j - 1] + 1 < dp[i]) {
                    dp[i] = dp[j - 1] + 1;
                }
            }
        }
    }

    return dp[n];
};