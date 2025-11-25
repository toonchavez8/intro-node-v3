import yargs from "yargs";
import { hideBin } from "yargs/helpers";

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
		(argv) => {
			console.log(`Adding note: ${argv.note}`);
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
			console.log("Listing all notes");
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
		(argv) => {
			console.log(`Finding notes with filter: ${argv.filter}`);
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
		async (argv) => {}
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
		async (argv) => {}
	)
	.demandCommand(1)
	.parse();
