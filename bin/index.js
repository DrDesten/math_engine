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
const types = require( "./types" )
const math = require( "./math" )
const num = require( "./process_number" )
const alg = require( "./algorithms" )
const col = require( "./colors" )
const helper = require( "./helper" )
const { betterArray } = require( "./types" )

const _lockedVariables = Object.keys( globalThis )

const rl = readline.createInterface( {
  input: process.stdin,
  output: process.stdout,
  completer: line => {
    const completions = commands.reduce( ( acc, curr ) => { acc.push( ...curr.commands ); return acc }, [] )
    const hits = completions.filter( x => x.startsWith( line ) && x != line )
    return [hits, line]
  },
  tabSize: 4,
} )

// FUNCTIONS
//////////////////////////////////////////////////////////////////////////////////////

const prompt = ( query ) => new Promise( ( resolve ) => rl.question( query, resolve ) )

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
const letterRegex= /[A-z]+(?!\()/g
const numberRegex = /((?:\d+\.?\d*|\.?\d+)(?:e[+-]?\d+)?|NaN|Infinity)/g
const parseVariables = /^const *(.+?) *= *(.+)(?<!\/(?=\/).*)/gm

const isDigitlessRegex = /^[^\d\n]+$/
const isOperationlessRegex = /^[^+\-*\/!=&<>|%]+$/
const isFuncDeclarationRegex = /[a-z]\([a-z, ]+\)/i
const isEquationRegex = /(?<=x.*)=|=(?=.*x)/i

const implicitMult = /(?<=(?:^|\W)(?:\d+(?:\.\d+)?|\.?\d+)(?:e[+-]?\d+)?)(?=[a-df-zA-Z]|e(?![+-\d]))|(?<=\W\d+|\))(?=\()|(?<=\))(?=\w)/g
const MathFunctions = /(?<!\.)(abs|acosh|acos|asinh|asin|atan2|atanh|atan|cbrt|ceil|clz32|cosh|cos|expm1|exp|floor|fround|hypot|imul|log10|log1p|log2|log|max|min|pow|random|round|sign|sinh|sin|sqrt|tanh|tan|trunc)(?=\()/g
const mathFunctions = /(?<!\.)(logn)(?=\()/g
const ALGfunctions = /(?<!\.)(precision)(?=\()/g
const NUMBERconstants = /(?<!\.)(MIN_VALUE|EPSILON|MAX_VALUE|MAX_SAFE_INTEGER|MIN_SAFE_INTEGER)/g
const MAX_INT = Number.MAX_SAFE_INTEGER + 1, MIN_INT = Number.MIN_SAFE_INTEGER - 1, MAX_FLOAT = Number.MAX_VALUE, MIN_FLOAT = Number.MIN_VALUE

const logBaseN = /(?<!\.)log([013-9]|[02-9]\d|1[1-9]|\d{3,}|[a-mo-zA-Z_][a-zA-Z_]*)\(/g
const trigImplicitParenth = /\b(sin|sinh|cos|cosh|tan|tanh|ln)([a-gi-zA-GI-Z][a-zA-Z_]*|[\d.]+)/g

function parse( str = "" ) {
  str = str.replace( implicitMult, "*" )
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
  //let functionDatabase = fs.readFileSync( __dirname + "/../data/functions.txt", { encoding: 'utf8', flag: 'r' } )
  //evalCustomVariables( functionDatabase, builtInConstants )

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

function isDefined( varname ) {
  if ( !varname ) return false
  return eval( `typeof (${varname})` ) != "undefined"
}

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

function help( helpCommand ) {
  const cmdclr = str => col.FgCyan + str + col.reset
  const altclr = arr => arr.length > 0 ? col.dim + "[" + arr.join( ", " ) + "]" + col.reset : ""
  const maxlen = commands.reduce( ( acc, x ) => Math.max( acc, x.commands[0].length ), 0 )

  if ( !helpCommand ) {

    print( col.ul( "General Usage:" ) )
    print(
      "User Input:\n" +
      "Input consists of 3 elements, but some are optional:\n" +
      `> ${cmdclr( "command" )}\n` +
      `> ${col.FgYellow}arguments${col.reset}\n` +
      "> input\n" +
      "These elements are expressed in the following way:\n" +
      "Arguments are passed as comma-separated values inside of the brackets.\n" +
      `> ${cmdclr( "command" )}[${col.FgYellow}arguments${col.reset}] input\n\n` +
      "When the arguments are omitted, default arguments will be used.\n" +
      `When the command is omitted, the program will try to infer the command.\n` +
      "Writing nothing is equivalent to the 'launch' command. When in persistent mode, an empty input will repeat the previous input.\n"
    )

    print( col.ul( "Constants:" ) )
    print(
      "This calculator has a bunch of physical and mathematical constants built-in.\n" +
      "You can use the 'search' command to search for constants.\n" +
      "All constants are available under their normal variable name and with a 'const_' prefix. This is to make sure there is a fallback if they collide with user-defined variables.\n"
    )

    print( col.ul( "Persistent Mode:" ) )
    print(
      `Persistent Mode can be started using the 'launch' command or by calling the program without input.\n` +
      `In Persistent Mode the program will stay open and listen for your input without restarting the program everytime.\n` +
      `In Persistent Mode a few variables and commands become accessible:\n` +
      `> ans:       ans contains the numerical result of your last query.\n` +
      `> history[]: The history command shows your query history.\n` +
      `> history:   The history array contains the results of your previous queries. For more info on the history command and array, type 'help history'.\n`
    )

    print( col.ul( "Commands:" ) )
    for ( const ele of commands ) {
      print( `${cmdclr( ele.commands[0] )}: ${" ".repeat( maxlen - ele.commands[0].length )}${ele.help || `${col.dim}<no help text>${col.reset}`} ${altclr( ele.commands )}` )
    }

    print( "\nTo know more about a specific command, type 'help <command>'." )

  } else {

    let command = getCommand( helpCommand )
    if ( command.found ) {
      const typeRegex = /(?<=Arguments: *\[[^\]]*)(input)?( *)((?:number|string|function):)/g
      const defaultRegex = /(?<=Arguments: *\[[^\]]*)default:/g
      const noneRegex = /(?<=: *)none/g
      const parseHelpDetail = str =>
        str.replace( noneRegex, `${col.dim}$&${col.reset}` )
          .replace( typeRegex, `${col.FgCyan}$1${col.reset}$2${col.FgGreen}$3${col.reset}` )
          .replace( defaultRegex, `${col.FgYellow}$&${col.reset}` )

      print(
        `${cmdclr( command.commands[0] )} ${altclr( command.commands.slice( 1 ) )}\n` +
        `${command.help || `${col.dim}<no help text>${col.reset}`}\n` +
        `${parseHelpDetail( command.helpDetail || `${col.dim}<no detailed help available>${col.reset}` )}`
      )
    } else {
      print( `Command '${helpCommand}' not found.`, col.mathWarn )
    }

  }
}

function displayHistory( elements = Infinity ) {
  const arr = history.slice( -elements )
  const dublicate = arr.reduce( ( acc, curr, index ) => {
    if ( acc[acc.length - 1]?.content.input == curr.input && acc[acc.length - 1]?.content.result == curr.result ) acc[acc.length - 1].count++
    else acc.push( { content: curr, index: index + Math.max( 0, history.length - elements ), count: 1 } )
    return acc
  }, [] )

  for ( let i = 0; i < dublicate.length; i++ ) {
    let { content, index, count } = dublicate[i]
    let { input, result } = content
    print( `${col.FgGreen}${" ".repeat( ( history.length - 1 ).toString().length - index.toString().length )}${index}${col.reset} ${col.dim}>${col.reset} ${col.FgCyan}${input.trim()}${result != undefined ? ":" : ""}${col.reset}${result ? " " + result : ""} ${count > 1 ? `${col.dim}(${count}x)${col.reset}` : ""}` )
  }
}

const commands = [
  {
    commands: ["compile"],
    func: ( input, args = [] ) => helper.generate(),
    help: "Compiles physical and mathematical constants into javascript arrays to be used in the program",
    helpDetail: `The compiled output can be found in 'data/compile_out.txt'.\n${col.dim}[] No Arguments${col.reset}`,
    print: false,
  },
  {
    commands: ["exit"],
    func: ( input, args = [] ) => process.exit( 0 ),
    help: "Closes the program",
    helpDetail: `${col.dim}[] No Arguments${col.reset}`,
    print: false,
  },
  {
    commands: ["launch", "init", "persistent"],
    func: ( input, args = [] ) => {
      print( " Activated Persistent Mode. To close the application, type 'exit', for help type 'help'", col.reverse )
      _persistent = true
    },
    help: "Opens the program in persistent mode",
    helpDetail: `${col.dim}[] No Arguments${col.reset}`,
    print: false,
  },
  {
    commands: ["help"],
    func: ( input, args = [] ) => help( input ),
    help: "Displays the help menu",
    helpDetail: "The Arguments syntax can be read this way:\n'number:', 'string:' and 'function:' specify the expected type of the argument.\nAn 'input' prefix means that the argument is the user input passed along with the function, not one of the arguments specified in brackets.\n'default:' is the default value of the argument\n" +
      `${col.dim}[] No Arguments${col.reset}`,
    print: false,
  },
  {
    commands: ["evaluate", "eval", "calculate", "calc"],
    func: ( input, args = [] ) => eval( input ),
    help: "Evaluates input expression",
    helpDetail: `${col.dim}[] No Arguments${col.reset}`,
    print: true,
  },
  {
    commands: ["history"],
    func: ( input, args = [] ) => displayHistory( ...args ),
    help: "Shows input history",
    helpDetail: `The history array can be accessed like any other array: 'history[index]'.\nTo not trigger the history command, manually specify 'evaluate' as the command.\nNegative indices are relative to the end of the array.\nArguments: [ number: Amount of history items to show default: Infinity ]`,
    print: false,
  },
  {
    commands: ["search"],
    func: ( input, args = [] ) => num.searchConstants( input, ...args ),
    help: "Searches the given keywords in the constants database",
    helpDetail: `Arguments: [ number: Number of results default: 5 ]`,
    print: false,
  },
  {
    commands: ["match"],
    func: ( input, args = [] ) => num.matchNumber( eval( input ), ...args ),
    help: "Matches number or expression result using the fraction finder",
    helpDetail: `Arguments: [ number: Number of results default: 5 ]`,
    print: false,
  },
  {
    commands: ["table", "tbl"],
    func: ( input, args = [] ) => alg.table( functionFromInput( input ), ...args ),
    help: "Prints a function table for the given input",
    helpDetail: alg.tableHelp,
    print: false,
  },
  {
    commands: ["graph", "plot"],
    func: ( input, args = [] ) => alg.graph( functionFromInput( input ), ...args ),
    help: "",
    helpDetail: "",
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
    helpDetail: "",
    print: false,
  },
  {
    commands: ["integral", "integrate", "int"],
    func: ( input, args = [] ) => alg.integrate( functionFromInput( input ), ...args ),
    help: "Integrates equations with respect to x, using a degree-4 polyomial approximation inbetween steps.",
    helpDetail: alg.integrateHelp,
    print: false,
  },
  {
    commands: ["solve"],
    func: ( input, args = [] ) => alg.multiSolve( functionFromInput( input.replace( / *= *[0.]+$/g, "" ).replace( /(.*?) *= *(.*)/g, "($1) - ($2)" ) ), ...args ),
    help: "Solves equations for multiple x using bisection solve. Does not always return all solutions.",
    helpDetail: alg.multiSolveHelp,
    print: false,
  },
  {
    commands: ["set"],
    func: ( input, args = [] ) => {
      const assignment = /([a-zA-Z_]\w*)(\([a-zA-Z]\))?(?: +| *= *)([^\s=].*)/g.exec( input )
      if ( assignment ) helper.defineVariable( _sessionstorage, _lockedVariables, assignment[1], assignment[3] )
      else print( "Unable parse input. Syntax: 'set <varname> <expression>'", col.mathWarn )
      console.log( _sessionstorage )
    },
    help: "Sets a user-defined variable",
    helpDetail: "",
    print: false,
  },
  {
    commands: ["save"],
    func: ( input, args = [] ) => {
      helper.saveSession( _sessionstorage, input.split( /\s/ )[0].replace( /\.txt *$/, "" ) )
    },
    help: "Saves the current session",
    helpDetail: "",
    print: false,
  },
  {
    commands: ["load"],
    func: ( input, args = [] ) => {
      helper.loadSession( _sessionstorage, _lockedVariables, input.split( /\s/ )[0] )
    },
    help: "Loads a session from file",
    helpDetail: "",
    print: false,
  },
].sort( ( a, b ) => {
  for ( let i = 0; i < a.commands[0].length; i++ ) {
    let d = a.commands[0].charCodeAt( i ) - b.commands[0].charCodeAt( i )
    if ( d != 0 ) return d
  }
  return -1
} )

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

  const extractArg = /^([a-zA-Z]+) *(?:\[([^\n\[\]]*?)\])?/ // Extracts the first word (and parentheses if available)

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

    const equation = isEquationRegex.test( input )
    const numerical = isNumericalRegex.test( input )
    const digitless = isDigitlessRegex.test( input )
    const operationless = isOperationlessRegex.test( input )

    // true for declared, false for undeclared
    const declaredVariables = input.split( /(?<=[\w.])(?=[^\w.])|(?<=[^\w.])(?=[\w.])/g ).filter( _ => /^[\w$][\w.$]*$/.test( _ ) ).map( isDefined )
    const anyUndeclared = !declaredVariables.reduce( ( curr, prev ) => curr && prev, true )
    const anyDeclared = declaredVariables.reduce( ( curr, prev ) => curr || prev, false )

    if ( equation ) command = getCommand( "solve" )
    if ( !equation && anyUndeclared ) command = getCommand( "table" )
    if ( !anyDeclared && operationless ) command = getCommand( "search" )
    if ( !anyUndeclared && operationless ) command = getCommand( "match" )
    if ( input == "" && !_persistent ) command = getCommand( "launch" )

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

let _persistent = false

let ans = NaN
let history = betterArray()
let _sessionstorage = []

ans = execute( input );

( async () => {

  while ( _persistent ) {

    let nextInput = await prompt( col.dim + col.bright + "> " + col.reset )
    if ( nextInput != "" ) input = nextInput

    try {
      let result = execute( input )
      if ( result ) ans = result
    } catch (err) {
      print(`Unable to execute command: ${err}`, col.mathError)
    }

  }

  process.exit( 0 )

} )()


//fs.writeFileSync("data/functions.txt", functionDatabase)