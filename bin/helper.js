const fs = require( "fs" )
const col = require( "./colors" )
function print( x, color = "" ) { console.log( `${color}${x}${col.reset}` ) }

function roundSig( n, p ) { return parseFloat( n.toPrecision( p ) ) }
function roundFix( n, p ) { return parseFloat( n.toFixed( p ) ) }

const subscriptNumbers = "₀₁₂₃₄₅₆₇₈₉"
const subscriptLetters = { a: "ₐ", e: "ₑ", h: "ₕ", i: "ᵢ", j: "ⱼ", k: "ₖ", l: "ₗ", m: "ₘ", n: "ₙ", o: "ₒ", p: "ₚ", r: "ᵣ", s: "ₛ", t: "ₜ", u: "ᵤ", v: "ᵥ", x: "ₓ" }
// regex for generating abbreviations: /(?<!\w)([qwrtzpsdfghjklyxcvbnm]*[aeiou]+[qwrtzpsdfghjklyxcvbnm]+)[^:]+([^,]+, *)/gmi
const otherCharacters = {
    Alpha: "Α", Beta: "Β", Gamma: "Γ", Delta: "Δ", Epsilon: "Ε", Zeta: "Ζ", Eta: "Η", Theta: "Θ", Iota: "Ι", Kappa: "Κ", Lambda: "Λ", Mu: "Μ", Nu: "Ν", Xi: "Ξ", Omicron: "Ο", Pi: "𝚷", Rho: "Ρ", Sigma: "Σ", Tau: "Τ", Upsilon: "Υ", Phi: "𝚽", Chi: "Χ", Psi: "𝚿", Omega: "𝛀",
    alpha: "α", beta: "β", gamma: "γ", delta: "δ", epsilon: "ε", zeta: "ζ", eta: "η", theta: "𝜃", iota: "ι", kappa: "κ", lambda: "λ", mu: "𝜇", nu: "ν", xi: "ξ", omicron: "ο", pi: "π", rho: "𝝆", sigma: "𝝈", tau: "τ", upsilon: "υ", phi: "𝝋", chi: "χ", psi: "ᴪ", omega: "𝝎",

    Alph: "Α", Bet: "Β", Gamm: "Γ", Delt: "Δ", Eps: "Ε", Zet: "Ζ", Et: "Η", Thet: "Θ", Iot: "Ι", Kapp: "Κ", Lambd: "Λ", Sigm: "Σ", Ups: "Υ", Om: "𝛀",
    alph: "α", bet: "β", gamm: "γ", delt: "δ", eps: "ε", zet: "ζ", et: "η", thet: "𝜃", iot: "ι", kapp: "κ", lambd: "λ", sigm: "𝝈", ups: "υ", om: "𝝎",

    prime: "′",
    inf: "∞"
}
const nameReplace = {
    h: "ℎ",
    h_red: "ℏ"
}

const constExtractor = /const +(\w+) *= *(.+) *\/\/ *(\[(.*)\])? *(.*)/g
const constNameExtractor = /^([^_\n]+)_([^_\n]+)$/
const validLetterSubscript = /^[aehijklmnoprstuvx]+$/i
const validNumberSubscript = /^[0-9]+$/

function arrToString( arr, separator = ", " ) {
    let str = "["
    for ( let i = 0; i < arr.length; i++ ) {
        let element = arr[i]
        if ( i != 0 ) str += separator
        if ( Array.isArray( element ) ) {
            str += arrToString( element )
        } else if ( typeof ( element ) == "string" ) {
            str += '"' + element + '"'
        } else {
            str += element.toString()
        }
    }
    str += "]"
    return str
}

function parseUserConstants( string, outputArray ) {
    string.replace( constExtractor, ( match, name, val, unused, symbol, description ) => {

        let value = eval( val )
        globalThis[name] = value

        if ( symbol == null || symbol == "" ) symbol = name

        if ( otherCharacters.hasOwnProperty( symbol ) ) symbol = otherCharacters[symbol]
        else if ( nameReplace.hasOwnProperty( symbol ) ) symbol = nameReplace[symbol]

        let nameMatch = constNameExtractor.exec( symbol )
        if ( nameMatch != null && !nameReplace.hasOwnProperty( symbol ) ) {
            symbol = otherCharacters.hasOwnProperty( nameMatch[1] ) ? otherCharacters[nameMatch[1]] : nameMatch[1]

            if ( otherCharacters.hasOwnProperty( nameMatch[2] ) ) {

                symbol += otherCharacters[nameMatch[2]]

            } else if ( validNumberSubscript.test( nameMatch[2] ) ) {

                for ( let i = 0; i < nameMatch[2].length; i++ )
                    symbol += subscriptNumbers[parseInt( nameMatch[2][i] )]

            } else if ( validLetterSubscript.test( nameMatch[2] ) ) {

                for ( let i = 0; i < nameMatch[2].length; i++ )
                    symbol += subscriptLetters[nameMatch[2][i].toLowerCase()]

            } else {
                symbol += "_" + nameMatch[2]
            }
        }


        outputArray.push( [
            value, symbol, name, description
        ] )

    } )
}

