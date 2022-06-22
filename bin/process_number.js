const { Ratio, Solution, SolutionArray } = require( "./types" )
const col = require( "./colors" )
const objects = require( "../data/objects" )
function print( x, color = "" ) { color == "" ? console.log( x, col.reset ) : console.log( color, x, col.reset ) }

function roundSig( n = 1, p = 14 ) { return parseFloat( n.toPrecision( p ) ) }
function roundFix( n = 1, p = 100 ) { return parseFloat( n.toFixed( p ) ) }

function levenshteinDistance( str1 = '', str2 = '' ) {
    const track = Array( str2.length + 1 ).fill( null ).map( () =>
        Array( str1.length + 1 ).fill( null ) )
    for ( let i = 0; i <= str1.length; i += 1 ) {
        track[0][i] = i
    }
    for ( let j = 0; j <= str2.length; j += 1 ) {
        track[j][0] = j
    }
    for ( let j = 1; j <= str2.length; j += 1 ) {
        for ( let i = 1; i <= str1.length; i += 1 ) {
            const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1
            track[j][i] = Math.min(
                track[j][i - 1] + 1, // deletion
                track[j - 1][i] + 1, // insertion
                track[j - 1][i - 1] + indicator, // substitution
            )
        }
    }
    return track[str2.length][str1.length]
};

const constants_multimatch = [[3.141592653589793, "π", "pi", "Pi"], [2.718281828459045, "e", "e", "Euler's number"], [1.618033988749895, "φ", "phi", "Phi, Golden ratio"], [9.869604401089358, "π²", "", ""], [7.3890560989306495, "e²", "", ""], [2.618033988749895, "φ²", "", ""], [31.006276680299816, "π³", "", ""], [20.085536923187664, "e³", "", ""], [4.23606797749979, "φ³", "", ""], [1.7724538509055159, "√π", "", ""], [1.6487212707001282, "√e", "", ""], [1.272019649514069, "√φ", "", ""]]

const constants_rationalize = [[1.4142135623730951, "√2", "", ""], [1.7320508075688772, "√3", "", ""], [2.23606797749979, "√5", "", ""], [2.449489742783178, "√6", "", ""], [2.6457513110645907, "√7", "", ""], [3.1622776601683795, "√10", "", ""], [3.3166247903554, "√11", "", ""], [3.605551275463989, "√13", "", ""], [3.7416573867739413, "√14", "", ""], [3.872983346207417, "√15", "", ""], [4.123105625617661, "√17", "", ""], [4.358898943540674, "√19", "", ""], [4.58257569495584, "√21", "", ""], [4.69041575982343, "√22", "", ""], [4.795831523312719, "√23", "", ""], [5.0990195135927845, "√26", "", ""], [5.385164807134504, "√29", "", ""], [5.477225575051661, "√30", "", ""], [5.5677643628300215, "√31", "", ""], [5.744562646538029, "√33", "", ""], [5.830951894845301, "√34", "", ""], [5.916079783099616, "√35", "", ""], [6.082762530298219, "√37", "", ""], [6.164414002968976, "√38", "", ""], [6.244997998398398, "√39", "", ""], [1.2599210498948732, "∛2", "", ""], [1.4422495703074083, "∛3", "", ""], [1.5874010519681996, "∛4", "", ""], [1.709975946676697, "∛5", "", ""], [1.8171205928321397, "∛6", "", ""], [1.9129311827723892, "∛7", "", ""], [2.080083823051904, "∛9", "", ""], [2.154434690031884, "∛10", "", ""]]

