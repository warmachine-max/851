function findMinimumCostCircular(arr) {
    const n = arr.length;
    
    // 1. Find the single average target value
    const totalSum = arr.reduce((sum, val) => sum + val, 0);
    const target = totalSum / n; 

    let minWindowLength = Infinity;
    let bestStart = -1;

    // 2. Outer Loop: Find the shortest valid journey window
    for (let i = 0; i < n; i++) {
        // YOUR INSIGHT: Skip any warehouse that is already Equal to the average.
        // Also skip Low points because our journey can only start at a High point.
        if (arr[i] <= target) continue; 

        let truckBalance = 0;
        let currentLength = 0;

        // Drive clockwise from the High point 'i'
        for (let k = 0; k < n; k++) {
            let j = (i + k) % n; // Circular index wrap-around
            
            // Equal points contribute exactly 0 here, skipping their impact on cargo
            let netContribution = arr[j] - target; 
            truckBalance += netContribution;
            currentLength++;

            // If we hit a Low point and our truck successfully balanced everything so far
            if (arr[j] < target && truckBalance >= 0) {
                if (currentLength < minWindowLength) {
                    minWindowLength = currentLength;
                    bestStart = i;
                }
            }
        }
    }

    // 3. Phase 3: Calculate the exact movement cost inside our chosen window
    let totalCost = 0;
    let itemsInTruck = 0;
    
    for (let k = 0; k < minWindowLength; k++) {
        let idx = (bestStart + k) % n;
        
        itemsInTruck += (arr[idx] - target); // Equal nodes add 0 to the truck cargo here too!
        totalCost += Math.abs(itemsInTruck);
    }

    return totalCost;
}