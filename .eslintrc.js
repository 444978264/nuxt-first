module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {}, //要使用的全局变量, 值为false 禁止修改
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/vue'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    camelcase: 0,
    'no-duplicate-case': 2,
    'no-empty': 2,
    'no-inner-declarations': 2,
    'no-func-assign': 2,
    'no-unreachable': 1,
    'default-case': 1,
    eqeqeq: 2,
    'no-alert': 1,
    'no-case-declarations': 2,
    'no-else-return': 1,
    'no-empty-pattern': 2,
    'no-multi-str': 2, //禁止使用多行字符串
    'no-unmodified-loop-condition': 2,
    'require-await': 2,
    'vars-on-top': 1,
    'prefer-const': 0
  }
};
