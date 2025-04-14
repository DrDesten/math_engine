// Functional Expression Parser

/* const Tree = strings => (
    strings.sort(),
    ( ( tree = {} ) => (
        strings.forEach( s => (
            tree[s[0]] ??= [],
            tree[s[0]].push( s.slice( 1 ) )
        ) ),
        recurse => (
            recurse = arr => (
                arr.length == 1
            )
        )
    ) )()
) */

function Tree( strings ) {
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
] )

console.log( TOKENS )

/** @param {string} expr */
function parse( expr ) {

    let string = expr.split( '' )

    let speculate = ( fn, fallback ) => ( ( state = string.slice() ) =>
        fn() || ( string = state, fallback )
    )()

    let char = () => string.shift()
    let peek = () => string[0]
    let maybe = c => c && ( c[0] === peek() ? char() : maybe( c.slice( 1 ) ) )
    let definitely = ( ...s ) => s.every( Boolean ) ? s.join( '' ) : ''

    let simpleToken = ( t = TOKENS ) => t[peek()] ? simpleToken( t[char()] ) : t()

    let digits = () => /\d/.test( peek() ) ? char() + digits() : ''
    let numberToken = () =>
        digits() + maybe( '.' ) + digits()
        + speculate( () => definitely( maybe( 'eE' ), maybe( '+-' ) + digits() ), '' )

    let next = () => speculate( simpleToken ) || speculate( numberToken )

    let t
    while ( t = next() ) {
        console.log( t )
    }
}

//parse( '(111111+22222)-(3333*444)/(55**6)' )
parse( '(.1+2.2)-(33.3*444.)/(5e1**6E-1)' )