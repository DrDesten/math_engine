function roundSig(n,p) { return parseFloat(n.toPrecision(p)) }

function table(func, min = -10, max = 10, step = 1) {
    console.log(`\nTBL: ${func.toString()} [${min},${max}] ++${Math.abs(step)}`)
    let maxlength = 0;
    for (let i = min; i <= max; i = roundSig(i+step, 14)) maxlength = Math.max(maxlength, i.toString().length)
    for (let i = min; i <= max; i = roundSig(i+step, 14)) console.log(`(${i})${" ".repeat(maxlength - i.toString().length)} => ${roundSig(func(i), 14)}`)
    console.log("")
}

function integrate(func, min = 0, max = 1) {
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
}

function rationalize(n) {
    let nenner = []
    let error  = 1
    for (let i = 1; i <= 16777216; i++) {
        let err = Math.abs( Math.round(n * i) - (n * i) )
        if ( err < error ) {
            nenner.push(i)
            error = err
        }
        if (error == 0) break
    }

    let zähler = nenner.map(m => Math.round(n * m))
    let brüche = zähler.map((zähler, i) => [zähler, nenner[i]])
    let errors = brüche.map(bruch => Math.abs( (bruch[0] / bruch[1] - n) / n )).filter((n,i,a) => (i == 0 || a[i-1] != 0))
    brüche     = brüche.filter((n,i) => (i < errors.length))
    let weightedErrors = errors.map((err, i) => err * ( Math.abs(zähler[i]) * Math.abs(nenner[i]) + 1 )) // Errors weighted by their rational complexity

    let sortierteBrüche = brüche.map((bruch, i) => [bruch[0], bruch[1], weightedErrors[i]]).sort((a,b) => a[2] - b[2])

    for (let i = 0; i < Math.min(3, sortierteBrüche.length); i++) {
        let bruch = sortierteBrüche[i]
        if (bruch[2] == 0) console.log(` = ${bruch[0]}/${bruch[1]}`)
        else               console.log(` ≈ ${bruch[0]}/${bruch[1]}`)
    }
}

module.exports = {
    table,
    integrate,
    rationalize
}