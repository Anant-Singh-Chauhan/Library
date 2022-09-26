function BackUp() {
    let localKeys=Object.keys(localStorage);
    // console.log(localKeys);

    let backup = [];

    for (let index = 0; index < localKeys.length; index++) {
        const elemKey = localKeys[index];

        let elemData =[];
        if(localStorage.getItem(elemKey)!="undefined"){
            elemData = JSON.parse(localStorage.getItem(elemKey));
        }
       
    // console.log(elemData);
        

        let storageObj={
            elemKey,
            elemData
        }
        backup.push(storageObj);
        
    }

    // console.log(backup);
    // console.log(typeof backup);

    // console.log(JSON.stringify(backup));
    // console.log(typeof JSON.stringify(backup));

    try {
        
    let blobBackUp = new Blob([JSON.stringify(backup)],{type: 'application/json'})
    // console.log(blobBackUp)

    let objurl = URL.createObjectURL(blobBackUp);
    
    let link= document.createElement('a');
    link.href=objurl;
    link.download=`backup ${new Date()}.json`;
    link.click();
    } catch (error) {
        console.log(error)   
    }

}   