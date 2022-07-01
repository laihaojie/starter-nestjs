// import * as requestIp from 'request-ip'

export async function UserMiddleware(req: Request, res: Response, next: () => void) {
  await Promise.resolve(1)

  Promise.resolve().then(() => {

  })
  process.nextTick(() => {
    // console.log('request', req.user)
    // console.log('request', requestIp.getClientIp(req))
  })
  process.nextTick(() => {
    // console.log('res', Object.keys(res))
  })
  next()
}
