import { Definition } from "./definition.js"
import { TokenType } from "./lexer.js"
import { Parser as BaseParser } from "./RegLexer.js"

/** Represents a mathematical statement. */
export class Statement {}

export class Equation extends Statement {
    /** @param {Expression} left @param {Expression} right */
    constructor( left, right ) {
        super()
        this.left = left
        this.right = right
    }

    toString() {
        const left = `${this.left}`.replace( /(?<=\n)./g, "│ $&" )
        const right = `${this.right}`.replace( /(?<=\n)./g, "  $&" )
        const tis = this.constructor.name
        return `${tis}\n├╴${left}\n╰╴${right}`
    }
}

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
/** Represents a binary expression. */
export class MultiplyExpression extends Expression {
    /**  @param {Expression} left @param {Expression} right */
    constructor( left, right ) {
        super()
        this.left = left
        this.right = right
    }

    toString() {
        const left = `${this.left}`.replace( /(?<=\n)./g, "│ $&" )
        const right = `${this.right}`.replace( /(?<=\n)./g, "  $&" )
        const tis = this.constructor.name
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

export class Parser extends BaseParser {
    /** @param {Token<string>[]} tokens @param {{[identifier: string]: Definition}} definitions */
    constructor( tokens, definitions ) {
        super( tokens )
        this.definitions = definitions
    }

    parse() {
        return this.parseExpression()
    }

    parseExpression() {
        return this.parseEquation()
    }

    parseEquation() {
        let expr = this.parseTerm()
        if ( this.advanceIf( TokenType.Equals ) )
            expr = new Equation( expr, this.parseTerm() )
        return expr
    }

    parseTerm() {
        let expr = this.parseFactor()
        let token

        while ( token = this.peek() ) {
            if ( token.type === TokenType.Plus || token.type === TokenType.Minus ) {
                expr = new BinaryExpression( this.advance(), expr, this.parseFactor() )
            } else {
                break
            }
        }

        return expr
    }

    parseFactor() {
        let expr = this.parseImplicitMultiply()
        let token

        while ( token = this.peek() ) {
            if ( token.type === TokenType.Multiply || token.type === TokenType.Divide || token.type === TokenType.Modulus || token.type === TokenType.Remainder ) {
                expr = new BinaryExpression( this.advance(), expr, this.parseImplicitMultiply() )
            } else {
                break
            }
        }

        return expr
    }

    parseImplicitMultiply() {
        let expr = this.parsePrimary()
        while (
            this.peek().type === "Number" ||
            this.peek().type === "Identifier" ||
            this.peek().type === "LeftParen"
        ) {
            expr = new MultiplyExpression( expr, this.parsePrimary() )
        }
        return expr
    }

    parsePrimary() {
        let expression = this.parsePower()
        while (
            this.peekStrict().type === "Number" ||
            this.peekStrict().type === "Identifier" ||
            this.peekStrict().type === "LeftParen"
        ) {
            expression = new MultiplyExpression( expression, this.parsePower() )
        }
        return expression
    }

    parsePower() {
        const left = this.parsePrefix()
        const token = this.peek()

        if ( token && token.type === TokenType.Power ) {
            this.advance()
            return new BinaryExpression( token, left, this.parsePower() )
        }

        return left
    }

    parsePrefix() {
        const token = this.peek()

        if ( token && ( token.type === TokenType.Plus || token.type === TokenType.Minus ) ) {
            this.advance()
            return new UnaryExpression( token, this.parsePrefix() )
        }

        return this.parsePostfix()
    }

    parsePostfix() {
        let expr = this.parseAtom()
        let token

        while ( token = this.peek() ) {
            if ( token.type === TokenType.Factorial ) {
                this.advance()
                expr = new UnaryExpression( token, expr )
            } else {
                break
            }
        }

        return expr
    }

    parseAtom() {
        switch ( this.peek()?.type ) {
            case TokenType.Number: {
                const token = this.advance()
                return new LiteralExpression( token.props.value )
            }

            case TokenType.LeftParen: {
                this.advance()
                const expr = this.parseExpression()
                const rightParen = this.advance()
                if ( rightParen.type !== TokenType.RightParen ) throw new Error( "Expected ')'" )
                return expr
            }

            case TokenType.Identifier: {
                const token = this.advance()
                const definition = this.definitions[token.text]
                const identifier = definition?.identifier ?? token.text

                if ( this.advanceIf( TokenType.LeftParen ) ) {
                    const args = []
                    while ( this.peek().type !== TokenType.RightParen ) {
                        args.push( this.parseExpression() )
                        if ( this.peek().type !== TokenType.Comma ) break
                        this.advance()
                    }
                    const rightParen = this.advance()
                    if ( rightParen.type !== TokenType.RightParen ) throw new Error( "Expected ')'" )
                    return new FunctionExpression( identifier, args )
                }

                if ( definition && definition.type === "function" ) {
                    const arg = this.parsePrimary()
                    return new FunctionExpression( identifier, [arg] )
                }

                return new IdentifierExpression( identifier )
            }
        }
        throw new Error( "Expected expression" )
    }
}