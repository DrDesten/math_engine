const math = require( "./math" )
const { Ratio, Solution } = require( "./types" )
const processNum = require( "./process_number" )
const consoleMagic = require( "./console_magic" )
const col = require( "./colors" )
function stdwrite( msg = "" ) { process.stdout.write( msg ) }
function print( x, color = "" ) { color == "" ? console.log( x, col.reset ) : console.log( color + x, col.reset ) }

// let subscriptNumbers = ["₀.₁₂₃₄₅₆₇₈₉⁰¹²³⁴⁵⁶⁷⁸⁹⋅."]
// function subscriptNumber( n ) { for ( let i = 0, str = ""; i < n.toString().length; i++ )  }

function roundSig( n, p ) { return parseFloat( n.toPrecision( p ) ) }
function roundFix( n, p ) { return parseFloat( n.toFixed( p ) ) }

/* function precision( n ) { return Math.max( Number.MIN_VALUE, 2 ** Math.floor( Math.log2( Math.abs( n ) ) ) * Number.EPSILON ) } // Since Number.EPSILON is the precision at n=1, we scale according to the exponent */
function precision( n ) { return Math.max( n - n.prev, n.next - n ) }
function derivativeStep( x, y ) { return precision( Math.max( Math.abs( x ), Math.abs( y ) ) ) }

const tableHelp =
    `Arguments: [
    number: Start default: -10 | Table Start
    number: End default: 10 | Table End
    number: Step Size default: 1 | Increment for each row
    number: Significant Digits default: 14
]`
function table( func, min = -10, max = 10, step = 1, digits = 15 ) {
    print( `${col.mathQuery}TBL: ${func.toString()}${col.dim} [${min},${max}] ++${Math.abs( step )} | ${digits <= 16 ? digits + " significant" : "all"} digits` )
    let table = [[], [], []]
    for ( let i = min; i <= max; i = roundSig( i + step, digits ) ) {
        const result =  roundSig( func( i ), digits )
        table[0].push( `f(${i})` )
        table[1].push( result )
        table[2].push( processNum.processNumberMinimal(result) )
    }
    consoleMagic.printTable( table, "", [" = ", " "] )
}


function graph( func, min = -10, max = 10, height = 20, steps = 50 ) {
    let values = new Array( steps ).fill( 0 ).map( ( ele, i ) => {
        let x = ( ( i + 0.5 ) / steps ) * ( max - min ) + min
        return {
            x: x,
            y: func( x ),
            dx: ( func( x + precision( x ) * 5 ) - func( x - precision( x ) * 5 ) ) / ( precision( x ) * 10 ),
            dy: NaN
        }
    } ).map( ( ele, i, arr ) => {
        let lastY = arr[Math.max( 0, i - 1 )].y
        let nextY = arr[Math.min( arr.length - 1, i + 1 )].y
        ele.dy = Math.max( Math.abs( ele.y - lastY ), Math.abs( ele.y - nextY ) )
        return ele
    } )
    print( values )
    let yRange = values.reduce( ( prev, curr ) => { if ( isNaN( curr.y ) ) return prev; return { min: Math.min( prev.min, curr.y ), max: Math.max( prev.max, curr.y ) } }, { min: Infinity, max: -Infinity } )
    print( yRange )


    let str = ""
    const xStep = ( max - min ) / ( steps - 1 )
    const yStep = ( yRange.max - yRange.min ) / ( height - 1 )
    for ( let line = height - 1; line >= 0; line-- ) {
        const referenceHeight = ( line / ( height - 1 ) ) * ( yRange.max - yRange.min ) + yRange.min

        for ( let i = 0; i < values.length; i++ ) {
            const val = values[i]
            const estimatedYStep = Math.max( val.dy * 0.5, yStep * 0.55 )

            let axisMarker
            if ( Math.abs( referenceHeight ) < yStep * 0.5 ) {
                axisMarker = "-"
                if ( Math.abs( val.x ) < xStep * 0.5 ) axisMarker = "+"
            } else if ( Math.abs( val.x ) < xStep * 0.5 ) {
                axisMarker = "|"
            } else {
                axisMarker = "‎"
            }
            str += Math.abs( val.y - referenceHeight ) < estimatedYStep ? `${col.reverse}${axisMarker}${col.reset}` : axisMarker
        }

        str += "\n"
    }
    print( str )
}
function graph( func, min = -10, max = 10, height = 20, steps = 10 ) {
    let values = new Array( steps * 7 ).fill( 0 ).map( ( ele, i ) => {
        let x = ( i / ( ( steps * 7 ) - 1 ) ) * ( max - min ) + min
        return {
            x: x,
            y: func( x ),
            dx: ( func( x + precision( x ) * 5 ) - func( x - precision( x ) * 5 ) ) / ( precision( x ) * 10 ),
            dy: NaN
        }
    } ).map( ( ele, i, arr ) => {
        let lastY = arr[Math.max( 0, i - 1 )].y
        let nextY = arr[Math.min( arr.length - 1, i + 1 )].y
        ele.dy = Math.max( Math.abs( ele.y - lastY ), Math.abs( ele.y - nextY ) )
        return ele
    } )

    let str = ""

    str += "x     |"
    for ( let i = 0; i < steps; i++ ) str += ` ${values[Math.round( ( i + .5 ) * 7 )].x.toLength( 5 )} `
    str += "\n"

    str += "f'(x) |"
    for ( let i = 0; i < steps; i++ ) str += ` ${values[Math.round( ( i + .5 ) * 7 )].dx.toLength( 5 )} `
    str += "\n"

    str += "f(x)  |"
    for ( let i = 0; i < steps; i++ ) str += ` ${values[Math.round( ( i + .5 ) * 7 )].y.toLength( 5 )} `
    str += "\n"

    str = str.replace( /(?:(?<=\.\d*)|\.)0+(?=\D|$)/g, `${col.dim}$&${col.reset}` )
    print( str )
}


