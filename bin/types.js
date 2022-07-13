const col = require( "./colors" )

function getIndexProxy( arrayObject = "" ) {
    return {
        get( target, key ) {
            console.log( "get", target, key )
            if ( /^\d+$/.test( key ) || ["concat", "copyWithin", "entries", "every", "fill", "filter", "find", "findIndex", "forEach", "from", "includes", "indexOf", "isArray", "join", "keys", "lastIndexOf", "length", "map", "pop", "push", "reduce", "reduceRight", "reverse", "shift", "slice", "some", "sort", "splice", "toString", "unshift", "valueOf"].indexOf( key ) > -1 )
                return target[arrayObject][key]
            return target[key]
        },
        set( target, key, value ) {
            console.log( "set", target, key, value )
            if ( /^\d+$/.test( key ) || ["concat", "copyWithin", "entries", "every", "fill", "filter", "find", "findIndex", "forEach", "from", "includes", "indexOf", "isArray", "join", "keys", "lastIndexOf", "length", "map", "pop", "push", "reduce", "reduceRight", "reverse", "shift", "slice", "some", "sort", "splice", "toString", "unshift", "valueOf"].indexOf( key ) > -1 )
                return Reflect.set( target[arrayObject], key, value )
            return Reflect.set( target, key, value )
        }
    }
}

class Ratio {
    constructor( numerator, denominator = 0, error = 0, isInverse = false, symbol = "", description = "" ) {
        if ( typeof numerator == "object" ) { // Constructor with properties object
            this.num = numerator.num
            this.denom = numerator.denom
            this.err = numerator.err
            this.isInv = numerator.isInv
            this.symbol = numerator.symbol
            this.desc = numerator.desc
        } else { // Regular Constructor
            this.num = numerator
            this.denom = denominator
            this.err = error
            this.isInv = isInverse
            this.symbol = symbol
            this.desc = description
        }

        // Get sign
        this.sign = Math.sign( this.num * this.denom )
        // Make numerator and denominator positive
        this.num = Math.abs( this.num )
        this.denom = Math.abs( this.denom )
        // Inititalize _string internal variable
        this._string = ""
        this._stringSignPadding = true
    }

    get maxValue() {
        return Math.max( this.num, this.denom )
    }
    get isNull() {
        return this.num * this.denom == 0
    }
    get isValid() {
        return isFinite( this.num / this.denom )
    }
    get length() {
        return this.toString().length
    }

    get squareErrorWeight() {
        return this.num * this.num + this.denom * this.denom
    }
    get additiveErrorWeight() {
        return this.num + this.denom
    }
    applySquareErrorWeight() {
        this.err *= this.num * this.num + this.denom * this.denom
        return this
    }
    applyAdditiveErrorWeight() {
        this.err *= this.num + this.denom
        return this
    }

    toString( signPadding = true ) {
        if ( this._string == "" || signPadding != this._stringSignPadding ) {
            this._string = `${this.sign < 0 ? "-" : " ".repeat( signPadding )}${this.num == 1 && ( this.symbol != "" && !this.isInv ) ? "" : this.num}${this.isInv ? "" : this.symbol}${this.denom != 1 || ( this.symbol != "" && this.isInv ) ? "/" : ""}${this.denom == 1 ? "" : this.denom}${this.isInv ? this.symbol : ""}`
            this._stringSignPadding = signPadding
        }
        return this._string
    }


    static squareErrorWeight( num, denom ) {
        return num * num + denom * denom
    }
    static applyAdditiveErrorWeight( num, denom ) {
        return num + denom
    }

}


class Solution {
    constructor( value = NaN, error = 0, accurate = true, operator = "=" ) {
        this.value = value
        this.error = error
        this.accurate = accurate
        if ( !accurate && operator == "=" ) this.op = "≈"
        else this.op = operator
        this.rationalisations = []
    }

    addRationalisation( ratio ) {
        this.rationalisations.push( ratio )
    }

    get valid() { return !isNaN( this.value ) }
    get length() { return this.value.toString().length }
    get abslength() { return Math.abs( this.value ).toString().length }
    get string() { return this.value.toString() }

    //toString() { return `{ Solution: x ${this.op} ${this.value} }` }
    toString() { return `[Object Solution]` }

    printStr( valueTargetLength = 0 ) {
        return `${this.op} ${this.value}${" ".repeat( Math.max( 0, valueTargetLength - this.length ) )}`
    }
    print( valueTargetLength = 0 ) {
        console.log( this.accurate ? col.mathResult : col.mathOtherResult, this.printStr( valueTargetLength ), col.reset )
    }

    static get invalidSolution() {
        return new Solution( NaN, Infinity, false, "=" )
    }
}

function historyBuffer() {
    return new Proxy( new Array( 0 ), {
        get( target, key ) {
            if ( +key < 0 ) return target[target.length + +key]
            return target[key]
        },
        set( target, key, value ) {
            if ( +key < 0 ) return Reflect.set( target, target.length + +key, value )
            return Reflect.set( target, key, value )
        }
    } )
}

// Not MonoSpace
// \/◢◣◤◥‾-_

module.exports = {
    Ratio,
    Solution,

    historyBuffer,
}