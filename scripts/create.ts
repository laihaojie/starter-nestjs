import { execSync } from 'node:child_process'
import { join } from 'node:path'
import fs from 'node:fs'
import process from 'node:process'

const path_name = process.argv[2]
if (!path_name) process.exit()
const source_path = join(process.cwd(), 'src/modules', path_name)

const name = source_path.split('\\').reverse()[0]
const obj = {
  module: {
    exist: false,
    command: `nest g mo modules/${path_name} --no-spec`,
  },
  controller: {
    exist: false,
    command: `nest g co modules/${path_name} --no-spec`,
  },
  service: {
    exist: false,
    command: `nest g s modules/${path_name} --no-spec`,
  },
}

// 判断目录是否存在
if (!fs.existsSync(source_path)) {
  generate()
}
else {
  const cur = fs.readdirSync(source_path).map(file => [file.split('.')[1], file.split('.')[0]]).filter(i => i[1] === name)

  const { controller, module, service } = Object.fromEntries(cur)
  if (controller && controller === name) obj.controller.exist = true
  if (module && module === name) obj.module.exist = true
  if (service && service === name) obj.service.exist = true
  generate()
}

function generate() {
  const commands = Object.keys(obj).reduce((pre, key) => !obj[key].exist ? [...pre, obj[key].command] : pre, [])

  commands.forEach((command) => {
    execSync(command, { stdio: 'inherit' })
  })
  if (commands.length > 0) {
    execSync(`eslint --fix src/modules/${path_name}`, { stdio: 'inherit' })
    execSync('eslint --fix src/app.module.ts', { stdio: 'inherit' })
  }
}
