const express = require("express");
const api = require("./public/assets/js/index.js");
const fs = require("fs");

const PORT = 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api); // this was copied from the mini project, may not be appropriate for this
app.use(express.static('public'));

app.get("/", (req, res) => 
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get("*", (req, res) => 
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get("/notes", (req, res) => 
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get("/api/notes", function (req, res) {
  fetch('./data.json').then((response) => response.json())
    .then((json) => res.json(json));
});

app.post("/api/notes/:title/:text", function (req, res) {
  console.info(req.rawHeaders);
  console.info(`${req.method} request received`);
  const note = {"title": req.params.title, "text": req.params.text};
  fs.readFile("./db/db.json", 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(note);
      writeToFile(file, parsedData);
    }
  });
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);