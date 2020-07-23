<<<<<<< HEAD
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

//admin
var administrativeBoundary = L.tileLayer.betterWms(url, {
    layers: 'nigerstate:the_8_lgas',
    transparent: true,
    format: 'image/png',
});

//urbanization
var urbanization_2020 = L.tileLayer.betterWms(url, {
    layers: 'nigerstate:urban_extents_2020',
    transparent: true,
    format: 'image/png',
});
var urbanization_2010 = L.tileLayer.betterWms(url, {
    layers: 'nigerstate:urban_extents_2010',
    transparent: true,
    format: 'image/png',
});
var urbanization_2000 = L.tileLayer.betterWms(url, {
    layers: 'nigerstate:urban_extents_2000',
    transparent: true,
    format: 'image/png',
});
var urbanization_1990 = L.tileLayer.betterWms(url, {
    layers: 'nigerstate:urban_extents_1990',
    transparent: true,
    format: 'image/png',
});
var urbanization_1973 = L.tileLayer.betterWms(url, {
    layers: 'nigerstate:urban_extents_1973',
    transparent: true,
    format: 'image/png',
});

//transport
var transportInfrastructure = L.tileLayer.betterWms(url, {
    layers: 'nigerstate:road_hierarchy',
    transparent: true,
    format: 'image/png',
    attribution: '&copy; <a href="http://cartodb.com/attributions">UNHabitat</a>',
}).addTo(map);

//layer control
var admin = {
    "LGA Boundary": administrativeBoundary,
};
var urban = {
    "Urban Extent 2020": urbanization_2020,
    "Urban Extent 2010": urbanization_2010,
    "Urban Extent 2000": urbanization_2000,
    "Urban Extent 1990": urbanization_1990,
    "Urban Extent 1973": urbanization_1973,
};
var transport = {
    "Road Network": transportInfrastructure,
};

//send layer control to sidebar
var layerControlTransport = L.control.layers(null, transport, {
    position: 'topright',
    collapsed: false
}).addTo(map);

var layerObject = layerControlTransport.getContainer();
// Get the desired parent node.
var a = document.getElementById('transport');

// Finally append that node to the new parent, recursively searching out and re-parenting nodes.
function setParent(el, newParent) {
    newParent.appendChild(el);
}
setParent(layerObject, a);

//send layer control to sidebar
var layerControlAdmin = L.control.layers(null, admin, {
    position: 'topright',
    collapsed: false
}).addTo(map);

var layerObject_2 = layerControlAdmin.getContainer();
var b = document.getElementById('admin');
function setParent(el, newParent) {
    newParent.appendChild(el);
}
setParent(layerObject_2, b);

/*****************/
var layerControlUrban = L.control.layers(null, urban, {
    position: 'topright',
    collapsed: false
}).addTo(map);

var layerObject_3 = layerControlUrban.getContainer();
var c = document.getElementById('urban');
function setParent(el, newParent) {
    newParent.appendChild(el);
}
setParent(layerObject_3, c);

//mouse coordinates
L.control.mouseCoordinate({
    gpsLong: true,
    utm: true,
    utmref: false,
    gps: true
}).addTo(map);


//habitatlogo
L.Control.Watermark = L.Control.extend({
    onAdd: function (map) {
        var img = L.DomUtil.create('img');

        img.src = 'img/unhabitat.png';
        img.style.width = '250px';

        return img;
    },

    onRemove: function (map) {

    }
});

L.control.watermark = function (opts) {
    return new L.Control.Watermark(opts);
}

L.control.watermark({
    position: 'bottomright'
}).addTo(map);
=======
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
>>>>>>> 0074b0c96b7528469a425252beaa76da096044a7
