import App from './configs/app';
import controllers from './controllers';
import dotenv from 'dotenv';

dotenv.config();

const { env: { PORT }} = process;
 
const app = new App(controllers, Number(PORT));
 
app.listen();

export default app;
