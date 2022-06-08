const col = require( "./colors" )
function print( x, color = "" ) { console.log( `${color}${x}${col.reset}` ) }

function roundSig( n, p ) { return parseFloat( n.toPrecision( p ) ) }
function roundFix( n, p ) { return parseFloat( n.toFixed( p ) ) }

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

const constants_multimatch = [[3.141592653589793, "π", "pi", "Pi"], [2.718281828459045, "e", "e", "Euler's number"], [1.618033988749895, "φ", "phi", "Phi, Golden ratio"], [9.869604401089358, "π²", false, false], [7.3890560989306495, "e²", false, false], [2.618033988749895, "φ²", false, false], [31.006276680299816, "π³", false, false], [20.085536923187664, "e³", false, false], [4.23606797749979, "φ³", false, false], [1.7724538509055159, "√π", false, false], [1.6487212707001282, "√e", false, false], [1.272019649514069, "√φ", false, false]]

const constants_rationalize = [[1.4142135623730951, "√2", false, false], [1.7320508075688772, "√3", false, false], [2.23606797749979, "√5", false, false], [2.449489742783178, "√6", false, false], [2.6457513110645907, "√7", false, false], [3.1622776601683795, "√10", false, false], [3.3166247903554, "√11", false, false], [3.605551275463989, "√13", false, false], [3.7416573867739413, "√14", false, false], [3.872983346207417, "√15", false, false], [4.123105625617661, "√17", false, false], [4.358898943540674, "√19", false, false], [4.58257569495584, "√21", false, false], [4.69041575982343, "√22", false, false], [4.795831523312719, "√23", false, false], [5.0990195135927845, "√26", false, false], [5.385164807134504, "√29", false, false], [5.477225575051661, "√30", false, false], [5.5677643628300215, "√31", false, false], [5.744562646538029, "√33", false, false], [5.830951894845301, "√34", false, false], [5.916079783099616, "√35", false, false], [6.082762530298219, "√37", false, false], [6.164414002968976, "√38", false, false], [6.244997998398398, "√39", false, false], [1.2599210498948732, "∛2", false, false], [1.4422495703074083, "∛3", false, false], [1.5874010519681996, "∛4", false, false], [1.709975946676697, "∛5", false, false], [1.8171205928321397, "∛6", false, false], [1.9129311827723892, "∛7", false, false], [2.080083823051904, "∛9", false, false], [2.154434690031884, "∛10", false, false]]

