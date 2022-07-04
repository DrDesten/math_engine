const math = require( "./math" )
const { Ratio, Solution, invalidSolution } = require( "./types" )
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
    `${col.bright}Table${col.reset}
Creates a function table
Arguments: [Start = -10, End = 10, Step Size = 1, Significant Digits = 14]
Start:              Table Start
End:                Table End
Steps:              Increment for each row
Significant Digits: Rounding
`
function table( func, min = -10, max = 10, step = 1, digits = 14 ) {
    print( `${col.mathQuery}\nTBL: ${func.toString()}${col.dim} [${min},${max}] ++${Math.abs( step )} | ${digits <= 16 ? digits + " significant" : "all"} digits` )
    let maxlength = 0
    for ( let i = min; i <= max; i = roundSig( i + step, digits ) ) maxlength = Math.max( maxlength, i.toString().length )
    for ( let i = min; i <= max; i = roundSig( i + step, digits ) ) print( `f(${i})${" ".repeat( maxlength - i.toString().length )} = ${roundSig( func( i ), digits )}` )
    consoleMagic.printTable( [new Array( 10 ).fill().map( ( x, i ) => i ), new Array( 10 ).fill().map( ( x, i ) => func( i ) ), [1, "x", 1, 1]] )
}


function integrateSingle( func, min = 0, max = 1, steps = 2 ** 20 ) {
    const multiplier = ( max - min ) / steps
    const addend = min + multiplier * 0.5
    let integral = 0
    for ( let i = 0; i < steps; i++ ) {
        let x = i * multiplier + addend
        integral += func( x )
    }
    integral *= multiplier
    return new Solution( integral, 0, false, "=" )
}
const integrateHelp =
    `${col.bright}Integrate${col.reset}
Integrates equasions with respect to x, using the midpoint rule.
Arguments: [Start = 0, End = 1, Steps = 2²⁴]
Start: Integral Start
End:   Integral End
Steps: Amount of steps for integration. Too many steps will reduce accuracy because of floating point errors
`
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
}
/* function integrate( func, min = 0, max = 1, steps = 2 ** 24 ) {
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
        return invalidSolution
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
    `${col.bright}MultiSolve${col.reset}
Solves equasions for multiple x using bisection solve. Does not always return all solutions.
Arguments: [Start Position = 0, Maximum Solutions = 10, Search Step Size = 2, Solve Steps = 100]
Start Position:    Where to start looking for solutions
Maximum Solutions: How many solutions should be displayed
Search Step Size:  MultiSolve steps through the entire floating point range in an exponential fashion,
                   Search Step Size is the increment multiplier after each step.
                   Closer to 1 = More Steps
Solve Steps:       Amount of steps for the bisect solve algorithm
`
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
            if ( Math.abs( y ) * ( 2 ** Math.abs( x ) ) < validY ) { validY = Math.abs( y ) * ( 2 ** Math.abs( x ) ); validX = x }

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

    solutions = solutions.filter( ( x, i ) => i < maxSolutions ) // Only keep the amount of results specified


    if ( solutions.length > 1 ) {
        processNum.printNumbers( solutions )
    } else {
        solutions[0].print()
        processNum.processNumber( solutions[0].value )
    }

}

module.exports = {
    tableHelp,
    table,
    integrateHelp,
    integrate,
    multiSolveHelp,
    multiSolve,
    precision
}