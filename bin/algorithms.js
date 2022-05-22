function roundSig(n,p) { return parseFloat(n.toPrecision(p)) }

function table(func, min = -10, max = 10, step = 1) {
    console.log(`\nTBL: ${func.toString()} [${min},${max}] ++${Math.abs(step)}`)
    let maxlength = 0;
    for (let i = min; i <= max; i = roundSig(i+step, 14)) maxlength = Math.max(maxlength, i.toString().length)
    for (let i = min; i <= max; i = roundSig(i+step, 14)) console.log(`(${i})${" ".repeat(maxlength - i.toString().length)} => ${roundSig(func(i), 14)}`)
    console.log("")
}

/* function integrate(func, min = 0, max = 1) {
    console.log(`\n∫${func.toString()} [${min},${max}]`)

    const phi_inv  = 0.6180339887498948482
    const steps    = 50457
    let   integral = 0
    for (let i = 0; i < steps; i++) {
        let x = ((phi_inv * i + 0.5) % 1) * (max - min) + min  // Quasirandom Seqence
        integral += func(x)
    }

    let integrationPrecision = Math.max(Math.round(Math.log10(steps)) - 1,1)
    console.log(` = ${roundSig(integral * (max - min) / steps, integrationPrecision + 20)}\n`)
} */
function integrate(func, min = 0, max = 1) { // Integrate-in-Pairs
    console.log(`\n∫${func.toString()} [${min},${max}]`)

    const phi_inv  = 0.6180339887498948482
    const range    = (max - min)
    const steps    = 1e4
    const pairDist = (min - max) / steps * 0.5
    let   integral = 0

    let i = min
    while (i <= max) {
        let y1 = func(i - pairDist)
        let y2 = func(i + pairDist)
        let dFdx  = (y2 - y1) / (pairDist * 2)
        let xStep = 1 / Math.abs(steps * dFdx)
        xStep     = Math.max(Math.min(xStep, (range / steps) * 4), (range / steps) * 0.25)

        integral += (y1 + y2) * xStep
        i        += xStep
    }

    let integrationPrecision = Math.max(Math.round(Math.log10(steps)) - 1,1)
    console.log(` = ${roundSig(integral * 0.5, 20)}\n`)
}

module.exports = {
    table,
    integrate
}