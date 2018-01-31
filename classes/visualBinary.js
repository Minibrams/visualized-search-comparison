function VisualBinaryTree (sketch, numbers, x, y, xSpacing) {
    this.p = sketch;
    this._numbers = numbers;
    this.left = null;
    this.right = null;
    this.pos = new Point(x, y);

    this.color = new Color(256, 256, 256);

    //Immediately build the tree to visualize it
    if (this._numbers.length == 1) {
        this.root = this._numbers[0];
    } else {
        let rootIndex = this.p.floor(this._numbers.length / 2);
        let leftNumbers = this._numbers.slice(0, rootIndex);
        let rightNumbers = this._numbers.slice(rootIndex + 1, this._numbers.length);
        this.root = this._numbers[rootIndex];
        this.left = leftNumbers.length != 0 ? new VisualBinaryTree(sketch, leftNumbers, x - xSpacing, y + 50, xSpacing * 0.45) : null;
        this.right = rightNumbers.length != 0 ? new VisualBinaryTree(sketch, rightNumbers, x + xSpacing, y + 50, xSpacing * 0.45) : null;
    }

    this.visualRoot = new VisualNumber(sketch, this.root, x, y);

    this.show = function () {
        this.visualRoot.show();
        if (this.left != null) {
            this.p.line(this.pos.x, this.pos.y + 10, this.left.pos.x, this.left.pos.y);
            this.left.show();
        }
        if (this.right != null) {
            this.p.line(this.pos.x, this.pos.y + 10, this.right.pos.x, this.right.pos.y);
            this.right.show();
        }
    }

    this.changeColor = function(color) {
        this.visualRoot.changeColor(color);
    }

    this.changeColorRecursively = function (color) {
        this.changeColor(color);
        // Count how many nodes are colored
        let num = 1; 
        if (this.left != null) {
            num += this.left.changeColorRecursively(color);
        }
    
        if (this.right != null) {
            num += this.right.changeColorRecursively(color);
        }

        return num;
    }
}

function VisualBinarySearch(sketch, numbers, x, y) {
    this.p = sketch;
    let spacing = (numbers.length * 15) / 2;
    this.tree = new VisualBinaryTree(sketch, numbers, x, y, spacing);
    this.searchHead = new SearchHead(sketch, x, y);
    this.currentNode = null;
    this.numSteps = 1;
    this.numExcludedNodes = 0;

    this.startSearchFor = function (num) {
        this.currentNode = this.tree;
        this.searchHead.setTarget(num);
        this.tree.changeColor('yellow');
    }

    this.show = function () {
        this.tree.show();
        this.searchHead.update();
        this.searchHead.show();
    }

    this.step = function () {
        if (this.currentNode.root == this.searchHead.searchTarget) {
            this.currentNode.changeColor('green');
            return;
        } else if (this.currentNode.root > this.searchHead.searchTarget) {
            this.currentNode.changeColor('red'); 
            this.numExcludedNodes++;

            if (this.currentNode.right != null) {
                this.numExcludedNodes += this.currentNode.right.changeColorRecursively('red');
            }

            this.currentNode = this.currentNode.left;
            this.searchHead.moveTo(this.currentNode.pos);
            this.currentNode.changeColor('yellow');
            this.numSteps++;
        } else if (this.currentNode.root < this.searchHead.searchTarget) {
            this.currentNode.changeColor('red'); 
            this.numExcludedNodes++;

            if (this.currentNode.left != null) {
                this.numExcludedNodes += this.currentNode.left.changeColorRecursively('red');
            }
            this.currentNode = this.currentNode.right;
            this.searchHead.moveTo(this.currentNode.pos);
            this.currentNode.changeColor('yellow');
            this.numSteps++;
        }
    }
}