function limit( func, lim = 0 ) {
    print( `${col.mathQuery}lim x->${lim}: ${func.toString()}` )

    let valAtLim = func( lim )
    let precisionAtLim = precision( lim )
    let derivativeAtLim = ( func( lim + precisionAtLim * 5 ) - func( lim - precisionAtLim * 5 ) ) / ( precisionAtLim * 10 )

    let valBeforeLim = func( lim - precisionAtLim * 5 )
    let derivativeBeforeLim = ( func( lim - precisionAtLim ) - func( lim - precisionAtLim * 11 ) ) / ( precisionAtLim * 10 )
    let valAfterLim = func( lim + precisionAtLim * 5 )
    let derivativeAfterLim = ( func( lim + precisionAtLim * 11 ) - func( lim + precisionAtLim ) ) / ( precisionAtLim * 10 )

    console.log( valAtLim, precisionAtLim )
    console.log( valBeforeLim, valAtLim, valAfterLim )
    console.log( derivativeBeforeLim, derivativeAtLim, derivativeAfterLim )

    // Check if tangent at points close to limit points towards limit
    // If the derivative before the limit point has the same sign as the height difference, the tangent points towards the value at the limit
    let beforeValidity = derivativeBeforeLim * ( valAtLim - valBeforeLim ) > 0
    let afterValidity = derivativeAfterLim * ( valAtLim - valAfterLim ) < 0

    // if Points before and after the limit are equal to the value at the limit, it must also be valid
    beforeValidity = beforeValidity || ( valAtLim - valBeforeLim ) == 0
    afterValidity = afterValidity || ( valAtLim - valAfterLim ) == 0

    console.log( beforeValidity, afterValidity )

    if ( beforeValidity && afterValidity ) {
        print( "Valid Limit" )
    }

    let solution = func( lim )
    if ( isNaN( solution ) || true ) {
        let before = func( lim.prev )
        let after = func( lim.next )
        print( before + " " + after )
    }

    print( solution )
}
function limit( func, lim = 0 ) {
    print( `${col.mathQuery}lim x->${lim}: ${func.toString()}` )

    let points = [[], []]
    for ( let offset = lim.epsilon, i = 0; i < 1000; i++, offset *= 2 ) {
        let x1 = lim + offset, x2 = lim - offset
        let y1 = func( x1 ), y2 = func( x2 )
        if ( !isNaN( y1 ) ) points[0].push( { x: offset, y: y1, eps: Math.max( x1.epsilon, y1.epsilon ) } )
        if ( !isNaN( y2 ) ) points[1].push( { x: -offset, y: y2, eps: Math.max( x2.epsilon, y2.epsilon ) } )

        if ( points[0].length >= 5 && points[1].length >= 5 ) break
    }

    let delta = [points[0].slice( 0, -1 ), points[1].slice( 0, -1 )]
    for ( let i = 0; i < points[0].length - 1; i++ ) delta[0][i].delta = points[0][i + 1].y - points[0][i].y
    for ( let i = 0; i < points[1].length - 1; i++ ) delta[1][i].delta = points[1][i + 1].y - points[1][i].y

    let midpoints = []
    for ( let i = 0; i < Math.min( points[0].length, points[1].length ); i++ ) {
        const p1 = points[0][i], p2 = points[1][i]
        let distance = p1.x - p2.x
        let average = p1.y * ( p1.x / distance ) + p2.y * ( -p2.x / distance )
        midpoints.push( average )
    }

    console.log( points )
    //console.log( delta )
    console.log( midpoints )
}

