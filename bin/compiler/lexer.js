import { Lexer, Token, TokenMatcher } from "./RegLexer.js"

let test = Token.Types( ["Type", "Other Type"] )

// TokenType definition
export const TokenType = Object.freeze( {
    Whitespace: 'Whitespace',
    Number: 'Number',
    Plus: 'Plus',
    Minus: 'Minus',
    Multiply: 'Multiply',
    Divide: 'Divide',
    Modulus: 'Modulus',
    Remainder: 'Remainder',
    Power: 'Power',
    Factorial: 'Factorial',
    ImplicitFunction: 'ImplicitFunction',
    LeftParen: 'LeftParen',
    RightParen: 'RightParen',
    Identifier: 'Identifier',
    Eof: 'Eof',
    Error: 'Error',
} )

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
    new TokenMatcher( TokenType.ImplicitFunction, /(?<func>(?:sin|cos|tan)h?|ln)(?<ident>[a-zA-Z_][a-zA-Z_0-9]*)/, ( token, match ) => {
        token.props.func = match.groups.func
        token.props.ident = match.groups.ident
    } ),
    new TokenMatcher( TokenType.LeftParen, /\(/ ),
    new TokenMatcher( TokenType.RightParen, /\)/ ),
    new TokenMatcher( TokenType.Identifier, /[a-zA-Z_][a-zA-Z_0-9]*/ ),
    // Error doesn't match
]

const lexer = new Lexer( Tokens, TokenType.Error, TokenType.Eof )

/**
 * Tokenizes the input text based on the defined TokenMatchers.
 * Matches all tokens in the input text.
 * @param {string} text The input text to be tokenized.
 */
export function lex( text ) {
    return lexer.lex( text )
}