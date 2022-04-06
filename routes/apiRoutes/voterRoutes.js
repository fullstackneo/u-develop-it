const db = require('../../db/connection.js');
const router = require('express').Router();

const inputCheck = require('../../utils/inputCheck');

// get all voters
router.get('/voter', (req, res) => {
  const sql = `SELECT * FROM voters WHERE email NOT LIKE '%edu'`;
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ err: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: results,
    });
  });
});

// Get single voter
router.get('/voter/:id', (req, res) => {
  const sql = `SELECT * FROM voters WHERE id=?`;
  const param = [req.params.id];
  db.query(sql, param, (err, results) => {
    if (err) {
      res.json(400).json({ err: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: results,
    });
  });
});

// add new voter
router.post('/voter', ({ body }, res) => {
  // Data validation
  const errors = inputCheck(body, 'first_name', 'last_name', 'email');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `INSERT INTO voters(first_name, last_name, email) VALUES(?,?,?)`;
  const params = [body.first_name, body.last_name, body.email];

  db.query(sql, params, (err, results) => {
    if (err) {
      res.status(400).json({ err: err.message });
      return;
    }

    res.json({
      message: 'success',
      data: body,
    });
  });
});

//update email
router.put('/voter/:id', (req, res) => {
  // Data validation
  const errors = inputCheck(req.body, 'email');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE voters SET email = ? WHERE id = ?`;
  const params = [req.body.email, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Voter not found',
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows,
      });
    }
  });
});


// delete voter
router.delete('/voter/:id', (req, res) => {
  const sql = `DELETE FROM voters WHERE id = ?`;

  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Voter not found',
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

module.exports = router;