function integrateSingleMidpoint( func, min = 0, max = 1, steps = 2 ** 20 ) {
    const multiplier = ( max - min ) / steps
    const addend = min + multiplier * 0.5 // Offset by half a step to get the midpoint
    let integral = 0
    for ( let i = 0; i < steps; i++ ) integral += func( i * multiplier + addend )
    return new Solution( integral * multiplier, 0, false, "=" )
}
function integrateSinglePoly( func, min = 0, max = 1, steps = 2 ** 16 ) {
    const multiplier = ( max - min ) / steps
    const addend = min + multiplier * 0.5
    // Fill up the running array with i-values (-3,-2,-1,0,1) and filter out NaN's and Infinities
    let running = [-3, -2, -1, 0, 1].map( x => func( x * multiplier + addend ) ).map( ( x, i, arr ) => !isFinite( x ) ? arr.filter( isFinite )[0] : x )
    let integral = 0
    for ( let i = 0; i < steps; i++ ) {
        running.shift() // Shift the array back, removes first element
        running.push( func( ( i + 2 ) * multiplier + addend ) ) // next next Y, store value in array

        let y0 = running[0], y1 = running[1], y2 = running[2], y3 = running[3], y4 = running[4] // y2 is the current y-value

        let y0p4 = y0 + y4 // y0 plus y4
        let y1p3 = y1 + y3 // y1 plus y3

        let a = ( y0p4 - 4 * y1p3 + 6 * y2 ) / 24
        let c = ( y0p4 - 16 * y1p3 + 30 * y2 ) / -24
        let e = y2

        // const F = ix => ix * ( ix * ( ix * ( ix * ( a / 5 * ix + b / 4 ) + c / 3 ) + d / 2 ) + e )
        // const F = ix => a * ix**5 + b * ix**4 + c * ix**3 + d * ix**2 + e * ix
        // b and d cancel out in the integration due to symmetry, so we can ignore them:
        const F = ix => ix * ( ix * ix * ( ix * ix * a / 5 + c / 3 ) + e )

        integral += F( 0.5 ) - F( -0.5 ) // -0.5 and 0.5 correspond to values inbetween the current and next/previous points
    }
    return new Solution( integral * multiplier, 0, false, "=" )
}