const constants_match = [[2.414213562373095, "δₛ", "silverRatio", "Silver ratio"], [1.0594630943592953, "2¹⸍¹²", "twelfthRootOf2", "Twelfth root of 2"], [1.465571231876768, "ψ", "supergoldenRatio", "Supergolden ratio"], [1.8477590650225735, "μ", "connectiveHexLattice_c", "Connective constant for the hexagonal lattice"], [0.1149420448532962, "K′", "keplerBouwkamp_c", "Kepler-Bouwkamp constant"], [2.0945514815423265, "wallis_c", "wallis_c", "Wallis's constant"], [0.6931471805599453, "ln2", "ln2", "Natural logarithm of 2"], [2.6220575542921196, "ϖ", "lemniscate_c", "Lemniscate constant"], [0.5772156649015329, "γ", "euler_c", "Euler's constant"], [1.6066951524152917, "E", "erdosBorwein_c", "Erdős-Borwein constant"], [0.5671432904097838, "Ω", "omega_c", "Omega constant"], [1.2020569031595942, "ζ(3)", "apery_c", "Apéry's constant"], [0.6627434193491816, "laplaceLimit", "laplaceLimit", "Laplace limit"], [1.451369234883381, "μ", "ramanujanSoldner_c", "Ramanujan-Soldner constant"], [0.8346268416740732, "G", "gauss_c", "Gauss's constant"], [1.1547005383792515, "γ₂", "secondHermite_c", "Second Hermite constant"], [0.110001, "L", "liouville_c", "Liouville's constant"], [0.697774657964008, "C₁", "firstContinuedFraction_c", "First continued fraction constant"], [262537412640768740, "ramanujan_c", "ramanujan_c", "Ramanujan's constant"], [1.2824271291006226, "A", "glaisherKinkelin_c", "Glaisher-Kinkelin constant"], [0.915965594177219, "G", "catalan_c", "Catalan's constant"], [0.7390851332151607, "dottieₙ", "dottie_n", "Dottie number"], [0.26149721284764277, "M", "meisselMertens_c", "Meissel-Mertens constant"], [2.295587149392638, "P", "universalParabolic_c", "Universal parabolic constant"], [0.643410546288338, "C", "cahen_c", "Cahen's constant"], [23.14069263277927, "e^π", "gelfond_c", "Gelfond's constant"], [2.665144142690225, "2^√2", "gelfondSchneider_c", "Gelfond-Schneider constant"], [1.2337005501361697, "K₂", "secondFavard_c", "Second Favard constant"], [2.3999632297286535, "g", "goldenAngle", "Golden angle"], [2.5849817595792532, "K", "sierpinski_c", "Sierpiński's constant"], [0.7642236535892206, "K", "landauRamanujan_c", "Landau-Ramanujan constant"], [0.8224670334241132, "a₁", "firstNielsenRamanujan_c", "First Nielsen-Ramanujan constant"], [1.0149416064096537, "G", "gieseking_c", "Gieseking constant"], [0.2801694990238691, "β", "bernstein_c", "Bernstein's constant"], [1.8392867552141612, "tribonacci_c", "tribonacci_c", "Tribonacci constant"], [1.902160583104, "B₂", "brun_c", "Brun's constant"], [0.6601618158468696, "C₂", "twinPrimes_c", "Twin primes constant"], [1.324717957244746, "ρ", "plastic_n", "Plastic number"], [1.9599639845400543, "z₀.₉₇₅", "z0975", "Z score for the 975 percentile point"], [0.4124540336401076, "τ", "prouhetThueMorse_c", "Prouhet-Thue-Morse constant"], [0.6243299885435508, "λ", "golombDickman_c", "Golomb-Dickman constant"], [0.9894312738311469, "c", "asymptoticBehaviorOfLebesgueConstants_c", "Constant related to the asymptotic behavior of Lebesgue constants"], [0.6613170494696223, "C_FT", "fellerTornier_c", "Feller-Tornier constant"], [0.12345678910111213, "C₁₀", "base10Champernowne_c", "Base 10 Champernowne constant"], [1.1762808182599176, "σ₁₀", "salem_c", "Salem constant"], [2.6854520010653062, "K₀", "khinchin_c", "Khinchin's constant"], [1.1865691104156255, "β", "levyConstant_1", "Lévy's constant (1)"], [3.2758229187218113, "e^β", "levyConstant_2", "Lévy's constant (2)"], [0.23571113171923294, "C_CE", "copelandErdos_c", "Copeland-Erdős constant"], [1.3063778838630806, "A", "mills_c", "Mills' constant"], [0.5963473623231941, "δ", "gompertz_c", "Gompertz constant"], [4.532360141827194, "π/ln2", "vanDerPauw_c", "Van der Pauw constant"], [0.9553166181245093, "θₘ", "magicAngle", "Magic angle"], [0.37395581361920227, "Cₐᵣₜᵢₙ", "artin_c", "Artin's constant"], [1.4670780794339755, "C", "porter_c", "Porter's constant"], [0.9702701143920339, "L", "lochs_c", "Lochs constant"], [1.0074347568842794, "devicciTesseract_c", "devicciTesseract_c", "DeVicci's tesseract constant"], [1.539600717839002, "liebSquareIce_c", "liebSquareIce_c", "Lieb's square ice constant"], [1.7052111401053678, "C", "niven_c", "Niven's constant"], [0.5759599688929454, "stephens_c", "stephens_c", "Stephens' constant"], [0.8507361882018672, "P", "regularPaperfoldingSequence", "Regular paperfolding sequence"], [3.3598856662431777, "ψ", "reciprocalFibonacci_c", "Reciprocal Fibonacci constant"], [4.66920160910299, "δ", "feig_delta", "Feigenbaum constant δ"], [0.6617071822671763, "Δ(3)", "robbins_c", "Robbins constant"], [0.47494937998792064, "weierstrass_c", "weierstrass_c", "Weierstrass constant"], [2.8077702420285195, "F", "fransenRobinson_c", "Fransén-Robinson constant"], [0.6309297535714574, "log₃2", "fractalDimensionOfTheCantorSet", "Fractal dimension of the Cantor set"], [2.5029078750958926, "α", "feig_alpha", "Feigenbaum constant α"], [0.19452804946532512, "C₂", "secondDuBoisReymond_c", "Second du Bois-Reymond constant"], [0.860713320559342, "δ", "erdosTenenbaumFord_c", "Erdős-Tenenbaum-Ford constant"], [1.3035772690342964, "λ", "conway_c", "Conway's constant"], [1.305686729, "fractDimApollo", "fractDimApollo", "Fractal dimension of the Apollonian packing of circles"], [0.353236371854996, "σ", "hafnerSarnakMccurley_c", "Hafner-Sarnak-McCurley constant"], [1.584962500721156, "log₂3", "hausdorffDimensionOfTheSierpinskiTriangle", "Hausdorff dimension of the Sierpinski triangle"], [1.4560749485826896, "B", "backhouse_c", "Backhouse's constant"], [1.1319882487943, "viswanath_c", "viswanath_c", "Viswanath constant"], [1.787231650182966, "q", "komornikLoreti_c", "Komornik-Loreti constant"], [0.70258, "β*", "embreeTrefethen_c", "Embree-Trefethen constant"], [0.001317641154853178, "C", "heathBrownMoroz_c", "Heath-Brown-Moroz constant"], [0.18785964246206713, "S", "mrb_c", "MRB constant"], [0.41468250985111166, "ρ", "prime_c", "Prime constant"], [1.6616879496335941, "σ", "somosQuadraticRecurrence_c", "Somos' quadratic recurrence constant"], [1.1874523511265012, "α", "foias_c", "Foias constant"], [0.5901702995080481, "logCapUnitDisk", "logCapUnitDisk", "Logarithmic capacity of the unit disk"], [0.6782344919173919, "taniguchi_c", "taniguchi_c", "Taniguchi constant"], [299792458, "c₀", "c_0", "speed of light in vacuum"], [6.62607015e-34, "ℎ", "h", "Planck constant"], [1.0545718176461565e-34, "ℏ", "h_red", "reduced Planck constant"], [6.6743e-11, "G", "G", "Newtonian constant of gravitation"], [8.8541878128e-12, "ε₀", "eps_0", "vacuum electric permittivity"], [0.00000125663706212, "𝜇₀", "mu_0", "vacuum magnetic permeability"], [376.730313668, "Z₀", "Z_0", "characteristic impedance of vacuum"], [1.602176634e-19, "qₑ", "q_e", "elementary charge"], [6.02214076e+23, "Nₐ", "N_A", "Avogadro constant"], [1.380649e-23, "k_B", "k_B", "Boltzmann constant"], [0.00007748091729863649, "G₀", "G_0", "conductance quantum"], [483597848416983.6, "Kⱼ", "K_J", "Josephson constant"], [8987551792.3, "kₑ", "k_e", "Coulomb constant"], [25812.807459304513, "Rₖ", "R_K", "von Klitzing constant"], [2.0678338484619295e-15, "𝚽₀", "Phi_0", "magnetic flux quantum"], [9.1093837015e-31, "mₑ", "m_e", "electron mass"], [1.67262192369e-27, "mₚ", "m_p", "proton mass"], [1.67492749804e-27, "mₙ", "m_n", "neutron mass"], [1.883531627e-28, "m𝜇", "m_mu", "muon mass"], [3.16754e-27, "mτ", "m_tau", "tau mass"], [9.274010078362164e-24, "𝜇_B", "mu_B", "Bohr magneton"], [5.050783746096375e-27, "𝜇ₙ", "mu_N", "nuclear magneton"], [0.007297352569278033, "α", "alpha", "fine-structure constant"], [5.2917721090608536e-11, "a₀", "a_0", "Bohr radius"], [2.817940326204928e-15, "rₑ", "r_e", "classical electron radius"], [-2.00231930436256, "gₑ", "g_e", "electron g-factor"], [-2.0023318418, "g𝜇", "g_mu", "muon g-factor"], [5.5856946893, "gₚ", "g_p", "proton g-factor"], [10973731.568072576, "R∞", "R_inf", "Rydberg constant"], [4.359744722172437e-18, "Eₕ", "E_h", "Hartree energy"], [6.652458732173516e-29, "𝝈ₑ", "sigma_e", "Thomson cross section"], [1.6605390666e-27, "mᵤ", "m_u", "atomic mass constant"], [96485.33212331001, "F", "F", "Faraday constant"], [8.31446261815324, "R", "R", "molar gas constant"], [0.00099999999965, "Mᵤ", "M_u", "molar mass constant"], [5.6703744191844294e-8, "𝝈", "sigma", "Stefan–Boltzmann constant"], [3.7417718521927573e-16, "c₁", "c_1", "first radiation constant"], [1.1910429723971881e-16, "c_1L", "c_1L", "first radiation constant for spectral radiance "], [0.014387768775039337, "c₂", "c_2", "second radiation constant "], [0.002897771955, "b", "b", "Wien wavelength displacement law constant"], [5.878925757e-10, "b′", "b_prime", "Wien frequency displacement law constant"], [0.003002916077, "b_entropy", "b_entropy", "Wien entropy displacement law constant"], [1.616255e-35, "lₚ", "l_P", "Planck length"], [2.176434e-8, "mₚ", "m_P", "Planck mass"], [1.416784e+32, "tₚ", "t_P", "Planck temperature"], [5.391247e-44, "Tₚ", "T_P", "Planck time"], [101325, "atm", "atm", "standard atmosphere"], [9.80665, "g", "g", "standard acceleration of gravity"]]



