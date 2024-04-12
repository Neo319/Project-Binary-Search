

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

    //inserts a given value in the appropriate position in the tree
    insert (value) {
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
    
    // Removes given value from tree, returning null if not found
    remove(value, root = this.root) {
        // Base case: If the root is null, return null (value not found)
        if (root === null) {
            return null;
        }

        // If the value matches the current node's data, mark the node for removal
        if (value === root.data) {
            return this.removeNode(root);
        }

        // Recur down the tree to find the node to remove
        if (value < root.data) {
            root.left = this.remove(value, root.left);
        } else {
            root.right = this.remove(value, root.right);
        }

        // Return the modified root
        return root;
    }

    // Helper method to remove the node
    removeNode(node) {
        // Case 1: Node has no children (leaf node)
        if (node.left === null && node.right === null) {
            return null;
        }
        // Case 2: Node has one child
        if (node.left === null) {
            return node.right;
        }
        if (node.right === null) {
            return node.left;
        }
        // Case 3: Node has two children
        // Find the successor (smallest node in the right subtree)
        let successor = this.findMin(node.right);
        // Copy the successor's data to the current node
        node.data = successor.data;
        // Remove the successor node
        node.right = this.remove(successor.data, node.right);
        return node;
    }

    // Helper method to find the minimum node in a subtree
    findMin(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    //returns a node with the given value
    find (value) {
        let root = this.root
        while (root !== null) {
            if (value < root.data) {
                root = root.left
            }
            else if (value > root.data) {
                root = root.right
            }
            else if (value === root.data) {
                return root;
            }
        }
        return null; //not found
    }

    // Traverses the tree with breadth-first, level-order traversal, executing a callback or producing an array
    levelOrder(callback = Tree.defaultCallback) {

        if (!this.root) {
            // Handle empty tree
            return [];
        }
    
        const queue = [this.root];
        const result = [];
    
        while (queue.length > 0) {
            const current = queue.shift();
            // Process current node using the callback function
            // Add current node to the result array
            result.push(current);
    
            // Enqueue left child if exists
            if (current.left) {
                queue.push(current.left);
            }
            // Enqueue right child if exists
            if (current.right) {
                queue.push(current.right);
            }
        }
    
        return callback(result);
    }
    
    // Default callback function
    static defaultCallback(nodeArr) {
        let result = []
        while (nodeArr.length > 0) {
            let current = nodeArr.shift();
            result.push(current.data);
        }
        return result;
    }
    
    inOrder (callback = Tree.defaultCallback) {
        if (!this.root) {
            return [];
        }

        let result = [];

        function inOrderRec (current) {
            //base
            if (!current) {
                return false;
            }
            inOrderRec(current.left);
            result.push(current);
            inOrderRec(current.right);

        }
        inOrderRec(this.root);
        return callback(result);
    };

    preOrder (callback = Tree.defaultCallback) {
        if (!this.root) {
            return [];
        }
        let result = [];

        
        function preOrderRec (current) {
            //base
            if (!current) {
                return false;
            }
            result.push(current);
            preOrderRec(current.left);
            preOrderRec(current.right);
        }
        preOrderRec(this.root);
        return callback(result);
    }

    postOrder (callback = Tree.defaultCallback) {
        if (!this.root) {
            return [];
        }
        let result = [];

        
        function postOrderRec (current) {
            //base
            if (!current) {
                return false;
            }
            postOrderRec(current.left);
            postOrderRec(current.right);
            result.push(current);
        }
        postOrderRec(this.root);
        return callback(result);
    }

    //returns the height of the node (number of 'edges' in longest path to leaf node)
    height (node) {
        if (!node) return 0;

        const leftTree = this.height(node.left);
        const rightTree = this.height(node.right);

        return Math.max(leftTree, rightTree) + 1;
    }

    depth (x, root = this.root) {

        console.log(root)

        //base
        if (root == null) return -1;

        let dist = -1;

        //check if x is current node
        if (root == x ||
        //or check if x is in the left subtree
        (dist = this.depth(x, root.left)) >= 0 ||
        //or right
        (dist = this.depth(x, root.right)) >= 0) {
            //return distance/depth
            return dist + 1;
        }
        return dist;

    }

    isBalanced () {
        const root = this.root;
        if (!root) return null;

        const leftTree = this.height(root.left);
        const rightTree = this.height(root.right);

        const min = Math.min(leftTree, rightTree);
        const max = Math.max(leftTree, rightTree);

        // if the difference in height is greater than 1, return false
        if (max - min > 1) return false;
        else return true;
    }

    rebalance () {
        if (this.isBalanced()) {
            return null;
        }

        //give sorted array to "sortedArrayToBST"
        this.root = this.sortedArrayToBST(this.inOrder());
        return this.root;
    }

}
    







// ---------Driver Script---------

//generates array of 20 different random numbers <100
function randomArray () {
    let output = [];

    while (output.length < 20) {
        //generate a number < 100
        let x = Math.floor(Math.random() * 100);

        //see if it is already in the array
        if (!output.includes(x)) {
            //if not, push to array
            output.push(x);
        }
    }
    return output.sort((a, b) => a - b); //sort array numerically
}

let myArray = randomArray();
console.log(myArray);

let myTree = new Tree (myArray);
myTree.prettyPrint();
console.log(myTree.isBalanced());

console.log(myTree.preOrder());
console.log(myTree.postOrder());
console.log(myTree.inOrder());