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


Object.defineProperty( Number.prototype, "epsilon", {
  get: function () {
    return Math.max( this - this.prev, this.next - this )
  }
} )

Object.defineProperty( Number.prototype, "castInt", {
  get: function () {
    const buf = new ArrayBuffer( 8 )
    const f64 = new Float64Array( buf )
    const u64 = new BigUint64Array( buf )

    f64[0] = this

    return u64[0]
  }
} )

/* Object.defineProperty( Number.prototype, "prev", {
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
} ) */

Object.defineProperty( Number.prototype, "bin", {
  get: function () {
    const buf = new ArrayBuffer( 8 )
    const f64 = new Float64Array( buf )
    const u64 = new BigUint64Array( buf )

    f64[0] = this

    return "0".repeat( 64 - u64[0].toString( 2 ).length ) + u64[0].toString( 2 )
  }
} )

Number.prototype.toLength = function ( length = 1 ) {
  let toPrecision = this.toPrecision( 1 ).replace( "+", "" )
  for ( let i = 2; i < 100; i++ ) {
    if ( this.toPrecision( i ).replace( "+", "" ).length > length + 3 ) break
    if ( this.toPrecision( i ).replace( "+", "" ).length > length ) continue
    toPrecision = this.toPrecision( i ).replace( "+", "" )
  }
  return " ".repeat( Math.max( 0, length - toPrecision.length ) ) + toPrecision
}

// IMPORTS
//////////////////////////////////////////////////////////////////////////////////////

const fs = require( "fs" )
const readline = require( 'readline' )
const rl = readline.createInterface( { input: process.stdin, output: process.stdout } )
const prompt = ( query ) => new Promise( ( resolve ) => rl.question( query, resolve ) )
const types = require( "./types" )
const math = require( "./math" )
const num = require( "./process_number" )
const alg = require( "./algorithms" )
const col = require( "./colors" )
const helper = require( "./helper" )
const { historyBuffer } = require( "./types" )

// FUNCTIONS
//////////////////////////////////////////////////////////////////////////////////////

function stdwrite( msg = "" ) { process.stdout.write( msg ) }
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
const isOperationlessRegex = /^[^+\-*\/!=&<>|]+$/
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

function functionFromInput( input, variables = ["x"] ) {
  if ( variables.length > 1 ) return eval( `(${variables.join( "," )}) => ${input}` )
  else return eval( `${variables[0]} => ${input}` )
}

function easterEggs( history ) {
  if ( history.length < 2 ) return
  const getExec = inp => inp.match( /(?<=\w+\[[^\[\]]*\]).*/ )[0].replace( /\s+/g, "" )
  if ( getExec( history[history.length - 2].input ) == "2+2" && getExec( history[history.length - 1].input ) == "ans-1" ) {
    console.log( "Quick Maths!" )
  }
}

