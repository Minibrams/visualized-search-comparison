// Constants
const FONT_SIZE = 10;
const SEARCH_HEAD_LENGTH = 25;
const SEARCH_HEAD_WIDTH = 10;

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

         // Generate array of numbers
        let numArray = [];
        for (let i = 0; i < 30; i++) {
            numArray.push(p.floor(p.random(0, 100)));
        }

        // Establish visualization for linear search
        search = new VisualLinearSearch(p, numArray);
        let target = numArray[p.floor(p.random(0, numArray.length))];
        search.startSearchFor(target);
        
        // Bind step function to button clicks
        let button = document.getElementById('stepLinear');
        let stepCountField = document.getElementById('stepCountLinear');
        button.onclick = function () {
            search.step();
            stepCountField.innerHTML = "Number of steps: " + search.numSteps;
        }
    }

    p.draw = function () {
        p.background(250, 235, 215);
        search.show();
    }
} 


let binarySearch = function (p) {

    p.setup = function () {
        // Save height and width for later positioning
        let cnv = document.getElementById('binaryCanvas');
        this.width = cnv.offsetWidth;
        this.height = cnv.offsetHeight;
        
        //Configure p5
        p.textSize(FONT_SIZE);
        p.createCanvas(this.width, this.height);

        let numArray = [];
        for (let i = 0; i < 30; i++) {
            numArray.push(p.floor(p.random(0, 100)));
        }

        numArray.sort();

        let spacing = (numArray.length * 15) / 2;
        let binaryTree = new VisualBinaryTree(p, numArray, this.width * 0.5, 20, spacing);
        binaryTree.left.left.left.changeColorRecursively('red');
        binaryTree.show();
    }
}

// This step is crucial for the p5 sketch to be displayed.
let l = new p5(linearSearch, 'linearCanvas');
let b = new p5(binarySearch, 'binaryCanvas');