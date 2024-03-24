import { TokenType, lex, Parser, Expression, BinaryExpression, UnaryExpression, FunctionExpression, IdentifierExpression, LiteralExpression } from "./lexer.js"

export class Compiler {
    constructor( ast ) {
        this.ast = ast
    }

    compile() {
        return this.visit( this.ast )
    }

    visit( node ) {
        if ( node instanceof BinaryExpression ) {
            return this.visitBinaryExpression( node )
        }
        if ( node instanceof UnaryExpression ) {
            return this.visitUnaryExpression( node )
        }
        if ( node instanceof FunctionExpression ) {
            return this.visitFunctionExpression( node )
        }
        if ( node instanceof IdentifierExpression ) {
            return this.visitIdentifierExpression( node )
        }
        if ( node instanceof LiteralExpression ) {
            return this.visitLiteralExpression( node )
        }
    }

    /** @param {BinaryExpression} node  */
    visitBinaryExpression( node ) {
        const left = this.visit( node.left )
        const right = this.visit( node.right )

        switch ( node.operator.type ) {
            case TokenType.Modulus:
                return `math.modulus(${left}, ${right})`
            case TokenType.Power:
                return `(${left} ** ${right})`
        }

        let operator = node.operator.text
        return `(${left} ${operator} ${right})`
    }

    /** @param {UnaryExpression} node  */
    visitUnaryExpression( node ) {
        const operand = this.visit( node.operand )
        switch ( node.operator.type ) {
            case TokenType.Plus:
            case TokenType.Minus:
                return `(${node.operator.text} ${operand})`
            case TokenType.Factorial:
                return `math.factorial(${operand})`
        }
    }

    /** @param {FunctionExpression} node  */
    visitFunctionExpression( node ) {
        const args = node.args.map( arg => this.visit( arg ) ).join( "," )
        let callee = node.callee

        // Math Functions
        if ( callee === "log" ) {
            return `Math.log10(${args})`
        }
        if ( callee === "ln" ) {
            return `Math.log(${args})`
        }
        if ( callee in Math && typeof Math[callee] === "function" ) {
            return `Math.${callee}(${args})`
        }

        // Logarithms
        const log = /^log(?<base>\d+)$/.exec( callee )
        if ( log ) {
            return `math.logn(${log.groups.base},${args})`
        }

        return `${callee}(${args})`
    }

    /** @param {IdentifierExpression} node  */
    visitIdentifierExpression( node ) {
        if ( node.name in Math && typeof Math[node.name] === "number" )
            return `Math.${node.name}`

        return `resolve(${node.name})`
    }

    /** @param {LiteralExpression} node  */
    visitLiteralExpression( node ) {
        return node.value
    }
}