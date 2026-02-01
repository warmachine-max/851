

let summa = (mat) => {
    let n = mat.length;
    let m = mat[0].length;

    // Fix 1: Corrected Array initialization
    let mSP = Array.from({ length: n }, () => Array(m).fill(Infinity));
    let hSP = Array.from({ length: n }, () => Array(m).fill(Infinity));
    let parent = Array.from({ length: n }, () => Array(m).fill(null));

    // Fix 2: Correct direction vectors [D, U, R, L]
    let dx = [1, -1, 0, 0]; 
    let dy = [0, 0, 1, -1];
    let dir = ["D", "U", "R", "L"];
    
    let monsPos = [];
    let humPos = [];
    let end = null;
    let hx, hy;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (mat[i][j] === "M") {
                monsPos.push([i, j]);
                mSP[i][j] = 0;
            } else if (mat[i][j] === "A") {
                hx = i; hy = j;
                humPos.push([i, j]);
                hSP[i][j] = 0;
            }
        }
    }

    // 1. Monster BFS
    while (monsPos.length) {
        let [x, y] = monsPos.shift();
        for (let i = 0; i < 4; i++) {
            let nx = x + dx[i], ny = y + dy[i];
            if (nx >= 0 && nx < n && ny >= 0 && ny < m && mat[nx][ny] !== "#") {
                // Fix 3: Push back to queue so monsters keep moving!
                if (mSP[nx][ny] > 1 + mSP[x][y]) {
                    mSP[nx][ny] = 1 + mSP[x][y];
                    monsPos.push([nx, ny]);
                }
            }
        }
    }

    // 2. Human BFS
    while (humPos.length) {
        let [x, y] = humPos.shift();

        if (x === 0 || x === n - 1 || y === 0 || y === m - 1) {
            end = [x, y];
            break;
        }

        for (let i = 0; i < 4; i++) {
            let nx = x + dx[i], ny = y + dy[i];
            if (nx >= 0 && nx < n && ny >= 0 && ny < m && mat[nx][ny] !== "#") {
                if (hSP[nx][ny] > hSP[x][y] + 1 && mSP[nx][ny] > hSP[x][y] + 1) {
                    hSP[nx][ny] = hSP[x][y] + 1;
                    parent[nx][ny] = [x, y, dir[i]];
                    humPos.push([nx, ny]);
                }
            }
        }
    }

    if (!end) return "NO";

    // 3. Backtracking Path
    let path = [];
    let [tempX, tempY] = end;
    // Fix 4: Use && so it stops when BOTH coordinates match the start
    while (tempX !== hx || tempY !== hy) {
        let info = parent[tempX][tempY];
        path.push(info[2]); // The direction character
        let prevX = info[0];
        let prevY = info[1];
        tempX = prevX;
        tempY = prevY;
    }

    return {
        res1: "YES",
        res: path.reverse().join("")
    };
}

const grid = [
    ['#', '#', '#', '#', '#', '#'],
    ['#', 'M', '.', '.', 'A', '#'],
    ['#', '.', '#', '.', '.', '#'],
    ['#', '.', '.', '.', 'M', '#'],
    ['#', '.', '#', '#', '#', '#']
];

console.log(summa(grid));