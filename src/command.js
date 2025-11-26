import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
	findNotes,
	listNotes,
	newNote,
	removeAllNotes,
	removeNote,
} from "./notes.js";
import { DisplayNotes } from "./utils.js";

yargs(hideBin(process.argv))
	.command(
		"add <note>",
		"Create a new note",
		(yargs) => {
			yargs.positional("note", {
				describe: "Note content",
				type: "string",
			});
		},
		async (argv) => {
			const tags = argv.tags ? argv.tags.split(",") : [];
			const note = await newNote(argv.note, tags);

			console.log("New note created:", note);
		}
	)
	.options({
		tags: {
			alias: "t",
			type: "string",
			description: "Tags for the note",
		},
	})
	.command(
		"all",
		"List all notes",
		() => {},
		async (argv) => {
			const notes = await listNotes();
			DisplayNotes(notes);
		}
	)
	.command(
		"find <filter>",
		"get matching notes",
		(yargs) => {
			yargs.positional("filter", {
				describe:
					"The search term to filter notes by, will be applied to note.content",
				type: "string",
			});
		},
		async (argv) => {
			const matches = await findNotes(argv.filter);
			DisplayNotes(matches);
		}
	)
	.command(
		"remove <id>",
		"remove a note by id",
		(yargs) => {
			return yargs.positional("id", {
				type: "number",
				description: "The id of the note you want to remove",
			});
		},
		async (argv) => {
			const id = await removeNote(argv.id);
			console.log("Deleted id: ", id);
		}
	)
	.command(
		"web [port]",
		"Start the web server on specified port",
		(yargs) => {
			return yargs.positional("port", {
				describe: "Port to run the web server on",
				default: 3000,
				type: "number",
			});
		},
		(argv) => {
			console.log(`Starting web server on port: ${argv.port}`);
		}
	)
	.command(
		"clean",
		"remove all notes",
		() => {},
		async (argv) => {
			await removeAllNotes();
			console.log("Cleaned all notes");
		}
	)
	.demandCommand(1)
	.parse();
