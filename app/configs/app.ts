import { sendResponse } from './../utils/respond.util';
import express, { Application, Request, NextFunction, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import statuses from '../utils/status';
 
export default class App {
  public app: Application;
  public port: number;
 
  constructor(controllers: any, port: number) {
    this.app = express();
    this.port = port;
 
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }
 
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(morgan('dev'));
  }
 
  private initializeControllers(controllers: any[]) {
    const { statusCodes: { CODE_NOT_FOUND }} = statuses;
    controllers.forEach((controller: any) => this.app.use('/api', controller.router));
    this.app.use((req: Request, res: Response, next: NextFunction) => sendResponse(res, CODE_NOT_FOUND, 'Not found', null));
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Kiwibot-loactor is listening on port ${this.port}`);
    });
  }
}
