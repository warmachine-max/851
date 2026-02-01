/**
 * @param {string} A - The starting string
 * @param {string} B - The target string
 * @returns {number} - Minimum operations or -1 if impossible
 */function solve(A, B) {
    let n = A.length;
    let a = A.split(''); // Convert to array because JS strings are immutable
    let b = B.split('');
    let operations = 0;

    // 1. Direction Check: Can we actually reach B?
    for (let i = 0; i < n; i++) {
        if (a[i] > b[i]) return -1;
    }

    // 2. Alphabet Loop: Process 'a' through 'z'
    // 97 is ASCII for 'a', 122 is ASCII for 'z'
    for (let code = 97; code <= 122; code++) {
        let currentChar = String.fromCharCode(code);
        let smallestTarget = '{'; // ASCII character just after 'z'
        let needsChange = false;

        // Find the smallest target for all instances of currentChar
        for (let i = 0; i < n; i++) {
            if (a[i] === currentChar && a[i] !== b[i]) {
                if (b[i] < smallestTarget) {
                    smallestTarget = b[i];
                }
                needsChange = true;
            }
        }

        // 3. Execution: If we found a target, move ALL relevant chars to it
        if (needsChange) {
            operations++;
            for (let i = 0; i < n; i++) {
                // If this is our current char and it needs to move...
                if (a[i] === currentChar && a[i] !== b[i]) {
                    a[i] = smallestTarget; // "Merge" them into the next station
                }
            }
        }
    }

    return operations;
} // still nate able to understand,,  explain with dry run/