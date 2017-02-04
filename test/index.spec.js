var junitMerge = require('../lib/index.js')
var should = require('chai').should() // eslint-disable-line no-unused-vars
var expect = require('chai').expect // eslint-disable-line no-unused-vars

describe('File Handling', function () {
  describe('listXmlFiles()', function () {
    it('should return 5 files', function (done) {
      junitMerge.listXmlFiles('test/fixtures', function (err, res) {
        if (err) {
          throw err
        } else {
          res.length.should.equal(5)
          done()
        }
      })
    })

    it('should report not a valid directory', function (done) {
      junitMerge.listXmlFiles('bad_dir', function (err, res) {
        if (err) {
          err.code.should.equal('ENOENT')
          done()
        } else {
          res.should.equal('This should error')
          done()
        }
      })
    })

    it('should report not xml files found', function (done) {
      junitMerge.listXmlFiles('lib', function (err, res) {
        if (err) {
          err.should.equal('No xml files found')
          done()
        } else {
          res.should.equal('This should error')
          done()
        }
      })
    })
  })

  it('should be able to write a file', function (done) {
    junitMerge.writeMergedFile('test/moo.txt', 'moo', function (err, res) {
      if (err) {
        err.should.equal('This should not error')
      } else {
        expect('everything').to.be.ok
        done()
      }
    })
  })
})
