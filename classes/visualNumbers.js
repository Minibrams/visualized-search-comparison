
// The class for visualizing single numbers
function visualNumber (sketch, val, x, y) {
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
function visualArray(sketch, x, y) {
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
        let newNum = new visualNumber(this.p, num, x + xOffset, y);
        this.numbers.push(newNum);
    }

    this.show = function () {
        this.numbers.forEach ( element => {
            element.show();
        });
    }
}

