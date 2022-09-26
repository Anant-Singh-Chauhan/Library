// function to live search
function liveSearch() {
    let searchTxt = document.getElementById('search').value;
    // console.log("live search fired, search txt: " + searchTxt)////
    // if (searchTxt == undefined) {
    //     localStorage.setItem('search', undefined)
    //     console.log("search txt undefined!")/////
    // } 
    document.getElementById('sortLabel').innerText='None';
    
    if (searchTxt == "" ) {
        // console.log("search txt undefined!")/////
        
        localStorage.setItem('search', undefined);
        document.getElementById('sortLabel').innerText='None'
        document.getElementById('pagination').innerHTML=`<li class="page-item" id="previous">
        <button class="page-link" id="btnPrevious" tabindex="-1">Previous</button>
    </li>
    <li class="page-item" id="next">
        <button class="page-link" id="btnNext">Next</button>
    </li>`;

        MakePagination(( JSON.parse(localStorage.getItem('library'))).length);
        DisplayTenEntries(1, rowsPerPage);
    }
    
    else {
        let searchLibraryObj = JSON.parse(localStorage.getItem('library'));
        // console.log(searchTxt.toLowerCase());

        for (let index = 0; index < searchLibraryObj.length; index++) {
            const element = searchLibraryObj[index];
           // console.log(element.bookname.toLowerCase());
            // if (!((String(element.bookname.toLowerCase)).includes(searchTxt.toLowerCase)) && !((String(element.author.toLowerCase)).includes(searchTxt.toLowerCase)))
            if((!(element.bookname.toLowerCase()).includes(searchTxt.toLowerCase())) && !((element.author.toLowerCase()).includes(searchTxt.toLowerCase()))) {
                searchLibraryObj.splice(index, 1);
                index--;
            }

        }
        localStorage.setItem('search', JSON.stringify(searchLibraryObj));

        DisplaySearchEntries();
    }
    // console.log(document.getElementById('search').value);


}

function DisplaySearchEntries() {
    document.getElementById('pagination').innerHTML=`<li class="page-item" id="previous">
    <button class="page-link" id="btnPrevious" tabindex="-1">Previous</button>
</li>
<li class="page-item" id="next">
    <button class="page-link" id="btnNext">Next</button>
</li>`;
MakeSearchPagination(JSON.parse(localStorage.getItem('search')).length);
    DisplayTenSearchEntries(1,rowsPerPage);

}

function DisplayTenSearchEntries(currentPage, rowsPerPage) {
    //   console.log("page click fired for search page: "+ currentPage)
     currentPage--;
     let searchlibrary = localStorage.getItem('search');
     if (search == null) {
         document.getElementById('tableBodyInventory').lastChild.innerHTML(`<hr><h5>No Entries found!<\\h5>`);
     } else {
         let searchlibraryObj = JSON.parse(searchlibrary);
         //MakePagination(libraryObj.length);
         let html = "";
         let loopstart = rowsPerPage * currentPage;
         let loopend = loopstart + rowsPerPage;
         for (let index = loopstart; index < loopend && index < searchlibraryObj.length; index++) {
             const element = searchlibraryObj[index];
             html += `
                     <tr>
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
         document.getElementById('btnNext').setAttribute("onclick", `DisplayTenSearchEntries(${currentPage+2},${rowsPerPage})`)
 
         // sets onclick attribute for Previous btn wrt present page
         document.getElementById('btnPrevious').setAttribute("onclick", `DisplayTenSearchEntries(${currentPage},${rowsPerPage})`)
 
         let totalPages = Math.ceil(searchlibraryObj.length / 10);
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
         document.getElementById('totalRecords').innerHTML = `<h6>Search Records: ${( JSON.parse(localStorage.getItem('search'))).length}</h6>`;
         // console.log('here..')
     }
 
}


function MakeSearchPagination(count) {
    console.log('making search pages....')
    // console.log('making pages....')
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
        element.setAttribute("onclick", `DisplayTenSearchEntries(${parseInt(element.innerText)},${rowsPerPage})`)
        // element.onclick = DisplayTenEntries(parseInt(element.innerText),rowsPerPage);
        // element.onclick = DisplayTenEntries(,rowsPerPage);

    });

}
