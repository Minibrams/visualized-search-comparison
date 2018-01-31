
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
    this.color = new Color(256, 256, 256);

    // Methods
    this.show = function () {
        //Draw background
        this.p.fill(this.color.r, this.color.g, this.color.b);
        this.p.ellipse(this.x, this.y, 20, 20);
        
        //Draw text
        this.p.fill(0);
        this.p.text(this.val, this.x - this.textXOffset, this.y + this.textYOffset);    
    }

    this.changeColor = function (color) {
        if (color == 'red') {
            this.color = new Color(256, 200, 200);
        } else if (color == 'green') {
            this.color = new Color(200, 256, 200);
        } else if (color == 'yellow') {
            this.color = new Color(256, 256, 200);
        }
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

    this.getNumberAtIndex = function (index) {
        return this.numbers[index].val;
    }

    this.getPositionOfIndex = function (index) {
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
    
    this.arr = new VisualArray(sketch, x, y);
    numbers.forEach(num => {
        this.arr.add(num);
    });

    this.searchHead = new SearchHead(sketch, 
                                this.arr.getPositionOfIndex(0).x, 
                                this.arr.getPositionOfIndex(0).y);

    this.show = function () {
        this.arr.show();
        this.searchHead.show();
        this.searchHead.update();
    }

    this.startSearchFor = function (num) {
        this.searchHead.setTarget(num);
        this.arr.changeColorOfIndex(this.currentIndex, 'yellow');
    }

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

// The class for visualizing the searching head
function SearchHead (sketch, x, y) {
    // Essential info
    this.p = sketch;
    this.targetPos = new Point(x, y - 15);
    this.endPos = new Point(x, y - SEARCH_HEAD_LENGTH);
    this.searchTarget = null;

    this.nextPos = null;
    this.moving = false;
    this.speedRate = 0.12;

    // Formatting info
    this.textXOffset = 0;
    this.textYOffset = FONT_SIZE * 0.4;

    // Methods
    this.show = function () {
        this.p.fill(0);
        // Draw the horizontal line
        this.p.line(this.targetPos.x, this.targetPos.y, this.endPos.x, this.endPos.y);

        // Draw the upper bar
        this.p.line(this.endPos.x - SEARCH_HEAD_WIDTH * 0.5, this.endPos.y, 
               this.endPos.x + SEARCH_HEAD_WIDTH * 0.5, this.endPos.y);

        // If we are looking for a number, show that above the bar
        if (this.searchTarget != null) {
            this.p.text(this.searchTarget, this.endPos.x - this.textXOffset, this.endPos.y - this.textYOffset);
        }
    }

    this.update = function() {
        if (this.moving) {
            let Xmovement = ( this.nextPos.x - this.targetPos.x ) * this.speedRate;
            let Ymovement = ( this.nextPos.y - this.targetPos.y - (SEARCH_HEAD_LENGTH - 10) ) * this.speedRate;
            
            this.targetPos.x += Xmovement;
            this.endPos.x += Xmovement;
            this.targetPos.y += Ymovement;
            this.endPos.y += Ymovement;

            if ( (this.nextPos.x - this.targetPos.x) < 1 &&
                  this.nextPos.x - this.targetPos.x > 0 ) {
                this.targetPos.x = this.nextPos.x;
                this.endPos.x = this.nextPos.x;
                this.targetPos.y = this.nextPos.y - 15;
                this.endPos.y = this.nextPos.y - SEARCH_HEAD_LENGTH;
                this.moving = false;
            }
        }
    }

    this.setTarget = function (num) {
        this.searchTarget = num;
        this.textXOffset = num >= 10 ? FONT_SIZE * 0.7 : FONT_SIZE * 0.3;
    }

    this.moveTo = function (pos) {
        this.moving = true;
        this.nextPos = pos;
    }
}

// The class for containing coordinates
function Point (x, y) {
    this.x = x;
    this.y = y;
}

// The class for containing RGB colors
function Color (r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
}