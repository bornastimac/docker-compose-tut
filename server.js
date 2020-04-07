
const express = require('express')
const { Pool } = require('pg')

const pool = new Pool({
  user:'postgres',
  host:'db',   //<---- not localhost  ---->
  database:'postgres',
  password:'postgres',
  port:'5432'
})

const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/increment', async(req, res) => {
    await pool.query('update test set number = number + 1 returning number;', (err, ret) => {
        console.log(err,ret)
        res.send(ret.rows[0])
      })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))