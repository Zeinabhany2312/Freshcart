import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

export default function Brands() {
  let { data, isLoading, isError, refetch } = useQuery('brands', fetchData);
  let [dataBrand, setDataBrands] = useState([]);

  async function fetchData() {

    let response = await axios.get('https://ecommerce.routemisr.com/api/v1/brands').catch((err) => {
      console.error('Error fetching data:', err);
    })
    setDataBrands(response.data.data);
    return response.data.data;

  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading ?
        <div className='loading position-fixed d-flex justify-content-center align-items-center top-0 end-0 bottom-0 start-0 '>
          <span className="loader"></span>
        </div>
        :
        <div className="container">
          <div className='row'>
            {dataBrand.map((el) => (
              <div className='col-md-3' key={el._id}>
                <div className="item text-center">
                  <img src={el.image} alt="" />
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    </>
  );
}
