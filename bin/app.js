'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const staticCacheAge = 2592000000;    // 1 month cache!
const publicFolder = path.join(__dirname, 'static')
app.use('/static', express.static(publicFolder));

const encodeResToGzip = contentType => (req, res, next) => {
  const gzFile = req.url + '.gz';
  const gzFileExist = fs.existsSync(path.join(__dirname, gzFile));
  if (!gzFileExist) {
    return void next()
  }

  req.url = gzFile;
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', contentType);
  res.set('Cache-Control', `public, max-age=${staticCacheAge}`);
  res.sendFile(req.url, { root: __dirname });
};

app.get("*.js", encodeResToGzip('text/javascript'));
app.get("*.css", encodeResToGzip('text/css'));

app.all('/*', function (req, res) {
  res.sendFile('index.html', { root: publicFolder });
})

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + server.address().port);
});