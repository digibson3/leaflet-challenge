
// Create the 'basemap' tile layer that will be the default background of our map.
const basemap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
});

// OPTIONAL: Create the 'street' tile layer as an alternative background.
const street = L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team"
});

// Create the map object with center and zoom options.
const map = L.map("map", {
  center: [37.09, -95.71], // Center of the USA
  zoom: 4,
  layers: [basemap] // Add the basemap tile layer by default
});

// Create layer groups for earthquakes and tectonic plates.
const earthquakes = new L.LayerGroup();
const tectonicPlates = new L.LayerGroup();

// Define baseMaps and overlayMaps for the layer control.
const baseMaps = {
  "Basemap": basemap,
  "Street View": street
};

const overlayMaps = {
  "Earthquakes": earthquakes,
  "Tectonic Plates": tectonicPlates
};

// Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);

// Fetch earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {
  // Define style information for each earthquake based on its properties.
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.geometry.coordinates[2]), // Depth
      color: "#000000",
      radius: getRadius(feature.properties.mag), // Magnitude
      stroke: true,
      weight: 0.5
    };
  }

  // Determine marker color based on the depth of the earthquake.
  function getColor(depth) {
    return depth > 90 ? "#ea2c2c" :
           depth > 70 ? "#ea822c" :
           depth > 50 ? "#ee9c00" :
           depth > 30 ? "#eecc00" :
           depth > 10 ? "#d4ee00" :
                        "#98ee00";
  }

  // Determine marker radius based on the earthquake's magnitude.
  function getRadius(magnitude) {
    return magnitude === 0 ? 1 : magnitude * 4;
  }

  // Add GeoJSON data to the map using circle markers.
  L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: styleInfo,
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        `<h3>Magnitude: ${feature.properties.mag}</h3>
         <p>Location: ${feature.properties.place}</p>
         <p>Depth: ${feature.geometry.coordinates[2]} km</p>`
      );
    }
  }).addTo(earthquakes);

  // Add the earthquake layer to the map.
  earthquakes.addTo(map);
});

// Add a legend to the map.
let legend = L.control({ position: "bottomright" });

legend.onAdd = function () {
  let div = L.DomUtil.create("div", "info legend");
  let depths = [-10, 10, 30, 50, 70, 90];
  let colors = [
    "#98ee00",
    "#d4ee00",
    "#eecc00",
    "#ee9c00",
    "#ea822c",
    "#ea2c2c"
  ];

  // Loop through intervals and generate legend labels.
  for (let i = 0; i < depths.length; i++) {
    div.innerHTML +=
      `<i style="background: ${colors[i]}"></i> 
       ${depths[i]}${depths[i + 1] ? "&ndash;" + depths[i + 1] + "<br>" : "+"}`;
  }

  return div;
};

// Add the legend to the map.
legend.addTo(map);

// Fetch tectonic plate GeoJSON data.
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (plate_data) {
  L.geoJson(plate_data, {
    color: "orange",
    weight: 2
  }).addTo(tectonicPlates);

  // Add the tectonic plate layer to the map.
  tectonicPlates.addTo(map);
});


