const myKey = config.APIkey;

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

function sortByGross(){
    const table = document.getElementById("myTable")
    const rows = table.getElementsByTagName("tr");
    let switchIt = true;
    let shouldSwitch = true;
    let i = 1;
    let x = '';
    let y = '';

    while(switchIt){
        switchIt = false;
        for (i = 1; i < (rows.length - 1); i++){
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[4];
            y = rows[i + 1].getElementsByTagName("td")[4];

          if (Number(x.innerHTML) < Number(y.innerHTML)){
            shouldSwitch = true;
            break;
          }
        }
        if (shouldSwitch){
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switchIt = true;
        }
    }
}

function addTheaterData(){
    fetch('https://api.jsonbin.io/v3/b/64815a178e4aa6225eaaec23')
      .then(response => response.json())
      .then(data => {
        let weatherIds = '';
        for (let i = 0; i < data.record.length; i++){
          weatherIds += data.record[i].id;
          if (i < data.record.length - 1){
            weatherIds += ','
            }
        }
        fetch(`http://api.openweathermap.org/data/2.5/group?id=${weatherIds}&units=imperial&appid=${myKey}`)
            .then(response => response.json())
            .then(element => { console.log(element)
                let table = document.getElementById('myTable');
                for (let i = 0; i < data.record.length; i++){
                    console.log(element)
                    let row = table.insertRow(-1);
                    let c1 = row.insertCell(0);
                    let c2 = row.insertCell(1);
                    let c3 = row.insertCell(2);
                    let c4 = row.insertCell(3);
                    let c5 = row.insertCell(4)
                    c1.innerText = `${data.record[i].Theater}`;
                    c2.innerText = `${data.record[i].City}, ${data.record[i].State}`;
                    c3.innerText = `${element.list[i].weather[0].description}`;
                    c4.innerText = `${Math.floor(element.list[i].main.temp)}°F`;
                    c5.innerText = `${Number(data.record[i].currentGross)}`
                } 
            })
            .catch(error => alert('Data Error - Check Theater IDs'))
        })
        .catch(error => {
            document.getElementById('myTable').innerText = "Data Error"
        })
}

addTheaterData();