// FUNCTIONS
//////////////////////////////////////////////////////////////////////////////////

/* Rationalisation Transfer Format: class Ratio()
[ {
    num: numerator (number),
    denom: denominator (number),
    symbol: symbol of constant (string). empty if not applicable,
    desc: description of the constant (string). empty if not applicable,
    err: error,
    isInv: is it divided by the constant? (boolean)
}, ... ]
*/

function fractionComplexitySquareWeight( num, denom ) { return ( num * num + denom * denom ) }
function fractionComplexityAdditiveWeight( num, denom ) { return ( Math.abs( num ) + Math.abs( denom ) ) }
function sortErrorFilter( arr, maxResults = 1 ) { return arr.sort( ( a, b ) => ( a.err - b.err ) ).filter( ( val, i ) => ( i < maxResults || val.err == 0 ) ) }

function processNumber( x, maxResults = 5, maxError = 0.5 ) {
    // Get All Results, apply the corresponding weighing fuctions
    let multimatchResults = rationalizeMultimatch( x )
    multimatchResults = sortErrorFilter( multimatchResults.map( x => x.applySquareErrorWeight() ), 2 )
    let constantRatioResults = rationalizeConstants( x )
    constantRatioResults = sortErrorFilter( constantRatioResults.map( x => x.applySquareErrorWeight() ), 1 )
    let rationalizeResults = rationalize( x )
    rationalizeResults = rationalizeResults.map( x => x.applyAdditiveErrorWeight() )
    let constantMatchResults = matchConstants( x )

    // Merge all of them into one
    let mergedResults = []
    mergedResults.push( ...rationalizeResults, ...multimatchResults, ...constantRatioResults, ...constantMatchResults )

    // Sort and limit the length
    mergedResults = mergedResults.sort( ( a, b ) => {
        let errDiff = ( a.err - b.err )
        if ( errDiff == 0 ) errDiff = fractionComplexityAdditiveWeight( b.num, b.denom ) - fractionComplexityAdditiveWeight( a.num, a.denom )
        return errDiff
    } ).filter( ( val, i ) => ( i < maxResults || val.err == 0 ) && val.err < maxError )

    for ( let i = 0; i < mergedResults.length; i++ ) {
        const ratio = mergedResults[i]
        if ( !ratio.isNull ) print( ( ratio.err == 0 ? " = " : " ≈ " ) + ratio.toString( false ), ratio.err == 0 ? col.mathResult : col.mathOtherResult )
    }

}

