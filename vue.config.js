/*
const FileManagerPlugin = require('filemanager-webpack-plugin')
const path = require("path");
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
  publicPath: '',//process.env.VUE_APP_ROUTER_BASE_URL,//若在服务器上，并非部署在根目录下，则设置此处，以及router/index的base
  configureWebpack: {  //webpack的相关配置在这里
    // plugins: [
    //   new FileManagerPlugin({  //初始化 filemanager-webpack-plugin 插件实例
    //     onEnd: {
    //       delete: [   //首先需要删除dist.zip
    //         './dist/dist.zip',
    //       ],
    //       archive: [ //然后我们选择dist文件夹将之打包成dist.zip
    //         {source: './dist', destination: './dist/dist.zip'},
    //       ]
    //     }
    //   })
    // ]
  },
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"))
            .set("assets", resolve("src/assets"))
            .set("common", resolve("src/common"))
            .set("components", resolve("src/components"))
            .set("views", resolve("src/views"))
            .set("public", resolve("public"));
    },
    devServer: {
        proxy: {
            '/': {
                // 测试环境
                target: 'http://localhost:3000',  // 接口域名
                changeOrigin: true,  //是否跨域
                ws: true,
                pathRewrite: {
                    '^/': '/'   //需要rewrite重写的,
                }
            }
        },
        host: 'localhost', // can be overwritten by process.env.HOST
        port: 8082,
        autoOpenBrowser: true,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false,
    },
}
*/
module.exports = {
    devServer: {
        proxy: {
            '/': {
                // 测试环境
                target: 'http://localhost:3000',  // 接口域名
                changeOrigin: true,  //是否跨域
                ws: true,
                pathRewrite: {
                    '^/': '/'   //需要rewrite重写的,
                }
            }
        },
        host: 'localhost', // can be overwritten by process.env.HOST
        port: 8080,
        https: false,
        hotOnly: false, // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
        disableHostCheck: true,
    }, // 第三方插件配置

};