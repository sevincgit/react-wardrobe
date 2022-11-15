const SEASONS = ['fall', 'winter', 'spring', 'summer'];

const ButtonContainer = (props) => {
  return (
    <div className='ButtonSection d-flex justify-content-center gap-2 p-2'>
      {SEASONS.map((item, index) => {
        return (
          <button
            onClick={() => {
              props.addSeasonFilter(item);
              console.log(item);
            }}
            className='btn btn-warning season'
            key={index}
          >
            {item}
          </button>
        );
      })}
      <button
        onClick={() => {
          props.resetSeason();
        }}
        className='btn btn-secondary reset'
      >
        Reset
      </button>
    </div>
  );
};

export default ButtonContainer;
