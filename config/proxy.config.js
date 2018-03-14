export default {
  '/api': {
    changeOrigin: true,
    target: ''
  },

  // 前端本地无backend环境时的mock
  '/api-mock': {
    target: 'http://localhost:8081',
  }
}
