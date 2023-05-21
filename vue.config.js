const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath:'/',
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    proxy:{
      '/api':{
        target:'http://localhost:8081',
        changeOrigin:true,
        pathRewrite:{
          '^/api':''
        }
      },
      '/profile':{
        target:'http://localhost:8081/profile',
        changeOrigin:true,
        pathRewrite:{
          '^/profile':''
        }
      }
    }
  }
})
