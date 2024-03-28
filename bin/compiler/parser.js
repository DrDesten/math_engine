import { TokenType, lex } from "./lexer.js"

/** Represents a mathematical expression. */
export class Expression {}

/** Represents a binary expression. */
export class BinaryExpression extends Expression {
    /** @param {Token} operator @param {Expression} left @param {Expression} right */
    constructor( operator, left, right ) {
        super()
        this.operator = operator
        this.left = left
        this.right = right
    }

    toString() {
        const left = `${this.left}`.replace( /(?<=\n)./g, "│ $&" )
        const right = `${this.right}`.replace( /(?<=\n)./g, "  $&" )
        const tis = this.constructor.name + ` { ${this.operator.text} }`
        return `${tis}\n├╴${left}\n╰╴${right}`
    }
}

/** Represents a unary expression. */
export class UnaryExpression extends Expression {
    /** @param {Token} operator @param {Expression} operand */
    constructor( operator, operand ) {
        super()
        this.operator = operator
        this.operand = operand
    }

    toString() {
        const operand = `${this.operand}`.replace( /(?<=\n)./g, "  $&" )
        const tis = this.constructor.name + ` { ${this.operator.text} }`
        return `${tis}\n╰╴${operand}`
    }
}

/** Represents a function call expression. */
export class FunctionExpression extends Expression {
    /** @param {string} callee @param {Expression[]} args */
    constructor( callee, args ) {
        super()
        this.callee = callee
        this.args = args
    }

    toString() {
        const args = this.args.map( arg => `${arg}`.replace( /(?<=\n)./g, "  $&" ) ).join( ", " )
        const tis = this.constructor.name + ` { ${this.callee} }`
        return `${tis}\n╰╴${args}`
    }
}

/** Represents an identifier expression. */
export class IdentifierExpression extends Expression {
    /** @param {string} name */
    constructor( name ) {
        super()
        this.name = name
    }

    toString() {
        return this.name
    }
}

/** Represents a literal expression. */
export class LiteralExpression extends Expression {
    /** @param {any} value */
    constructor( value ) {
        super()
        this.value = value
    }

    toString() {
        return this.value
    }
}

export class Parser {
    constructor( tokens ) {
        this.index = 0
        this.tokens = tokens
    }

    peek( offset = 0 ) {
        return this.tokens[this.index + offset]
    }
    next() {
        return this.tokens[this.index++]
    }

    parse() {
        return this.parseExpression()
    }

    parseExpression() {
        return this.parseTerm()
    }

    parseTerm() {
        let expr = this.parseFactor()
        let token

        while ( token = this.peek() ) {
            if ( token.type === TokenType.Plus || token.type === TokenType.Minus ) {
                expr = new BinaryExpression( this.next(), expr, this.parseFactor() )
            } else {
                break
            }
        }

        return expr
    }

    parseFactor() {
        let expr = this.parsePower()
        let token

        while ( token = this.peek() ) {
            if ( token.type === TokenType.Multiply || token.type === TokenType.Divide || token.type === TokenType.Modulus || token.type === TokenType.Remainder ) {
                expr = new BinaryExpression( this.next(), expr, this.parsePower() )
            } else {
                break
            }
        }

        return expr
    }


    parsePower() {
        const left = this.parsePrefix()
        const token = this.peek()

        if ( token && token.type === TokenType.Power ) {
            this.next()
            return new BinaryExpression( token, left, this.parsePower() )
        }

        return left
    }

    parsePrefix() {
        const token = this.peek()

        if ( token && ( token.type === TokenType.Plus || token.type === TokenType.Minus ) ) {
            this.next()
            return new UnaryExpression( token, this.parsePrefix() )
        }

        return this.parsePostfix()
    }

    parsePostfix() {
        let expr = this.parsePrimary()
        let token

        while ( token = this.peek() ) {
            if ( token.type === TokenType.Factorial ) {
                this.next()
                expr = new UnaryExpression( token, expr )
            } else {
                break
            }
        }

        return expr
    }

    parsePrimary() {
        const token = this.peek()

        if ( token ) {

            if ( token.type === TokenType.Number ) {
                this.next()
                return new LiteralExpression( token.props.value )
            }

            if ( token.type === TokenType.ImplicitFunction ) {
                this.next()
                const ident = new IdentifierExpression( token.props.ident )
                return new FunctionExpression( token.props.func, [ident] )
            }

            if ( token.type === TokenType.LeftParen ) {
                this.next()
                const expr = this.parseExpression()
                const rightParen = this.next()
                if ( rightParen.type !== TokenType.RightParen ) throw new Error( "Expected ')'" )
                return expr
            }

            if ( token.type === TokenType.Identifier ) {
                this.next()

                if ( this.peek() && this.peek().type === TokenType.LeftParen ) {
                    this.next()
                    const args = []
                    while ( this.peek().type !== TokenType.RightParen ) {
                        args.push( this.parseExpression() )
                        if ( this.peek().type !== TokenType.Comma ) break
                        this.next()
                    }
                    const rightParen = this.next()
                    if ( rightParen.type !== TokenType.RightParen ) throw new Error( "Expected ')'" )
                    return new FunctionExpression( token.text, args )
                }

                return new IdentifierExpression( token.text )
            }
        }

        throw new Error( "Expected expression" )
    }
}