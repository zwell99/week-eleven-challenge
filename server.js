const express = require("express");
const api = require("./public/assets/js/index.js");

const PORT = 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api); // this was copied from the mini project, may not be appropriate for this
app.use(express.static('public'));

app.get("/", (req, res) => 
  res.sendFile(path.join(__dirname, '/public/index.html'))
)

app.get("*", (req, res) => 
  res.sendFile(path.join(__dirname, '/public/index.html'))
)

app.get("/notes", (req, res) => 
  res.sendFile(path.join(__dirname, '/public/notes.html'))
)

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);