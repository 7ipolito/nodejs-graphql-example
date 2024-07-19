import { useState } from "react"
import { useMutation } from "@apollo/client";
const { useQuery, gql, useLazyQuery } = require("@apollo/client");
const QUERY_ALL_USERS = gql`
  query getAllUsers{
    users {
      id
      name
      age
      username
      nationality
    }
}

`

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies{
    movies {
      name
    }
}
`


const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!){
    createUser(input: $input){
      name
      id

    }
  }
`


function DisplayData() {
  const [movieSearched, setMovieSearched] = useState("");
  //Create USer States
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");


  const { data, loading, error, refetch } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [
    fetchMovie,
    { data: movieSearchedData, error: movieError },
  ] = useLazyQuery(GET_MOVIE_BY_NAME);

  const [createdUser] = useMutation(CREATE_USER_MUTATION);



  if (loading) {
    return <h1>Loading..</h1>
  }
  if (error) {
    console.log(error)
  }

  if (movieError) {
    console.log(movieError)
  }

  return <div>
    <div>

      <input
        type="text"
        placeholder="Name..."
        onChange={(event) => {
          setName(event.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Username..."
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Age..."
        onChange={(event) => {
          setAge(event.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Nationality..."
        onChange={(event) => {
          setNationality(event.target.value.toUpperCase());
        }}
      />

      <button
        onClick={(event) => {
          createdUser({ variables: { input: { name, username: username, age: Number(age), nationality: nationality } } })
          refetch()
        }

        }

      >

        Fetch Data
      </button>

    </div>
    {data && data.users.map((user) => {
      return (<div>
        <h1>Name:{user.name}</h1>
        <h1>Username:{user.username}</h1>
        <h1>Age:{user.age}</h1>
        <h1>Nationality:{user.nationality}</h1>
      </div>)
    })}

    {movieData && movieData.movies.map((movie) => {
      return <h1>Movie Name: {movie.name}</h1>
    })}

    <div>
      <input
        type="text"
        placeholder="Interstellar..."
        onChange={(event) => {
          setMovieSearched(event.target.value);
        }}
      />      <button
        onClick={(event) => {
          createdUser({ variables: { input: { name, username, age, nationality } } })

        }
        }

      >

        Fetch Data
      </button>
      <div>
        {movieSearchedData && (
          <div>
            <h1>MovieName: {movieSearchedData.movie.name}</h1>
            <h1>Year of publication: {movieSearchedData.movie.yearOfPublication}</h1>
          </div>
        )}
        {movieError && <h1>Thre was a featching error in the data</h1>}
      </div>
    </div>
  </div >
}

export default DisplayData