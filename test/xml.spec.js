var chai = require('chai')
var junitMerge = require('../lib/index.js')
var fs = require('fs') // eslint-disable-line no-unused-vars
var should = chai.should() // eslint-disable-line no-unused-vars
var expect = chai.expect // eslint-disable-line no-unused-vars
var xsd = require('libxml-xsd')

describe('XML Handling', function () {
  describe('getTestsuites()', function () {
    it('should  return a testsuite', function (done) {
      junitMerge.getTestsuites('./test/fixtures/1.xml', function (err, res) {
        if (err) { throw err }
        res.should.have.string('testsuite name')
        done()
      })
    })

    it('should return 1 testsuites', function (done) {
      junitMerge.getTestsuites('./test/fixtures/1.xml', function (err, res) {
        if (err) {
          throw err
        }
        junitMerge.testsuiteCount.should.equal(1)
        done()
      })
    })

    it('should return 1 testsuite', function (done) {
      junitMerge.getTestsuites('./test/fixtures/testcase-1.xml', function (err, res) {
        if (err) {
          throw err
        }
        junitMerge.testsuiteCount.should.equal(1)
        done()
      })
    })

    it('should return 2 testsuites', function (done) {
      junitMerge.getTestsuites('./test/fixtures/3.xml', function (err, res) {
        if (err) {
          throw err
        }
        junitMerge.testsuiteCount.should.equal(2)
        done()
      })
    })

    it('should return No tests found', function (done) {
      junitMerge.mergeFiles(['./test/fixtures/empty.xml'], function (err, res) {
        if (err) {
          err.should.equal('No tests found')
          done()
        } else {
          res.should.equal('This should error')
          done()
        }
      })
    })

    it('should return merged xml file', function (done) {
      junitMerge.mergeFiles(['./test/fixtures/1.xml', './test/fixtures/3.xml'], function (err, res) {
        if (err) {
          throw err
        }
        res.length.should.equal(852)
        done()
      })
    })

    it('should return File not found', function (done) {
      junitMerge.getTestsuites('./test/fixtures/12.xml', function (err, res) {
        if (err) {
          err.should.equal('File not found')
          done()
        } else {
          res.should.equal(null)
          done()
        }
      })
    })

    it('Passes with valid input and valid schema', function (done) {
      var schema
      xsd.parseFile('test/fixtures/JUnit.xsd', function (err, schemaObj) {
        if (err) {
          throw err
        }
        schema = schemaObj
        schema.validateFile('merged-test-results2.xml', function (err, validationErrors) {
          if (err) {
            throw err
          } else {
            console.log('ICK')
            done()
          }
        })
      })
    })
  })
})
