export function logn( base, x ) { return Math.log( x ) / Math.log( base ) }

function factorial( x ) {
    const g = 0.30893
    const fract = x % 1
    x = Math.floor( x )

    let start = sqrt( 2 * pi * x ) * ( x + g + 1 / 2 ) ** ( x + 1 / 2 ) * e ** -( x + g + 1 / 2 )
    for ( let i = 1; i <= x; i++ ) {
        start *= i
    }
}

export default {
    logn,
}