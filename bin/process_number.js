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

    let error = 0.05
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
                    errConstants[i] * ( fraction[0] ** 2 + fraction[1] ** 2 )
                ] )
                error = errConstants[i]
            }
        }

    }

    if ( constFractions.length == 0 ) return
    constFractions.sort( ( a, b ) => a[3] - b[3] )

    //console.log( constFractions )

    let frac = constFractions[0]
    if ( frac[0] != 0 && frac[3] < 1 ) {
        let sign = frac[0] / frac[1] < 0
        frac[0] = Math.abs( frac[0] )
        print( ` ${frac[3] == 0 ? "=" : "≈"} ${sign ? "-" : ""}${frac[0] == 1 ? frac[2] : frac[0]}${frac[1] == 1 ? "" : "/" + frac[1]}${frac[0] == 1 ? "" : ( frac[1] == 1 ? "" : " * " ) + frac[2]} `, frac[3] == 0 ? col.mathResult : col.mathOtherResult )
    }

}


// Get the physical constants by executing the "generate_dev" command
function matchConstants( x ) {

    const constants = [
        ["sqrt2", 1.4142135623730951, "√2", "Square root of 2, Pythagoras constant",], ["sqrt3", 1.7320508075688772, "√3", "Square root of 3, Theodorus' constant",], ["sqrt5", 2.23606797749979, "√5", "Square root of 5",], ["silverRatio", 2.414213562373095, "δₛ", "Silver ratio",], ["cbrt2", 1.2599210498948732, "∛2", "Cube root of 2",], ["cbrt3", 1.4422495703074083, "∛3", "Cube root of 3",], ["twelfthRootOf2", 1.0594630943592953, "2¹⸍¹²", "Twelfth root of 2",], ["supergoldenRatio", 1.465571231876768, "ψ", "Supergolden ratio",], ["connectiveConstantForTheHexagonalLattice", 1.8477590650225735, "μ", "Connective constant for the hexagonal lattice",], ["keplerBouwkamp_c", 0.1149420448532962, "K′", "Kepler–Bouwkamp constant",], ["wallis_c", 2.0945514815423265, "wallis_c", "Wallis's constant",], ["naturalLogarithmOf2", 0.6931471805599453, "ln2", "Natural logarithm of 2",], ["lemniscate_c", 2.6220575542921196, "ϖ", "Lemniscate constant",], ["euler_c", 0.5772156649015329, "γ", "Euler's constant",], ["erdosBorwein_c", 1.6066951524152917, "E", "Erdős–Borwein constant",], ["omega_c", 0.5671432904097838, "Ω", "Omega constant",], ["apery_c", 1.2020569031595942, "ζ(3)", "Apéry's constant",], ["laplaceLimit", 0.6627434193491816, "laplaceLimit", "Laplace limit",], ["ramanujanSoldner_c", 1.451369234883381, "μ", "Ramanujan–Soldner constant",], ["gauss_c", 0.8346268416740732, "G", "Gauss's constant",], ["secondHermite_c", 1.1547005383792515, "γ₂", "Second Hermite constant",], ["liouville_c", 0.110001, "L", "Liouville's constant",], ["firstContinuedFraction_c", 0.697774657964008, "C₁", "First continued fraction constant",], ["ramanujan_c", 262537412640768740, "ramanujan_c", "Ramanujan's constant",], ["glaisherKinkelin_c", 1.2824271291006226, "A", "Glaisher–Kinkelin constant",], ["catalan_c", 0.915965594177219, "G", "Catalan's constant",], ["dottie_n", 0.7390851332151607, "dottieₙ", "Dottie number",], ["meisselMertens_c", 0.26149721284764277, "M", "Meissel–Mertens constant",], ["universalParabolic_c", 2.295587149392638, "P", "Universal parabolic constant",], ["cahen_c", 0.643410546288338, "C", "Cahen's constant",], ["gelfond_c", 23.14069263277927, "e^π", "Gelfond's constant",], ["gelfondSchneider_c", 2.665144142690225, "2^√2", "Gelfond–Schneider constant",], ["secondFavard_c", 1.2337005501361697, "K₂", "Second Favard constant",], ["goldenAngle", 2.3999632297286535, "g", "Golden angle",], ["sierpinski_c", 2.5849817595792532, "K", "Sierpiński's constant",], ["landauRamanujan_c", 0.7642236535892206, "K", "Landau–Ramanujan constant",], ["firstNielsenRamanujan_c", 0.8224670334241132, "a₁", "First Nielsen–Ramanujan constant",], ["gieseking_c", 1.0149416064096537, "G", "Gieseking constant",], ["bernstein_c", 0.2801694990238691, "β", "Bernstein's constant",], ["tribonacci_c", 1.8392867552141612, "tribonacci_c", "Tribonacci constant",], ["brun_c", 1.902160583104, "B₂", "Brun's constant",], ["twinPrimes_c", 0.6601618158468696, "C₂", "Twin primes constant",], ["plastic_n", 1.324717957244746, "ρ", "Plastic number",], ["zScoreForThe975PercentilePoint", 1.9599639845400543, "z₀.₉₇₅", "Z score for the 975 percentile point",], ["prouhetThueMorse_c", 0.4124540336401076, "τ", "Prouhet–Thue–Morse constant",], ["golombDickman_c", 0.6243299885435508, "λ", "Golomb–Dickman constant",], ["constantRelatedToTheAsymptoticBehaviorOfLebesgueConstants", 0.9894312738311469, "c", "Constant related to the asymptotic behavior of Lebesgue constants",], ["fellerTornier_c", 0.6613170494696223, "C_FT", "Feller–Tornier constant",], ["base10Champernowne_c", 0.12345678910111213, "C₁₀", "Base 10 Champernowne constant",], ["salem_c", 1.1762808182599176, "σ₁₀", "Salem constant",], ["khinchin_c", 2.6854520010653062, "K₀", "Khinchin's constant",], ["levyConstant_1", 1.1865691104156255, "β", "Lévy's constant (1)",], ["levyConstant_2", 3.2758229187218113, "e^β", "Lévy's constant (2)",], ["copelandErdos_c", 0.23571113171923294, "C_CE", "Copeland–Erdős constant",], ["mills_c", 1.3063778838630806, "A", "Mills' constant",], ["gompertz_c", 0.5963473623231941, "δ", "Gompertz constant",], ["vanDerPauw_c", 4.532360141827194, "π/ln2", "Van der Pauw constant",], ["magicAngle", 0.9553166181245093, "θₘ", "Magic angle",], ["artin_c", 0.37395581361920227, "Cₐᵣₜᵢₙ", "Artin's constant",], ["porter_c", 1.4670780794339755, "C", "Porter's constant",], ["lochs_c", 0.9702701143920339, "L", "Lochs constant",], ["devicciTesseract_c", 1.0074347568842794, "devicciTesseract_c", "DeVicci's tesseract constant",], ["liebSquareIce_c", 1.539600717839002, "liebSquareIce_c", "Lieb's square ice constant",], ["niven_c", 1.7052111401053678, "C", "Niven's constant",], ["stephens_c", 0.5759599688929454, "stephens_c", "Stephens' constant",], ["regularPaperfoldingSequence", 0.8507361882018672, "P", "Regular paperfolding sequence",], ["reciprocalFibonacci_c", 3.3598856662431777, "ψ", "Reciprocal Fibonacci constant",], ["feigenbaumConstant_delta", 4.66920160910299, "δ", "Feigenbaum constant δ",], ["robbins_c", 0.6617071822671763, "Δ(3)", "Robbins constant",], ["weierstrass_c", 0.47494937998792064, "weierstrass_c", "Weierstrass constant",], ["fransenRobinson_c", 2.8077702420285195, "F", "Fransén–Robinson constant",], ["fractalDimensionOfTheCantorSet", 0.6309297535714574, "log₃2", "Fractal dimension of the Cantor set",], ["feigenbaumConstant_alpha", 2.5029078750958926, "α", "Feigenbaum constant α",], ["secondDuBoisReymond_c", 0.19452804946532512, "C₂", "Second du Bois-Reymond constant",], ["erdosTenenbaumFord_c", 0.860713320559342, "δ", "Erdős–Tenenbaum–Ford constant",], ["conway_c", 1.3035772690342964, "λ", "Conway's constant",], ["fractalDimensionOfTheApollonianPackingOfCircles", 1.305686729, "fractalDimensionOfTheApollonianPackingOfCircles", "Fractal dimension of the Apollonian packing of circles",], ["hafnerSarnakMccurley_c", 0.353236371854996, "σ", "Hafner–Sarnak–McCurley constant",], ["hausdorffDimensionOfTheSierpinskiTriangle", 1.584962500721156, "log₂3", "Hausdorff dimension of the Sierpinski triangle",], ["backhouse_c", 1.4560749485826896, "B", "Backhouse's constant",], ["viswanath_c", 1.1319882487943, "viswanath_c", "Viswanath constant",], ["komornikLoreti_c", 1.787231650182966, "q", "Komornik–Loreti constant",], ["embreeTrefethen_c", 0.70258, "β*", "Embree–Trefethen constant",], ["heathBrownMoroz_c", 0.001317641154853178, "C", "Heath-Brown–Moroz constant",], ["mrb_c", 0.18785964246206713, "S", "MRB constant",], ["prime_c", 0.41468250985111166, "ρ", "Prime constant",], ["somosQuadraticRecurrence_c", 1.6616879496335941, "σ", "Somos' quadratic recurrence constant",], ["foias_c", 1.1874523511265012, "α", "Foias constant",], ["logarithmicCapacityOfTheUnitDisk", 0.5901702995080481, "logarithmicCapacityOfTheUnitDisk", "Logarithmic capacity of the unit disk",], ["taniguchi_c", 0.6782344919173919, "taniguchi_c", "Taniguchi constant",], ["c_0", 299792458, "c₀", "speed of light in vacuum",], ["h", 6.62607015e-34, "ℎ", "Planck constant",], ["h_red", 1.0545718176461565e-34, "ℏ", "reduced Planck constant",], ["G", 6.6743e-11, "G", "Newtonian constant of gravitation",], ["eps_0", 8.8541878128e-12, "ε₀", "vacuum electric permittivity",], ["mu_0", 0.00000125663706212, "𝜇₀", "vacuum magnetic permeability",], ["Z_0", 376.730313668, "Z₀", "characteristic impedance of vacuum",], ["q_e", 1.602176634e-19, "qₑ", "elementary charge",], ["N_A", 6.02214076e+23, "Nₐ", "Avogadro constant",], ["k_B", 1.380649e-23, "k_B", "Boltzmann constant",], ["G_0", 0.00007748091729863649, "G₀", "conductance quantum",], ["K_J", 483597848416983.6, "Kⱼ", "Josephson constant",], ["k_e", 8987551792.3, "kₑ", "Coulomb constant",], ["R_K", 25812.807459304513, "Rₖ", "von Klitzing constant",], ["Phi_0", 2.0678338484619295e-15, "𝚽₀", "magnetic flux quantum",], ["m_e", 9.1093837015e-31, "mₑ", "electron mass",], ["m_p", 1.67262192369e-27, "mₚ", "proton mass",], ["m_n", 1.67492749804e-27, "mₙ", "neutron mass",], ["m_mu", 1.883531627e-28, "m𝜇", "muon mass",], ["m_tau", 3.16754e-27, "mτ", "tau mass",], ["mu_B", 9.274010078362164e-24, "𝜇_B", "Bohr magneton",], ["mu_N", 5.050783746096375e-27, "𝜇ₙ", "nuclear magneton",], ["alpha", 0.007297352569278033, "α", "fine-structure constant",], ["a_0", 5.2917721090608536e-11, "a₀", "Bohr radius",], ["r_e", 2.817940326204928e-15, "rₑ", "classical electron radius",], ["g_e", -2.00231930436256, "gₑ", "electron g-factor",], ["g_mu", -2.0023318418, "g𝜇", "muon g-factor",], ["g_p", 5.5856946893, "gₚ", "proton g-factor",], ["R_inf", 10973731.568072576, "R∞", "Rydberg constant",], ["E_h", 4.359744722172437e-18, "Eₕ", "Hartree energy",], ["sigma_e", 6.652458732173516e-29, "𝝈ₑ", "Thomson cross section",], ["m_u", 1.6605390666e-27, "mᵤ", "atomic mass constant",], ["F", 96485.33212331001, "F", "Faraday constant",], ["R", 8.31446261815324, "R", "molar gas constant",], ["M_u", 0.00099999999965, "Mᵤ", "molar mass constant",], ["sigma", 5.6703744191844294e-8, "𝝈", "Stefan–Boltzmann constant",], ["c_1", 3.7417718521927573e-16, "c₁", "first radiation constant",], ["c_1L", 1.1910429723971881e-16, "c_1L", "first radiation constant for spectral radiance ",], ["c_2", 0.014387768775039337, "c₂", "second radiation constant ",], ["b", 0.002897771955, "b", "Wien wavelength displacement law constant",], ["b_prime", 5.878925757e-10, "b'", "Wien frequency displacement law constant",], ["b_entropy", 0.003002916077, "b_entropy", "Wien entropy displacement law constant",], ["l_P", 1.616255e-35, "lₚ", "Planck length",], ["m_P", 2.176434e-8, "mₚ", "Planck mass",], ["t_P", 1.416784e+32, "tₚ", "Planck temperature",], ["T_P", 5.391247e-44, "Tₚ", "Planck time",], ["atm", 101325, "atm", "standard atmosphere",], ["g", 9.80665, "g", "standard acceleration of gravity",]
    ]
    let matchedConstants = []
    let error = 0.025 // Error margin
    for ( let i = 0; i < constants.length; i++ ) {
        let err = Math.abs( ( roundSig( constants[i][1], 14 ) - roundSig( Math.abs( x ), 14 ) ) / constants[i][1] )
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
    matchConstants( x )
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