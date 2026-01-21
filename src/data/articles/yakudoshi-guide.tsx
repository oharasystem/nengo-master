/** @jsxImportSource hono/jsx */
import { Article } from "../types";

export const yakudoshiGuide: Article = {
  slug: 'yakudoshi-guide-and-calc',
  title: '「今年は厄年？」前厄・本厄・後厄の違いと、間違いやすい「数え年」の罠',
  excerpt: '最近ついてない…それ、もしかして厄年かも？男性25・42・61歳、女性19・33・37・61歳の「数え年」計算と、厄年の過ごし方を解説します。',
  publishDate: '2026-01-21',
  category: 'knowledge',
  content: (
    <>
      <p className="mb-4">
        「最近、なんとなく体調がすぐれない」「仕事で予期せぬトラブルが続く」<br />
        そんな時、ふと頭をよぎるのが<strong>「厄年（やくどし）」</strong>の二文字ではないでしょうか。
      </p>
      <p className="mb-4">
        厄年は単なる迷信と片付けられがちですが、実は長い歴史の中で培われた<strong>「人生の曲がり角」や「体調の変化が起きやすい時期」を伝える先人の知恵</strong>でもあります。
      </p>
      <p className="mb-4">
        今回は、意外と知らない「前厄・本厄・後厄」の違いや、現代人が間違いやすい「数え年」の計算方法について解説します。
      </p>

      <h2 className="text-xl font-bold text-slate-700 mt-8 mb-4">男性・女性で違う！気をつけるべき年齢</h2>
      <p className="mb-4">
        厄年は性別によって年齢が異なります。一般的に厄年とされるのは以下の年齢です（すべて数え年）。
      </p>
      <div className="bg-slate-100 p-4 rounded-md mb-4 text-slate-800">
        <ul className="list-disc list-inside space-y-2">
          <li><strong>男性：</strong> 25歳、42歳、61歳</li>
          <li><strong>女性：</strong> 19歳、33歳、37歳、61歳</li>
        </ul>
      </div>

      <h3 className="text-lg font-bold text-slate-700 mt-4 mb-2">もっとも重い「大厄（たいやく）」とは？</h3>
      <p className="mb-4">
        中でも特に注意が必要とされるのが「大厄」です。<br />
        <strong>男性は42歳（死に）</strong>、<strong>女性は33歳（散々）</strong>という語呂合わせもあり、社会的責任が重くなったり、出産・子育てで体質が変わったりする時期と重なるため、心身ともに慎重に過ごすべき年とされています。
      </p>

      <h2 className="text-xl font-bold text-slate-700 mt-8 mb-4">なぜズレる？「数え年」の罠</h2>
      <p className="mb-4">
        「私、今年32歳だからまだ来年だよね？」と思っている女性の方、ちょっと待ってください。<br />
        厄年は、普段私たちが使っている「満年齢」ではなく、<strong>「数え年（かぞえどし）」</strong>で計算するのが一般的です。
      </p>
      <p className="mb-4">
        数え年とは、<strong>「生まれた瞬間を1歳」とし、「お正月（1月1日）を迎えるたびに1歳年をとる」</strong>という昔ながらの計算方法です。
      </p>
      <div className="bg-slate-100 p-4 rounded-md mb-4 font-bold text-slate-800">
        数え年 ＝ その年の満年齢 ＋ 1歳（※誕生日前なら＋2歳）
      </div>
      <p className="mb-4">
        つまり、満年齢で32歳の方は、数え年では33歳（または34歳）。もしかすると、<strong>まさに今が「大厄」の真っ只中</strong>かもしれないのです。
      </p>

      <h2 className="text-xl font-bold text-slate-700 mt-8 mb-4">厄年の過ごし方と「前・本・後」</h2>
      <p className="mb-4">
        厄年には、メインの「本厄」のほかに、その前後の「前厄（まえやく）」と「後厄（あとやく）」があり、合計3年間続きます。
      </p>
      <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
        <li><strong>前厄：</strong> 変化の兆しが現れる年。点検や準備を。</li>
        <li><strong>本厄：</strong> 慎重に行動すべき年。無理な挑戦は避ける。</li>
        <li><strong>後厄：</strong> 厄が薄らいでいく年。油断せず徐々にペースを戻す。</li>
      </ul>
      <p className="mb-4">
        厄払いや厄除けは、お正月か節分（2月3日頃）までに行うのが一般的です。神社やお寺で祈祷を受けることで、気持ちをリセットする良いきっかけになります。
      </p>

      <h2 className="text-xl font-bold text-slate-700 mt-8 mb-4">まとめ：自分の厄年を正しく知ろう</h2>
      <p className="mb-4">
        厄年は「悪いことが起きる年」と恐れるよりも、「自分の体と心をメンテナンスする年」と捉えるのがおすすめです。
      </p>
      <p className="mb-4">
        「結局、自分は今年厄年なの？前厄なの？」<br />
        数え年の計算で混乱してしまった方は、当サイトの<strong>「年齢・厄年一覧ページ」</strong>をご覧ください。
      </p>
      <p className="mb-4">
        生年月日を入力するだけで、あなたの数え年と、今年が厄年に該当するかどうかを一発で判定します。「転ばぬ先の杖」として、ぜひ一度チェックしてみてください。
      </p>
    </>
  )
};