//context menu functions 
function showCoordinates(e) {
    alert(e.latlng);
}

function centerMap(e) {
    map.panTo(e.latlng);
}

function zoomIn(e) {
    map.zoomIn();
}

function zoomOut(e) {
    map.zoomOut();
}
//map
var map = L.map('map', {
    center: [9.6, 6.5],
    zoom: 10,
    //fullscreen
    fullscreenControl: {
        pseudoFullscreen: false
    },
    contextmenu: true,
    contextmenuWidth: 140,
    contextmenuItems: [{
        text: 'Show coordinates',
        callback: showCoordinates
    }, {
        text: 'Center map here',
        callback: centerMap
    }, '-', {
        text: 'Zoom in',
        icon: 'lib/zoom-in.png',
        callback: zoomIn
    }, {
        text: 'Zoom out',
        icon: 'lib/zoom-out.png',
        callback: zoomOut
    }]
});

//basemaps start here
var basemaps = [
    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        label: "Light"
    }),
    L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 19,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        label: "Satellite"
    }),
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/outdoors-v11',
        tileSize: 512,
        zoomOffset: -1,
        label: "Outdoor"
    })
];
map.addControl(
    L.control.basemaps({
        basemaps: basemaps,
        tileX: 0,
        tileY: 0,
        tileZ: 1
    })
);
//geoserver WMS layers start here
var url = 'http://localhost:8080/geoserver/nigerstate/wms?';
var layer1 = L.tileLayer.betterWms(url, {
    layers: 'nigerstate:road_hierarchy',
    transparent: true,
    format: 'image/png',
    attribution: '&copy; <a href="http://cartodb.com/attributions">UNHabitat</a>',
}).addTo(map);

var layer2 =    L.tileLayer.betterWms(url, {
    layers: 'nigerstate:the_8_lgas',
    transparent: true,
    format: 'image/png',
}).addTo(map);

var geoserverLayers = {
    "Road Network": layer1,
    "LGA Boundary": layer2
};

//mouse coordinates
L.control.mouseCoordinate({
    gpsLong: true,
    utm: true,
    utmref: false,
    gps: true
}).addTo(map);
L.control.layers(null, geoserverLayers, {
    position: 'topright',
    collapsed: false
}).addTo(map);
//logo

L.Control.Watermark = L.Control.extend({
    onAdd: function(map) {
        var img = L.DomUtil.create('img');

        img.src = 'img/unhabitat.png';
        img.style.width = '250px';

        return img;
    },

    onRemove: function(map) {
        
    }
});

L.control.watermark = function(opts) {
    return new L.Control.Watermark(opts);
}

	L.control.watermark({ position: 'bottomright' }).addTo(map);
