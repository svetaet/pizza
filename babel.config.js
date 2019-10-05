const targets = {
	dev: 'chrome >= 75',
	server: 'current node',
	client:
		'edge >=15, ff >=54, chrome >=55, safari >=10.1, ios >=10.3, and_chr >=0, and_ff >=0, and_uc >=0, opera >=42, op_mob >=46, samsung >=6.2',
}

module.exports = {
	comments: false,

	presets: [
		[
			'@babel/preset-env',
			{
				useBuiltIns: 'usage',
				corejs: 3,
				targets: targets[process.env.TARGET_ENV],
				modules: false,
			},
		],
		'@babel/preset-react',
		'@babel/preset-typescript',
		'@emotion/babel-preset-css-prop',
	],

	plugins: [
		'react-hot-loader/babel',
		'transform-react-remove-prop-types',
		// [
		// 	'transform-imports',
		// 	{
		// 		'react-router': { transform: 'react-router/${member}', preventFullImport: true },
		// 	},
		// ],
	],
}
