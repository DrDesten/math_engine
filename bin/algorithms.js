const processNum = require( "./process_number" )
const col = require( "./colors" )
function print( x, color = "" ) { console.log( `${color}${x}${col.reset}` ) }

//let subscriptNumbers = {};["₀.₁₂₃₄₅₆₇₈₉⁰¹²³⁴⁵⁶⁷⁸⁹⋅."]
//function subscriptNumber( n ) { for ( let i = 0, str = ""; i < n.toString().length; i++ )  }

function roundSig( n, p ) { return parseFloat( n.toPrecision( p ) ) }
function roundFix( n, p ) { return parseFloat( n.toFixed( p ) ) }

function precision( n ) { return 2 ** ( Math.ceil( Math.log2( Math.max( Math.abs( n ), 5.010420900022432e-293 ) ) ) ) * 2 ** -53 }
function derivativeStep( x, y ) { return 2 ** ( Math.ceil( Math.log2( Math.max( Math.abs( x ), Math.abs( y ), 1e-160 ) ) ) ) * 2 ** -32 }


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

function newtonSolve( func, start = Math.random() * 2e-5, steps = 1e4, confidenceThreshold = 1e-15 ) {
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

function bisectSolve( func, precision = 2, maxBisection = 2 ** 256 ) {
    if ( precision <= 1 ) {
        print( "Precision too low. Use a value greater than 1", col.mathError )
        return
    }

    print( `${func.toString()} = 0 | solve for x`, col.mathQuery )

    // Find Bisection Bounds Values
    let x1 = NaN, x2 = NaN
    let validNum = NaN

    let lastYPos = func( 0 ), lastYNeg = func( 0 )
    let lastX = 0
    for ( let x = 2 ** -1024; x < maxBisection; x *= precision ) {

        let yPos = func( x )
        let yNeg = func( -x )

        // Check for positive x and negative x
        if ( Math.sign( lastYPos ) * Math.sign( yPos ) <= 0 && isFinite( lastYPos ) && isFinite( yPos ) ) { // If the signs are different, multiplication will result in a negative number
            x1 = lastX
            x2 = x
            break
        } else if ( Math.sign( lastYNeg ) * Math.sign( yNeg ) <= 0 && isFinite( lastYNeg ) && isFinite( yNeg ) ) { // If the signs are different, multiplication will result in a negative number
            x1 = -x
            x2 = -lastX
            break
        }

        lastYPos = yPos
        lastYNeg = yNeg
        lastX = x
        if ( Math.abs( validNum ) < 0.1 || !isFinite( validNum ) ) validNum = isFinite( yPos ) ? x : ( isFinite( yNeg ) ? -x : validNum )
    }

    if ( !isFinite( x1 ) || !isFinite( x2 ) ) {
        print( "No Bisection points Found. Trying Newtons Method", col.mathError )
        newtonSolve( func, validNum )
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

        for ( let i = 0; i < 100; i++ ) {

            let xm = ( x1 + x2 ) * .5
            let ym = func( xm ) // ym is the y-Value inbetween x1 and x2

            if ( ym < 0 ) { // if ym < 0 zero must lie between ym and y2 (because ym < 0 and y2 > 0)
                x1 = xm
            } else if ( ym > 0 ) { // if ym > 0, zero must lie between y1 and ym (because y1 < 0 and ym > 0)
                x2 = xm
            } else { // ym == 0
                solution = xm
                break
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

module.exports = {
    table,
    integrate,
    newtonSolve,
    bisectSolve,
}