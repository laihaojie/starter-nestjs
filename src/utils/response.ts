const Response = (data: unknown, message: string = "成功") => ({ code: 1, data, message, })
Response.Error = (data: unknown, message: string = "服务器繁忙") => ({ code: 3, data, message, })
Response.None = (data: unknown, message: string = "用户未授权") => ({ code: 401, data, message, })
export default Response