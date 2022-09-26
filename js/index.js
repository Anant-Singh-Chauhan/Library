// To do:
//     > implement searching; >> DONE
//     > implement sorting    >> DONE
//     > implement members   
//     > implement assigng books, returning books, defaulters, fines etc.
//     > implement pie chart  >> DONE
// import { FillHomeData } from "./FillHomeData";

// Rows per page
const rowsPerPage = 10;

// 
let currentPageIndex = 1;

// object-BOOK
function Book(bookId, bookname, author, genre, dateInducted, quantity, publication, source) {
    this.bookname = bookname;
    this.author = author;
    this.genre = genre;
    this.dateInducted = dateInducted;
    this.quantity = quantity;
    this.publication = publication;
    this.source = source;
    this.bookId = bookId;

}
// firing display on page load for first 10 entries.

function AllBookOnLoad() {
    let libraryObj = [];
    if (localStorage.getItem('library') != null) {

        libraryObj = JSON.parse(localStorage.getItem('library'));
        MakePagination((JSON.parse(localStorage.getItem('library'))).length)
    }
    DisplayTenEntries(1, rowsPerPage)
}

//#region ------NEW ENTRY VALIDATION AND ADDITION------
//function to record new entry into local storage
function AddBookEntry(e) {
    let bookname = document.getElementById('bookName');
    let author = document.getElementById('author');
    let genre;

    // genre
    let fiction = document.getElementById('fiction');
    let nonfiction = document.getElementById('nonFiction');
    let tech = document.getElementById('technology');
    let course = document.getElementById('course');

    if (fiction.checked) {
        genre = fiction;
    } else if (nonfiction.checked) {
        genre = nonfiction;
    } else if (tech.checked) {
        genre = tech;
    } else if (course.checked) {
        genre = course;
    }

    let dateInducted = document.getElementById('dateInducted');
    let quantity = document.getElementById('quantity');
    let publication = document.getElementById('publication');
    let source = document.getElementById('source');
    let length = 0;
    if(localStorage.getItem('library')!=null){
        length =  JSON.parse(localStorage.getItem('library')).length
    }
    let bookId = "Nitj#" +(length+1);
    let newBook = new Book(bookId, bookname.value, author.value, genre.value, dateInducted.value, quantity.value, publication.value, source.value);
    if (ValidateEntry(newBook)) {
        let libraryObj=[];
        let availableObj=[];
        if (localStorage.getItem('library') == null) {
            libraryObj = [];

        } else {
            libraryObj = JSON.parse(localStorage.getItem('library'));
        }

        if (localStorage.getItem('available') == null) {
            availableObj = [];

        } else {
            availableObj = JSON.parse(localStorage.getItem('available'));
        }

        libraryObj.push(newBook);
        availableObj.push(newBook);
        //console.log(libraryObj);
        localStorage.setItem('library', JSON.stringify(libraryObj));
        localStorage.setItem('available', JSON.stringify(availableObj));


        DisplayLatestEntries();
        ClearFields();
        showAlert('success', 'New entry made succesfully!!')
        FillHomeData();
        google.charts.load("current", {
            packages: ["corechart"]
        });
        google.charts.setOnLoadCallback(drawChart);
        // e.preventDefault();
    } else {
        showAlert('danger', 'Mandatory fields not filled!!')
        // console.log('empty fields');
        // e.preventDefault();
    }

    //  e.preventDefault();

}

// function to validate new entry
function ValidateEntry(newBook) {
    if (newBook.bookname.length < 2 || newBook.author.length < 2 || newBook.dateInducted.length < 2
        // ||newBook.quantity.length<2  
    ) {
        // showAlert('danger','Mandatory fields not filled!!')

        return false;
    } else {
        return true;
    }
}

// funciton to ClearFields after new entry has been made successfully
function ClearFields() {
    document.getElementById('inputForm').reset();
}

