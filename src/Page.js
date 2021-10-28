import React from 'react'
import Card from './Card'


const Page = ({results, favorites=[],addToFavorites}) => (
    <>
        {results.map(({ id, images: { original: {url}},title,
        }) => <Card key={id} giphy={url} title={title} giphyId={id} isFavorited={favorites.includes(id)} addToFavorites={addToFavorites} favorites={favorites}/> )}
    </>
)

export default Page