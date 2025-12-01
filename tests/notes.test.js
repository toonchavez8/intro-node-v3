import { beforeEach, jest, test } from "@jest/globals";

jest.unstable_mockModule("../src/db.js", () => {
	return {
		insertDb: jest.fn(),
		getDB: jest.fn(),
		saveDB: jest.fn(),
	};
});
const { insertDb, getDB, saveDB } = await import("../src/db.js");

const { newNote, listNotes, findNotes, removeNote, removeAllNotes } =
	await import("../src/notes.js");

beforeEach(async () => {
	insertDb.mockClear();
	getDB.mockClear();
	saveDB.mockClear();
});

describe("cli app notes functions", () => {
	test("newNote creates a note with sequential ID", async () => {
		const Note = {
			content: "Test note",
			tags: ["test"],
			id: 1,
		};
		insertDb.mockResolvedValue(Note);

		const result = await newNote(Note.content, Note.tags);
		expect(result).toEqual(Note);
	});

	test("listNotes retrieves all notes", async () => {
		const notes = [
			{ id: 1, content: "Note 1", tags: [] },
			{ id: 2, content: "Note 2", tags: ["tag1"] },
		];
		getDB.mockResolvedValue({ notes });
		const result = await listNotes();
		expect(result).toEqual(notes);
	});

	test("removeNote deletes a note by ID", async () => {
		const notes = [
			{ id: 1, content: "Note 1", tags: [] },
			{ id: 2, content: "Note 2", tags: ["tag1"] },
		];
		getDB.mockResolvedValue({ notes });
		saveDB.mockResolvedValue();
		const result = await removeNote(3);
		expect(result).toBeUndefined();
	});
});
