
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner,faSearch, faClose,faLink,faCalendar,faUser,faComment } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import {useState, useEffect}  from 'react'
import './Hackernews.css'
import Pagination from './Pagination/Pagination'
import FilterDate from './FilterDate/FilterDate'
import TimeFilter from './TimeFilter/TimeFilter'
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
     const handleDatefilter=({target}) =>{
      console.log(target)
      const {value} = target;
      console.log('Value'+value)
    if(value === 'date'){
      setQuery(`search_by_date?tags=story`);
    }
    if(value === 'popularity'){
      setQuery(`numericFilters=points>1&tags=story`);
    }

     }
     const handleTimeFilter=({target})=>{
      const {value} = target;
      const ts = Math.round((new Date()).getTime() / 1000);
      let tsStart, tsEnd;
      if(value === '24hour'){
        tsStart = ts;
        tsEnd =   ts - 86400; 
       console.log(tsEnd)
      }
      if(value === 'week'){
        tsStart = ts - 86400*7; 
        tsEnd =   ts - 86400*7*2; 
      }
      if(value === 'month'){
        tsStart = ts - 86400*24; 
        tsEnd =   ts - 86400*24*2; 
      }
      if(value === 'year'){
        tsStart = ts - 86400*365; 
        tsEnd =   ts - 86400*365*2; 
      }
      setQuery(`search_by_date?tags=story&numericFilters=created_at_i>${tsEnd},created_at_i<${tsStart}&page=${page}`);
      
    }
    const changeDate = (date) =>{
      const newDate = new Date(date);
      return newDate.toDateString();
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
       <FilterDate  onChange={handleDatefilter}/>
                <TimeFilter onChange={handleTimeFilter}/>
    <main className='container'>
         <ul className='news_container'>
            {news.map((singleNews)=>{
              
             
                return (
                  <>
               
                   <div className='news_detail'>
                  
                      
                      {singleNews.title || singleNews.story_title}
                   
                  
                    <div className="news_url">
                     {singleNews.url ? <a href={singleNews.url}><FontAwesomeIcon icon ={faLink}/></a>: ""} 
                    </div>
                    <div className="news_footer">
                      <FontAwesomeIcon icon={faCalendar}/>{changeDate(singleNews.created_at)}
                      <FontAwesomeIcon icon={faUser}/>{singleNews.author}
                      <FontAwesomeIcon icon={faComment} />{singleNews.points}

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
          <div className='page'>
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
      
      </div>
      
    </div>
  )
}

export default Hackernews
