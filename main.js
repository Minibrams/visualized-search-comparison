// There are a lot of side effects here, but I swear to the old gods and the new that 
// if I have to spend one more minute trying to make JavaScript both readable and 
// functionally sound, I'm going to fucking scream.

// Global constants
const FONT_SIZE = 10;
const SEARCH_HEAD_LENGTH = 25;
const SEARCH_HEAD_WIDTH = 10;

// Generate data
let numNumbers = 30;
var numArray = generateData(numNumbers);
var target = chooseTarget(numArray);

// Visualize everything immediately - don't wait for a button press here.
let l, b;
init();

// Bind the reset button
document.getElementById('reset').onclick = function () {
    reset();
    resetSearchInfo();
}

// Also with user input
document.getElementById('resetWithInput').onclick = function () {
    resetWithInput();
    resetSearchInfo();
}

// Builds the entire sketch object for the linear search visualization. 
// Returns a sketch object used for creating new p5 objects.
function buildLinearSearchSketch () {
    let linearSearch = function (p) {
        // So both setup and draw can access it:
        let search = null;
    
        // Is run once when the p5.js sketch is started
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
    
        // Is run once every frame
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
        // So both setup and draw can access it
        let binary = null;
    
        // Run once when the sketch is started
        p.setup = function () {
            // Save height and width for later positioning
            let cnv = document.getElementById('binaryCanvas');
            this.width = cnv.offsetWidth;
            this.height = cnv.offsetHeight;
            
            //Configure p5
            p.textSize(FONT_SIZE);
            p.createCanvas(this.width, this.height);
    
            // Can you believe that I had to tell it what comparing function
            // it should use to sort an array of numbers. Fuck javascript.
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

        // Run once every frame
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

// Hard reset with random data
function reset() {
    // Remove the sketches
    l.remove();
    b.remove();

    // Read the number of numbers to generate: 
    let num = document.getElementById('numRandomNumbersField').value;
    let isValid = /^[0-9]*$/.test(num);
    if (!isValid) {
        // TODO: Show some error message here.
    }
    
    numNumbers = parseInt(num);
    // Regenerate data
    numArray = generateData(numNumbers);
    target = chooseTarget(numArray);

    // Regenerate the sketches
    l = new p5(buildLinearSearchSketch(), 'linearCanvas');
    b = new p5(buildBinarySearchSketch(), 'binaryCanvas');
}

// Sets it all up when the site loads
function init() {
    numArray = generateData(numNumbers);
    target = chooseTarget(numArray);
    l = new p5(buildLinearSearchSketch(), 'linearCanvas');
    b = new p5(buildBinarySearchSketch(), 'binaryCanvas');
}

// Reset but with user input instead of random data. 
function resetWithInput() {
    // Remove the sketches
    l.remove();
    b.remove();

    // Get the user input
    let input = document.getElementById('userInput').value;
    let errorField = document.getElementById('inputErrorMessageField');
    errorField.style.visibility = 'hidden';

    // Clean the input, alert user if they messed up
    let isValid = /^[0-9,\s]*$/.test(input);
    if (!isValid) {
        errorField.innerHTML = "Please enter only integers separated by commas.</br> Example input:</br> 4, 8, 15, 16, 23, 42";
        errorField.style.visibility = 'visible';
        console.log('getting the fuck out');
        return;
    }

    // Remove whitespace
    input = input.replace(/\s/g, '');
    let numbersAsStrings = input.split(',');
    
    // Parse into actual integers
    let numbers = [];
    numbersAsStrings.forEach(number => {
        numbers.push(parseInt(number));
    });

    // yay side-effects
    numArray = numbers;
    target = chooseTarget(numArray);

    // Regenerate the sketches
    l = new p5(buildLinearSearchSketch(), 'linearCanvas');
    b = new p5(buildBinarySearchSketch(), 'binaryCanvas');
}

/* Reset number of excluded nodes and number of steps to 0 for all visualizations */
function resetSearchInfo() {
    document.getElementById('stepCountBinary').innerHTML = "Number of steps: 0";
    document.getElementById('exclusionCounterBinary').innerHTML = "Number of exluded nodes: 0";
    document.getElementById('stepCountBinary').innerHTML = "Number of steps: 0";
    document.getElementById('exclusionCounterBinary').innerHTML = "Number of excluded nodes: 0";
}