import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express';
import swaggerSpecs from '../swagger.json';
 
class DocsController {
  private readonly path: string;
  private readonly router: Router;

  constructor() {
    this.path = '/docs';
    this.router = Router();
    this.intializeRoutes();
  }
 
  private intializeRoutes = () => this.router.use(this.path, serve, setup(swaggerSpecs));
}

export default new DocsController();
