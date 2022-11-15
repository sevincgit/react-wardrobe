import OutfitCard from './OutfitCard';

const Outfit = (props) => {
  // Option 2: check outfit length, display different header
  //   let text;
  //   if (props.outfitData.length > 0) {
  //     text = 'This is your styling for today:';
  //   } else {
  //     text = 'Select an outfit!';
  //   }
  return (
    <div className='Outfit'>
      {/* Option 3: check outfit length, display different header */}
      {/* <h3>{props.header}</h3> */}
      {/* Option 2: check outfit length, display different header */}
      {/* <h3>{text}</h3> */}
      {/* Option 1: check outfit length, display different header */}
      {props.outfitData.length > 0 ? <h3>This is your styling for today:</h3> : <h3>Select an outfit!</h3>}
      <div className='Outfit d-flex flex-wrap gap-2'>
        {props.outfitData.map((element, index) => {
          return <OutfitCard key={index} item={element} removeFromOutfit={props.removeFromOutfit} />;
        })}
      </div>
    </div>
  );
};

export default Outfit;
