import fs from "node:fs/promises";

async function readPjson() {
	const pjsonPath = new URL("./package.json", import.meta.url);
	const data = await fs.readFile(pjsonPath);
	console.log(JSON.parse(data));
}

readPjson();

const writeFile = async () => {
	const filePath = new URL("./output.txt", import.meta.url);
	await fs.writeFile(filePath, "Hello, World!", "utf-8");
	console.log("File written successfully.");
};
writeFile();
