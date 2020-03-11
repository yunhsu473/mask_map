// initialize the map on the "map" div with a given center and zoom
var map = L.map('map', {
    center: [25.033408, 121.564099],
    zoom: 16
});



L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



var markers = new L.MarkerClusterGroup().addTo(map);

let req = new XMLHttpRequest();
req.open("get", "https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json");
req.addEventListener("load", function(){
    // console.log(this.responseText);
    let data = JSON.parse(this.responseText).features;
    // console.log(data);
    showSite(data);
});
req.send();


function showSite(data){
    for (let i = 0; i < data.length; i++) {
        markers.addLayer(L.marker([data[i].geometry.coordinates[1], data[i].geometry.coordinates[0]])
        .bindPopup(`<h2>${data[i].properties.name}</h2>
                <p> 大人口罩：${data[i].properties.mask_adult} 個</p>
                <p>小孩口罩：${data[i].properties.mask_child} 個 </p>
                <p>電話：${data[i].properties.phone}</p>
                <p>地址：${data[i].properties.address}</p>
                <hr>
                <p>更新時間：${data[i].properties.updated}</p>
                `));
        }
    map.addLayer(markers);

    // L.marker([25.033408, 121.564099]).addTo(map)
    //     .bindPopup('<h1>台北101</h1>')
    //     // .openPopup();
    //     console.log(data);
}
