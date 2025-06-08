# Earthquake & Tectonic Plate Map Visualization

This interactive web application visualizes real-time earthquake data and global tectonic plate boundaries using Leaflet.js and D3.js. It dynamically maps earthquake locations with magnitude and depth-based styling, and includes overlays for tectonic plate boundaries.

## Features

- Live Earthquake Data from the USGS (updated weekly)
- Circle Markers sized by magnitude and colored by depth
- Tectonic Plate Overlays from the PB2002 dataset
- Layer Controls to toggle basemaps and overlays
- Legend indicating earthquake depth ranges and color codes
- Interactive Popups with magnitude, depth, and location details

## File Structure

├── index.html # Main HTML file
├── static/
│ ├── css/
│ │ └── style.css # Custom styling
│ └── js/
│ └── logic.js # Main JavaScript logic for mapping

markdown
Copy
Edit

## How It Works

- Leaflet renders the interactive map with multiple tile layers.
- D3.js fetches and parses:
  - Weekly USGS earthquake GeoJSON data.
  - Tectonic plate boundary GeoJSON data from GitHub.
- Earthquakes are visualized with:
  - Color representing depth
  - Size representing magnitude
- A legend and popup provide contextual information for users.

## Dependencies

- [Leaflet.js](https://leafletjs.com/)
- [D3.js v7](https://d3js.org/)
- [Bootstrap (optional)](https://getbootstrap.com/) — for easy layout enhancement

CDNs are included in `index.html`, so no installation is necessary.

## Usage

1. Clone or download the repo.
2. Open `index.html` in your browser.
3. Explore the interactive map and toggle between base layers and overlays.

## Customization Ideas

- Add time-based filtering for earthquakes.
- Integrate more detailed tectonic plate data or historical records.
- Improve mobile responsiveness and styling.

## Data Sources

- Earthquake Data: [USGS Earthquake Hazards Program](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
- Tectonic Plates: [PB2002 Boundaries](https://github.com/fraxen/tectonicplates)