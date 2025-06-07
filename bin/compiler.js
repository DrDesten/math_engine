/**
 * @typedef {Object} Command
 * @property {string[]} commands
 * @property {(input: string, args: string[]) => any} func 
 * @property {string} help
 * @property {string} helpDetail
 * @property {boolean} print
 */

export class Compiler {
    constructor() {
        /** @type {Command[]} */
        this.commands = []
    }

    /** @param {...Command} command  */
    registerCommands( ...command ) {
        this.commands.push( ...command )
    }

    getCommand( keyword ) {
        return this.commands.find( c => c.commands.includes( keyword ) )
    }

    /** @param {string} input  */
    parse( input ) {

        const compileCommandRegex = () => {
            let commands = this.commands.flatMap( c => c.commands ).join( "|" )
            return new RegExp( `^(?<command>${commands})\\s*(?:\\[(?<args>.*?)\\])?` )
        }

        const parseCommand = ( string ) => {
            const regex = compileCommandRegex()
            const match = regex.exec( string )
            if ( !match ) return null

            // Get command
            const keyword = match.groups.command
            const command = this.getCommand( keyword )

            // Get arguments
            const args = match.groups.args?.length > 0 // undefined > 0 == false
                ? match.groups.args.split( "," ).map( _value => eval( _value ) )
                : []

            const result = {
                command: command,
                keyword: keyword,
                args: args,
                input: string.replace( regex, "" ).trim()
            }

            return result
        }

        return parseCommand( input )
    }
}

/* let c = new Compiler()
c.registerCommands(
    {
        commands: ["exit"],
        func: ( input = "", args = [] ) => process.exit( 0 ),
        help: "Closes the program",
        helpDetail: `[] No Arguments`,
        print: false,
    },
    {
        commands: ["launch", "init", "persistent"],
        func: ( input = "", args = [] ) => {},
        help: "Opens the program in persistent mode",
        helpDetail: `[] No Arguments`,
        print: false,
    }
)

console.log( c.parse( "exit[]" ) ) */