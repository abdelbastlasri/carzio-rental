const app = require('../api/index.cjs');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Carzio server running at http://localhost:${PORT}`);
});
