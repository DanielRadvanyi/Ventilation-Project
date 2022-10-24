// nav menu 
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
}))





// Fetch Block for fetching the data from the sensors
function updateChart() {
    async function fetchData() {
        let recievedData = await fetch('http://localhost:8000/data')
        let data_json = await recievedData.json()
        // console.log(data_json)
        // pressure, co2, speed & temperature
        let pressure = []
        let co2 = []
        let speed = []
        let temperature = []
        let labels = []

        for (let data of data_json) {
            pressure.push(data['pressure'])
            co2.push(data['co2'])
            speed.push(data['speed'])
            temperature.push(data['temperature'])
            labels.push(data['date'])
        }
        // console.log([labels, pressure, co2, speed, temperature])
        datapoints = [labels, pressure, co2, speed, temperature]
        return datapoints;
    };

    fetchData().then(datapoints => {
        console.log(datapoints)
        myChart.config.data.labels = datapoints[0];
        myChart.config.data.datasets[0].data = datapoints[1];
        myChart.config.data.datasets[1].data = datapoints[2];
        myChart.config.data.datasets[2].data = datapoints[3];
        myChart.config.data.datasets[3].data = datapoints[4];
        myChart.update();
    })

}




//set up
const data = {
    labels: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    datasets: [
        {
            label: 'Pressure',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            fill: false,
            borderColor: '#7FB77E',
            backgroundColor: '#7FB77E',
            borderWidth: 1
        },
        {
            label: 'Co2',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            fill: false,
            borderColor: '#E5EBB2',
            backgroundColor: '#E5EBB2',
            borderWidth: 1
        },
        {
            label: 'Speed',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            fill: false,
            borderColor: '#F8C4B4',
            backgroundColor: '#F8C4B4',
            borderWidth: 1
        },
        {
            label: 'Temperature',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            fill: false,
            borderColor: '#FF8787',
            backgroundColor: '#FF8787',
            borderWidth: 1
        }
    ],
}

// config
const config = {
    type: 'line',
    data,
    options: {}
}

// const data = await fetchData();
const myChart = new Chart(
    document.getElementById('myChart'),
    config
);