import { execSync } from 'node:child_process'
import config from 'src/config'

const db = config.db
execSync(`sequelize-auto -h ${db.host} -d ${db.name} -u ${db.user} -x ${db.pass} -p ${db.port}  -o ./src/db/models -l ts`, { stdio: 'inherit' })
