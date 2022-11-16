import CreateNewItemForm from './CreateNewItemForm';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CreateNewItemContainer = () => {
  const [error, setError] = useState(null);
  const [createItemMessage, setCreateItemMessage] = useState(null);

  const uploadImageToCloudinary = async (item) => {
    // setup
    let preset = 'wardrobe';
    let cloudName = 'dtgd7zrg9';
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
  const createNewItem = async (formValues) => {
    let resultFromImageUpload = await uploadImageToCloudinary(formValues);
    let imageUrl = resultFromImageUpload.url;
    let newItem = { ...formValues, url: imageUrl };

    // get access to token in local storage:
    let tokenFromLS = localStorage.getItem('token');
    let JWT_TOKEN = JSON.parse(tokenFromLS);

    try {
      let path = `${process.env.REACT_APP_WARDROBE_API}/wardrobe/`;
      let response = await fetch(path, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
        body: JSON.stringify(newItem),
      });
      console.log(response);
      if (response.status === 201) {
        alert('item created. wardrobe updated');
        setCreateItemMessage(true);
      } else {
        // deal with error
        let fetchError = new Error(`Sorry, could not find any data :(`);
        throw fetchError;
      }
    } catch (error) {
      console.log('Sorry, something went wrong creating the item');
    }
  };

  return (
    <div>
      {createItemMessage ? (
        <div>
          {alert('The item deleted')}
          <h2>CREATED</h2>
          <Link className='navbar-brand mb-0 h1' to='/new-item'>
            Go back to main page
          </Link>
        </div>
      ) : null}
      <CreateNewItemForm createNewItem={createNewItem} />
    </div>
  );
};

export default CreateNewItemContainer;
