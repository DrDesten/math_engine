const col = require("./colors")
function print(x, color = "") { console.log(`${color}${x}${col.reset}`) }

function roundSig(n,p) { return parseFloat(n.toPrecision(p)) }
function roundFix(n,p) { return parseFloat(n.toFixed(p)) }

function table(func, min = -10, max = 10, step = 1) {
    print(`${col.mathQuery}\nTBL: ${func.toString()}${col.dim} [${min},${max}] ++${Math.abs(step)}`)
    let maxlength = 0;
    for (let i = min; i <= max; i = roundSig(i+step, 14)) maxlength = Math.max(maxlength, i.toString().length)
    for (let i = min; i <= max; i = roundSig(i+step, 14)) print(`(${i})${" ".repeat(maxlength - i.toString().length)} => ${roundSig(func(i), 14)}`)
    console.log("")
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
function integrate(func, min = 0, max = 1) {
    print(`\n∫${func.toString()} [${min},${max}]`, col.mathQuery)

    const steps     = 2**20
    const stepSize  = (max - min) / steps
    let   integral  = 0
    for (let x = min; x <= max; x += stepSize) {
        integral += func(x)
    }

    let estimatedError = 0.5 / steps // Thi
    integral = roundFix(integral * (max - min) / steps, Math.max(1, Math.floor(-Math.log10(estimatedError))))
    print(` ≈ ${integral}`, col.mathResult)
    rationalize(integral)
}

/* function rationalize(n) {
    let nenner = []
    let error  = 1
    for (let i = 1; (i <= 16777216 && error > 0); i++) {
        let err = Math.abs( Math.round(n * i) - (n * i) )
        if ( err < error ) {
            nenner.push(i)
            error = err
        }
    }

    let zähler = nenner.map(m => Math.round(n * m))
    let brüche = zähler.map((zähler, i) => [zähler, nenner[i]])
    let errors = brüche.map(bruch => Math.abs( (bruch[0] / bruch[1] - n) / n )).filter((n,i,a) => (i == 0 || a[i-1] != 0))
    brüche     = brüche.filter((n,i) => (i < errors.length))
    let weightedErrors = errors.map((err, i) => err * ( Math.abs(zähler[i]) * Math.abs(nenner[i]) + 1 )) // Errors weighted by their rational complexity

    let sortierteBrüche = brüche.map((bruch, i) => [bruch[0], bruch[1], weightedErrors[i]]).sort((a,b) => a[2] - b[2])

    for (let i = 0; i < Math.min(3, sortierteBrüche.length); i++) {
        let bruch = sortierteBrüche[i]
        if (bruch[2] == 0) print(` = ${bruch[0]}/${bruch[1]}`, col.mathOtherResult)
        else               print(` ≈ ${bruch[0]}/${bruch[1]}`, col.mathOtherResult)
    }
} */
function rationalize(x) {
    let brüche = []
    let error  = 1
    for (let i = 1; (i <= 16777216 && error > 0); i++) {
        let err = Math.abs( Math.round(x * i) - (x * i) )
        if ( err < error ) {
            // [Zähler, Nenner]
            brüche.push([Math.round(x * i), i])
            error = err
        }
    }

    let konstantenBrüche = []
    let constError = 1e-5
    let checkPI    = x / Math.PI
    for (let m = 1; (m <= 3600 && constError > 0) ; m++) {
        let err_pi = Math.abs( Math.round(checkPI * m) - (checkPI * m) )
        if ( err_pi < constError) {
            konstantenBrüche.push([Math.round(checkPI * m), m, "π", err_pi])
            constError = err_pi
        }
    }
    
    if (konstantenBrüche.length > 0) {
        let bruch = konstantenBrüche[konstantenBrüche.length - 1]
        if (bruch[3] == 0) print(` = ${bruch[0] == 1 ? (bruch[1] == 1 ? bruch[2] : bruch[2] + "/" + bruch[1]) : (bruch[1] == 1 ? bruch[0] + "*" + bruch[2] : bruch[0] + "/" + bruch[1] + "*" + bruch[2])}`, col.mathOtherResult)
        else               print(` ≈ ${bruch[0] == 1 ? (bruch[1] == 1 ? bruch[2] : bruch[2] + "/" + bruch[1]) : (bruch[1] == 1 ? bruch[0] + "*" + bruch[2] : bruch[0] + "/" + bruch[1] + "*" + bruch[2])}`, col.mathOtherResult)
    }

    let errors = brüche.map(bruch => Math.abs( bruch[0] / bruch[1] - x )).filter((x,i,a) => (i == 0 || a[i-1] != 0))
    brüche     = brüche.filter((x,i) => (i < errors.length))
    let weightedErrors = errors.map((err, i) => err * ( Math.abs(brüche[i][0]) * Math.abs(brüche[i][1]) + 1 )) // Errors weighted by their rational complexity

    let sortierteBrüche = brüche.map((bruch, i) => [bruch[0], bruch[1], weightedErrors[i]]).sort((a,b) => a[2] - b[2])

    for (let i = 0; i < Math.min(2, sortierteBrüche.length); i++) {
        let bruch = sortierteBrüche[i]
        if (bruch[2] == 0) print(` = ${bruch[0]}${bruch[1] == 1 ? "" : "/" + bruch[1]}`, col.mathOtherResult)
        else               print(` ≈ ${bruch[0]}${bruch[1] == 1 ? "" : "/" + bruch[1]}`, col.mathOtherResult)
    }
}

module.exports = {
    table,
    integrate,
    rationalize
}