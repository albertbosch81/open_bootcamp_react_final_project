const path = require('path')

// Plugins y minificadores de css y sass

const HtmlWebpackPlugin = require('html-webpack-plugin'); //para el template html que usa webpack
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //para reducir css
const { SourceMapDevToolPlugin } = require('webpack'); //conocer el soruce map del proyecto
const ESLintPlugin = require('eslint-webpack-plugin');

// Configurar puerto
const port = process.env.PORT || 3000;

// Exportar configuración webpack

module.exports = {

    entry: './src/index.jsx',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.[fullhash].js',
        publicPath: '/'
    },
    context: path.resolve(__dirname),
    devServer:{
        port,
        // inline: true,
        historyApiFallback: true
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            // reglas para archivos js y jsx
            {
                enforce: 'pre',
                test: /(\.js|\.jsx)$/,
                exclude: /node_modules/,
                use: [
                    'source-map-loader'
                ]
            },
            // Reglas para archivos js y jsx - bable
            {
                test: /(\.js|\.jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/env',
                            '@babel/react',
                        ],
                    },
                },
            },
            // Reglas para css, scss, sass minifica y carga
            // {
            //     test: /(\.css|\.scss|\.sass)$/,
            //     exclude: /node_modules\/bootstrap/,
            //     use: [
            //         {
            //             loader: MiniCssExtractPlugin.loader,
            //         },
            //         'css-loader',
            //         'sass-loader',
            //     ],
            // },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            
            // Reglas para img
            {
                test: /(\.png|\.jpe?g|\.gif)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        // Template html
        new HtmlWebpackPlugin(
            {
                template: './public/index.html'
            }
        ),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
          }),
        new SourceMapDevToolPlugin(
            {
                filename: '[file].map'
            }
        ),
        new ESLintPlugin({
            // Rutas a los archivos que quieres verificar (por defecto, se verifica todo el proyecto)
            files: ['src/**/*.js', 'src/**/*.jsx'],
        
            // Rutas a los archivos que quieres ignorar (por defecto, no se ignoran archivos)
            exclude: ['node_modules', 'build'],

        
            // Salida detallada de ESLint (opcional)
            emitWarning: true,
            emitError: true,
        
            // Habilita o deshabilita la verificación de los archivos durante la compilación (opcional, por defecto es true)
            // Si se establece en falso, los archivos se verificarán solo en el modo de desarrollo
            // Para verificar los archivos en producción, debe ejecutar el comando de construcción con la variable de entorno NODE_ENV establecida en "development"
            // NODE_ENV=development npm run build
            failOnError: false,
            failOnWarning: false,
          })

    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss', '.sass'],
        modules: [
            'node_modules'
        ]
    }
}