function processNumberMinimal( x, maxResults = 1, maxError = 0.01 ) {
    // Get All Results, apply the corresponding weighing fuctions
    let multimatchResults = rationalizeMultimatch( x )
    multimatchResults = sortErrorFilter( multimatchResults.map( x => { x.err *= fractionComplexitySquareWeight( x.num, x.denom ); return x } ), 1 )
    let constantRatioResults = rationalizeConstants( x )
    constantRatioResults = sortErrorFilter( constantRatioResults.map( x => { x.err *= fractionComplexitySquareWeight( x.num, x.denom ); return x } ), 1 )
    let mergedResults = [...multimatchResults, ...constantRatioResults]

    // Sort and limit the length
    mergedResults = mergedResults.sort( ( a, b ) => ( a.err - b.err ) ).filter( ( val, i ) => ( ( i < maxResults && val.num * val.denom != 0 ) || val.err == 0 ) && val.err < maxError )
    mergedResults = mergedResults.map( x => new Ratio( x ) )

    let str = ""
    if ( mergedResults.length > 0 ) {
        if ( mergedResults[0].err == 0 ) str += col.mathRegular + "= "
        else str += col.mathRegular + col.dim + "≈ "
        for ( let i = 0; i < mergedResults.length; i++ ) {
            let ratio = mergedResults[i]
            str += ratio.toString()
            if ( i < mergedResults.length - 1 ) str += " = "
        }
    }

    return str
}

