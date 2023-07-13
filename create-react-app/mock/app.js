const express =  require('express');
const apiMocker = require('connect-api-mocker');

const port =9001;
const app = express();
const cors = require('cors');
app.use(cors());
app.use(
    '/sus',
    apiMocker({
        target : 'mock/api',
        verbose: ({req,filePath,fileType}) =>{
            console.log(
                `Mocking endpoint ${req.originalUrl} using ${filePath}.${fileType}.`
            )
        }
    })
);
console.log(`Mock Api Server is up and running at: http"//localhost:${port}`);
app.listen(port);
