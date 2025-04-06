const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'sql109.infinityfree.com',
  user: 'if0_38684337',
  password: 'GUXCj7GI5u',
  database: 'if0_38684337_my_database'
});

connection.connect((err) => {
  if (err) {
    console.error('خطأ في الاتصال بقاعدة البيانات:', err);
    return;
  }
  console.log('تم الاتصال بقاعدة البيانات بنجاح');
});

module.exports = connection;