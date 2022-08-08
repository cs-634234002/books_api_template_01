var express = require("express");
var cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(cors());


//Firebase Real Time
var firebase = require("firebase-admin");
var serviceAccount = require("./private_key.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL:
    "https://book-api-710d1-default-rtdb.asia-southeast1.firebasedatabase.app",
});

var db = firebase.database();


//----------- Books ------------//
//Get all books
app.get("/books", function (req, res) {
  res.setHeader("Content-Type", "application/json");

  var booksReference = db.ref("books");

  booksReference.on(
    "value",
    function (snapshot) {
      res.json(snapshot.val());
      booksReference.off("value");
    },
    function (errorObject) {
      res.send("The read failed: " + errorObject.code);
    }
  );
});

//Get a book by id
app.get("/books/:bookid", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  var bookid = Number(req.params.bookid);
  var booksReference = db.ref("books");

  booksReference
    .orderByChild("bookid")
    .equalTo(bookid)
    .on(
      "child_added",
      function (snapshot) {
        res.json(snapshot.val());
        booksReference.off("value");
      },
      function (errorObject) {
        res.send("The read failed: " + errorObject.code);
      }
    );
});

//Delete a book by id
app.delete("/books/:bookid", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  var bookid = Number(req.params.bookid);
  var booksReference = db.ref("books/" + bookid);
  if (booksReference !== null) {
    booksReference.remove();
    return res.send({
      error: false,
      message: "Delete book id =" + bookid.toString(),
    });
  }

  if (error) throw error;
});

//Add new book
app.post("/books", function (req, res) {
  var bookidValue = req.body.bookid;
  var titleValue = req.body.title;
  var shortDescriptionValue = req.body.shortDescription;
  var authorValue = req.body.author;
  var categoryValue = req.body.category;
  var isbnValue = req.body.isbn;
  var pageCountValue = req.body.pageCount;
  var priceValue = req.body.price;
  var publishedDateValue = req.body.publishedDate;
  var thumbnailUrlValue = req.body.thumbnailUrl;

  var referencePath = "/books/" + bookidValue + "/";

  //Add to Firebase
  var bookReference = db.ref(referencePath);
  if (bookReference !== null) {
    bookReference.update(
      {
        bookid: bookidValue,
        title: titleValue,
        shortDescription: shortDescriptionValue,
        author: authorValue,
        category: categoryValue,
        isbn: isbnValue,
        pageCount: pageCountValue,
        price: priceValue,
        publishedDate: publishedDateValue,
        thumbnailUrl: thumbnailUrlValue,
      },
      function (error) {
        if (error) {
          res.send("Data could not be saved." + error);
        } else {
          res.send("");
        }
      }
    );
  }
});

//Edit a book by id
app.put("/books/:bookid", function (req, res) {


  var bookidValue = Number(req.params.bookid);
  var titleValue = req.body.title;
  var shortDescriptionValue = req.body.shortDescription;
  var authorValue = req.body.author;
  var categoryValue = req.body.category;
  var isbnValue = req.body.isbn;
  var pageCountValue = req.body.pageCount;
  var priceValue = req.body.price;
  var publishedDateValue = req.body.publishedDate;
  var thumbnailUrlValue = req.body.thumbnailUrl;

  var referencePath = "/books/" + bookidValue + "/";

  var bookReference = db.ref(referencePath);
  if (bookReference !== null) {
    bookReference.update(
      {
        bookid: bookidValue,
        title: titleValue,
        shortDescription: shortDescriptionValue,
        author: authorValue,
        category: categoryValue,
        isbn: isbnValue,
        pageCount: pageCountValue,
        price: priceValue,
        publishedDate: publishedDateValue,
        thumbnailUrl: thumbnailUrlValue,
      },
      function (error) {
        if (error) {
          res.send("Data could not be saved." + error);
        } else {
          res.send("");
        }
      }
    );
  }
});



//Get all books
app.get("/books", function (req, res) {
  res.setHeader("Content-Type", "application/json");

  var booksReference = db.ref("books");

  booksReference.on(
    "value",
    function (snapshot) {
      res.json(snapshot.val());
      booksReference.off("value");
    },
    function (errorObject) {
      res.send("The read failed: " + errorObject.code);
    }
  );
});

