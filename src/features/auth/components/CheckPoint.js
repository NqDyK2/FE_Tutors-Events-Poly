import React from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLoginQuery } from '../../../app/api/authApiSlice';

const CheckPoint = (props) => {
  const location = useLocation();
  const checkpoint = location.search;
  console.log(checkpoint);
  const {data, error, isLoading} = useLoginQuery(checkpoint)
    useEffect(() => {
      if (data) {
        // props.history.push('/');
      }
    }, [data, error, checkpoint] )
    console.log(data);
    console.log(error);
    console.log(isLoading);
  return (
    <></>
  )
}

export default CheckPoint