const integrateHelp =
    `Arguments: [
    number: Integral start default: 0
    number: Integral end default: 1
    number: Amount of steps for integration default: 2²⁴ | Too many steps will reduce accuracy because of floating point errors
    number: Significant Digits default: 15
]`
// Integrator using a degree-4 polynomial approximation, with no extra samples necessary
function integrate( func, min = 0, max = 1, steps = 2 ** 16, digits = 15 ) {
    print( `∫${func.toString()} [${min},${max}] ${col.dim}| ${steps} steps | ${digits <= 16 ? digits + " significant" : "all"} digits`, col.mathQuery )
    if ( steps > Number.MAX_SAFE_INTEGER ) { print( `Error: Too many steps`, col.mathError ); return NaN }
    if ( steps > 2 ** 18 ) print( `Warning: A lot of steps. Accuracy might suffer.`, col.mathWarn )

    const multiplier = ( max - min ) / steps
    const addend = min + multiplier * 0.5

    // Fill up the running array with i-values (-3,-2,-1,0,1) and filter out NaN's and Infinities
    let running = [-3, -2, -1, 0, 1].map( x => x * multiplier + addend ).map( x => func( x ) ).map( ( x, i, arr ) => !isFinite( x ) ? arr.filter( isFinite )[0] : x )
    let integral = 0
    for ( let i = 0; i < steps; i++ ) {

        running.shift() // Shift the array back, removes first element

        let nextx = ( i + 2 ) * multiplier + addend // next next X
        running.push( func( nextx ) ) // next next Y, store value in array

        let y0 = running[0]
        let y1 = running[1] // last y
        let y2 = running[2] // current y
        let y3 = running[3] // next y
        let y4 = running[4]

        // For the function f(x), x₀ = -2, x₁ = -1, x₂ = 0 ...
        // - corresponding to y₀, y₁, y₂ ...
        // That way the integral as to be scaled by the strech factor 'multiplier' in the end, but it saves us some calculations in the loop

        let y0p4 = y0 + y4 // y0 plus y4
        let y1p3 = y1 + y3 // y1 plus y3
        let y4m0 = y4 - y0 // y4 minus y0
        let y3m1 = y3 - y1 // y3 minus y1

        let a = ( y0p4 - 4 * y1p3 + 6 * y2 ) / 24
        let b = ( y4m0 - 2 * y3m1 ) / 12
        let c = ( y0p4 - 16 * y1p3 + 30 * y2 ) / -24
        let d = ( y4m0 - 8 * y3m1 ) / -12
        let e = y2

        //const f = ix => ix * ( ix * ( ix * ( a * ix + b ) + c ) + d ) + e
        const F = ix => ix * ( ix * ( ix * ( ix * ( a / 5 * ix + b / 4 ) + c / 3 ) + d / 2 ) + e )

        //console.log( `f(${i * multiplier + addend}) = ${a.toPrecision( 5 )}x⁴ + ${b.toPrecision( 5 )}x³ + ${c.toPrecision( 5 )}x² + ${d.toPrecision( 5 )}x + ${e.toPrecision( 5 )}` )
        //console.log( `f(${i * multiplier + addend}) = ${a.toPrecision( 4 )}x⁴ + ${b.toPrecision( 4 )}x³ + ${c.toPrecision( 4 )}x² + ${d.toPrecision( 4 )}x + ${e.toPrecision( 4 )}`.replace( /x/g, `((x+${-( i * multiplier + addend )})*${1 / multiplier})` ) )
        //console.log( `${a.toPrecision( 4 )}x⁴ + ${b.toPrecision( 4 )}x³ + ${c.toPrecision( 4 )}x² + ${d.toPrecision( 4 )}x + ${e.toPrecision( 4 )}`.replace( /x/g, `((x+${-( i * multiplier + addend )})*${1 / multiplier})` ) )
        //console.log( running )

        integral += F( 0.5 ) - F( -0.5 ) // -0.5 and 0.5 correspond to values inbetween the current and next/previous points

    }

    integral = roundSig( integral * multiplier, digits )
    print( ` ≈ ${integral}`, col.mathResult )
    processNum.processNumber( integral )
    return integral
}
/*
// Integrator using a degree-6 polynomial approximation, with no extra samples necessary (ended up being worse than the 4th degree version, floating point inaccuracies I guess)
function integrate( func, min = 0, max = 1, steps = 2 ** 16, digits = 15 ) {
    print( `∫${func.toString()} [${min},${max}] ${col.dim}| ${steps} steps | ${digits <= 16 ? digits + " significant" : "all"} digits`, col.mathQuery )
    if ( steps > Number.MAX_SAFE_INTEGER ) { print( `Error: Too many steps`, col.mathError ); return NaN }
    if ( steps > 2 ** 18 ) print( `Warning: A lot of steps. Accuracy might suffer.`, col.mathWarn )

    const multiplier = ( max - min ) / steps
    const addend = min + multiplier * 0.5

    // Fill up the running array with i-values (-4,-3,-2,-1,0,1,2) and filter out NaN's and Infinities
    let running = [-4, -3, -2, -1, 0, 1, 2].map( x => x * multiplier + addend ).map( x => func( x ) ).map( ( x, i, arr ) => !isFinite( x ) ? arr.filter( isFinite )[0] : x )
    let integral = 0
    for ( let i = 0; i < steps; i++ ) {

        running.shift() // Shift the array back, removes first element

        let nextx = ( i + 3 ) * multiplier + addend // next next next X
        running.push( func( nextx ) ) // next next next Y, store value in array

        let y0 = running[0]
        let y1 = running[1]
        let y2 = running[2] // last y
        let y3 = running[3] // current y
        let y4 = running[4] // next y
        let y5 = running[5]
        let y6 = running[6]

        let tmp1 = ( y4 + y2 - 2 * y3 ) / 2
        let tmp2 = ( y5 + y1 - 2 * y3 ) / 8
        let tmp3 = ( y6 + y0 - 2 * y3 ) / 18

        let a = ( tmp3 - tmp1 ) / 40 - ( tmp2 - tmp1 ) / 15
        let c = ( tmp2 - tmp1 ) / 3 - 5 * a
        let e = tmp1 - a - c
        let g = y3

        // Factors b,d,f are irrelevant due to it being a symmetrical integral
        const F = ix => a / 7 * ix ** 7 + c / 5 * ix ** 5 + e / 3 * ix ** 3 + g * ix

        integral += F( 0.5 ) - F( -0.5 ) // -0.5 and 0.5 correspond to values inbetween the current and next/previous points

    }

    integral = roundSig( integral * multiplier, digits )
    print( ` ≈ ${integral}`, col.mathResult )
    processNum.processNumber( integral )
    return integral
}*/
/*
// Integrator using a degree-2 polynomial approximation, with no extra samples necessary, but faster than the other one
function integrate( func, min = 0, max = 1, steps = 2 ** 16, digits = 15 ) {
    print( `∫${func.toString()} [${min},${max}] ${col.dim}| ${steps} steps | ${digits <= 16 ? digits + " significant" : "all"} digits`, col.mathQuery )
    if ( steps > Number.MAX_SAFE_INTEGER ) { print( `Error: Too many steps`, col.mathError ); return NaN }
    if ( steps > 2 ** 20 ) print( `Warning: A lot of steps. Accuracy might suffer.`, col.mathWarn )

    const multiplier = ( max - min ) / steps
    const addend = min + multiplier * 0.5

    // Fill up the running array with i-values (-2,-1,0) and filter out NaN's and Infinities
    let running = [-2 * multiplier + addend, -1 * multiplier + addend, 0 * multiplier + addend].map( x => func( x ) ).map( ( x, i, arr ) => !isFinite( x ) ? arr.filter( isFinite )[0] : x )
    let integral = 0
    for ( let i = 0; i < steps; i++ ) {

        running.shift() // Shift the array back, removes first element

        let nextx = ( i + 1 ) * multiplier + addend // Next X
        running.push( func( nextx ) ) // Next Y, store next value in array

        let y0 = running[0] // last y
        let y1 = running[1] // current y
        let y2 = running[2] // next y

        // For the function f(x), x₀ = -1, x₁ = 0, x₂ = 1
        // - corresponding to y₀, y₁, y₂
        // That way the integral as to be scaled by the strech factor 'multiplier' in the end, but it saves us some calculations in the loop

        let c = y1
        let b = ( y2 - y0 ) * 0.5
        let a = ( y0 + y2 - 2 * y1 ) * 0.5

        // integral of: ax² + bx + c  =  1/3ax³ + 1/2bx² + cx
        //const f = ix => a * ix * ix + b * ix + c
        const F = ix => a * 0.33333333333333333 * ix * ix * ix + b * 0.5 * ix * ix + c * ix

        integral += F( 0.5 ) - F( -0.5 ) // -0.5 and 0.5 correspond to -multiplier/2 and multiplier/2

    }

    integral = roundSig( integral * multiplier, digits )
    print( ` ≈ ${integral}`, col.mathResult )
    processNum.processNumber( integral )
    return integral
} */
/*
// Integrator using a degree-2 polynomial approximation, with no extra samples necessary
function integrate( func, min = 0, max = 1, steps = 2 ** 16, digits = 15 ) {
    print( `∫${func.toString()} [${min},${max}] ${col.dim}| ${steps} steps | ${digits <= 16 ? digits + " significant" : "all"} digits`, col.mathQuery )
    if ( steps > Number.MAX_SAFE_INTEGER ) { print( `Error: Too many steps`, col.mathError ); return NaN }

    const multiplier = ( max - min ) / steps
    const invmultiplier = 1 / multiplier
    const addend = min + multiplier * 0.5

    // Fill up the running array with i-values (-2,-1,0) and filter out NaN's and Infinities
    let running = [-2 * multiplier + addend, -1 * multiplier + addend, 0 * multiplier + addend].map( x => func( x ) ).map( ( x, i, arr ) => !isFinite( x ) ? arr.filter( isFinite )[0] : x )
    let integral = 0
    for ( let i = 0; i < steps; i++ ) {

        running.shift() // Shift the array back, removes first element

        let nextx = ( i + 1 ) * multiplier + addend // Next X
        running.push( func( nextx ) ) // Next Y, store next value in array

        let y = running[1] // Current y is in the middle of the array
        let dy1 = ( running[0] - running[1] ) * invmultiplier
        let dy2 = ( running[1] - running[2] ) * invmultiplier
        let ddy = ( dy1 - dy2 ) * invmultiplier

        let a = ddy * 0.5
        let b = ( dy1 + dy2 ) * 0.5 // Average the derivatives
        let c = y

        // integral of: ax² + bx + c  =  1/3ax³ + 1/2bx² + cx
        const f = ix => a * ix * ix + b * ix + c
        const F = ix => a * 0.33333333333333333 * ix * ix * ix + b * 0.5 * ix * ix + c * ix

        integral += F( 0.5 * multiplier ) - F( -0.5 * multiplier )

    }

    integral = roundSig( integral, digits )
    print( ` ≈ ${integral}`, col.mathResult )
    processNum.processNumber( integral )
    return integral
}*/
/*
// Midpoint Rule Integrator
function integrate( func, min = 0, max = 1, steps = 2 ** 24 ) {
    print( `∫${func.toString()} [${min},${max}] ${col.dim}| ${steps} steps`, col.mathQuery )
    if ( steps > Number.MAX_SAFE_INTEGER ) { print( `Error: Too many steps`, col.mathError ); return NaN }

    const multiplier = ( max - min ) / steps
    const addend = min + multiplier * 0.5
    let integral = 0
    for ( let i = 0; i < steps; i++ ) {
        let x = i * multiplier + addend
        integral += func( x )
    }

    integral = roundSig( integral * ( max - min ) / steps, 15 )
    print( ` ≈ ${integral}`, col.mathResult )
    processNum.processNumber( integral )
    return integral
} */
/*
// Integrator with attempted error correction
function integrate( func, min = 0, max = 1, steps = 2 ** 24 ) {
    steps = Math.round( steps )
    print( `∫${func.toString()} [${min},${max}] ${col.dim}| ${steps} steps`, col.mathQuery )
    if ( steps > Number.MAX_SAFE_INTEGER ) { print( `Error: Too many steps`, col.mathError ); return NaN }

    const x1 = Math.round( steps * 0.5 )
    const x2 = steps
    const y1 = integrateSingle( func, min, max, x1 ).value
    const y2 = integrateSingle( func, min, max, x2 ).value

    //const errorFunc = x => 1 / Math.sqrt( x )
    //const errorFunc = x => 1 / x
    //const errorFunc = x => 1 / ( x * Math.sqrt( x ) )
    const errorFunc = x => 1 / ( x * x )

    //console.log( x1, y1, "|", x2, y2 )

    // Attempt at Error Correction
    let a = ( y2 - y1 ) / ( errorFunc( x2 ) - errorFunc( x1 ) )
    let c = y1 - a * errorFunc( x1 )

    let integral = c

    print( ` ≈ ${integral}`, col.mathResult )
    processNum.processNumber( integral )
    return integral
} */

