const col = require( "./colors" )
function print( x, color = "" ) { console.log( `${color}${x}${col.reset}` ) }

function roundSig( n, p ) { return parseFloat( n.toPrecision( p ) ) }
function roundFix( n, p ) { return parseFloat( n.toFixed( p ) ) }

function processNumber( x ) {
    if ( Math.trunc( x ) == x ) return

    let fractions = []
    let error = 1
    for ( let i = 1; ( i <= 16777216 && error > 0 ); i++ ) {
        let err = Math.abs( Math.round( x * i ) - ( x * i ) )
        if ( err < error ) {
            // [Zähler, Nenner]
            fractions.push( [Math.round( x * i ), i] )
            error = err
        }
    }

    let otherFractions = []
    const constants = [
        [3.141592653589793, 'π'],
        [2.718281828459045, 'e'],
        [1.618033988749895, 'Φ'],
        [1.7724538509055159, '√π'],
        [1.6487212707001282, '√e'],
        [1.272019649514069, '√Φ'],
        [9.869604401089358, 'π²'],
        [7.3890560989306495, 'e²'],
        [2.618033988749895, 'Φ²'],
        [0.3183098861837907, 'π⁻¹'],
        [0.36787944117144233, 'e⁻¹'],
        [0.6180339887498948, 'Φ⁻¹'],
    ]
    const roots = [
        [1.4142135623730951, '√2'],
        [1.7320508075688772, '√3'],
        [2.23606797749979, '√5'],
        [2.449489742783178, '√6'],
        [2.6457513110645907, '√7'],
        [3.1622776601683795, '√10'],
        [3.3166247903554, '√11'],
        [3.605551275463989, '√13'],
        [3.7416573867739413, '√14'],
        [3.872983346207417, '√15'],
        [4.123105625617661, '√17'],
        [4.358898943540674, '√19'],
        [4.58257569495584, '√21'],
        [4.69041575982343, '√22'],
        [4.795831523312719, '√23'],
        [5.0990195135927845, '√26'],
        [5.385164807134504, '√29'],
        [5.477225575051661, '√30'],
        [5.5677643628300215, '√31'],
        [5.744562646538029, '√33'],
        [5.830951894845301, '√34'],
        [5.916079783099616, '√35'],
        [6.082762530298219, '√37'],
        [6.164414002968976, '√38'],
        [6.244997998398398, '√39'],
        [6.4031242374328485, '√41'],
        [6.48074069840786, '√42'],
        [6.557438524302, '√43'],
        [6.782329983125268, '√46'],
        [6.855654600401044, '√47'],
        [7.14142842854285, '√51'],
        [7.280109889280518, '√53'],
        [7.416198487095663, '√55'],
        [7.54983443527075, '√57'],
        [7.615773105863909, '√58'],
        [7.681145747868608, '√59'],
        [7.810249675906654, '√61'],
        [7.874007874011811, '√62'],
        [8.06225774829855, '√65'],
        [8.12403840463596, '√66'],
        [8.18535277187245, '√67'],
        [8.306623862918075, '√69'],
        [8.366600265340756, '√70'],
        [8.426149773176359, '√71'],
        [8.54400374531753, '√73'],
        [8.602325267042627, '√74'],
        [8.774964387392123, '√77'],
        [8.831760866327848, '√78'],
        [8.888194417315589, '√79'],
        [9.055385138137417, '√82'],
        [9.1104335791443, '√83'],
        [9.219544457292887, '√85'],
        [9.273618495495704, '√86'],
        [9.327379053088816, '√87'],
        [9.433981132056603, '√89'],
        [9.539392014169456, '√91'],
        [9.643650760992955, '√93'],
        [9.695359714832659, '√94'],
        [9.746794344808963, '√95'],
        [9.848857801796104, '√97']
    ]
    const checkConstants = constants.map( c => x / c[0] )
    error = 1e-3
    for ( let m = 1; ( m <= 3600 && error > 0 ); m++ ) {
        let errConstants = checkConstants.map( check => Math.abs( Math.round( check * m ) - roundSig( check * m, 15 ) ) )
        for ( let i = 0; i < errConstants.length; i++ ) {
            if ( errConstants[i] < error ) {
                let fraction = [Math.round( checkConstants[i] * m ), m]
                otherFractions.push( [
                    fraction[0],
                    fraction[1],
                    constants[i][1], errConstants[i] * ( Math.abs( fraction[0] ) + fraction[1] )
                ] )
                error = errConstants[i]
            }
        }
    }

    const checkRoots = roots.map( c => x / c[0] )
    let rootError = 1e-5
    for ( let m = 1; ( m <= 64 && rootError > 0 ); m++ ) {
        let errRoots = checkRoots.map( check => Math.abs( Math.round( check * m ) - roundSig( check * m, 15 ) ) )
        for ( let i = 0; i < errRoots.length; i++ ) {
            if ( errRoots[i] < rootError ) {
                let fraction = [Math.round( checkRoots[i] * m ), m]
                otherFractions.push( [
                    fraction[0],
                    fraction[1],
                    roots[i][1],
                    errRoots[i] * ( Math.abs( fraction[0] ) + fraction[1] )
                ] )
                rootError = errRoots[i]
            }
        }
    }

    if ( otherFractions.length > 0 ) {
        otherFractions.sort( ( a, b ) => a[3] - b[3] )
        let frac = otherFractions[0]
        if ( frac[0] != 0 ) {
            let sign = frac[0] / frac[1] < 0
            frac[0] = Math.abs( frac[0] )
            print( ` ${frac[3] == 0 ? "=" : "≈"} ${sign ? "-" : ""}${frac[0] == 1 ? frac[2] : frac[0]}${frac[1] == 1 ? "" : "/" + frac[1]}${frac[0] == 1 ? "" : ( frac[1] == 1 ? "" : " * " ) + frac[2]} `, frac[3] == 0 ? col.mathResult : col.mathOtherResult )
        }
    }

    let errors = fractions.map( fraction => Math.abs( fraction[0] / fraction[1] - x ) ).filter( ( x, i, a ) => ( i == 0 || a[i - 1] != 0 ) )
    fractions = fractions.filter( ( x, i ) => ( i < errors.length ) )
    let weightedErrors = errors.map( ( err, i ) => err * ( Math.abs( fractions[i][0] ) * Math.abs( fractions[i][1] ) + 1 ) ) // Errors weighted by their rational complexity

    let sortedFractions = fractions.map( ( fraction, i ) => [fraction[0], fraction[1], weightedErrors[i]] ).sort( ( a, b ) => a[2] - b[2] )

    for ( let i = 0; i < Math.min( 2, sortedFractions.length ); i++ ) {
        let fraction = sortedFractions[i]
        if ( fraction[2] == 0 ) print( ` = ${fraction[0]}${fraction[1] == 1 ? "" : "/" + fraction[1]} `, col.mathOtherResult )
        else print( ` ≈ ${fraction[0]}${fraction[1] == 1 ? "" : "/" + fraction[1]} `, col.mathOtherResult )
    }
}



