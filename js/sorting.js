localStorage.setItem('search',"undefined")
let sorts = document.getElementsByClassName('sort');
Array.from(sorts).forEach(element => {
    element.addEventListener('click', function (event) {
        let sortTxt = element.innerText;
        document.getElementById('sortLabel').innerText = sortTxt;
        sorting(String(sortTxt).toLowerCase())
        event.preventDefault();
    });
});

function sorting(sorttxt) {
    try {
        if(sorttxt=='none'){
            // console.log("sort set to NONE!")/////
        
            // localStorage.setItem('sort', undefined);
    
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
            let libraryObj=[];
            if(localStorage.getItem('library')!=null){
                libraryObj = JSON.parse(localStorage.getItem('library'));
            }
            let search = localStorage.getItem('search');
            // if(search==null){
            //     search="undefined";
            // }
            let searchObj = [];
            let sortObj = [];
    
            if (search === 'undefined') {
                // console.log("here in undef")
                sortObj = libraryObj;
            } else {
                searchObj = JSON.parse(search);
                sortObj = searchObj;
                // console.log("here in else");
            }
            // console.log(sorttxt);
    
            localStorage.setItem('sort', JSON.stringify(sortObj));
    
            // console.log("old sortObj: ")
            // console.log(sortObj)
            
            let sortedArr = Array.from(sortObj).myBookSort(sorttxt);
            // console.log("new sortObj: ")
            // console.log(sortedArr)
            sortObj = sortedArr;
            // console.log(sortObj)
            localStorage.setItem('sort',JSON.stringify(sortObj));
            //console.log(typeof(sortedArr)==typeof(sortObj));
    
    
    
            // initial thing
            document.getElementById('pagination').innerHTML=`<li class="page-item" id="previous">
            <button class="page-link" id="btnPrevious" tabindex="-1">Previous</button>
        </li>
        <li class="page-item" id="next">
            <button class="page-link" id="btnNext">Next</button>
        </li>`;
        MakeSortPagination(JSON.parse(localStorage.getItem('sort')).length);
            DisplayTenSortEntries(1,rowsPerPage);
        }
       

    } catch (e) {
        console.error(e);
    }


}

// function to due input based sorting of array
Array.prototype.myBookSort = function (sorttype) {
    function compare(a, b) {
        if (a[sorttype] < b[sorttype]) {
            return -1;
        }
        if (a[sorttype] > b[sorttype]) {
            return 1;
        }

        return 0;
    }
    return this.sort(compare);
}

function MakeSortPagination(count) {
    // console.log('making sort pages....')
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
        element.setAttribute("onclick", `DisplayTenSortEntries(${parseInt(element.innerText)},${rowsPerPage})`)
        // element.onclick = DisplayTenEntries(parseInt(element.innerText),rowsPerPage);
        // element.onclick = DisplayTenEntries(,rowsPerPage);

    });

}

function DisplayTenSortEntries(currentPage, rowsPerPage) {
    // console.log("page click fired for sort page: "+ currentPage)
   currentPage--;
   let sortlibrary = localStorage.getItem('sort');
   if (search == null) {
       document.getElementById('tableBodyInventory').lastChild.innerHTML(`<hr><h5>No Entries found!<\\h5>`);
   } else {
       let sortlibraryObj = JSON.parse(sortlibrary);
       //MakePagination(libraryObj.length);
       let html = "";
       let loopstart = rowsPerPage * currentPage;
       let loopend = loopstart + rowsPerPage;
       for (let index = loopstart; index < loopend && index < sortlibraryObj.length; index++) {
           const element = sortlibraryObj[index];
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
       document.getElementById('btnNext').setAttribute("onclick", `DisplayTenSortEntries(${currentPage+2},${rowsPerPage})`)

       // sets onclick attribute for Previous btn wrt present page
       document.getElementById('btnPrevious').setAttribute("onclick", `DisplayTenSortEntries(${currentPage},${rowsPerPage})`)

       let totalPages = Math.ceil(sortlibraryObj.length / 10);
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
       document.getElementById('totalRecords').innerHTML = `<h6>Search Records: ${( JSON.parse(localStorage.getItem('sort'))).length}</h6>`;
       // console.log('here..')
   }

}
// ---------------trashhhh-----------------

        //    let sortedArr = Array.from(sortObj).sort(CompareBookname); //working

//   let sortedArr =   Array.from(sortObj).sort((a,b,sorttxt) =>{
//         let sortType = sorttxt;
//         if(a[sorttxt] < b[sorttxt]){
//             return -1;
//         }
//         if(a[sorttxt] > b[sorttxt]){
//             return 1;
//         }

//         return 0;
//        } )

// function compare(a,b,sorttxt) {
//     if(a.sorttxt < b.sorttxt){
//         return -1;
//     }
//     if(a.sorttxt > b.sorttxt){
//         return 1;
//     }

//     return 0;
// }

// function CompareBookname(a,b) {
//     if(a.bookname < b.bookname){
//         return -1;
//     }
//     if(a.bookname > b.bookname){
//         return 1;
//     }

//     return 0;
// }