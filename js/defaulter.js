function DisplayDefaulters() {
    const msPerDay = 1000 * 60 * 60 * 24;
    let totalFine = 0;
    let members = localStorage.getItem('Members');
    let memberObj = [];

    if (members != null) {
        memberObj = JSON.parse(members);
    }

    let todayDate = new Date();

    for (let index = 0; index < memberObj.length; index++) {

        const elemMem = memberObj[index];
        // console.log(elemMem)
        const issueDate = new Date(elemMem.date);
        let dayDiff = Math.floor((todayDate.getTime() - issueDate.getTime()) / msPerDay);

        if (dayDiff > 7) {
            // console.log("7 days exceeded, extra days: " + (dayDiff - 7))
            let falseCount = 0;
            let fine = 0;
            let flagFine = false;
            for (let index = 0; index < elemMem.returned.length; index++) {
                let elemRet = elemMem.returned[index];

                if (elemRet == false) {
                    falseCount++;
                    elemMem.returned[index] = 10 * (dayDiff - 7);
                    flagFine = true;
                }

            }
            if (flagFine == false) {
                memberObj.splice(index, 1);
                index--;
            } else {
                fine = falseCount * 10 * (dayDiff - 7);
                totalFine += fine;
                // console.log(fine);
                // console.log(elemMem.returned);
            }

        } else {
            memberObj.splice(index, 1);
            index--;

        }

    }

    if (memberObj.length == 0) {
        document.getElementById('tableBodyDefaulters').innerHTML=`No Dafaulters found!`;
    } else {
        localStorage.setItem('Defaulters', JSON.stringify(memberObj));

        let html = "";


        for (let index = 0; index < memberObj.length; index++) {
            const element = memberObj[index];
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
                dataFill_Dafaulterbooks(element); +
            `
                        </ul>
                    </td>
                    </tr>
                    `;

        }

        let tableBody = document.getElementById('tableBodyDefaulters');
        tableBody.innerHTML = html;

        document.getElementById('totalDefaulters').innerText = memberObj.length;
        document.getElementById('totalFine').innerText = totalFine;

    }

}

function dataFill_Dafaulterbooks(element) {
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
              
                <ul>
                    <li>Book ID: ${book.bookId}</li>
                    <li>Author: ${author}</li>
                    <li>Genre: ${genre}</li>
                    <li>Publication: ${publication}</li>
                    <li>Source: ${book.source}</li>
                </ul>` +
            FineStatus(returnStatus)

            +
            ` </li>
        `;
        count++;

    });
    return insideHtml;
}

function FineStatus(status) {
    if (status == true) {
        return `<h6 >Fine Status: <span class="returnStatusSuccess">NO FINE</span></h6>`
    } else {
        return `<h6 >Fine Status: <span class="returnStatusFail">${status}</span></h6>`
    }
}