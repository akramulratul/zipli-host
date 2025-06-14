import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Info from '../components/Info';
import uuid from 'react-uuid';
import { getCurrentYearApiCall,getCurrentMonthApiCall } from '../util/Api';

export default function ClimateImpactCard({url,user,starts, ends,title,year}) {
  const [c02Reduction, setC02Reduction] = useState(0);
  const [ch4Reduction, setCh4Reduction] = useState(0);
  const [transportationC02Emissions, setTransportationC02Emissions] = useState(0);
  const [productionC02Emissions, setProductionC02Emissions] = useState(0);
  const [totalC02Reduction, setTotalC02Reduction] = useState(0);
  const [totalCh4Reduction, setTotalCh4Reduction] = useState(0);
  const [weight, setWeight] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let address='';
  
    if (year) {
      address = getCurrentYearApiCall(url,user,starts,ends);
    } else {
      address = getCurrentMonthApiCall(url,user,starts,ends);
    }
    setLoading(true);

    axios.get(address)  
      .then((response) => {
        const json = response.data;
        setC02Reduction(json.summary.c02Reduction);
        setCh4Reduction(json.summary.ch4Reduction);
        setProductionC02Emissions(json.summary.productionC02Emissions);
        setTransportationC02Emissions(json.summary.transportationC02Emissions);
        setTotalC02Reduction(json.summary.totalC02Reduction);
        setTotalCh4Reduction(json.summary.totalCh4Reduction);
        setWeight(json.summary.weight);

        setLoading(false);
      }).catch (error => {
        setLoading(false);
        alert(error);
      }); 
  }, [starts,ends,user,year,url])
  

  if (loading) {
    return <Info text='Ladataan...'/>
  } else {
    return (
      <div className='card'>
        <div className='card-body'>
          <h5 style={{ backgroundColor: '#228B22', color: '#fff' }} className='card-title'>{title}</h5>
          <h6>Ylijäämä <span className='highlight'>{weight}</span> kiloa</h6>
          <table className='table'>
            <thead>
              <tr key={uuid()}>
                <th className="column" scope="col"></th>
                <th className="column" scope="col">C0<sup>2</sup></th>
                <th className="column" scope="col">CH<sup>4</sup></th>
              </tr>
            </thead>
            <tbody>
              <tr key={uuid()}>
                <td> Päästövähennys</td>
                <td>{c02Reduction}</td>
                <td>{ch4Reduction}</td>
              </tr>
              <tr key={uuid()}>
                <td>Kuljetuksen päästöt</td>
                <td>{transportationC02Emissions}</td>
                <td></td>
              </tr>
              <tr key={uuid()} >
                <td>Tuotannon päästöt</td>
                <td>{productionC02Emissions}</td>
                <td></td>
              </tr>
              <tr className='summary-row' key={uuid()}>
                <td>Yhteensä</td>
                <td className='highlight'>{totalC02Reduction} kg</td>
                <td className='highlight'>{totalCh4Reduction} kg</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
