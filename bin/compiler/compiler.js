import { TokenType, lex, Parser, Expression, BinaryExpression, UnaryExpression, FunctionExpression, IdentifierExpression, LiteralExpression } from "./lexer.js"

export class Compiler {
    /** @param {Expression} ast @param {"float"|"arb"} mode */
    constructor( ast, mode = "float" ) {
        this.mode = mode
        this.ast = ast
    }

    compile() {
        return this.visit( this.ast )
    }

    visit( node ) {
        const Mappings = [
            [BinaryExpression, this.mode === "float" ? this.visitBinaryExpression : this.visitBinaryExpressionArb],
            [UnaryExpression, this.mode === "float" ? this.visitUnaryExpression : this.visitUnaryExpressionArb],
            [FunctionExpression, this.mode === "float" ? this.visitFunctionExpression : this.visitFunctionExpressionArb],
            [IdentifierExpression, this.mode === "float" ? this.visitIdentifierExpression : this.visitIdentifierExpressionArb],
            [LiteralExpression, this.mode === "float" ? this.visitLiteralExpression : this.visitLiteralExpressionArb],
        ]
        for ( const [type, visitor] of Mappings ) {
            if ( node instanceof type )
                return visitor.call( this, node )
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

    /** @param {BinaryExpression} node  */
    visitBinaryExpressionArb( node ) {
        const left = this.visit( node.left )
        const right = this.visit( node.right )

        const Mappings = {
            [TokenType.Plus]: "add",
            [TokenType.Minus]: "sub",
            [TokenType.Multiply]: "mul",
            [TokenType.Divide]: "div",
            [TokenType.Modulus]: "mod",
            [TokenType.Power]: "pow",
        }

        let func = Mappings[node.operator.type]
        if ( !func ) throw new Error( `Operator ${node.operator.type} not supported with arbitrary precision` )

        return `${left}.${func}(${right})`
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

    /** @param {UnaryExpression} node  */
    visitUnaryExpressionArb( node ) {
        const operand = this.visit( node.operand )
        switch ( node.operator.type ) {
            case TokenType.Plus:
                return `${operand}`
            case TokenType.Minus:
                return `${operand}.mul(new BigNumber(-1))`
            case TokenType.Factorial:
                break /* not supported */
        }
        throw new Error( `Operator ${node.operator.type} not supported with arbitrary precision` )
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

    /** @param {FunctionExpression} node  */
    visitFunctionExpressionArb( node ) {
        throw new Error( `Function ${node.callee} not supported with arbitrary precision` )
    }

    /** @param {IdentifierExpression} node  */
    visitIdentifierExpression( node ) {
        if ( node.name in Math && typeof Math[node.name] === "number" )
            return `Math.${node.name}`

        return `(${node.name})`
    }

    /** @param {IdentifierExpression} node  */
    visitIdentifierExpressionArb( node ) {
        if ( node.name in Math && typeof Math[node.name] === "number" )
            return `new BigNumber(Math.${node.name})`

        return `new BigNumber((${node.name}))`
    }

    /** @param {LiteralExpression} node  */
    visitLiteralExpression( node ) {
        return node.value
    }

    /** @param {LiteralExpression} node  */
    visitLiteralExpressionArb( node ) {
        return `new BigNumber(${node.value})`
    }
}