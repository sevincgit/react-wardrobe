import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';

const CreateNewItemForm = (props) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      definition: '',
      size: '',
      season: '',
      color: '',
      price: '',
      url: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().min(2, 'Min 2 letters').required('Required'),
      definition: Yup.string().min(2, 'Min 2 letters').required('Required'),
      size: Yup.string().min(1, 'Min 1 letters').required('Required'),
      season: Yup.string().oneOf(['spring', 'summer', 'fall', 'winter']).required('Required'),
      color: Yup.string().min(2, 'Min 2 letters').required('Required'),
      price: Yup.number().positive().required('Required'),
      // TODO: Add "Required for url"
    }),
    onSubmit: (values) => {
      console.log('values in onsubmit', values);
      alert(JSON.stringify(values, null, 2));
      props.createNewItem(values);
      //TODO: Go back to initial values
    },
  });
  //   let inputFieldNames = ['title', 'definition', 'size', 'season', 'color', 'price', ];
  let inputFieldNames = Object.keys(formik.initialValues);
  return (
    <div className='form-container'>
      <form onSubmit={formik.handleSubmit} className='d-flex flex-column align-items-center'>
        {inputFieldNames.map((inputField) => {
          if (inputField === 'url' || inputField === 'id') {
            return null;
          }
          return (
            <div key={inputField} className='d-flex flex-row m-2'>
              <label htmlFor={inputField} className='m-1'>
                {' '}
                {`${inputField} of item`}
              </label>
              <input id={inputField} name={inputField} type='text' placeholder={`Add ${inputField} of the item`} onChange={formik.handleChange} />
              {formik.touched[inputField] && formik.errors[inputField] ? (
                <div className='text-danger'>{`${inputField} is ${formik.errors[inputField]}`}</div>
              ) : null}
            </div>
          );
        })}
        <label htmlFor='url'>Upload Image</label>
        <input
          id='url'
          name='url'
          type='file'
          onChange={(event) => {
            const fileToUpload = event.target.files;
            formik.setFieldValue('url', fileToUpload);
          }}
        />
        {formik.touched.url && formik.errors.url ? <div className='text-danger'>{`Url is ${formik.errors.url}`}</div> : null}
        <Button type='submit' variant='primary'>
          Create Item
        </Button>
      </form>
    </div>
  );
};

export default CreateNewItemForm;
