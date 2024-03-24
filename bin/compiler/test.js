import { Compiler } from "./compiler.js"
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
2 x y
`

const ParseSimple = `
1 + 2 - 3 * 4 / 5 mod 6 ** 7!
`

const ParseComplex = `
sin(1)
1 + 2 - 3 * 4 / 5 mod 6 ** 7!
`

console.log( lex( LexNumber ) )
console.log( lex( LexSimple ) )

const ast = new Parser( lex( ParseComplex ) ).parse()
const str = ast.toString()

console.log( str )

const compiled = new Compiler( ast ).compile()

console.log( compiled )