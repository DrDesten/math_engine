#!/usr/bin/env node
const fs = require("fs")
function print(x) { console.log(x) }

function uniq(a) {
  var seen = {}
  return a.filter(function(item) {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true)
  });
}

const isNumerical = /^[0-9. +\-\/*]*$/g
const letters     = /[A-z]/g

let input = process.argv.slice(2).join(" ") // Getting the argument
print("> " + input)


// Simply Evaluate if there are no variables
if (isNumerical.test(input)) {
  print(eval(input))
  process.exit()
}

// Open Functions File
let functionDatabase = fs.readFileSync("data/functions.txt", {encoding:'utf8', flag:'r'})

let   savedFunctions = functionDatabase.match(/(?<=const +\$)[A-z]/g)
if  (savedFunctions == null) savedFunctions = []
const functionNames  = "fghijklmnopqrstuvwxyzabcde".split("")
let   savedVariables = functionDatabase.match(/(?<=const +)[A-z]/g)
if  (savedVariables == null) savedVariables = []
const variableNames  = "abcdefghijklmnopqrstuvwxyz".split("")


let availableFunctionNames = functionNames.filter(x => savedFunctions.findIndex(y => y == x) == -1)
let availableVariableNames = variableNames.filter(x => savedVariables.findIndex(y => y == x) == -1)

let variables = uniq(input.match(letters))
print(variables)

functionDatabase += `\nconst $${availableFunctionNames[0]} = (${variables.join(",")}) => ${input}`
print(functionDatabase)

