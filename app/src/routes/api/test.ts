import { Request, Response } from '../../../../framework/types'

export const GET = (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  return JSON.stringify({ message: "Hello, World!" });
}
