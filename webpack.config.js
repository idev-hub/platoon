const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require("path");
const autoprefixer = require("autoprefixer");

module.exports = (env = {}, argv = {}) => {
    return {
        devtool: argv.mode === "development" ? 'source-map' : false,
        entry: {main: './src/index.js'},
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'assets/js/[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.(html)$/,
                    use: [{
                        loader: 'html-loader',
                        options: {
                            attributes: {
                                list: [
                                    {
                                        tag: "img",
                                        attribute: "src",
                                        type: "src"
                                    },
                                    {
                                        tag: "img",
                                        attribute: "data-src",
                                        type: "src"
                                    },
                                    {
                                        tag: "div",
                                        attribute: "data-bg",
                                        type: "src"
                                    },
                                    {
                                        tag: "div",
                                        attribute: "data-bg-hidpi",
                                        type: "src"
                                    },
                                    {
                                        tag: "video",
                                        attribute: "data-poster",
                                        type: "src"
                                    },
                                    {
                                        tag: "video",
                                        attribute: "src",
                                        type: "src"
                                    },
                                    {
                                        tag: "video",
                                        attribute: "data-src",
                                        type: "src"
                                    },
                                    {
                                        tag: "iframe",
                                        attribute: "data-src",
                                        type: "src"
                                    },
                                    {
                                        tag: "iframe",
                                        attribute: "src",
                                        type: "src"
                                    }
                                ]
                            }
                        }
                    }],
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: "babel-loader"
                },
                {
                    test: /\.(ttf|eot|woff|woff2|otf)$/,
                    use: {
                        loader: "file-loader",
                        options: {
                            context: path.resolve(__dirname, 'src'),
                            name: '[path][name].[ext]'
                        },
                    },
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [autoprefixer()],
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'resolve-url-loader',
                            options: {}
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            }
                        }
                    ]
                },
                {
                    test: /\.(gif|png|jpe?g|svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                context: path.resolve(__dirname, 'src'),
                                name: '[path][name].[ext]'
                            }
                        },
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                    progressive: true,
                                    quality: 95
                                },
                                optipng: {
                                    enabled: false,
                                },
                                pngquant: {
                                    quality: [0.80, 0.90],
                                    speed: 4
                                },
                                gifsicle: {
                                    interlaced: false,
                                },
                                webp: {
                                    quality: 95
                                },
                            }
                        }
                    ]
                }
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                inject: 'head',
                template: './src/index.html',
                filename: 'index.html',
                meta: {
                    'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
                }
            }),
            new MiniCssExtractPlugin({
                filename: 'style.css'
            })
        ]
    }
};
