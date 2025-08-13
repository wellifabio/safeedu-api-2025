require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const port = process.env.PORT || 3000
const app = express();

const swaggerDoc = require('./swagger.json');
const router = require('./router');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log('API SafeEdu respondendo em http://localhost:' + port);
    console.log('Acesse a documentação em http://localhost:' + port + "/api-docs");
});