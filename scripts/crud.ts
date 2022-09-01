import fs from 'fs'
import path from 'path'
import pc from 'picocolors'

if (!process.argv[2]) {
  console.log(pc.yellow('请输入名称'))
  process.exit()
}
if (process.argv[2].match(/\W/)) {
  console.log(pc.yellow('名称不能包含特殊字符 ( 单词用下划线分割 )'))
  process.exit()
}
// 文件名称
const file_name = process.argv[2]

// 类名
const class_name = file_name.split('_').filter(Boolean).map(item => item.charAt(0).toUpperCase() + item.slice(1)).join('')

// 服务名称
const service_name = class_name.charAt(0).toLowerCase() + class_name.slice(1)


// 模块文件夹路径
const module_dir_path = path.join(__dirname, `../src/modules/${file_name}`)
// dto文件夹路径
const dto_dir_path = path.join(module_dir_path, `dto`)
// app文件路径
const app_path = path.join(__dirname, `../src/app.module.ts`)


// 判断目录是否存在
if (fs.existsSync(module_dir_path)) {
  console.log(pc.yellow('模块已经存在'))
  process.exit(1)
}
// 创建模块文件夹
fs.mkdirSync(module_dir_path)
// 创建DTO文件夹
fs.mkdirSync(dto_dir_path)
// 创建模块
createModule()
// 创建控制器
createController()
// 创建服务
createService()
// 创建DTO
createDTO()
// 更新app.module
updateAppModule()

function createModule() {
  const template = `import { Module } from '@nestjs/common'
import { $class_nameController } from './$file_name.controller'
import { $class_nameService } from './$file_name.service'

@Module({
  controllers: [$class_nameController],
  providers: [$class_nameService],
})
export class $class_nameModule {}
`
  const file_path = path.join(module_dir_path, `${file_name}.module.ts`)
  fs.writeFileSync(file_path, template.replace(/\$class_name/g, class_name).replace(/\$file_name/g, file_name))
}

function createController() {
  const template = `import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { $class_nameService } from './$file_name.service'
import { Create$class_nameDto } from './dto'

@Controller('$file_name')
export class $class_nameController {
  constructor(
    private readonly $service_nameService: $class_nameService
  ) { }

  @Get('list')
  async list() {
    return this.$service_nameService.list()
  }

  @Post('create')
  async create(@Body() body: Create$class_nameDto) {
    return this.$service_nameService.create(body)
  }

  @Post('remove')
  async remove() {
    return this.$service_nameService.remove()
  }

  @Post('update')
  async update(@Body() body: Create$class_nameDto) {
    return this.$service_nameService.update(body)
  }
}
  `
  const file_path = path.join(module_dir_path, `${file_name}.controller.ts`)
  fs.writeFileSync(
    file_path,
    template.replace(/\$class_name/g, class_name).replace(/\$file_name/g, file_name).replace(/\$service_name/g, service_name)
  )
}

function createService() {
  const template = `import { Injectable } from '@nestjs/common'
import { Create$class_nameDto } from './dto'

@Injectable()
export class $class_nameService {
  async list() {
    return '$file_name列表'
  }

  async create(body: Create$class_nameDto) {
    return '$file_name创建'
  }

  async remove() {
    return '$file_name删除'
  }

  async update(body: Create$class_nameDto) {
    return '$file_name更新'
  }
}
  `
  const file_path = path.join(module_dir_path, `${file_name}.service.ts`)
  fs.writeFileSync(
    file_path,
    template.replace(/\$class_name/g, class_name).replace(/\$file_name/g, file_name).replace(/\$service_name/g, service_name)
  )
}

function createDTO() {
  const template = `import { IsNotEmpty } from 'class-validator'

export class Create$class_nameDto {
  @IsNotEmpty()
  account: string

  @IsNotEmpty()
  age: number
}
  `
  const file_path = path.join(dto_dir_path, `index.ts`)
  fs.writeFileSync(
    file_path,
    template.replace(/\$class_name/g, class_name)
  )
}

function updateAppModule() {
  let app_module_content = fs.readFileSync(app_path, 'utf8')
  const import_text = `import { $class_nameModule } from './modules/$file_name/$file_name.module'\r\n`
    .replace(/\$class_name/g, class_name)
    .replace(/\$file_name/g, file_name)
  app_module_content = import_text + app_module_content
  app_module_content = app_module_content.replace(/imports: \[/, `imports: \[\r\n    ${class_name}Module,`)
  fs.writeFileSync(app_path, app_module_content)
}