const prompt = require("prompt-sync")({ sigint: true });

const areEqual = (arr1, arr2) => {
	for (let i = 0; i < arr1.length; i++) {
		for (let j = 0; j < arr1[i].length; j++) {
			if (arr1[i][j] !== arr2[i][j]) return false;
		}
	}

	return true;
};

const abcArray = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z"
];

const generateArrays = (size) => {
	const start = [];
	for (let i = 0; i < size; i++) {
		start[i] = [];
		for (let j = 0; j < size; j++) {
			start[i][j] = Math.round(Math.random());
		}
	}

	const colKeys = abcArray.slice(0, size);
	let end = [...start];

	for (let i = 0; i < 20; i++) {
		if (Math.round(Math.random()) === 0) {
			end = flipCol(end, Math.floor(size * Math.random()));
		} else {
			end = flipRow(end, Math.floor(size * Math.random()));
		}
	}

	return { start, end, colKeys };
};

const printStatus = (arr1, arr2, colKeys, flips) => {
	console.log("");
	console.log(`   ${colKeys.join(" ")}      ${colKeys.join(" ")}`);
	for (let i = 0; i < arr1.length; i++)
		console.log(`${i}  ${arr1[i].join(" ")}   ${i + 1}  ${arr2[i].join(" ")}`);

	console.log("");
	console.log(`Your flips: ${flips}   Goal: 20`);
};

const flipRow = (arr, rowIndex) => {
	arr[rowIndex] = arr[rowIndex].map((elem) => (elem === 0 ? 1 : 0));
	return arr;
};

const flipCol = (arr, colNumber) => {
	for (let i = 0; i < arr.length; i++) {
		arr[i][colNumber] = arr[i][colNumber] === 0 ? 1 : 0;
	}
	return arr;
};

let data = prompt("Enter array size: ");
let size = parseInt(data);

while (isNaN(size)) {
	console.log("Bad Input!");
	data = prompt("Enter array size: ");
	size = parseInt(data);
}

let { start, end, colKeys } = generateArrays(size);

let flips = 0;
while (!areEqual(start, end)) {
	printStatus(start, end, colKeys, flips);
	let key = prompt("Enter rowkey or column key to flip: ").toUpperCase();
	if (colKeys.includes(key)) {
		flips += 1;
		start = flipCol(start, abcArray.indexOf(key));
	} else if (!isNaN(parseInt(key))) {
		flips += 1;
		start = flipRow(start, key);
	} else console.log("Bad Input!");
}

printStatus(start, end, colKeys, flips);
console.log("Game over!");
