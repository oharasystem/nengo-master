/** @jsxImportSource hono/jsx */
import { Article } from "../types";

export const hayawareSchoolYear: Article = {
  slug: 'hayaware-school-year-logic',
  title: '早生まれ（1/1〜4/1）はなぜ「前の学年」？履歴書で間違えないための必須知識',
  excerpt: '4月1日生まれは早生まれ？4月2日からは次の学年？ややこしい「早生まれ」の仕組みと、履歴書記入時の注意点を解説します。',
  publishDate: '2026-01-13',
  category: 'knowledge',
  content: (
    <>
      <p className="mb-4">
        「私（うちの子）、1月生まれだから早生まれなんです」<br />
        この会話、よくありますよね。しかし、いざ入学願書や履歴書を書く段になると、<strong>「あれ？ 早生まれってことは、同級生は西暦何年生まれになるんだっけ？」</strong>と手が止まってしまうことはありませんか？
      </p>
      <p className="mb-4">
        結論から言うと、<strong>早生まれ（1月1日〜4月1日生まれ）の人は、「前年の4月2日〜12月31日生まれ」の人と同じ学年</strong>になります。
      </p>
      <p className="mb-4">
        なぜ4月1日生まれまでが「前の学年」に含まれるのか？今回はその少し複雑な仕組みと、絶対に間違えないためのポイントを解説します。
      </p>

      <h2 className="text-xl font-bold text-slate-700 mt-8 mb-4">なぜ4月1日生まれまでが「早生まれ」？</h2>
      <p className="mb-4">
        「学校は4月1日から始まるんだから、4月1日生まれは新しい学年じゃないの？」と不思議に思いますよね。実はこれ、法律（年齢計算ニ関スル法律）で<strong>「歳をとるのは誕生日の前日が終了する瞬間（午後12時）」</strong>と決まっているからなんです。
      </p>
      <div className="bg-slate-100 p-4 rounded-md mb-4 font-bold text-slate-800">
        <ul className="list-disc list-inside space-y-2">
          <li>3月31日生まれ → 3月30日の終了時に歳をとる</li>
          <li>4月1日生まれ → <strong>3月31日の終了時に歳をとる</strong></li>
          <li>4月2日生まれ → 4月1日の終了時に歳をとる</li>
        </ul>
      </div>
      <p className="mb-4">
        学校教育法では「4月1日時点で満6歳になっている児童」が小学校に入学すると定められています。<br />
        つまり、<strong>4月1日生まれの子は、3月31日の時点で満6歳になるため、「今の学年」に入ることになる</strong>のです。これが、4月1日が早生まれのラストランナーである理由です。
      </p>

      <h2 className="text-xl font-bold text-slate-700 mt-8 mb-4">ここが運命の分かれ道！「4月1日」と「4月2日」</h2>
      <p className="mb-4">
        履歴書を書く上で最も混乱しやすいのが、この境界線です。
      </p>
      <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
        <li><strong>4月1日生まれまで：</strong> 前の年の学年（早生まれ）</li>
        <li><strong>4月2日生まれから：</strong> 次の年の学年（遅生まれ）</li>
      </ul>
      <p className="mb-4">
        たった1日の違いですが、入学年度・卒業年度が丸々1年変わってしまうため、手計算での確認は非常にミスが起きやすいポイントです。
      </p>

      <h2 className="text-xl font-bold text-slate-700 mt-8 mb-4">履歴書記入時の注意点</h2>
      <p className="mb-4">
        早生まれの方が自分の学歴を計算する際、自分の生まれ年を基準に計算表を見ると、1つ下の学年の行を見てしまったり、留年していないのに計算が合わなかったりすることがあります。
      </p>
      <p className="mb-4">
        特に「平成」から「令和」への改元を跨ぐ世代や、浪人・留年が絡む場合、頭の中だけで計算するのは非常にリスクが高いです。
      </p>

      <h2 className="text-xl font-bold text-slate-700 mt-8 mb-4">まとめ：計算はツールに任せよう</h2>
      <p className="mb-4">
        「早生まれは、生まれた年の前年の人たちと同級生」。理屈はわかっていても、いざ正式な書類を作るとなると不安になるものです。
      </p>
      <p className="mb-4">
        当サイト<strong>「年号マスター」</strong>では、「早生まれ対応」の自動計算機能を搭載しています。生年月日を入力するだけで、正しい入学・卒業年度を一発で算出します。
      </p>
      <p className="mb-4">
        大切な書類でミスをしないためにも、ぜひ当サイトの計算ツールをご活用ください。
      </p>
    </>
  )
};