function newtonSolveSingle( func, start = 0, steps = 1e5 ) {
    let x = start
    let lx = start // last x
    let y = 0
    let derivativeStepMult = 1
    let stepMult = 1
    for ( let i = 0; i < steps; i++ ) {

        y = func( x )

        if ( y == 0 ) break // Break early if solution has been found

        if ( !isFinite( y ) ) {
            x = lx
            y = func( x )
            stepMult *= 0.5
        } else {
            stepMult = Math.min( stepMult * 1.25, 1 )
        }

        let fpPrecision = precision( x )
        let increment = Math.max( fpPrecision, derivativeStep( x, y ) * derivativeStepMult ) // Increment should never be smaller than the precision at x
        let dFdx = ( func( x + increment ) - y ) / increment

        if ( dFdx == 0 ) {
            derivativeStepMult *= 2
            continue
        } else if ( dFdx == Infinity || dFdx == -Infinity ) {
            derivativeStepMult *= 0.25
            continue
        } else {
            if ( increment > fpPrecision ) derivativeStepMult *= 0.99 // Slowly decrease the derivative step. Should it reach zero, it will multiply by 2 automatically (can't be smaller than precision at x)
        }

        lx = x
        x -= ( y / dFdx ) * stepMult

    }

    if ( Math.abs( x ) == Infinity ) {
        return Math.sign( x ) > 0 ? new Solution( Number.MAX_VALUE, 0, false, ">" ) : new Solution( -Number.MAX_VALUE, 0, false, "<" )
    }
    if ( !isFinite( y ) || !isFinite( x ) ) {
        print( `No Solution Found. Try specifying a different start position.\nFor x = ${x} the function is ${func( x )}\nLast x = ${lx}, Last y = ${func( lx )}`, col.mathError )
        return Solution.invalidSolution
    }

    // Smart Rounding: Round until the error starts increasing (gives best results)
    let error = Math.abs( y )
    for ( let decimals = Math.min( -parseInt( /(?<=\de)(?:-\d+|\+\d+)/.exec( x.toExponential( 0 ) )[0] ) * 0.5, 100 ); decimals > 1; decimals *= 0.5 ) {
        let newX = roundFix( x, decimals )
        let newY = func( newX )
        let newErr = Math.abs( newY )
        if ( newErr <= error ) {
            error = newErr
            x = newX
            y = newY
        } else break
    }

    return new Solution( x, error, error == 0, "=" )
}