function generate() {
    fs.writeFileSync( __dirname + "/../data/compile_out.txt", "" )

    print( "\nMultimatch Constants...", col.FgYellow )

    let multimatchConstString = fs.readFileSync( __dirname + "/../data/multimatch_constants.txt", { encoding: 'utf8', flag: 'r' } )
    let multimatchConstArr = []
    parseUserConstants( multimatchConstString, multimatchConstArr )

    /* multimatchConstArr.push(
        ...multimatchConstArr.map( x => [x[0] + "_sq", x[1] * x[1], x[2] + "²", x[3] + " squared"] ),
        ...multimatchConstArr.map( x => [x[0] + "_inv", 1 / x[1], x[2] + "⁻¹", "inverse of " + x[3]] ),
        ...multimatchConstArr.map( x => ["sqrt_" + x[0], Math.sqrt( x[1] ), "√" + x[2], "square root of " + x[3]] ),
    ) */

    multimatchConstArr.push(
        ...multimatchConstArr.map( x => [x[0] * x[0], x[1] + "²", false, false] ),
        ...multimatchConstArr.map( x => [1 / x[0], x[1] + "⁻¹", false, false] ),
        ...multimatchConstArr.map( x => [Math.sqrt( x[0] ), "√" + x[1], false, false] ),
    )

    print( "...generated" )
    fs.appendFileSync( __dirname + "/../data/compile_out.txt", "const constants_multimatch = " + arrToString( multimatchConstArr ) + "\n\n" )
    print( "...saved" )


    print( "\nRationalisation Constants...", col.FgYellow )

    let constants = []
    constants.push(
        ... new Array( 40 ) // Add Square Roots
            .fill( 0 )
            .map( ( x, i ) => [Math.sqrt( i ), `√${i}`, false, false] ) // Create Square Roots
            .filter( x => Math.round( x[0] ) != x[0] )  // Remove perfect squares
            .filter( ( x, index, a ) => {               // Remove roots that are multiples of each other
                for ( let i = 0; i < index; i++ ) {
                    if ( roundSig( ( x[0] / a[i][0] ), 5 ) == Math.round( x[0] / a[i][0] ) ) return false
                }
                return true
            } ),
        ... new Array( 11 ) // Add Cube Roots
            .fill( 0 )
            .map( ( x, i ) => [Math.cbrt( i ), `∛${i}`, false, false] ) // Create Square Roots
            .filter( x => Math.round( x[0] ) != x[0] )  // Remove perfect cubes
            .filter( ( x, index, a ) => {               // Remove roots that are multiples of each other
                for ( let i = 0; i < index; i++ ) {
                    if ( roundSig( ( x[0] / a[i][0] ), 5 ) == Math.round( x[0] / a[i][0] ) ) return false
                }
                return true
            } )
    )

    print( "...generated" )
    fs.appendFileSync( __dirname + "/../data/compile_out.txt", "const constants_rationalize = " + arrToString( constants ) + "\n\n" )
    print( "...saved" )


    print( "\nPhysical / Mathematical Constants...", col.FgYellow )

    let pureMatchConstStr =
        fs.readFileSync( __dirname + "/../data/mathematical_constants.txt", { encoding: 'utf8', flag: 'r' } ) + "\n" +
        fs.readFileSync( __dirname + "/../data/physical_constants.txt", { encoding: 'utf8', flag: 'r' } )
    let pureMatchConstArr = []
    parseUserConstants( pureMatchConstStr, pureMatchConstArr )

    print( "...generated" )
    fs.appendFileSync( __dirname + "/../data/compile_out.txt", "const constants_match = " + arrToString( pureMatchConstArr ) + "\n\n" )
    print( "...saved" )

    print( "\nCompiled Arrays have been saved in 'data/compile_out.txt'.\nCopy them into 'process_number.js' for the changes to take effect.", col.FgYellow + col.bright )

}



module.exports = {
    generate
}