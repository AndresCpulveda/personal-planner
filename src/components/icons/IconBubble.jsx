import React, { useState } from 'react'

import './iconBubble.styles.css'

function IconBubble({description}) {
  return (
    <div className='relative'>
      <div className='speech bottom bg-slate-400 w-36 absolute bottom-3 right-[-65px] text-xs text-white text-center px-2 rounded'>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default IconBubble