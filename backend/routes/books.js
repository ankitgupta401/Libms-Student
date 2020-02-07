const express =require('express');
const router = express.Router();
const Book = require("../model/book");




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


router.get("/getbyauthor", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const author = req.query.author;
  const regex = new RegExp(escapeRegex(author), 'gi');
  const toskip = pageSize * (currentPage -1);
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
const accessionNo = +req.params.accessionNo;
let fetchedBooks ;
const bookQuery = Book.aggregate(
  [   { $match : { deleted : false , accession_no: accessionNo} },
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
[   { $match : { deleted : false , accession_no: accessionNo} },

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
  router.get("/Available",(req, res, next) => {
    const requiredBook = req.query.isbn;

    const bookQuery2 = Book.aggregate(
      [   { $match : { deleted : false ,isbn: requiredBook, borrowed: false} },
          { $sort: { _id: -1 } },
          {$count: "count"}
        ]
      );
      bookQuery2.then(result => {
        res.status(200).json({
          message: "Books fetched succesfully!",
          count: result
        });
  });
  });

  router.get("",(req, res, next) => {
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



  function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};




 module.exports = router;
