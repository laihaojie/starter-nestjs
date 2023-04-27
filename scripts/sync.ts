import { execSync } from 'node:child_process'
import config from 'config'

const { host, user, name, pass, port } = config.db

// 先删除原有的models
execSync('rm -rf ./src/db/models/*', { stdio: 'inherit' })

execSync(`sequelize-auto -h ${host} -d ${name} -u ${user} -x ${pass} -p ${port}  -o ./src/db/models -l ts -r`, { stdio: 'inherit' })
