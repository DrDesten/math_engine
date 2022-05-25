#!/usr/bin/env node
const fs = require( "fs" )
const processNum = require( "./process_number" )
const alg = require( "./algorithms" )
const col = require( "./colors" )
const helper = require( "./helper" )
function print( x, color = "" ) { console.log( `${color}${x}${col.reset}` ) }

function uniq( a ) {
  var seen = {}
  return a.filter( function ( item ) {
    return seen.hasOwnProperty( item ) ? false : ( seen[item] = true )
  } )
}

function evalRuntime( str ) {
  str.replace( /const *(.+?) *= *(?!>)(.+)/g, ( match, g1, g2 ) => {
    if ( globalThis.hasOwnProperty( g1 ) ) print( `Warning: Variable '${g1}' is being overwritten. ${col.dim}[Old Value: ${globalThis[g1]}] [New Value: ${eval( g2 )}]`, col.mathWarn )
    globalThis[g1] = eval( g2 )
  } )
}


const isFunction = /[A-z](?=\([A-z]\))/g
const isNumerical = /^([0-9. +\-\/*()]*|[0-9.]+e[0-9.]+|Infinity)*$/g
const letters = /[A-z]+(?!\()/g

const MATHfunctions = /(?<!Math\.)(abs|acosh|acos|asinh|asin|atan2|atanh|atan|cbrt|ceil|clz32|cosh|cos|expm1|exp|floor|fround|hypot|imul|log10|log1p|log2|log|max|min|pow|random|round|sign|sinh|sin|sqrt|tanh|tan|trunc)(?=\()/g

let input = process.argv.slice( 2 ).join( " " ) // Getting the argument
print( col.dim + "> " + col.reset + col.bright + input )

input = input.replace( MATHfunctions, "Math.$&" )

// Simply Evaluate if there are no variables
if ( isNumerical.test( input ) ) {
  let result = eval( input )
  print( ` = ${result}`, col.mathResult )
  processNum.rationalize( result )
  process.exit()
}

// Open Data Files
let multimatchConstantDatabase = fs.readFileSync( __dirname + "/../data/multimatch_constants.txt", { encoding: 'utf8', flag: 'r' } )
let mathConstantDatabase = fs.readFileSync( __dirname + "/../data/mathematical_constants.txt", { encoding: 'utf8', flag: 'r' } )
let physicalConstantDatabase = fs.readFileSync( __dirname + "/../data/physical_constants.txt", { encoding: 'utf8', flag: 'r' } )
let functionDatabase = fs.readFileSync( __dirname + "/../data/functions.txt", { encoding: 'utf8', flag: 'r' } )

let savedFunctions = functionDatabase.match( /(?<=const +\$)[A-z]/g )
if ( savedFunctions == null ) savedFunctions = []
const functionNames = "fghijklmnopqrstuvwxyzabcde".split( "" )
let savedVariables = functionDatabase.match( /(?<=const +)[A-z]/g )
if ( savedVariables == null ) savedVariables = []
const variableNames = "abcdefghijklmnopqrstuvwxyz".split( "" )


let availableFunctionNames = functionNames.filter( x => savedFunctions.findIndex( y => y == x ) == -1 )
let availableVariableNames = variableNames.filter( x => savedVariables.findIndex( y => y == x ) == -1 )


//input = input.replace(/[A-z]+(?=\()/g, "$$$&")
//if (variables.length > 0) functionDatabase += `\nconst $${availableFunctionNames[0]} = (${variables.join(",")}) => ${input}`
evalRuntime( multimatchConstantDatabase )
evalRuntime( mathConstantDatabase )
evalRuntime( physicalConstantDatabase )
evalRuntime( functionDatabase )

let execute = input

const argRegex = /^(generate_dev|table|tbl|integral|integrate|int|solve)(\[([^\n\[\]]+?)\])?/g
let tmp = argRegex.exec( execute )
let args
if ( tmp == null ) args = ["", ""]
else args = [
  tmp[1] == null ? "" : tmp[1],
  tmp[3] == null ? "" : tmp[3].split( "," ).map( x => eval( x ) ),
]
//console.log( args )

execute = execute.replace( argRegex, "" ).trim()

let variables = execute.match( letters )
if ( variables == null ) variables = []
else variables = uniq( variables )
//print(variables)

const isFunctionDeclaration = /[a-z]\([a-z, ]+\)/i
const isEquasion = /(?<=x.*)=|=(?=.*x)/i
if ( args[0] == "" ) {

  if ( isEquasion.test( execute ) && !isFunctionDeclaration.test( execute ) ) args[0] = "solve"

}

switch ( args[0] ) {
  case "tbl":
  case "table":
    alg.table( eval( `${"x"} => ${execute}` ), ...args[1] )
    break
  case "int":
  case "integral":
  case "integrate":
    alg.integrate( eval( `${"x"} => ${execute}` ), ...args[1] )
    break
  case "solve":
    alg.solve( eval( `${"x"} => ${execute.replace( / *= *[0.]+$/g, "" ).replace( /(.*?) *= *(.*)/g, "($1) - ($2)" )}` ), ...args[1] )
    break
  case "generate_dev":
    helper.generate()
    break
  default:
    let result = eval( input )
    print( ` = ${result}`, col.mathResult )
    processNum.rationalize( result )
}


//fs.writeFileSync("data/functions.txt", functionDatabase)