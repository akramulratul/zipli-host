import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Info from './Info';
import uuid from 'react-uuid';
import { convertDateToHHMMSS } from '../util/Helper';
import { getCurrentMonthApiCall } from '../util/Api';

export default function ClimateImpactCardLeftoverList({url,user,starts,ends,title}) {
  const [deliveries, setDeliveries] = useState([]);
  const [weight, setWeight] = useState(0);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const address = getCurrentMonthApiCall(url,user,starts,ends)
    axios.get(address)
      .then((response) => {
        const json = response.data;
        const orderDeliveries = json.deliveries;
        setDeliveries(orderDeliveries.reverse());
        setWeight(json.summary.weight);
        setLoading(false);
      }).catch (error => {
        setLoading(false);
        alert(error);
      });
  }, [starts,ends,user,url])
  
  
  if (loading) {
    return <Info text='Ladataan...'/>
  } else {
    return (
      <div className='card'>
        <div className='card-body'>
          <h5 style={{ backgroundColor: '#228B22', color: '#fff' }} className='card-title'>{title}</h5>
          <table className="table table-striped" style={{marginTop: '30px'}}>
            <thead>
              <tr key={uuid()}>
                <th className="column" scope="col">Päiväys</th>
                <th className="column" scope="col">Aika</th>
                <th className="column" scope="col">Kilot</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map((delivery) => (
                <tr key={uuid()}>
                  <td>{new Date(delivery.created).toLocaleDateString('fi-Fi')}</td>
                  <td>{ convertDateToHHMMSS(new Date(delivery.created))}</td>
                  <td>{delivery.parcels[0].weight}</td>
                </tr>
              ))} 
              <tr className='summary-row'key={uuid()}>
                <td></td>
                <td></td>
                <td className='highlight'>{weight} kg</td>
              </tr>
            </tbody>
        </table>
        </div>
      </div>
    )
  }
}

