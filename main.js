function addTheaterTableRow(){
    fetch('theaters.json')
    .then(response => response.json())
    .then(data => {
        theaterData = data;
        theaterData.forEach(element => {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${element.city}&units=imperial&appid=3ed4321b20cef4195e1946e377b41033`)
            .then(response => response.json())
            .then(weather => {  
            let table = document.getElementById('myTable');
            let row = table.insertRow(-1);
            let c1 = row.insertCell(0);
            let c2 = row.insertCell(1);
            let c3 = row.insertCell(2);
            let c4 = row.insertCell(3);
            c1.innerText = `${element.theater}`;
            c2.innerText = `${element.city}, ${element.state}`;
            c3.innerText = `${weather.weather[0].description}`;
            c4.innerText = `${weather.main.temp}°F`;
        })
        })
    })
    .catch(error => {
        document.getElementById('theaterInfo').innerHTML = "Error"
    })
}

addTheaterTableRow();

// function displayTheaters(){
//     fetch('theaters.json')
//     .then(response => response.json())
//     .then(data => {
//         theaterData = data;
//         theaterData.forEach(element => {
//             fetch(`https://api.openweathermap.org/data/2.5/weather?q=${element.city}&units=imperial&appid=3ed4321b20cef4195e1946e377b41033`)
//             .then(response => response.json())
//             .then(weather => {  
//             const node = document.createElement('li')
//             const textnode = document.createTextNode(`${element.theater} in ${element.city}, ${element.state} - ${weather.weather[0].description} at ${weather.main.temp}°F`)
//             node.appendChild(textnode)
//             document.getElementById('theaterInfo').appendChild(node)
//         })
//         })
//     })
//     .catch(error => {
//         document.getElementById('theaterInfo').innerHTML = "Error"
//     })
    
// }

// displayTheaters()