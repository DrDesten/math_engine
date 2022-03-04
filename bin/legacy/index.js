#!/usr/bin/env node

var parser = require("./parser.js")
var builder = require("./builder.js")
var c = require("./constants")

String.prototype.insert = function(idx, str) {
  return this.slice(0, idx) + str + this.slice(idx);
};
Array.prototype.joinDeep = function(sep_ele=",", sep_arr_start="[", sep_arr_end="]") { // Advanced Array.join for nested arrays
  let str = ""

  str += sep_arr_start
  for (let i = 0; i < this.length; i++) {
    if (Array.isArray(this[i])) { // Checks for an array to go deeper
      str += this[i].joinDeep(sep_ele, sep_arr_start, sep_arr_end);
    } else { // If not an array, stringify content
      str += `${this[i]}`
    }

    if (i < this.length - 1) { str += sep_ele } // Add element seperator (except after last element)
  }
  str += sep_arr_end

  return str
}

function parseWarning(txt="") {
  console.warn(`ParseWarning: ${txt}`)
}
function parseError(txt="") {
  console.warn(`ParseError: ${txt}`)
}


const tau = c.tau
const pi  = c.pi
const e   = c.e
const phi = c.phi

var calcInput = process.argv.slice(2).join(" ") // Getting the argument

// PRE-PARSING /////////////////////////////////////////////////////////////////

calcInput = parser.clearMultispace(calcInput)
// Replace various parentheses
calcInput = parser.unifyParentheses(calcInput)
// Handle Implicit Multiplication
calcInput = parser.implicitMultiplication(calcInput)

var splitTerms = parser.tokenize(calcInput)

// PARSE SAFETY CHECK ///////////////////////////////////////////////////////////
// I'm adding one parenthesis hereto avoid the match returning "Null"
var openParentheses   = (calcInput + "(").match(/[(]/g).length - 1;
var closedParentheses = (calcInput + ")").match(/[)]/g).length - 1;
if (openParentheses != closedParentheses) {
  parseWarning(`Unequal amount of opened and closed parentheses. Open:${openParentheses} Closed:${closedParentheses}`)
}


// ORDER OF OPERATIONS //////////////////////////////////////////////////////////
// Parentheses, Exponentiation, Multiplication, Addition

console.log(`Parsed: ${calcInput}`)

var initialCalculationTree = builder.buildCalculationTree(splitTerms.slice(0))
builder.operationOrder(initialCalculationTree)

var correctedString = initialCalculationTree.joinDeep(" ", "(", ")")
correctedString = correctedString.replace(/^\(|\)$/g, "")

// CALCULATION TREE BUILDING ////////////////////////////////////////////////////
// This is all very fancy, but for now I'll use eval() instead

var calculationTree = builder.buildCalculationTree(parser.tokenize(correctedString))

console.log(`Built Calculation Tree: ${correctedString.length < 75 ? correctedString : correctedString.replace(/ +/g, "")}`)

correctedString = correctedString.replace(/\^/g, "**") // Important for eval()
console.log(eval(correctedString))