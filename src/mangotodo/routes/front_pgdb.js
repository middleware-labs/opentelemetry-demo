const express = require('express');

const router = express.Router();


const PgPool = require('pg').Pool
const pool = new PgPool({
    user: process.env.PGDB_USER,
    host: process.env.PGDB_HOST,
    //database: process.env.PGDB_DB,
    password: process.env.PGDB_PASS,
    port: 5432,
})


pool.query('CREATE TABLE IF NOT EXISTS todo(\n' +
    'id SERIAL PRIMARY KEY NOT NULL,\n' +
    'task text UNIQUE,\n' +
    'status INTEGER DEFAULT 0\n' +
    ');\n', (error, results) => {
    if (error) {
        console.error("create table failed ",error)
    } else {
        console.log("create table done")
    }
});




router.get('/todo/pgdb', (req, res) => {

    pool.query('SELECT * FROM todo ORDER BY id ASC', (error, results) => {
        if (error) {
            return res.status(400).json(error)
        }
        results.rows.forEach(r=>{
            r._id=r.id
        })
        res.render("todos", {
            tasks: (Object.keys(results.rows).length > 0 ? results.rows : {}),
            base: "/todo/pgdb"
        });
    })
});

// POST - Submit Task
router.post('/todo/pgdb', (req, res) => {

    pool.query('INSERT INTO todo (task) VALUES ($1) RETURNING *', [req.body.task], (error, results) => {
        if (error) {
            return res.status(400).json(error)
        }
        res.redirect("/todo/pgdb");
    })

});

// POST - Destroy todo item
router.post('/todo/pgdb/destroy', (req, res) => {
    const taskKey = req.body._key;

    pool.query('DELETE FROM todo WHERE id = $1', [taskKey+""], (error, results) => {
        if (error) {
            console.error(error)
            return res.status(400).json({ message: "unable to delete a new task" });
        }
        res.redirect("/todo/pgdb");
    })

});


module.exports = router;