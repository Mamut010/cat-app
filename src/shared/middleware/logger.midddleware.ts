import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware<Request, Response> {
    use(req: Request, res: Response, next: (error?: any) => void) {
        console.log("Received a request at " + new Date().toISOString());
        next();
    }
}
