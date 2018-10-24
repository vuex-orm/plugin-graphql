"use strict";
var _a = require("shelljs"), cd = _a.cd, exec = _a.exec, echo = _a.echo, touch = _a.touch;
var readFileSync = require("fs").readFileSync;
var url = require("url");
var repoUrl;
var pkg = JSON.parse(readFileSync("package.json"));
if (typeof pkg.repository === "object") {
    if (!pkg.repository.hasOwnProperty("url")) {
        throw new Error("URL does not exist in repository section");
    }
    repoUrl = pkg.repository.url;
}
else {
    repoUrl = pkg.repository;
}
var parsedUrl = url.parse(repoUrl);
var repository = (parsedUrl.host || "") + (parsedUrl.path || "");
var ghToken = process.env.GH_TOKEN;
echo("Deploying docs!!!");
cd("docs");
touch(".nojekyll");
exec("git init");
exec("git add .");
exec('git config user.name "phortx"');
exec('git config user.email "bk@itws.de"');
exec('git commit -m "docs(docs): update gh-pages"');
exec("git push --force --quiet \"https://" + ghToken + "@" + repository + "\" master:gh-pages");
echo("Docs deployed!!");
//# sourceMappingURL=gh-pages-publish.js.map