// shows respective Alerts while entering new book instance 
function showAlert(type, message) {
    // console.log('alert fired')
    let alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.role = "alert";
    alert.innerText = message;
    alert.style.width = "50 px";
    alert.style.zIndex = "999";

    nav = document.getElementById('nav');
    nav.after(alert);

    //     let html=`
    //     <div class="alert alert-${type}" role="alert">${message}
    //   </div>
    //     `
    setTimeout(() => {
        alert.remove();
        // console.log('alert removed');

    }, 1500);


}

//#endregion



// function to add update latest entries on home page
function DisplayLatestEntries() {
    let library = localStorage.getItem('library');
    if (library == null) {
        document.getElementById('tableBodyLatest').innerHTML = `No Entries found!`;
        document.getElementById('tableBodyLatest').style.textAlign = "center";
    } else {
        let libraryObj = JSON.parse(library);

        let html = "";

        for (let index = libraryObj.length - 1; index >= libraryObj.length - 5 && index >= 0; index--) {
            const element = libraryObj[index];
            html += `
                <tr>
                <td>${element.bookId}</td>
                <td>${element.bookname}</td>
                <td>${element.author}</td>
                <td>${element.genre}</td>
                <td>${element.publication}</td>
                </tr>
    `
        }

        let tableBody = document.getElementById('tableBodyLatest');
        tableBody.innerHTML = html;

    }
    FillHomeData();



}

// funciton to implement pagination
// Adds pages to pagination and assigns their respective ONCLICK Functions
function MakePagination(count) {
    // console.log('making default pages....')
    // console.log("total entries: " + count);
    let pages = Math.ceil(count / 10);
    // console.log("pages " + pages);

    let pageIndex = 1;

    while (pageIndex <= pages) {
        let newPage = document.createElement('li');
        newPage.className = 'page-item';
        let a = document.createElement('button');
        a.className = 'page-link btnPagination';
        a.innerText = pageIndex;
        a.id = `page${pageIndex}`;

        if (a.id == 'page1') {
            a.classList.add('active');
        }
        // a.onclick=DisplayTenEntries(parseInt(a.innerText),rowsPerPage);
        // a.addEventListener('click',DisplayTenEntries(parseInt(a.innerText),rowsPerPage));
        // a.href=
        newPage.appendChild(a);

        // let html = `
        //         <li class="page-item"><a class="page-link" href="#" id=page${index}>${index}</a></li>
        //         `
        // 

        let next = document.getElementById('next');
        next.before(newPage);

        // console.log('paginationindex made: '+ pageIndex)
        pageIndex++;



    }

    let elems = document.getElementsByClassName('btnPagination');
    // console.log(elems);
    Array.from(elems).forEach(element => {
        // console.log(element);
        element.setAttribute("onclick", `DisplayTenEntries(${parseInt(element.innerText)},${rowsPerPage})`)
        // element.onclick = DisplayTenEntries(parseInt(element.innerText),rowsPerPage);
        // element.onclick = DisplayTenEntries(,rowsPerPage);

    });

}

