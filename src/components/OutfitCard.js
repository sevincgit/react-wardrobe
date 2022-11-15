const OutfitCard = (props) => {
  return (
    <div className='OutfitCard card' style={{ height: '20rem', width: '18rem', border: 'solid' }}>
      <img src={props.item.url} className='card-img-top h-50 item-image' alt='...' />
      <div className='card-body'>
        <h5 className='card-title'>{props.item.title}</h5>
        <button
          className='btn btn-primary'
          // id={props.item.id}
          onClick={() => {
            console.log('id:', props.item.id);
            props.removeFromOutfit(props.item.id);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default OutfitCard;
