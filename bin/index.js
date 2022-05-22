#!/usr/bin/env node
const fs  = require("fs")
const alg = require("./algorithms")
function print(x) { console.log(x) }

function uniq(a) {
  var seen = {}
  return a.filter(function(item) {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true)
  });
}

const isFunction  = /[A-z](?=\([A-z]\))/g
const isNumerical = /^([0-9. +\-\/*()]*|[0-9.]+e[0-9.]+|Infinity)*$/g
const letters     = /[A-z]+(?!\()/g

let input = process.argv.slice(2).join(" ") // Getting the argument
print("> " + input)


// Simply Evaluate if there are no variables
if (isNumerical.test(input)) {
  let result = eval(input)
  print(` = ${result}`)
  alg.rationalize(result)
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

function evalRuntime(str) {
  str.replace(/const *(.+?) *= *(?!>)(.+)/g, (match, g1, g2) => {
    globalThis[g1] = eval(g2)
  })
}

input = input.replace(/[A-z]+(?=\()/g, "$$$&")
//if (variables.length > 0) functionDatabase += `\nconst $${availableFunctionNames[0]} = (${variables.join(",")}) => ${input}`
evalRuntime(functionDatabase)

let execute = input

const argRegex = /^(table|integrate)(\[([^^n()]+)\])?/g
let tmp = argRegex.exec(execute)
let args
if (tmp == null) args = []
else args = [
  tmp[1] == null ? "" : tmp[1],
  tmp[3] == null ? "" : tmp[3].split(",").map(x => parseFloat(x)),
]
print(args)

execute = execute.replace(argRegex,"").trim()

let variables = execute.match(letters)
if (variables == null) variables = []
else                   variables = uniq(variables)
print(variables)

if (args.length > 0) {
  switch (args[0]) {
    case "table":
      alg.table(eval(`(${"x"}) => ${execute}`), ...args[1])
      break
    case "integrate":
      alg.integrate(eval(`(${"x"}) => ${execute}`), ...args[1])
      break
    default: 
      throw `command ${args[0]} not implemented`
  }
} else {
  print(eval(execute))
}

//fs.writeFileSync("data/functions.txt", functionDatabase)