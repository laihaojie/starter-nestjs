export async function UserMiddleware(req: Request, res: Response, next: () => void) {
  await Promise.resolve(1)
  next()
}
