const mod = require('../api/index');
const app = mod.default || mod;

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Carzio server running at http://localhost:${PORT}`);
});
