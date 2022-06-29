#!/usr/bin/env node

// PROTOTYPE MODIFICATIONS
//////////////////////////////////////////////////////////////////////////////////////

Object.defineProperty( Number.prototype, "next", {
  get: function () {
    if ( this < 0 ) return -( -this ).prev
    if ( isNaN( this ) ) return NaN
    if ( this == 0 ) return Number.MIN_VALUE

    const buf = new ArrayBuffer( 8 )
    const f64 = new Float64Array( buf )
    const u64 = new BigUint64Array( buf )

    f64[0] = this
    u64[0]++

    return f64[0]
  }
} )

Object.defineProperty( Number.prototype, "prev", {
  get: function () {
    if ( this < 0 ) return -( ( -this ).next )
    //if ( isNaN( this ) ) return NaN
    if ( this == 0 ) return -Number.MIN_VALUE

    const buf = new ArrayBuffer( 8 )
    const f64 = new Float64Array( buf )
    const u64 = new BigUint64Array( buf )

    f64[0] = this
    u64[0]--

    return f64[0]
  }
} )

Object.defineProperty( Number.prototype, "bin", {
  get: function () {
    const buf = new ArrayBuffer( 8 )
    const f64 = new Float64Array( buf )
    const u64 = new BigUint64Array( buf )

    f64[0] = this

    return "0".repeat( 64 - u64[0].toString( 2 ).length ) + u64[0].toString( 2 )
  }
} )



// IMPORTS
//////////////////////////////////////////////////////////////////////////////////////

const fs = require( "fs" )
const rl = require( "readline" )
const math = require( "./math" )
const num = require( "./process_number" )
const alg = require( "./algorithms" )
const col = require( "./colors" )
const helper = require( "./helper" )
const prompt = require( "prompt-sync" )( { sigint: true } )

// FUNCTIONS
//////////////////////////////////////////////////////////////////////////////////////

function print( x, color = "" ) { color == "" ? console.log( x, col.reset ) : console.log( color + x, col.reset ) }

function uniq( a ) {
  var seen = {}
  return a.filter( function ( item ) {
    return seen.hasOwnProperty( item ) ? false : ( seen[item] = true )
  } )
}

function evalVarString( str ) {
  str.replace( parseVariables, ( match, g1, g2 ) => {
    if ( globalThis.hasOwnProperty( g1 ) ) print( `Warning: Variable '${g1}' is being overwritten. ${col.dim}[Old Value: ${globalThis[g1]}] [New Value: ${eval( g2 )}]`, col.mathWarn )
    globalThis[g1] = eval( g2 )
  } )
}

function evalCustomVariables( str, builtInConstants = {} ) {
  str.replace( parseVariables, ( match, g1, g2 ) => {
    const replaceBuiltIn = builtInConstants.hasOwnProperty( g1 )
    if ( eval( "typeof " + g1 ) != "undefined" )
      print( `${replaceBuiltIn ? "Built-in constant" : "Variable"} '${g1}' is being overwritten${replaceBuiltIn ? " by user" : ""}. ${replaceBuiltIn ? "Constants can still be accessed using the 'const_' prefix\n" : ""}${col.dim}[Old Value: ${eval( g1 )}] [New Value: ${eval( g2 )}]`, col.mathWarn )
    globalThis[g1] = eval( g2 )
  } )
}

function evalObject( obj ) {
  for ( const key in obj ) {
    globalThis[key] = eval( obj[key] )
  }
}

function toObject( str = "", obj = {} ) {
  str.replace( parseVariables, ( match, g1, g2 ) => {
    obj[g1] = g2.trim()
  } )
  return obj
}

// CONSTANTS
//////////////////////////////////////////////////////////////////////////////////////


// REGEX
//////////////////////////////////////////////////////////////////////////////////////

