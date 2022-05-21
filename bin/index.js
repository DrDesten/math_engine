#!/usr/bin/env node
function print(x) { console.log(x) }

const isNumerical = /^[0-9. +\-\/*]*$/g
const letters     = /[A-z]/g

var input = process.argv.slice(2).join(" ") // Getting the argument


// Simply Evaluate if there are no variables
if (isNumerical.test(input)) print(eval(input))

