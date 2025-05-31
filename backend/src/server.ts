import express from 'express';
import routes from './routes';
import cors from 'cors'


var whitelist = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://localhost:3000", 
  "http://172.18.0.2:3000", 
  "http://frontend:3000", 
  "http://147.182.174.61",
]
var corsOptions = {
  origin: function (origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200
}
const app = express();
app.use(cors(corsOptions))
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
    console.log('Server is running on Port 3333')
});