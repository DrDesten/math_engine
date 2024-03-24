// TokenType definition
const TokenType = Object.freeze( {
    Whitespace: Symbol( 'Whitespace' ),
    Number: Symbol( 'Number' ),
    Plus: Symbol( 'Plus' ),
    Minus: Symbol( 'Minus' ),
    Multiply: Symbol( 'Multiply' ),
    Divide: Symbol( 'Divide' ),
    Modulus: Symbol( 'Modulus' ),
    Remainder: Symbol( 'Remainder' ),
    Power: Symbol( 'Power' ),
    Factorial: Symbol( 'Factorial' ),
    Identifier: Symbol( 'Identifier' ),
    LeftParen: Symbol( 'LeftParen' ),
    RightParen: Symbol( 'RightParen' ),
    Error: Symbol( 'Error' ),
} )


// Token class
class Token {
    /** @param {Symbol} type @param {string} text */
    constructor( type, text ) {
        this.type = type
        this.text = text
        /** @type {{[property: string]: any}} */
        this.props = {}
    }
}

// TokenMatcher class
class TokenMatcher {
    /** @param {Symbol} type @param {RegExp} regex @param {(token: Token) => void} parser */
    constructor( type, regex, parser ) {
        this.type = type
        this.regex = regex
        this.parser = parser
    }
}

/** @type {TokenMatcher[]} */
const Tokens = [
    new TokenMatcher( TokenType.Whitespace, /\s+/ ),
    new TokenMatcher( TokenType.Number, /\b(?:0[bB][01]+|0[xX][0-9a-fA-F]+|(?:\d+|\d*\.\d*)(?:[eE][+-]?\d+)?)\b/, token => {
        token.props.value = parseFloat( token.text )
    } ),
    new TokenMatcher( TokenType.Plus, /\+/ ),
    new TokenMatcher( TokenType.Minus, /-/ ),
    new TokenMatcher( TokenType.Multiply, /\*/ ),
    new TokenMatcher( TokenType.Divide, /\// ),
    new TokenMatcher( TokenType.Modulus, /mod/ ),
    new TokenMatcher( TokenType.Remainder, /%\b/ ),
    new TokenMatcher( TokenType.Power, /\^/ ),
    new TokenMatcher( TokenType.Factorial, /!/ ),
    new TokenMatcher( TokenType.Identifier, /[a-zA-Z_][a-zA-Z_0-9]*/ ),
    new TokenMatcher( TokenType.LeftParen, /\(/ ),
    new TokenMatcher( TokenType.RightParen, /\)/ ),
    // Error doesn't match
]

/**
 * Tokenizes the input text based on the defined TokenMatchers.
 * If multiple matches exist, chooses the longest match.
 * Matches each token only once.
 * @param {string} text - The input text to be tokenized.
 * @returns {Token|null} The tokenized result, or null if no match is found.
 */
function lexSingle( text ) {
    const matches = []

    for ( const tokenMatcher of Tokens ) {
        const regex = tokenMatcher.regex
        const match = regex.exec( text )
        if ( match && match.index === 0 ) {
            matches.push( { match, tokenMatcher } )
        }
    }

    matches.sort( ( a, b ) => b.match[0].length - a.match[0].length )

    const longestMatch = matches[0]
    if ( !longestMatch ) return null

    const { match, tokenMatcher } = longestMatch
    const token = new Token( tokenMatcher.type, match[0] )
    if ( tokenMatcher.parser ) tokenMatcher.parser( token )
    return token
}

/**
 * Tokenizes the input text based on the defined TokenMatchers.
 * Matches all tokens in the input text.
 * @param {string} text - The input text to be tokenized.
 * @returns {Token[]} An array of tokenized results.
 */
function lex( text ) {
    const tokens = []
    let remainingText = text

    while ( remainingText.length > 0 ) {
        const token = lexSingle( remainingText )
        if ( !token ) {
            // If no token found, add an error token and advance text by one character
            tokens.push( new Token( TokenType.Error, remainingText[0] ) )
            remainingText = remainingText.slice( 1 )
        } else {
            tokens.push( token )
            remainingText = remainingText.slice( token.text.length ) // Remove matched token from remaining text
        }
    }

    return tokens
}



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