const constants_match = [[2.414213562373095, "δₛ", "silverRatio", "Silver ratio"], [1.0594630943592953, "2¹⸍¹²", "twelfthRootOf2", "Twelfth root of 2"], [1.465571231876768, "ψ", "supergoldenRatio", "Supergolden ratio"], [1.8477590650225735, "μ", "connectiveHexLattice_c", "Connective constant for the hexagonal lattice"], [0.1149420448532962, "K′", "keplerBouwkamp_c", "Kepler-Bouwkamp constant"], [2.0945514815423265, "wallis_c", "wallis_c", "Wallis's constant"], [0.6931471805599453, "ln2", "naturalLogarithmOf2", "Natural logarithm of 2"], [2.6220575542921196, "ϖ", "lemniscate_c", "Lemniscate constant"], [0.5772156649015329, "γ", "euler_c", "Euler's constant"], [1.6066951524152917, "E", "erdosBorwein_c", "Erdős-Borwein constant"], [0.5671432904097838, "Ω", "omega_c", "Omega constant"], [1.2020569031595942, "ζ(3)", "apery_c", "Apéry's constant"], [0.6627434193491816, "laplaceLimit", "laplaceLimit", "Laplace limit"], [1.451369234883381, "μ", "ramanujanSoldner_c", "Ramanujan-Soldner constant"], [0.8346268416740732, "G", "gauss_c", "Gauss's constant"], [1.1547005383792515, "γ₂", "secondHermite_c", "Second Hermite constant"], [0.110001, "L", "liouville_c", "Liouville's constant"], [0.697774657964008, "C₁", "firstContinuedFraction_c", "First continued fraction constant"], [262537412640768740, "ramanujan_c", "ramanujan_c", "Ramanujan's constant"], [1.2824271291006226, "A", "glaisherKinkelin_c", "Glaisher-Kinkelin constant"], [0.915965594177219, "G", "catalan_c", "Catalan's constant"], [0.7390851332151607, "dottieₙ", "dottie_n", "Dottie number"], [0.26149721284764277, "M", "meisselMertens_c", "Meissel-Mertens constant"], [2.295587149392638, "P", "universalParabolic_c", "Universal parabolic constant"], [0.643410546288338, "C", "cahen_c", "Cahen's constant"], [23.14069263277927, "e^π", "gelfond_c", "Gelfond's constant"], [2.665144142690225, "2^√2", "gelfondSchneider_c", "Gelfond-Schneider constant"], [1.2337005501361697, "K₂", "secondFavard_c", "Second Favard constant"], [2.3999632297286535, "g", "goldenAngle", "Golden angle"], [2.5849817595792532, "K", "sierpinski_c", "Sierpiński's constant"], [0.7642236535892206, "K", "landauRamanujan_c", "Landau-Ramanujan constant"], [0.8224670334241132, "a₁", "firstNielsenRamanujan_c", "First Nielsen-Ramanujan constant"], [1.0149416064096537, "G", "gieseking_c", "Gieseking constant"], [0.2801694990238691, "β", "bernstein_c", "Bernstein's constant"], [1.8392867552141612, "tribonacci_c", "tribonacci_c", "Tribonacci constant"], [1.902160583104, "B₂", "brun_c", "Brun's constant"], [0.6601618158468696, "C₂", "twinPrimes_c", "Twin primes constant"], [1.324717957244746, "ρ", "plastic_n", "Plastic number"], [1.9599639845400543, "z₀.₉₇₅", "z0975", "Z score for the 975 percentile point"], [0.4124540336401076, "τ", "prouhetThueMorse_c", "Prouhet-Thue-Morse constant"], [0.6243299885435508, "λ", "golombDickman_c", "Golomb-Dickman constant"], [0.9894312738311469, "c", "asymptoticBehaviorOfLebesgueConstants_c", "Constant related to the asymptotic behavior of Lebesgue constants"], [0.6613170494696223, "C_FT", "fellerTornier_c", "Feller-Tornier constant"], [0.12345678910111213, "C₁₀", "base10Champernowne_c", "Base 10 Champernowne constant"], [1.1762808182599176, "σ₁₀", "salem_c", "Salem constant"], [2.6854520010653062, "K₀", "khinchin_c", "Khinchin's constant"], [1.1865691104156255, "β", "levyConstant_1", "Lévy's constant (1)"], [3.2758229187218113, "e^β", "levyConstant_2", "Lévy's constant (2)"], [0.23571113171923294, "C_CE", "copelandErdos_c", "Copeland-Erdős constant"], [1.3063778838630806, "A", "mills_c", "Mills' constant"], [0.5963473623231941, "δ", "gompertz_c", "Gompertz constant"], [4.532360141827194, "π/ln2", "vanDerPauw_c", "Van der Pauw constant"], [0.9553166181245093, "θₘ", "magicAngle", "Magic angle"], [0.37395581361920227, "Cₐᵣₜᵢₙ", "artin_c", "Artin's constant"], [1.4670780794339755, "C", "porter_c", "Porter's constant"], [0.9702701143920339, "L", "lochs_c", "Lochs constant"], [1.0074347568842794, "devicciTesseract_c", "devicciTesseract_c", "DeVicci's tesseract constant"], [1.539600717839002, "liebSquareIce_c", "liebSquareIce_c", "Lieb's square ice constant"], [1.7052111401053678, "C", "niven_c", "Niven's constant"], [0.5759599688929454, "stephens_c", "stephens_c", "Stephens' constant"], [0.8507361882018672, "P", "regularPaperfoldingSequence", "Regular paperfolding sequence"], [3.3598856662431777, "ψ", "reciprocalFibonacci_c", "Reciprocal Fibonacci constant"], [4.66920160910299, "δ", "feigenbaumConstant_delta", "Feigenbaum constant δ"], [0.6617071822671763, "Δ(3)", "robbins_c", "Robbins constant"], [0.47494937998792064, "weierstrass_c", "weierstrass_c", "Weierstrass constant"], [2.8077702420285195, "F", "fransenRobinson_c", "Fransén-Robinson constant"], [0.6309297535714574, "log₃2", "fractalDimensionOfTheCantorSet", "Fractal dimension of the Cantor set"], [2.5029078750958926, "α", "feigenbaumConstant_alpha", "Feigenbaum constant α"], [0.19452804946532512, "C₂", "secondDuBoisReymond_c", "Second du Bois-Reymond constant"], [0.860713320559342, "δ", "erdosTenenbaumFord_c", "Erdős-Tenenbaum-Ford constant"], [1.3035772690342964, "λ", "conway_c", "Conway's constant"], [1.305686729, "fractDimApollo", "fractDimApollo", "Fractal dimension of the Apollonian packing of circles"], [0.353236371854996, "σ", "hafnerSarnakMccurley_c", "Hafner-Sarnak-McCurley constant"], [1.584962500721156, "log₂3", "hausdorffDimensionOfTheSierpinskiTriangle", "Hausdorff dimension of the Sierpinski triangle"], [1.4560749485826896, "B", "backhouse_c", "Backhouse's constant"], [1.1319882487943, "viswanath_c", "viswanath_c", "Viswanath constant"], [1.787231650182966, "q", "komornikLoreti_c", "Komornik-Loreti constant"], [0.70258, "β*", "embreeTrefethen_c", "Embree-Trefethen constant"], [0.001317641154853178, "C", "heathBrownMoroz_c", "Heath-Brown-Moroz constant"], [0.18785964246206713, "S", "mrb_c", "MRB constant"], [0.41468250985111166, "ρ", "prime_c", "Prime constant"], [1.6616879496335941, "σ", "somosQuadraticRecurrence_c", "Somos' quadratic recurrence constant"], [1.1874523511265012, "α", "foias_c", "Foias constant"], [0.5901702995080481, "logCapUnitDisk", "logCapUnitDisk", "Logarithmic capacity of the unit disk"], [0.6782344919173919, "taniguchi_c", "taniguchi_c", "Taniguchi constant"], [299792458, "c₀", "c_0", "speed of light in vacuum"], [6.62607015e-34, "ℎ", "h", "Planck constant"], [1.0545718176461565e-34, "ℏ", "h_red", "reduced Planck constant"], [6.6743e-11, "G", "G", "Newtonian constant of gravitation"], [8.8541878128e-12, "ε₀", "eps_0", "vacuum electric permittivity"], [0.00000125663706212, "𝜇₀", "mu_0", "vacuum magnetic permeability"], [376.730313668, "Z₀", "Z_0", "characteristic impedance of vacuum"], [1.602176634e-19, "qₑ", "q_e", "elementary charge"], [6.02214076e+23, "Nₐ", "N_A", "Avogadro constant"], [1.380649e-23, "k_B", "k_B", "Boltzmann constant"], [0.00007748091729863649, "G₀", "G_0", "conductance quantum"], [483597848416983.6, "Kⱼ", "K_J", "Josephson constant"], [8987551792.3, "kₑ", "k_e", "Coulomb constant"], [25812.807459304513, "Rₖ", "R_K", "von Klitzing constant"], [2.0678338484619295e-15, "𝚽₀", "Phi_0", "magnetic flux quantum"], [9.1093837015e-31, "mₑ", "m_e", "electron mass"], [1.67262192369e-27, "mₚ", "m_p", "proton mass"], [1.67492749804e-27, "mₙ", "m_n", "neutron mass"], [1.883531627e-28, "m𝜇", "m_mu", "muon mass"], [3.16754e-27, "mτ", "m_tau", "tau mass"], [9.274010078362164e-24, "𝜇_B", "mu_B", "Bohr magneton"], [5.050783746096375e-27, "𝜇ₙ", "mu_N", "nuclear magneton"], [0.007297352569278033, "α", "alpha", "fine-structure constant"], [5.2917721090608536e-11, "a₀", "a_0", "Bohr radius"], [2.817940326204928e-15, "rₑ", "r_e", "classical electron radius"], [-2.00231930436256, "gₑ", "g_e", "electron g-factor"], [-2.0023318418, "g𝜇", "g_mu", "muon g-factor"], [5.5856946893, "gₚ", "g_p", "proton g-factor"], [10973731.568072576, "R∞", "R_inf", "Rydberg constant"], [4.359744722172437e-18, "Eₕ", "E_h", "Hartree energy"], [6.652458732173516e-29, "𝝈ₑ", "sigma_e", "Thomson cross section"], [1.6605390666e-27, "mᵤ", "m_u", "atomic mass constant"], [96485.33212331001, "F", "F", "Faraday constant"], [8.31446261815324, "R", "R", "molar gas constant"], [0.00099999999965, "Mᵤ", "M_u", "molar mass constant"], [5.6703744191844294e-8, "𝝈", "sigma", "Stefan–Boltzmann constant"], [3.7417718521927573e-16, "c₁", "c_1", "first radiation constant"], [1.1910429723971881e-16, "c_1L", "c_1L", "first radiation constant for spectral radiance "], [0.014387768775039337, "c₂", "c_2", "second radiation constant "], [0.002897771955, "b", "b", "Wien wavelength displacement law constant"], [5.878925757e-10, "b′", "b_prime", "Wien frequency displacement law constant"], [0.003002916077, "b_entropy", "b_entropy", "Wien entropy displacement law constant"], [1.616255e-35, "lₚ", "l_P", "Planck length"], [2.176434e-8, "mₚ", "m_P", "Planck mass"], [1.416784e+32, "tₚ", "t_P", "Planck temperature"], [5.391247e-44, "Tₚ", "T_P", "Planck time"], [101325, "atm", "atm", "standard atmosphere"], [9.80665, "g", "g", "standard acceleration of gravity"]]




