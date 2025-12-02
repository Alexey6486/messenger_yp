module.exports = {
	customSyntax: "postcss-syntax",
	extends: ['stylelint-config-standard', 'stylelint-config-css-modules'],
	plugins: ['stylelint-order'],
	rules: {
		'color-hex-length': 'long',
		"no-descending-specificity": null,
		"no-duplicate-selectors": null,
	},
};