function rationalizeConstants( x, maxDenominator = 3600 ) {

    const constants = [
        [3.141592653589793, 'π'],
        [2.718281828459045, 'e'],
        [1.618033988749895, 'Φ'],
        [1.7724538509055159, '√π'],
        [1.6487212707001282, '√e'],
        [1.272019649514069, '√Φ'],
        [9.869604401089358, 'π²'],
        [7.3890560989306495, 'e²'],
        [2.618033988749895, 'Φ²'],
        [0.3183098861837907, 'π⁻¹'],
        [0.36787944117144233, 'e⁻¹'],
        [0.6180339887498948, 'Φ⁻¹'],
    ]
    const checkConstants = constants.map( c => x / c[0] )
    let constFractions = []

    let error = 1e-3
    for ( let denom = 1; ( denom <= maxDenominator && error > 0 ); denom++ ) {

        //let errConstants = checkConstants.map( check => Math.abs( Math.round( check * denom ) - ( check * denom ) ) )
        let errConstants = checkConstants.map( check => Math.abs( Math.round( check * denom ) - ( check * denom ) ) )
        for ( let i = 0; i < errConstants.length; i++ ) {
            if ( errConstants[i] < error ) {
                let fraction = [Math.round( checkConstants[i] * denom ), denom]
                constFractions.push( [
                    fraction[0],
                    fraction[1],
                    constants[i][1],
                    errConstants[i] * ( Math.abs( fraction[0] ) + fraction[1] )
                ] )
                error = errConstants[i]
            }
        }

    }

    if ( constFractions.length == 0 ) return

    console.log( constFractions )

    let frac = constFractions[constFractions.length - 1]
    if ( frac[0] != 0 ) {
        let sign = frac[0] / frac[1] < 0
        frac[0] = Math.abs( frac[0] )
        print( ` ${frac[3] == 0 ? "=" : "≈"} ${sign ? "-" : ""}${frac[0] == 1 ? frac[2] : frac[0]}${frac[1] == 1 ? "" : "/" + frac[1]}${frac[0] == 1 ? "" : ( frac[1] == 1 ? "" : " * " ) + frac[2]} `, frac[3] == 0 ? col.mathResult : col.mathOtherResult )
    }

}


