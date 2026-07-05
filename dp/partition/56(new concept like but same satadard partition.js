let optimizedSolve = (arr) => {
  let n = arr.length;
  let dp = new Array(n + 1).fill(0);
  let minWasteForColor = new Map();

  for (let i = 1; i <= n; i++) {
    let color = arr[i - 1];
    
    // Option 1: Current bottle is wasted
    dp[i] = dp[i - 1] + 1;

    // Option 2: If we've seen this color before
    if (minWasteForColor.has(color)) {
      // The magic: we only care about the MINIMUM waste 
      // recorded before any previous instance of this color.
      dp[i] = Math.min(dp[i], minWasteForColor.get(color));
    }

    // Update the map: for this color, the best "entry point" 
    // is the waste we had before the current bottle.
    let currentEntryWaste = dp[i - 1];
    if (!minWasteForColor.has(color) || currentEntryWaste < minWasteForColor.get(color)) {
      minWasteForColor.set(color, currentEntryWaste);
    }
  }
  return dp[n];
};