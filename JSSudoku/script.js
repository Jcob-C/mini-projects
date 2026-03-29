const difficultyInput = document.getElementById("difficulty");
const restartButton = document.getElementById("restart");
const grid1 = document.querySelectorAll("#grid1 input");
const grid2 = document.querySelectorAll("#grid2 input");
const grid3 = document.querySelectorAll("#grid3 input");
const grid4 = document.querySelectorAll("#grid4 input");
const grid5 = document.querySelectorAll("#grid5 input");
const grid6 = document.querySelectorAll("#grid6 input");
const grid7 = document.querySelectorAll("#grid7 input");
const grid8 = document.querySelectorAll("#grid8 input");
const grid9 = document.querySelectorAll("#grid9 input");
const grids = [grid1, grid2, grid3, grid4,grid5, grid6, grid7, grid8, grid9];

function generateSudokuBoard() {
    clearBoard();
    fillBoard(getSeed());
    unsolveBoard();
}

function fillBoard(seed) {
    let gridcell = getEmptyGridAndCell();

    if (!gridcell) {
        return true;
    }

    for (let i = 0; i < 9; i++) {
        if (!getIntersectingNumbers(gridcell[0], gridcell[1]).includes(seed[i])) {
            grids[gridcell[0]][gridcell[1]].value = seed[i];

            if (fillBoard(seed)) {
                return true;
            }

            grids[gridcell[0]][gridcell[1]].value = "";
        }
    }
    return false;
}

function unsolveBoard() {
    for (let grid = 0; grid < grids.length; grid++) {
        for (let cell = 0; cell < grids[grid].length; cell++) {
            grids[grid][cell].readOnly = true;
            grids[grid][cell].style.backgroundColor = "#eee";
            grids[grid][cell].style.fontWeight = "bold";


            if (getRandomInt(0,100) < difficultyInput.value) {
                grids[grid][cell].value = "";
                grids[grid][cell].readOnly = false;

                grids[grid][cell].style.backgroundColor = "";
                grids[grid][cell].style.fontWeight = "";
            }
        }
    }
}

function clearBoard() {
    for (let grid = 0; grid < grids.length; grid++) {
        for (let cell = 0; cell < grids[grid].length; cell++) {
            grids[grid][cell].value = "";
        }
    }
}

function getSeed() {
    let arr = [1,2,3,4,5,6,7,8,9];
    let shuffled = [];

    while (arr.length > 0) {
        shuffled.push(arr.splice(getRandomInt(0, arr.length-1), 1)[0]);
    }

    return shuffled;
}

function getEmptyGridAndCell() {
    for (let grid = 0; grid < grids.length; grid++) {
        for (let cell = 0; cell < grids[grid].length; cell++) {
            if (grids[grid][cell].value === "") {
                return [grid, cell];
            }
        }
    }
    return false;
}

function getIntersectingNumbers(gridNum, cellNum) {
    const used = [];

    // current grid
    const currentGrid = grids[gridNum];

    // row + col inside the 3x3 grid
    const localRow = Math.floor(cellNum / 3);
    const localCol = cellNum % 3;

    // global row + col (0–8)
    const globalRow = Math.floor(gridNum / 3) * 3 + localRow;
    const globalCol = (gridNum % 3) * 3 + localCol;

    // --- 1. same 3x3 grid ---
    currentGrid.forEach(input => {
        const val = parseInt(input.value);
        if (val) used.push(val);
    });

    // --- 2. same row across grids ---
    for (let g = 0; g < 9; g++) {
        // only grids in same horizontal band
        if (Math.floor(g / 3) === Math.floor(gridNum / 3)) {
            const rowStart = localRow * 3;
            for (let i = 0; i < 3; i++) {
                const val = parseInt(grids[g][rowStart + i].value);
                if (val) used.push(val);
            }
        }
    }

    // --- 3. same column across grids ---
    for (let g = 0; g < 9; g++) {
        // only grids in same vertical band
        if (g % 3 === gridNum % 3) {
            for (let i = 0; i < 3; i++) {
                const index = localCol + i * 3;
                const val = parseInt(grids[g][index].value);
                if (val) used.push(val);
            }
        }
    }

    return used;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

restartButton.addEventListener('click', generateSudokuBoard);