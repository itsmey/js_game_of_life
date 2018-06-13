var DEFAULT_SIZE = 10;
var DEFAULT_INTERVAL = 0.5;

var size;
var interval;
var cells;

var startButton = document.getElementById('startButton');
var stopButton = document.getElementById('stopButton');
var nextStepButton = document.getElementById('nextStepButton');
var clearButton = document.getElementById('clearButton');
var intervalInput = document.getElementById('interval');
var sizeInput = document.getElementById('size');
var modeManual = document.getElementById('modeManual');
var modeAutomatic = document.getElementById('modeAutomatic');
var field = document.getElementById('field');

function modeManualClick() {
	startButton.disabled = true;
	stopButton.disabled = true;
	intervalInput.disabled = true;
	nextStepButton.disabled = false;
}

function modeAutomaticClick() {
	startButton.disabled = false;
	stopButton.disabled = false;
	intervalInput.disabled = false;
	nextStepButton.disabled = true;
}

function start() {

}

function stop() {

}

function nextStep() {

}

function clear() {

}

function cellClick() {
	this.classList.toggle("dead");
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

function initialize() {
	sizeInput.value = DEFAULT_SIZE;
	intervalInput.value = DEFAULT_INTERVAL;
	modeManual.onclick = modeManualClick;
	modeAutomatic.onclick = modeAutomaticClick;
	startButton.onclick = start;
	stopButton.onclick = stop;
	nextStepButton.onclick = nextStep;
	clearButton.onclick = clear;

	modeManual.click();
	
	constructField();
}

initialize();