export default {
  server: {
    port: 9901,
  },
  db: {
    name: '',
    host: '',
    user: '',
    port: '',
    pass: '',
  },
  jwt: {
    secret: '111',
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
