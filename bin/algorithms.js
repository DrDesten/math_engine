const processNum = require( "./process_number" )
const col = require( "./colors" )
function print( x, color = "" ) { console.log( `${color}${x}${col.reset}` ) }

//let subscriptNumbers = {};["₀.₁₂₃₄₅₆₇₈₉⁰¹²³⁴⁵⁶⁷⁸⁹⋅."]
//function subscriptNumber( n ) { for ( let i = 0, str = ""; i < n.toString().length; i++ )  }

function roundSig( n, p ) { return parseFloat( n.toPrecision( p ) ) }
function roundFix( n, p ) { return parseFloat( n.toFixed( p ) ) }

function precision( n ) { return Math.max( Number.MIN_VALUE, 2 ** Math.floor( Math.log2( Math.abs( n ) ) ) * Number.EPSILON ) } // Since Number.EPSILON is the precision at n=1, we scale according to the exponent
function derivativeStep( x, y ) { return 2 ** ( Math.ceil( Math.log2( Math.max( Math.abs( x ), Math.abs( y ), 1e-160 ) ) ) ) * 2 ** -32 }

function logn( base, x ) { return Math.log( x ) / Math.log( base ) }

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
    print( `${col.mathQuery}\nTBL: ${func.toString()}${col.dim} [${min},${max}] ++${Math.abs( step )}` )
    let maxlength = 0
    for ( let i = min; i <= max; i = roundSig( i + step, digits ) ) maxlength = Math.max( maxlength, i.toString().length )
    for ( let i = min; i <= max; i = roundSig( i + step, digits ) ) print( `(${i})${" ".repeat( maxlength - i.toString().length )} => ${roundSig( func( i ), digits )}` )
}

/* function integrate(func, min = 0, max = 1) { // Sucks cause Monte-Carlo
    console.log(`\n∫${func.toString()} [${min},${max}]`)

    const phi_inv   = 0.6180339887498948482
    const steps     = 1e8
    let   integral  = 0
    for (let i = 0; i < steps; i++) {
        let x = ((phi_inv * i + 0.5) % 1) * (max - min) + min  // Quasirandom Seqence
        integral += func(x)
    }

    let integrationPrecision = Math.max(Math.round(Math.log10(steps)) - 1,1)
    integral = roundSig(integral * (max - min) / steps, integrationPrecision)
    console.log(` ≈ ${integral}\n`)
    processNum.processNumber(integral)
} */
/* function integrate( func, min = 0, max = 1 ) {
    print( `\n∫${func.toString()} [${min},${max}]`, col.mathQuery )

    const steps = 2 ** 20
    const stepSize = ( max - min ) / steps
    let integral = 0
    for ( let x = min; x <= max; x += stepSize ) {
        integral += func( x )
    }

    let estimatedError = 0.5 / steps // Thi
    integral = roundFix( integral * ( max - min ) / steps, Math.max( 1, Math.floor( -Math.log10( estimatedError ) ) ) )
    print( ` ≈ ${integral}`, col.mathResult )
    processNum.processNumber( integral )
} */
const integrateHelp =
    `${col.bright}Integrate${col.reset}
Integrates equasions with respect to x.
Arguments: [Start = 0, End = 1, Steps = 2²⁰]
Start: Integral Start
End:   Integral End
Steps: Amount of steps for integration. Too many steps will reduce accuracy because of floating point errors
`
function integrate( func, min = 0, max = 1, steps = 2 ** 20 ) {
    print( `∫${func.toString()} [${min},${max}] ${col.dim}| ${steps} steps`, col.mathQuery )
    if ( steps > 2 ** 24 ) print( `Warning: step counts above ${2 ** 24} can actually hurt accurracy`, col.mathWarn )

    const stepSize = ( max - min ) / steps
    let integral = 0
    for ( let x = min + stepSize * 0.5; x <= max; x += stepSize ) {
        integral += func( x )
    }

    integral = roundSig( integral * ( max - min ) / steps, 15 )
    print( ` ≈ ${integral}`, col.mathResult )
    processNum.processNumber( integral )
    return integral
}

