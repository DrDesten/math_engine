import col from "./colors.js"

export class DetailedHelp {
    /** @param {string} message  @param {{name: string, type: "number", default: any, description?: string}[]} args  */
    constructor( message, args ) {
        this.message = message
        this.args = args
    }

    toString = this.generate

    generateArguments() {
        if ( this.args.length === 0 ) {
            return `${col.dim}[] No Arguments${col.reset}`
        }
        let string = `Arguments: [\n`
        const args = []
        for ( const { name, type, default: def, description } of this.args ) {
            const argname = name.split( /\s+/ ).map( w => w[0].toUpperCase() + w.slice( 1 ) ).join( " " )
            const argument = `${type}: ${argname} default: ${def}`
            args.push( { argument, description } )
        }
        const padLength = Math.max( ...args.map( a => a.argument.length ) )
        for ( const { argument, description } of args ) {
            string += `    ${argument.padEnd( padLength )}${description ? " │ " + description.replace( /(?<=\n)/g, " │ ".padStart( padLength + 7 ) ) : ""}\n`
        }
        string += "]"
        return string
    }

    generate() {
        let description = ""
        if ( this.message ) {
            description += `${this.message}\n`
        }
        if ( this.args !== undefined ) {
            description += this.generateArguments()
        }
        if ( !description ) {
            description = `${col.dim}<no detailed help available>${col.reset}`
        }
        return description
    }
}