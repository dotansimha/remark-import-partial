const { readFileSync, existsSync } = require('fs');
const { resolve } = require('path');
const visit = require('unist-util-visit');
const RGX = /{@import (.*?)}/;

module.exports = function() {
  const unified = this;

  return function transformer(tree, file) {
    visit(tree, 'paragraph', node => {
      if (
        node.children &&
        node.children[0] &&
        node.children[0].type === 'text'
      ) {
        const matches = (node.children[0].value || '').match(RGX);

        if (matches && matches[1]) {
          const filePath = matches[1];
          const fileAbsPath = resolve(file.dirname, filePath);

          if (existsSync(fileAbsPath)) {
            const rawMd = readFileSync(fileAbsPath, 'utf-8');
            node.children = unified.parse(rawMd);
          } else {
            throw new Error(
              `Unable to locate @import file in path: ${fileAbsPath}!`
            );
          }
        }
      }
    });
  };
};
