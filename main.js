// Constants
const FONT_SIZE = 10;
const SEARCH_HEAD_LENGTH = 25;
const SEARCH_HEAD_WIDTH = 10;

let p5js = function (p) {
    
    // Generate array of numbers
    let numArray = [];
    for (let i = 0; i < 30; i++) {
        numArray.push(p.floor(p.random(0, 100)));
    }

    // Establish visualization for linear search
    let search = new visualLinearSearch(p, numArray);
    let target = numArray[p.floor(p.random(0, numArray.length))];
    search.startSearchFor(target);
    
    // Bind step function to button clicks
    let button = document.getElementById('stepLinear');
    let stepCountField = document.getElementById('stepCountLinear');
    button.onclick = function () {
        search.step();
        stepCountField.innerHTML = "Number of steps: " + search.numSteps;
    }

    p.setup = function() {
        // Save height and width for later positioning
        let cnv = document.getElementById('theCanvas');
        this.width = cnv.offsetWidth;
        this.height = cnv.offsetHeight;
        
        //Configure p5
        p.textSize(FONT_SIZE);
        p.createCanvas(this.width, this.height);

        
    }

    p.draw = function () {
        p.background(250, 235, 215);
        search.show();
    }
} 

// This step is crucial for the p5 sketch to be displayed.
let theP5Sketch = new p5(p5js, 'theCanvas');