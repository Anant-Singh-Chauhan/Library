 let TotalBookIssuedCount = 0;
 // Member Object
 function Member(memberId, date, bookList, returned) {
     this.memberId = memberId;
     this.date = date;
     this.bookList = bookList;
     this.returned = returned;
 }  

 function BookIssueOnLoad() {
    localStorage.removeItem("BookCart");
    
    DisplayAvailableEntries();
 }

 // function to live issue search
 function liveIssueSearch() {
     let searchTxt = document.getElementById('issueSearch').value;
    //  console.log("live issue search fired, issue search txt: " + searchTxt) ////
     // if (searchTxt == undefined) {
     //     localStorage.setItem('search', undefined)
     //     console.log("search txt undefined!")/////
     // } 
     // document.getElementById('sortLabel').innerText='None';

     if (searchTxt == "") {
        //  console.log("issue search txt undefined!") /////

         localStorage.setItem('IssueSearchLib', undefined);
         //     document.getElementById('sortLabel').innerText='None'
         //     document.getElementById('pagination').innerHTML=`<li class="page-item" id="previous">
         //     <button class="page-link" id="btnPrevious" tabindex="-1">Previous</button>
         // </li>
         // <li class="page-item" id="next">
         //     <button class="page-link" id="btnNext">Next</button>
         // </li>`;

         // MakePagination(( JSON.parse(localStorage.getItem('library'))).length);
         DisplayAvailableEntries();
     } else {
         let searchLibraryObj = JSON.parse(localStorage.getItem('available'));
         // console.log(searchTxt.toLowerCase());

         for (let index = 0; index < searchLibraryObj.length; index++) {
             const element = searchLibraryObj[index];
             // console.log(element.bookname.toLowerCase());
             // if (!((String(element.bookname.toLowerCase)).includes(searchTxt.toLowerCase)) && !((String(element.author.toLowerCase)).includes(searchTxt.toLowerCase)))
             if ((!(element.bookname.toLowerCase()).includes(searchTxt.toLowerCase())) && !((element.author.toLowerCase()).includes(searchTxt.toLowerCase()))) {
                 searchLibraryObj.splice(index, 1);
                 index--;
             }

         }
         localStorage.setItem('IssueSearchLib', JSON.stringify(searchLibraryObj));

         DisplayIssueSearchEntries();
     }
     // console.log(document.getElementById('search').value);


 }

 function DisplayAvailableEntries() {
    
     let library = localStorage.getItem('available');
     if (library == null) {
         document.getElementById('tableBodyIssueSearch').innerHTML=`No Entries found!`;
     } else {
         let libraryObj = JSON.parse(library);
         //MakePagination(libraryObj.length);
         let html = "";

         for (let index = 0; index < libraryObj.length; index++) {
             const element = libraryObj[index];
             html += `
                <tr class="dataRow" ondblclick="RowClickHandler(event)">    
                <td>${element.bookId}</td>
                <td>${element.bookname}</td>
                <td>${element.author}</td>
                <td>${element.genre}</td>
                <td>${element.publication}</td>
                <td>${element.source}</td>
                <td>${element.quantity}</td>
                </tr>
    `
         }

         let tableBody = document.getElementById('tableBodyIssueSearch');
         tableBody.innerHTML = html;

         PaintSelected();

         // let rows = document.getElementsByTagName('tr');
         // console.log(rows.length)

         // for (let index = 2; index < Array.from(rows).length; index++) {
         //     const element = Array.from(rows)[index];
         //     console.log(element)
         //     console.log('adding event listener!')
         //     // element.setAttribute("ondblclick",`RowClickHandler(${element})`)
         //     // element.addEventListener('onclick', RowClickHandler(element));

         //     element.setAttribute("onclick",`RowClickHandler(${element})`)
         // }

     }




 }

 function DisplayIssueSearchEntries() {
     // document.getElementById('tableBodyIssueSearch').innerHTML=``;
     // MakeSearchPagination(JSON.parse(localStorage.getItem('search')).length);
     // DisplaySearchEntries(1,rowsPerPage);
     let library = localStorage.getItem('IssueSearchLib');
     if (library == null) {
         document.getElementById('tableBodyIssueSearch').lastChild.innerHTML(`No Entries found!`)
     } else {
         let libraryObj = JSON.parse(library);
         //MakePagination(libraryObj.length);
         let html = "";

         for (let index = 0; index < libraryObj.length; index++) {
             const element = libraryObj[index];
             html += `
                <tr class="dataRow" ondblclick="RowClickHandler(event)">
                <td>${element.bookId}</td>
                <td>${element.bookname}</td>
                <td>${element.author}</td>
                <td>${element.genre}</td>
                <td>${element.publication}</td>
                <td>${element.source}</td>
                <td>${element.quantity}</td>
                </tr>
    `
         }

         let tableBody = document.getElementById('tableBodyIssueSearch');
         tableBody.innerHTML = html;

         // let rows = document.getElementsByTagName('tr');

         // for (let index = 2; index < Array.from(rows).length; index++) {
         //     const element = Array.from(rows)[index];
         //     console.log('adding event listeners!')
         //     element.addEventListener('dblclick', RowClickHandler());
         // }
         PaintSelected();


     }

 }


 function RowClickHandler(e) {
    //  console.log("inhere!")
     element = (e.target).parentElement;

     if (!element.classList.contains('selected')) {

         try {
            //  console.log("inhere try!")
             element.classList.add('selected');
             AddToBookCart(element);
             DisplayBookCart();

         } catch (error) {
             console.log(error)
         }
     }

 }

 function AddToBookCart(e) {
     let bookCart = localStorage.getItem('BookCart');
     let bookCartObj = [];
     if (bookCart != null) {
         bookCartObj = JSON.parse(bookCart);
     }
     let availableObj = JSON.parse(localStorage.getItem('available'));

     Array.from(availableObj).forEach(element => {
        //  console.log("checking loop!")
         if ((element.bookname == e.cells[1].innerHTML) &&
             (element.author == e.cells[2].innerHTML) &&
             (element.genre == e.cells[3].innerHTML) &&
             (element.publication == e.cells[4].innerHTML) &&
             (element.source == e.cells[5].innerHTML)) {
            //  console.log("check succeded!")
             bookCartObj.push(element);
             localStorage.setItem('BookCart', JSON.stringify(bookCartObj));
             return;
         }
     })

 }

 function RemoveFromBookCart(e) {
     let bookCart = localStorage.getItem('BookCart');
     let bookCartObj = [];
     if (bookCart != null) {
         bookCartObj = JSON.parse(bookCart);
     }
     // let availableObj = JSON.parse(localStorage.getItem('available'));

     Array.from(bookCartObj).forEach((element, index) => {
         if ((element.bookname == e.cells[1].innerHTML) &&
             (element.author == e.cells[2].innerHTML) &&
             (element.genre == e.cells[3].innerHTML) &&
             (element.publication == e.cells[4].innerHTML) &&
             (element.source == e.cells[5].innerHTML)) {

             bookCartObj.splice(index, 1);
             localStorage.setItem('BookCart', JSON.stringify(bookCartObj));
             return;
         }
     })
 }

 function DisplayBookCart() {
     let bookCart = localStorage.getItem('BookCart');
     if (bookCart == null) {
         document.getElementById('tableBodySelectedBooks').lastChild.innerHTML(`No Entries found!`)
     } else {
         let bookCartObj = JSON.parse(bookCart);
         let html = "";

         for (let index = 0; index < bookCartObj.length; index++) {
             const element = bookCartObj[index];
             html += `
                <tr class="dataSelectedRow" ondblclick="RemoveRowClickHandler(event)">    
                <td>${index+1}</td>
                <td>${element.bookname}</td>
                <td>${element.author}</td>
                <td>${element.genre}</td>
                <td>${element.publication}</td>
                <td>${element.source}</td>
                </tr>
    `
         }
         let tableBody = document.getElementById('tableBodySelectedBooks');
         tableBody.innerHTML = html;
     }
 }

 function RemoveRowClickHandler(e) {
     console.log("in remove selected row!")
     element = (e.target).parentElement;

     RemoveFromBookCart(element);
     DisplayBookCart();
     let selected = document.getElementsByClassName('selected');
     Array.from(selected).forEach(elem => {
         if ((elem.cells[1].innerHTML == element.cells[1].innerHTML) &&
             (elem.cells[2].innerHTML == element.cells[2].innerHTML) &&
             (elem.cells[3].innerHTML == element.cells[3].innerHTML) &&
             (elem.cells[4].innerHTML == element.cells[4].innerHTML) &&
             (elem.cells[5].innerHTML == element.cells[5].innerHTML)) {

             elem.classList.remove('selected');
             return;
         }
     })
 }

 function PaintSelected() {
     //  console.log('trying to paint')
     let bookCart = localStorage.getItem('BookCart');
     if (bookCart != null) {
         bookCartObj = JSON.parse(bookCart);
         if (bookCartObj.length != 0) {

             Array.from(bookCartObj).forEach(elemCart => {
                 //  console.log('loop 1')
                 Array.from(document.getElementsByClassName('dataRow')).forEach(elemLib => {
                     //  console.log('loop 2')
                     if ((elemCart.bookname == elemLib.cells[1].innerHTML) &&
                         (elemCart.author == elemLib.cells[2].innerHTML) &&
                         (elemCart.genre == elemLib.cells[3].innerHTML) &&
                         (elemCart.publication == elemLib.cells[4].innerHTML) &&
                         (elemCart.source == elemLib.cells[5].innerHTML)) {

                         elemLib.classList.add('selected');
                         //  console.log("same elements form bookcart found!");
                         return;
                     }
                 });
             });
         }
     }
 }

 function IssueBook() {
     let members = localStorage.getItem('Members');
     let membersObj = [];
     let memId = document.getElementById('memberId').value;
     let dateIssued = document.getElementById('dateIssued').value;
     let returned = [];

     if (members != null) {
         membersObj = JSON.parse(members);
     }

     let books = localStorage.getItem('BookCart')
     let newBookList = [];
     if (books != null) {
         newBookList = JSON.parse(books);
     }
     for (let index = 0; index < newBookList.length; index++) {
        returned.push(false);
     }

    //  console.log(returned);
     if (!(newBookList.length > 4 || newBookList.length < 1)) {
         let newMember = new Member(memId, dateIssued, newBookList, returned);
         membersObj.push(newMember);

         //  checking if book is available, then processing
         if (RemoveEntryFromAvailable(newBookList)) {

             localStorage.setItem('Members', JSON.stringify(membersObj));

             // clearing fields and Reseting Page..
             localStorage.removeItem('BookCart');
             document.getElementById('memberId').value = "";
             document.getElementById('dateIssued').value = "";
             DisplayAvailableEntries();
             document.getElementById('tableBodySelectedBooks').innerHTML = "";

             // Success alert
             alert('Book Issued Succesfully!');
         }



     } else {
         // showAlert('danger','Books cant be more than 4 or less than 1');
         alert('Books cant be more than 4 or less than 1');
         // console.log('Books cant be more than 4 or less than 1');
     }


 }

 function RemoveEntryFromAvailable(bookCartObj) {
    //  console.log("in removing..")
     let flagAvailable = true;
     let availableObj = JSON.parse(localStorage.getItem('available'));
     let IssuedBookCount = localStorage.getItem('IssuedBookCount');
     Array.from(bookCartObj).forEach(elemCart => {
         Array.from(availableObj).forEach(elemAvail => {
             if ((elemCart.bookname == elemAvail.bookname) &&
                 (elemCart.author == elemAvail.author) &&
                 (elemCart.genre == elemAvail.genre) &&
                 (elemCart.publication == elemAvail.publication) &&
                 (elemCart.source == elemAvail.source)) {
                //  console.log("entry match..")

                 if (elemAvail.quantity != 0) {
                    
                     elemAvail.quantity--;
                     
                     IssuedBookCount++;
                    //  console.log("quantity update done!..")

                 } else {
                     flagAvailable = false;
                     alert("Title: " + elemAvail.bookname + ", has no copies left in Library");

                 }

                 

             }

         })
     })

     if(flagAvailable!=false){
        localStorage.setItem('IssuedBookCount',IssuedBookCount);

     localStorage.setItem('available', JSON.stringify(availableObj))
     }
     
     return flagAvailable;
 }