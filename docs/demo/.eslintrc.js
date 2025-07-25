/**
 * ESLint configuration for VybeCoding demo
 * Code quality and consistency rules
 */

module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true
  },
  
  extends: [
    'eslint:recommended'
  ],
  
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  
  globals: {
    // Global variables
    '__APP_VERSION__': 'readonly',
    '__BUILD_TIME__': 'readonly',
    '__DEV__': 'readonly'
  },
  
  rules: {
    // Error prevention
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'warn',
    'no-unused-vars': ['error', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],
    
    // Code style
    'indent': ['error', 4, { SwitchCase: 1 }],
    'quotes': ['error', 'single', { allowTemplateLiterals: true }],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'never'],
    
    // Best practices
    'eqeqeq': ['error', 'always'],
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-arrow-callback': 'error',
    'arrow-spacing': 'error',
    
    // ES6+ features
    'prefer-template': 'error',
    'template-curly-spacing': ['error', 'never'],
    'object-shorthand': 'error',
    'prefer-destructuring': ['error', { 
      array: false, 
      object: true 
    }],
    
    // Function rules
    'no-unused-expressions': 'error',
    'no-useless-return': 'error',
    'consistent-return': 'error',
    
    // Async/await
    'require-await': 'error',
    'no-async-promise-executor': 'error',
    
    // Import/export
    'no-duplicate-imports': 'error'
  },
  
  overrides: [
    // Specific rules for module files
    {
      files: ['js/modules/*.js'],
      rules: {
        'no-console': ['error', { allow: ['warn', 'error'] }]
      }
    },
    
    // Specific rules for config files
    {
      files: ['*.config.js', '.eslintrc.js'],
      env: {
        node: true
      },
      rules: {
        'no-console': 'off'
      }
    }
  ]
};