function getSubarrayMaxTable(arr) {
    const n = arr.length;
    // Create the N x N table
    let maxTable = Array.from({ length: n }, () => Array(n).fill(0));

    // 1. Base Case: Length 1 subarrays (The diagonal)
    for (let i = 0; i < n; i++) {
        maxTable[i][i] = arr[i];
    }

    // 2. Length 2 and above using your Overlapping Ranges logic
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            let j = i + len - 1;
            
            // Your Logic: Look at the "Left" neighbor and "Bottom" neighbor
            // maxTable[i][j-1] is the range missing the last element
            // maxTable[i+1][j] is the range missing the first element
            maxTable[i][j] = Math.max(maxTable[i][j - 1], maxTable[i + 1][j]);
        }
    }

    return maxTable;
}

// --- Test Run ---
const arr = [1, 5, 2, 4, 3];
const table = getSubarrayMaxTable(arr);

// Beautifully print the table for confirmation
console.log(table);