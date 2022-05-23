const fs = require( "fs" )
const col = require( "./colors" )
function print( x, color = "" ) { console.log( `${color}${x}${col.reset}` ) }

function roundSig( n, p ) { return parseFloat( n.toPrecision( p ) ) }
function roundFix( n, p ) { return parseFloat( n.toFixed( p ) ) }

function generate() {

    print( "Rationalisation Constants\n", col.FgRed )

    let constants = [
        [Math.PI, "π"],
        [Math.E, "e"],
        [( 1 + Math.sqrt( 5 ) ) / 2, "Φ"],
        //[299792458, "c₀"],
    ]
    constants.push(
        ...constants.map( x => [Math.sqrt( x[0] ), "√" + x[1]] ),
        ...constants.map( x => [x[0] ** 2, x[1] + "²"] ),
        ...constants.map( x => [1. / x[0], x[1] + "⁻¹"] ),
    )
    constants.push( // Add Square Roots
        ... new Array( 101 )
            .fill( 0 )
            .map( ( x, i ) => [Math.sqrt( i ), `√${i}`] ) // Create Square Roots
            .filter( x => Math.round( x[0] ) != x[0] ) // Remove perfect squares
            .filter( ( x, index, a ) => {               // Remove square roots that are multiples of each other
                for ( let i = 0; i < index; i++ ) {
                    if ( roundSig( ( x[0] / a[i][0] ), 5 ) == Math.round( x[0] / a[i][0] ) ) return false
                }
                return true
            } )
    )
    console.log( constants )


    print( "\n\nPhysical Constants\n", col.FgRed )

    const phyConstExtractor = /const +(\w+) *= *(.+) *\/\/ *(.*)/gm
    let phyConstStr = fs.readFileSync( __dirname + "/../data/physical_constants.txt", { encoding: 'utf8', flag: 'r' } )
    let phyConstArr = []
    phyConstStr.replace( phyConstExtractor, ( match, name, val, description ) => {
        console.log( match )
        let value = eval( val )
        globalThis[name] = value
        phyConstArr.push( [
            name, value, description
        ] )
    } )

    console.log( phyConstArr )



}



module.exports = {
    generate
}