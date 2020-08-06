const express = require('express');

const app = express();

app.use(express.static('./dist/VentasCN'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/VentasCN/'}
  );
  });

app.listen(process.env.PORT || 8080); 