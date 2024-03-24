class RegExer {
    static get NameCharSet() {
        return "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_"
    }

    static get Encoder() {
        return Object.freeze( {
            Char64: RegExer.NameCharSet,
            Char32: RegExer.NameCharSet.substring( 0, 32 ),
            Char16: RegExer.NameCharSet.substring( 0, 16 ),
            /** @param {string} string */
            encode( string ) {
                return string.split( "" )
                    .map( char => "_" + char.charCodeAt().toString( 32 ) )
                    .join( "" )
            },
            /** @param {string} string */
            decode( string ) {
                return string.split( "_" )
                    .map( substr => substr && String.fromCharCode( parseInt( substr, 32 ) ) )
                    .join( "" )
            },
        } )
    }

    static get NameTransforms() {
        return Object.freeze( {
            /** @param {string} string */
            none( string ) { return string },
            /** @param {string} string */
            skip( string ) { return string.replace( /[^a-zA-Z0-9$_]/g, "" ) },
        } )
    }

    constructor( { encoder = RegExer.NameTransforms.none, decoder = RegExer.NameTransforms.none } = { encoder: RegExer.Encoder.encode, decoder: RegExer.Encoder.decode } ) {
        /** @type {{name:string|undefined,pattern:RegExp}[]} */
        this.groups = []
        this.encoder = encoder
        this.decoder = decoder
    }

    /** @param {string|undefined} name @param {RegExp} pattern */
    group( name, pattern ) {
        this.groups.push( { name, pattern } )
    }

    /** @param {string|RegExp|RegExer} name @param {RegExp|RegExer|undefined} pattern */
    add( name, pattern ) {
        if ( name instanceof RegExer || name instanceof RegExp )
            pattern = name, name = undefined
        if ( pattern instanceof RegExer )
            pattern = pattern.build()
        this.group( name, pattern )
        return this
    }
    build( flags ) {
        function clean( regex ) {
            return /^\/(.*?)\/[a-z]*$/.exec( "" + regex )[1]
        }
        let regex = []
        for ( const group of this.groups ) {
            regex.push( `(${group.name ? `?<${this.encoder( group.name )}>` : ""}${clean( group.pattern )})` )
        }
        return RegExp( regex.join( "|" ), flags )
    }
}

/*
const regex = RegExer()
    .add( "...", /.../ )
    .add( "...", /.../ )
    .add( "...", /.../ )
    .add( "...", /.../ )
    .build()
*/

/*
const const [1,2]
const [1,2]
(1,2)

            [ ... ] /// Dynamic Array
      const [ ... ] /// Array
const const [ ... ] /// Tuple

            { ... } /// Map
      const { ... } /// Struct
const const { ... } /// Named Tuple

const const table, x, y = fn() {
    let x = ...
    let y = ...
    ...
    return result, x, y
}()
*/

const x = new RegExer( {} )
    .add( "built_group", new RegExer().add( /anonymous/ ) )
    .add( "group", /group/ )
    .add( new RegExer().add( /built anonymous/ ) )
    .add( /anonymous/ )
    .build()

console.log( x )

console.log( RegExer.Encoder.encode( "test" ) )
console.log( RegExer.Encoder.decode( RegExer.Encoder.encode( "test" ) ) )