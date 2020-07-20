import styled from "styled-components";

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;

  .mapboxgl-ctrl-geocoder{
    float: none;
    width: calc(100% - 40px);
    margin: 20px;
    height: 50px;
    line-height: 50px;
    max-width: calc(100% - 40px);

    input {
      font-size: 16px;
    }
  }
  .mapboxgl-ctrl-top-left{
    position: relative;
  }
  .mapboxgl-ctrl-geocoder--icon-search{
    display: none;
  }
`;

const GeocoderContainer = styled.div`
  margin: 30px;
  text-align: center;

  .mapboxgl-ctrl-geocoder{
    width: 100%;
    max-width: 100%;
  }
`;

export {
    MapContainer,
    GeocoderContainer
}