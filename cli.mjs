#!/usr/bin/env node
import yargs from "yargs";
import commands from "./commands/index.js";

const y = yargs(process.argv.slice(2)).scriptName("pirate-parser").usage("$0 <cmd> [args]");

commands.forEach((commandData) => {
	const [command, description, builder, handler] = commandData();
	y.command(command, description, builder, handler);
});

y.help().argv;