function bisectSolveSingle( func, x1 = 0, x2 = 1, steps = 100 ) {
    let solution = NaN
    let error = 0
    if ( func( x1 ) == 0 ) solution = x1
    if ( func( x2 ) == 0 ) solution = x2

    // Start Solving
    if ( isNaN( solution ) ) {

        // Sort x1 and x2 by there y-values, so that y1 < y2
        let y1 = func( x1 ), y2 = func( x2 )
        if ( y1 > y2 ) { let tmp = x1; x1 = x2; x2 = tmp } // Set x1 to x2 and x2 to x2, so that the condition y1 < y2 is satisfied

        for ( let i = 0; i < steps; i++ ) {

            let xm = ( x1 + x2 ) * .5
            let ym = func( xm ) // ym is the y-Value inbetween x1 and x2

            if ( ym < 0 ) { // if ym < 0 zero must lie between ym and y2 (because ym < 0 and y2 > 0)
                x1 = xm
            } else if ( ym > 0 ) { // if ym > 0, zero must lie between y1 and ym (because y1 < 0 and ym > 0)
                x2 = xm
            } else if ( ym == 0 ) { // ym == 0
                solution = xm
                break
            } else { // ym is NaN
                print( `No Solution Found. Function is not continous inbetween bisection points.\nx1 = ${x1}, x2 = ${x2}, xm = ${xm}, f(xm) = ${ym}`, col.mathError )
                return new Solution( NaN, Math.abs( x1 - x2 ), false )
            }

        }

        if ( isNaN( solution ) ) { // If the solution did not converge, give xm as solution and calculate error
            solution = ( x1 + x2 ) * .5
            error = Math.abs( x1 - x2 )
        }

    }

    // Smart Rounding: Round until the error starts increasing (improves results if they converge to a integer number)
    let yErr = Math.abs( func( solution ) )
    for ( let decimals = Math.min( -parseInt( /(?<=\de)(?:-\d+|\+\d+)/.exec( solution.toExponential( 0 ) )[0] ) * 0.5, 100 ); decimals > 1; decimals *= 0.5 ) {
        let newX = roundFix( solution, decimals )
        let newYErr = Math.abs( func( newX ) )
        if ( newYErr <= yErr ) {
            yErr = newYErr
            solution = newX
        } else break
    }

    // Derivative Check to see if solution is valid ////////////////////
    let dx = precision( solution )
    let xbefore = solution - dx
    let ybefore = func( xbefore )
    let xafter = solution + dx
    let yafter = func( xafter )
    let dbefore = ( func( solution ) - ybefore ) / dx // Derivative from point before the solution to the point after to the solution
    let dafter = ( yafter - func( solution ) ) / dx   // Derivative from point after the solution to the point before to the solution
    // If the solution is valid, dbefore has to be negative if ybefore is positive and positive if ybefore is negative (pointing to zero) (different signs, mult. negative)
    let isdbeforeValid = Math.sign( dbefore ) * Math.sign( ybefore ) <= 0
    // If the solution is valid, dafter has to be positive if yafter is positive and negative if yafter is negative (pointing to zero) (equal signs, mult. positive)
    let isdafterValid = Math.sign( dafter ) * Math.sign( yafter ) >= 0

    //console.log( isdbeforeValid, dbefore, isdafterValid, dafter, solution, func( solution ), dx )
    if ( !( isdbeforeValid && isdafterValid ) ) solution = NaN
    return new Solution( solution, error, ( solution == x1 || solution == x2 || error == 0 ) )
}

