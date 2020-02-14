const express =require('express');
const router = express.Router();
const Book = require("../model/book");

router.get("/getAccession", (req,res,next) => {
 accession.find({}).then(result =>{
res.status(200).json({
  message:"Got Accession",
  accession: result
});
 });
  });

  router.post("/updateAccession",(req,res,next) => {

    const acc = new accession({
     _id: req.body._id,
     accession_no: req.body.accession_no
    });

    accession.updateOne({_id: req.body._id}, acc).then(() =>{
      res.status(200).json({
        message: 'Accession Updated'
      });
    });

  });


  router.get("/SaveAccession/:accession", (req, res, next) => {
    const acc = new accession({
    accession_no: req.params.accession,

    });
    acc.save()
    .then(() => {
      res.status(201).json({
        message: "Accession saved Successfully!"
      });
    }).catch(err => {
          res.status(500).json({
      error: err
      });
    });

  });


router.get("/get/:isbn", (req,res,next) => {
const isbn= req.params.isbn;
Book.find({isbn: isbn , deleted: false}).sort({_id:-1})
.then(documents => {
res.status(200).json({
books: documents,
message: "got matching book"
});
});
});


router.get("/getbytitle", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const title = req.query.title;
  const regex = new RegExp(escapeRegex(title), 'gi');
  let fetchedBooks;
  const toskip = pageSize * (currentPage -1);
  const bookQuery = Book.aggregate(
      [   { $match : { deleted : false , title: regex} },
          { $sort: { _id: -1 } },
          { $skip : toskip },
          {
            $group:
              {
               _id: "$isbn",

                isbn: { $first: "$isbn" },
                title: { $first: "$title" },
                author: { $first: "$author" },
                source: { $first: "$source" },
                subject: { $first: "$subject" },
                accession_no: { $first: "$accession_no" },
                available: { $first: null },
                total: { $sum: 1 }
              }

          }
        ]
      );

  const bookQuery2 = Book.aggregate(
    [   { $match : { deleted : false , title: regex} },
      { $skip : toskip },
        { $sort: { _id: -1 } },
        {$group:{ _id: "$isbn"}}, {$count: "count"}
      ]
    );
   bookQuery.then(documents =>{
     fetchedBooks= documents;
  bookQuery2.then(result => {
    res.status(200).json({
      message: "Books fetched succesfully!",
      books: fetchedBooks,
      count: result
    });
  });

     });
});

router.get("/getbytitle2", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const title = req.query.title;
  let toskip = 0;
  const regex = new RegExp(escapeRegex(title), 'gi');
  let fetchedBooks;
  if(pageSize && currentPage){
    toskip = pageSize * (currentPage -1);
 }

  const bookQuery = Book.aggregate(
      [   { $match : { deleted : false , title: regex} },
          { $sort: { _id: -1 } },
          { $skip : toskip },
          { $limit: pageSize}
                  ]
      );

  const bookQuery2 = Book.aggregate(
    [   { $match : { deleted : false , title: regex} },
      { $skip : toskip },
        { $sort: { _id: -1 } },
         {$count: "count"}
      ]
    );
   bookQuery.then(documents =>{
     fetchedBooks= documents;
  bookQuery2.then(result => {
    res.status(200).json({
      message: "Books fetched succesfully!",
      books: fetchedBooks,
      count: result
    });
  });

     });
});

router.get("/getbyauthor2",(req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const author = req.query.author;
  let toskip = 0;
  let fetchedBooks;

  const regex = new RegExp(escapeRegex(author), 'gi');
  if(pageSize && currentPage){
     toskip = pageSize * (currentPage -1);
  }

  const bookQuery = Book.aggregate(
      [   { $match : { deleted : false , author: regex} },
          { $sort: { _id: -1 } },
          { $skip : toskip },
          { $limit: pageSize}


        ]
      );

  const bookQuery2 = Book.aggregate(
    [   { $match : { deleted : false , author: regex} },
      { $skip : toskip },
        { $sort: { _id: -1 } },
         {$count: "count"}
      ]
    );
   bookQuery.then(documents =>{
     fetchedBooks= documents;
  bookQuery2.then(result => {

    res.status(200).json({
      message: "Books fetched succesfully!",
      books: fetchedBooks,
      count: result
    });
  });

     });
});


