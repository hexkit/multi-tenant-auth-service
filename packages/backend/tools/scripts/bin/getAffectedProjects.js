#!/usr/bin/env node

import { argv } from 'node:process';
import { promisifiedExec } from '../src/promisifiedExec.js';

const TURBOREPO_ROOT_PACKAGE_NAME = '//';
const TURBOREPO_TASK_NOT_FOUND_MAGIC_STRING = '\u003cNONEXISTENT\u003e';

const VALID_TASK_NAME_PATTERN = /^[a-zA-Z0-9_:-]+$/;
const VALID_REF_PATTERN = /^[a-zA-Z0-9_./-]+$/;

const taskToDryRun = argv[2];
const baseRef = argv[3];

if (!taskToDryRun) {
  console.error('Usage: foundation-get-affected-projects <task> [baseRef]');
  process.exit(1);
}

if (!VALID_TASK_NAME_PATTERN.test(taskToDryRun)) {
  console.error('Invalid task name format');
  process.exit(1);
}

if (baseRef !== undefined && !VALID_REF_PATTERN.test(baseRef)) {
  console.error('Invalid baseRef format');
  process.exit(1);
}

let execCommand = `pnpm exec turbo run ${taskToDryRun} --dry=json`;

let stringifiedDryRun;
try {
  stringifiedDryRun = (await promisifiedExec(execCommand)).trim();
} catch (error) {
  console.error(`Failed to execute turbo command: ${error.message}`);
  process.exit(1);
}

let dryRunResult;
try {
  dryRunResult = JSON.parse(stringifiedDryRun);
} catch (error) {
  console.error(`Failed to parse turbo output as JSON: ${error.message}`);
  process.exit(1);
}

/** @type {Array.<string>} */
const dryResultPackageNames = dryRunResult.packages.filter(
  (packageName) => packageName !== TURBOREPO_ROOT_PACKAGE_NAME,
);

const tasks = dryRunResult.tasks.filter((task) =>
  dryResultPackageNames.some(
    (packageName) =>
      task.taskId === `${packageName}#${taskToDryRun}` &&
      !task.command.includes(TURBOREPO_TASK_NOT_FOUND_MAGIC_STRING),
  ),
);

/** @type {Array.<string>} */
const packageNames = tasks.map((task) => task.package);

console.log(JSON.stringify(packageNames));
