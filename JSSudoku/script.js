const difficulty = 10;
const button = document.getElementById("restart");

const inputs1 = document.querySelectorAll("#grid1 input");
const inputs2 = document.querySelectorAll("#grid2 input");
const inputs3 = document.querySelectorAll("#grid3 input");
const inputs4 = document.querySelectorAll("#grid4 input");
const inputs5 = document.querySelectorAll("#grid5 input");
const inputs6 = document.querySelectorAll("#grid6 input");
const inputs7 = document.querySelectorAll("#grid7 input");
const inputs8 = document.querySelectorAll("#grid8 input");
const inputs9 = document.querySelectorAll("#grid9 input");

function generate() {
    const grids = [inputs1, inputs2, inputs3, inputs4,inputs5, inputs6, inputs7, inputs8, inputs9];

}
button.addEventListener('click', generate);