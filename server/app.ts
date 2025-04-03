import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectToDatabase } from './db/config/dbConfig';
import routes from './src/route';

const app = express();
app.use(cors());
app.use(bodyParser.json());


(async () => {
    try {
      await connectToDatabase();
      
      app.use('/api', routes);
      app.listen(process.env.PORT, () => {
      console.log('Server listening on port', process.env.PORT);
    });
    } catch (error) {
      console.error('Error starting the application:', error);
      process.exit(1);
    }
  })();