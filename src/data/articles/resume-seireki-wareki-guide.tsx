/** @jsxImportSource hono/jsx */
import { Article } from "../types";

export const resumeSeirekiWarekiGuide: Article = {
  slug: 'resume-seireki-wareki-guide',
  title: '【履歴書】西暦・和暦どっちが正解？採用担当が教える書き方マナーと年号早見表',
  excerpt: '履歴書作成時の年号の迷いを解消。西暦・和暦の統一ルール、早見表、そして面倒な計算をなくす自動ツールの活用法を解説します。',
  publishDate: '2026-01-13',
  content: (
    <>
      <p className="mb-4">
        「履歴書の日付、西暦（202X年）で書くべき？それとも和暦（令和○年）？」<br />
        「学歴は西暦で書いたのに、資格欄だけ和暦にしてしまった……」
      </p>
      <p className="mb-4">
        就職・転職活動中、履歴書を作成していてふと手が止まるのが「年号の書き方」です。
        <strong>結論から言うと、履歴書は「西暦」と「和暦」、どちらで書いても問題ありません。</strong>
      </p>
      <p className="mb-4">
        しかし、採用担当者に「雑な仕事をしそう」と思われないためには、絶対に守るべきルールが一つだけあります。
        それは<strong>「書類全体で表記を統一すること」</strong>です。
      </p>

      <h2 className="text-xl font-bold text-slate-700 mt-8 mb-4">西暦・和暦どちらでもOK！重要なのは「統一感」</h2>
      <p className="mb-4">
        日本のビジネスシーンにおいて、履歴書の年号表記に法的な決まりはありません。しかし、採用担当者は履歴書から「あなたの几帳面さ」や「事務処理能力」を見ています。
      </p>

      <h3 className="text-lg font-bold text-slate-600 mt-6 mb-3">なぜ「統一」が重要なのか</h3>
      <p className="mb-4">
        もし、学歴欄が「2018年 卒業」で、職歴欄が「平成31年 入社」となっていたらどうでしょうか？
        読む側は、時系列を頭の中で変換しなければならず、ストレスを感じます。
        必ず、<strong>履歴書・職務経歴書・送付状（添え状）のすべての書類で、西暦か和暦かのどちらかに統一</strong>しましょう。
      </p>

      <h3 className="text-lg font-bold text-slate-600 mt-6 mb-3">迷ったら「応募先」や「フォーマット」に合わせる</h3>
      <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
        <li><strong>和暦（令和・平成）がおすすめ：</strong>老舗企業、国内大手メーカー、官公庁、金融機関など</li>
        <li><strong>西暦（20XX年）がおすすめ：</strong>外資系企業、IT・Web業界、ベンチャー企業</li>
      </ul>

      <h2 className="text-xl font-bold text-slate-700 mt-8 mb-4">和暦（元号）を使う場合の3つの注意点</h2>
      <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">
        <li>
          <strong>アルファベットの略語はNG</strong><br />
          「S50年」「H10年」「R3年」は避け、「昭和」「平成」「令和」と記述します。
        </li>
        <li>
          <strong>「1年」は「元年」と書く</strong><br />
          「平成1年」「令和1年」ではなく、<strong>「平成元年」「令和元年」</strong>と書くのがマナーです。
        </li>
        <li>
          <strong>西暦と和暦の変換ミスに注意</strong><br />
          計算間違いを防ぐため、早見表を活用しましょう。
        </li>
      </ol>

      <h2 className="text-xl font-bold text-slate-700 mt-8 mb-4">【保存版】就活・転職に役立つ西暦・和暦変換早見表</h2>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full text-sm border border-slate-300">
          <thead className="bg-slate-100">
            <tr>
              <th className="border border-slate-300 px-4 py-2 text-left">西暦</th>
              <th className="border border-slate-300 px-4 py-2 text-left">和暦</th>
              <th className="border border-slate-300 px-4 py-2 text-left">出来事・備考</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-slate-300 px-4 py-2">1989年</td><td className="border border-slate-300 px-4 py-2">平成元年</td><td className="border border-slate-300 px-4 py-2">1/8〜 平成</td></tr>
            <tr><td className="border border-slate-300 px-4 py-2">1995年</td><td className="border border-slate-300 px-4 py-2">平成7年</td><td className="border border-slate-300 px-4 py-2"></td></tr>
            <tr><td className="border border-slate-300 px-4 py-2">2000年</td><td className="border border-slate-300 px-4 py-2">平成12年</td><td className="border border-slate-300 px-4 py-2"></td></tr>
            <tr><td className="border border-slate-300 px-4 py-2">2010年</td><td className="border border-slate-300 px-4 py-2">平成22年</td><td className="border border-slate-300 px-4 py-2"></td></tr>
            <tr><td className="border border-slate-300 px-4 py-2">2019年</td><td className="border border-slate-300 px-4 py-2">令和元年</td><td className="border border-slate-300 px-4 py-2">5/1〜 令和</td></tr>
            <tr><td className="border border-slate-300 px-4 py-2">2020年</td><td className="border border-slate-300 px-4 py-2">令和2年</td><td className="border border-slate-300 px-4 py-2"></td></tr>
            <tr><td className="border border-slate-300 px-4 py-2">2025年</td><td className="border border-slate-300 px-4 py-2">令和7年</td><td className="border border-slate-300 px-4 py-2"></td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold text-slate-700 mt-8 mb-4">履歴書と職務経歴書の整合性をチェックしよう</h2>
      <p className="mb-4">
        忘れがちなのが、<strong>「履歴書は和暦で書いたのに、職務経歴書はPC作成だから西暦のままにしてしまった」</strong>というパターンです。
        提出前に必ず両方の書類を並べて、年号が揃っているか指差し確認をしましょう。
      </p>

      <h2 className="text-xl font-bold text-slate-700 mt-8 mb-4">面倒な計算は不要！自動ツールで「うっかりミス」を防ごう</h2>
      <p className="mb-4">
        「早生まれだから、入学年度が1年ずれる？」「浪人や留年をした場合の計算がややこしい……」
      </p>
      <p className="mb-4">
        自分の生年月日からすべての年号を計算するのは面倒ですし、間違いのもとです。
        そんなリスクと手間をゼロにするために、<strong>当サイトの「入学卒業年度計算ツール」</strong>をぜひ活用してください。
      </p>
      <p className="mb-4">
        使い方は簡単。あなたの<strong>「生年月日」</strong>を入力し、浪人・留年の有無を選ぶだけ。
        一瞬で、小学校から大学までの入学・卒業年度が「西暦」「和暦」の両方で表示されます。
      </p>
      
      <div className="mt-8 text-center">
          <a href="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
              入学卒業年度自動計算ツールを使ってみる（無料）
          </a>
      </div>
    </>
  )
};
