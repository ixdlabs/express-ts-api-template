import { Express } from "express-serve-static-core";

export interface User {
  id: string;
  email: string;
  iat: number;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}
