// ------------------------------------------------
//| OBSOLETE | function to display all entries into tableBody, doesn't implement pagination
function DisplayAllEntries() {
    let library = localStorage.getItem('library');
    if (library == null) {
        document.getElementById('latest').lastChild.innerHTML(`No Entries found!`)
    } else {
        let libraryObj = JSON.parse(library);
        //MakePagination(libraryObj.length);
        let html = "";

        for (let index = libraryObj.length - 1; index >= 0; index--) {
            const element = libraryObj[index];
            html += `
                <tr>
                <td>${libraryObj.length-index}</td>
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

    }


}
// let links = document.getElementsByClassName('page-link');
// console.log(links);