const col = require( "./colors" )

function stdwrite( msg = "" ) { process.stdout.write( msg ) }
function print( x, color = "" ) { color == "" ? console.log( x, col.reset ) : console.log( color + x, col.reset ) }


function printTable( data = [[]], title = "", separator = " " ) {
    let types = data.map( row => row.reduce( ( acc, cell ) => ( typeof cell ) == acc ? acc : undefined, typeof row[0] ) )
    let maxLength = data.map( row => row.reduce( ( prev, curr ) => Math.max( prev, curr.toString().length ), 0 ) )
    let numberData = data.map( ( row, i ) => types[i] == "number" ? row.reduce( ( prev, curr ) => {
        return {
            neg: prev.neg || Math.sign( curr ) == -1,
        }
    }, {
        neg: false
    } ) : undefined )

    let str = title ? `${title}${col.reset}\n` : ""
    for ( let y = 0; y < data[0].length; y++ ) {
        for ( let x = 0; x < data.length; x++ ) {

            if ( types[x] == "number" ) {
                if ( numberData[x].neg ) {
                    if ( data[x][y] >= 0 ) str += " "
                }
            }

            str += data[x][y].toString()
            str += " ".repeat( maxLength[x] - data[x][y].toString().length )

            if ( x < data.length - 1 ) str += `${col.reset}${separator}${col.reset}`
        }
        if ( y < data[0].length - 1 ) str += `${col.reset}\n`
    }
    console.log( str )
}


class CLWindowObject {
    constructor() {

    }
}
class CLWindow {
    constructor( width = 75, height = 30 ) {
        this.x = width
        this.y = height

        this.objects = []
    }

    get width() { return this.x }
    get height() { return this.y }





}


module.exports = {
    printTable,
}