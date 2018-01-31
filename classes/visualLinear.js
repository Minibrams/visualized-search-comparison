// This document contains all classes that are used for linear search visualization. 

// The class for visualizing an array of numbers
function VisualArray(sketch, x, y) {
    // Essential info
    this.p = sketch;
    this.numbers = [];
    this.y = y;
    this.x = x;

    //Formatting info
    this.numOffset = 30;
    // Methods
    this.add = function(num) {
        let xOffset = this.numbers.length * this.numOffset;
        let newNum = new VisualNumber(this.p, num, x + xOffset, y);
        this.numbers.push(newNum);
    }

    // Visualize the array
    this.show = function () {
        this.numbers.forEach ( element => {
            element.show();
        });
    }

    this.getNumberAtIndex = function (index) {
        return this.numbers[index].val;
    }

    this.getPositionAtIndex = function (index) {
        if (index > this.numbers.length)
            return null;
        
        return new Point(this.numbers[index].x, this.numbers[index].y);
    }

    this.changeColorOfIndex = function (index, color) {
        let num = this.numbers[index];
        num.changeColor(color);
    }
}

// The class for visualizing a linear search through an array
function VisualLinearSearch(sketch, numbers, x = 50, y = 50) {
    this.p = sketch;
    this.currentIndex = 0;
    this.numSteps = 1;
    this.numExcludedNodes = 0;
    
    // Initialize the visual array so we have something to look at
    this.arr = new VisualArray(sketch, x, y);
    numbers.forEach(num => {
        this.arr.add(num);
    });

    // Get a search head, initialize it at the position of the first number.
    this.searchHead = new SearchHead(sketch, 
                                this.arr.getPositionOfIndex(0).x, 
                                this.arr.getPositionOfIndex(0).y);

    // Visualize the array and the search head. Update search head's position
    this.show = function () {
        this.arr.show();
        this.searchHead.show();
        this.searchHead.update();
    }

    // Initialize a search 
    this.startSearchFor = function (num) {
        this.searchHead.setTarget(num);
        this.arr.changeColorOfIndex(this.currentIndex, 'yellow');
    }

    // Step through the linear search algorithm. 
    this.step = function () {
        
        if (this.arr.getNumberAtIndex(this.currentIndex) == this.searchHead.searchTarget) {
            this.arr.changeColorOfIndex(this.currentIndex, 'green');
            return;
        } else if (this.currentIndex == this.arr.numbers.length-1) {
            this.arr.changeColorOfIndex(this.currentIndex, 'red');
            return;
        } else {
            this.arr.changeColorOfIndex(this.currentIndex, 'red');
            this.currentIndex++;
            this.arr.changeColorOfIndex(this.currentIndex, 'yellow');
            let next = this.arr.getPositionOfIndex(this.currentIndex);
            this.searchHead.moveTo(next);
            this.numSteps++;
            this.numExcludedNodes++;
        }
    }
}

