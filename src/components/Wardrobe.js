import WardrobeCard from './WardrobeCard';

const Wardrobe = (props) => {
  return (
    <div className='Wardrobe d-flex flex-wrap justify-content-center gap-2'>
      {props.wardrobeData.map((element, index) => {
        return (
          <WardrobeCard
            key={index}
            item={element}
            addToOutfit={props.addToOutfit}
            deleteWardrobeItem={props.deleteWardrobeItem}
            updateWardrobeItem={props.updateWardrobeItem}
          />
        );
      })}
    </div>
  );
};

export default Wardrobe;
