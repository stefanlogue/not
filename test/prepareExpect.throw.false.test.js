'use strict'

import NotProto from '../index.cjs'
import chai from 'chai'

chai.should()

const should = require('chai').should()
const Not = NotProto.create({ throw: false })

describe('prepareExpect (throw=false)', () => {

    it('should map string "optional" in `expect` into "null" and "undefined"', () => {
        Not.prepareExpect([
            'undefined',
            'object',
            'optional'
        ]).should.be.an('array').that.include.members([
            'undefined',
            'object',
            '$$custom_optional'
        ])
    })

    it('should throw error when not given string or array', () => {
        (() => {
            Not.prepareExpect(1)
        }).should.Throw(TypeError, 'Internal error: Say what you expect to check as a string or array of strings. Found `number`.')
    })

})

