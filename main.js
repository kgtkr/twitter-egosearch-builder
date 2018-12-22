const fs = require("fs");

const config = JSON.parse(fs.readFileSync("config.json", { encoding: "utf8" }));
fs.writeFileSync("output.txt", config.include_words.join(" OR ") + " " + config.self_accounts.map(x => `-from:${x} -@${x}`).join(" ") + " " + config.exclude_accounts.map(x => `-from:${x} -@${x}`).join(" "));