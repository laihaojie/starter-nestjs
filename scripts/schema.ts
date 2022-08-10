import fs from 'fs'
import path from 'path'
import pc from 'picocolors'

if (!process.argv[2]) {
  console.log(pc.yellow('请输入名称'))
  process.exit()
}
if (process.argv[2].match(/\W/)) {
  console.log(pc.yellow('名称不能包含特殊字符'))
  process.exit()
}
const file_name = process.argv[2]

const class_name = file_name.split('_').filter(Boolean).map(item => item.charAt(0).toUpperCase() + item.slice(1)).join('')

const template = `import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type $nameDocument = $name & Document

@Schema()
export class $name extends Document {
  @Prop({ required: true })
  name: string
}

export const $nameSchema = SchemaFactory.createForClass($name)
`

const schema_path = path.join(__dirname, '../src/db/schemas', `${file_name}.ts`)

if (fs.existsSync(schema_path)) {
  console.log(pc.yellow(`${file_name}.ts 已存在`))
  process.exit()
}

fs.writeFileSync(schema_path, template.replace(/\$name/g, class_name))

const service_path = path.join(__dirname, '../src/db/db.service.ts')

let service_content = fs.readFileSync(service_path, 'utf8')

const model_name = class_name.charAt(0).toLowerCase() + class_name.slice(1)

service_content = service_content.replace(/\) \{ \}/, `  @InjectModel(${class_name}.name) readonly ${model_name}Model: Model<${class_name}Document>,
  ) { }`)

service_content = service_content.replace(/\r\n@Injectable\(\)/, `import { ${class_name}, ${class_name}Document } from 'src/db/schemas/${file_name}'\r\n\r\n@Injectable()`)

fs.writeFileSync(service_path, service_content)
console.log(pc.green(`创建成功，请点击这里 >> ${pc.blue(`src/db/schemas/${file_name}.ts`)}  定义${class_name}类`))