const isFunctionRegex = /[A-z](?=\([A-z]\))/g
const isNumericalRegex = /^([0-9. +\-\/*()]*|[0-9.]+e[0-9.]+|Infinity|NaN)*$/g
const letters = /[A-z]+(?!\()/g
const parseVariables = /^const *(.+?) *= *(.+)(?<!\/(?=\/).*)/gm

const isDigitlessRegex = /^[^\d\n]+$/
const isOperationlessRegex = /^[^+\-*\/!=^]+$/
const isFuncDeclarationRegex = /[a-z]\([a-z, ]+\)/i
const isEquasionRegex = /(?<=x.*)=|=(?=.*x)/i

const MathFunctions = /(?<!\.)(abs|acosh|acos|asinh|asin|atan2|atanh|atan|cbrt|ceil|clz32|cosh|cos|expm1|exp|floor|fround|hypot|imul|log10|log1p|log2|log|max|min|pow|random|round|sign|sinh|sin|sqrt|tanh|tan|trunc)(?=\()/g
const mathFunctions = /(?<!\.)(logn)(?=\()/g
const ALGfunctions = /(?<!\.)(precision)(?=\()/g
const NUMBERconstants = /(?<!\.)(MIN_VALUE|EPSILON|MAX_VALUE|MAX_SAFE_INTEGER|MIN_SAFE_INTEGER)/g
const MAX_INT = Number.MAX_SAFE_INTEGER + 1, MIN_INT = Number.MIN_SAFE_INTEGER - 1, MAX_FLOAT = Number.MAX_VALUE, MIN_FLOAT = Number.MIN_VALUE

const logBaseN = /(?<!\.)log([013-9]|[02-9]\d|1[1-9]|\d{3,}|[a-mo-zA-Z_][a-zA-Z_]*)\(/g
const trigImplicitParenth = /\b(sin|sinh|cos|cosh|tan|tanh|ln)([a-gi-zA-GI-Z][a-zA-Z_]*|[\d.]+)/g

function parse( str = "" ) {
  str = str.replace( trigImplicitParenth, "$1($2)" ) // trigx => trig( x ) || trig(x|y|\d) => trig( (x|y|\d) )
  str = str.replace( /\bln(?=\()/g, "log" )
  str = str.replace( logBaseN, "logn($1," )
  str = str.replace( /\binf\b/gi, "Infinity" )
  str = str.replace( /\^/g, "**" )
  str = str.replace( MathFunctions, "Math.$&" )
  str = str.replace( mathFunctions, "math.$&" )
  str = str.replace( ALGfunctions, "alg.$&" )
  str = str.replace( NUMBERconstants, "Number.$&" )
  return str
}


// PREPARE
//////////////////////////////////////////////////////////////////////////////////////

function prepare() {

  // Open Data Files ////////////////////////////////////////
  let multimatchConstantDatabase = fs.readFileSync( __dirname + "/../data/multimatch_constants.txt", { encoding: 'utf8', flag: 'r' } )
  let mathConstantDatabase = fs.readFileSync( __dirname + "/../data/mathematical_constants.txt", { encoding: 'utf8', flag: 'r' } )
  let physicalConstantDatabase = fs.readFileSync( __dirname + "/../data/physical_constants.txt", { encoding: 'utf8', flag: 'r' } )


  // Parse and load built-in constants ////////////////////////////////////////
  let builtInConstants = toObject( multimatchConstantDatabase + "\n" + mathConstantDatabase + "\n" + physicalConstantDatabase )
  Object.keys( builtInConstants ).map( key => builtInConstants[`const_${key}`] = key )
  evalObject( builtInConstants )


  // Parse and load user-defined functions and constants ////////////////////////////////////////
  let functionDatabase = fs.readFileSync( __dirname + "/../data/functions.txt", { encoding: 'utf8', flag: 'r' } )
  evalCustomVariables( functionDatabase, builtInConstants )

  /* let savedFunctions = functionDatabase.match( /(?<=const +\$)[A-z]/g )
  if ( savedFunctions == null ) savedFunctions = []
  const functionNames = "fghijklmnopqrstuvwxyzabcde".split( "" )
  let savedVariables = functionDatabase.match( /(?<=const +)[A-z]/g )
  if ( savedVariables == null ) savedVariables = []
  const variableNames = "abcdefghijklmnopqrstuvwxyz".split( "" )


  let availableFunctionNames = functionNames.filter( x => savedFunctions.findIndex( y => y == x ) == -1 )
  let availableVariableNames = variableNames.filter( x => savedVariables.findIndex( y => y == x ) == -1 ) */


  //input = input.replace(/[A-z]+(?=\()/g, "$$$&")
  //if (variables.length > 0) functionDatabase += `\nconst $${availableFunctionNames[0]} = (${variables.join(",")}) => ${input}`
}


// EXECUTE INPUT
//////////////////////////////////////////////////////////////////////////////////////

const commands = [
  {
    commands: ["compile"],
    func: () => helper.generate()
  },
  {
    commands: ["exit"],
    func: () => process.exit( 0 )
  },
  {
    commands: ["launch", "persistent"],
    func: () => {}
  },
  {
    commands: ["search"],
    func: ( input, args ) => num.searchConstants( input, ...args )
  },
  {
    commands: ["table", "tbl"],
    func: ( input, args ) => alg.table( input, ...args )
  },
  {
    commands: ["integral", "integrate", "int"],
    func: alg.integrate
  },
  {
    commands: ["solve"],
    func: alg.multiSolve
  },
]

function getCommand( userCommand = "" ) {
  const command = commands.find( x => x.commands.indexOf( userCommand ) != -1 )
  return command ? { func: command.func, found: true } : { func: eval, found: false }
}

function execute( input = "" ) {

  const extractArg = /^([a-zA-Z]+)(\[([^\n\[\]]*?)\])?/ // Extracts the first word (and parentheses if available)

  input = input.trim()

  // Get Command and Arguments
  let args = { command: "", args: [] }
  const argumentMatch = extractArg.exec( input )
  if ( argumentMatch ) {
    if ( argumentMatch[1] ) args.command = argumentMatch[1]
    if ( argumentMatch[2] ) args.args = argumentMatch[2].split( "," ).map( x => eval( x ) )
  }

  // Search for the found command inside the commands array, and return the value
  const command = getCommand( args.command )
  if ( command.found ) {
    input = input.replace( extractArg, "" ).trim() // If a command was found, remove the command from the input string
  } else {
    // If no command is found, try to guess the intended command

    const equasion = isEquasionRegex.test( input )
    const numerical = isNumericalRegex.test( input )
    const digitless = isDigitlessRegex.test( strToExecute )
    const operationless = isOperationlessRegex.test( strToExecute )

    // true for declared, false for undeclared
    const declaredVariables = input.split( /\b[a-zA-Z_]+\b/g ).map( x => eval( `typeof ${x}` ) != "undefined" )
    const anyUndeclared = !declaredVariables.reduce( ( curr, prev ) => curr && prev, true )
    const anyDeclared = declaredVariables.reduce( ( curr, prev ) => curr || prev, false )

    if ( equasion ) command.func = getCommand( "solve" ).func
    if ( !anyDeclared ) command.func = getCommand( "search" ).func
    if ( input == "" ) command.func = getCommand( "persistent" ).func

  }




}


// MAIN
//////////////////////////////////////////////////////////////////////////////////////

let input = process.argv.slice( 2 ).join( " " ).trim() // Getting the argument
print( col.dim + "> " + col.reset + col.bright + input )

// Simply Evaluate if there are no variables or functions (fast-pass)
if ( isNumericalRegex.test( input ) && input != "" ) {
  let result = eval( input )
  print( ` = ${result}`, col.mathResult )
  num.processNumber( result )
  process.exit()
}

prepare()


let persistentMode = false
let strToExecute = input

let ans = 0
let lastExec = ""
do {

  lastExec = strToExecute

  strToExecute = parse( strToExecute )

  const argRegex = /^(compile|exit|launch|persistent|search|table|tbl|integral|integrate|int|solve)(\[([^\n\[\]]*?)\])?/g

  let tmp = argRegex.exec( strToExecute )
  let args = ["", ""]
  if ( tmp != null ) args = [
    tmp[1] == null ? "" : tmp[1],
    tmp[3] == null ? "" : tmp[3].split( "," ).map( x => eval( x ) ),
  ]
  //console.log( args )

  strToExecute = strToExecute.replace( argRegex, "" ).trim()

  /* let variables = strToExecute.match( letters )
  if ( variables == null ) variables = []
  else variables = uniq( variables ) */
  //print(variables)

  if ( args[0] == "" ) {
    const isEquasion = isEquasionRegex.test( strToExecute )
    const isFuncDeclaration = isFuncDeclarationRegex.test( strToExecute )
    const isDigitless = isDigitlessRegex.test( strToExecute )
    const isOperationless = isOperationlessRegex.test( strToExecute )
    //const hasUndeclaredVariables = !strToExecute.split( /(?:[^\w\-.]|(?<![\d.]e)-(?!\d)|(?<!\w)\.(?!\w))+/ ).filter( x => x != "" ).reduce( ( prev, curr ) => prev && ( eval( `typeof ${curr}` ) != "undefined" ), true )
    const hasAnyDeclaredVariable = strToExecute.split( /(?:[^\w\-.]|(?<![\d.]e)-(?!\d)|(?<!\w)\.(?!\w))+/ ).filter( x => x != "" ).reduce( ( prev, curr ) => prev || ( eval( `typeof ${curr}` ) != "undefined" ), false )

    if ( isEquasion /* && !isFuncDeclaration */ ) args[0] = "solve"
    if ( isDigitless && isOperationless && !hasAnyDeclaredVariable ) args[0] = "search"
    if ( strToExecute == "" && !persistentMode ) args[0] = "persistent"

  }

  print( col.dim + "> " + col.reset + col.bright + ( args[0] != "" ? args[0] + `[${args[1]}]: ` : "" ) + strToExecute + col.dim + " (Interpretation)" )

  switch ( args[0] ) {
    case "tbl":
    case "table":
      alg.table( eval( `${"x"} => ${strToExecute}` ), ...args[1] )
      break
    case "int":
    case "integral":
    case "integrate":
      ans = alg.integrate( eval( `${"x"} => ${strToExecute}` ), ...args[1] )
      break
    case "solve":
      ans = alg.multiSolve( eval( `${"x"} => ${strToExecute.replace( / *= *[0.]+$/g, "" ).replace( /(.*?) *= *(.*)/g, "($1) - ($2)" )}` ), ...args[1] )
      break
    case "search":
      num.searchConstants( strToExecute, ...args[1] )
      break
    case "launch":
    case "persistent":
      print( " Activated Persistent Mode. To close the application, type 'exit' ", col.reverse )
      persistentMode = true
      break
    case "exit":
      process.exit()
      break
    case "compile":
      helper.generate()
      break
    default:
      let result = eval( strToExecute )
      print( ` = ${result}`, col.mathResult )
      num.processNumber( result )
      ans = result
  }

  if ( persistentMode ) {

    print( "" )
    strToExecute = prompt( col.dim + "> " + col.reset )
    if ( strToExecute == "repeat" || ( strToExecute == "" && lastExec != "" ) ) strToExecute = lastExec

  }


} while ( persistentMode )


//fs.writeFileSync("data/functions.txt", functionDatabase)