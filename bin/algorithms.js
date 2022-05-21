function table(func, min = -10, max = 10, step = 1) {
    console.log(`TBL: ${func.name} [${min},${max}] ++${step}`)
    for (let i = min; i <= max; i += step) console.log(`${func.name}(${i}) = ${func(i)}`)
}

module.exports = {
    table
}