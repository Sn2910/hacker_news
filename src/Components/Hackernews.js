
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import {useState, useEffect}  from 'react'
const url = 'https://hn.algolia.com/api/v1/'
const queryParam = ''



function Hackernews() {
    const [news, setNews] = useState([])
    const [searchWord, setSearchWord] = useState('')
    const [isLoading, setIsLoading] = useState('true')
    const[query, setQuery] =useState("tags=front_page")
    

      const getData = async () => {
        setIsLoading(true)
        const response = await fetch(`http://hn.algolia.com/api/v1/search?${query}`);
        console.log(response)
        if (response.ok) {
            setIsLoading(false)
          const result = await response.json();
          console.log(result)
          setNews(result.hits)
        }
       
      }
      useEffect(()=>{
        getData()
      },[query])
     
     
      /* */
      if(!isLoading)
      return <FontAwesomeIcon icon="fa-solid fa-spinner" />


  return (
    <div className='hackernews'>
       <header>
          <h1>Hacker News</h1>
          <nav>
          <input type="" value={searchWord} onChange={(event) => setSearchWord(event.target.value)} />
          <button onClick={()=>setQuery(`query=${searchWord}`)} >Search</button>
          </nav>

       </header>
    <main>
         <ul>
            {news.map((singleNews)=>{
                
                return (
                    <li >{singleNews.title}</li>
                )
            }
          

            )}
         </ul>
       </main>
      
      
    </div>
  )
}

export default Hackernews
