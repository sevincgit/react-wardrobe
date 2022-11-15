import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import EditItemForm from './Form';

const WardrobeCard = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='Wardrobecard card m-2' style={{ height: '30rem', width: '18rem', border: 'solid' }}>
      <img src={props.item.url} className='card-img-top h-50 item-image' alt='...' />
      <div className='card-body'>
        <h5 className='card-title'>{props.item.title}</h5>
        <p className='card-text'>{props.item.definition}</p>

        {/* Refer to the function in the onClick, works with event */}
        {/* <button onClick={props.addToOutfit} className='btn btn-primary' id={props.item.id}>
          Add to outfit
        </button> */}

        {/* Create a callback, and call the function */}
        <div className='d-flex flex-column align-items-center gap-2'>
          <button
            onClick={(event) => {
              props.addToOutfit(event);
              console.log(event);
            }}
            className='btn btn-success'
            id={props.item.id}
          >
            Add to outfit
          </button>
          {/* Create a callback, and call the function, with id (string) */}
          {/* <button
          onClick={() => {
            props.addToOutfit(props.item.id);
          }}
          className='btn btn-primary'
          id={props.item.id}
        >
          Add to outfit
        </button> */}
          <Button variant='primary' onClick={handleShow}>
            Edit
          </Button>
          <button
            className='btn btn-danger'
            id={props.item.id}
            onClick={(event) => {
              console.log('button works');
              console.log(event);
              props.deleteWardrobeItem(event);
            }}
          >
            Delete
          </button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit your item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EditItemForm itemToEdit={props.item} handleClose={handleClose} updateWardrobeItem={props.updateWardrobeItem} />
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default WardrobeCard;
