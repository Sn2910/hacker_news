
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner,faSearch, faClose,faLink } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import {useState, useEffect}  from 'react'
import './Hackernews.css'
import Pagination from './Pagination/Pagination'
const url = 'https://hn.algolia.com/api/v1/'
const queryParam = ''



function Hackernews() {
    const [news, setNews] = useState([])
    const [searchWord, setSearchWord] = useState('')
    const [isLoading, setIsLoading] = useState('true')
    const[query, setQuery] =useState("tags=front_page")
    const [page, setPage] =useState(0)
  /*   const pageSize=10 */
    const [lastpage, setLastPage] =useState(0)
    

      const getData = async () => {
        setIsLoading(true)
        const response = await fetch(`http://hn.algolia.com/api/v1/search?${query}&&page=${page}`);
        console.log(response)
        if (response.ok) {
            setIsLoading(false)
          const result = await response.json();
          console.log(result)
          setNews(result.hits)
          setLastPage(result.nbPages)
        
        }
       
      }
      useEffect(()=>{
        getData()
      },[query,page])
     
     
      /* */
      if(isLoading){
        return <FontAwesomeIcon icon={faSpinner} />
      }
     



  return (
    <div className='hackernews'>
       <header>
          <h1>Hacker News</h1>
          <nav className='search'>
          
          <input
           type="text"
           className='searchField'   
           value={searchWord} 
           placeholder = "Search..."
            onChange={(event) => setSearchWord(event.target.value)} />
           <span className="btn search-btn"onClick={()=>setQuery(`query=${searchWord}`)}>
               <FontAwesomeIcon icon={faSearch} />
                </span> 
                {/* <span type="submit" className="btn clear-btn" >
                           {searchWord.length > 2 &&  <FontAwesomeIcon icon={faClose} />} 
                    </span> */}
        
          </nav>

       </header>
    <main className='container'>
         <ul className='news_container'>
            {news.map((singleNews)=>{
                
                return (
                  <>
                   <div className='news_detail'>
                    <div className="news_title">
                      
                       {singleNews.title}
                    </div>
                    <div className="news_url">
                      <a href={singleNews.url}><FontAwesomeIcon icon ={faLink}/></a>
                    </div>

          
      
                    </div>

                  </>
                   

                )
            }
          

            )}
         </ul>
       </main>
       <div className="footer">
       <div className='pageNavigation'>
          <div
            onClick={() => {
              if (page > 0) {
                setPage(page - 1)
              }
            }}
          >
            {'<<'}
          </div>
          <div>
            {page + 1} / {lastpage + 1}
          </div>
          <div onClick={() => {
            // last index is memes.length - 1
            if ( page < lastpage-1)
            setPage(page + 1)
          }}
          >
            &gt;&gt;
          </div>
          </div>
       <Pagination 
       news ={news} 
       page ={page}
      
       
       />
      </div>
      
    </div>
  )
}

export default Hackernews
