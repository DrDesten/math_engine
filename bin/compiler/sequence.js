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


function Sequence( sample ) {
    return PolySolve( sample )

    const differences = []
    for ( let comp = sample; comp.length > 1; comp = differences[differences.length - 1] ) {
        let diff = []
        for ( let i = 0; i < comp.length - 1; i++ ) diff.push( comp[i + 1] - comp[i] )
        differences.push( diff )
    }

    const start = sample[0]

    console.log( differences )
}

//let computed = Sequence( seq )
//console.log( computed )
const poly = Sequence( seq2 )
console.log( poly )
//console.log( Array.from( { length: 10 }, ( _, i ) => poly( i ) ) )