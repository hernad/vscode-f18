const path = require('path');

module.exports = {
	entry: './src/index.tsx',
	mode: 'production',  // mode: development
	output: {
		filename: 'bundle.js',
		path: __dirname + '/../build/dist'
	},

	devtool: 'source-map', // Enable sourcemaps for debugging webpack's output.

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [ '.ts', '.tsx', '.js', '.json', '.mjs' ]
	},

	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			//{ test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
			{ test: /\.tsx?$/, 
			  loader: 'ts-loader',
			  options: {
				transpileOnly: true
			  } 
		    },

			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },

            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            /*
			{
				test: /\.css$/,
				include: path.join(__dirname, 'src/components'),
				use: [
					'style-loader',
					{
						loader: 'typings-for-css-modules-loader',
						options: {
							modules: true,
							namedExport: true
						}
					}
				]
            }
            */
           {
            test: /\.mjs$/,
            include: /node_modules/,
            type: "javascript/auto",
           }
          
		]
	},

	// When importing a module whose path matches one of the following, just
	// assume a corresponding global variable exists and use that instead.
	// This is important because it allows us to avoid bundling all of our
	// dependencies, which allows browsers to cache those libraries between builds.
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM'
	}
};
