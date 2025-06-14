import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Info from './Info';
import uuid from 'react-uuid';
import { getCurrentMonthApiCall } from '../util/Api';
import { getLastDayOfMonth, createADateForCalendar, getLocalizedMonthName} from '../util/Helper';

export default function ClimateImpactCardMonthlyList({url,user,title,changeMonth}) {  
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [loading, setLoading] = useState(true);

  const year = new Date().getFullYear();
  const januaryApiCall = axios.get(getCurrentMonthApiCall(url,user,createADateForCalendar('01','01',year),createADateForCalendar(getLastDayOfMonth(0),'01',year)));
  const februaryApiCall = axios.get(getCurrentMonthApiCall(url,user,createADateForCalendar('01','02',year),createADateForCalendar(getLastDayOfMonth(1),'02',year)));
  const marchApiCall = axios.get(getCurrentMonthApiCall(url,user,createADateForCalendar('01','03',year),createADateForCalendar(getLastDayOfMonth(2),'03',year)));
  const aprilApiCall = axios.get(getCurrentMonthApiCall(url,user,createADateForCalendar('01','04',year),createADateForCalendar(getLastDayOfMonth(3),'04',year)));
  const mayApiCall = axios.get(getCurrentMonthApiCall(url,user,createADateForCalendar('01','05',year),createADateForCalendar(getLastDayOfMonth(4),'05',year)));
  const juneApiCall = axios.get(getCurrentMonthApiCall(url,user,createADateForCalendar('01','06',year),createADateForCalendar(getLastDayOfMonth(5),'06',year)));
  const julyApiCall = axios.get(getCurrentMonthApiCall(url,user,createADateForCalendar('01','07',year),createADateForCalendar(getLastDayOfMonth(6),'07',year)));
  const augustApiCall = axios.get(getCurrentMonthApiCall(url,user,createADateForCalendar('01','08',year),createADateForCalendar(getLastDayOfMonth(7),'08',year)));
  const septemberApiCall = axios.get(getCurrentMonthApiCall(url,user,createADateForCalendar('01','09',year),createADateForCalendar(getLastDayOfMonth(8),'09',year)));
  const octoberApiCall = axios.get(getCurrentMonthApiCall(url,user,createADateForCalendar('01','10',year),createADateForCalendar(getLastDayOfMonth(9),'10',year)));
  const novemberApiCall = axios.get(getCurrentMonthApiCall(url,user,createADateForCalendar('01','11',year),createADateForCalendar(getLastDayOfMonth(10),'11',year)));
  const decemberApiCall = axios.get(getCurrentMonthApiCall(url,user,createADateForCalendar('01','12',year),createADateForCalendar(getLastDayOfMonth(11),'12',year)));

  useEffect(() => {
    axios.all([januaryApiCall,februaryApiCall,marchApiCall,aprilApiCall,mayApiCall,juneApiCall,julyApiCall,augustApiCall,septemberApiCall,octoberApiCall,novemberApiCall,decemberApiCall]).then(axios.spread((...res) => {
      const tempMonths = [11];
      
      for (let i = 0;i<=11;i++) {
        tempMonths[i] = {
          "name": getLocalizedMonthName(i),
          "weight": res[i].data.summary.weight ? res[i].data.summary.weight : '0',
          "c02": res[i].data.summary.totalC02Reduction ? res[i].data.summary.totalC02Reduction : '0',
          "c04": res[i].data.summary.totalCh4Reduction ? res[i].data.summary.totalCh4Reduction : '0',
        }
      }
      setMonths(tempMonths);
      setLoading(false);
    })).catch (error => {
      setLoading(false);
      alert(error);
    });
  }, [])
  
  const changeSelection = (index) => {
    setSelectedMonth(index);
    changeMonth(index);
  }

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
              <th className="column-4" scope="col">Kuukausi</th>
              <th className="column-4" scope="col">Kilot</th>
              <th className="column-4" scope="col">C0<sup>2</sup></th>
              <th className="column-4" scope="col">CH<sup>4</sup></th>
            </tr>
          </thead>
          <tbody>
            {months.map((month,index) => (
              <tr key={uuid()}>
                <td onClick={() => changeSelection(index)} className={index === selectedMonth ? 'highlight point' : 'point'}>{month.name}</td>
                <td onClick={() => changeSelection(index)} className={index === selectedMonth ? 'highlight point' : 'point'}>{month.weight}</td>
                <td onClick={() => changeSelection(index)} className={index === selectedMonth ? 'highlight point' : 'point'}>{month.c02}</td>
                <td onClick={() => changeSelection(index)} className={index === selectedMonth ? 'highlight point' : 'point'}>{month.c04}</td>
              </tr>    
            ))}
          </tbody>
        </table>
        </div>
      </div>
    )
  }
}

