const fs = require("fs");

const config = JSON.parse(fs.readFileSync("config.json", { encoding: "utf8" }));

function unflatten(arr, c) {
  return arr.reduce(function (r, x, i) {
    if (i % c == 0) {
      r.push([]);
    }
    r[r.length - 1].push(x);
    return r;
  }, []);
}

function createWords(res, cur, i, list) {
  if (i === list.length) {
    res.push(cur);
  } else {
    for (let x of list[i]) {
      createWords(res, cur + x, i + 1, list);
    }
  }
}

const words = [];
for (let list of config.include_words) {
  createWords(words, "", 0, list);
}


fs.writeFileSync("output.txt", unflatten(words, config.word_limit)
  .map(words => words.join(" OR ") + " " + config.self_accounts.map(x => `-from:${x} -@${x}`).join(" ") + " " + config.exclude_accounts.map(x => `-from:${x} -@${x}`).join(" "))
  .join("\n"));