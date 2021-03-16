import React, { useState, useEffect } from "react";
import "../App.css"; 
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";

// const MOVIE_API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=5148858"; // you should replace this with yours

// const BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes?q=呪術';
const MOVIE_API_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=sunflowers';

// ${}を使えば、文字列の間に変数を入れる事が出来る
// 'https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectIDs[i]}'


const App = () => {
  // hooks
  // 分割代入で、変数を宣言。

  // 返り値は配列で、index 0 に state、index 1 に state を変更するメソッドが入っている
  const [loading, setLoading] = useState(true); 

  //  useStateの引数はstateの初期値として入れたいものが入る。
  //  クラスの場合とは異なり、state はオブジェクトである必要は無い。
  const [movies, setMovies] = useState([]); // 初期値を配列に。
  const [errorMessage, setErrorMessage] = useState(null);

  // 関数の実行タイミングをReactのレンダリング後まで遅らせるhook
  // setInterval の使用や、外部の API の値への参照の時に使用。
  // 副作用とは、時間やAPIの様な外部との干渉が発生する事。
  
    useEffect(() => { // リフレッシュやリセットのイメージで良い
      
    // httpリクエストをしている  
    fetch(MOVIE_API_URL)
    // promiseがresolveされると、以下のthenの順に処理を実行。
      .then(response => { // responseはfetchの返り値であるpromiseオブジェクトの中のオブジェクトで、その中のjsonプロパティを取得。なので、名前は任意では無い。
                          // オブジェクト名は正確にはResponseと大文字なので、大文字にしても動作する。
        console.log(fetch(MOVIE_API_URL));        
        
        return response.json()  // メソッドをreturnすると言うことは、メソッドを実行した値を返すと言う事。
                               // jsonメソッドを実行した値は、下のjsonResponseのobjectと同じ。
                               // 詳細には、response.json()は実行するとpromiseオブジェクトを返す。そしてreturnにかけると、promiseオブジェクトの[[PromiseResult]]返す
      })
      
      // 上のreturnで取得したjsonメソッドの返し値を使用する。上記の返り値は命名されていないので、この引数名は任意で付けることが出来る。
      .then(jsonResponse => {         
        console.log(jsonResponse); // 映画情報のarrayなどが格納
        console.log(jsonResponse.objectIDs);
      
        return jsonResponse.objectIDs;
        // setMovies (jsonResponse)
        // console.log(jsonResponse.objectIDs[i]);
        
        // const array = jsonResponse.objectIDs;
        // array.forEach(currentValue => {
        //     console.log(currentValue);
        //     fetch('https:collectionapi.metmuseum.org/public/collection/v1/objects/${currentValue}')
        // });
        
        
        // setLoading(false);
      })

      // 上のreturnで取得したjsonメソッドの返し値を使用する。上記の返り値は命名されていないので、この引数名は任意で付けることが出来る。
      .then(res => {        
        console.log(res);
        const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/`;
        const arr = [];

        // res.forEach(function(val,index){          
        //   fetch(url + val)
        //   .then(response => {
        //    return response.json();
        //   })
        //   .then(res=>{
        //     arr.push(res)
        //   })
        // })
        

        // for(let i=0;i<res.length;i++){ // idの数だけループ
        //   fetch(url + res[i])
        //   .then(response => {
        //     // console.log(response);
        //     return response.json()
        //   })
        //   .then(res=>{
        //     arr.push({[i]:[i]})
        //   })
        // }

        for(let i=0;i<res.length;i++){ // idの数だけループ
            fetch(url + res[i])
            .then(response => {
              // console.log(response);
              return response.json()
            })
            .then(res=>{
        setMovies([...movies,res]);
    })
          }
        // console.log(arr);
        // console.log(arr[1]);
        // if (!arr.length) {console.log("not being");} // true
        setLoading(false);        
        // オブジェクトがresとして取得できたので、それを配列にプッシュしていく
      });

  }, []);
// 第二引数を空にした場合、つまり何も記述していない場合（空配列ではないので注意）は、render毎に第一引数の処理が走る
// 第二引数に空配列[]が渡された場合は、初回のレンダリング時にのみ実行される
// 何らかの値が入っている時は、その値が変更された時に実行される。

    // propsとして、Searchコンポーネントに関数を渡す。
    const search = searchValue => { // この引数は、仮引数で、Search.jsのstateが入る。
    setLoading(true);
    setErrorMessage(null);

    console.log("search");
    

    // 非同期で外部のリソースを取得するためのメソッド。
    // Web APIのJSONデータなどを取得出来る。
    // 戻り値にはPromiseが返却され、それをthenで取得していく。
    // fetchでAPIに対してHTTPリクエスト
    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`) // ここの部分も自分のAPIを入力するのか。どっちでも動いた

      // Promiseから返された値を使う場合はthenメソッド
      // レスポンスを受け取る
      .then(response => {
        // console.log(fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`));
        return response.json()
      })
         
      .then(jsonResponse => {
        console.log(jsonResponse);
        
        if (jsonResponse.Response === "True") { // レスポンスが404(サーバーには接続できたけどサイトが見つからなかった）や500（内部サーバーエラー）でもrejectされないので、条件分岐を設置
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else { 
          setErrorMessage(jsonResponse.Error); // これは何だろう? オブジェクトの中にErrorと言うプロパティ、メソッドは無く、
                                              // Errorを別の文字列にしても動作はした。
          setLoading(false);
        }
      
      
      });
    };

    // 二つの非同期処理がある。二つとも、json().SearchをsetStateする事がゴールなのは変わらない。
   // 違いは、useEffectか、関数式か。 
  //  useEffectは、初回レンダリング時、つまり「urlにアクセスした時」や、「ブラウザーをリロードする」と呼ばれる。
  // searchは検索をすると呼ばれる。
  // urlにアクセスした時も、映画一覧を表示させる場合は、useEffectを使う。
  
    
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
          // 配列であるmoviesにmap操作
          movies.map((movie, index) => (
            // movie はオブジェクト配列moviesから個別の映画情報オブジェクトを取り出したもので、propsとして値渡し。
            <Movie movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};


export default App;

