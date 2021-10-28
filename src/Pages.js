import React from 'react'
import Page from './Page'




const Pages = ({results, currentPage, addToFavorites, favorites }) => {
   if(results.length <= 10) {
       return (
           <Page key={1} results={results} addToFavorites={addToFavorites}/>
       )
   } else {
     const clonedResults = [...results]
     let numberOfPagesToPopulate = Math.ceil(clonedResults.length/10)
     const pages = []
     let frontIndex = 0;

     while(numberOfPagesToPopulate > 0) {
        pages.push(<Page results={clonedResults.slice(frontIndex, frontIndex + 10 )} addToFavorites={addToFavorites} favorites={favorites}/>)
        frontIndex = frontIndex + 10
        numberOfPagesToPopulate--
     }

     return (
         <>
          { pages[currentPage] }
         </>
     )
   }
 }

 export default Pages