// FUNCTIONS
//////////////////////////////////////////////////////////////////////////////////

/* Rationalisation Transfer Format:
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
    multimatchResults = sortErrorFilter( multimatchResults.map( x => { x.err *= fractionComplexitySquareWeight( x.num, x.denom ); return x } ), 2 )
    let constantRatioResults = rationalizeConstants( x )
    constantRatioResults = sortErrorFilter( constantRatioResults.map( x => { x.err *= fractionComplexitySquareWeight( x.num, x.denom ); return x } ), 1 )
    let rationalizeResults = rationalize( x )
    rationalizeResults = rationalizeResults.map( x => { x.err *= fractionComplexityAdditiveWeight( x.num, x.denom ); return x } )
    let constantMatchResults = matchConstants( x )

    // Merge all of them into one
    let mergedResults = []
    mergedResults.push( ...rationalizeResults, ...multimatchResults, ...constantRatioResults, ...constantMatchResults )

    // Sort and limit the length
    mergedResults = mergedResults.sort( ( a, b ) => ( a.err - b.err ) ).filter( ( val, i ) => ( i < maxResults || val.err == 0 ) && val.err < maxError )

    for ( let i = 0; i < mergedResults.length; i++ ) {
        const result = mergedResults[i]
        const sign = result.num * result.denom >= 0
        result.num = Math.abs( result.num )
        result.denom = Math.abs( result.denom )


        if ( !( result.symbol != "" && result.num == 0 ) ) { // Do not give symbolic results if the multiplier is zero

            if ( result.num == 1 && result.denom == 1 ) print(
                ` ${result.err == 0 ? "=" : "≈"} ` +
                ( sign ? "" : "-" ) +
                ( result.symbol == "" ? "1" : ( result.isInv ? "1/" + result.symbol : result.symbol ) ) +
                ( result.desc == "" ? "" : ` ${col.dim}(${result.desc})` ),
                result.err == 0 ? col.mathResult : col.mathOtherResult
            )
            else if ( result.num != 1 && result.denom == 1 ) print(
                ` ${result.err == 0 ? "=" : "≈"} ` +
                ( sign ? "" : "-" ) +
                ( result.symbol == "" ? result.num : ( result.isInv ? result.num + "/" + result.symbol : result.num + result.symbol ) ),
                result.err == 0 ? col.mathResult : col.mathOtherResult
            )
            else print(
                ` ${result.err == 0 ? "=" : "≈"} ` +
                ( sign ? "" : "-" ) +
                `${result.num}/${result.denom}` +
                ( result.symbol == "" ? "" : ( result.isInv ? result.symbol : ` * ${result.symbol}` ) ),
                result.err == 0 ? col.mathResult : col.mathOtherResult
            )
        }

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

    let str = ""
    if ( mergedResults.length > 0 ) {
        if ( mergedResults[0].err == 0 ) str += col.mathRegular + "= "
        else str += col.mathRegular + col.dim + "≈ "
        for ( let i = 0; i < mergedResults.length; i++ ) {
            const result = mergedResults[i]
            if ( result.denom * result.num == 0 ) continue
            const sign = result.num * result.denom >= 0
            result.num = Math.abs( result.num )
            result.denom = Math.abs( result.denom )
            if ( !result.isInv ) str += `${sign ? " " : "-"}${result.num == 1 ? "" : result.num}${result.symbol}${result.denom == 1 ? "" : "/" + result.denom}`
            else str += `${sign ? " " : "-"}${result.num}${result.denom == 1 ? "/" : "/" + result.denom}${result.symbol}`
            if ( i < mergedResults.length - 1 ) str += " = "
        }
    }
    return str
}


function rationalizeMultimatch( x, maxFrac = 64 ) {

    const checkConstants = constants_multimatch.map( c => x / c[0] )
    const checkConstantInverses = constants_multimatch.map( c => x * c[0] )
    let constFractions = []

    {
        let error = 0.05
        if ( Math.round( x ) == x ) error = 0
        for ( let denom = 1; ( denom <= maxFrac && error > 0 ); denom++ ) {

            let errConstants = checkConstants.map( check => Math.abs( Math.round( check * denom ) - roundSig( check * denom, 14 ) ) )
            let errConstantsInverses = checkConstantInverses.map( check => Math.abs( Math.round( check * denom ) - roundSig( check * denom, 14 ) ) )

            for ( let i = 0; i < errConstants.length; i++ ) {
                if ( errConstants[i] < error || errConstantsInverses[i] < error ) {

                    let thisError = Math.min( errConstants[i], errConstantsInverses[i] )
                    let fraction = errConstantsInverses[i] < errConstants[i] ?
                        [Math.round( checkConstantInverses[i] * denom ), denom] :
                        [Math.round( checkConstants[i] * denom ), denom]

                    constFractions.push( [
                        fraction[0],
                        fraction[1],
                        constants_multimatch[i][1],
                        thisError,
                        errConstantsInverses[i] < errConstants[i] // isIverse
                    ] )

                    error = thisError

                }
            }

        }
    }
    {
        let error = 0.05
        if ( Math.round( x ) == x ) error = 0
        for ( let num = 1; ( num <= maxFrac && error > 0 ); num++ ) {

            let errConstants = checkConstants.map( check => Math.abs( Math.round( num / check ) - roundSig( num / check, 14 ) ) )
            let errConstantsInverses = checkConstantInverses.map( check => Math.abs( Math.round( num / check ) - roundSig( num / check, 14 ) ) )

            for ( let i = 0; i < errConstants.length; i++ ) {
                if ( errConstants[i] < error || errConstantsInverses[i] < error ) {

                    let thisError = Math.min( errConstants[i], errConstantsInverses[i] )
                    let fraction = errConstantsInverses[i] < errConstants[i] ?
                        [num, Math.round( num / checkConstantInverses[i] )] :
                        [num, Math.round( num / checkConstants[i] )]

                    constFractions.push( [
                        fraction[0],
                        fraction[1],
                        constants_multimatch[i][1],
                        thisError,
                        errConstantsInverses[i] < errConstants[i] // isInverse
                    ] )

                    error = thisError

                }
            }

        }
    }

    let returnArrTmp = constFractions.map( ( ele, i ) => {
        return {
            num: ele[0],
            denom: ele[1],
            symbol: ele[2],
            desc: "",
            err: ele[3],
            isInv: ele[4]
        }
    } )

    // Remove Duplicate elements aswell as elements with huge factors ( > 2^48 )
    let returnArr = []
    for ( let i = 0; i < returnArrTmp.length; i++ ) {
        if ( Math.abs( returnArrTmp[i].num ) > 2 ** 48 || Math.abs( returnArrTmp[i].denom ) > 2 ** 48 ) continue
        let currNumber = returnArrTmp[i].num * returnArrTmp[i].denom
        let isDup = false
        for ( let o = i + 1; o < returnArrTmp.length && !isDup; o++ ) {
            let otherNumber = returnArrTmp[o].num * returnArrTmp[o].denom
            if ( currNumber == otherNumber ) isDup = true
        }
        if ( !isDup ) returnArr.push( returnArrTmp[i] )
    }

    return returnArr
}

function rationalizeConstants( x, maxDenominator = 32 ) {

    const checkConstants = constants_rationalize.map( c => x / c[0] )
    const checkConstantInverses = constants_rationalize.map( c => x * c[0] )
    let rootFractions = []

    let error = 0.05
    if ( Math.round( x ) == x ) error = 0
    for ( let denom = 1; ( denom <= maxDenominator && error > 0 ); denom++ ) {

        let errRoots = checkConstants.map( check => Math.abs( Math.round( check * denom ) - roundSig( check * denom, 14 ) ) )
        let errRootInverses = checkConstantInverses.map( check => Math.abs( Math.round( check * denom ) - roundSig( check * denom, 14 ) ) )

        for ( let i = 0; i < errRoots.length; i++ ) {
            if ( errRoots[i] < error || errRootInverses[i] < error ) {

                let thisError = Math.min( errRoots[i], errRootInverses[i] )
                let fraction = errRootInverses[i] < errRoots[i] ?
                    [Math.round( checkConstantInverses[i] * denom ), denom] :
                    [Math.round( checkConstants[i] * denom ), denom]
                rootFractions.push( [
                    fraction[0],
                    fraction[1],
                    constants_rationalize[i][1],
                    thisError,
                    errRootInverses[i] < errRoots[i] // is inverse or not
                ] )
                error = thisError

            }
        }

    }

    let returnArr = rootFractions.map( ( ele, i ) => {
        return {
            num: ele[0],
            denom: ele[1],
            symbol: ele[2],
            desc: "",
            err: ele[3],
            isInv: ele[4]
        }
    } )

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

    let returnArr = matchedConstants.map( ( ele, i ) => {
        return {
            num: 1,
            denom: 1,
            symbol: ( ele[5] ? "-" : "" ) + ele[1],
            desc: ele[3],
            err: ele[4],
            isInv: false
        }
    } )

    return returnArr
}

function rationalize( x, maxDenominator = 16777216 ) {
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

    return returnArr
}

function searchConstants( str, threshold = 5, maxResults = 5 ) {
    let results = []
    const searchWords = str.split( /[\s\-()]+/g ).map( x => x.toLowerCase() )
    for ( let i = 0; i < constants_match.length; i++ ) {

        // Description + Variable Name
        const match = constants_match[i][3] + " " + constants_match[i][2]
        const words = match.split( /[\s\-()]+/g ).filter( val => val != "" && !/^\d+$/.test( val ) ).map( x => x.toLowerCase() )

        let totalDistance = Infinity
        for ( let wi = 0; wi < words.length; wi++ ) {

            let minDistance = Infinity
            for ( let swi = 0; swi < searchWords.length; swi++ ) {

                const distance = levenshteinDistance( words[wi], searchWords[swi] )
                minDistance = Math.min( distance, minDistance )

            }
            totalDistance = Math.min( totalDistance, minDistance )

        }

        if ( totalDistance < threshold ) results.push( [...constants_match[i], totalDistance] )

    }
    results.sort( ( a, b ) => ( a[4] - b[4] ) + 0.0 * ( a[2].length - b[2].length ) )
    results = results.filter( ( x, i ) => i < maxResults || ( i < maxResults * 2 && x[4] <= 1 ) || x[4] == 0 )

    const maxStringLengths = results.reduce( ( prev, curr ) => [...curr.map( ( x, i ) => Math.max( x.toString().length, prev[i] ) )], results[0].map( x => 0 ) )
    for ( let i = 0; i < results.length; i++ ) {
        print( `${results[i][3]}\n${col.FgYellow + results[i][1] + " ".repeat( maxStringLengths[1] - results[i][1].toString().length )} = ${results[i][0] + " ".repeat( maxStringLengths[0] - results[i][0].toString().length )} ${col.reset + col.dim}Internal Variable Name: ${results[i][2]}`, col.mathRegular )
    }

}

module.exports = {
    processNumber,
    processNumberMinimal,
    searchConstants,

    constants_multimatch,
    constants_rationalize,
    constants_match,
}