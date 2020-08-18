const prompt = require("prompt-sync")();

const extractFromFront = (parent, separator) => {
	if (parent.indexOf(separator) >= 0) {
		const tokens = parent.split(separator);
		return { newStr: tokens.slice(1).join(separator), token: tokens[0] };
	} else return { newStr: parent, token: "" };
};

const extractFromBack = (parent, separator) => {
	if (parent.indexOf(separator) >= 0) {
		const tokens = parent.split(separator);
		return {
			newStr: tokens.slice(0, tokens.length - 1).join(separator),
			token: tokens[tokens.length - 1]
		};
	} else return { newStr: parent, token: "" };
};

const getUrlProps = (url) => {
	const out1 = extractFromFront(url, ":");
	const out2 = extractFromBack(out1.newStr, "#");
	const out3 = extractFromBack(out2.newStr, "?");
	const out4 = extractFromFront(out3.newStr, "//");
	const out5 = extractFromFront(out4.newStr, "@");
	const out6 = extractFromFront(out5.newStr, "/");

	const scheme = out1.token;
	const fragment = out2.token;
	const query_string = out3.token;
	let username = out5.token.split(":")[0];
	username = !!username ? username : "";

	let password = out5.token.split(":")[1];
	password = !!password ? password : "";

	let domain = out6.token.split(":")[0];
	let port = out6.token.split(":")[1];
	port = !!port ? ":" + port : "";
	let path = out6.newStr;

	const props = {
		scheme,
		fragment,
		query_string,
		username,
		password,
		domain,
		port,
		path
	};

	return props;
};

const url = prompt("Enter URL: ");
console.log(getUrlProps(url));
