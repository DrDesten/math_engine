const col = require( "./colors" )
function print( x, color = "" ) { console.log( `${color}${x}${col.reset}` ) }

function roundSig( n, p ) { return parseFloat( n.toPrecision( p ) ) }
function roundFix( n, p ) { return parseFloat( n.toFixed( p ) ) }

function precision( n ) { return 2 ** ( Math.ceil( Math.log2( Math.max( Math.abs( n ), 5.010420900022432e-293 ) ) ) ) * 2 ** -53 }
function derivativeStep( x, y ) { return 2 ** ( Math.ceil( Math.log2( Math.max( Math.abs( x ), Math.abs( y ), 1e-160 ) ) ) ) * 2 ** -32 }


function table( func, min = -10, max = 10, step = 1, digits = 14 ) {
    print( `${col.mathQuery}\nTBL: ${func.toString()}${col.dim} [${min},${max}] ++${Math.abs( step )}` )
    let maxlength = 0
    for ( let i = min; i <= max; i = roundSig( i + step, digits ) ) maxlength = Math.max( maxlength, i.toString().length )
    for ( let i = min; i <= max; i = roundSig( i + step, digits ) ) print( `(${i})${" ".repeat( maxlength - i.toString().length )} => ${roundSig( func( i ), digits )}` )
    console.log( "" )
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
    rationalize(integral)
} */
function integrate( func, min = 0, max = 1 ) {
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
    rationalize( integral )
}

