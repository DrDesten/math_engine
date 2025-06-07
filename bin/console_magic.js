import * as col from "./colors.js"

function stdwrite( msg = "" ) { process.stdout.write( msg ) }
function print( x, color = "" ) { color == "" ? console.log( x, col.reset ) : console.log( color + x, col.reset ) }

const Box = { // Unicode Box drawing blocks
    cornerUpL: "╭", cornerUpR: "╮", cornerDownR: "╯", cornerDownL: "╰",
    lineVertical: "│", lineHorizontal: "─", lineCross: "┼",
    lineInvT: "┴", lineT: "┬", lineBranchL: "┤", lineBranchR: "├",
}
const Pixel = {
    corner: ["▘", "▝", "▖", "▗"],
    walls: ["▌", "▐", "▀", "▄"],
    diagonal: ["▚", "▞"],
    step: ["▛", "▜", "▙", "▟"]
}

function breakLineChar( line = "", targetWidth = 100 ) {
    let lines = []
    let charBreakLines = []
    while ( line.length > 0 ) { charBreakLines.push( line.substring( 0, targetWidth ) ); line = line.substring( targetWidth ) }
    lines.push( ...charBreakLines )
    return lines.join( "\n" )
}

function breakLineWord( line = "", targetWidth = 100 ) {
    let elements = line.split( /(?<=\S)(?=\s)|(?<=\s)(?=\S)/g ).filter( Boolean )
        .map( ele => { return /\S+/.test( ele ) ? { string: ele, isWord: true } : { string: ele, isWord: false } } )

    let lines = [""]
    for ( let i = 0; i < elements.length; i++ ) {
        const ele = elements[i]
        const nextele = elements[i + 1] ?? { string: "", isWord: false }

        if ( lines[lines.length - 1].length + ele.string.length > targetWidth ) {
            if ( ele.string.length > targetWidth ) {
                let tmp = ele.string
                let charBreakLines = []
                while ( tmp.length > 0 ) { charBreakLines.push( tmp.substring( 0, targetWidth ) ); tmp = tmp.substring( targetWidth ) }
                lines.push( ...charBreakLines )
            } else {
                if ( ele.isWord ) lines.push( ele.string ) // Push the word to a new line
                else lines.push( "" ) // If it's whitespace, simply add a new line
            }
        } else {
            lines[lines.length - 1] += ele.string // if the line doesn't overflow, simply add the element to the string
        }
    }

    return lines.join( "\n" )
}


export function printTable( data = [[]], title = "", separator = [" "] ) {
    if ( !Array.isArray( separator ) ) separator = [separator ?? " "]

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

            if ( types[x] == "number" && numberData[x].neg ) {
                if ( data[x][y] >= 0 ) {
                    str += " " + data[x][y].toString()
                    str += " ".repeat( maxLength[x] - data[x][y].toString().length )
                } else {
                    str += data[x][y].toString()
                    str += " ".repeat( maxLength[x] - data[x][y].toString().length + 1 )
                }
            } else {

                str += data[x][y].toString()
                str += " ".repeat( maxLength[x] - data[x][y].toString().length )

            }

            if ( x < data.length - 1 ) str += `${col.reset}${separator[Math.min( x, separator.length - 1 )]}${col.reset}`
        }
        if ( y < data[0].length - 1 ) str += `${col.reset}\n`
    }
    console.log( str )
}



export class CLWindow {
    constructor( width = 75, height = 30, opts = {} ) {
        opts = {
            mode: ( opts.mode ?? "progressive" ),
            linebreak: ( opts.linebreak ?? "word" ),
            borderColor: ( opts.borderColor ?? [255, 255, 255] )
        }

        this.x = Math.max( width, 10 )
        this.y = height

        this.mode = opts.mode
        this.linebreak = opts.linebreak
        this.borderColor = opts.borderColor

        this.objects = []
        this.line = 0
        this.content = "" // Content to display
        this.buffer = ""  // Display-Ready Content
    }

    toString() { return "[object CommandLineWindow]" }
    reset() { this.objects = [], this.line = 0; this.content = "", this.buffer = ""; return this }

    get width() { return this.x }
    get height() { return this.y }

    resize( width ) {
        this.x = width
        this.buffer = this.formatLines( this.content )
        return this
    }

    formatLines( string = "" ) {
        let lines = string.split( /\n|\r/g )
        if ( this.linebreak == "word" ) {
            for ( let i = 0; i < lines.length; i++ ) {
                lines[i] = breakLineWord( lines[i], this.width )
            }
        } else {
            for ( let i = 0; i < lines.length; i++ ) {
                lines[i] = breakLineChar( lines[i], this.width )
            }
        }
        return lines.join( "\n" )
    }

    addLines( str = "" ) {
        this.content += str + "\n"
        this.buffer += this.formatLines( str ) + "\n"
        return this
    }

    draw() {
        let lines = this.buffer.split( "\n" ).filter( Boolean )
        const r = col.reset, c = col.FgRGB( ...this.borderColor )

        print( `${c}${Box.cornerUpL}${Box.lineHorizontal.repeat( this.width + 2 )}${Box.cornerUpR}${r}` )
        for ( let i = 0; i < lines.length; i++ ) {
            print( `${c + Box.lineVertical + r} ${lines[i] + " ".repeat( this.width - lines[i].length )} ${c + Box.lineVertical + r}` )
        }
        print( `${c}${Box.cornerDownL}${Box.lineHorizontal.repeat( this.width + 2 )}${Box.cornerDownR}${r}` )

        return this
    }






}