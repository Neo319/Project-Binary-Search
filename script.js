console.log('here!')

class Node {
    constructor (d) {
        this.data = d;
        this.left = null;
        this.right = null;
    }
}
let root = null
function sortedArrayToBST (arr, start = 0, end = arr.length - 1) { 
    //takes an array, and a start and end index to create a tree from

    //base case:
    if (start > end) {
        return null;
    }

    //recursive case

    mid = Math.floor((start + end) / 2); // middle of the array, rounded down 

    const node = new Node (arr[mid]); //the value at the middle of the array is the data

    node.left = sortedArrayToBST(arr, start, mid - 1);
    node.right = sortedArrayToBST(arr, mid + 1, end);

    return node;
}

//function takes the root of the BST as input and prints it.
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
 

  const myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] //sample

const balancedTree = sortedArrayToBST(myArray);

prettyPrint(balancedTree);

console.log(balancedTree)