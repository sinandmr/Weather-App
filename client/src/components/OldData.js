import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import axios from 'axios';
import { setData } from '../stores/Data';

const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT;

function OldData() {
  const dispatch = useDispatch();
  const { city } = useSelector(state => state.data);
  const [currentData, setCurrentData] = useState([]);
  // console.log(name);

  useEffect(() => {
    getRecordedData();
    // console.log(currentData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  async function getRecordedData() {
    const { data } = await axios.get(
      `http://localhost:${BACKEND_PORT}/api/v1/data/${city}`
    );
    if (data.status !== 'success') {
      alert('Kayıtlı veriler çekilemedi.');
    }
    const { dailies } = data;
    setCurrentData([...dailies]);
  }
  // console.log(currentData);

  const changed = async e => {
    let backendData = currentData[e.target.value];

    if (e.target.value === 'current') {
      backendData = currentData[currentData.length - 1];
    }
    // console.log(backendData);
    dispatch(setData(backendData));
  };

  // getRecordedData();
  return (
    <div className="back-data">
      <label htmlFor="vh">Kayıtlı Veriler </label>
      <select name="cities" onChange={changed}>
        <option value="current">Şu an</option>
        {currentData.map((d, i) => (
          <option key={i} value={i}>
            {d.date}
          </option>
        ))}
      </select>
    </div>
  );
}
export default OldData;
