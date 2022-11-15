import tshirtImg from './images/tshirt.jpg';
import socksImg from './images/socks.jpg';
import shortsImg from './images/shorts.jpg';
import jacketImg from './images/jacket.jpg';
import pantsImg from './images/pants.jpg';
import pulloverImg from './images/pullover.jpg';
import winterPulloverImg from './images/winterPullover.jpg';

let tshirt = {
  id: '01',
  title: 'T-shirt',
  definition: 'A nice cotton T-shirt',
  imgUrl: tshirtImg,
  season: 'Summer',
};
let socks = {
  id: '02',
  title: 'Socks',
  definition: 'Socks for every day',
  imgUrl: socksImg,
  season: 'All',
};
let shorts = {
  id: '03',
  title: 'Shorts',
  definition: 'A pair of denim shorts',
  imgUrl: shortsImg,
  season: 'Summer',
};

let jacket = {
  id: '04',
  title: 'Jacket',
  definition: 'A brown bomber jacket',
  imgUrl: jacketImg,
  season: 'Fall',
};

let pants = {
  id: '05',
  title: 'Pants',
  definition: 'A pair of red pants',
  imgUrl: pantsImg,
  season: 'Winter',
};

let winterPullover = {
  id: '06',
  title: 'Winter Pullover',
  definition: 'A beige winter pullover',
  imgUrl: pulloverImg,
  season: 'Winter',
};

let pullover = {
  id: '07',
  title: 'Pullover',
  definition: 'A pink pullover',
  imgUrl: winterPulloverImg,
  season: 'Spring',
};


export { tshirt, socks, shorts, jacket, pants, winterPullover, pullover };
