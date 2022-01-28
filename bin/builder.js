function buildCalculationTree(input) {

  var tree = [];                 // Building Dependency Tree on this
  var loopLength = input.length; // I have to store it as a variable bc the length of {input} changes over time

  for (let i = 0; i < loopLength; i++) {

    if (input.length == 0) {break} // Break when the entire array has been depleted

    var content = input[0]
    input.splice(0,1) // Removes the 1st element of an array without dublicating it, allowing passing it as a pointer to all nested functions

    if (!isNumber.test(content)) { // Content is not a number

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
  buildCalculationTree
}