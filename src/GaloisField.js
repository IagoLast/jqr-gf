const jqrPoly = require('jqr-poly');
const TableGenerator = require('./tableGenerator.js');
const expTable = TableGenerator.createExponentialsTable();
const logTable = TableGenerator.createLogarithmsTable();

/**
 * Represent a Galois field.
 * <br>
 * Since all methods are static, this class doesn't need to be instantiated.
 */
class GaloisField {

	static zero() {
		return jqrPoly.create([0], this);
	}

	static one() {
		return jqrPoly.create([1], this);
	}

	/**
	 * Add two numbers in the field
	 */
	static add(a, b) {
		return a ^ b;
	}

	/**
	 * Exponentiate a number
	 */
	static exp(a) {
		return expTable[a];
	}

	/**
	 * Logarithm of a number
	 */
	static log(a) {
		if (a == 0) {
			throw RangeError('log() argument must be positive');
		}
		return logTable[a];
	}

	/**
	 * Multiply two polynomials in the GF
	 */
	static mul(a, b) {
		if (a == 0 || b == 0) {
			return 0;
		}
		if (a == 1) {
			return b;
		}
		if (b == 1) {
			return a;
		}
		return expTable[(logTable[a] + logTable[b]) % 255];
	}

	/**
	 * Divide two polynomials in the GF
	 */
	static div(a, b) {
		if (b == 0) {
			throw RangeError('divide() cannot divide by zero');
		}
		if (a == 0) {
			return 0;
		}
		if (b == 1) {
			return a;
		}
		return expTable[(logTable[a] - logTable[b]) % 255];
	}

	/**
	 * Inverse of a number in the GF
	 */
	static inv(a) {
		if (a == 0) {
			throw RangeError('inv() argument must be positive');
		}
		return expTable[255 - logTable[a]];
	}

	/**
	 * Build a monomial in the GF
	 */
	static buildMonomial(degree, coefficient) {
		return jqrPoly.Polynomial.buildMonomial(degree, coefficient, this);
	}

}

module.exports = GaloisField;
