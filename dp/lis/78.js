/**
 * @param {string[]} tiles
 * @return {number}
 */
function solveLongestTileSequence(tiles) {
    // dpR: Longest subsequence ending in a Red square
    // dpG: Longest subsequence ending in a Green square
    let dpR = 0;
    let dpG = 0;

    for (let tile of tiles) {
        // Convert to uppercase just in case
        let first = tile[0].toUpperCase();
        let second = tile[1].toUpperCase();

        if (first === 'R' && second === 'R') {
            // "RR" can only extend an existing Red sequence.
            // If dpR is 0, it starts a new one (0 + 1 = 1).
            dpR = dpR + 1;
        } 
        else if (first === 'G' && second === 'G') {
            // "GG" can only extend an existing Green sequence.
            dpG = dpG + 1;
        } 
        else if (first === 'R' && second === 'G') {
            // "RG" bridges from Red to Green.
            // New Green best is the old Red best + 1.
            dpG = Math.max(dpG, dpR + 1);
        } 
        else if (first === 'G' && second === 'R') {
            // "GR" bridges from Green to Red.
            // New Red best is the old Green best + 1.
            dpR = Math.max(dpR, dpG + 1);
        }
    }

    // The answer is the best we found in either "Box"
    return Math.max(dpR, dpG);
}

// Dry Run Example:
const input = ["RG", "RR", "GG", "GR", "GG", "RG"];
console.log("Max Sequence Length:", solveLongestTileSequence(input)); 
// Output: 5