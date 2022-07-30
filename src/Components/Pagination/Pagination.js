import React from 'react'

function Pagination({news,page,pageSize}) {
    if(!news ||news.length){
        return <div>Loading...</div>
    }
    let rows=[]
    for(let i= page*pageSize; i<=(page*pageSize + pageSize-1);i++){
        const element = news[i]
    rows.push(
        <div key ={i}>
          {element}
        </div>
    )
    

    }
    
    
  return (
    <div className=''>
      {rows}
    </div>
  )
}

export default Pagination
