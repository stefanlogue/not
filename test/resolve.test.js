'use strict'

import Not from '../index.cjs'
import chai from 'chai'
import NotTypeError from '../dist/node/core/NotTypeError.js'
chai.should()

const should = require('chai').should()

describe('resolve', () => {

    const you = Object.create(Not)
    you.lodge('string', 'someString')

    it('should resolve callback with payload when all lodged cases pass (payload should be undefined. returns what callback returns)', () => {
        let returned = you.resolve((errors, payload) => { return [ errors, payload ] })
            returned.should.be.an('array')
            returned.length.should.equal(2)
            returned.should.include.members([
                false,
                undefined
            ])
    })

    const you2 = Object.create(Not)
    you2.lodge('string', new String())
    you2.lodge('array', {})
    it('should resolve callback when there are failed lodged cases', () => {
        let errors = you2.resolve(errors => { return errors })
        errors.should.be.an('array')
        errors.should.include.members([
            'Wrong Type: Expecting type `string` but got `object` with value of ``.',
            'Wrong Type: Expecting type `array` but got `object` with value of `{}`.'          
        ])
        errors.length.should.equal(2)
    })

    const you3 = Object.create(Not)
    you3.willThrowError = true
    you3.lodge('string', 'someString')
    you3.lodge('function', {})
    it('should throw errors when no callback provided', () => {
        (()=> {
            you3.resolve()
        }).should.Throw(NotTypeError, 'Wrong types provided. See `trace`.')
    })
    it('should empty _lodged array after resolving', () => {
        you3._lodged.should.be.an('array')
        you3._lodged.length.should.equal(0)
    })

})
