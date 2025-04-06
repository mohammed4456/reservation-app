const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/add-reservation', (req, res) => {
  const { name, address, phone, code } = req.body;
  const sql = 'INSERT INTO reservations (name, address, phone, code) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, address, phone, code], (err, result) => {
    if (err) {
      console.error('خطأ أثناء إضافة الحجز:', err);
      return res.status(500).send('حدث خطأ أثناء إضافة الحجز');
    }
    res.send('تم إضافة الحجز بنجاح');
  });
});

app.get('/search', (req, res) => {
  const { code } = req.query;
  const sql = 'SELECT * FROM reservations WHERE code = ?';
  db.query(sql, [code], (err, results) => {
    if (err) {
      console.error('خطأ أثناء البحث:', err);
      return res.status(500).send('حدث خطأ أثناء البحث');
    }
    if (results.length === 0) {
      return res.send('لم يتم العثور على حجز بهذا الرمز');
    }
    res.json(results[0]);
  });
});

app.listen(port, () => {
  console.log(`التطبيق يعمل على http://localhost:${port}`);
});