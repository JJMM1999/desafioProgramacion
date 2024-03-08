import api from './api/axiosConfig';
import { useEffect, useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import Filter from "./Component/Filter/Filter";
import Cards from './Component/Cards/Cards';
import Search from './Component/Search/search';
import Pagination from './Component/Pagination/Pagination';

function App() {
  let [pageNumber, setPageNumber] = useState(1);
  let [nameLocation, setNameLocation] = useState();
  let [CharacterResponse, setCharacter] = useState(null);
  let [LocationResponse, setLocation] = useState(null);
  let [search, setSearch] = useState("");
  let [fechedData, updateFechedData] = useState([]);
  let [info, setInfo] = useState();


  const getCharacter = async () => {
    try {
      if (nameLocation !== "" || nameLocation) {
        const response = await api.get(`/webclient/characterforall?page=${pageNumber}&location=${nameLocation}&name=${search}`);
        setInfo(response.data.info);
        setCharacter(response.data.results);
      }else{
        
      }
    } catch (error) {
      setInfo();
      setCharacter();
      console.error("Error fetching character data:", error);
    }
  };

  const getAllLocation = async () => {
    try {
      const response = await api.get(`/webclient/locations/`);
      setLocation(response.data);
    } catch (error) { 
          
      console.error("Error fetching location data:", error);
    }
  };

  const getAllCharacterW = async () => {
    try {
      const response = await api.get(`/webclient/getallcharacter?page=${pageNumber}&name=${search}`);
        console.log(response);
        setInfo(response.data.info);
        setCharacter(response.data.results);
    } catch (error) {
      setInfo();
      setCharacter();
      console.error("Error fetching location data:", error);
    }
  };

  useEffect(() => {
    getAllLocation();
  }, []);

  useEffect(() => {
    if (nameLocation) {
      getCharacter();
    }else{
      getAllCharacterW();
    }
  }, [nameLocation, search, pageNumber]);


  const handleLocationChange = (selectedLocation) => {
    if (selectedLocation !== "0") {
      setPageNumber(1);
      setNameLocation(selectedLocation);
    } else {
      setPageNumber(1);
      setNameLocation("");
    }
  };

  if (LocationResponse === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className='App'>
      <h1 className='text-center ubuntu my-4'>
        <span className='text-success'>Rick</span> And <span className='text-warning'>Morty</span>
      </h1>
      <Search setSearch={setSearch} />
      <div className='container'>
        <div className='row'>
          <div className='col-3'>
            <Filter listLocation={LocationResponse} onLocationChange={handleLocationChange} />
          </div>
          <div className='col-8'>
            <div className='row'>
              <Cards results={CharacterResponse} />
            </div>
          </div>
        </div>

      </div>
      <Pagination info={info} setPageNumber={setPageNumber} pageNumber={pageNumber} />
    </div>
  );
}

export default App;