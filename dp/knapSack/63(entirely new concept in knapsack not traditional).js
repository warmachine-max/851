/**
 * @param {number} m - Total budget
 * @param {number[]} cost - Array of costs for each item
 * @param {number[]} happy - Array of happiness values for each item
 * @param {number[]} min - Minimum quantity required for each item
 * @param {number[]} max - Maximum quantity allowed for each item
 */
const solveTraditional = (m, cost, happy, min, max) => {
    let n = cost.length;
    let mandatoryCost = 0;
    let mandatoryHappy = 0;

    // 1. Handle Mandatory Requirements
    for (let i = 0; i < n; i++) {
        mandatoryCost += cost[i] * min[i];
        mandatoryHappy += happy[i] * min[i];
    }

    if (mandatoryCost > m) return -1; // Insufficient budget for minimums

    let remainingBudget = m - mandatoryCost;
    
    // 2. Expand Bounded items into a list of individual items
    // (In traditional 0/1 Knapsack, each "extra" item is treated as its own unit)
    let items = [];
    for (let i = 0; i < n; i++) {
        let extraAvailable = max[i] - min[i];
        for (let k = 0; k < extraAvailable; k++) {
            items.push({ c: cost[i], h: happy[i] });
        }
    }

    let numItems = items.length;
    // 3. Initialize 2D DP table: rows = items, cols = remainingBudget
    // dp[i][j] = max happiness with first i items and budget j
    let dp = Array.from({ length: numItems + 1 }, () => new Array(remainingBudget + 1).fill(0));

    // 4. Fill the DP table
    for (let i = 1; i <= numItems; i++) {
        let currentItem = items[i - 1];
        for (let j = 0; j <= remainingBudget; j++) {
            if (currentItem.c <= j) {
                // Max of (Don't take current item, Take current item)
                dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - currentItem.c] + currentItem.h);
            } else {
                // Cannot afford current item, take value from previous row
                dp[i][j] = dp[i - 1][j];
            }
        }
    }

    // Result is the last cell + the happiness we already got from mandatory purchases
    return dp[numItems][remainingBudget] + mandatoryHappy;
};

// Example Usage:
const budget = 100;
const costs = [20, 30];
const happiness = [50, 80];
const minQty = [1, 1];
const maxQty = [2, 3];

console.log("Max Total Happiness:", solveTraditional(budget, costs, happiness, minQty, maxQty));