//Get a book by id
app.get("/books/:bookid", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  var bookid = Number(req.params.bookid);
  var booksReference = db.ref("books");

  booksReference
    .orderByChild("bookid")
    .equalTo(bookid)
    .on(
      "child_added",
      function (snapshot) {
        res.json(snapshot.val());
        booksReference.off("value");
      },
      function (errorObject) {
        res.send("The read failed: " + errorObject.code);
      }
    );
});
//test01
//Delete a book by id
app.delete("/books/:bookid", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  var bookid = Number(req.params.bookid);
  var booksReference = db.ref("books/" + bookid);
  if (booksReference !== null) {
    booksReference.remove();
    return res.send({
      error: false,
      message: "Delete book id =" + bookid.toString(),
    });
  }

  if (error) throw error;
});

//Add new book
app.post("/books", function (req, res) {
  var bookidValue = req.body.bookid;
  var titleValue = req.body.title;
  var shortDescriptionValue = req.body.shortDescription;
  var authorValue = req.body.author;
  var categoryValue = req.body.category;
  var isbnValue = req.body.isbn;
  var pageCountValue = req.body.pageCount;
  var priceValue = req.body.price;
  var publishedDateValue = req.body.publishedDate;
  var thumbnailUrlValue = req.body.thumbnailUrl;

  var referencePath = "/books/" + bookidValue + "/";

  //Add to Firebase
  var bookReference = db.ref(referencePath);
  if (bookReference !== null) {
    bookReference.update(
      {
        bookid: bookidValue,
        title: titleValue,
        shortDescription: shortDescriptionValue,
        author: authorValue,
        category: categoryValue,
        isbn: isbnValue,
        pageCount: pageCountValue,
        price: priceValue,
        publishedDate: publishedDateValue,
        thumbnailUrl: thumbnailUrlValue,
      },
      function (error) {
        if (error) {
          res.send("Data could not be saved." + error);
        } else {
          res.send("");
        }
      }
    );
  }
});

//Edit a book by id
app.put("/books/:bookid", function (req, res) {


  var bookidValue = Number(req.params.bookid);
  var titleValue = req.body.title;
  var shortDescriptionValue = req.body.shortDescription;
  var authorValue = req.body.author;
  var categoryValue = req.body.category;
  var isbnValue = req.body.isbn;
  var pageCountValue = req.body.pageCount;
  var priceValue = req.body.price;
  var publishedDateValue = req.body.publishedDate;
  var thumbnailUrlValue = req.body.thumbnailUrl;

  var referencePath = "/books/" + bookidValue + "/";

  var bookReference = db.ref(referencePath);
  if (bookReference !== null) {
    bookReference.update(
      {
        bookid: bookidValue,
        title: titleValue,
        shortDescription: shortDescriptionValue,
        author: authorValue,
        category: categoryValue,
        isbn: isbnValue,
        pageCount: pageCountValue,
        price: priceValue,
        publishedDate: publishedDateValue,
        thumbnailUrl: thumbnailUrlValue,
      },
      function (error) {
        if (error) {
          res.send("Data could not be saved." + error);
        } else {
          res.send("");
        }
      }
    );
  }
});

//----------- Users ------------//
//Get all users
// 1)--- Code ----//
app.get("/users", function (req, res) {

  res.setHeader("Content-Type", "application/json");

  var usersReference = db.ref("users");

  usersReference.on(
    "value",
    function (snapshot) {
      res.json(snapshot.val());
      usersReference.off("value");
    },
    function (errorObject) {
      res.send("The read failed: " + errorObject.code);
    }
  );
});
  
//Delete a user by id
// 2)--- Code ----//
app.delete("/users/:userid", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  var userid = Number(req.params.userid);
  var usersReference = db.ref("users/" + userid);
  if (usersReference !== null) {
    usersReference.remove();
    return res.send({
      error: false,
      message: "Delete user id =" + userid.toString(),
    });
  }

  if (error) throw error;
});

//Add new user
// 3)--- Code ----//
app.post("/users", function (req, res) {
  var useridValue = req.body.userid;
  var firstnameValue = req.body.firstname;
  var lastnameValue = req.body.lastname;
  

  var referencePath = "/users/" + useridValue + "/";

  //Add to Firebase
  var userReference = db.ref(referencePath);
  if (userReference !== null) {
    userReference.update(
      {
        userid: useridValue,
        firstname:firstnameValue,
        lastname:lastnameValue,
      
      },
      function (error) {
        if (error) {
          res.send("Data could not be saved." + error);
        } else {
          res.send("");
        }
      }
    );
  }
});

//Edit a user by id
// 4)--- Code ----//

app.listen(port, function () {
  console.log("Server is up and running...");
});
