import React from 'react'

export default function Info({text}) {
  return (  
   <div className='card'>
      <div className='card-body'>
          <div className="lds-dual-ring"></div>
          <p className='info'>{text}</p>
      </div>
    </div>
  )
}
