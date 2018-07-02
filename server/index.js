require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const db = require('../db/index.js');

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const app = express();
  app.use(cors());
  app.use(express.static(path.join(__dirname, '../public/')));
  app.use('/:id', express.static('public'));
  app.use(bodyParser.json());

  app.route('/youMayAlsoLike/:id')
    .get((req, res) => {
      let { id } = req.params;
      id = id < 9999996 ? id : 2;
      const selectString = 'SELECT info FROM items WHERE id > $1 LIMIT 4';
      db.query(selectString, id)
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err));
    })
    .put((req, res) => {
      const { id } = req.params;
      const update = req.body;
      const updateString = 'UPDATE items SET info = $1 WHERE id = $2';
      db.none(updateString, [update, id])
        .then(() => res.status(200).send(`Product ${id} Updated`))
        .catch(err => res.status(501).send(err));
    })
    .delete((req, res) => {
      const { id } = req.params;
      const deleteString = 'DELETE FROM items WHERE id = $1';
      db.query(deleteString, id)
        .then((data) => res.status(204).send(`Product ${id} Deleted`))
        .catch(err => res.status(500).send(err));
    });

  app.post('/youMayAlsoLike', (req, res) => {
    const newProduct = req.body;
    const insertString = 'INSERT INTO items(info) VALUES($1) RETURNING id';
    db.query(insertString, [newProduct])
      .then(data => { console.log(data); res.status(201).send(`Product ${data[0].id} Created`)})
      .catch(err => res.status(422).send(err));
  });

  app.listen(3003, () => console.log('listening on port 3003'));
}
