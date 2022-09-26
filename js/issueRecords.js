// function to display Issues books Record
function DisplayAllIssueRecords() {
    let members = localStorage.getItem('Members');
    if (members == null) {
        document.getElementById('tableBodyIssueRecords').innerHTML=`No Entries found!`;
    } else {
        let membersObj = JSON.parse(members);
        let html = "";


        for (let index = 0; index < membersObj.length; index++) {
            const element = membersObj[index];
            let booklist = element.bookList;
            // let title = "";
            // let author = "";
            // let publication = "";
            // let genre = "";

            html += `
                    <tr class="dataIssuedRow" >    
                    <td>${index+1}</td>
                    <td>${element.memberId}</td>
                    <td>${element.date}</td>
                    <td>
                        <ul>
                        ` +
                dataFill_books(element); +
            `
                        </ul>
                    </td>
                    </tr>
                    `;

        }

        let tableBody = document.getElementById('tableBodyIssueRecords');
        tableBody.innerHTML = html;

    }

}

function dataFill_books(element) {
    let insideHtml = "";
    let count = 0;
    element.bookList.forEach(book => {
        title = book.bookname;
        author = book.author;
        genre = book.genre;
        publication = book.publication;
        let returnStatus = element.returned[count];

        // console.log('in loop..')
        insideHtml += `
            <li >
                <h6>${title}</h6>
                <button type="button" class="btn btn-primary btnReturn" style="float:right; margin:10px;" onclick="BookReturn(event)">Return</button>
                <ul>
                    <li>Book ID: ${book.bookId}</li>
                    <li>Author: ${author}</li>
                    <li>Genre: ${genre}</li>
                    <li>Publication: ${publication}</li>
                    <li>Source: ${book.source}</li>
                </ul>` +
            ReturnStatus(returnStatus)

            +
            ` </li>
        `;
        count++;

    });
    return insideHtml;
}

function ReturnStatus(status) {
    if (status == true) {
        return `<h6 >Return Status: <span class="returnStatusSuccess">${status}</span></h6>`
    } else {
        return `<h6 >Return Status: <span class="returnStatusFail">${status}</span></h6>`
    }
}

function BookReturn(event) {
    // console.log('return clicked!')
    // console.log(event.target.parentNode.childNodes);
    let nodes = event.target.parentNode.childNodes;
    let title = nodes[1].innerText;
    let returnStatus = nodes[6].innerText.slice(15);
    let items = nodes[5].childNodes;
    let author = items[3].innerText.slice(8);
    let genre = items[5].innerText.slice(7);
    let publication = items[7].innerText.slice(13);
    let source = items[9].innerText.slice(8);
    let user = event.target.parentNode.parentNode.parentNode.parentNode.childNodes[3].innerText;
    title=String(title).trim();

    // console.log(title)
    // console.log(returnStatus)
    // console.log(author)
    // console.log(publication)
    // console.log(genre)
    // console.log(source)

    // console.log(user)


    if (returnStatus == "true") {
        alert("Already Returned!")
    } else {
        let memberObj = JSON.parse(localStorage.getItem('Members'));

        let availableObj = JSON.parse(localStorage.getItem('available'));

        // iterate over local storage Members, to update 'Returned Record'
        for (let index = 0; index < memberObj.length; index++) {
            const elemMem = memberObj[index];
            if (elemMem.memberId == user) {
                let booklist = elemMem.bookList;
                // console.log('found booklist!')
                for (let index2 = 0; index2 < booklist.length; index2++) {
                    const book = booklist[index2];

                    if ((book.bookname.trim() == title.trim()) &&
                        (book.author.trim() == author.trim()) &&
                        (book.genre.trim() == genre.trim()) &&
                        (book.publication.trim() == publication.trim()) &&
                        (book.source.trim() == source.trim())) {
                        // console.log("quantity updated in members, returned sattus changed")
                        book.quantity++;
                        elemMem.returned[index2] = true;
                        // console.log('status changed')
                        localStorage.setItem('Members', JSON.stringify(memberObj))
                        break;
                    }
                }


            }
        }

        // iterate over local storage Available, to update 'Book quantity'
        for (let index = 0; index < availableObj.length; index++) {
            const elemAvail = availableObj[index];

            if ((title == elemAvail.bookname) &&
                (author == elemAvail.author) &&
                (genre == elemAvail.genre) &&
                (publication == elemAvail.publication) &&
                (source == elemAvail.source)) {
                // console.log("quantity updated in available")

                elemAvail.quantity++;
                IssuedBookCount = localStorage.getItem('IssuedBookCount');
                IssuedBookCount--;
                localStorage.setItem('IssuedBookCount', IssuedBookCount);
                localStorage.setItem('available', JSON.stringify(availableObj))
            }
        }

        DisplayAllIssueRecords();

    }


}