//Number Transfer Format: class Solution []
function printNumbers( solArr = [new Solution()] ) {

    let maxLength = 0
    let hasNeg

    for ( let i = 0; i < solArr.length; i++ ) {
        maxLength = Math.max( maxLength, solArr[i].abslength )
        hasNeg = solArr[i].value < 0 || hasNeg
    }

    for ( let i = 0; i < solArr.length; i++ ) {
        const sol = solArr[i]
        print(
            ( sol.value >= 0 && hasNeg ? " " : "" ) + // if not negative add padding (only if negative numbers exist)
            sol.value +
            " ".repeat( maxLength - sol.abslength + 1 ) +
            processNumberMinimal( sol.value ),
            sol.accurate ? col.mathResult : col.mathOtherResult
        )
    }

}

function rationalizeMultimatch( x, maxFrac = 64 ) {

    const checkConstants = constants_multimatch.map( c => x / c[0] )
    const checkConstantInverses = constants_multimatch.map( c => x * c[0] )
    let constFractions = []

    {
        let error = 0.05
        if ( Math.round( x ) == x ) error = 0
        for ( let factor = 1; ( factor <= maxFrac && error > 0 ); factor++ ) {

            let errConstantsDenom = checkConstants.map( check => Math.abs( roundSig( Math.round( check * factor ) / factor, 14 ) - roundSig( check, 14 ) ) )
            let errConstantsInversesDenom = checkConstantInverses.map( check => Math.abs( roundSig( Math.round( check * factor ) / factor, 14 ) - roundSig( check, 14 ) ) )
            let errConstantsNum = checkConstants.map( check => Math.abs( roundSig( factor / Math.round( factor / check ), 14 ) - roundSig( check, 14 ) ) )
            let errConstantsInversesNum = checkConstantInverses.map( check => Math.abs( roundSig( factor / Math.round( factor / check ), 14 ) - roundSig( check, 14 ) ) )

            for ( let i = 0; i < errConstantsDenom.length; i++ ) {
                //if ( Math.max( Math.abs( factor / checkConstants[i] ), Math.abs( factor / checkConstantInverses[i] ), Math.abs( factor * checkConstants[i] ), Math.abs( factor * checkConstantInverses[i] ) ) > Number.MAX_SAFE_INTEGER ) print( "test" )
                if (
                    errConstantsDenom[i] < error || errConstantsInversesDenom[i] < error ||
                    errConstantsNum[i] < error || errConstantsInversesNum[i] < error
                ) {

                    let denomErr = Math.min( errConstantsDenom[i], errConstantsInversesDenom[i] )
                    let numErr = Math.min( errConstantsNum[i], errConstantsInversesNum[i] )
                    let thisError = Math.min( numErr, denomErr )

                    let fraction = []
                    let isInverse = false
                    if ( numErr < denomErr ) {
                        if ( errConstantsNum[i] <= errConstantsInversesNum[i] ) {
                            fraction = [factor, Math.round( factor / checkConstants[i] )]
                        } else {
                            fraction = [factor, Math.round( factor / checkConstantInverses[i] )]
                            isInverse = true
                        }
                    } else {
                        if ( errConstantsDenom[i] <= errConstantsInversesDenom[i] ) {
                            fraction = [Math.round( checkConstants[i] * factor ), factor]
                        } else {
                            fraction = [Math.round( checkConstantInverses[i] * factor ), factor]
                            isInverse = true
                        }
                    }

                    constFractions.push( [
                        fraction[0],
                        fraction[1],
                        constants_multimatch[i][1],
                        thisError,
                        isInverse
                    ] )

                    error = thisError

                }
            }

        }
    }

    let returnArr = constFractions.map( ele =>
        new Ratio( {
            num: ele[0],
            denom: ele[1],
            err: ele[3],
            isInv: ele[4],
            symbol: ele[2],
            desc: "",
        } )
    )

    // Stop inaccuracies with high numbers (with 2**45 it ensures 8 decimal digits are being matched)
    returnArr = returnArr.filter( ele => ele.maxValue <= 2 ** 45 )

    return returnArr
}

