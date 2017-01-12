const galoisField = require('../src/GaloisField.js');
const assert = require('assert');

describe('GaloisField:', () => {
	describe('zero', () => {
		it('should be defined ', () => {
			assert(galoisField.zero);
		});
	});

	describe('one', () => {
		it('should be defined ', () => {
			assert(galoisField.one);
		});
	});

	describe('add', () => {
		it('0+0 ', () => {
			var result = galoisField.add(0x00, 0x00);
			assert.equal(0x00, result);
		});
		it('240+15', () => {
			var result = galoisField.add(0xf0, 0x0f);
			assert.equal(0xff, result);
		});
		it('256-2', () => {
			var result = galoisField.add(0xff, 0x02);
			assert.equal(253, result);
		});
	});

	describe('multiply', () => {
		it('2x2', () => {
			let result = galoisField.mul(0x02, 0x02);
			assert.equal(result, 4);
		});
		it('0x15', () => {
			let result = galoisField.mul(0x00, 0x0f);
			assert.equal(result, 0);
		});
		it('91x1', () => {
			let result = galoisField.mul(0x5b, 0x01);
			assert.equal(result, 0x5b);
		});
		it('162x241', () => {
			let result = galoisField.mul(0xa2, 0xf1);
			assert.equal(result, 0x85);
		});
	});

	describe('divide', () => {
		it('2/2', () => {
			let result = galoisField.div(0x02, 0x02);
			assert.equal(result, 1);
		});
		it('0/15', () => {
			let result = galoisField.div(0x00, 0x0f);
			assert.equal(result, 0);
		});
		it('91/1', () => {
			let result = galoisField.div(0x5b, 0x01);
			assert.equal(result, 0x5b);
		});
		it('64/4', () => {
			let result = galoisField.div(0x40, 0x04);
			assert.equal(result, 0x10);
		});

		describe('buildMonomial', () => {
			it('should return a monomial', () => {
				let monomial = galoisField.buildMonomial(2, 1);
				assert.deepEqual(monomial.getCoefficients(), [1, 0, 0]);
			});
		});
	});
});
