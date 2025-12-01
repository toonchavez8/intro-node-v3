import fs from "node:fs/promises";
import http from "node:http";
import open from "open";

const interpolate = (html, data) => {
	return html.replaceAll(
		/{{\s*(\w+)\s*}}/g,
		(match, placeholder) => data[placeholder] || ""
	);
};

const formatNotes = (notes) => {
	return (Array.isArray(notes) ? notes : [])
		.map(
			(note) => `<div class="note">
    <h2>Note #${note.id}</h2>
    <p>${note.content}</p>
    <p><strong>Tags:</strong> ${
			Array.isArray(note.tags) ? note.tags.join(", ") : note.tags || ""
		}</p>
</div>`
		)
		.join("\n");
};

const createServer = async (notes) => {
	return http.createServer(async (req, res) => {
		const HTML_PATH = new URL("./template.html", import.meta.url);
		const template = await fs.readFile(HTML_PATH, "utf-8");
		const html = interpolate(template, { notes: formatNotes(notes) });

		res.writeHead(200, { "Content-Type": "text/html" });
		res.end(html);
	});
};

const PORT = 4000;

const startServer = async (notes, port = PORT) => {
	const server = await createServer(notes);
	server.listen(port, () => {
		console.log(`Server is listening on port ${port}`);
		open(`http://localhost:${port}`);
	});
};
export { createServer, startServer, PORT, interpolate, formatNotes };
