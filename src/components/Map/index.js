import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'


import RequestIsochrone from "utils";
import { MapContainer, GeocoderContainer } from "./styled";
import {
  isoLayer,
  workers,
  clusters,
  unclustered,
  clusterCount
} from "./configs";

const Map = () => {
  const [config, setConfig] = useState({
    lat: -23.5627717,
    lng: -46.6557555,
    zoom: 12,
    profile: 'walking'
  });

  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const accessToken = 'pk.eyJ1IjoidHNhbGRhbmhhIiwiYSI6ImNrMWFyMGN0eTBjMzEzbW5ydHFxdnVrZDgifQ.irkhyUe1G4D53oNmEzXoZg';

  const marker = new mapboxgl.Marker();
  const emptyData = {
    features : [],
    type: "FeatureCollection",
  };

  const loadIsochrones = (lng, lat, map, profile = config.profile) => {
    map.getSource("isoA").setData(emptyData); 
    RequestIsochrone
    .get(`${profile}/${lng},${lat}?contours_minutes=15,30,60&contours_colors=f00,0f0,00f&polygons=true&access_token=${accessToken}`)
    .then(result =>{
      if (map) {
        console.log(result.data);
        map.getSource("isoA").setData(result.data);
      }
    });
  }

  const changeCenter = (lng,lat, map) => { 
    setConfig(Object.assign(config, {
      lat,
      lng
    }))
    loadIsochrones(lng,lat, map)
  }

  useEffect(()=>{
    mapboxgl.accessToken = accessToken;
    const initializeMap = ({setMap, mapContainer}) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [config.lng, config.lat],
        zoom: config.zoom,
      }); 

      map.on("load", ()=> {
        setMap(map);
        map.resize();

        map.addSource("isoA", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: []
          }
        });

        map.addLayer(isoLayer);

        loadIsochrones(config.lng, config.lat, map);

        map.addSource("workers", workers);
        map.addLayer(clusters);
        map.addLayer(clusterCount);
        map.addLayer(unclustered);
               
        map.on('click', 'clusters', function (e) {
          var features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
          var clusterId = features[0].properties.cluster_id;
          map.getSource('workers').getClusterExpansionZoom(clusterId, function (err, zoom) {
            if (err)
              return;
          
            map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom
            });
          });
        });
          
        map.on('mouseenter', 'clusters', function () {
          map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'clusters', function () {
          map.getCanvas().style.cursor = '';
        });

        marker
          .setLngLat([config.lng,config.lat])
          .addTo(map);
      });
      
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        placeholder: "Onde eu vou?",
        mapboxgl: mapboxgl,
        flyTo: {
          zoom: config.zoom
        },
        marker: {
          color: '#3FB1CE'
        },
      });
      map.addControl(geocoder, "top-left");
      //geocoder.addTo("#geocoder-ctrl")

      geocoder.on('result', (e)=>{
        marker.remove();
        const [lng, lat] = e.result.geometry.coordinates;
        changeCenter(lng,lat, map);
      });
      geocoder.on('clear', (e)=>{
        map.getSource("isoA").setData(emptyData);
      });

    }
      if(!map) initializeMap({setMap, mapContainer});
  },[map, config]);

  return (
    <MapContainer ref={el => (mapContainer.current = el)} className="absolute top right left bottom">
    </MapContainer>

  );

}

export default Map;