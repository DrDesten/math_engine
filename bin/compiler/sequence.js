/** @param {[number,number][]} points */
function Regression( points ) {
    const functions = [
        function poly0( x, a ) { return a },
        function poly1( x, a, b ) { return a * x + b },
        function poly2( x, a, b, c ) { return a * x * x + b * x + c },
        function poly3( x, a, b, c, d ) { return a * x * x * x + b * x * x + c * x + d },

        function sin( x, a, b, c, d ) { return Math.sin( a * x + b ) * c + d }
    ]


    /** @param {[number,number][]} points @param {(x: number, ...args: number) => number} fn */
    function optimize( points, fn ) {
        const d = 1e-5
        const e = 1

        const args = Array.from( { length: fn.length - 1 }, () => Math.random() - 0.5 )
        const argc = args.length
        let lr = 1

        function run( args ) {
            let error = 0
            for ( let i = 0; i < points.length; i++ ) {
                const [x, y] = points[i]
                const diff = fn( x, ...args ) - y
                error += diff * diff
            }
            return error
        }

        let curr = args.flat()
        let cerr = run( curr )

        let moment = Array.from( args, () => 0 )
        let grad = Array.from( args, () => 0 )

        let errorDiff = Math.abs( cerr )
        for ( let iter = 0; iter < 100_000; iter++ ) {
            for ( let i = 0; i < argc; i++ ) {
                const args = curr.flat()
                args[i] += d
                const y = run( args )
                const dy = cerr - y
                grad[i] = dy
            }

            if ( !( iter % 1000 ) ) {
                console.log(
                    "err", +cerr.toPrecision( 3 ),
                    "mom", moment.map( x => +x.toPrecision( 3 ) ),
                    "grad", grad.map( x => +x.toPrecision( 3 ) ),
                    lr, errorDiff
                )
            }

            for ( let i = 0; i < argc; i++ ) {
                const dy = grad[i]
                const map = dy / ( 1 + dy * dy )
                const step = map * lr
                moment[i] += step
                moment[i] *= 0.9
                curr[i] += step + moment[i]
            }

            const newErr = run( curr )
            const errDiff = cerr - newErr

            cerr = newErr

            errorDiff = errorDiff * 0.9 + errDiff * 0.1

            if ( errorDiff < 0 ) {
                lr = lr * 0.5 + 1
            } else {
                lr *= 1 / ( errorDiff + ( 1 / 1.1 ) )
            }

        }

        return { args: curr, err: cerr }
    }


    let func = functions[4]
    let { args, err } = optimize( points, func )

    console.log( { args, err } )
    console.log( points.map( ( [x, y] ) => y ) )
    console.log( points.map( ( [x, y] ) => func( x, ...args ) ) )
}


function printMatrix( matrix, width ) {
    // Step 1: Convert all numbers to strings and determine the maximum length
    const strMatrix = matrix.map( num => num.toString() )
    const maxNumLength = Math.max( ...strMatrix.map( num => num.length ) )

    // Step 2: Construct rows of specified width
    const rows = []
    for ( let i = 0; i < strMatrix.length; i += width ) {
        const row = strMatrix.slice( i, i + width )
            .map( num => num.padStart( maxNumLength, ' ' ) )  // Pad each number
            .join( ' ' )  // Join numbers with a single space
        rows.push( row )
    }

    // Step 3: Join all rows with newlines to form the final matrix string
    return rows.join( '\n' )
}

class Polynomial extends Function {
    /** @param {number[]} coefficents */
    constructor( coefficents ) {
        const start = coefficents.findIndex( x => x )
        const truncated = coefficents.slice( start )
        const terms = truncated.map( ( coeff, i ) => `${coeff} * x**${truncated.length - 1 - i}` )
        super( "x", "return " + terms.join( " + " ) )
    }
}
/** @param {number[]} values */
function PolySolve( values ) {
    const degree = values.length
    const rows = degree
    const cols = degree + 1

    // Create Matrix
    const matrix = Array.from( values, ( val, x ) => {
        return [...values.map( ( _, n ) => x ** n ), val]
    } ).flat()
    console.log( printMatrix( matrix, degree + 1 ) )

    // 1st Solve
    for ( let step = 0; step < degree; step++ ) {
        const targetCol = step
        const sourceRow = step
        const startRow = sourceRow + 1
        const startCol = targetCol

        const sourceOffset = sourceRow * cols
        const sourceValue = matrix[sourceOffset + targetCol]
        for ( let row = startRow; row < rows; row++ ) {
            const destValue = matrix[row * cols + targetCol] // First non-zero element
            const factor = destValue / sourceValue
            for ( let col = startCol; col < cols; col++ ) {
                matrix[row * cols + col] -= matrix[sourceOffset + col] * factor
            }
        }
    }
    console.log( printMatrix( matrix, degree + 1 ) )

    // 2nd Solve
    const coefficents = Array.from( { length: degree } )
    for ( let row = degree - 1; row >= 0; row-- ) {
        const srcfac = row * cols + row
        const srcval = row * cols + cols - 1

        const factor = matrix[srcfac]
        matrix[srcval] /= factor
        matrix[srcfac] /= factor

        const coeff = matrix[srcval]
        coefficents[degree - row - 1] = coeff

        for ( let r = row - 1; r >= 0; r-- ) {
            const destfac = r * cols + row
            const destval = r * cols + cols - 1

            matrix[destval] -= matrix[destfac] * coeff
            matrix[destfac] -= matrix[destfac]
        }

    }
    console.log( printMatrix( matrix, degree + 1 ) )
    console.log( coefficents )

    return new Polynomial( coefficents )
}


