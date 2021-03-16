
import React, { useState, useEffect } from 'react'
import '../App.css'
import Header from './Header'
import Movie from './Movie'
import Search from './Search'


const MOVIE_API_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=sunflowers'

const App = () => {
  const [loading, setLoading] = useState(true)

  const [movies, setMovies] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  console.log("1");
  

  useEffect(() => {
    // 
    fetch(MOVIE_API_URL)

      .then(response => {
        return response.json()
      })

      .then(jsonResponse => {
        // console.log(jsonResponse)
        // console.log(jsonResponse.objectIDs)
        console.log("5");
        
        return jsonResponse.objectIDs
      })

      .then(res => {
        // console.log(res)
        const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'
        const arr = [] // 使っていない

        // res.forEach(function (val, index) {
        //   console.log("3");
          
          // const getPostData = async () => {
          //   const tes = [];
          //   for (let post of res) {
          //     const response = await fetch(url + val)
          //     const post = await response.json()
          //     tes.push(post)
          //   }
          //   console.log(tes);
            

          //   getPostData()
          // }


          // 非同期処理。あくまでthenの中での非同期なので、thenのスコープの範囲を考慮すれば良い。
          // async function test() {
          //   const tes =[];
          //   for (const [index, data] of res.entries()) {
          //     const result = await fetch(url + data);
          //     const post = await result.json()
          //     tes.push(post)
          //   }
          //   // 配列に全ての情報が格納されたら、setStateする。
          //   setMovies(tes) // この記述する場所は非同期を考慮する。
          //   setLoading(false)
          //   console.log(tes);
          //   console.log(tes[1]);

            
          //   console.log('complete!');
          // }

          // test()

        async function test() {
            const tes =[];
            for (const [index, data] of res.entries()) {
              const result = await fetch(url + data);
              const post = await result.json()
              tes.push(post)
            }
            // 配列に全ての情報が格納されたら、setStateする。
            setMovies(tes) // この記述する場所は非同期を考慮する。
            setLoading(false)
            console.log(tes);
            console.log(tes[1]);

            
            console.log('complete!');
        }

          test()

 

          console.log(movies);
          
        // })

        // console.log(arr);
        
        // // console.log(arr)
        // console.log(arr[1])
        // if (!arr.length) { console.log('not being') }
        // setMovies(arr)
        // setLoading(false)
      })

  }, [])

  
  console.log(movies);
  

  const search = searchValue => {
    setLoading(true)
    setErrorMessage(null)

    console.log('search')

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)

      .then(response => {
        return response.json()
      })

      .then(jsonResponse => {
        console.log(jsonResponse)

        if (jsonResponse.Response === 'True') {
          setMovies(jsonResponse.Search)
          setLoading(false)
        } else {
          setErrorMessage(jsonResponse.Error)

          setLoading(false)
        }
      })
  }
  return (
    <div className="App">
     <Header text="HOOKED" />
     <Search search={search} /> {/* propsとしてsearch関数を渡している。*/}
     <p className="App-intro">Sharing a few of our favourite movies</p>
   {/* <p>{movies[1].objectID}</p> */}
     <div className="movies">
       {loading && !errorMessage ? (
        <span>loading...</span>
        ) : errorMessage ? (
         <div className="errorMessage">{errorMessage}</div>
       ) : (
         
         movies.map((movie, index) => (
           
           <Movie movie={movie} />
         ))
       )}
     </div>
   </div>
 );
}

   
  
  
  
  
    




export default App;

