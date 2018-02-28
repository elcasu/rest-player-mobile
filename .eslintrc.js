module.exports = {
  extends: "eslint:recommended",
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      globalReturn: false,                      // allow return statements in the global scope
      impliedStrict: false,                     // enable global strict mode (if ecmaVersion is 5 or greater)
      jsx: true,                                // enable JSX
      experimentalObjectRestSpread: false       // enable support for the experimental object rest/spread properties
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true
  }
}
