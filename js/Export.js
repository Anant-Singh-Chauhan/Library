function ExportToExcel() {
    let library = localStorage.getItem('library');
    let available = localStorage.getItem('available');
    let members = localStorage.getItem('Members');
    let defaulters = localStorage.getItem('Defaulters');


    let libraryObj = [];
    if (library != null) {
        libraryObj = JSON.parse(library);
    }

    let availableObj = [];
    if (available != null) {
        availableObj = JSON.parse(available);
    }

    let membersObj = [];
    if (members != null) {
        membersObj = JSON.parse(members);
    }

    let defaultersObj = [];
    if (defaulters != null) {
        defaultersObj = JSON.parse(defaulters);
    }

    let date = new Date();

    // creates a new workbook
    let newWorkBook = XLSX.utils.book_new();
    newWorkBook.Props = {
        Title: "NITJ Library Records",
        Auhtor: "Admin",
        CreatedDate: date
    }

    newWorkBook.SheetNames.push("All Books Owned");
    let workSheet_lib = XLSX.utils.json_to_sheet(libraryObj);
    workSheet_lib["!cols"] = [{
        wch: 30
    }, {
        wch: 30
    }, {
        wch: 30
    }, {
        wch: 30
    }, {
        wch: 30
    }, {
        wch: 30
    }, {
        wch: 30
    }];
    newWorkBook.Sheets["All Books Owned"] = workSheet_lib;

    let workSheet_avl = XLSX.utils.json_to_sheet(availableObj);
    workSheet_avl["!cols"] = [{
        wch: 30
    }, {
        wch: 30
    }, {
        wch: 30
    }, {
        wch: 30
    }, {
        wch: 30
    }, {
        wch: 30
    }, {
        wch: 30
    }];
    XLSX.utils.book_append_sheet(newWorkBook, workSheet_avl, "Available");

    let issueObj = membersObj.map(mapperIssueRec)

    function mapperIssueRec(elem) {
        let strBookList = "";
        let strReturnStatus = "";
        Array.from(elem.bookList).forEach(elemBook => {
            strBookList += " >>  " + elemBook.bookId + ";"
        })
        Array.from(elem.returned).forEach(elemRet => {
            strReturnStatus += " >> " + elemRet + ";"
        })
        return {
            UserName: elem.memberId,
            Date: elem.date,
            BookList: strBookList,
            ReturnStatus: strReturnStatus
        }
    }

    let mappedDefaulterObj = defaultersObj.map(mapperDefaulters)

    function mapperDefaulters(elem) {
        let strBookList = "";
        let strReturnStatus = "";
        Array.from(elem.bookList).forEach(elemBook => {
            strBookList += " >>  " + elemBook.bookId + ";"
        })
        Array.from(elem.returned).forEach(elemRet => {
            if (elemRet != true) {
                strReturnStatus += " >> " + elemRet + ";"

            } else {
                strReturnStatus += " >> No Fine ;"
            }

        })
        return {
            UserName: elem.memberId,
            Date: elem.date,
            BookList: strBookList,
            FineStatus: strReturnStatus
        }
    }

    let workSheet_issue = XLSX.utils.json_to_sheet(issueObj);
    workSheet_issue["!cols"] = [{
        wch: 30
    }, {
        wch: 30
    }, {
        wch: 30
    }, {
        wch: 30
    }, {
        wch: 30
    }, {
        wch: 30
    }, {
        wch: 30
    }];
    XLSX.utils.book_append_sheet(newWorkBook, workSheet_issue, "Issue Records");

    let workSheet_defaulters = XLSX.utils.json_to_sheet(mappedDefaulterObj);
    workSheet_issue["!cols"] = [{
        wch: 30
    }, {
        wch: 30
    }, {
        wch: 30
    }, {
        wch: 30
    }, {
        wch: 30
    }, {
        wch: 30
    }, {
        wch: 30
    }];
    XLSX.utils.book_append_sheet(newWorkBook, workSheet_defaulters, "Defaulters");

    XLSX.writeFile(newWorkBook, `Library ${date}.xlsx`);
}