export const sin = Math.sin
export const cos = Math.cos
export const tan = Math.tan
export const asin = Math.asin
export const acos = Math.acos
export const atan = Math.atan
export const arcsin = Math.asin
export const arccos = Math.acos
export const arctan = Math.atan
export function sec( x ) { return 1 / cos( x ) }
export function csc( x ) { return 1 / sin( x ) }
export function cot( x ) { return 1 / tan( x ) }

export const sinh = Math.sinh
export const cosh = Math.cosh
export const tanh = Math.tanh
export const asinh = Math.asinh
export const acosh = Math.acosh
export const atanh = Math.atanh
export const arsinh = Math.asinh
export const arcosh = Math.acosh
export const artanh = Math.atanh
export function sech( x ) { return 1 / cosh( x ) }
export function csch( x ) { return 1 / sinh( x ) }
export function coth( x ) { return 1 / tanh( x ) }

export const sqrt = Math.sqrt
export const cbrt = Math.cbrt
export const exp = Math.exp
export const ln = Math.log
export const log2 = Math.log2
export const log10 = Math.log10

export function logn( base, x ) { return log2( x ) / log2( base ) }

function factorial( x ) {
    const g = 0.30893
    const fract = x % 1
    x = Math.floor( x )

    let start = sqrt( 2 * pi * x ) * ( x + g + 1 / 2 ) ** ( x + 1 / 2 ) * e ** -( x + g + 1 / 2 )
    for ( let i = 1; i <= x; i++ ) {
        start *= i
    }
}