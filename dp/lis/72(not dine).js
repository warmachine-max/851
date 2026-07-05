const MAX = 100005;

let dp = new Array(MAX).fill(0);
let segtree = new Array(4 * MAX).fill(0);

// range sum query
function query(node, start, end, l, r) {

    if (r < start || l > end)
        return 0;

    if (l <= start && end <= r)
        return segtree[node];

    let mid = Math.floor((start + end) / 2);

    return query(node*2, start, mid, l, r) +
           query(node*2+1, mid+1, end, l, r);
}

// update value at index
function update(node, start, end, index, value) {

    if (start === end) {
        segtree[node] += value;
        return;
    }

    let mid = Math.floor((start + end) / 2);

    if (index <= mid)
        update(node*2, start, mid, index, value);
    else
        update(node*2+1, mid+1, end, index, value);

    segtree[node] = segtree[node*2] + segtree[node*2+1];
}


// example input (1-indexed)
let b = [0,1,2,3];
let n = b.length - 1;

for (let i = 1; i <= n; i++) {

    let number = b[i];

    // query(node, start, end, l, r)
    // sum of dp[1..number-1]
    let sum = query(1, 1, MAX-1, 1, number-1);

    dp[number] = 1 + sum;

    // update tree
    update(1,1,MAX-1,number,dp[number]);
}

let total = 0;

for (let i = 1; i < MAX; i++)
    total += dp[i];
console.log(segtree)
console.log(total);