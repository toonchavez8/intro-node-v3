export const DisplayNotes = (notes) => {
	if (!Array.isArray(notes) || notes.length === 0) {
		console.log("No notes found.");
		return;
	}

	const rows = notes.map(({ id, content, tags }) => ({
		id: String(id),
		content: String(content ?? ""),
		tags: Array.isArray(tags) ? tags.join(", ") : String(tags ?? ""),
	}));

	console.table(rows);
};
