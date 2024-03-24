import { TokenType, lex, Parser } from "./lexer.js"

const LexNumber = `
.
1
2.
.3

0b10
0B10
0x10
0X10
`

const LexSimple = `
1 + 2 - 3 * 4 / 5 mod 6 ** 7!
`

const ParseSimple = `
1 + 2 - 3 * 4 / 5 mod 6 ** 7!
`

const ParseComplex = `
( 1 * 2 ) / ( 3 mod 4 ) ** ( 5 + 6 ) ! - ( 7 + 8 )
`

console.log( lex( LexNumber ) )
console.log( lex( LexSimple ) )

console.log( new Parser( lex( ParseSimple ) ).parse() )

const ast = new Parser( lex( ParseComplex ) ).parse()
const str = ast.toString()

console.log( str )