function newtonSolve( func, start = Math.random() * 2e-5, steps = 1e5, confidenceThreshold = 1e-15 ) {
    print( `${func.toString()} = 0 | solve for x | x₀ = ${roundSig( start, 3 )} | ${steps} iterations`, col.mathQuery )

    let x = start
    let y = 0
    let stepSize = 1
    for ( let i = 0; i < steps; i++ ) {

        y = func( x )
        if ( Math.abs( y ) <= 1e-160 || isNaN( y ) || !isFinite( y ) ) break

        let increment = derivativeStep( x, y ) * stepSize
        let dFdx = ( func( x + increment ) - y ) / increment

        if ( dFdx == 0 ) {
            stepSize *= 2
            continue
        } else {
            stepSize *= 0.75
        }

        x -= ( y / dFdx )

    }

    if ( !isFinite( y ) ) {
        print( "No Solution Found. Try specifying a different start position. " + col.dim + `for x = ${x} the function is ${func( x )}`, col.mathError )
        return
    }

    // Smart Rounding: Round until the error starts increasing (gives best results)
    let error = Math.abs( y )
    for ( let i = x.toString().replace( /.*\.|e.*/, "" ).length * 0.5; i > 1; i *= 0.5 ) {
        let newX = roundFix( x, i )
        let newY = func( newX )
        let newErr = Math.abs( newY )
        if ( newErr <= error ) {
            error = newErr
            x = newX
            y = newY
        } else break
    }

    print( ` ${y == 0 ? "=" : "≈"} ${x}${error > confidenceThreshold ? " ±" + roundSig( error, 3 ) : ""}`, error < confidenceThreshold ? col.mathResult : col.mathError )
    processNum.processNumber( x )
    return x
}

function bisectSolve( func, start = 0, steps = 100, stepSize = 2 ) {
    if ( stepSize <= 1 ) {
        print( "Precision too low. Use a value greater than 1", col.mathError )
        return
    }

    print( `${func.toString()} = 0 | solve for x | x₀ = ${roundSig( start, 3 )} | ${( Math.log2( Number.MAX_VALUE ) - Math.log2( Math.max( 2 ** -1024, precision( start ) ) ) ) * 2} search steps`, col.mathQuery )

    // Find Bisection Bounds Values
    let x1 = NaN, x2 = NaN
    let validX = NaN, validY = Infinity

    let lastX = start - precision( start )
    let lastY = func( lastX )
    for ( let i = Math.max( 2 ** -1024, precision( start ) ), x = start; x < Infinity; x += ( i *= stepSize ) ) {

        let y = func( x )

        if ( Math.sign( lastY ) * Math.sign( y ) <= 0 && isFinite( lastY ) && isFinite( y ) ) { // If the signs are different, multiplication will result in a negative number
            x1 = lastX
            x2 = x
            break
        }

        lastY = y
        lastX = x
        if ( Math.abs( y ) < validY && ( Math.abs( x ) < 1 || !isFinite( validX ) ) ) { validY = Math.abs( y ); validX = x }

    }

    if ( !isFinite( x1 ) || !isFinite( x2 ) ) {

        let lastX = start + precision( start )
        let lastY = func( lastX )
        for ( let i = Math.max( 2 ** -1024, precision( start ) ), x = start; x > -Infinity; x -= ( i *= stepSize ) ) {

            let y = func( x )

            if ( Math.sign( lastY ) * Math.sign( y ) <= 0 && isFinite( lastY ) && isFinite( y ) ) { // If the signs are different, multiplication will result in a negative number
                x1 = lastX
                x2 = x
                break
            }

            lastY = y
            lastX = x
            if ( Math.abs( y ) < validY && ( Math.abs( x ) < 1 || !isFinite( validX ) ) ) { validY = Math.abs( y ); validX = x }

        }

    }

    if ( !isFinite( x1 ) || !isFinite( x2 ) ) {
        print( "No Bisection points Found. Trying Newtons Method...", col.mathWarn )
        newtonSolve( func, validX )
        return
    }

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
            } else {
                print( "No Solution Found. Function is not continous inbetween bisection points.", col.mathError )
                return
            }

        }

        if ( isNaN( solution ) ) { // If the solution did not converge, give xm as solution and calculate error
            solution = ( x1 + x2 ) * .5
            error = Math.abs( x1 - x2 )
        }

    }

    // Smart Rounding: Round until the error starts increasing (gives best results)
    let yErr = Math.abs( func( solution ) )
    for ( let decimals = Math.min( solution.toString().replace( /.*\.|e.*/, "" ).length * 0.5, 100 ); decimals > 1; decimals *= 0.5 ) {
        let newX = roundFix( solution, decimals )
        let newYErr = Math.abs( func( newX ) )
        if ( newYErr <= yErr ) {
            yErr = newYErr
            solution = newX
        } else break
    }

    print( ` = ${solution}${error > 0 ? " ±" + roundSig( error, 2 ) : ""} `, ( solution == x1 || solution == x2 || error == 0 ) ? col.mathResult : col.mathError )
    processNum.processNumber( solution )
    return solution
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
                print( `No Solution Found. Function is not continous inbetween bisection points. x1 = ${x1}, x2 = ${x2}, xm = ${xm}, ym = ${ym}`, col.mathError )
                return
            }

        }

        if ( isNaN( solution ) ) { // If the solution did not converge, give xm as solution and calculate error
            solution = ( x1 + x2 ) * .5
            error = Math.abs( x1 - x2 )
        }

    }

    // Smart Rounding: Round until the error starts increasing (gives best results)
    let yErr = Math.abs( func( solution ) )
    for ( let decimals = Math.min( solution.toString().replace( /.*\.|e.*/, "" ).length * 0.5, 100 ); decimals > 1; decimals *= 0.5 ) {
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

    return { value: solution, error: error, maxAccuracy: ( solution == x1 || solution == x2 || error == 0 ), isValid: ( isdbeforeValid && isdafterValid ) }
}

