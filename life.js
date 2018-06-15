var DEFAULT_SIZE = 16;
var DEFAULT_INTERVAL = 0.25;

var size;
var interval;
var cells;
var generation;
var timerId;

var startButton = document.getElementById('startButton');
var stopButton = document.getElementById('stopButton');
var nextStepButton = document.getElementById('nextStepButton');
var clearButton = document.getElementById('clearButton');
var reconstructButton = document.getElementById('reconstructButton');
var randomButton = document.getElementById('randomButton');
var gliderButton = document.getElementById('gliderButton');
var intervalInput = document.getElementById('interval');
var sizeInput = document.getElementById('size');
var modeManual = document.getElementById('modeManual');
var modeAutomatic = document.getElementById('modeAutomatic');
var field = document.getElementById('field');
var generationLabel = document.getElementById('generationLabel');

/* random numbers generation helpers */

function random0or1() {
    return Math.round(Math.random());
}

function randomMinus1or1() {
    var r = Math.round(Math.random()) ? 1 : -1; 
    console.log(r);
    return r;
}

function randomUpToN(n) {
    return Math.floor(Math.random() * n);
}

/* cell manipulation helpers */

function toggleAlive(cell) {
    cell.classList.toggle("alive");
}

function isAlive(cell) {
    return cell.classList.contains("alive");
}

function isDead(cell) {
    return !isAlive(cell);
}

function makeAlive(cell) {
    if (!isAlive(cell))
        cell.click();
}

function makeDead(cell) {
    if (isAlive(cell))
        cell.click();
}

/* other helpers */

function updateGenerationLabel() {
    generationLabel.innerHTML = "generation: " + generation;
}

function getAliveNeighborsCount(cell) {
    var n = 0;
    for (var x = -1; x <= 1; x++) 
        for (var y = -1; y <= 1; y++) {
            if (x != 0 || y != 0) {
                if (isAlive(getNeighbor(cell.row, cell.col, x, y))) {
                    n++;
                }
            }
        }
    return n;
}

function getNeighbor(row, col, x, y) {
    var new_x = row + x;
    var new_y = col + y;
    return cells[normalizeCoord(new_x)][normalizeCoord(new_y)];
}

function normalizeCoord(coord) {
    if (coord < 0) {
        return (coord + size) % size;
    }
    if (coord >= size) {
        return (coord - size) % size;
    }
    return coord;
}

function drawMap(map) {
    var col = randomUpToN(size);
    var row = randomUpToN(size);
    var signR = randomMinus1or1();
    var signC = randomMinus1or1();
    var rotate = random0or1();
    for (var r = 0; r < map.length; r++) 
        for (var c = 0; c < map[r].length; c++) {
            var rc = rotate ? row + r * signR : col + c * signC;
            var cc = rotate ? col + c * signC : row + r * signR;
            nrow = normalizeCoord(rc);
            ncol = normalizeCoord(cc);
            if (map[r][c] == "x") {
                makeAlive(cells[nrow][ncol]);
            } else {
                makeDead(cells[nrow][ncol]);
            }
        }
}

function constructField() {
    size = Number(sizeInput.value);
    cells = new Array(size);
    for (var r = 0; r < size; r++) {
        cells[r] = new Array(size);
        var cellRow = document.createElement("div");
        cellRow.className ="cellRow";
        field.appendChild(cellRow);
        for (var c = 0; c < size; c++) {
            var cell = document.createElement("div");
            cell.className = "cell";
            cell.row = r;
            cell.col = c;
            cell.onclick = cellClick;
            cellRow.appendChild(cell);
            cells[r][c] = cell;  
        }   
    }
}

/* basic logic */

function nextGeneration() {
    console.log("nextGeneration");
    var newGen = Array(size);
    for (var r = 0; r < size; r++) {
        newGen[r] = new Array(size);
        for (var c = 0; c < size; c++) {
            var cell = cells[r][c];
            var n = getAliveNeighborsCount(cell)
            if (isDead(cell) && n == 3) {
                newGen[r][c] = true;
            } else 
            if (isAlive(cell) && n != 2 && n != 3) {
                newGen[r][c] = false;
            } else {
                newGen[r][c] = isAlive(cell)
            }
        }
    }
    for (var r = 0; r < size; r++) {
        for (var c = 0; c < size; c++) {
            if (newGen[r][c])
                makeAlive(cells[r][c])
            else
                makeDead(cells[r][c]);
        }
    }
    generation++;
    updateGenerationLabel();
}

/* click handlers and actions */

function cellClick() {
    toggleAlive(this);
}

function modeManualClick() {
    stop();
    startButton.disabled = true;
    stopButton.disabled = true;
    intervalInput.disabled = true;
    nextStepButton.disabled = false;
}

function modeAutomaticClick() {
    startButton.disabled = false;
    stopButton.disabled = true;
    intervalInput.disabled = false;
    nextStepButton.disabled = true;
}

function start() {
    stop();
    startButton.disabled = true;
    stopButton.disabled = false;
    interval = Number(intervalInput.value);
    timerId = setInterval(function() { nextGeneration() }, interval * 1000);
}

function stop() {
    startButton.disabled = false;
    stopButton.disabled = true;
    if (timerId != undefined) {
        clearInterval(timerId);
    }
}

function clear() {
    for (var r = 0; r < size; r++) 
        for (var c = 0; c < size; c++) 
            makeDead(cells[r][c]);
}

function reconstruct() {
    if (modeAutomatic.checked)
        stop();
    generation = 0;
    updateGenerationLabel();
    var l = field.children.length;
    for (var i = 0; i < l; i++) {
        field.removeChild(field.children[0]);
    }
    constructField();
}

function random() {
    clear();
    for (var r = 0; r < size; r++) 
        for (var c = 0; c < size; c++) {
            if (random0or1()) {
                makeAlive(cells[r][c]);
            } else {
                makeDead(cells[r][c]);
            }
        }
}

function glider() {
    var map = ["x  ",
               "x x",
               "xx "];
    drawMap(map);               
}

/* define and run init function */

function initialize() {
    sizeInput.value = DEFAULT_SIZE;
    intervalInput.value = DEFAULT_INTERVAL;
    generation = 0;

    modeManual.onclick = modeManualClick;
    modeAutomatic.onclick = modeAutomaticClick;
    startButton.onclick = start;
    stopButton.onclick = stop;
    nextStepButton.onclick = nextGeneration;
    clearButton.onclick = clear;
    reconstructButton.onclick = reconstruct;
    randomButton.onclick = random;
    gliderButton.onclick = glider;

    modeAutomatic.click();
    
    constructField();
}

initialize();