const express = require('express');

const app = express();

app.get('/', (req, res) => {
   res.write('Ola');
   res.end();
});

app.listen(3000);