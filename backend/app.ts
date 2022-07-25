import express,{Application,Request,Response,NextFunction} from 'express';
import config from 'config';
import log from './logger'
import connect from './db/connect';
import routes from './routes';
const cors = require('cors')

import deserializeUser from './middleware/deserializeUser'


const port = config.get('port') as number;
const host = config.get('host') as string;

const app = express();

//app.use(deserializeUser);
app.use(deserializeUser);

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors())

app.get('/',(req: Request,res: Response)=>{
    res.send('hello world!')
})

app.listen(port || 5001, host || 'localhost', async()=> {
   try{
    await connect()
    log.info(`server is listening:${host}:${port}`)
    routes(app)
   }catch(e){
    log.error(e)
   }
})