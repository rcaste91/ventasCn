const express = require('express');

const app = express();

app.use(express.static('./dist/ventasCN'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/ventasCN/'}
  );
  });

app.listen(process.env.PORT || 8080); 
