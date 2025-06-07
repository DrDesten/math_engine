export const reset = "\x1b[0m"
export const bright = "\x1b[1m"
export const dim = "\x1b[2m"
export const underscore = "\x1b[4m"
export const blink = "\x1b[5m"
export const reverse = "\x1b[7m"
export const hidden = "\x1b[8m"

export const FgBlack = "\x1b[30m"
export const FgRed = "\x1b[31m"
export const FgGreen = "\x1b[32m"
export const FgYellow = "\x1b[33m"
export const FgBlue = "\x1b[34m"
export const FgMagenta = "\x1b[35m"
export const FgCyan = "\x1b[36m"
export const FgWhite = "\x1b[37m"

export const BgBlack = "\x1b[40m"
export const BgRed = "\x1b[41m"
export const BgGreen = "\x1b[42m"
export const BgYellow = "\x1b[43m"
export const BgBlue = "\x1b[44m"
export const BgMagenta = "\x1b[45m"
export const BgCyan = "\x1b[46m"
export const BgWhite = "\x1b[47m"

export const mathRegular = reset
export const mathQuery = bright
export const mathResult = FgGreen
export const mathOtherResult = dim
export const mathError = FgRed
export const mathWarn = FgYellow

export const esc = "\x1b[0G"

export const FgRGB = ( r, g, b ) => `\x1b[38;2;${r};${g};${b}m`
export const BgRGB = ( r, g, b ) => `\x1b[48;2;${r};${g};${b}m`

export const b = str => `${bright}${str}${reset}`
export const ul = str => `${underscore}${str}${reset}`