function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    var table = document.getElementById('table');
    table.classList.toggle("dark-table");
    var th = document.querySelectorAll('#th');
    th.forEach(element => {
        element.classList.toggle('th-dark')
    })
    var tr = document.querySelectorAll('#tr');
    tr.forEach(element => {
        element.classList.toggle('tr-dark')
    })
    var darkTradeSubheading = document.getElementById('trade-subheading');
    darkTradeSubheading.classList.toggle('dark-trade-subheading');
    var tradeTopHeading = document.getElementById('trade-top-heading');
    tradeTopHeading.classList.toggle('dark-trade-top-heading');
    var tradeHeading = document.getElementById('trade-heading');
    tradeHeading.classList.toggle('dark-trade-heading')
    var numberHeading = document.querySelectorAll('#number-heading');
    numberHeading.forEach(element => {
        element.classList.toggle('dark-number-heading')
    })
    var dropBtn = document.querySelectorAll('#dropbtn');
    dropBtn.forEach(element => {
        element.classList.toggle('dark-dropbtn')
    })

}

const loadData = async () => {
    const url = `https://hold-info-server.vercel.app/tickersData`
    const res = await fetch(url)
    const tickersData = await res.json()
    displayData(tickersData)
}

const displayData = (tickersData) => {
    console.log(tickersData)
    const tableBody = document.getElementById('tbody');
    tickersData.forEach((data, index) => {
        let rowHtml;
        if (index % 2 === 0) {
            rowHtml = `
    <tr id='tr'>
      <td>${index + 1}</td>
      <td>${data.name}</td>
      <td>₹ ${data.last}</td>
      <td>₹ ${data.buy} / ₹ ${data.sell}</td>
      <td>▼ ${data.volume}</td>
      <td>${data.base_unit}</td>
    </tr>
  `;
        } else {
            rowHtml = `
    <tr id='tr'>
      <td>${index + 1}</td>
      <td>${data.name}</td>
      <td>₹ ${data.last}</td>
      <td>₹ ${data.buy} / ₹ ${data.sell}</td>
      <td>▲ ${data.volume}</td>
      <td>${data.base_unit}</td>
    </tr>
  `;
        }
        tableBody.innerHTML += rowHtml;

    })
}


loadData();