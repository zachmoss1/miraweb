#!/usr/bin/env node

const { readFile } = require("fs").promises;
const { join } = require("path");
const { execSync } = require("child_process");

const { executeMain, REPO_DIR, runAsync } = require("./helpers");

executeMain(async () => {


	const changes = execSync("git status -s").toString();
	if (changes && changes.length) {
		console.error("Git Directory not clean. Please make sure you are working from a clean HEAD");
		process.exit(1);
		return;
	}

	await runAsync("yarn", ["run", "test"]);
	// await runAsync("yarn", ["run", "setversion"]);

	// const newVersion = JSON.parse(await readFile(join(REPO_DIR, "package.json"))).version;
	// await runAsync("yarn", ["publish", join(REPO_DIR, "packages", "xebra-communicator"), "--new-version", newVersion]);
	// await runAsync("yarn", ["publish", join(REPO_DIR, "packages", "xebra.js"), "--new-version", newVersion]);

});
