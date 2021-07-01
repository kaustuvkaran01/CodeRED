import React from "react";
import FormIcon from "../../assets/Forms/ShopName.svg";
import { useAuth0 } from "@auth0/auth0-react";

import axios from "axios";

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
// import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";
import mapStyles from "../newpages/mapStyles";
import "./maps.css";

const libraries = ["places"];
const mapContainerStyle = {
  height: "50vh",
  width: "100vw",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 43.6532,
  lng: -79.3832,
};

export default function StoreMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

    // USER
  const {user} = useAuth0();

  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [formData, setFormData] = React.useState({
    landmarkName: "",
    contact: "",
    hasToiletPaper: false,
    differentlyAbled: false,
    toiletType:"",
    gender:"",
    restroomPrice: "",
    lat: 0,
    lng: 0,
    uname : user.email,
  });
  
  const {
    landmarkName,
    contact,
    restroomPrice,
    lat,
    lng,
    hasToiletPaper,
    differentlyAbled,
    toiletType,
    gender,

    uname,
  } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(lat);
    console.log(lng);

  const onTick = (e) => {
    setFormData({ ...formData, [e.target.name]: true });
  };

  const onSubmit = async (e) => {
   
    e.preventDefault();
    const newWashroom = {
      landmarkName,
      contact,
      hasToiletPaper,
      differentlyAbled,
     gender,
     toiletType,
     restroomPrice,
      lat: markers[0].lat,
      lng: markers[0].lng,
      uname,
    };
    console.log(newWashroom);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(newWashroom);
      const res = await axios.post("https://fathomless-anchorage-82136.herokuapp.com/api/toilet/newToilet", body, config);
      console.log(res);
    } catch (err) {
      console.error(err.response);
    }
  };

  const onMapClick = React.useCallback((e) => {
    setMarkers((current) => [
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
    console.log(e.latLng.lat(), e.latLng.lng());
  }, []);

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

  return (
    <div className="bg-pink-light h-full">
      <Locate panTo={panTo} />
      <Search panTo={panTo} />

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
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

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>
                <span role="img" aria-label="bear" className="h-4 w-4">
                  🩸
                </span>
                My Store
              </h2>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      <div className="mt-8 max-w-md mx-auto pb-4">
        <form action="#" autoComplete="off" onSubmit={onSubmit}>
          <div className="flex flex-col mb-2">
            <div className="flex relative mt-4 ">
              <span className="rounded-l-lg inline-flex items-center px-3  border-b bg-white border-pink-dark text-pink shadow-sm text-2xl">
                <img src={FormIcon} alt="" />
              </span>
              <input
                type="text"
                name="landmarkName"
                value={landmarkName}
                onChange={onChange}
                className=" rounded-r-lg flex-1 appearance-none border-b border-pink-dark w-full py-2.5 px-4 bg-white text-gray-700 placeholder-pink shadow-sm text-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Restroom Landmark"
              />
            </div>
          </div>
          <div className="flex flex-col mb-2">
          <div className=" inline-flex items-center text-pink-dark text-xl mt-4">
                Restroom Type
              </div>
            <div className="flex relative mt-2 ">
              
              <label>
            <input type="radio" value="squat"  onChange={onChange} className="mr-2" name="toiletType"/>
            Squat Type
          </label>
          
            </div>
            <div className="flex relative mt-2 ">
              
              <label>
            <input type="radio" value="commode" onChange={onChange} className="mr-2" name="toiletType"/>
            Commode
          </label>
          
            </div>
            
          </div>
          <div className="flex flex-col mb-2">
          <div className=" inline-flex items-center text-pink-dark text-xl mt-4">
                Gender Accesebility
              </div>
            <div className="flex relative mt-2 ">
              
              <label>
            <input type="radio" value="male"  onChange={onChange} className="mr-2" name="gender"/>
            Male
          </label>
          
            </div>
            <div className="flex relative mt-2 ">
              
              <label>
            <input type="radio" value="female" onChange={onChange} className="mr-2" name="gender"/>
            Female
          </label>
          
            </div>
            <div className="flex relative mt-2">
              
              <label>
            <input type="radio" value="unisex" onChange={onChange} className="mr-2" name="gender"/>
            Unisex
          </label>
          
            </div>
            
          </div>
          <div className="flex flex-col mb-2">
            <div className="flex flex-col relative mt-4 ">
              <div className=" inline-flex items-center text-pink-dark text-xl">
                Products Available
              </div>
              <span className="mt-2 mb-1 flex items-center">
                <input
                  type="checkbox"
                  name="hasToiletPaper"
                  value={hasToiletPaper}
                  onChange={onTick}
                  className="absolute h-5 w-5 opacity-0"
                />
                <div class="bg-white border-2 border-pink-dark w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 focus-within:pink">
                  <svg
                    class="fill-current hidden w-3 h-3 text-pink-dark pointer-events-none"
                    version="1.1"
                    viewBox="0 0 17 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fill-rule="evenodd">
                      <g
                        transform="translate(-9 -11)"
                        fill="#B6465F"
                        fill-rule="nonzero"
                      >
                        <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
                      </g>
                    </g>
                  </svg>
                </div>
                <label className="ml-2 text-lg">Toilet paper included</label>
              </span>
              <span className="mt-2 mb-1 flex items-center">
                <input
                  type="checkbox"
                  name="differentlyAbled"
                  value={differentlyAbled}
                  onChange={onTick}
                  className="absolute h-5 w-5 opacity-0"
                />
                <div class="bg-white border-2 border-pink-dark w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 focus-within:pink">
                  <svg
                    class="fill-current hidden w-3 h-3 text-pink-dark pointer-events-none"
                    version="1.1"
                    viewBox="0 0 17 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fill-rule="evenodd">
                      <g
                        transform="translate(-9 -11)"
                        fill="#B6465F"
                        fill-rule="nonzero"
                      >
                        <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
                      </g>
                    </g>
                  </svg>
                </div>
                <label className="ml-2 text-lg">Differently abled friendly</label>
              </span>{" "}
            
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <div className="flex relative mt-4 w-3/4">
              <span className="rounded-l-lg inline-flex items-center px-3 border-b bg-white border-pink-dark text-pink shadow-sm text-2xl">
                <img src={FormIcon} alt="" />
              </span>
              <input
                type="number"
                name="restroomPrice"
                value={restroomPrice}
                onChange={onChange}
                className="rounded-r-lg flex-1 appearance-none border-b border-pink-dark  py-2.5 px-4 bg-white text-gray-700 placeholder-pink shadow-sm text-xl focus:outline-none"
                placeholder="Average Price"
              />
            </div>
          </div>
          <div className="flex w-full my-8 mx-auto">
            <button
              type="submit"
              className="py-2 px-4  bg-pink-dark hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              ADD STORE
            </button>
          </div>
        </form>
      </div>
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
      <i className="fas fa-compass fa-3x text-pink-dark" />
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
