module.exports = {
  "/api/": {
    // target: "http://indicator.yxapp.xyz", changeOrigin: true, // 测试域名
    target: "http://10.106.165.244:8080", changeOrigin: true,
  },
  "/api-mock/": {
    target: "http://localhost:3001",
  }
}
