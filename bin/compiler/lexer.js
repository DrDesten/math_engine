// TokenType definition
export const TokenType = Object.freeze( {
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
        /** @type {{[property: string]: any, ignore: boolean}} */
        this.props = {
            ignore: false,
        }
    }

    toString() {
        return this.text
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
    new TokenMatcher( TokenType.Whitespace, /\s+/, token => {
        token.props.ignore = true
    } ),
    new TokenMatcher( TokenType.Number, /0[bB][01]+|0[xX][0-9a-fA-F]+|(?:\d*\.\d*|\d+)(?:[eE][+-]?\d+)?/, token => {
        token.props.value = token.text === "." ? 0 : Number( token.text )
    } ),
    new TokenMatcher( TokenType.Plus, /\+/ ),
    new TokenMatcher( TokenType.Minus, /-/ ),
    new TokenMatcher( TokenType.Multiply, /\*/ ),
    new TokenMatcher( TokenType.Divide, /\// ),
    new TokenMatcher( TokenType.Modulus, /mod/ ),
    new TokenMatcher( TokenType.Remainder, /%/ ),
    new TokenMatcher( TokenType.Power, /\*\*|\^/ ),
    new TokenMatcher( TokenType.Factorial, /!+/ ),
    new TokenMatcher( TokenType.LeftParen, /\(/ ),
    new TokenMatcher( TokenType.RightParen, /\)/ ),
    new TokenMatcher( TokenType.Identifier, /[a-zA-Z_][a-zA-Z_0-9]*/ ),
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
export function lex( text ) {
    const tokens = []
    let remainingText = text

    while ( remainingText.length > 0 ) {
        const token = lexSingle( remainingText )
        if ( !token ) {
            // If no token found, add an error token and advance text by one character
            tokens.push( new Token( TokenType.Error, remainingText[0] ) )
            remainingText = remainingText.slice( 1 )
        } else {
            if ( !token.props.ignore ) tokens.push( token )
            remainingText = remainingText.slice( token.text.length ) // Remove matched token from remaining text
        }
    }

    return tokens
}


export class Expression {}
export class BinaryExpression extends Expression {
    constructor( operator, left, right ) {
        super()
        this.operator = operator
        this.left = left
        this.right = right
    }

    toString() {
        const left = `${this.left}`.replace( /(?<=\n)./g, "│ $&" )
        const right = `${this.right}`.replace( /(?<=\n)./g, "  $&" )
        const tis = this.constructor.name + ` { ${this.operator} }`
        return `${tis}\n├╴${left}\n╰╴${right}`
    }
}
export class UnaryExpression extends Expression {
    constructor( operator, operand ) {
        super()
        this.operator = operator
        this.operand = operand
    }

    toString() {
        const operand = `${this.operand}`.replace( /(?<=\n)./g, "  $&" )
        const tis = this.constructor.name + ` { ${this.operator} }`
        return `${tis}\n╰╴${operand}`
    }
}
export class CallExpression extends Expression {
    constructor( callee, args ) {
        super()
        this.callee = callee
        this.args = args
    }

    toString() {
        return `${this.callee}(${this.args.join( ', ' )})`
    }
}
export class IdentifierExpression extends Expression {
    constructor( name ) {
        super()
        this.name = name
    }

    toString() {
        return this.name
    }
}
export class LiteralExpression extends Expression {
    constructor( value ) {
        super()
        this.value = value
    }

    toString() {
        return this.value
    }
}

export class Parser {
    constructor( tokens ) {
        this.index = 0
        this.tokens = tokens
    }

    peek( offset = 0 ) {
        return this.tokens[this.index + offset]
    }
    next() {
        return this.tokens[this.index++]
    }

    parse() {
        return this.parseExpression()
    }

    parseExpression() {
        return this.parseTerm()
    }

    parseTerm() {
        let expr = this.parseFactor()
        let token

        while ( token = this.peek() ) {
            if ( token.type === TokenType.Plus || token.type === TokenType.Minus ) {
                expr = new BinaryExpression( this.next(), expr, this.parseFactor() )
            } else {
                break
            }
        }

        return expr
    }

    parseFactor() {
        let expr = this.parsePower()
        let token

        while ( token = this.peek() ) {
            if ( token.type === TokenType.Multiply || token.type === TokenType.Divide || token.type === TokenType.Modulus || token.type === TokenType.Remainder ) {
                expr = new BinaryExpression( this.next(), expr, this.parsePower() )
            } else {
                break
            }
        }

        return expr
    }


    parsePower() {
        const left = this.parsePrefix()
        const token = this.peek()

        if ( token && token.type === TokenType.Power ) {
            this.next()
            return new BinaryExpression( token, left, this.parsePower() )
        }

        return left
    }

    parsePrefix() {
        const token = this.peek()

        if ( token && ( token.type === TokenType.Plus || token.type === TokenType.Minus ) ) {
            this.next()
            return new UnaryExpression( token, this.parsePrefix() )
        }

        return this.parsePostfix()
    }

    parsePostfix() {
        let expr = this.parsePrimary()
        let token

        while ( token = this.peek() ) {
            if ( token.type === TokenType.Factorial ) {
                this.next()
                expr = new UnaryExpression( token, expr )
            } else {
                break
            }
        }

        return expr
    }

    parsePrimary() {
        const token = this.peek()

        if ( token && token.type === TokenType.Number ) {
            this.next()
            return new LiteralExpression( token.props.value )
        }

        if ( token && token.type === TokenType.LeftParen ) {
            this.next()
            const expr = this.parseExpression()
            const rightParen = this.next()
            if ( rightParen.type !== TokenType.RightParen ) throw new Error( "Expected ')'" )
            return expr
        }

        if ( token && token.type === TokenType.Identifier ) {
            this.next()
            return new IdentifierExpression( token.text )
        }

        throw new Error( "Expected expression" )
    }
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

/* const x = new RegExer( {} )
    .add( "built_group", new RegExer().add( /anonymous/ ) )
    .add( "group", /group/ )
    .add( new RegExer().add( /built anonymous/ ) )
    .add( /anonymous/ )
    .build()

console.log( x )

console.log( RegExer.Encoder.encode( "test" ) )
console.log( RegExer.Encoder.decode( RegExer.Encoder.encode( "test" ) ) ) */