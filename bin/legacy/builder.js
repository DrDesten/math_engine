var c = require("./constants")

function addParentheses(arr=[], index=0, diff=0) {
  if (diff > 0) {
    for (let i = 0; i < diff; i++) { arr.splice(index,0,"(") }
    return
  }
  if (diff < 0) {
    for (let i = 0; i < -diff; i++) { arr.splice(index+1,0,")") }
    return
  }
  return
}

function operationOrder(calcTree=[]) {
  var currentPriority = 0;

  var i = 0;
  while (i < calcTree.length) {

    var operand  = calcTree[i]
    var operator = calcTree[i+1]

    if (Array.isArray(operand)) {
      operationOrder(calcTree[i])
    }

    if (c.isExp.test(operator)) {

      if (currentPriority != c.priorityExp) {

        let diff = c.priorityExp - currentPriority;
        currentPriority = c.priorityExp
        addParentheses(calcTree, i, diff)
        i += Math.abs(diff)

      }

    }
    if (c.isMult.test(operator)) {

      if (currentPriority != c.priorityMult) { // Priority has Increased

        let diff = c.priorityMult - currentPriority // Priority difference
        currentPriority = c.priorityMult // Set new priority
        addParentheses(calcTree, i, diff) // Add correct parenthesis
        i += Math.abs(diff) // Skip 1 because array length has increased

      }

    } 
    if (c.isAdd.test(operator)) {

      if (currentPriority != c.priorityAdd) { 

        let diff = c.priorityAdd - currentPriority
        currentPriority = c.priorityAdd
        addParentheses(calcTree, i, diff)
        i += Math.abs(diff)

      }

    }

    i += 2;
  }

  for (let i = 0; i < currentPriority; i++) { calcTree.push(")") }
}

function buildCalculationTree(input) {

  var tree = [];                 // Building Dependency Tree on this
  var loopLength = input.length; // I have to store it as a variable bc the length of {input} changes over time

  for (let i = 0; i < loopLength; i++) {

    if (input.length == 0) {break} // Break when the entire array has been depleted

    var content = input[0]
    input.splice(0,1) // Removes the 1st element of an array without dublicating it, allowing passing it as a pointer to all nested functions

    if (!c.isNumber.test(content)) { // Content is not a number

      switch (content) {

        case "(":
          tree.push(buildCalculationTree(input))
          break

        case ")":
          return tree
          break

        default:
          tree.push(content)

      }

    } else {

      tree.push(content)

    }
    
  }

  return tree
}

module.exports = {
  addParentheses,
  operationOrder,
  buildCalculationTree,
}