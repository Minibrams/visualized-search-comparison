// Constants
const FONT_SIZE = 10;
const SEARCH_HEAD_LENGTH = 25;
const SEARCH_HEAD_WIDTH = 10;

// Generate data
let numNumbers = 30;
var numArray = generateData(numNumbers);
var target = chooseTarget(numArray);

// Sets it all off immediately
let l, b;
init();

// Bind the reset button
document.getElementById('reset').onclick = function () {
    reset();
}

// Builds the entire sketch object for the linear search visualization. 
// Returns a sketch object used for creating new p5 objects.
function buildLinearSearchSketch () {
    let linearSearch = function (p) {
        // So both setup and draw can access it:
        let search = null;
    
        p.setup = function() {
            // Save height and width for later positioning
            let cnv = document.getElementById('linearCanvas');
            this.width = cnv.offsetWidth;
            this.height = cnv.offsetHeight;
            
            //Configure p5
            p.textSize(FONT_SIZE);
            p.createCanvas(this.width, this.height);
    
            // Establish visualization for linear search
            search = new VisualLinearSearch(p, numArray);
            search.startSearchFor(target);
            
            // Bind step function to button clicks
            let button = document.getElementById('stepLinear');
            let stepCountField = document.getElementById('stepCountLinear');
            let numExcludedNodesField = document.getElementById('exclusionCounterLinear');
            button.onclick = function () {
                search.step();
                stepCountField.innerHTML = "Number of steps: " + search.numSteps;
                numExcludedNodesField.innerHTML = 'Number of excluded nodes: ' + search.numExcludedNodes;
            }
        }
    
        p.draw = function () {
            p.background(250, 235, 215);
            search.show();
        }
    } 

    return linearSearch;
}

// Builds the entire sketch object for the binary search visualization. 
// Returns a sketch object used for creating new p5 objects.
function buildBinarySearchSketch () {
    let binarySearch = function (p) {
        let binary = null;
    
        p.setup = function () {
            // Save height and width for later positioning
            let cnv = document.getElementById('binaryCanvas');
            this.width = cnv.offsetWidth;
            this.height = cnv.offsetHeight;
            
            //Configure p5
            p.textSize(FONT_SIZE);
            p.createCanvas(this.width, this.height);
    
            let sorted = numArray.sort(function(a,b){return a - b});
            binary = new VisualBinarySearch(p, sorted, this.width * 0.5, 50);
            binary.startSearchFor(target);
    
            // Bind button to step function
            let button = document.getElementById('stepBinary');
            let numStepsField = document.getElementById('stepCountBinary');
            let numExcludedNodesField = document.getElementById('exclusionCounterBinary');
            button.onclick = function () {
                binary.step();
                numStepsField.innerHTML = 'Number of steps: ' + binary.numSteps;
                numExcludedNodesField.innerHTML = 'Number of excluded nodes: ' + binary.numExcludedNodes; 
            }
        }
    
        p.draw = function () {
            p.background(255, 228, 196);
            binary.show();
        }
    }

    return binarySearch;
}

//UTILITY

//Unique random numbers between 0 and 100
function generateData(numData) {
    let arr = []
    while(arr.length < numData){
        let randomnumber = Math.floor(Math.random()*100);
        if(arr.indexOf(randomnumber) > -1) continue;
        arr[arr.length] = randomnumber;
    }
    return arr;
}

function chooseTarget(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
}

function reset() {
    l.remove();
    b.remove();
    numArray = generateData(numNumbers);
    target = chooseTarget(numArray);
    l = new p5(buildLinearSearchSketch(), 'linearCanvas');
    b = new p5(buildBinarySearchSketch(), 'binaryCanvas');
}

function init() {
    numArray = generateData(numNumbers);
    target = chooseTarget(numArray);
    l = new p5(buildLinearSearchSketch(), 'linearCanvas');
    b = new p5(buildBinarySearchSketch(), 'binaryCanvas');
}