const commands = [
  {
    commands: ["compile"],
    func: ( input, args = [] ) => helper.generate(),
    help: "Compiles physical and mathematical constants into javascript arrays to be used in the program",
    print: false,
  },
  {
    commands: ["exit"],
    func: ( input, args = [] ) => process.exit( 0 ),
    help: "Closes the program",
    print: false,
  },
  {
    commands: ["launch", "init", "persistent"],
    func: ( input, args = [] ) => {
      print( " Activated Persistent Mode. To close the application, type 'exit' ", col.reverse )
      persistentMode = true
    },
    help: "Opens the program in persistent mode",
    print: false,
  },
  {
    commands: ["help"],
    func: ( input, args = [] ) => {
      const cmdclr = str => col.FgCyan + str + col.reset
      const altclr = arr => col.dim + "[" + arr.join( ", " ) + "]" + col.reset
      const maxlen = commands.reduce( ( acc, x ) => Math.max( acc, x.commands[0].length ), 0 )

      print( col.ul( "Commands:" ) )
      for ( const ele of commands ) {
        print( `${cmdclr( ele.commands[0] )}: ${" ".repeat( maxlen - ele.commands[0].length )}${ele.help || `${col.dim}<no help text>${col.reset}`} ${altclr( ele.commands )}` )
      }
    },
    help: "Displays the help menu",
    print: false,
  },
  {
    commands: ["evaluate", "eval", "calculate", "calc"],
    func: ( input, args = [] ) => eval( input ),
    help: "Evaluates input expression",
    print: true,
  },
  {
    commands: ["history"],
    func: ( input, args = [] ) => {
      for ( let i = ( args[0] ? Math.max( 0, history.length - args[0] ) : 0 ); i < history.length; i++ )
        print( `${col.FgGreen}${" ".repeat( ( history.length - 1 ).toString().length - i.toString().length )}${i}${col.reset} ${col.dim}>${col.reset} ${col.FgCyan}${history[i].input.trim()}${history[i].result != undefined ? ":" : ""} ${col.reset}${history[i].result != undefined ? history[i].result : ""}` )
    },
    help: "Shows input history",
    print: false,
  },
  {
    commands: ["search"],
    func: ( input, args = [] ) => num.searchConstants( input, ...args ),
    help: "Searches the given keywords in the constants database",
    print: false,
  },
  {
    commands: ["match"],
    func: ( input, args = [] ) => num.matchNumber( eval( input ), ...args ),
    help: "Matches number or expression result using the fraction finder",
    print: false,
  },
  {
    commands: ["table", "tbl"],
    func: ( input, args = [] ) => alg.table( functionFromInput( input ), ...args ),
    help: "Prints a function table for the given input",
    print: false,
  },
  {
    commands: ["graph", "plot"],
    func: ( input, args = [] ) => alg.graph( functionFromInput( input ), ...args ),
    help: "",
    print: false,
  },
  {
    commands: ["limit", "lim"],
    func: ( input, args = [] ) => {
      const limRegex = /(\w+)\s*->\s*([\w.]+)/g
      let parsedArgs = limRegex.exec( input )
      if ( args.length == 0 && parsedArgs != null ) args.push( eval( parsedArgs[2] ) )
      alg.limit( functionFromInput( input.replace( limRegex, "" ).trim() ), ...args )
    },
    help: "",
    print: false,
  },
  {
    commands: ["integral", "integrate", "int"],
    func: ( input, args = [] ) => alg.integrate( functionFromInput( input ), ...args ),
    help: "Computes an integral of the input function",
    print: false,
  },
  {
    commands: ["solve"],
    func: ( input, args = [] ) => alg.multiSolve( functionFromInput( input.replace( / *= *[0.]+$/g, "" ).replace( /(.*?) *= *(.*)/g, "($1) - ($2)" ) ), ...args ),
    help: "Solves the input equasion",
    print: false,
  },
].sort( ( a, b ) => {
  for ( let i = 0; i < a.commands[0].length; i++ ) {
    let d = a.commands[0].charCodeAt( i ) - b.commands[0].charCodeAt( i )
    if ( d != 0 ) return d
  }
  return -1
} )

console.log( commands )

function getCommand( userCommand = "" ) {
  let command = commands.find( x => x.commands.indexOf( userCommand ) != -1 )
  if ( !command ) {
    command = getCommand( "evaluate" )
    command.found = false
  } else {
    command.found = true
  }
  return command
}

