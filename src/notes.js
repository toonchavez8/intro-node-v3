import { saveDB, getDB, insertDb } from "./db.js";

export const newNote = async (note, tags) => {
	const db = (await getDB()) ?? {};
	const notes = Array.isArray(db?.notes) ? db.notes : [];

	// Determine next ID:
	// - If there are existing "small" numeric IDs (likely already sequential), continue from the max.
	// - Otherwise (e.g. legacy timestamp IDs), fall back to notes.length + 1 to start simple sequential IDs.
	const numericIds = notes
		.map((n) => Number(n.id))
		.filter((n) => Number.isFinite(n) && n > 0);
	const smallIds = numericIds.filter((n) => n < 1e9);
	const nextId = smallIds.length ? Math.max(...smallIds) + 1 : notes.length + 1;

	const newNoteObj = {
		id: nextId,
		content: note,
		tags,
	};
	await insertDb(newNoteObj);
	return newNoteObj;
};

export const listNotes = async () => {
	const { notes } = await getDB();
	return notes;
};

export const findNotes = async (filter) => {
	const { notes } = await getDB();
	return notes.filter((note) =>
		note.content.toLowerCase().includes(filter.toLowerCase())
	);
};

export const removeNote = async (id) => {
	const { notes } = await getDB();
	// Coerce both sides to string so numeric/string id mismatches are handled
	const match = notes.find((note) => String(note.id) === String(id));

	if (match) {
		const newNotes = notes.filter((note) => String(note.id) !== String(id));
		await saveDB({ notes: newNotes });
		return id;
	}
};

export const removeAllNotes = () => saveDB({ notes: [] });
