/**
 * @typedef {"function"|"constant"} DefinitionType
 */

export class Definition {
    /** @param {DefinitionType} type */
    static createConstructor( type ) {
        /** @param {string} identifier */
        return identifier => new Definition( identifier, type )
    }

    /** @param {string} identifier @param {DefinitionType} type */
    constructor( identifier, type ) {
        this.identifier = identifier
        this.type = type
    }
}

export const D = {
    fn: Definition.createConstructor( "function" ),
    c: Definition.createConstructor( "constant" ),
}