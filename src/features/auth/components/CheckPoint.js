import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoginQuery } from '../../../app/api/authApiSlice';
import { setCredentials } from '../authSlice';

const CheckPoint = (props) => {
  const location = useLocation();
  const checkpoint = location.search;
  console.log(checkpoint);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {data, error, isLoading} = useLoginQuery(checkpoint)
    useEffect(() => {
      // if (data) {
        dispatch(setCredentials({user: null, token: null, isAuthenticated: true}));
        navigate('/');
      // }
    }, [data, error, checkpoint] )
    console.log(data);
    console.log(error);
    console.log(isLoading);
  return (
    <></>
  )
}

export default CheckPoint