 function FillHomeData() {
    let booksDefaultedCount = 0;

    let libraryObj=[];
    if(localStorage.getItem('library')!=null){

        libraryObj = JSON.parse(localStorage.getItem('library'));
    }

    // let libraryObj = JSON.parse(localStorage.getItem('library'));
    let booksOwnedCount = 0;

    let membersObj=[];
    if(localStorage.getItem('Members')!=null){

         membersObj = JSON.parse(localStorage.getItem('Members'));
    }


    Array.from(libraryObj).forEach((element) => {
        // console.log(typeof parseInt(element.quantity) )
        booksOwnedCount += parseInt(element.quantity)
        //    console.log(count)
    });
    try {
        document.getElementById("totalBooksOwned").innerText = booksOwnedCount;
        document.getElementById("booksLend").innerText = localStorage.getItem('IssuedBookCount');
        document.getElementById("activeMembers").innerText = membersObj.length;
        
    } catch (error) {
        console.log(error);
    }
   
    let defaultersObj=[];
    if(localStorage.getItem('Defaulters')!=null){

         defaultersObj = JSON.parse(localStorage.getItem('Defaulters'));
         console.log(defaultersObj)
    }

    Array.from(defaultersObj).forEach(elemMem => {
        Array.from(elemMem.returned).forEach(elemRet => {
            if (elemRet != true) {
                booksDefaultedCount++;
            }
        })
    })
    console.log(booksDefaultedCount);
    try {
        document.getElementById("booksOverdue").innerText = booksDefaultedCount;
        
    } catch (error) {
        console.log(error);
        
    }




}
