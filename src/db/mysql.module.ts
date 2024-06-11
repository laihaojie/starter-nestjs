import { Global, Module } from '@nestjs/common'
import { Sequelize } from 'sequelize-typescript'
import config from 'src/config'
import { initModels } from './models/init-models'

class DataBase extends Sequelize {
  constructor() {
    super(config.db.name!, config.db.user!, config.db.pass, {
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
  }
}
// type Tab = ReturnType<typeof initModels>
// abstract ReturnType<typeof initModels>
export class Tables {
  constructor(db: DataBase) {
    const { ...arg } = initModels(db)

    Object.assign(Tables.prototype, arg)
    // Tables.prototype.a = ''
    // return
  }
}

@Global()
@Module({
  imports: [],
  providers: [
    {
      useClass: DataBase,
      provide: DataBase,
    },
    {
      provide: Tables,
      async useFactory(db: DataBase) {
        const tables = new Tables(db)
        // console.log(tables)
        await db.authenticate().catch((error) => {
          console.error('数据库连接失败', error)
          return new Promise(() => { })
        })
        // eslint-disable-next-line no-console
        console.log('数据库连接成功')
        return tables
      },
      inject: [DataBase],
    },
  ],
  exports: [DataBase, Tables],
})
export class MySqlModule { }
