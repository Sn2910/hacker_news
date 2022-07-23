import React from 'react'
import {useState, useEffect}  from 'react'
const url = 'https://hn.algolia.com/api/v1/'
const queryParam = ''



function Hackernews() {
    const [news, setNews] = useState([])
    const [searchWord, setSearchWord,] = useState('')
    const[query, setQuery] =useState(queryParam)
    

      const getData = async () => {
        const response = await fetch(`http://hn.algolia.com/api/v1/search?query=${searchWord}`);
        console.log(response)
        if (response.ok) {
          const result = await response.json();
          console.log(result)
          setNews(result.hits)
        }
        
      }
     
     
      /* */
    

  return (
    <div className='hackernews'>
       <header>
          <h1>Hacker News</h1>
          <nav>
          <input type="" value={searchWord} onChange={(event) => setSearchWord(event.target.value)} />
          <button onClick={getData} >Search</button>
          </nav>

       </header>
       <body>
         <ul>
            {news.map((singleNews)=>{
                
                return (
                    <li >{singleNews.title}</li>
                )
            }
          

            )}
         </ul>
       </body>
      
      
    </div>
  )
}

export default Hackernews
