var c = require("./constants.js")


function clearMultispace(str="") {
  return str.replace(/\s+/g, " ")
}

function unifyParentheses(str="") {
  // I have to use regex here because else it bugs out with multiple replacements
  return str.replace(/\[/g, "(").replace(/\]/g, ")").replace(/{/g, "(").replace(/}/g, ")").replace(/</g, "(").replace(/>/g, ")")
}

function implicitMultiplication(str="") {
  // Adds multiplication symbols to various cases of implicit multiplication
  // [number][letter, ()] [letter][()] [)][(] 
  // All of this backwards as well
  // Excludes e-notation first, handles it seperatly
  const isImplicitMultiplication = /[0-9.,][a-df-z(]|[a-z][(]|[a-df-z)][0-9.,]|[)][a-df-z]|[)][(]|(?<![^0-9.,A-z]) [0-9.,A-z]|(?<![0-9.,])e[0-9,.]|[0-9.,]e(?![0-9])/gi
  str = str.replace(isImplicitMultiplication, x => x.insert(1, "*").trim())
  str = str.replace(isImplicitMultiplication, x => x.insert(1, "*").trim())

  /* const isImplicitMultiplicationE = /(?<![0-9.,])e[0-9,.]|[0-9.,]e(?![0-9])/gi //Special handling for e-notation (Merged into upper regex)
  str = str.replace(isImplicitMultiplicationE, x => x.insert(x.length-1, "*"))
  str = str.replace(isImplicitMultiplicationE, x => x.insert(x.length-1, "*")) */

  return str;
}

function tokenize(str="") {
  return str.replace(c.operators, x => ` ${x} `) // Adds spaces between operators
            .split(" ")                         // Uses those to split into smallest components
            .filter(e => e != "")              // Filters out empty strings
}

module.exports = {
  unifyParentheses,
  clearMultispace,
  implicitMultiplication,
  tokenize,
}