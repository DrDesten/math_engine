const col = require( "./colors" )

function stdwrite( msg = "" ) { process.stdout.write( msg ) }
function print( x, color = "" ) { color == "" ? console.log( x, col.reset ) : console.log( color + x, col.reset ) }


function printTable( data = [[]], title = "", separator = "" ) {
    let types = data.map( row => row.reduce( ( acc, cell ) => ( typeof cell ) == acc ? acc : undefined, typeof row[0] ) )
    console.log( data )
    console.log( types )
}





module.exports = {
    printTable,
}