const fs = require("fs");
const path = require("path");
const express = require("express");
const { json } = require("express/lib/response");
const { notes } = require("./db/db");
const PORT = process.env.PORT || 3004;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/api/notes", (req, res) => {
  // should read the db.json file
  let notes = fs.readFileSync(path.join(__dirname, "./db/db.json"), "utf8");
  // convert string to JSON array
  notes = JSON.parse(notes);
  console.log("from get method" + notes);
  //return all saved notes as JSON
  res.json(notes);
});

// app.delete()

app.post("/api/notes", (req, res) => {
  // should receive a new note to save on the request body
  // give each note a unique id
  // add it to the db.json file
  // return the new note to the client (res.json)

  // Zookeeper
  // set id based on what the next index of the array will be
  let notes = fs.readFileSync(path.join(__dirname, "./db/db.json"), "utf8");
  // obj contain the content from db.json, converted to object data type
  // for (let i = 0; i < notes.length; i++) {
  //   if (notes[i].text != '') counter++;
  // }
  const obj = JSON.parse(notes);
  let count = obj.length;
  console.log("count value is " + count);

  obj[notes] = obj[notes] || [];
  // push object data type req.body to object type
  obj.push(req.body);
  console.log("req.body value is " + JSON.stringify(req.body));
  // added with string type to db.json
 // insert id to req.body
  let i = 0;
  obj.forEach((element, i) => {
    element.id = i + 1;
  });
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(obj, null, 2)
  );

  res.json(obj);
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
