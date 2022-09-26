google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Genre', 'Book Count'],
    ['Fiction',     countBooks('fiction')],
    ['Non-Fiction',      countBooks('non-fiction')],
    ['Course',  countBooks('course')],
    ['Technology', countBooks('technology')],
   
  ]);

  var options = {
    title: 'Book Inventory',
    pieHole: 0.4,
    chartArea: {left: 1, top: 30, width: '100%', height: '80%'},
    legend: {position: 'right', alignment: 'center'}
  };

  var chart = new google.visualization.PieChart(document.getElementById('pieChart'));
  chart.draw(data, options);
}

function countBooks(genre) {
  let libraryObj=[];
  if(localStorage.getItem('library')!=null){

      libraryObj = JSON.parse(localStorage.getItem('library'));
  }
        let count = 0;
        Array.from(libraryObj).forEach((element)=>{
            if(String(element.genre).toLowerCase()==genre){
               count+= parseInt(element.quantity)
            }
        });

        return count;
}


