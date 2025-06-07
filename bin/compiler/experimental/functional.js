import { Lexer, TokenType } from "../lexer.js"

// Functional Expression Parser

/* function Tree( strings ) {
    strings.sort()
    function inner( prefix, strings ) {
        let tree = {}
        for ( let s of strings ) {
            tree[s[0]] ??= []
            tree[s[0]].push( s.slice( 1 ) )
        }
        for ( let k in tree ) {
            tree[k] = tree[k][0] === ''
                ? Object.assign(
                    () => prefix + k,
                    tree[k].length === 1 ? {} : inner( prefix + k, tree[k].slice( 1 ) ) )
                : Object.assign(
                    () => undefined,
                    inner( prefix + k, tree[k] ) )
        }
        return tree
    }
    return Object.assign( () => undefined, inner( '', strings ) )
}

const TOKENS = Tree( [
    '(', ')',
    '+', '-', '*', '/', '**',
] ) */

console.log( TOKENS )

/** @param {string} expr */
function parse( expr ) {
    let tokens = Lexer().lex( expr )

    function speculate( fn ) {
        let backup = tokens.slice()
        return fn() || ( tokens = backup, undefined )
    }

    let advance = () => tokens.shift()
    let peek = () => tokens[0]

    let parse = () => parseAdditive()
}

//parse( '(111111+22222)-(3333*444)/(55**6)' )
parse( '(.1+2.2)-(33.3*444.)/(5e1**6E-1)' )