const multiSolveHelp =
    `Arguments: [
    number: Start Position default: 0 | Where to start looking for solutions. Solutions will be sorted by distance to the start position
    number: Maximum Solutions default: 10 | How many solutions should be displayed
    number: Search Step Size default: 2 | MultiSolve steps through the entire floating point range in an exponential fashion,
                                        | Search Step Size is the increment multiplier after each step.
                                        | Closer to 1 = More Steps
    number: Solve Steps default: 100 | Amount of steps for the bisect solve algorithm
]`
function multiSolve( func, start = 0, maxSolutions = 10, searchStepSize = 2, solveSteps = 100 ) {
    if ( searchStepSize <= 1 ) {
        print( "Precision too high. Use a step value greater than 1", col.mathError )
        return
    }

    print( `${func.toString()} = 0 | solve for multiple x | x₀ = ${roundSig( start, 3 )} | maxSolutions: ${maxSolutions} | max. ${( Math.ceil( math.logn( searchStepSize, Number.MAX_VALUE ) ) - Math.ceil( math.logn( searchStepSize, Math.max( 2 ** -1024, precision( start ) ) ) ) ) * 2} search steps`, col.mathQuery )

    // Find Bisection Bounds Values
    let validX = NaN, validY = Infinity
    let bounds = []
    let solutions = []
    let aborted = false

    const startStep = Math.max( 2 ** -1024, precision( start ) )

    {
        let lastX = start.prev
        let lastY = func( lastX )
        for ( let i = startStep, x = start; x <= Number.MAX_VALUE * 0.5; x += ( i *= searchStepSize ) ) {

            let y = func( x )

            if ( Math.sign( lastY ) * Math.sign( y ) <= 0 && isFinite( lastY ) && isFinite( y ) ) { // If the signs are different, multiplication will result in a negative number
                let sol = bisectSolveSingle( func, lastX, x, solveSteps )
                if ( solutions.length == 0 ) {
                    if ( sol.valid ) {
                        solutions.push( sol )
                        bounds.push( [lastX, x] )
                    }
                } else if ( solutions[solutions.length - 1].value != sol.value && sol.valid ) {
                    solutions.push( sol )
                    bounds.push( [lastX, x] )
                }
                if ( solutions.length > maxSolutions ) { aborted = true; break }
            }

            lastY = y
            lastX = x
            if ( Math.abs( y ) * ( 2 ** Math.abs( x ) ) < validY ) { validY = Math.abs( y ) * ( 2 ** Math.abs( x ) ); validX = x }

        }
    }

    {

        let lastX = start.next
        let lastY = func( lastX )
        for ( let i = startStep, x = start; x >= -Number.MAX_VALUE * 0.5; x -= ( i *= searchStepSize ) ) {

            let y = func( x )

            if ( Math.sign( lastY ) * Math.sign( y ) <= 0 && isFinite( lastY ) && isFinite( y ) ) { // If the signs are different, multiplication will result in a negative number
                let sol = bisectSolveSingle( func, x, lastX, solveSteps )
                if ( solutions.length == 0 ) {
                    if ( sol.valid ) {
                        solutions.push( sol )
                        bounds.push( [x, lastX] )
                    }
                } else if ( solutions[solutions.length - 1].value != sol.value && sol.valid ) {
                    solutions.push( sol )
                    bounds.push( [x, lastX] )
                }
                if ( solutions.length > maxSolutions * 2 ) { aborted = true; break }
            }

            lastY = y
            lastX = x
            if ( Math.abs( y ) * ( 2 ** Math.abs( x ) ) <= validY && isFinite( x ) ) { validY = Math.abs( y ) * ( 2 ** Math.abs( x ) ); validX = x }

        }

    }

    if ( bounds.length == 0 ) {

        print( "No Bisection points Found. Trying Newtons Method...", col.mathWarn )

        if ( !isFinite( validX ) ) {
            print( "No Valid Function Points found. Try with another start position.", col.mathError )
            return
        } else {
            const newtonSol = newtonSolveSingle( func, validX )
            if ( newtonSol.valid ) solutions.push( newtonSol )
            else return
        }

    }

    solutions.sort( ( a, b ) => Math.abs( a.value - start ) - Math.abs( b.value - start ) ) // Sort by distance to start
    if ( solutions.length > 1 ) solutions = solutions.filter( ( sol, i, arr ) => arr[i].value != arr[( i + 1 ) % arr.length].value ) // Remove duplicates

    if ( solutions.length > 1 ) {
        print( `Found ${aborted ? "more than " : ""}${solutions.length} solutions, ${solutions.filter( s => s.accurate ).length} of which to maximum floating point accuracy` )
        print( `Displaying the ${maxSolutions} solutions closest to the start position x₀` )
    }

    //print( solutions )

    solutions = solutions.filter( ( x, i ) => i < maxSolutions ) // Only keep the amount of results specified

    if ( solutions.length > 1 ) {
        processNum.printNumbers( solutions )
    } else {
        solutions[0].print()
        processNum.processNumber( solutions[0].value )
    }

    return solutions[0].value
}

module.exports = {
    tableHelp,
    table,
    graph,
    limit,
    integrateHelp,
    integrate,
    multiSolveHelp,
    multiSolve,
    precision
}