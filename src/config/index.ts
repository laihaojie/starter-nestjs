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

export const roleType: RoleTypeModel = {
  super: [1],
  admin: [1, 2],
  user: [1, 2, 3],
}
