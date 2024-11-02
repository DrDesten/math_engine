import { Compiler } from "./compiler.js"
import { Lexer } from "./lexer.js"
import { Parser } from "./parser.js"

const lexer = Lexer()

const LexNumber = `
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
1 + 2 - 3 * 4 / 5
`

const ParseComplex = `
sin(1)
1 + 2 - 3 * 4 / 5 mod 6 ** 7!
`

//console.log( lexer.lex( LexNumber ).map( t => t.toPrimitive() ) )
console.log( lexer.lex( LexSimple ).map( t => t.toPrimitive() ) )

const ast = new Parser( lexer.lex( ParseSimple ) ).parse()
const str = ast.toString()
console.log( str )

const compiled = new Compiler( ast ).compile()

console.log( compiled )