import express from 'express';

import fs from 'fs';

const app = express();

if (!process.env.PORT) {
  throw new Error('Please specify the port number for the HTTP server with the environment variable PORT');
}

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('hello worlds');
});

app.get('/video', (req, res) => {
  const path = "../videos/SampleVideo_1280x720_1mb.mp4";
  fs.stat(path, (err, stats) => {
    if (err) {
      console.log('An error has occured');
      return res.sendStatus(500);
    }

    res.writeHead(200, {
      "Content-Length": stats.size,
      "Content-Type": "video/mp4",
    });
    fs.createReadStream(path).pipe(res);
  });
});

app.listen(PORT, () => {
  console.log(`Video streaming microservice listening on port ${PORT}`);
})