import { execSync } from 'child_process'
import { join } from 'path'
import fs from 'fs'

const path_name = process.argv[2]
if (!path_name) process.exit()
const source_path = join(process.cwd(), 'src/modules', path_name)

const name = source_path.split('\\').reverse()[0]
const obj = {
  module: {
    exist: false,
    command: `nest g mo modules/${path_name}`,
  },
  controller: {
    exist: false,
    command: `nest g co modules/${path_name}`,
  },
  service: {
    exist: false,
    command: `nest g s modules/${path_name}`,
  },
}

// 判断目录是否存在
if (!fs.existsSync(source_path)) {
  generate()
}
else {
  deleteFile(false)
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

  deleteFile(commands.length > 0)
}

function deleteFile(lint: boolean) {
  const files = fs.readdirSync(source_path).filter(file => file.endsWith('spec.ts'))
  // 删除文件
  files.forEach((file) => {
    fs.unlinkSync(join(source_path, file))
  })
  if (lint) {
    execSync(`eslint --fix src/modules/${path_name}`, { stdio: 'inherit' })
    execSync('eslint --fix src/app.module.ts', { stdio: 'inherit' })
  }
}
