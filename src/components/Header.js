import React from "react";

const Header = (props) => {
    return(
        <header className="App-header">
          <h2>{props.text}</h2>
        </header>
    )
}

export default Header;

// 基本的な記述しかないので、説明は不要かと思います。

// ただ初めてpropsをみると言う方もいるかも知れないので、僕なりのpropsの理解の仕方をお伝えします。
// propsが難しいと言う方は、コンポーネント利用時のイメージをしてみましょう。ここでは、<Header hoge="hoge" />をイメージします。
// まずconst Headerで Headerコンポーネントを定義して、このコンポーネントはApp.jsで<Header text = "Hooked"/> と描画されます。
// そして描画時にtextがpropsとしてHeaderコンポーネントに渡されています。
// コンポーネント定義 => 描画 => 描画時にpropsが渡される と言うイメージを持っておけばスムーズかと思います。
// 要は、propsがコンポーネントの引数に記述されていたら、「描画のタイミングでデータが渡されるんだな」と理解しておけば取り敢えずは大丈夫です。