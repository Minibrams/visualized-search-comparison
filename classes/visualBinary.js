function VisualBinaryTree (sketch, numbers, x, y, xSpacing) {
    this.p = sketch;
    this._numbers = numbers;
    this.left = null;
    this.right = null;

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
        if (this.left != null) this.left.show();
        if (this.right != null) this.right.show();
    }
}