// Get the physical constants by executing the "generate_dev" command
function matchConstants( x ) {

    const constants = [
        ['c_0', 299792458, 'c₀', 'speed of light in vacuum'],
        ['h', 6.62607015e-34, 'ℎ', 'Planck constant'],
        ['h_red', 1.0545718176461565e-34, 'ℏ', 'reduced Planck constant'],
        ['G', 6.6743e-11, 'G', 'Newtonian constant of gravitation'],
        ['eps_0', 8.8541878128e-12, 'ε₀', 'vacuum electric permittivity'],
        ['mu_0', 0.00000125663706212, '𝜇₀', 'vacuum magnetic permeability'],
        ['Z_0', 376.730313668, 'Z₀', 'characteristic impedance of vacuum'],
        ['q_e', 1.602176634e-19, 'qₑ', 'elementary charge'],
        ['N_A', 6.02214076e+23, 'Nₐ', 'Avogadro constant'],
        ['k_B', 1.380649e-23, 'k_B', 'Boltzmann constant'],
        ['G_0', 0.00007748091729863649, 'G₀', 'conductance quantum'],
        ['K_J', 483597848416983.6, 'Kⱼ', 'Josephson constant'],
        ['k_e', 8987551792.3, 'kₑ', 'Coulomb constant'],
        ['R_K', 25812.807459304513, 'Rₖ', 'von Klitzing constant'],
        ['Phi_0', 2.0678338484619295e-15, '𝚽₀', 'magnetic flux quantum'],
        ['m_e', 9.1093837015e-31, 'mₑ', 'electron mass'],
        ['m_p', 1.67262192369e-27, 'mₚ', 'proton mass'],
        ['m_n', 1.67492749804e-27, 'mₙ', 'neutron mass'],
        ['m_mu', 1.883531627e-28, 'm𝜇', 'muon mass'],
        ['m_tau', 3.16754e-27, 'mτ', 'tau mass'],
        ['mu_B', 9.274010078362164e-24, '𝜇_B', 'Bohr magneton'],
        ['mu_N', 5.050783746096375e-27, '𝜇ₙ', 'nuclear magneton'],
        ['alpha', 0.007297352569278033, 'α', 'fine-structure constant'],
        ['a_0', 5.2917721090608536e-11, 'a₀', 'Bohr radius'],
        ['r_e', 2.817940326204928e-15, 'rₑ', 'classical electron radius'],
        ['g_e', -2.00231930436256, 'gₑ', 'electron g-factor'],
        ['g_mu', -2.0023318418, 'g𝜇', 'muon g-factor'],
        ['g_p', 5.5856946893, 'gₚ', 'proton g-factor'],
        ['R_inf', 10973731.568072576, 'R∞', 'Rydberg constant'],
        ['E_h', 4.359744722172437e-18, 'Eₕ', 'Hartree energy'],
        ['sigma_e', 6.652458732173516e-29, '𝝈ₑ', 'Thomson cross section'],
        ['m_u', 1.6605390666e-27, 'mᵤ', 'atomic mass constant'],
        ['F', 96485.33212331001, 'F', 'Faraday constant'],
        ['R', 8.31446261815324, 'R', 'molar gas constant'],
        ['M_u', 0.00099999999965, 'Mᵤ', 'molar mass constant'],
        ['sigma', 5.6703744191844294e-8, '𝝈', 'Stefan–Boltzmann constant'],
        ['c_1', 3.7417718521927573e-16, 'c₁', 'first radiation constant'],
        ['c_1L', 1.1910429723971881e-16, 'c_1L', 'first radiation constant for spectral radiance '],
        ['c_2', 0.014387768775039337, 'c₂', 'second radiation constant '],
        ['b', 0.002897771955, 'b', 'Wien wavelength displacement law constant'],
        ['b_prime', 5.878925757e-10, "b'", 'Wien frequency displacement law constant'],
        ['b_entropy', 0.003002916077, 'b_entropy', 'Wien entropy displacement law constant'],
        ['l_P', 1.616255e-35, 'lₚ', 'Planck length'],
        ['m_P', 2.176434e-8, 'mₚ', 'Planck mass'],
        ['t_P', 1.416784e+32, 'tₚ', 'Planck temperature'],
        ['T_P', 5.391247e-44, 'Tₚ', 'Planck time'],
        ['atm', 101325, 'atm', 'standard atmosphere'],
        ['g', 9.80665, 'g', 'standard acceleration of gravity']
    ]
    let matchedConstants = []
    let error = 5e-2 // 5% Error margin
    for ( let i = 0; i < constants.length; i++ ) {
        let err = Math.abs( ( constants[i][1] - Math.abs( x ) ) / constants[i][1] )
        let neg = x * constants[i][1] < 0
        if ( err < error ) {
            matchedConstants.push( [...constants[i], err, neg] )
            error = err
        }
    }

    if ( matchedConstants.length == 0 ) return

    let constant = matchedConstants[matchedConstants.length - 1]
    print( ` ${constant[4] == 0 ? "=" : "≈"} ${constant[5] ? "-" : ""}${constant[2]} ${col.dim}(${constant[3]})`, constant[4] == 0 ? col.mathResult : col.mathOtherResult )

}

