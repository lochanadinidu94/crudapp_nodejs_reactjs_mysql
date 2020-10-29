var express = require('express');
var router = express();
var mysql = require('mysql');
const bodyParser = require('body-parser');
const x = require('../dbConnections/connection.js');
const cors = require('cors')

var db;
// update to github testing
// const db = mysql.createPool(x);

// router.get("/",(req,res)=>{});

//Test Get Method Code
    // console.log('4 Q');
    // const sqlinsert = "insert into moive(mName,mRiview) values ('Northman5','Good script5');";

    // connectDatabase().query(sqlinsert,(err,result)=>{
    //   res.send('Hellow World')
    // });

router.use(cors());
router.use(express.json());
router.use(bodyParser.urlencoded({extended:true}));


router.post('/api/get',(req,res)=>{
  const sqlInsert = "select * from moive";
  connectDatabase().query(sqlInsert, (err,result)=>{
 res.send(result);
  });
});

router.post('/api/insert',(req,res)=>{
  const mName = req.body.mname;
  const mReview = req.body.mreview;
  const sqlInsert = "insert into moive(mName,mRiview) values (?,?)";
  connectDatabase().query(sqlInsert,[ mName,mReview ], (err,result)=>{
    console.log(err);
  });
});

router.delete('/api/delete/:mNo',(req,res) =>{
 const mNo = req.params.mNo;
 console.log(mNo);
 const sqlline = "delete from moive where no = ?";
 connectDatabase().query(sqlline, mNo,(err, result)=>{
  if(err) console.log(err);
});
});

router.post('/api/update',(req,res)=>{
  const mno = req.body.mno;
  const mreview = req.body.mreview;

  console.log(mno);
  console.log(mreview);

  const sqlInsert = "update moive set mName = ? where no = ?";
  connectDatabase().query(sqlInsert,[ mreview,mno ], (err,result)=>{
    console.log(err);
  });
});

router.listen(3001,()=>{
  console.log('running on port 3001');
})

function connectDatabase(){
  if(db == null){
    db = mysql.createPool(x);
  }
      return db;
  }

module.exports = router;
