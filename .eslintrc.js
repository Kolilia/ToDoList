module.exports = {
	env: {
		browser: true,
		node: true,
	},
	extends: ["eslint:recommended", "plugin:react/recommended"],
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
				endOfLine: "auto",
			},
		],
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
		"react/prop-types": 0,
		"react/display-name": 0,
		"react/jsx-uses-vars": 2,
		"no-mixed-spaces-and-tabs": 0,
	},
	settings: {
		react: {
			version: "detect",
		},
	},
}