function solve( func, start = Math.random() * 2e-5, steps = 1e4, confidenceThreshold = 1e-15 ) {
    print( `\n${func.toString()} = 0 | solve for x | x₀ = ${roundSig( start, 3 )}`, col.mathQuery )

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

    if ( isNaN( y ) || !isFinite( y ) ) {
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
    rationalize( x )
}
/*
function rationalize(x) {
    if (Math.trunc(x) == x) return

    let fractions = []
    let error  = 1
    for (let i = 1; (i <= 16777216 && error > 0); i++) {
        let err = Math.abs( Math.round(x * i) - (x * i) )
        if ( err < error ) {
            // [Zähler, Nenner]
            fractions.push([Math.round(x * i), i])
            error = err
        }
    }

    let constantFractions = []
    const constants = [
        [Math.PI, "π"],
    ]
    const checkConstants = constants.map(c => x / c[0])
    let constError = 1e-5
    let checkPI    = x / Math.PI
    for (let m = 1; (m <= 3600 && constError > 0) ; m++) {
        let errConstants = checkConstants.map(check => Math.abs(Math.round(check * m) - (check * m)))
        let err_pi = Math.abs( Math.round(checkPI * m) - (checkPI * m) )
        if ( err_pi < constError) {
            constantFractions.push([Math.round(checkPI * m), m, "π", err_pi])
            constError = err_pi
        }
    }

    if (constantFractions.length > 0) {
        let fraction = constantFractions[constantFractions.length - 1]
        if (fraction[0] != 0) {
            if (fraction[3] == 0) print(` = ${fraction[0] == 1 ? (fraction[1] == 1 ? fraction[2] : fraction[2] + "/" + fraction[1]) : (fraction[1] == 1 ? fraction[0] + "" + fraction[2] : fraction[0] + "/" + fraction[1] + "*" + fraction[2])}`, col.mathResult)
            else                  print(` ≈ ${fraction[0] == 1 ? (fraction[1] == 1 ? fraction[2] : fraction[2] + "/" + fraction[1]) : (fraction[1] == 1 ? fraction[0] + "" + fraction[2] : fraction[0] + "/" + fraction[1] + "*" + fraction[2])}`, col.mathOtherResult)
        }
    }

    let errors = fractions.map(fraction => Math.abs( fraction[0] / fraction[1] - x )).filter((x,i,a) => (i == 0 || a[i-1] != 0))
    fractions  = fractions.filter((x,i) => (i < errors.length))
    let weightedErrors = errors.map((err, i) => err * ( Math.abs(fractions[i][0]) * Math.abs(fractions[i][1]) + 1 )) // Errors weighted by their rational complexity

    let sortedFractions = fractions.map((fraction, i) => [fraction[0], fraction[1], weightedErrors[i]]).sort((a,b) => a[2] - b[2])

    for (let i = 0; i < Math.min(2, sortedFractions.length); i++) {
        let fraction = sortedFractions[i]
        if (fraction[2] == 0) print(` = ${fraction[0]}${fraction[1] == 1 ? "" : "/" + fraction[1]}`, col.mathOtherResult)
        else                  print(` ≈ ${fraction[0]}${fraction[1] == 1 ? "" : "/" + fraction[1]}`, col.mathOtherResult)
    }
}
*/

/* function rationalize(x) {
    if (Math.trunc(x) == x) return

    let fractions = []
    let error  = 1
    for (let i = 1; (i <= 16777216 && error > 0); i++) {
        let err = Math.abs( Math.round(x * i) - (x * i) )
        if ( err < error ) {
            // [Zähler, Nenner]
            fractions.push([Math.round(x * i), i])
            error = err
        }
    }

    let constantFractions = []
    const constants = [
        [ 3.141592653589793, 'π' ],
        [ 2.718281828459045, 'e' ],
        [ 1.618033988749895, 'Φ' ],
        [ 1.7724538509055159, '√π' ],
        [ 1.6487212707001282, '√e' ],
        [ 1.272019649514069, '√Φ' ],
        [ 9.869604401089358, 'π²' ],
        [ 7.3890560989306495, 'e²' ],
        [ 2.618033988749895, 'Φ²' ],
        [ 0.3183098861837907, 'π⁻¹' ],
        [ 0.36787944117144233, 'e⁻¹' ],
        [ 0.6180339887498948, 'Φ⁻¹' ],
        [ 1.4142135623730951, '√2' ],
        [ 1.7320508075688772, '√3' ],
        [ 2.23606797749979, '√5' ],
        [ 2.449489742783178, '√6' ],
        [ 2.6457513110645907, '√7' ],
        [ 3.1622776601683795, '√10' ],
        [ 3.3166247903554, '√11' ],
        [ 3.605551275463989, '√13' ],
        [ 3.7416573867739413, '√14' ],
        [ 3.872983346207417, '√15' ],
        [ 4.123105625617661, '√17' ],
        [ 4.358898943540674, '√19' ],
        [ 4.58257569495584, '√21' ],
        [ 4.69041575982343, '√22' ],
        [ 4.795831523312719, '√23' ],
        [ 5.0990195135927845, '√26' ],
        [ 5.385164807134504, '√29' ],
        [ 5.477225575051661, '√30' ],
        [ 5.5677643628300215, '√31' ],
        [ 5.744562646538029, '√33' ],
        [ 5.830951894845301, '√34' ],
        [ 5.916079783099616, '√35' ],
        [ 6.082762530298219, '√37' ],
        [ 6.164414002968976, '√38' ],
        [ 6.244997998398398, '√39' ],
        [ 6.4031242374328485, '√41' ],
        [ 6.48074069840786, '√42' ],
        [ 6.557438524302, '√43' ],
        [ 6.782329983125268, '√46' ],
        [ 6.855654600401044, '√47' ],
        [ 7.14142842854285, '√51' ],
        [ 7.280109889280518, '√53' ],
        [ 7.416198487095663, '√55' ],
        [ 7.54983443527075, '√57' ],
        [ 7.615773105863909, '√58' ],
        [ 7.681145747868608, '√59' ],
        [ 7.810249675906654, '√61' ],
        [ 7.874007874011811, '√62' ],
        [ 8.06225774829855, '√65' ],
        [ 8.12403840463596, '√66' ],
        [ 8.18535277187245, '√67' ],
        [ 8.306623862918075, '√69' ],
        [ 8.366600265340756, '√70' ],
        [ 8.426149773176359, '√71' ],
        [ 8.54400374531753, '√73' ],
        [ 8.602325267042627, '√74' ],
        [ 8.774964387392123, '√77' ],
        [ 8.831760866327848, '√78' ],
        [ 8.888194417315589, '√79' ],
        [ 9.055385138137417, '√82' ],
        [ 9.1104335791443, '√83' ],
        [ 9.219544457292887, '√85' ],
        [ 9.273618495495704, '√86' ],
        [ 9.327379053088816, '√87' ],
        [ 9.433981132056603, '√89' ],
        [ 9.539392014169456, '√91' ],
        [ 9.643650760992955, '√93' ],
        [ 9.695359714832659, '√94' ],
        [ 9.746794344808963, '√95' ],
        [ 9.848857801796104, '√97' ]
    ]
    const checkConstants = constants.map(c => x / c[0])
    let constError = 1e-5
    for (let m = 1; (m <= 3600 && constError > 0) ; m++) {
        let errConstants = checkConstants.map(check => Math.abs(Math.round(check * m) - roundSig(check * m, 15)))
        for (let i = 0; i < errConstants.length; i++) {
            if (errConstants[i] < constError) {
                constantFractions.push([Math.round(checkConstants[i] * m), m, constants[i][1], errConstants[i]])
                constError = errConstants[i]
            }
        }
    }

    if (constantFractions.length > 0) {
        let fraction = constantFractions[constantFractions.length - 1]
        if (fraction[0] != 0) {
            if (fraction[3] == 0) print(` = ${fraction[0] == 1 ? (fraction[1] == 1 ? fraction[2] : fraction[2] + "/" + fraction[1]) : (fraction[1] == 1 ? fraction[0] + "" + fraction[2] : fraction[0] + "/" + fraction[1] + "*" + fraction[2])}`, col.mathResult)
            else                  print(` ≈ ${fraction[0] == 1 ? (fraction[1] == 1 ? fraction[2] : fraction[2] + "/" + fraction[1]) : (fraction[1] == 1 ? fraction[0] + "" + fraction[2] : fraction[0] + "/" + fraction[1] + "*" + fraction[2])}`, col.mathOtherResult)
        }
    }

    let errors = fractions.map(fraction => Math.abs( fraction[0] / fraction[1] - x )).filter((x,i,a) => (i == 0 || a[i-1] != 0))
    fractions  = fractions.filter((x,i) => (i < errors.length))
    let weightedErrors = errors.map((err, i) => err * ( Math.abs(fractions[i][0]) * Math.abs(fractions[i][1]) + 1 )) // Errors weighted by their rational complexity

    let sortedFractions = fractions.map((fraction, i) => [fraction[0], fraction[1], weightedErrors[i]]).sort((a,b) => a[2] - b[2])

    for (let i = 0; i < Math.min(2, sortedFractions.length); i++) {
        let fraction = sortedFractions[i]
        if (fraction[2] == 0) print(` = ${fraction[0]}${fraction[1] == 1 ? "" : "/" + fraction[1]}`, col.mathOtherResult)
        else                  print(` ≈ ${fraction[0]}${fraction[1] == 1 ? "" : "/" + fraction[1]}`, col.mathOtherResult)
    }
} */

function rationalize( x ) {
    if ( Math.trunc( x ) == x ) return

    let fractions = []
    let error = 1
    for ( let i = 1; ( i <= 16777216 && error > 0 ); i++ ) {
        let err = Math.abs( Math.round( x * i ) - ( x * i ) )
        if ( err < error ) {
            // [Zähler, Nenner]
            fractions.push( [ Math.round( x * i ), i ] )
            error = err
        }
    }

    let otherFractions = []
    const constants = [
        [ 3.141592653589793, 'π' ],
        [ 2.718281828459045, 'e' ],
        [ 1.618033988749895, 'Φ' ],
        [ 1.7724538509055159, '√π' ],
        [ 1.6487212707001282, '√e' ],
        [ 1.272019649514069, '√Φ' ],
        [ 9.869604401089358, 'π²' ],
        [ 7.3890560989306495, 'e²' ],
        [ 2.618033988749895, 'Φ²' ],
        [ 0.3183098861837907, 'π⁻¹' ],
        [ 0.36787944117144233, 'e⁻¹' ],
        [ 0.6180339887498948, 'Φ⁻¹' ],
    ]
    const roots = [
        [ 1.4142135623730951, '√2' ],
        [ 1.7320508075688772, '√3' ],
        [ 2.23606797749979, '√5' ],
        [ 2.449489742783178, '√6' ],
        [ 2.6457513110645907, '√7' ],
        [ 3.1622776601683795, '√10' ],
        [ 3.3166247903554, '√11' ],
        [ 3.605551275463989, '√13' ],
        [ 3.7416573867739413, '√14' ],
        [ 3.872983346207417, '√15' ],
        [ 4.123105625617661, '√17' ],
        [ 4.358898943540674, '√19' ],
        [ 4.58257569495584, '√21' ],
        [ 4.69041575982343, '√22' ],
        [ 4.795831523312719, '√23' ],
        [ 5.0990195135927845, '√26' ],
        [ 5.385164807134504, '√29' ],
        [ 5.477225575051661, '√30' ],
        [ 5.5677643628300215, '√31' ],
        [ 5.744562646538029, '√33' ],
        [ 5.830951894845301, '√34' ],
        [ 5.916079783099616, '√35' ],
        [ 6.082762530298219, '√37' ],
        [ 6.164414002968976, '√38' ],
        [ 6.244997998398398, '√39' ],
        [ 6.4031242374328485, '√41' ],
        [ 6.48074069840786, '√42' ],
        [ 6.557438524302, '√43' ],
        [ 6.782329983125268, '√46' ],
        [ 6.855654600401044, '√47' ],
        [ 7.14142842854285, '√51' ],
        [ 7.280109889280518, '√53' ],
        [ 7.416198487095663, '√55' ],
        [ 7.54983443527075, '√57' ],
        [ 7.615773105863909, '√58' ],
        [ 7.681145747868608, '√59' ],
        [ 7.810249675906654, '√61' ],
        [ 7.874007874011811, '√62' ],
        [ 8.06225774829855, '√65' ],
        [ 8.12403840463596, '√66' ],
        [ 8.18535277187245, '√67' ],
        [ 8.306623862918075, '√69' ],
        [ 8.366600265340756, '√70' ],
        [ 8.426149773176359, '√71' ],
        [ 8.54400374531753, '√73' ],
        [ 8.602325267042627, '√74' ],
        [ 8.774964387392123, '√77' ],
        [ 8.831760866327848, '√78' ],
        [ 8.888194417315589, '√79' ],
        [ 9.055385138137417, '√82' ],
        [ 9.1104335791443, '√83' ],
        [ 9.219544457292887, '√85' ],
        [ 9.273618495495704, '√86' ],
        [ 9.327379053088816, '√87' ],
        [ 9.433981132056603, '√89' ],
        [ 9.539392014169456, '√91' ],
        [ 9.643650760992955, '√93' ],
        [ 9.695359714832659, '√94' ],
        [ 9.746794344808963, '√95' ],
        [ 9.848857801796104, '√97' ]
    ]
    const checkConstants = constants.map( c => x / c[ 0 ] )
    let constError = 1e-3
    for ( let m = 1; ( m <= 3600 && constError > 0 ); m++ ) {
        let errConstants = checkConstants.map( check => Math.abs( Math.round( check * m ) - roundSig( check * m, 15 ) ) )
        for ( let i = 0; i < errConstants.length; i++ ) {
            if ( errConstants[ i ] < constError ) {
                let fraction = [ Math.round( checkConstants[ i ] * m ), m ]
                otherFractions.push( [
                    fraction[ 0 ],
                    fraction[ 1 ],
                    constants[ i ][ 1 ], errConstants[ i ] * ( Math.abs( fraction[ 0 ] ) + fraction[ 1 ] )
                ] )
                constError = errConstants[ i ]
            }
        }
    }

    const checkRoots = roots.map( c => x / c[ 0 ] )
    let rootError = 1e-5
    for ( let m = 1; ( m <= 64 && rootError > 0 ); m++ ) {
        let errRoots = checkRoots.map( check => Math.abs( Math.round( check * m ) - roundSig( check * m, 15 ) ) )
        for ( let i = 0; i < errRoots.length; i++ ) {
            if ( errRoots[ i ] < rootError ) {
                let fraction = [ Math.round( checkRoots[ i ] * m ), m ]
                otherFractions.push( [
                    fraction[ 0 ],
                    fraction[ 1 ],
                    roots[ i ][ 1 ],
                    errRoots[ i ] * ( Math.abs( fraction[ 0 ] ) + fraction[ 1 ] )
                ] )
                rootError = errRoots[ i ]
            }
        }
    }

    if ( otherFractions.length > 0 ) {
        otherFractions.sort( ( a, b ) => a[ 3 ] - b[ 3 ] )
        let fraction = otherFractions[ 0 ]
        if ( fraction[ 0 ] != 0 ) {
            if ( fraction[ 3 ] == 0 ) print( ` = ${fraction[ 0 ] == 1 ? ( fraction[ 1 ] == 1 ? fraction[ 2 ] : fraction[ 2 ] + "/" + fraction[ 1 ] ) : ( fraction[ 1 ] == 1 ? fraction[ 0 ] + "" + fraction[ 2 ] : fraction[ 0 ] + "/" + fraction[ 1 ] + "*" + fraction[ 2 ] )}`, col.mathResult )
            else print( ` ≈ ${fraction[ 0 ] == 1 ? ( fraction[ 1 ] == 1 ? fraction[ 2 ] : fraction[ 2 ] + "/" + fraction[ 1 ] ) : ( fraction[ 1 ] == 1 ? fraction[ 0 ] + "" + fraction[ 2 ] : fraction[ 0 ] + "/" + fraction[ 1 ] + "*" + fraction[ 2 ] )}`, col.mathOtherResult )
        }
    }

    let errors = fractions.map( fraction => Math.abs( fraction[ 0 ] / fraction[ 1 ] - x ) ).filter( ( x, i, a ) => ( i == 0 || a[ i - 1 ] != 0 ) )
    fractions = fractions.filter( ( x, i ) => ( i < errors.length ) )
    let weightedErrors = errors.map( ( err, i ) => err * ( Math.abs( fractions[ i ][ 0 ] ) * Math.abs( fractions[ i ][ 1 ] ) + 1 ) ) // Errors weighted by their rational complexity

    let sortedFractions = fractions.map( ( fraction, i ) => [ fraction[ 0 ], fraction[ 1 ], weightedErrors[ i ] ] ).sort( ( a, b ) => a[ 2 ] - b[ 2 ] )

    for ( let i = 0; i < Math.min( 2, sortedFractions.length ); i++ ) {
        let fraction = sortedFractions[ i ]
        if ( fraction[ 2 ] == 0 ) print( ` = ${fraction[ 0 ]}${fraction[ 1 ] == 1 ? "" : "/" + fraction[ 1 ]}`, col.mathOtherResult )
        else print( ` ≈ ${fraction[ 0 ]}${fraction[ 1 ] == 1 ? "" : "/" + fraction[ 1 ]}`, col.mathOtherResult )
    }
}

module.exports = {
    table,
    integrate,
    solve,
    rationalize
}