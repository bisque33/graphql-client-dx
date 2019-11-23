import React from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache, gql, HttpLink, useQuery } from '@apollo/client'
import './App.css'
import { GetFilms } from './types/GetFilms'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:8080'
  })
})

const GET_FILMS = gql`
  query GetFilms {
    allFilms {
      films {
        episodeID
        title
      }
    }
  }
`

const Contents: React.FC = () => {
  const { loading, error, data } = useQuery<GetFilms>(GET_FILMS)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error :</div>
  if (!data) return <div>Error : data is undefined</div>

  return (
    <ul>
      {data.allFilms!.films!.map(film => (
        <li>
          episode {film!.episodeID}: {film!.title}
        </li>
      ))}
    </ul>
  )
}

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Contents />
    </ApolloProvider>
  )
}

export default App
