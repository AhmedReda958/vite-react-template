#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// The first argument will be the project name.
const projectName = process.argv[2];

// Create a project directory with the project name.
const currentDir = process.cwd();
const projectDir = path.resolve(currentDir, projectName);
fs.mkdirSync(projectDir, { recursive: true });

// A common approach to building a starter template is to
// create a `template` folder which will house the template
// and the files we want to create.
const templateDir = path.resolve(__dirname, "template");
fs.cpSync(templateDir, projectDir, { recursive: true });

// It is good practice to have dotfiles stored in the
// template without the dot (so they do not get picked
// up by the starter template repository). We can rename
// the dotfiles after we have copied them over to the
// new project directory.
// fs.renameSync(
//   path.join(projectDir, "gitignore"),
//   path.join(projectDir, ".gitignore")
// );

const projectPackageJson = require(path.join(projectDir, "package.json"));

// Update the project's package.json with the new project name
projectPackageJson.name = projectName;

fs.writeFileSync(
  path.join(projectDir, "package.json"),
  JSON.stringify(projectPackageJson, null, 2)
);

console.log("Success! Your new project is ready.\nNow run:\n");
console.log(
  `cd ${projectName.includes(" ") ? `"${templateDir}"` : projectName}\n`
);
console.log(`npm install \n`);
console.log(`npm run dev \n`);
