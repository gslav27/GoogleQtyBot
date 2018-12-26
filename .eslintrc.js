module.exports = {
  "extends": "airbnb-base",
  "rules": {
    "linebreak-style": 0,
    "no-unused-expressions": 0,
    "no-param-reassign": 1,
    "guard-for-in": 1,
    "no-restricted-syntax": 1,
    "no-nested-ternary": 1,
    "camelcase": 1,
    "consistent-return": [1, { "treatUndefinedAsUnspecified": true }],
    "eqeqeq": 0,
    "max-len": 0,
    "no-underscore-dangle": 0,
    "no-multiple-empty-lines": 0,
    "one-var": 0,
    "no-return-assign": 1,
    "no-bitwise": 1,
    "no-multi-spaces": [2, { "ignoreEOLComments": true }], //--fix
    "quotes": [2, "single", { "allowTemplateLiterals": true }], // --fix
    "no-trailing-spaces": [2, { "skipBlankLines": true }], // --fix,
    "object-curly-newline": [2, { "multiline": true }], //--fix
    "operator-linebreak": [2, "after",
      {
        "overrides": {
          "?": "before",
          ":": "before"
        }
      }
    ], //--fix
    "class-methods-use-this": [2, { "exceptMethods": ["setSession", "logout", "isAuthenticated"] }],
    "quote-props": [2, "consistent-as-needed"],
    "import/no-extraneous-dependencies": 0,

    "prefer-template": 2, // --fix
    "semi": 2,  // --fix
    "no-extra-semi": 2, // --fix
    "prefer-const": 2, //--fix
    "indent": 2, //--fix
    "comma-dangle": 2, //--fix
    "arrow-parens": 2, //--fix
    "eol-last": 2, //--fix
    "space-in-parens": 2, //--fix
    "import/order": 2, //--fix
    "no-plusplus": 0,
  }
}