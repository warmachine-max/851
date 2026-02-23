
// Subset S1 is a group of numbers from Array A.
// Subset S2 is a group of numbers from Array B.
// You find the biggest number in S1 and the biggest number in S2.
// If the big one from A is greater than or equal to the big one from B, you count it.

// so what is a subset
//=In technical terms, a subset is a selection of elements from a given set where every element in the selection is a member of the original set,
//  representing one of the 2^n possible combinations in its power set.

// above is question description

function solve(A, B) {
    // 1. Frequency Maps
    let mapA = new Map();
    let mapB = new Map();

    for (let x of A) mapA.set(x, (mapA.get(x) || 0) + 1);
    for (let x of B) mapB.set(x, (mapB.get(x) || 0) + 1);

    // 2. Sorted Unique Keys
    let keysA = Array.from(mapA.keys()).sort((a, b) => a - b);
    let keysB = Array.from(mapB.keys()).sort((a, b) => a - b);

    let totalPairs = 0;
    let g = 0; // Elements in A smaller than current King
    let m = 0; // Total elements in B smaller or equal to current King
    let j = 0; // B-Pointer

    // 3. The Two-Pointer Engine
    for (let i = 0; i < keysA.length; i++) {
        let currentAKey = keysA[i];
        let v = mapA.get(currentAKey);

        // Slide the B-pointer forward to find all beatable elements
        while (j < keysB.length && keysB[j] <= currentAKey) {
            m += mapB.get(keysB[j]);
            j++;
        }

        // Subsets of A where currentAKey is the absolute MAX
        // Formula: 2^g * (2^v - 1)
        let waysS1 = Math.pow(2, g) * (Math.pow(2, v) - 1);

        // Subsets of B that are Non-Empty and Max <= currentAKey
        // Formula: 2^m - 1
        let waysS2 = 0;
        if (m > 0) {
            waysS2 = Math.pow(2, m) - 1;
        }

        // Multiply to get all valid pairs for THIS King
        totalPairs += (waysS1 * waysS2);

        // Update g for the next King (The Grip)
        g += v;
    }

    return totalPairs;
}

// --- Test Case ---
// A = [10], B = [9] -> Should be 1 pair: ({10}, {9})
// A = [1, 10], B = [9] -> Should be 3 pairs: ({10}, {9}), ({1, 10}, {9}), ({1}, none) -> wait, {1} beats nothing!
// Let's run a real one:
const arrA = [1,2,5,8,10,16];
const arrB = [9,15,18];
console.log("Total Non-Empty Pairs:", solve(arrA, arrB)); 
// Expected: 2 
// (Subsets of A with max 10 are {10} and {1, 10}. Both beat {9}. Total = 2)

/*
================================================================================
ALGORITHM WALKTHROUGH: THE "KING" & "TWO-POINTER" STRATEGY
--------------------------------------------------------------------------------
Input:
Array A = [1, 2, 5, 8, 10, 16]
Array B = [9, 15, 18]

Goal: Find pairs (S1, S2) where max(S1) >= max(S2) and both are NON-EMPTY.

INITIAL STATE:
g = 0 (No subordinates in A yet)
m = 0 (No beatable elements in B yet)
j = 0 (B-pointer starts at 9)

--------------------------------------------------------------------------------
PHASE 1: THE "SMALL" KINGS (1, 2, 5, 8)
B-pointer does NOT move because even 8 < 9.
- King 1: m=0. Ways S2 = (2^0 - 1) = 0. (0 pairs) -> Update g=1
- King 2: m=0. Ways S2 = (2^0 - 1) = 0. (0 pairs) -> Update g=2
- King 5: m=0. Ways S2 = (2^0 - 1) = 0. (0 pairs) -> Update g=3
- King 8: m=0. Ways S2 = (2^0 - 1) = 0. (0 pairs) -> Update g=4
Result: g is now 4 (representing 1, 2, 5, 8).

--------------------------------------------------------------------------------
PHASE 2: KING 10 (THE FIRST WINNER)
1. Slide B-Pointer: 9 <= 10? YES. m = 1. (Pointer j moves to index 1: 15)
2. Slide B-Pointer: 15 <= 10? NO. Stop.
3. Calculate S1 (Winners): 
   g=4 subordinates, v=1 King.
   WaysA = 2^g * (2^v - 1) = 2^4 * (2^1 - 1) = 16 * 1 = 16 subsets.
4. Calculate S2 (Losers):
   m=1 beatable in B.
   WaysB = (2^m - 1) = (2^1 - 1) = 1 subset ({9}).
5. Result: 16 * 1 = 16 PAIRS. -> Update g=5 (adds 10 to subordinates).

--------------------------------------------------------------------------------
PHASE 3: KING 16 (THE STRONGEST)
1. Slide B-Pointer: (Starts at 15) 15 <= 16? YES. m = 1+1 = 2. (j moves to index 2: 18)
2. Slide B-Pointer: 18 <= 16? NO. Stop.
3. Calculate S1 (Winners): 
   g=5 subordinates, v=1 King.
   WaysA = 2^5 * (2^1 - 1) = 32 * 1 = 32 subsets.
4. Calculate S2 (Losers):
   m=2 beatable in B.
   WaysB = (2^m - 1) = (2^2 - 1) = 3 subsets ({9}, {15}, {9, 15}).
5. Result: 32 * 3 = 96 PAIRS.

--------------------------------------------------------------------------------
FINAL TALLY:
King 10 Contribution: 16
King 16 Contribution: 96
GRAND TOTAL: 112 Valid Pairs.
================================================================================
*/