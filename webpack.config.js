//build in package to gain accses to absalute path
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = { 
    entry:['@babel/polyfill','./src/js/index.js'],
    output: { 
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: { 
        contentBase:'./dist'
        
    },
    plugins: [ 
        new HtmlWebpackPlugin({ 
             filename: 'index.html',
             template: './src/index.html'
        })
           
    ],
    module: { 
        rules:[ 
            { // test: testib k6iki filie et mis formaat nad on
                test:/\.js$/,
                //excludib k]ik failid sellel aadressil
                exclude: /node_modules/,
                use: { 
                    loader:'babel-loader'
                }
            }
        ]
    }

};