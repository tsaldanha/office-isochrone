import geojson from './geojson';

const isoLayer = {
  id: "isoLayerA",
  type: "fill",
  source: "isoA",
  layout: {},
  paint: {
    'fill-color': "green",
    'fill-opacity': 0.2,
  },
};

const workers = {
  type: "geojson",
  data: geojson,
  cluster: true,
  clusterMaxZoom: 14, // Max zoom to cluster points on
  clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
};

const clusters = {
  id: "clusters",
  type: "circle",
  source: "workers",
  filter: ["has", "point_count"],
  paint: {
    'circle-opacity': 0.5,
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#2b6eff",5,
      "#0000ff",20,
      "#ff0000",50,
      "#ff0000"
    ],
    "circle-radius": [
      "step",
      ["get", "point_count"],
      15, 5,
      20, 10,
      25, 20,
      30, 50, 
      40,100,
      50
    ]
  }
};

const clusterCount = {
  id: "cluster-count",
  type: "symbol",
  source: "workers",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 12,
    },
  paint: {
    "text-color": "#ffffff",
  }
};

const unclustered = {
  id: "unclustered-point",
  type: "circle",
  source: "workers",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": "#0000ff",
    "circle-radius": 4,
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff"
  }
};

export {
  isoLayer,
  workers,
  clusters,
  clusterCount,
  unclustered
}