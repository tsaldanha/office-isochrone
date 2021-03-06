import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


import RequestIsochrone from "utils";
import { MapContainer, Container } from "./styled";
import {
  isoLayer,
  students,
  clusters,
  unclustered,
  clusterCount
} from "./configs";

import Card from "components/Card";
import Filters from "components/Content/Filters";


const Map = () => {
  const [config, setConfig] = useState({
    lat: -23.5424207,
    lng: -46.492737,
    zoom: 13,
    profile: 'walking',
    time: 10,
    gender: "all",
    hours: "all"
  });

  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const accessToken = 'pk.eyJ1IjoidHNhbGRhbmhhIiwiYSI6ImNrMWFyMGN0eTBjMzEzbW5ydHFxdnVrZDgifQ.irkhyUe1G4D53oNmEzXoZg';

  const marker = new mapboxgl.Marker();
  const emptyData = {
    features : [],
    type: "FeatureCollection",
  };

  const loadIsochrones = (lng, lat, map, profile, time) => {
    map.getSource("isoA").setData(emptyData); 
    RequestIsochrone
    .get(`${profile}/${lng},${lat}?contours_minutes=${time}&polygons=true&access_token=${accessToken}`)
    .then(result =>{
      if (map) {
        map.getSource("isoA").setData(result.data);
      }
    });
  }

  useEffect(()=>{
    mapboxgl.accessToken = accessToken;
    const initializeMap = ({setMap, mapContainer}) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/tsaldanha/ckd6jgq7q00n81iphgmaesi38',
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

        loadIsochrones(config.lng, config.lat, map, config.profile, config.time);

        map.addSource("students", students);
        map.addLayer(clusters);
        map.addLayer(clusterCount);
        map.addLayer(unclustered);

        map.on('click', 'clusters', function (e) {
          var features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
          var clusterId = features[0].properties.cluster_id;
          map.getSource('students').getClusterExpansionZoom(clusterId, function (err, zoom) {
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
      
      
    }
      if(!map) initializeMap({setMap, mapContainer});
  },[map, config]);

  return (
    <Container> 
      <Card>
        <h1> Qual o alcance em mobilidade ativa? </h1>
        <Filters action={loadIsochrones} config={config} map={map} dataset={students} />
      
      </Card>
      <MapContainer ref={el => (mapContainer.current = el)} className="absolute top right left bottom">
      
      </MapContainer>
    </Container>
    

  );

}

export default Map;