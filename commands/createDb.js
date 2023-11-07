//import { Argv } from "yargs";
import db from "../app/lib/db.server";

console.log(db)

export default () => {
	return [
		"db:create",
		"create db",
		(yargs) => {
			const res = db.prepare(`
			CREATE TABLE requests (
				id       INTEGER PRIMARY KEY AUTOINCREMENT,
				path     TEXT    NOT NULL,
				code     INTEGER NOT NULL,
				request  TEXT    NOT NULL,
				response TEXT,
				time     TEXT    DEFAULT (datetime('now') ),
				duration INTEGER
			);
			
			`).run()
			console.log(res)
		},
		(argv) => {
			console.log("hello", argv, "welcome to yargs!");
		},
	];
};
