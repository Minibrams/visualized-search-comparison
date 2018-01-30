
// The class for visualizing single numbers
function VisualNumber (sketch, val, x, y) {
    // Essential info
    this.p = sketch;
    this.val = val;
    this.x = x;
    this.y = y;

    // Formatting info
    this.textXOffset = this.val >= 10 ? FONT_SIZE * 0.7 : FONT_SIZE * 0.3;
    this.textYOffset = FONT_SIZE * 0.4;

    // Methods
    this.show = function () {
        this.p.ellipse(this.x, this.y, 20, 20);
        this.p.text(this.val, this.x - this.textXOffset, this.y + this.textYOffset);    
    }
}


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

    this.show = function () {
        this.numbers.forEach ( element => {
            element.show();
        });
    }

    this.getPositionOfIndex = function (index) {
        if (index > numbers.length)
            return null;
        
        return new Point(numbers[index].x, numbers[index].y);
    }
}

// The class for containing coordinates
function Point (x, y) {
    this.x = x;
    this.y = y;
}