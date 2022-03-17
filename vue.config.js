module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://39.106.140.102:27031',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        }
    }
}