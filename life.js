var DEFAULT_SIZE = 10;
var DEFAULT_INTERVAL = 0.5;

var startButton = document.getElementById('startButton');
var stopButton = document.getElementById('stopButton');
var nextStepButton = document.getElementById('nextStepButton');
var clearButton = document.getElementById('clearButton');
var interval = document.getElementById('interval');
var size = document.getElementById('size');
var modeManual = document.getElementById('modeManual');
var modeAutomatic = document.getElementById('modeAutomatic');

function modeManualClick() {
	startButton.disabled = true;
	stopButton.disabled = true;
	interval.disabled = true;
	nextStepButton.disabled = false;
}

function modeAutomaticClick() {
	startButton.disabled = false;
	stopButton.disabled = false;
	interval.disabled = false;
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

function initialize() {
	size.value = DEFAULT_SIZE;
	interval.value = DEFAULT_INTERVAL;
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