#!/usr/bin/env node

import process from 'node:process';
import { promisifiedExec } from '../src/promisifiedExec.js';

/**
 * @param {Array} elements Elements
 * @param {number} chunks chunks amount
 * @returns {Array.<Array>}
 */
function buildChunks(elements, chunks) {
  const chunkSize = Math.ceil(elements.length / chunks);

  const chunksArray = [];

  for (let i = 0; i < elements.length; i += chunkSize) {
    chunksArray.push(elements.slice(i, i + chunkSize));
  }

  return chunksArray;
}

const TURBOREPO_ROOT_PACKAGE_NAME = '//';
const TURBOREPO_TASK_NOT_FOUND_MAGIC_STRING = '\u003cNONEXISTENT\u003e';

const VALID_TASK_NAME_PATTERN = /^[a-zA-Z0-9_:-]+$/;
const VALID_REF_PATTERN = /^[a-zA-Z0-9_./-]+$/;

const taskToDryRun = process.argv[2];
const baseRef = process.argv[3];
const chunks = Number.parseInt(process.argv[4], 10);

if (!taskToDryRun) {
  process.stderr.write(
    'Usage: foundation-get-affected-project-chunks <task> <baseRef> <chunks>\n',
  );
  process.exit(1);
}

if (!VALID_TASK_NAME_PATTERN.test(taskToDryRun)) {
  process.stderr.write('Invalid task name format\n');
  process.exit(1);
}

if (!Number.isFinite(chunks) || chunks <= 0) {
  process.stderr.write('chunks must be a positive integer\n');
  process.exit(1);
}

let execCommand = `pnpm exec turbo run ${taskToDryRun} --dry=json`;

if (baseRef !== undefined) {
  if (!VALID_REF_PATTERN.test(baseRef)) {
    console.error('Invalid baseRef format');
    process.exit(1);
  }

  execCommand += ` --filter ...[${baseRef}]`;
}

let stringifiedDryRun;

try {
  stringifiedDryRun = (await promisifiedExec(execCommand)).trim();
} catch (error) {
  process.stderr.write(`Failed to execute turbo command: ${error.message}\n`);
  process.exit(1);
}

let dryRunResult;

try {
  dryRunResult = JSON.parse(stringifiedDryRun);
} catch (error) {
  process.stderr.write(
    `Failed to parse turbo output as JSON: ${error.message}\n`,
  );
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

const packageNameChunks = buildChunks(packageNames, chunks).filter(
  (chunk) => chunk.length > 0,
);

process.stdout.write(JSON.stringify(packageNameChunks));
