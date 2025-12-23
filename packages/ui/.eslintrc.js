module.exports = {
  extends: ["eslint:recommended"],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  ignorePatterns: ["node_modules/**", "dist/**", ".next/**", "storybook-static/**"],
  rules: {
    // Add any custom rules here
  },
};

