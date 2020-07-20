import axios from 'axios';

const RequestIsochrone = axios.create({
  baseURL: 'https://api.mapbox.com/isochrone/v1/mapbox'
});

export default RequestIsochrone;