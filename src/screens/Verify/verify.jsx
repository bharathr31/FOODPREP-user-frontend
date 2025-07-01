import { useContext, useEffect } from 'react';
import { Storecontext } from '../../context/Storecontext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loader from '../../components/Loader/loader';
import axios from 'axios';

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();
  const { url } = useContext(Storecontext);
  console.log(success, orderId);

  const verifyPayment = async()=>
  {
    try {
      const response = await axios.post(url+"/api/order/verify",{success,orderId})
      if(response.data.message==="Not paid")
        navigate('/')
      else
        navigate('/myorders')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>
  {
    verifyPayment()
  },[])

  return (
    <Loader />
  );
};

export default Verify;
