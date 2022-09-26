class Book{
    constructor(bookName, userName){
        this.bookName= bookName;
        this.userName= userName;
    }
}

class Library{
    constructor(givenBookList){
        this.bookList = givenBookList;
    }

    getBookList(){
        this.bookList.forEach(element => {
            // console.log(element.bookName +" "+element.userName);
        });
        return this.bookList;
        //return JSON.parse(this.bookList);
    }

    issueBook(givenBookName, givenUserName){
        this.bookList.forEach(element => {
           if(element.bookName == givenBookName){
               element.userName = givenUserName;
            //    console.log("issued..!")
           }

        }); 
    }

    returnBook(givenBookName){
        this.bookList.forEach(element => {
            if(element.bookName == givenBookName){
                element.userName = undefined;
                // console.log("returned..!")
            }
 
         });
    }
}

let book1 = new Book("AOT");
let book2 = new Book("DBZ","ankur");
let book3 = new Book("TNT","raghu");
let book4 = new Book("JD_Lee","vignesh");

let myBookList = [book1,book2,book3,book4];
// console.log("mybooklist: "+myBookList);
// console.log(JSON.stringify(myBookList));

// let myLibrary = new Library(JSON.stringify(myBookList));
let myLibrary = new Library(myBookList);
// console.log("myLibrary: "+myLibrary);
