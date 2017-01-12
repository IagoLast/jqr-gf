const SIZE = 256;
const PRIMITIVE = 0x11D; // m(x) = x^8 + x^4 + x^3 + x^2 + 1


function createExponentialsTable() {
	let expTable = new Array(SIZE);
	let x = 1;
	for (let i = 0; i <= SIZE - 1; i++) {
		expTable[i] = x;
		x = x * 2;
		if (x >= SIZE) {
			x = x ^ PRIMITIVE;
		}
	}
	return expTable;
}

function createLogarithmsTable(expTable) {
	if (!expTable) {
		expTable = createExponentialsTable();
	}
	let logTable = new Array(SIZE);
	for (let i = 0; i < SIZE - 1; i++) {
		logTable[expTable[i]] = i;
	}
	logTable[0] = undefined;
	return logTable;
}


module.exports = {
	createExponentialsTable: createExponentialsTable,
	createLogarithmsTable: createLogarithmsTable,
};
