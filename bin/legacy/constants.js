const tau       = 6.2831853071795864769252867665590057683943387987502
const pi        = 3.1415926535897932384626433832795028841971693993751
const e         = 2.7182818284590452353602874713526624977572470937000
const phi       = 1.6180339887498948482045868343656381177203091798058

const operators = /[()^*/+-]/g
const isNumber  = /[0-9]/g
const isParenth = /[)(]/g
const isExp     = /[\^]/g
const isMult    = /[*/]/g
const isAdd     = /[+-]/g

const priorityExp  = 2
const priorityMult = 1
const priorityAdd  = 0

module.exports = {
  tau,
  pi,
  e,
  phi,

  operators,
  isNumber,
  isParenth,
  isExp,
  isMult,
  isAdd,

  priorityExp,
  priorityMult,
  priorityAdd,
}