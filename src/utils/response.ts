export const R = (data: unknown = {}, message = '成功') => ({ code: 1, data, message })
export const E = (message = '服务器繁忙', data = {}) => ({ code: 3, data, message })
export const N = (data: unknown = null, message = '用户未授权') => ({ code: 401, data, message })
