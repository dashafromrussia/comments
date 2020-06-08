let express = require('express');
let app = express();
/**
 * public - имя папки где хранится статика
 */
app.use(express.static('public'));
/**
 *  задаем шаблонизатор
 */
app.set('view engine', 'pug');
/**
* Подключаем mysql модуль
*/
let mysql = require('mysql');

app.use(express.json());
const multer  = require("multer");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
//app.use(express.urlencoded());
let con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'comment'
});

app.listen(3000, function () {
  console.log('node express work on 3000');
});



app.get('/',function (req, res) {
    res.render('header');
  
});

//app.use(multer({dest:"uploads"}).single("filedata"));	
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) =>{
      cb(null, "public/uploads");
  },
  filename: (req, file, cb) =>{
      cb(null, file.originalname);
  }
});
app.use(multer({storage:storageConfig}).single("filedata"));

app.post('/send',function (req, res) {
  console.log(req.body);
  console.log(req.file);
  let sql2 =" SELECT name,comment,image FROM comments1";
  let sql = "INSERT INTO comments1 (name, comment,image) VALUES ('" + req.body.name + "', '" + req.body.comment + "', '" + req.file.filename + "')"; 
  con.query(sql, function (error, result) {
    if (error) throw error;
    con.query(sql2, function (error, result1){
      if (error) throw error;
      res.json(result1);
    });
  });
});


app.post('/comments',function (req, res){
  let sql =" SELECT name,comment,image FROM comments1";
   con.query(sql, function (error, result){
      if (error) throw error;
      console.log(result);
      res.json(result);
  });
});