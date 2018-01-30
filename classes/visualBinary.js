function VisualBinaryTree (sketch, numbers, x, y, xSpacing) {
    this.p = sketch;
    this._numbers = numbers;
    this.left = null;
    this.right = null;
    this.x = x;
    this.y = y;

    this.color = new Color(256, 256, 256);

    //Immediately build the tree to visualize it
    if (this._numbers.length == 1) {
        this.root = this._numbers[0];
    } else {
        let rootIndex = this.p.floor(this._numbers.length / 2);
        let leftNumbers = this._numbers.slice(0, rootIndex);
        let rightNumbers = this._numbers.slice(rootIndex + 1, this._numbers.length);
        this.root = this._numbers[rootIndex];
        this.left = leftNumbers.length != 0 ? new VisualBinaryTree(sketch, leftNumbers, x - xSpacing, y + 40, xSpacing * 0.45) : null;
        this.right = rightNumbers.length != 0 ? new VisualBinaryTree(sketch, rightNumbers, x + xSpacing, y + 40, xSpacing * 0.45) : null;
    }

    this.visualRoot = new VisualNumber(sketch, this.root, x, y);

    this.show = function () {
        this.visualRoot.show();
        if (this.left != null) {
            this.p.line(this.x, this.y + 10, this.left.x, this.left.y);
            this.left.show();
        }
        if (this.right != null) {
            this.p.line(this.x, this.y + 10, this.right.x, this.right.y);
            this.right.show();
        }
    }

    this.changeColor = function(color) {
        this.visualRoot.changeColor(color);
    }

    this.changeColorRecursively = function (color) {
        this.changeColor(color);
        if (this.left != null) {
            this.left.changeColorRecursively(color);
        }
    
        if (this.right != null) {
            this.right.changeColorRecursively(color);
        }
    }
}