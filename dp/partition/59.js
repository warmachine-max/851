/**
 * @param {string} s
 * @return {number}
 */
function longestVowelSubsequence(s) {
    // These variables represent our "Levels" (States)
    // a: only 'a's
    // e: 'a...e'
    // i: 'a...e...i'
    // o: 'a...e...i...o'
    // u: 'a...e...i...o...u'
    let a = 0, ae = 0, aei = 0, aeio = 0, aeiou = 0;

    for (let char of s) {
        if (char === 'a') {
            // 'a' can always extend a sequence of 'a's
            a++;
        } else if (char === 'e') {
            // 'e' can only start if we have at least one 'a'
            if (a > 0) ae = Math.max(a, ae) + 1;
        } else if (char === 'i') {
            // 'i' can only start if we have at least one 'e'
            if (ae > 0) aei = Math.max(ae, aei) + 1;
        } else if (char === 'o') {
            // 'o' can only start if we have at least one 'i'
            if (aei > 0) aeio = Math.max(aei, aeio) + 1;
        } else if (char === 'u') {
            // 'u' can only start if we have at least one 'o'
            if (aeio > 0) aeiou = Math.max(aeio, aeiou) + 1;
        }
    }

    console.log(a,ae,aei,aeio,aeiou)
    // The result is our final state 'aeiou'
    return aeiou;
}

// Test Case
const input = "aeiaaioooouu";
console.log("Longest Vowel Subsequence Length:", longestVowelSubsequence(input)); 
// Output: 10 (aa i oooo uu)