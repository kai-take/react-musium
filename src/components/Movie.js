import React from "react";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg"; 

const Movie = ({ movie }) => { // このmovieは単なる引数なのか。
  // console.log(movie);
  
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
  return (
    <div className="movie">
      <h2>{movie.objectID}</h2>
      <div>
        <img
          width="200"
          alt={`The movie titled: ${movie.Title}`}
          src={movie.primaryImage}
        />
      </div>
      <p>({movie.accessionYear})</p>
    </div>
  );
};


export default Movie;
// movieは、json().SearchのArrayに格納されている各オブジェクト。

// まず DEFAULT_PLACEHOLDER_IMAGEですが、これはアイアンマンの画像を表しているだけです。
// もし取得した映画に画像がない場合(faiと検索して見てください)に、アイアンマンの画像を代わりに使います。
// 引数の{movie}とは何を表しているのか、一見分かりませんね。この説明の為には、App.jsの説明が必要なので、後回しにします。

