const prompt = require("prompt-sync")();

const ways = (n) => {
	let a = 1;
	let b = 2;
	let c = 0;

	for (let i = 0; i < n - 2; i++) {
		c = a + b;
		a = b;
		b = c;
	}

	return c;
};

// time complexity: O(n)
// space complexity: O(1)

const waysWithSteps = (n, x) => {
	const arr = [1];

	for (let i = 1; i <= n; i++) {
		let sum = 0;
		for (let j = 0; j < x.length; j++) {
			if (i >= x[j]) sum += arr[i - x[j]];
		}
		arr[i] = sum;
	}

	return arr[n];
};

// time complexity: O(n*x.length)
// space complexity: O(n)

let steps = parseInt(prompt("No. of steps: "));

while (isNaN(steps)) {
	console.log("Bad Input!");
	steps = parseInt(prompt("No. of steps: "));
}

let allowedSteps = prompt(
	"Allowed steps array (Enter numbers separated by spaces): "
)
	.split(" ")
	.map((num) => parseInt(num));

console.log("No. of ways: ", waysWithSteps(steps, allowedSteps));
