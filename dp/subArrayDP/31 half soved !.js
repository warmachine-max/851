function getTotalPalindromes(s) {
    const n = s.length;
    if (n === 0) return 0;

    // --- STEP 1: YOUR METHOD (The Boolean Foundation) ---
    // This tells us: "Is s[i...j] a palindrome?"
    let isPal = Array.from({ length: n }, () => Array(n).fill(false));

    // Single characters are always palindromes
    for (let i = 0; i < n; i++) {
        isPal[i][i] = true;
    }

    // Checking lengths 2 and up (Your exact logic)
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i + len - 1 < n; i++) {
            let j = i + len - 1;

            if (s[i] === s[j] && (len === 2 || isPal[i + 1][j - 1])) {
                isPal[i][j] = true;
            }
        }
    }

    // --- STEP 2: THE SCOREBOARD (The Range Counter) ---
    // This tells us: "How many total palindromes are inside s[i...j]?"
    let rangeCount = Array.from({ length: n }, () => Array(n).fill(0));

    for (let len = 1; len <= n; len++) {
        for (let i = 0; i + len - 1 < n; i++) {
            let j = i + len - 1;

            if (len === 1) {
                // Base case: range of length 1 has exactly 1 palindrome
                rangeCount[i][j] = 1;
            } else {
                // Formula: Left side + Right side - Middle + (Current Whole String)
                let left = rangeCount[i][j - 1];
                let right = rangeCount[i + 1][j];
                let middle = rangeCount[i + 1][j - 1];
                let current = isPal[i][j] ? 1 : 0;

                rangeCount[i][j] = left + right - middle + current;
            }
        }
    }

    // Return the count for the whole string (from index 0 to n-1)
    return rangeCount[0][n - 1];
}

// TEST CASES
console.log(getTotalPalindromes("aba"));   // Output: 4 ('a', 'b', 'a', 'aba')
console.log(getTotalPalindromes("aaaa"));  // Output: 10