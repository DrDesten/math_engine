#!/usr/bin/env node

var parser = require("./parser.js")
var builder = require("./builder.js")

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


const tau       = 6.2831853071795864769252867665590057683943387987502
const pi        = 3.1415926535897932384626433832795028841971693993751
const e         = 2.7182818284590452353602874713526624977572470937000
const phi       = 1.6180339887498948482045868343656381177203091798058

const operators = /[()^*/+-]/g
const isNumber  = /[0-9]/g
const isParenth = /[)(]/g
const isExp     = /[^]/g
const isMult    = /[*/]/g
const isAdd     = /[+-]/g

var calcInput = process.argv.slice(2).join(" ") // Getting the argument

// PRE-PARSING /////////////////////////////////////////////////////////////////

calcInput = parser.clearMultispace(calcInput)
// Replace various parentheses
calcInput = parser.unifyParentheses(calcInput)
// Handle Implicit Multiplication
calcInput = parser.implicitMultiplication(calcInput)

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

/* var startOrder = 0
var currentDepth = 0

for (let i = 0; i < splitTerms.length+2; i++) {
  var curr = splitTerms[i]
  var next = splitTerms[i+1]

  if (isMult.test(next) && startOrder == 0) {
    splitTerms.splice(i,0,"(")
    startOrder    = 1
  }

  if (/\(/g.test(curr)) {
    currentDepth += 1
  }

  if (/\)/g.test(curr)) {
    currentDepth -= 1
  }

  if (isAdd.test(next) && startOrder >= 0 && currentDepth == 0) {
    splitTerms.splice(i+1,0,")")
    break
  }
}
 */

// CALCULATION TREE BUILDING ////////////////////////////////////////////////////
// This is all very fancy, but for now I'll use eval() instead

var calculationTree = [];

calculationTree = builder.buildCalculationTree(splitTerms.slice(0))

calcInput = calcInput.replace(/\^/g, "**") // Important for eval()
console.log(calcInput)
console.log(eval(calcInput))
console.log(splitTerms)
console.log(calculationTree)
console.log(calculationTree.joinDeep(" ", "(", ")"))