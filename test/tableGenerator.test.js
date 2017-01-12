const TableGenerator = require('../src/TableGenerator.js');
const assert = require('assert');

describe('TableGenerator', () => {
	describe('createExponentialsTable', () => {
		it('should return a table with 255 distinct elements. ', () => {
			let E = TableGenerator.createExponentialsTable();
			let set = new Set(E);
			assert.equal(set.size, 255);
		});
	});

	describe('createLogarithmsTable', () => {
		let L;

		beforeEach(() => {
			L = TableGenerator.createLogarithmsTable();
		});

		it('should return a table with undefined in the first cell', () => {
			assert.equal(L[0], undefined);
		});
		it('should return a table with 255 distinct elements (removing undefined). ', () => {
			let set = new Set(L);
			set.delete(undefined);
			assert.equal(set.size, 255);
		});
	});
});
