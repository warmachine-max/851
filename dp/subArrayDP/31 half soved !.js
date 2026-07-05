function countPalindromeTripletsPrefixSuffix(s) {
    const n = s.length;
    if (n < 3) return 0;

    // 1. Standard O(n^2) Base Palindrome Grid Setup
    let isPalin = Array.from({ length: n }, () => new Array(n).fill(false));
    let endsAt = new Array(n).fill(0);
    let startsAt = new Array(n).fill(0);

    for (let i = 0; i < n; i++) isPalin[i][i] = true;
    for (let i = 0; i < n - 1; i++) {
        if (s[i] === s[i + 1]) isPalin[i][i + 1] = true;
    }
    for (let len = 3; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            let j = i + len - 1;
            if (s[i] === s[j] && isPalin[i + 1][j - 1]) isPalin[i][j] = true;
        }
    }

    // Accumulate structural bounds
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            if (isPalin[i][j]) {
                startsAt[i]++;
                endsAt[j]++;
            }
        }
    }

    // 2. Build the Left Side Prefix Array
    let prefixCount = new Array(n).fill(0);
    prefixCount[0] = endsAt[0];
    for (let i = 1; i < n; i++) {
        prefixCount[i] = prefixCount[i - 1] + endsAt[i];
    }

    // 3. Build the Right Side Suffix Array (Your mental intuition)
    let suffixCount = new Array(n).fill(0);
    suffixCount[n - 1] = startsAt[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        suffixCount[i] = suffixCount[i + 1] + startsAt[i];
    }

    // 4. Run the final O(n^2) loop over all intervals [i...j]
    let totalTriplets = 0;
    for (let i = 1; i < n - 1; i++) {
        for (let j = i; j < n - 1; j++) {
            if (isPalin[i][j]) {
                // Number of palindromes to the left of 'i'
                let leftOptions = prefixCount[i - 1];
                
                // Number of palindromes to the right of 'j'
                let rightOptions = suffixCount[j + 1];
                
                totalTriplets += (leftOptions * rightOptions);
            }
        }
    }

    return totalTriplets;
}