function rationalizeConstants( x, maxFrac = 32 ) {

    const checkConstants = constants_rationalize.map( c => x / c[0] )
    const checkConstantInverses = constants_rationalize.map( c => x * c[0] )
    let constFractions = []

    {
        let error = 0.05
        if ( Math.round( x ) == x ) error = 0
        for ( let factor = 1; ( factor <= maxFrac && error > 0 ); factor++ ) {

            let errConstantsDenom = checkConstants.map( check => Math.abs( Math.round( check * factor ) - roundSig( check * factor, 14 ) ) )
            let errConstantsInversesDenom = checkConstantInverses.map( check => Math.abs( Math.round( check * factor ) - roundSig( check * factor, 14 ) ) )
            let errConstantsNum = checkConstants.map( check => Math.abs( Math.round( factor / check ) - roundSig( factor / check, 14 ) ) )
            let errConstantsInversesNum = checkConstantInverses.map( check => Math.abs( Math.round( factor / check ) - roundSig( factor / check, 14 ) ) )

            for ( let i = 0; i < errConstantsDenom.length; i++ ) {
                if ( // Some error is smaller
                    errConstantsDenom[i] < error || errConstantsInversesDenom[i] < error ||
                    errConstantsNum[i] < error || errConstantsInversesNum[i] < error
                ) {

                    let denomErr = Math.min( errConstantsDenom[i], errConstantsInversesDenom[i] )
                    let numErr = Math.min( errConstantsNum[i], errConstantsInversesNum[i] )
                    let thisError = Math.min( numErr, denomErr )

                    let fraction = []
                    let isInverse = false
                    if ( numErr < denomErr ) {
                        if ( errConstantsNum[i] <= errConstantsInversesNum[i] ) {
                            fraction = [factor, Math.round( factor / checkConstants[i] )]
                        } else {
                            fraction = [factor, Math.round( factor / checkConstantInverses[i] )]
                            isInverse = true
                        }
                    } else {
                        if ( errConstantsDenom[i] <= errConstantsInversesDenom[i] ) {
                            fraction = [Math.round( checkConstants[i] * factor ), factor]
                        } else {
                            fraction = [Math.round( checkConstantInverses[i] * factor ), factor]
                            isInverse = true
                        }
                    }

                    constFractions.push( [
                        fraction[0],
                        fraction[1],
                        constants_rationalize[i][1],
                        thisError,
                        isInverse
                    ] )

                    error = thisError

                }
            }

        }
    }

    let returnArr = constFractions.map( ele =>
        new Ratio( {
            num: ele[0],
            denom: ele[1],
            err: ele[3],
            isInv: ele[4],
            symbol: ele[2],
            desc: "",
        } )
    )

    // Stop inaccuracies with high numbers (with 2**45 it ensures 8 decimal digits are being matched)
    returnArr = returnArr.filter( ele => ele.maxValue <= 2 ** 45 )

    return returnArr
}


function matchConstants( x, maxError = 0.025 ) {

    let matchedConstants = []
    let error = maxError // Error margin
    for ( let i = 0; i < constants_match.length; i++ ) {
        let err = Math.abs( ( roundSig( constants_match[i][0], 14 ) - roundSig( Math.abs( x ), 14 ) ) / constants_match[i][0] )
        let neg = x * constants_match[i][0] < 0 // is negative?
        if ( err < error ) {
            matchedConstants.push( [...constants_match[i], err, neg] )
            error = err
        }
    }

    let returnArr = matchedConstants.map( ele =>
        new Ratio( {
            num: 1 * ( ele[5] ? -1 : 1 ),
            denom: 1,
            err: ele[4],
            isInv: false,
            symbol: ele[1],
            desc: ele[3],
        } )
    )

    return returnArr
}

