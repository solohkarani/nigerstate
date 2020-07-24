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
    contextmenuWidth: 200,
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

//admin wms
/*var administrativeBoundary = L.tileLayer.betterWms(url, {
    layers: 'nigerstate:the_8_lgas',
    transparent: true,
    format: 'image/png',
});*/

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
});

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

//set the color style
function lgaStyle(feature) {
    return {
        fillColor: "#85C1E9",
        fillOpacity: 0.1,
        weight: 1,
        color: '#283747',
    };
};

//zoom to feature on click
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
//highlight feature on mouse over
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#0000FF',
        dashArray: '',
        fillOpacity: 0.2
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}
//reset highlight
var lga_boundary;

function resetHighlight(e) {
    lga_boundary.resetStyle(e.target);
}
//admin boundary geojson
lga_boundary = new L.geoJson(lga_boundary, {
    style: lgaStyle,
    onEachFeature: function (feature, layer) {
        var content = "<table class='table table-bordered table-condensed'>"+"<caption style='color:Blue;font-size:1.5em; font-weight:800'; >"+ feature.properties.adm2_en +" LGA</caption>" + "<tr><th>LGA Name</th><td>" + feature.properties.adm2_en + "</td></tr>" + "<tr><th>Total Area</th><td>" + feature.properties.area + "</td></tr>" + "<tr><th>State</th><td>Niger State</td></tr>" + "<tr><th>Website</th><td><a class='url-break' href='" + feature.properties.area + "' target='_blank'>" + feature.properties.fid + "</a></td></tr>" + "<table>";

        layer.on({
            click: zoomToFeature,
            mouseover: highlightFeature,
            mouseout: resetHighlight
        }).bindPopup(content); /*.bindPopup('Clicked feature layer ID: ' + feature.id);*/


    }
});

lga_boundary.addTo(map);

$.ajax({
    dataType: "json",
    url: "http://localhost:8080/geoserver/nigerstate/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=nigerstate%3Athe_8_lgas&maxFeatures=50&outputFormat=application%2Fjson",
    success: function (data) {
        $(data.features).each(function (key, data) {
            lga_boundary.addData(data);
        });
    }
}).error(function () {});

//urban center poi

var urban_centers = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "img/urban.png",
        iconSize: [20, 20],
        /*iconAnchor: [12, 28],*/
        popupAnchor: [0, -25]
      }),
      title: feature.properties.name,
      riseOnHover: true
    });
  },
    onEachFeature: function (feature, layer) {
        var content = "<table class='table table-bordered table-condensed'>"+"<caption style='color:Blue;font-size:1.5em; font-weight:800'; >"+ feature.properties.name +" Urban</caption>" + "<tr><th>Center Name</th><td>" + feature.properties.name + "</td></tr>" + "<tr><th>Functional Class</th><td>"+"Class Unknown"+ "</td></tr>" + "<tr><th>State</th><td>Niger State</td></tr>" + "<tr><th>Website</th><td><a class='url-break' href='" + feature.properties.area + "' target='_blank'>" + feature.properties.fid + "</a></td></tr>" + "<table>";

        layer.on({
        }).bindPopup(content); 

    }
});

urban_centers.addTo(map);

$.ajax({
    dataType: "json",
    url: "http://localhost:8080/geoserver/nigerstate/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=nigerstate%3Aurban_centers&maxFeatures=50&outputFormat=application%2Fjson",
    success: function (data) {
        $(data.features).each(function (key, data) {
            urban_centers.addData(data);
        });
    }
}).error(function () {});

/*
var markerClusters = new L.MarkerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  disableClusteringAtZoom: 16
});
markerClusters.addLayer(urban_centers);

map.addLayer(markerClusters);
*/

//layer control
var admin = {
    "LGA Boundary": lga_boundary,
};
var urban = {
    "A) Main Urban Center": urban_centers,
    "B) Urban Extent 2020": urbanization_2020,
    "C) Urban Extent 2010": urbanization_2010,
    "D) Urban Extent 2000": urbanization_2000,
    "E) Urban Extent 1990": urbanization_1990,
    "F) Urban Extent 1973": urbanization_1973,
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