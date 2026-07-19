import express from 'express';

const app = express();
const port = process.env.PORT || 4000;

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'caredrop-api' });
});

app.listen(port, () => {
  console.log(`CareDrop API listening on port ${port}`);
});
