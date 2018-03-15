/**
 * 通用配置
 */
export default {

  // table分页的通用配置
  pagination: {
    pageSize: 20,
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal (total, range) {
      return `第${range[0]}-${range[1]}条 | 共${total} 条`
    },
  }
}