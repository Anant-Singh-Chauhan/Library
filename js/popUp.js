// importing / exporting not implemented

export function ShowOne(event) {
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


export function ClosePopUp() {
    document.getElementById('popup_bookname').firstElementChild.innerText = "";
    document.getElementById('popup_author').firstElementChild.innerText = "";
    document.getElementById('popup_genre').firstElementChild.innerText = "";
    document.getElementById('popup_quantity').firstElementChild.innerText = "";
    document.getElementById('popup_publication').firstElementChild.innerText = "";
    document.getElementById('popup_source').firstElementChild.innerText = "";

    document.getElementById('overlay').classList.remove('active');
   document.getElementById('popup').classList.remove('active');

}