/* eslint-disable ts/prefer-literal-enum-member */
export default {
  server: {
    port: 8121,
  },
  db: {
    // 数据库地址
    host: '',
    // 数据库端口
    port: 3306,
    // 数据库名
    name: '',
    // 数据库用户名
    user: '',
    // 数据库密码
    pass: '',
  },
  jwt: {
    secret: 'admin-secret',
    expire: 60 * 60 * 24 * 30,
  },
}
export const loggerType = {
  api: 'api',
  exception: 'exception',
  debug: 'debug',
}
export const keyNames = {
  start_time: '_startTime_',
  ip: '_ip_',
  ignore_log: '_ignoreLog_',
  auth: '_auth_',
}

export enum RoleFlags {
  // 超级管理员
  super = 1,

  // 管理员
  admin = 1 << 1,

  // 用户
  user = 1 << 2,
}
