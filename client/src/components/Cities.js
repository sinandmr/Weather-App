import { useDispatch, useSelector } from 'react-redux';

import CityList from '../citylist';
import { changeName } from '../stores/Position';

function Cities({ setPosition }) {
  const data = useSelector(state => state.data);
  console.log(data);
  const dispatch = useDispatch();
  const optionChange = e => {
    dispatch(changeName(e.target.value));
  };

  return (
    <select name="cities" className="cities" onChange={optionChange}>
      <option key={1453} value={data.city}>
        {data.city}
      </option>
      {CityList.map((city, i) => (
        <option key={i} value={city}>
          {city}
        </option>
      ))}
    </select>
  );
}
export default Cities;
