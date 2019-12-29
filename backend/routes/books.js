const express =require('express');
const router = express.Router();
const Book = require("../model/book");
const checkAuth = require("../middleware/check-auth");



router.get("/getbytitle", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const title = req.query.title;
  const regex = new RegExp(escapeRegex(title), 'gi');
  let bookQuery = Book.find();
  if(title != '') {
   bookQuery = Book.find({ title: regex , deleted: false});
  }
  let fetchedBooks ;
  if(pageSize && currentPage){
     bookQuery.skip(pageSize * (currentPage -1))
      .limit(pageSize);
  }
   bookQuery.then(documents =>{
     fetchedBooks = documents;
     if(title != '') {
      return Book.countDocuments({title: regex , deleted: false});
     }
      return Book.countDocuments();
   }).then (count => {
      res.status(200).json({
        message: "Books fetched succesfully!",
        books: fetchedBooks,
        count: count
      });
     });
});

router.get("/getbyauthor", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const author = req.query.author;
  const regex = new RegExp(escapeRegex(author), 'gi');
  let bookQuery = Book.find();
  if(author != '') {
   bookQuery = Book.find({ author: regex, deleted: false});
  }
  let fetchedBooks ;
  if(pageSize && currentPage){
     bookQuery.skip(pageSize * (currentPage -1))
      .limit(pageSize);
  }
   bookQuery.then(documents =>{
     fetchedBooks = documents;
     if(author != '') {
      return Book.countDocuments({author: regex, deleted: false});
     }
      return Book.countDocuments();
   }).then (count => {
      res.status(200).json({
        message: "Books fetched succesfully!",
        books: fetchedBooks,
        count: count
      });
     });
});




router.get("/all/:accessionNo",(req, res, next) => {
const accessionNo = req.params.accessionNo;
let fetchedBooks ;
Book.find({accession_no: accessionNo, deleted: false }).then(documents =>{
   fetchedBooks = documents;
    return Book.countDocuments({accession_no:accessionNo, deleted: false });
 }).then (count => {
    res.status(200).json({
      message: "Books fetched succesfully!",
      books: fetchedBooks,
      count: count
    });
   });
  });

router.get("",(req, res, next) => {
  const pageSize = +req.query.pagesize;
const currentPage = +req.query.page;
const bookQuery = Book.find({ deleted: false});
let fetchedBooks ;
if(pageSize && currentPage){
bookQuery.skip(pageSize * (currentPage -1))
.limit(pageSize);
}
 bookQuery.then(documents =>{
   fetchedBooks = documents;
    return Book.countDocuments({deleted: false});
 }).then (count => {
    res.status(200).json({
      message: "Books fetched succesfully!",
      books: fetchedBooks,
      count: count
    });
   });
  });

  router.get("/issuedbooks", checkAuth, (req, res, next) => {
    const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const dept = req.query.dept;
  let bookQuery = Book.find({ borrowed: true , deleted: false});
  if(dept != '') {
   bookQuery = Book.find({ borrower_dept: dept, deleted: false});
  }
  let fetchedBooks ;
  if(pageSize && currentPage){
     bookQuery.skip(pageSize * (currentPage -1))
      .limit(pageSize);
  }
   bookQuery.then(documents =>{
     fetchedBooks = documents;
     if(dept != '') {
      return Book.countDocuments({borrower_dept: dept, deleted: false});
     }
      return Book.countDocuments({ borrowed: true, deleted: false});
   }).then (count => {
      res.status(200).json({
        message: "Books fetched succesfully!",
        books: fetchedBooks,
        count: count
      });
     });
    });
router.get("/getByCardNo/:cardNo",checkAuth,(req,res,next) => {
Book.find({cardNo: req.params.cardNo})
.then(result => {
  res.status(200).json({message: 'got Book', book: result});
});
});

  function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};




 module.exports = router;