router.get("/getbyauthor", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const author = req.query.author;
  let toskip = 0;
  let fetchedBooks;

  const regex = new RegExp(escapeRegex(author), 'gi');
  if(pageSize && currentPage){
     toskip = pageSize * (currentPage -1);
  }

  const bookQuery = Book.aggregate(
      [   { $match : { deleted : false , author: regex} },
          { $sort: { _id: -1 } },
          { $skip : toskip },
          {
            $group:
              {
               _id: "$isbn",

                isbn: { $first: "$isbn" },
                title: { $first: "$title" },
                author: { $first: "$author" },
                source: { $first: "$source" },
                subject: { $first: "$subject" },
                accession_no: { $first: "$accession_no" },
                available: { $first: null },
                total: { $sum: 1 }
              }

          }
        ]
      );

  const bookQuery2 = Book.aggregate(
    [   { $match : { deleted : false , author: regex} },
      { $skip : toskip },
        { $sort: { _id: -1 } },
        {$group:{ _id: "$isbn"}}, {$count: "count"}
      ]
    );
   bookQuery.then(documents =>{
     fetchedBooks= documents;
  bookQuery2.then(result => {

    res.status(200).json({
      message: "Books fetched succesfully!",
      books: fetchedBooks,
      count: result
    });
  });

     });
});



router.get("/all/:accessionNo",(req, res, next) => {
  const accessionNo = req.params.accessionNo;
  let fetchedBooks ;
  Book.find({accession_no: accessionNo, deleted: false }).sort({_id:-1}).then(documents =>{
     fetchedBooks = documents;
  if(fetchedBooks.length > 0){

    return Book.countDocuments({isbn: fetchedBooks[0].isbn, deleted: false }).sort({_id:-1});
  } else {
    return Book.countDocuments({isbn:0, deleted: false }).sort({_id:-1});
  }

   }).then (result => {

      res.status(200).json({
        message: "Books fetched succesfully!",
        books: fetchedBooks,
        count: result
      });
     });
    });


router.get("/getIsbnCount/:isbn",(req,res,next)=> {
Isbn = req.params.isbn;
console.log(Isbn);
  Book.count({ deleted: true}).then(result =>{
res.status(200).json({
  count: result
});
  });
});



router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
const currentPage = +req.query.page;
let fetchedBooks;
const bookQuery = Book.aggregate(
[   { $match : { deleted : false } },
    { $sort: { _id: -1 } },
    {
      $group:
        {
          _id: "$isbn",

          isbn: { $first: "$isbn" },
          title: { $first: "$title" },
          author: { $first: "$author" },
          source: { $first: "$source" },
          subject: { $first: "$subject" },
          accession_no: { $first: "$accession_no" },
          available: { $first: null },
          total: { $sum: 1 }
        }

    }
  ]
);
const bookQuery2 = Book.aggregate(
  [   { $match : { deleted : false } },
      { $sort: { _id: -1 } },
      {$group:{ _id: "$isbn"}}, {$count: "count"}
    ]
  );
if(pageSize && currentPage){
bookQuery.skip(pageSize * (currentPage -1))
.limit(pageSize);
}
 bookQuery.then(documents =>{
   fetchedBooks= documents;
bookQuery2.then(result => {
  res.status(200).json({
    message: "Books fetched succesfully!",
    books: fetchedBooks,
    count: result
  });
});

   });
  });



  router.get("/Available", (req, res, next) => {
  const requiredBook = req.query.isbn;
  Book.aggregate(
    [   { $match : { deleted : false , isbn: requiredBook, borrowed: false} },

        {
          $group:
            {
              _id: "$isbn",
              total: { $sum: 1 }
            }

        }
      ]
    ).then(result => {
res.status(200).json({
available: result
});
    });
});




  router.get("/BooksAll", (req, res, next) => {
    const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const requiredBook = +req.query.book;

  let bookQuery = Book.find({ deleted: false});
  let bookQuery2 = Book.countDocuments({ deleted: false});
  if(requiredBook){
    bookQuery =  Book.find({ deleted: false, isbn: requiredBook});
    bookQuery2 =  Book.countDocuments({ deleted: false, isbn: requiredBook});
  }
  let fetchedBooks ;
  if(pageSize && currentPage){
  bookQuery.skip(pageSize * (currentPage -1))
  .limit(pageSize);
  }
   bookQuery.then(documents =>{
     fetchedBooks = documents;
      return bookQuery2;
   }).then (count => {

      res.status(200).json({

        message: "Books fetched succesfully!",
        books: fetchedBooks,
        count: count
      });
     });
    });


router.get("/:accessionNo", (req,res,next) => {
  Book.find({ accession_no: req.params.accessionNo, deleted: false}).sort({_id:-1})
  .then(documents => {
res.status(200).json({
message: "book found",
book : documents
});
});
});


  function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};




 module.exports = router;