const multiSolveHelp =
    `${col.bright}MultiSolve${col.reset}
Solves equasions for multiple x. Does not always return all solutions.
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

    print( `${func.toString()} = 0 | solve for multiple x | x₀ = ${roundSig( start, 3 )} | maxSolutions: ${maxSolutions} | max. ${( Math.ceil( logn( searchStepSize, Number.MAX_VALUE ) ) - Math.ceil( logn( searchStepSize, Math.max( 2 ** -1024, precision( start ) ) ) ) ) * 2} search steps`, col.mathQuery )

    // Find Bisection Bounds Values
    let validX = NaN, validY = Infinity
    let bounds = []
    let solutions = []
    let aborted = false

    {
        let lastX = start - precision( start )
        let lastY = func( lastX )
        for ( let i = Math.max( 2 ** -1024, precision( start ) ), x = start; x <= Number.MAX_VALUE * 0.5; x += ( i *= searchStepSize ) ) {

            let y = func( x )

            if ( Math.sign( lastY ) * Math.sign( y ) <= 0 && isFinite( lastY ) && isFinite( y ) ) { // If the signs are different, multiplication will result in a negative number
                let sol = bisectSolveSingle( func, lastX, x, solveSteps )
                if ( solutions.length == 0 ) {
                    if ( sol.isValid ) {
                        solutions.push( sol )
                        bounds.push( [lastX, x] )
                    }
                } else if ( solutions[solutions.length - 1].value != sol.value && sol.isValid ) {
                    solutions.push( sol )
                    bounds.push( [lastX, x] )
                }
                if ( solutions.length > maxSolutions ) { aborted = true; break }
            }

            lastY = y
            lastX = x
            if ( Math.abs( y ) < validY && ( Math.abs( x ) < 1 || !isFinite( validX ) ) ) { validY = Math.abs( y ); validX = x }

        }
    }

    {

        let lastX = start + precision( start )
        let lastY = func( lastX )
        for ( let i = Math.max( 2 ** -1024, precision( start ) ), x = start; x >= -Number.MAX_VALUE * 0.5; x -= ( i *= searchStepSize ) ) {

            let y = func( x )

            if ( Math.sign( lastY ) * Math.sign( y ) <= 0 && isFinite( lastY ) && isFinite( y ) ) { // If the signs are different, multiplication will result in a negative number
                let sol = bisectSolveSingle( func, x, lastX, solveSteps )
                if ( solutions.length == 0 ) {
                    if ( sol.isValid ) {
                        solutions.push( sol )
                        bounds.push( [x, lastX] )
                    }
                } else if ( solutions[solutions.length - 1].value != sol.value && sol.isValid ) {
                    solutions.push( sol )
                    bounds.push( [x, lastX] )
                }
                if ( solutions.length > maxSolutions * 2 ) { aborted = true; break }
            }

            lastY = y
            lastX = x
            if ( Math.abs( y ) < validY && ( Math.abs( x ) < 1 || !isFinite( validX ) ) ) { validY = Math.abs( y ); validX = x }

        }

    }

    if ( bounds.length == 0 ) {
        print( "No Bisection points Found. Trying Newtons Method...", col.mathWarn )
        newtonSolve( func, validX )
        return
    }

    solutions.sort( ( a, b ) => Math.abs( a.value - start ) - Math.abs( b.value - start ) ) // Sort by distance to start
    if ( solutions.length > 1 ) solutions = solutions.filter( ( sol, i, arr ) => arr[i].value != arr[( i + 1 ) % arr.length].value )

    print( `Found ${aborted ? "more than " : ""}${solutions.length} solutions, ${solutions.filter( s => s.maxAccuracy ).length} of which to maximum floating point accuracy` )
    print( `Displaying the ${maxSolutions} solutions closest to the start position x₀` )

    solutions = solutions.filter( ( x, i ) => i < maxSolutions ) // Only keep the amount of results specified

    let maxNumLength = solutions.reduce( ( prev, curr ) => Math.max( prev, curr.value.toString().length ), 0 ) + 1
    for ( let i = 0; i < solutions.length; i++ ) {
        print( ( solutions[i].maxAccuracy ? col.mathResult + "= " : col.mathOtherResult + "≈ " ) + solutions[i].value + " ".repeat( maxNumLength - solutions[i].value.toString().length ) + processNum.processNumberMinimal( solutions[i].value ) )
    }

}

module.exports = {
    tableHelp,
    table,
    integrateHelp,
    integrate,
    newtonSolve,
    bisectSolve,
    multiSolveHelp,
    multiSolve,
    precision
}