/* function rationalize( x, maxDenominator = 16777216 ) {
    if ( Math.round( x ) == x ) return []

    let fractions = []
    let error = 0.25
    for ( let i = 1; ( i <= maxDenominator && error > 0 ); i++ ) {
        let err = Math.abs( Math.round( x * i ) - ( x * i ) )
        if ( err < error ) {
            // [Zähler, Nenner]
            fractions.push( [Math.round( x * i ), i, err] )
            error = err
        }
    }

    let returnArr = fractions.map( ( ele, i ) => {
        return {
            num: ele[0],
            denom: ele[1],
            symbol: "",
            desc: "",
            err: ele[2],
            isInv: false
        }
    } )

    returnArr = returnArr.filter( ele => Math.abs( ele.num ) <= Number.MAX_SAFE_INTEGER && Math.abs( ele.denom ) <= Number.MAX_SAFE_INTEGER )

    return returnArr
} */
function rationalize( x, maxFrac = 65536 ) {
    if ( Math.round( x ) == x ) return []

    let fractions = []
    let error = 0.25
    for ( let i = 1; ( i <= maxFrac && error > 0 ); i++ ) {
        let errDenom = Math.abs( Math.round( x * i ) / i - x )
        let errNum = Math.abs( i / Math.round( i / x ) - x )
        if ( errNum < error || errDenom < error ) {
            // [Zähler, Nenner]
            fractions.push(
                errDenom < errNum ?
                    [Math.round( x * i ), i, errDenom] :
                    [i, Math.round( i / x ), errNum]
            )
            error = Math.min( errDenom, errNum )
        }
    }

    let returnArr = fractions.map( ele =>
        new Ratio( {
            num: ele[0],
            denom: ele[1],
            err: ele[2],
            isInv: false,
            symbol: "",
            desc: "",
        } )
    )

    returnArr = returnArr.filter( ele => ele.maxValue <= Number.MAX_SAFE_INTEGER + 1 )

    return returnArr
}

function searchRelevance( searchStr = "", targetStr = "" ) {
    let searchWords = searchStr.toLowerCase().split( /[\s\-(),]+/g )
    let targetWords = targetStr.toLowerCase().split( /[\s\-(),]+/g )

    /* IDEA:
    For every word in the seach term, we look for the closest matching target word
    Then we simply add up the errors
    */

    let totalError = 0
    for ( let i = 0; i < searchWords.length; i++ ) {
        const searchWord = searchWords[i]
        let closestMatch = Infinity
        for ( let o = 0; o < targetWords.length; o++ ) {
            const targetWord = targetWords[o]
            closestMatch = Math.min( closestMatch, levenshteinDistance( searchWord, targetWord ) )
        }
        totalError += closestMatch
    }

    return 1. / ( totalError + 1 )
}

function searchConstants( str = "", maxResults = 5 ) {
    let results = []

    for ( let i = 0; i < constants_match.length; i++ ) {

        // Description + Variable Name
        const target = constants_match[i][3] + " " + constants_match[i][2]
        results.push( [...constants_match[i], 1 - searchRelevance( str, target )] )

    }

    results.sort( ( a, b ) => ( a[4] - b[4] ) + 0.0 * ( a[2].length - b[2].length ) )
    results = results.filter( ( x, i ) => i < maxResults || ( i < maxResults * 2 && x[4] <= .5 ) || ( i < maxResults * 3 && x[4] == 0 ) )

    if ( results.length > 0 ) {
        const maxStringLengths = results.reduce( ( prev, curr ) => [...curr.map( ( x, i ) => Math.max( x.toString().length, prev[i] ) )], results[0].map( x => 0 ) )
        for ( let i = 0; i < Math.min( results.length, maxResults * 3 ); i++ ) {
            print( `${results[i][3]}\n${col.FgYellow + results[i][1] + " ".repeat( maxStringLengths[1] - results[i][1].toString().length )} = ${results[i][0] + " ".repeat( maxStringLengths[0] - results[i][0].toString().length )} ${col.reset + col.dim}Internal Variable Name: ${results[i][2]}`, col.mathRegular )
        }
    } else {
        print( "No Results" )
    }

}


