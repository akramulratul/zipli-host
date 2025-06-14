import React,{useState} from 'react';
import { createADateForCalendar, getLastDayOfMonth, getLocalizedMonthName } from '../util/Helper';
import ClimateImpactCard from '../components/ClimateImpactCard';
import ClimateImpactCardList from '../components/ClimateImpactCardLeftoverList';
import ClimateImpactCardMontlyList from '../components/ClimateImpactCardMonthlyList';

export default function Home({url,user}) {  
  const today = new Date();
  const yearStarts = createADateForCalendar('01','01',today.getFullYear());
  const yearEnds = createADateForCalendar('31','12',today.getFullYear());

  const [monthStarts,setMonthStarts] = useState(createADateForCalendar('01',today.getMonth() + 1,today.getFullYear()));
  const [monthEnds,setMonthEnds] = useState(createADateForCalendar(today.getDate(),today.getMonth() + 1,today.getFullYear()));

  const changeMonth = (month) => {
    setMonthStarts(createADateForCalendar('01',month + 1,today.getFullYear()));
    setMonthEnds(createADateForCalendar(getLastDayOfMonth(month),month + 1,today.getFullYear()));
  }

  return (
    <>
      <div className='row'>
        <div className='col-lg-6'>
          <ClimateImpactCard 
            url={url}
            user={user}
            starts={yearStarts}
            ends={yearEnds}
            year={true}
            title = {'Ilmastovaikutus vuonna ' + today.getFullYear()}
          />
          </div>
          <div className='col-lg-6'>
          <ClimateImpactCard 
            url={url}
            user={user}
            starts={monthStarts}
            ends={monthEnds}
            year={false}
            title = {'Ilmastovaikutus ' + getLocalizedMonthName(new Date(monthStarts).getMonth()) + 'ssa ' + today.getFullYear()}
          />    
        </div>
      </div>
      <div className='row'>
        <div className='col-lg-6'>
          <ClimateImpactCardMontlyList
            url={url}
            user={user}
            title = {'Ilmastovaikutus kuukausittain vuonna ' + today.getFullYear()}
            changeMonth={changeMonth}
          />
        </div>
        <div className='col-lg-6'>
          <ClimateImpactCardList
            url={url}
            user={user}
            starts={monthStarts}
            ends={monthEnds}
            title = {'Ylijäämät ' + getLocalizedMonthName(new Date(monthStarts).getMonth()) + 'ssa ' + today.getFullYear()}  
          /> 
        </div>
      </div>
    </>
  );
}
