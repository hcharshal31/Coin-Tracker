let mainData = [];

    async function apiData(){
        try {
            let response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
            mainData = await response.json();
            displayData(mainData);
            console.log(mainData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    apiData();

//Appending the data rows in table.
function displayData(coinsData){

    let tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";
    coinsData.forEach((coin, index)=>{
        
        tableBody.innerHTML += `
            <tr>
                <td id="td1"><img class="coin-img" src=${coin.image}>&nbsp;&nbsp;&nbsp;${coin.name}</td>
                <td id="td2">${coin.symbol.toUpperCase()}</td>
                <td id="td3">${coin.current_price}</td>
                <td id="td4">Mkt Cap: ${coin.market_cap}</td>
                <td class="td5">${coin.price_change_24h.toFixed(2)}</td>
            </tr>
        `;
        if(coin.price_change_24h < 0){
            document.getElementsByClassName("td5")[index].style.color = "red";
        } else{
            document.getElementsByClassName("td5")[index].style.color = "green";
        }
    });

}


//Sorting the table from lowest market cap to heighest market cap.
document.getElementById("mrkt-cap").addEventListener("click", (ev)=>{
    let sortedMkt = [...mainData].sort((a, b) => a.market_cap - b.market_cap);

    displayData(sortedMkt);
});


//Sorting the table from highest percentage change to lowest percentage change.
document.getElementById("percentage").addEventListener("change", (ev)=>{
    let sortedPer = [...mainData].sort((a, b) => b.price_change_24h - a.price_change_24h);

    displayData(sortedPer);
});


let searchBar = document.getElementById("search");

searchBar.addEventListener("keyup", ()=>{
    let filteredData = mainData.filter((item, index)=>{
        return item.name.toLowerCase().includes(searchBar.value) || item.symbol.toLowerCase().includes(searchBar.value);
    });
    displayData(filteredData);
})