function printObject( obj = {}, units = {} ) {
    let str = ""
    const keys = Object.getOwnPropertyNames( obj ).sort()

    let calc = {}
    for ( let i = 0; i < keys.length; i++ ) calc[keys[i]] = obj[keys[i]]

    if ( calc.radius ) { calc.area = sphereArea( calc.radius ); calc.volume = sphereVol( calc.radius ) }
    if ( calc.volume && calc.mass ) { calc.density = calc.mass / calc.volume }
    if ( calc.volume && calc.density ) { calc.mass = calc.density * calc.volume }
    if ( calc.mass && calc.density ) { calc.volume = calc.mass / calc.density }
    if ( calc.radius && calc.mass ) { calc.gravity = surfaceGrav( calc.radius, calc.mass ) }


    if ( obj.name ) str += col.FgYellow + obj.name + col.reset + "\n"
    for ( let i = 0; i < keys.length; i++ ) {
        if ( keys[i] == "name" ) continue
        const val = obj[keys[i]]
        str += `${keys[i].split( "_" ).map( str => str[0].toUpperCase() + str.substr( 1 ) ).join( " " )}: `
        if ( typeof val == "number" || typeof val == "bigint" ) str += col.FgGreen
        if ( typeof val == "string" ) str += col.FgYellow
        if ( typeof val == "boolean" ) str += col.FgBlue
        if ( !val ) str += col.reset + col.dim
        if ( !val ) {
            if ( calc[keys[i]] ) str += `${roundSig( calc[keys[i]], 6 )} ${units[keys[i]]} Calculated from other Properties, assuming sphere`
            else str += "Not Available"
        } else {
            str += `${val}${col.reset}${units[keys[i]]}`
        }
        str += "\n" + col.reset
    }
    return str
}

function fillPlanetValues( obj = {} ) {
    // Assuming SI Units!!

    const keys = Object.getOwnPropertyNames( obj )

    let a = {} // Available Data
    for ( let i = 0; i < keys.length; i++ ) a[keys[i]] = !!obj[keys[i]]

    for ( let i = 0; i < keys.length; i++ ) {
        const key = keys[i]
        if ( a[key] ) continue

        switch ( key ) {
            case "radius":
                break
            case "volume":
                if ( a.radius ) obj.volume = sphereVol( obj.radius )
                break
            case "area":
                if ( a.radius ) obj.volume = sphereArea( obj.radius )
                break
            case "mass":
                break
            case "density":
                if ( a.mass && a.volume ) obj.volume = obj.mass / obj.volume
                if ( a.mass && a.radius ) obj.volume = obj.mass / sphereVol( obj.radius )
                break
            case "gravity":
                if ( a.mass && a.radius ) obj.gravity = surfaceGrav( obj.radius, obj.mass )
                break
        }
    }

    return obj
}

function searchConstants( searchStr = "", maxResults = 1 ) {
    let resultPointers = []

    for ( let i = 0; i < objects.solar_system_small_bodies.length; i++ ) {
        resultPointers.push( [i, searchRelevance( searchStr, objects.solar_system_small_bodies[i].name + " " + objects.solar_system_small_bodies[i].description )] )
    }

    resultPointers.sort( ( a, b ) => b[1] - a[1] )
    resultPointers = resultPointers.filter( ( x, i ) => i < maxResults || ( i < maxResults * 5 && x[1] >= .5 ) || x[1] == 1 )

    if ( resultPointers.length > 0 ) {
        for ( let i = 0; i < resultPointers.length; i++ ) {
            if ( i < maxResults ) print( printObject( objects.solar_system_small_bodies[resultPointers[i][0]], objects.solar_system_small_bodies_units ) )
            else print( objects.solar_system_small_bodies[resultPointers[i][0]].name + col.reset + col.dim + " " + objects.solar_system_small_bodies[resultPointers[i][0]].description, col.FgYellow )
        }
    } else {
        print( "No Results" )
    }
}

function sphereVol( rad = 1 ) { return 4 / 3 * Math.PI * rad * rad * rad }
function sphereArea( rad = 1 ) { return 4 * rad * rad * Math.PI }
function densityMV( mass = 1, vol = 1 ) { return mass / vol }
function surfaceGrav( rad = 1, mass = 1 ) { return 6.67430e-11 * mass / ( rad * rad ) }

module.exports = {
    processNumber,
    processNumberMinimal,
    printNumbers,
    searchConstants,

    constants_multimatch,
    constants_rationalize,
    constants_match,
}