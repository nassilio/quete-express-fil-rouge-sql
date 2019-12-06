const express = require("express");
const app = express();
const port = 3000;
const connection = require("./conf");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", (req, res) => {
  res.status(200).send("server is live!");
});

//GET

app.get("/api/movies", (req, res) => {
  connection.query("SELECT * from movie", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des films");
    } else {
      res.json(results);
    }
  });
});

//GET light

app.get("/api/movies/:param1/:param2", (req, res) => {
  connection.query("SELECT name, description from movie", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des films");
    } else {
      res.json(results);
    }
  });
});

//GET filtre contiens

app.get("/api/movies/:element1/:element2", (req, res) => {
  const element1 = req.params.element1;
  const element2 = req.params.element2;
  connection.query(
    "SELECT * from movie WHERE ${element1} LIKE '%${element2}%",
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la récupération des films");
      } else {
        res.json(results);
      }
    }
  );
});

//GET filtre commence par

app.get("/api/movies/:element1/:element2", (req, res) => {
  const element1 = req.params.element1;
  const element2 = req.params.element2;
  connection.query(
    "SELECT * from movie WHERE ${element1} LIKE '%${element2}%",
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la récupération des films");
      } else {
        res.json(results);
      }
    }
  );
});

//GET filtre supérieur à

app.get("/api/movies/:element1/:element2", (req, res) => {
  const element1 = req.params.element1;
  const element2 = req.params.element2;
  connection.query(
    "SELECT * from movies WHERE ${element1} > ${element2}",
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la récupération des films");
      } else {
        res.json(results);
      }
    }
  );
});

//GET données ordonnées

app.get("/api/movies/:element1", (req, res) => {
  const element1 = req.params.element1;
  connection.query(
    "SELECT * from movie order by ${element1} DESC",
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la récupération des films");
      } else {
        res.json(results);
      }
    }
  );
});

//POST

app.post("/api/movies", (req, res) => {
  const formData = req.body;
  connection.query("INSERT INTO movie SET ?", formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d'un film");
    } else {
      res.sendStatus(200);
    }
  });
});

//PUT modification

app.put("/api/movies/:id", (req, res) => {
  const idmovie = req.params.id;
  const formData = req.body;
  connection.query(
    "UPDATE movie SET ? WHERE id = ?",
    [formData, idmovie],
    err => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la modification d'un film");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

//PUT toggle booléen

app.put("/api/movies/:id", (req, res) => {
  const idmovie = req.params.id;
  connection.query(
    "UPDATE movie SET goodMovie = !goodMovie WHERE id = ?",
    [formData, idmovie],
    err => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la sortie de bons films");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

//DELETE unitaire

app.delete("/api/movies/:id", (req, res) => {
  const idmovie = req.params.id;
  connection.query("DELETE FROM movie WHERE id = ?", [idmovie], err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un film");
    } else {
      res.sendStatus(200);
    }
  });
});

//DELETE booléen false

app.delete("/api/movies/:id", (req, res) => {
  const idmovie = req.params.id;
  connection.query("DELETE FROM movie WHERE goodMovie = 0", [idmovie], err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un film");
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(
  port,
  err => {
    if (err) {
      throw new Error("Something bad happened...");
    }
  },
  console.log(`Server is listening on ${port}`)
);