function DisplayTenEntries(currentPage, rowsPerPage) {
    // console.log("page click fired for default page: " + currentPage)
    currentPage--;
    let library = localStorage.getItem('library');
    if (library == null) {
        document.getElementById('tableBodyInventory').innerHTML=`No Entries Found`;
    } else {
        let libraryObj = JSON.parse(library);
        //MakePagination(libraryObj.length);
        let html = "";
        let loopstart = rowsPerPage * currentPage;
        let loopend = loopstart + rowsPerPage;
        for (let index = loopstart; index < loopend && index < libraryObj.length; index++) {
            const element = libraryObj[index];
            html += `
                    <tr ondblclick="ShowOne(event)">
                    <td>${element.bookId}</td>
                    <td>${element.bookname}</td>
                    <td>${element.author}</td>
                    <td>${element.genre}</td>
                    <td>${element.quantity}</td>
                    <td>${element.dateInducted}</td>
                    <td>${element.publication}</td>
                    <td>${element.source}</td>
                    </tr>
        `
        }

        let tableBody = document.getElementById('tableBodyInventory');
        tableBody.innerHTML = html;

        //Logic related to PREVIOUS and NEXT buttons
        // sets onclick attribute for NEXT btn wrt present page
        document.getElementById('btnNext').setAttribute("onclick", `DisplayTenEntries(${currentPage+2},${rowsPerPage})`)

        // sets onclick attribute for Previous btn wrt present page
        document.getElementById('btnPrevious').setAttribute("onclick", `DisplayTenEntries(${currentPage},${rowsPerPage})`)

        let totalPages = Math.ceil(libraryObj.length / 10);
        // console.log("pages: "+ totalPages)
        if ((currentPage + 1) < totalPages) {
            document.getElementById('btnNext').disabled = false;
            document.getElementById('next').classList.remove('disabled');
        } else {
            document.getElementById('btnNext').disabled = true;
            document.getElementById('next').classList.add('disabled');
        }

        if (!(currentPage == 0)) {
            document.getElementById('btnPrevious').disabled = false;
            document.getElementById('previous').classList.remove('disabled');
        } else {
            document.getElementById('btnPrevious').disabled = true;
            document.getElementById('previous').classList.add('disabled');
        }


        //  console.log("crr pg: " +(currentPage+1));
        //  console.log(`page${currentPage+1}`);
        //  document.getElementById(`page${currentPage+1}`).classList.add='active';



        // showing active page
        let pageLinks = document.getElementsByClassName('btnPagination');
        Array.from(pageLinks).forEach(element => {
            // console.log(element);
            element.classList.remove('active');


        });

        currentPage++;
        let act = document.getElementById(`page${currentPage}`);
        //await document.getElementById(`page${currentPage}`);
        if (act != null) {

            // console.log(act);
            // console.log(act.classList);
            act.classList.add('active');
            // console.log(act.classList);
        }



    }
    if (document.getElementById('totalRecords') != null) {
        // console.log(document.getElementById('totalRecords'));
        let records=0;
        if(localStorage.getItem('library')!=null){
            records = ( JSON.parse(localStorage.getItem('library'))).length;
        }
        document.getElementById('totalRecords').innerHTML = `<h6>Total Records: ${records}</h6>`;
        // console.log('here..')
    }




}


function ShowOne(event) {
    // console.log('popup fired!');
    // console.log(event.target.parentNode.children);
    let bookname = event.target.parentNode.children[1].innerText;
    let author = event.target.parentNode.children[2].innerText;
    let genre = event.target.parentNode.children[3].innerText;
    let quantity = event.target.parentNode.children[4].innerText;
    let publication = event.target.parentNode.children[6].innerText;
    let source = event.target.parentNode.children[7].innerText;
    // let dateInducted = event.target.parentNode.children[5]

    document.getElementById('popup_bookname').firstElementChild.innerText = bookname
    document.getElementById('popup_author').firstElementChild.innerText = author
    document.getElementById('popup_genre').firstElementChild.innerText = genre
    document.getElementById('popup_quantity').firstElementChild.innerText = quantity
    document.getElementById('popup_publication').firstElementChild.innerText = publication
    document.getElementById('popup_source').firstElementChild.innerText = source

    document.getElementById('overlay').classList.add('active');
    document.getElementById('popup').classList.add('active');

}


function ClosePopUp() {
    document.getElementById('popup_bookname').firstElementChild.innerText = "";
    document.getElementById('popup_author').firstElementChild.innerText = "";
    document.getElementById('popup_genre').firstElementChild.innerText = "";
    document.getElementById('popup_quantity').firstElementChild.innerText = "";
    document.getElementById('popup_publication').firstElementChild.innerText = "";
    document.getElementById('popup_source').firstElementChild.innerText = "";

    document.getElementById('overlay').classList.remove('active');
    document.getElementById('popup').classList.remove('active');

}