function liveSearch_IssuedBook() {
    let searchTxt = document.getElementById('issuedBookSearch').value;
    //  console.log("live issue search fired, issue search txt: " + searchTxt) ////
    // if (searchTxt == undefined) {
    //     localStorage.setItem('search', undefined)
    //     console.log("search txt undefined!")/////
    // } 
    // document.getElementById('sortLabel').innerText='None';

    if (searchTxt == "") {
        //  console.log("issue search txt undefined!") /////

        localStorage.setItem('IssuedBookSearchLib', undefined);
        //     document.getElementById('sortLabel').innerText='None'
        //     document.getElementById('pagination').innerHTML=`<li class="page-item" id="previous">
        //     <button class="page-link" id="btnPrevious" tabindex="-1">Previous</button>
        // </li>
        // <li class="page-item" id="next">
        //     <button class="page-link" id="btnNext">Next</button>
        // </li>`;

        // MakePagination(( JSON.parse(localStorage.getItem('library'))).length);
        DisplayAllIssueRecords();
    } else {
        let searchLibraryObj = JSON.parse(localStorage.getItem('Members'));
        // console.log(searchTxt.toLowerCase());

        for (let index = 0; index < searchLibraryObj.length; index++) {
            const element = searchLibraryObj[index];
            // console.log(element.bookname.toLowerCase());
            // if (!((String(element.bookname.toLowerCase)).includes(searchTxt.toLowerCase)) && !((String(element.author.toLowerCase)).includes(searchTxt.toLowerCase)))
            if ((!(element.memberId.toLowerCase()).includes(searchTxt.toLowerCase()))) {
                let bookFLag = false;
                element.bookList.forEach(elemBook => {
                    if ((elemBook.bookname.toLowerCase().includes(searchTxt.toLowerCase()))) {
                        bookFLag = true;

                    }

                })

                if (bookFLag == false) {
                    searchLibraryObj.splice(index, 1);
                    index--;
                }

            }

        }
        localStorage.setItem('IssuedBookSearchLib', JSON.stringify(searchLibraryObj));

        DisplayLiveSearch_IssuedBooks();
    }
    // console.log(document.getElementById('search').value);
}

function DisplayLiveSearch_IssuedBooks() {
    let members = localStorage.getItem('IssuedBookSearchLib');
    if (members == null) {
        document.getElementById('tableBodyIssueRecords').lastChild.innerHTML(`No Entries found!`)
    } else {
        let membersObj = JSON.parse(members);
        let html = "";


        for (let index = 0; index < membersObj.length; index++) {
            const element = membersObj[index];
            let booklist = element.bookList;
            // let title = "";
            // let author = "";
            // let publication = "";
            // let genre = "";

            html += `
                    <tr class="dataIssuedRow" >    
                    <td>${index+1}</td>
                    <td>${element.memberId}</td>
                    <td>${element.date}</td>
                    <td>
                        <ul>
                        ` +
                dataFill_books(element); +
            `
                        </ul>
                    </td>
                    </tr>
                    `;

        }

        let tableBody = document.getElementById('tableBodyIssueRecords');
        tableBody.innerHTML = html;


    }
}   