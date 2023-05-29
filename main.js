let myKey = config.APIkey;

function filterWeather(){
    const input = document.getElementById("myInput");
    const filter = input.value.toLowerCase();
    const table = document.getElementById("myTable");
    const tr = table.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++){
        let td = tr[i].getElementsByTagName("td")[2];
        if (td) {
            txtValue = td.innerText;
            if (txtValue.toLowerCase().indexOf(filter) > -1){
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function addTheaterTableRow(){
    fetch('theaters.json')
    .then(response => response.json())
    .then(data => {
        theaterData = data;
        theaterData.forEach(element => {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${element.City}&units=imperial&appid=${myKey}`)
            .then(response => response.json())
            .then(weather => {  
            let table = document.getElementById('myTable');
            let row = table.insertRow(-1);
            let c1 = row.insertCell(0);
            let c2 = row.insertCell(1);
            let c3 = row.insertCell(2);
            let c4 = row.insertCell(3);
            c1.innerText = `${element.Theater}`;
            c2.innerText = `${element.City}, ${element.State}`;
            c3.innerText = `${weather.weather[0].description}`;
            c4.innerText = `${Math.floor(weather.main.temp)}°F`;
        })
        })
    })
    .catch(error => {
        document.getElementById('theaterInfo').innerHTML = "Error"
    })
}

addTheaterTableRow();