const seq = [0, 1, 3, 6, 10, 15, 21]
const seq2 = [6, 10, 15]
const seq3 = [-1, 1, -1, 1, -1]

/** @param {number[]} samples  */
function Sequence( samples ) {
    function diff( samples ) {
        return samples.slice( 1 ).map( ( x, i ) => x - samples[i] )
    }
    function fac( samples ) {
        return samples.slice( 1 ).map( ( x, i ) => x / samples[i] )
    }

    // Constant Value
    const constant = samples.every( x => x === samples[0] )
    const constantValue = samples[0]
    //constant && console.log( "constant", constantValue )
    if ( constant ) return () => constantValue

    // Linearly Increasing Value
    const differences = diff( samples )
    const linear = differences.every( x => x === differences[0] )
    const linearStart = samples[0]
    const linearStep = differences[0]
    //linear && console.log( "linear", linearStart, linearStep )
    if ( linear ) return n => linearStart + linearStep * n

    // Values with fixed ratio
    const ratios = fac( samples )
    const geometric = ratios.every( x => x === ratios[0] )
    const geometricStart = samples[0]
    const geometricFactor = ratios[0]
    //geometric && console.log( "geometric", geometricStart, geometricFactor )
    if ( geometric ) return n => geometricStart * geometricFactor ** n

    // Values raised to a costant power
    const lr0 = Math.log( ratios[0] )
    const lr1 = Math.log( ratios[1] )
    const nstart = 1, nend = 10_000
    let lastdiff = Infinity
    let lastPower = 0
    for ( let n = nstart; n <= nend; n++ ) {
        const r0div = Math.log( ( n + 1 ) / n )
        const r1div = Math.log( ( n + 2 ) / ( n + 1 ) )
        const r0power = lr0 / r0div
        const r1power = lr1 / r1div

        // rdiff is linear for large n
        // this could be used for newtons method to find the root of rdiff faster
        const rdiff = r0power - r1power

        if ( Math.abs( lastdiff ) < Math.abs( rdiff ) ) {
            const start = n - 1
            const power = Math.round( lastPower )

            const test = ( start + 2 ) ** power
            if ( samples[2] !== test ) break

            //console.log( "power", start, power, "match:", [lastdiff, lastPower] )
            return n => ( start + n ) ** power
        }

        lastdiff = rdiff
        lastPower = r0power
    }

    // Sequence with higher order differences
    let multidiff = [samples]
    for ( let tmp = multidiff.at( -1 ); tmp.some( x => x !== tmp[0] ); multidiff.push( tmp = diff( tmp ) ) ) {}
    multidiff = multidiff.map( x => x[0] )

    return () => NaN
}

//let computed = Sequence( seq )
//console.log( computed )
//const poly = Sequence( seq2 )
//console.log( poly )
//console.log( Array.from( { length: 10 }, ( _, i ) => poly( i ) ) )

const sequences = [
    [0, 0],
    [1, 1],
    [0, 1, 2],
    [1, 2, 3, 4],
    [1, 2, 4, 8],
    [1, 3, 9, 27],
    [1, -1, 1, -1],
    [2, -2, 2, -2],
    [1, -2, 4, -8],
    [1, 4, 9, 16],
    [1, 16, 81, 256],
    [4, 9, 16, 25],
    [16, 25, 36, 49],
    [5 ** 2, 6 ** 2, 7 ** 2, 8 ** 2],
    [5 ** 3, 6 ** 3, 7 ** 3, 8 ** 3],
    [7453 ** 3, 7454 ** 3, 7455 ** 3, 7456 ** 3],
    [5 ** 10, 6 ** 10, 7 ** 10, 8 ** 10],
    [5 ** 25, 6 ** 25, 7 ** 25, 8 ** 25],
    [3 ** 50, 4 ** 50, 5 ** 50, 6 ** 50],
    [3 ** 100, 4 ** 100, 5 ** 100, 6 ** 100],
    [0, 1, 3, 6, 10, 15, 21],
    //[0, 3, -4, 10, 0, 1, -5],
]

for ( const sequence of sequences ) {
    const computed = Sequence( sequence.slice( 0, -1 ) )
    console.log( sequence.map( ( x, i ) => [x, computed( i )] ) )
}