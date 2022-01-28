#!/usr/bin/env node

String.prototype.insert = function(idx, str) {
  return this.slice(0, idx) + str + this.slice(idx);
};


function parseWarning(txt="") {
  console.warn(`ParseWarning: ${txt}`)
}


var calcInput = process.argv[2] // Getting the argument

const operators = /[()^*/+-]/g
const isNumber  = /[0-9]/g
const isParenth = /[)(]/g
const isExp     = /[^]/g
const isMult    = /[*/]/g
const isAdd     = /[+-]/g

// PRE-PARSING /////////////////////////////////////////////////////////////////

// I have to use regex here because else it bugs out with multiple replacements
calcInput = calcInput.replace(/\[/g, "(").replace(/\]/g, ")").replace(/\{/g, "(").replace(/\}/g, ")") // Replace various parentheses

// Adds multiplication symbols to various cases of implicit multiplication
// [number][letter, ()] [letter][()] [)][(] 
// All of this backwards as well
// Excludes e-notation
const isImplicitMultiplication = /[0-9.,][a-df-z(]|[a-z][(]|[a-df-z)][0-9.,]|[)][a-df-z]|[)][(]/gi
calcInput = calcInput.replace(isImplicitMultiplication, x => x.insert(1, "*"))
calcInput = calcInput.replace(isImplicitMultiplication, x => x.insert(1, "*"))
const isImplicitMultiplicationE = /[0-9.,)]e[^0-9.,]|[^0-9.,]e[0-9.,(]|[0-9.,)]e$|^e[0-9.,)]/gi //Special handling for e-notation
calcInput = calcInput.replace(isImplicitMultiplicationE, x => x.insert(x.length-1, "*"))
calcInput = calcInput.replace(isImplicitMultiplicationE, x => x.insert(x.length-1, "*"))


var splitTerms = calcInput.replace(operators, x => ` ${x} `) // Adds spaces between operators
                          .split(" ")                        // Uses those to split into smallest components
                          .filter(e => e != "")              // Filters out empty strings



// PARSE SAFETY CHECK ///////////////////////////////////////////////////////////
// I'm adding one parenthesis hereto avoid the match returning "Null"
var openParentheses   = (calcInput + "(").match(/[(]/g).length - 1;
var closedParentheses = (calcInput + ")").match(/[)]/g).length - 1;
if (openParentheses != closedParentheses) {
  parseWarning(`Unequal amount of opened and closed parentheses. Open:${openParentheses} Closed:${closedParentheses}`)
}



// ORDER OF OPERATIONS //////////////////////////////////////////////////////////
// Parentheses, Exponentiation, Multiplication, Addition

function extractParenthesis(arr=[], index) {
  if (arr[index] != "(") {console.error("Something went wrong while calculating the order of operations.")}

  var calcDepth = 1
  var start = index + 1
  var end   = index + 1
  for (let i = index + 1; i < arr.length; i++) {
    if      (arr[i] = "(") {calcDepth += 1}
    else if (arr[i] = ")") {calcDepth -= 1}

    if (calcDepth <= 0) {
      end = i
      break
    }
  }

  return arr.slice(start, end)
}



// CALCULATION TREE BUILDING ////////////////////////////////////////////////////
// This is all very fancy, but for now I'll use eval() instead

var calculationTree = [];

function buildCalculationTree(input) {

  var tree = [];                 // Building Dependency Tree on this
  var loopLength = input.length; // I have to store it as a variable bc the length of {input} changes over time

  for (let i = 0; i < loopLength; i++) {

    if (input.length == 0) {break} // Break when the entire array 

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

calculationTree = buildCalculationTree(splitTerms.slice(0))

console.log(calcInput)
/* console.log(splitTerms)
console.log(calculationTree) */