function printCommand( command, args, input, syntaxColor = true ) {
  let str = `${col.bright}${col.dim}> ${col.reset}`
  str += `${command.commands[0]}[${args.args.join( "," )}] `
  if ( syntaxColor ) {
    // Numbers
    input = input.replace( /\b(\.\d+|\d+(?:\.\d*)?)(e\d+)?\b/g, `${col.reset}${col.FgGreen}$1$2${col.reset}` )
    // Words / Variables
    input = input.replace( /(?<!\.)\b[a-zA-Z_$]\w*\b(?!\()/g, `${col.reset}${col.reset}$&${col.reset}` )
    // Functions
    input = input.replace( /\b[a-zA-Z_]\w*\b(?=\()/g, `${col.reset}${col.FgYellow}$&${col.reset}` )
    // Properties
    input = input.replace( /\.[a-zA-Z_]\w*\b(?!\()/g, `${col.reset}${col.dim}$&${col.reset}` )
    // Operators
    input = input.replace( /\*|\/|\+|-|\?|=|!|>|<|&|\||:/g, `${col.reset}${col.FgWhite}${col.bright}$&${col.reset}` )
    // Parentheses
    //input = input.replace( /\(|\)/g, `${col.reset}${col.FgRed}$&${col.reset}` )
  }
  str += input
  str += ` ${col.dim}(Interpretation)${col.reset}`
  console.log( str )
}

function execute( input = "" ) {

  const extractArg = /^([a-zA-Z]+)(?:\[([^\n\[\]]*?)\])?/ // Extracts the first word (and parentheses if available)

  input = input.trim()
  input = parse( input )

  // Get Command and Arguments
  let args = { command: "", args: [] }
  const argumentMatch = extractArg.exec( input )
  if ( argumentMatch ) {
    if ( argumentMatch[1] ) args.command = argumentMatch[1]
    if ( argumentMatch[2] ) args.args = argumentMatch[2].split( "," ).map( _value => eval( _value ) )
  }

  /* console.log( "argmatch:", argumentMatch )
  console.log( "args:", args ) */

  // Search for the found command inside the commands array, and return the value
  let command = getCommand( args.command )
  if ( command.found ) {

    input = input.replace( extractArg, "" ).trim() // If a command was found, remove the command from the input string

  } else {

    // If no command is found, try to guess the intended command

    const equation = isEquasionRegex.test( input )
    const numerical = isNumericalRegex.test( input )
    const digitless = isDigitlessRegex.test( input )
    const operationless = isOperationlessRegex.test( input )

    // true for declared, false for undeclared
    const declaredVariables = input.split( /(?<=[\w.])(?=[^\w.])|(?<=[^\w.])(?=[\w.])/g ).filter( x => /^[\w$][\w.$]*$/.test( x ) ).map( _var => eval( `typeof ${_var}` ) != "undefined" )
    const anyUndeclared = !declaredVariables.reduce( ( curr, prev ) => curr && prev, true )
    const anyDeclared = declaredVariables.reduce( ( curr, prev ) => curr || prev, false )

    if ( equation ) command = getCommand( "solve" )
    if ( !equation && anyUndeclared ) command = getCommand( "table" )
    if ( !anyDeclared && operationless ) command = getCommand( "search" )
    if ( !anyUndeclared && operationless ) command = getCommand( "match" )
    if ( input == "" && !persistentMode ) command = getCommand( "launch" )

  }

  input = input.replace( /history\[(-?\d+)\](?!\.)/g, "history[$1].result" )

  printCommand( command, args, input, false )

  let result = command.func( input, args.args )

  if ( command.print ) {
    print( ` = ${result}`, col.mathResult )
    num.processNumber( result )
  }

  history.push( { input: `${command.commands[0]}[${args.args.join( "," )}] ${input}`, result: result } )
  easterEggs( history )

  return result

}


// MAIN
//////////////////////////////////////////////////////////////////////////////////////

let input = process.argv.slice( 2 ).join( " " ).trim() // Getting the argument
if ( input ) print( col.dim + "> " + col.reset + col.bright + input )

// Simply Evaluate if there are no variables or functions (fast-pass)
if ( isNumericalRegex.test( input ) && input != "" ) {

  let result = eval( input )
  print( ` = ${result}`, col.mathResult )
  num.processNumber( result )
  process.exit()

}


prepare()

let persistentMode = false

let ans = NaN
let history = historyBuffer()

ans = execute( input );

( async () => {

  while ( persistentMode ) {

    let nextInput = await prompt( col.dim + col.bright + "> " + col.reset )
    if ( nextInput != "" ) input = nextInput

    let result = execute( input )
    if ( result ) ans = result

  }

  process.exit( 0 )

} )()


//fs.writeFileSync("data/functions.txt", functionDatabase)