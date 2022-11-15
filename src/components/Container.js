import { useEffect, useState } from 'react';
import Wardrobe from './Wardrobe';
import Outfit from './Outfit';
import ButtonContainer from './ButtonContainer';
import WeatherContainer from './WeatherContainer';

const Container = () => {
  // Here we will add state! We use the usState hook
  //the data, and a function to change the data:
  const [wardrobe, setWardrobe] = useState([]);
  const [outfit, setOutfit] = useState([]);
  const [seasonWardrobe, setSeasonWardrobe] = useState([]);
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);

  const fetchWardrobe = async () => {
    try {
      //fetch
      let path = `${process.env.REACT_APP_WARDROBE_API}/wardrobe`;
      let response = await fetch(path, { mode: 'cors' });
      //check status
      // if not 200
      if (response.status === 200) {
        let fetchedWardrobeData = await response.json();
        // each item: change url of image to `http://localhost:8000/`
        let fixedUrlWardrobe = fetchedWardrobeData.data.map((item) => ({
          ...item,
          url: item.url.startsWith('http') ? item.url : `http://localhost:8000${item.url}`,
        }));
        setWardrobe(fixedUrlWardrobe);
      } else {
        // deal with error
        let fetchError = new Error(`Sorry, could not find any data :(`);
        throw fetchError;
      }
    } catch (error) {
      console.log('Something went wrong fetching data', error.message);
      setError(error.message);
    }
  };

  // fetch('http://localhost:8000/wardrobe/cwkbsg',{method:'DELETE', mode:'cors'})
  const deleteWardrobeItem = async (event) => {
    let id = event.target.id;
    console.log('wardrobe', wardrobe);

    try {
      let path = `${process.env.REACT_APP_WARDROBE_API}/wardrobe/${id}`;
      let response = await fetch(path, { method: 'DELETE', mode: 'cors' });
      if (response.status === 200) {
        //find the item in the wardrobe array
        let remainingWardrobeItems = wardrobe.filter((item) => {
          return item.id !== id;
        });
        setWardrobe(remainingWardrobeItems);
        setDeleteMessage(true);
      } else {
        // deal with error
        let fetchError = new Error(`Sorry, could not find any data :(`);
        throw fetchError;
      }
      // let parsedData = await response.json();
    } catch (error) {
      console.log('Something went wrong deleting item');
    }
  };

  //Function to upload image:
  const uploadImageToCloudinary = async (item) => {
    // setup
    let preset = process.env.REACT_APP_CLOUDINARY_PRESET;
    let cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    let cloudPath = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    // create body to post:
    let dataForBody = new FormData();
    dataForBody.append('file', item.url[0]);
    dataForBody.append('upload_preset', preset);
    dataForBody.append('cloud_name', cloudName);
    try {
      let responseFromCloud = await fetch(cloudPath, {
        method: 'POST',
        body: dataForBody,
      });
      let imageData = await responseFromCloud.json();
      return imageData;
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const updateWardrobeItem = async (updatedItemValues, id, uploadImage) => {
    let updatedItem;
    let imageUrl = '';

    console.log('container updated Item', updatedItemValues, uploadImage);

    //upload image to cloudinary: ONLY if there is a changed image
    if (uploadImage) {
      let resultFromImageUpload = await uploadImageToCloudinary(updatedItemValues);
      console.log('updateWardrobeItem, resultFromImageUpload', resultFromImageUpload);
      imageUrl = resultFromImageUpload.url;
    } else {
      imageUrl = updatedItemValues.url;
    }

    //change the state of the wardrobe
    let updatedWardrobe = wardrobe.map((item) => {
      if (item.id === id) {
        updatedItem = { ...item, ...updatedItemValues, url: imageUrl };
        return updatedItem;
      } else {
        return item;
      }
    });
    setWardrobe(updatedWardrobe);
    console.log('updated wardrobe:', updatedWardrobe);

    //fetch with PUT
    try {
      let path = `${process.env.REACT_APP_WARDROBE_API}/wardrobe/${id}`;
      console.log('local host api key', process.env.REACT_APP_WARDROBE_API);
      let response = await fetch(path, {
        method: 'PUT',
        mode: 'cors',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(updatedItem),
      });
      console.log(response);
      if (response.status === 201) {
        // TODO: move setWardrobe(updatedWardrobe) here
        // setWardrobe(updatedWardrobe);
        alert('item updated');
      } else {
        // deal with error
        let fetchError = new Error(`Sorry, could not find any data :(`);
        throw fetchError;
      }
    } catch (error) {
      console.log('Something went wrong updating item');
    }
  };

  const fetchWeather = async () => {
    try {
      let path = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Berlin/today?unitGroup=metric&include=days&key=${process.env.REACT_APP_VISUAL_KEY}&contentType=json`;
      let response = await fetch(path, { mode: 'cors' });
      let parsedData = await response.json();
      let temp = parsedData.days[0].temp;
      let location = parsedData.address;
      let conditions = parsedData.days[0].conditions;
      conditions = conditions
        .split(' ')
        .map((word) => word.toLowerCase())
        .join(' ');
      let weatherData = { temp, location, conditions };
      setWeather(weatherData);
    } catch (error) {
      console.log('There was an error fetching data', error);
    }
  };

  const getDataFromLocalStorage = () => {
    //get data from local storage
    let outfitJson = localStorage.getItem('outfitLS');
    let outfitParsed = JSON.parse(outfitJson);
    if (outfitParsed) {
      setOutfit(outfitParsed);
    }
  };

  useEffect(() => {
    fetchWardrobe();
    fetchWeather();
    getDataFromLocalStorage();
  }, []);

  useEffect(() => {
    //save in local storage: add a name and the state as JSON
    localStorage.setItem('outfitLS', JSON.stringify(outfit));
  }, [outfit]);

  //functions for buttons
  const addToOutfit = (event) => {
    // console.log(event.target);
    let id = event.target.id;
    //find the item in the wardrobe array
    let clickedItem = wardrobe.find((item) => {
      return item.id === id;
    });
    // add to outfit array
    //update state
    setOutfit([...outfit, clickedItem]);
  };

  const removeFromOutfit = (id) => {
    let remainedOutfit = outfit.filter((item) => item.id !== id);
    setOutfit(remainedOutfit);
    console.log('Item to be removed:', id);
  };

  const filterSeason = (season) => {
    let selectedSeasonItems = wardrobe.filter((item) => {
      console.log('item', item, season);
      return item.season === season || item.season === 'All';
    });
    console.log('selectedSeasonItems', selectedSeasonItems);
    console.log(wardrobe);
    setSeasonWardrobe(selectedSeasonItems);

    console.log(seasonWardrobe);
  };

  const resetSeason = () => {
    setSeasonWardrobe([]);
  };

  return (
    <div className='Container'>
      <WeatherContainer weatherData={weather} />
      {deleteMessage ? alert('The item deleted') : null}
      {error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <ButtonContainer addSeasonFilter={filterSeason} resetSeason={resetSeason} />
          <Wardrobe
            wardrobeData={seasonWardrobe.length > 0 ? seasonWardrobe : wardrobe}
            addToOutfit={addToOutfit}
            deleteWardrobeItem={deleteWardrobeItem}
            updateWardrobeItem={updateWardrobeItem}
          />
          <Outfit
            outfitData={outfit}
            removeFromOutfit={removeFromOutfit}
            header={outfit.length > 0 ? 'This is your styling for today' : 'Select an outfit!'}
          />
        </>
      )}
    </div>
  );
};

//wardrobeData={seasonWardrobe.length > 0 ? { seasonWardrobe } : { wardrobe }}

export default Container;
