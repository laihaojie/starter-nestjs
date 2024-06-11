import { Sequelize } from 'sequelize-typescript'
import config from 'src/config'

import { initModels } from './models/init-models'

// 方法 3: 分别传递参数 (其它数据库)
const db = new Sequelize(config.db.name!, config.db.user!, config.db.pass, {
  host: config.db.host,
  port: config.db.port,
  dialect: 'mysql',
  pool: { // 连接池设置
    max: 5, // 最大连接数
    idle: 30000,
    acquire: 60000,
  },
  dialectOptions: {
    charset: 'utf8mb4', // 字符集
    // collate: 'utf8mb4_unicode_ci'
  },
  define: { // 模型设置
    freezeTableName: true, // 自定义表面，不设置会自动将表名转为复数形式
    timestamps: false, // 自动生成更新时间、创建时间字段：updatedAt,createdAt
  },
})
// sequelize-auto -h 数据库的IP地址 -d 数据库名 -u 用户名 -x 密码 -p 端口 -t 表名 -o 文件夹相对位置
export async function initDb() {
  initModels(db)
  await db.authenticate().catch((error) => {
    console.error('数据库连接失败', error)
    return new Promise(() => { })
  })
  // eslint-disable-next-line no-console
  console.log('数据库连接成功')
}
export default db
