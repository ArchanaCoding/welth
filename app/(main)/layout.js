import React from 'react'

const MainLayout = ({children}) => {
  return (
    <div className='container max-auto my-32'>
      {children}
    </div>
  )
}

export default MainLayout
