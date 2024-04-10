

class Node {
    constructor (d) {
        this.data = d;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor (arr) {
        this.array = arr;
        this.root = this.sortedArrayToBST(arr); //?
    }

    
    sortedArrayToBST (arr, start = 0, end = arr.length - 1) { 
        //takes an array, and a start and end index to create a tree from

        //base case:
        if (start > end) {
            return null;
        }

        //recursive case

        const mid = Math.floor((start + end) / 2); // middle of the array, rounded down 

        const node = new Node (arr[mid]); //the value at the middle of the array is the data

        node.left = this.sortedArrayToBST(arr, start, mid - 1);
        node.right = this.sortedArrayToBST(arr, mid + 1, end);

        return node; //ultimately returns the root!
    }

    //function takes the root of the BST as input and prints it.
    prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
        if (node === null) {
        return;
        }
        if (node.right !== null) {
        this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
        this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };

    // traverses the existing tree, using inorder traversal, executing a callback fn
    inOrderTraversal (node = this.root, callback) {
        
        //base case
        if (node !== null) {

            //recursive case
            this.inOrderTraversal(node.left, callback);
            callback(node);
            this.inOrderTraversal(node.right, callback);
        }
    };

    //test: printing it
    regularPrint () {
        this.inOrderTraversal(this.root, function print (node) {
            console.log(node.data);
        })
    };

    //inserts a given value in the appropriate position in the tree
    insert (value) {
        console.log('called')
        this.root = this._insertRec(value, this.root)
    }

    //helper function
    _insertRec (value, root = this.root) {

        //if node is empty, creates a new node (insertion point)
        if (root === null) {
            this.root = new Node (value);
            return this.root;
        }

        //otherwise, recur down the tree
        if (value < root.data) 
        {
            root.left = this._insertRec (value, root.left)
        }
        else if (value > root.data)
        {
            root.right = this._insertRec (value, root.right)
        }
        return root;
    }
    
}
 

const myArray = [3, 5, 7, 9, 11, 13, 15] //sample

const balancedTree = new Tree(myArray);

balancedTree.insert(2);
balancedTree.insert(20);
balancedTree.insert(8)

balancedTree.prettyPrint();
balancedTree.regularPrint();

console.log(balancedTree);