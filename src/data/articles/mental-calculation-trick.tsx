/** @jsxImportSource hono/jsx */
import { Article } from "../types";

export const mentalCalculationTrick: Article = {
  slug: 'mental-calculation-trick',
  title: '「今、令和何年？」西暦⇔和暦を一瞬で変換する暗算テクニック',
  excerpt: 'スマホを見る前に3秒で解決！西暦から令和・平成・昭和を導き出す「魔法の数字」を紹介します。',
  publishDate: '2026-01-13',
  content: (
    <>
      <p className="mb-4">
        役所での書類記入や、ふとした会話の中で「今年って令和何年ですか？」と聞かれた時、一瞬フリーズしてしまった経験はありませんか？
      </p>
      <p className="mb-4">
        実は、たった3つの「魔法の数字」さえ覚えておけば、誰でも一瞬で、しかも暗算で年号を導き出すことができます。今回は、数字に強い人だけが知っている「年号変換のライフハック」をご紹介します。
      </p>

      <h2 className="text-xl font-bold text-slate-700 mt-8 mb-4">令和の計算式：魔法の数字は「018」</h2>
      <p className="mb-4">
        まずは一番使う頻度が高い「令和」。今の西暦の下2桁から、ある数字を引くだけで求められます。
      </p>
      <div className="bg-slate-100 p-4 rounded-md mb-4 font-bold text-slate-800">
        西暦の下2桁 － 18 ＝ 令和〇年
      </div>
      <p className="mb-4">
        覚え方は<strong>「レイ（0）ワ（18）＝ 018」</strong>です。<br />
        例：2026年の場合、26 - 18 = <strong>8（令和8年）</strong>となります。
      </p>

      <h2 className="text-xl font-bold text-slate-700 mt-8 mb-4">平成の計算式：時計をイメージして「＋12」</h2>
      <p className="mb-4">
        履歴書などで意外と計算が必要になる「平成」は足し算を使います。
      </p>
      <div className="bg-slate-100 p-4 rounded-md mb-4 font-bold text-slate-800">
        西暦の下2桁 ＋ 12 ＝ 平成〇年
      </div>
      <p className="mb-4">
        例：1998年の場合、98 + 12 = 110。下2桁をとって<strong>平成10年</strong>です。<br />
        例：2005年の場合、05 + 12 = <strong>17（平成17年）</strong>となります。
      </p>

      <h2 className="text-xl font-bold text-slate-700 mt-8 mb-4">昭和の計算式：四半世紀を引く「－25」</h2>
      <div className="bg-slate-100 p-4 rounded-md mb-4 font-bold text-slate-800">
        西暦の下2桁 － 25 ＝ 昭和〇年
      </div>
      <p className="mb-4">
        例：1980年の場合、80 - 25 = <strong>55（昭和55年）</strong>です。<br />
        「昭和は25（ニコニコ）引く」と覚えておくと忘れません。
      </p>

      <h2 className="text-xl font-bold text-slate-700 mt-8 mb-4">逆（和暦→西暦）の計算方法</h2>
      <p className="mb-4">
        逆に和暦から西暦を知りたい時は、さきほどの計算の符号を逆にするだけです。
      </p>
      <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
        <li><strong>令和 → 西暦：</strong> 和暦に 18 を足す</li>
        <li><strong>平成 → 西暦：</strong> 和暦から 12 を引く</li>
        <li><strong>昭和 → 西暦：</strong> 和暦に 25 を足す</li>
      </ul>

      <h2 className="text-xl font-bold text-slate-700 mt-8 mb-4">まとめ</h2>
      <p className="mb-4">
        この3つの式を覚えておけば、ふとした瞬間に役立ちますし、脳のトレーニングにもなります。
      </p>
      <p className="mb-4">
        とはいえ、「計算ミスが許されない重要な書類」や「大正や明治、それ以前の年号」を知りたい時は、無理に暗算せず、当サイト<strong>「年号マスター」</strong>の変換機能をご利用ください。
      </p>
    </>
  )
};
