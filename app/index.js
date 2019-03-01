const Express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = new Express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(routes);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(6500, () => {
    console.log('Server up!');
});
