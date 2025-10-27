module.exports = {
  // Frontend files - use frontend's own eslint config
  'apps/frontend/**/*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
  // Backend files - use backend's own eslint config
  'apps/backend/**/*.ts': ['eslint --fix', 'prettier --write'],
  // Shared package files
  'packages/**/*.ts': ['eslint --fix', 'prettier --write'],
  // Other files
  '*.{json,md,yml,yaml,scss,css}': ['prettier --write'],
};
