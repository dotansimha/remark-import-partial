const assert = require('assert');
const remark = require('remark');
const importPartial = require('../');
const fs = require('fs');
const path = require('path');
const { readSync } = require('to-vfile');

const input = readSync(path.join(__dirname, 'input1.md'), 'utf8');
const outputExpected = fs.readFileSync(path.join(__dirname, 'output1.md'), 'utf8');
const output = remark().use(importPartial).processSync(input).toString();
assert.equal(output, outputExpected);
