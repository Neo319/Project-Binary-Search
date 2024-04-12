

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

}
    

 

const myArray = [3, 5, 7, 9, 11, 13, 15] //sample

const balancedTree = new Tree(myArray);

balancedTree.insert(2);
balancedTree.insert(20);
balancedTree.insert(8)

balancedTree.remove(5);



balancedTree.prettyPrint();


console.log(balancedTree);

console.log(balancedTree.inOrder())
console.log(balancedTree.preOrder())