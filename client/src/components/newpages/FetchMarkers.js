import React ,{useEffect} from "react";
import { Link } from "react-router-dom";
import SideNav from "./SideNav";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import axios from "axios";

import ReactStars from "react-rating-stars-component";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";
import "./maps.css";

const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: -36.817685,
  lng: 175.699196,
};

export default function FetchMarkers() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [selected, setSelected] = React.useState(null);
  const [markerWashrooms,setMarkerWashrooms]= React.useState([]);
  
  const fetchUrl = 'http://localhost:4000/api/toilet/allToilets'
  useEffect(()=>{
    async function fetchWashrooms(){
      const request = await axios.get(fetchUrl);
    setMarkerWashrooms(request.data);
    return request;
    }
    fetchWashrooms();},
  [markerWashrooms]);

  const [markerStores,setMarkerStores]= React.useState([]);
  
  const fetchUrlStore = 'http://localhost:4000/api/stores/allStores'
  useEffect(()=>{
    async function fetchStores(){
      const request = await axios.get(fetchUrlStore);
    setMarkerStores(request.data);
    return request;
    }
    fetchStores();},
  [markerStores]);


  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  // STARS
  const readOnlyStars = {
    size: 20,
    value: 2.5,
    edit: false,
    color: "#D3D3D3",
  };
  return (
    <div>
      <Locate panTo={panTo} />
      <Search panTo={panTo} />
      <SideNav />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {markerStores.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
            icon={{
              url: `/marker.svg`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}
       
        
        {markerWashrooms.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
            icon={{
              url: `/toilet.svg`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng}}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div className="flex flex-col space-y-6 items-center justify-center">
            {/* {
            const selectedMarker = markerWashrooms.filter(marker => marker.lat == lat && marker.lng == lng);
          } */}
              <ReactStars {...readOnlyStars} />
              <div>
                <span className="border rounded-full p-2 m-2">
                  {(selected.gender) || ((selected.hasSanitaryNapkins)?"Sanitary Napkins":"")}
                </span>
                <span className="border rounded-full p-2 m-2">  {(selected.toiletType) || ((!selected.hasMenstrualCups)?"Menstrual Cups":"")}</span>
              </div>

              <Link
              to={'/one_toilet/'+selected._id}
                className="bg-pink-dark text-white p-1 flex flex-row items-center justify-center space-x-2 rounded-full w-24 text-base"
              >
                {" "}
                <BsIcons.BsFillInfoCircleFill /> <span>Details</span>
              </Link>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}

function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null,
        );
      }}
    >
      <MdIcons.MdMyLocation size={30} />
    </button>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
