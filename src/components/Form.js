import { useFormik } from 'formik';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const EditItemForm = (props) => {
  // Note that we have to initialize ALL of fields with values. These
  // could come from props, but since we don’t want to prefill this form,
  // we just use an empty string. If we don’t do this, React will yell
  // at us.

  // states for form

  const formik = useFormik({
    initialValues: {
      title: props.itemToEdit.title,
      definition: props.itemToEdit.definition,
      size: props.itemToEdit.size,
      season: props.itemToEdit.season,
      color: props.itemToEdit.color,
      url: props.itemToEdit.url,
    },
    onSubmit: (values) => {
      console.log('submitted', values);
      // alert(JSON.stringify(values, null, 2));
      //check url
      let changedUrl = false;
      console.log('form url:', values.url);
      console.log('old item url:', props.itemToEdit.url);
      if (values.url !== props.itemToEdit.url) {
        console.log('form url:', values.url);
        console.log('old item url:', props.itemToEdit.url);
        changedUrl = true;
      }
      let updatedItemValues = values;
      props.updateWardrobeItem(updatedItemValues, props.itemToEdit.id, changedUrl);
      // console.log('form', updatedItem, props.itemToEdit.id);
    },
  });
  return (
    <div>
      <form className='d-flex flex-wrap flex-column' onSubmit={formik.handleSubmit}>
        <label htmlFor='title'>Title</label>
        <input id='title' name='title' type='text' onChange={formik.handleChange} value={formik.values.title} />

        <label htmlFor='definition'>Definition</label>
        <input id='definition' name='definition' type='text' onChange={formik.handleChange} value={formik.values.definition} />

        <label htmlFor='size'>Size</label>
        <input id='size' name='size' type='size' onChange={formik.handleChange} value={formik.values.size} />

        <label htmlFor='season'>Season</label>
        <input id='season' name='season' type='season' onChange={formik.handleChange} value={formik.values.season} />

        <label htmlFor='color'>Color</label>
        <input id='color' name='color' onChange={formik.handleChange} value={formik.values.color} />

        <label htmlFor='url'>Change Image</label>
        <input
          id='url'
          name='url'
          type='file'
          onChange={(event) => {
            const fileToUpload = event.target.files;
            formik.setFieldValue('url', fileToUpload);
          }}
        />

        <Modal.Footer>
          <Button variant='secondary' onClick={props.handleClose}>
            Close
          </Button>
          <Button type='submit' variant='primary' onClick={props.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </form>
    </div>
  );
};

export default EditItemForm;
