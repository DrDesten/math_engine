import { Lexer as BaseLexer, Token, TokenMatcher } from "./RegLexer.js"


// TokenType definition
export const TokenType = Token.Types( [
    'Whitespace',

    'Comma',
    'Equals',
    'Infer',

    'Number',

    'Plus',
    'Minus',
    'Multiply',
    'Divide',
    'Modulus',
    'Remainder',
    'Power',
    'Factorial',
    'LeftParen',
    'RightParen',

    'Identifier',

    'Eof',
    'Error',
] )

/** @param {string[]} [identifiers] */
export function Lexer( identifiers = [] ) {
    // Match longer identifiers first
    identifiers = [...identifiers].sort( ( a, b ) => b.length - a.length )

    const Tokens = [
        new TokenMatcher( TokenType.Whitespace, /\s+/, { hidden: true } ),

        new TokenMatcher( TokenType.Comma, /,/, ),
        new TokenMatcher( TokenType.Equals, /=/, ),
        new TokenMatcher( TokenType.Infer, /\.\.\./, ),

        new TokenMatcher( TokenType.Number, /0[bB][01]+|0[0-7]+|0[xX][\da-fA-F]+/, t => t.props.value = +t.text ),
        new TokenMatcher( TokenType.Number, /(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?/, t => t.props.value = +t.text ),

        new TokenMatcher( TokenType.LeftParen, /\(/ ),
        new TokenMatcher( TokenType.RightParen, /\)/ ),

        new TokenMatcher( TokenType.Power, /\*\*/ ),
        new TokenMatcher( TokenType.Factorial, /!/ ),

        new TokenMatcher( TokenType.Plus, /\+/ ),
        new TokenMatcher( TokenType.Minus, /-/ ),
        new TokenMatcher( TokenType.Multiply, /\*/ ),
        new TokenMatcher( TokenType.Divide, /\// ),
        new TokenMatcher( TokenType.Remainder, /%/ ),
        new TokenMatcher( TokenType.Modulus, /mod/ ),

        new TokenMatcher( TokenType.Identifier, /log\d+(?=\()/ ),
        new TokenMatcher( TokenType.Identifier, new RegExp( identifiers.join( "|" ) ) ),
        new TokenMatcher( TokenType.Identifier, /[a-zA-Z]\w*/ ),
    ]
    return new BaseLexer( Tokens, TokenType.Error, TokenType.Eof )
}