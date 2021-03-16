import React, { useState } from "react";


const Search = (props) => {
  const [searchValue, setSearchValue] = useState(""); // useState()は配列を返す。consoleで見てみると["",f]と表示される。
                                                      // ""がsearchValueに代入され、fがsetSearchValueに代入される

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  }

  const resetInputField = () => {
    setSearchValue("")
  }

  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue); // propsとして関数を受け取り、実行。
    resetInputField(); // 検索後にフォームを空にする
  }

  return (
      <form className="search">
        <input
          value={searchValue} // stateをセット
          onChange={handleSearchInputChanges} // stateを検索フォームに入力された文字列に変換
          type="text"
        />
        <input onClick={callSearchFunction} type="submit" value="SEARCH" />
      </form>
    );
}

export default Search;

// フォームに入力された文字列をsearchValueとして、stateで管理する。
// searchValueを引数としてsearch関数を実行

// ここでhooksが登場します。
// hooksの説明は省略します。

// hooksのイメージが掴めない人は、returnの中身を見てましょう。
// value = {}