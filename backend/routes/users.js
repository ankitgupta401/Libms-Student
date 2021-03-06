const express =require('express');
const router = express.Router();
const User = require("../model/users");
const multer = require('multer');


const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg' : 'jpg',
  'image/PNG': 'png',
  'image/JPEG': 'jpg',
  'image/JPG' : 'jpg'
};







const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid MIme Type')
    if(isValid) {
      error = null;
    }
    cb(error, "images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
 cb(null, name + '-' + Date.now() + '.' +  ext);
  }
});

router.get("/getTeacher",(req,res,next) => {

User.countDocuments({category: 'teacher' , deleted: false}).then(count => {
  if( count > 0) {
    User.find({category: 'teacher' , deleted: false}).skip( count - 1).then(result => {
      res.status(200).json({
        message: "got teacher",
        libcard: result
      });
      });
  } else {
    res.status(200).json({
      message: "no Teacher",
      libcard: null
    });
  }


});
});

router.get("/email",(req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const email= req.query.email;
    let userQuery = User.find({ deleted: false});
    if(email != '') {
     userQuery = User.find({ email: email.toLowerCase() , deleted: false});
    }
  let fetchedUsers ;
  if(pageSize && currentPage){
  userQuery.skip(pageSize * (currentPage -1))
  .limit(pageSize);
  }
  userQuery.then(documents =>{
    fetchedUsers = documents;
    if(email != '') {
      return User.countDocuments({ email: email.toLowerCase(), deleted: false});
     }
    return User.countDocuments({deleted: false});
    }).then (count => {res.status(200).json({
      message: "Posts fetched succesfully!",
      users: fetchedUsers,
      count: count
    });
  });
   });

   router.get("/get/:phoneNo",(req, res, next) => {
     User.find({phone_no: req.params.phoneNo , deleted: false}).
     then(documents => {
     res.status(200).json({
      message: "got the user",
      user: documents,
    });
    });
  });

  router.get("/Email/:email", (req, res, next) => {
    User.find({email: req.params.email , deleted: false}).
    then(documents => {
    res.status(200).json({
     message: "got the user",
     user: documents,
   });
   });
 });
 router.get("/Card/:cardNo", (req, res, next) => {
  User.find({cardNo: req.params.cardNo , deleted: false}).
  then(documents => {
  res.status(200).json({
   message: "got the user",
   user: documents,
 });
 });
});



router.get("", (req, res, next) => {
const pageSize = +req.query.pagesize;
const currentPage = +req.query.page;
const dept = req.query.dept;
  let userQuery = User.find({deleted: false});
  if(dept != '') {
   userQuery = User.find({ dept: dept , deleted: false});
  }
let fetchedUsers ;
if(pageSize && currentPage){
userQuery.skip(pageSize * (currentPage -1))
.limit(pageSize);
}
userQuery.then(documents =>{
  fetchedUsers = documents;
  if(dept != '') {
    return User.countDocuments({ dept: dept , deleted: false});
   }
  return User.countDocuments({ deleted: false});
  }).then (count => {res.status(200).json({
    message: "Posts fetched succesfully!",
    users: fetchedUsers,
    count: count
  });
});
 });







 router.post("", multer({storage: storage}).single("image"),(req, res, next) => {
  url = req.protocol + "://" + req.get("host");
  const user = new User({
     fname: req.body.fname.toUpperCase(),
     lname: req.body.lname.toUpperCase(),
     cardNo: req.body.cardNo,
     address: req.body.address,
     Roll: req.body.Roll,
     category: req.body.category,
     city: req.body.city.toUpperCase(),
     dept: req.body.dept,
     email: req.body.email.toLowerCase(),
     phone_no: req.body.phone_no,
     sem: req.body.sem,
     state: req.body.state,
     year: req.body.year,
     zip: req.body.zip,
     imagePath: url + "/images/" + req.file.filename,
     deleted: false
   });

   user.save()
   .then(() => {res.status(201).json({
     message: "The user was Added successfully",
  });
}).catch (err => {
  res.status(500).json({
    error: err
  })
})
  });




  function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


  module.exports =router;
