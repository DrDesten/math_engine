import fs from "fs"
import math from "./math.js"
import pnum from "./process_number.js"
import alg from "./algorithms.js"
import col from "./colors.js"
import consoleMagic from "./console_magic.js"
import { Ratio } from "./types.js"

function print( x, color = "" ) { color == "" ? console.log( x, col.reset ) : console.log( color + x, col.reset ) }


export function defineVariable( _sessionstorage, lockedVariables, varname, expression ) {
    if ( lockedVariables.includes( varname ) )
        return print( `${varname} is a reserved variable that cannot be overwritten. Please choose a different name.`, col.mathWarn )
    if ( varname.startsWith( "const_" ) )
        return print( `User defined variables cannot use 'const_' prefix`, col.mathWarn )
    if ( varname.startsWith( "_" ) )
        return print( `User defined variables cannot have '_' as the first character`, col.mathWarn )

    try {
        if ( eval( `typeof ${varname}` ) != "undefined" ) print( `Overwriting ${varname} ${col.dim}(was ${eval( varname )}, is: ${eval( expression )})`, col.mathWarn )
        globalThis[varname] = eval( expression )
    } catch ( err ) {
        print( `Unable to evaluate expression: ${err}`, col.mathError )
        return
    }

    const varIndex = _sessionstorage.findIndex( x => x.name == varname )
    const varElement = {
        name: varname,
        expression: expression,
        result: eval( varname )
    }
    if ( varIndex >= 0 ) _sessionstorage[varIndex] = varElement
    else _sessionstorage.push( varElement )
}


export function saveSession( _sessionstorage, filename, overwrite = true ) {
    if ( _sessionstorage.length == 0 ) return print( "Nothing to save!", col.mathWarn )
    filename = filename || "session"

    try { if ( !fs.existsSync( `${__dirname}/../sessions` ) ) fs.mkdirSync( `${__dirname}/../sessions` ) }
    catch ( err ) { return print( `Unable to create sessions directory: ${err}` ) }

    if ( overwrite ) {
        if ( fs.existsSync( `${__dirname}/../sessions/${filename}.txt` ) ) print( `Overwriting ./sessions/${filename}.txt ${col.dim}...` )
    } else {
        let suffix = -1
        while ( fs.existsSync( `${__dirname}/../sessions/${filename + ( suffix >= 0 ? suffix : "" )}.txt` ) ) suffix++
        filename = filename + ( suffix >= 0 ? suffix : "" )
    }

    let content = ""
    for ( let i = 0; i < _sessionstorage.length; i++ ) {
        const ele = _sessionstorage[i]
        content += `${ele.name} = ${ele.expression}\n`
    }

    fs.writeFileSync( `${__dirname}/../sessions/${filename}.txt`, content )
    print( `Saved session as ./sessions/${filename}.txt` )
}


export function loadSession( _sessionstorage, lockedVariables, filename ) {
    if ( !filename ) return print( "Please provide a filename", col.mathWarn )
    try {

        print( `Loading ./sessions/${filename}.txt` )

        let content = fs.readFileSync( `${__dirname}/../sessions/${filename}.txt`, { encoding: 'utf8', flag: 'r' } ).split( "\n" ).filter( Boolean )
        for ( let i = 0; i < content.length; i++ ) {
            const match = /([^\s=]+) *= *([^\n=]+)/g.exec( content[i] )
            defineVariable( _sessionstorage, lockedVariables, match[1], match[2] )
        }

    } catch ( err ) {
        return print( `Unable to open session file: ${err}`, col.mathError )
    }
}


export function listSessions() {
    if ( !fs.existsSync( `${__dirname}/../sessions` ) ) return print( "<no files>", col.dim )

    let files = fs.readdirSync( `${__dirname}/../sessions/` )
        .map( file => { return { filename: file.replace( /\.txt$/, "" ), meta: fs.statSync( `${__dirname}/../sessions/${file}` ) } } )
        .sort( ( a, b ) => a.meta.mtime - b.meta.mtime )

    let table = [[], [], []]
    for ( const { filename, meta } of files ) {

        let elapsed = {
            year: new Date().getFullYear() - meta.mtime.getFullYear(),
            month: new Date().getMonth() - meta.mtime.getMonth(),
            day: new Date().getDate() - meta.mtime.getDate(),
            hour: new Date().getHours() - meta.mtime.getHours(),
            minute: new Date().getMinutes() - meta.mtime.getMinutes(),
            second: new Date().getSeconds() - meta.mtime.getSeconds(),
        }
        let elapsedStr = Object.keys( elapsed ).filter( key => elapsed[key] > 0 ).map( key => `${elapsed[key]} ${key}${"s".repeat( elapsed[key] != 1 )}` )

        table[0].push( `${col.bright}${filename}${col.reset}` )
        table[1].push( `${col.FgCyan}${meta.mtime.toLocaleDateString()} ${meta.mtime.toLocaleTimeString()}${col.reset}` )
        table[2].push( `${col.dim}(approx. ${elapsedStr[0]} ago)${col.reset}` )

    }

    consoleMagic.printTable( table )
}