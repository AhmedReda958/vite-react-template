#!/usr/bin/env 

const { join, resolve } = require("path");
const { cpSync, mkdirSync, writeFileSync } = require("fs");

function getProjectName() {
  return process.argv[2];
}

function createProjectDirectory(projectDir) {
  mkdirSync(projectDir, { recursive: true });
}

function copyTemplateFiles(templateDir, projectDir) {
  cpSync(templateDir, projectDir, { recursive: true });
}

function updatePackageJson(projectDir, projectName) {
  const packageJsonPath = join(projectDir, "package.json");
  const projectPackageJson = require(packageJsonPath);
  projectPackageJson.name = projectName;
  writeFileSync(packageJsonPath, JSON.stringify(projectPackageJson, null, 2));
}

function printSuccessMessage(projectName) {
  console.log("Success! Your new project is ready.\nNow run:");
  console.log(`cd ${projectName.includes(" ") ? `"${projectName}"` : projectName}`);
  console.log("npm install");
  console.log("npm run dev");
}

function main() {
  const projectName = getProjectName();
  const currentDir = process.cwd();
  const projectDir = resolve(currentDir, projectName);
  const templateDir = resolve(__dirname, "template");

  createProjectDirectory(projectDir);
  copyTemplateFiles(templateDir, projectDir);
  updatePackageJson(projectDir, projectName);
  printSuccessMessage(projectName);
}

main();
