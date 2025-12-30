import * as fs from 'fs';
import * as path from 'path';

export const keys = {
    privateKey: fs.readFileSync(
    path.join(process.cwd(), "keys/private.pem"),
    "utf8",
  ),
  publicKey: fs.readFileSync(
    path.join(process.cwd(), "keys/public.pem"),
    "utf8",
  ),
}