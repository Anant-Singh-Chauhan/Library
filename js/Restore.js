function Restore(event){
    // console.log(event.target.files)
    let backupFile = event.target.files[0];
    let fileReader = new FileReader();

    fileReader.onload=function(event){
        let txtContent = event.target.result;
        // console.log(txtContent);
        let backupObj = JSON.parse(txtContent);
        Array.from(backupObj).forEach(elem =>{
            // console.log(elem.elemKey + elem.elemData);
            localStorage.setItem(elem.elemKey,JSON.stringify(elem.elemData))
        })

        alert('Backup Restored!!');
        window.location.reload();

    }
    fileReader.readAsText(backupFile);


}

function ChooseBackup(){
    document.getElementById('backupFile').disabled = false;
}