function rationalize( x, maxDenominator = 16777216 ) {
    rationalizeConstants( x )
    if ( Math.trunc( x ) == x ) return

    let fractions = []
    let error = 0.5
    for ( let i = 1; ( i <= maxDenominator && error > 0 ); i++ ) {
        let err = Math.abs( Math.round( x * i ) - ( x * i ) )
        if ( err < error ) {
            // [Zähler, Nenner]
            fractions.push( [Math.round( x * i ), i, err] )
            error = err
        }
    }


    let weightedErrors = fractions.map( ( frac, i ) => frac[2] * ( Math.abs( frac[0] ) + Math.abs( frac[1] ) ) ) // Errors weighted by their rational complexity
    let sortedFractions = fractions.map( ( fraction, i ) => [fraction[0], fraction[1], weightedErrors[i]] ).sort( ( a, b ) => a[2] - b[2] )

    /* console.log( fractions )
    console.log( weightedErrors )
    console.log( sortedFractions ) */
    for ( let i = 0; i < Math.min( 2, sortedFractions.length ); i++ ) {
        let fraction = sortedFractions[i]
        print( ` ${fraction[2] == 0 ? "=" : "≈"} ${fraction[0]}${fraction[1] == 1 ? "" : "/" + fraction[1]} `, fraction[2] == 0 ? col.mathOtherResult : col.mathOtherResult )
    }
}

module.exports = {
    processNumber,
    rationalize
}