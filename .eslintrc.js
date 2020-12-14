module.exports = {
	env: {
		browser: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:prettier/recommended",
		"plugin:react/recommended",
	],
	parser: "babel-eslint",
	parserOptions: {
		ecmaVersion: 2018,
		ecmaFeatures: {
			jsx: true,
		},
		sourceType: "module",
	},
	plugins: ["react", "prettier", "react-hooks"],
	rules: {
		"prettier/prettier": [
			"error",
			{
				usePrettierrc: true,
				fileInfoOptions: {
					withNodeModules: true,
				},
			},
		],
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
		"react/prop-types": 0,
		"react/display-name": 0,
		"react/jsx-uses-vars": 2,
	},
	settings: {
		react: {
			version: "detect",
		},
	},
}
