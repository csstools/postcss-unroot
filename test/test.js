var path    = require('path');
var postcss = require('postcss');
var expect  = require('chai').expect;
var fs      = require('fs');
var debug   = false;

var plugin = require('../');

function test(name, opts, done, warnings) {
	var fixtureDir = './test/fixtures/';
	var baseName   = name.split(':')[0];
	var testName   = name.split(':').join('.');
	var inputPath  = path.resolve(fixtureDir + baseName + '.css');
	var expectPath = path.resolve(fixtureDir + testName + '.expect.css');
	var actualPath = path.resolve(fixtureDir + testName + '.actual.css');

	var inputCSS  = fs.readFileSync(inputPath, 'utf8');
	var expectCSS = fs.readFileSync(expectPath, 'utf8');

	warnings = warnings || 0;

	postcss([plugin(opts)]).process(inputCSS, {
		from: inputPath
	}).then(function (result) {
		var actualCSS = result.css;

		if (debug) fs.writeFileSync(actualPath, actualCSS);

		expect(actualCSS).to.eql(expectCSS);
		expect(result.warnings()).to.have.length(warnings);

		done();
	}).catch(function (error) {
		done(error);
	});
}

describe('postcss-unroot', function () {
	it('supports basic usage', function (done) {
		test('basic', {}, done);
	});

	it('supports "copy" usage', function (done) {
		test('basic:copy', { method: 'copy' }, done);
	});

	it('supports "warn" usage', function (done) {
		test('basic:warn', { method: 'warn' }, done, 1);
	});

	it('supports usage with <svg>', function (done) {
		test('svg', {}, done);
	});

	it('supports usage with class', function (done) {
		test('class', {}, done);
	});
});
