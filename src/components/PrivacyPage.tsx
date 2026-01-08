import { html } from "hono/html";
import { Layout } from "./Layout";
import { Translation } from "../locales/types";

type Props = {
    lang: string;
    dict: Translation;
    path: string;
    env?: string;
};

export const PrivacyPage = (props: Props) => {
    const { lang, dict, path, env } = props;

    // Content is hardcoded in Japanese as per requirements
    return (
        <Layout title="プライバシーポリシー" description="当サイトのプライバシーポリシー" lang={lang} dict={dict} path={path} env={env}>
            <div class="flex-1 w-full relative overflow-y-auto bg-slate-50">
                <div class="min-h-full flex flex-col items-center justify-start pt-8 pb-12 px-4">
                    <div class="w-full max-w-3xl bg-white p-8 rounded-xl border border-slate-200 shadow-sm">

                        <h1 class="text-2xl font-bold text-slate-800 mb-6 border-b pb-2">プライバシーポリシー</h1>

                        <section class="mb-8">
                            <h2 class="text-xl font-bold text-slate-700 mb-3">広告の配信について</h2>
                            <p class="text-slate-600 leading-relaxed mb-4">
                                当サイトは、第三者配信の広告サービス（Google AdSense）を利用する予定です。<br />
                                広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サイトや他サイトへのアクセスに関する情報「Cookie（クッキー）」（氏名、住所、メール アドレス、電話番号は含まれません）を使用することがあります。<br />
                                また、Googleアドセンスに関して、このプロセスの詳細やこのような情報が広告配信事業者に使用されないようにする方法については、<a href="https://policies.google.com/technologies/ads?hl=ja" target="_blank" rel="noopener noreferrer" class="text-[#22215B] hover:underline">Googleのポリシーと規約</a>をご覧ください。
                            </p>
                        </section>

                        <section class="mb-8">
                            <h2 class="text-xl font-bold text-slate-700 mb-3">アクセス解析ツールについて</h2>
                            <p class="text-slate-600 leading-relaxed mb-4">
                                当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。<br />
                                このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。<br />
                                この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
                            </p>
                        </section>

                        <section class="mb-8">
                            <h2 class="text-xl font-bold text-slate-700 mb-3">免責事項</h2>
                            <p class="text-slate-600 leading-relaxed mb-4">
                                当サイトで掲載している画像の著作権・肖像権等は各権利所有者に帰属致します。権利を侵害する目的ではございません。記事の内容や掲載画像等に問題がございましたら、各権利所有者様本人が直接メールでご連絡下さい。確認後、対応させて頂きます。<br />
                                当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。<br />
                                当サイトのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が入り込んだり、情報が古くなっていることもございます。<br />
                                当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
                            </p>
                        </section>

                        <section class="mb-8">
                            <h2 class="text-xl font-bold text-slate-700 mb-3">著作権について</h2>
                            <p class="text-slate-600 leading-relaxed mb-4">
                                当サイトに存在する、文章・画像・動画等の著作物の情報を無断転載することを禁止します。
                            </p>
                        </section>

                        <div class="mt-8 pt-4 border-t border-slate-100 text-sm text-slate-500 text-right">
                            <p><strong>制定日</strong>：2026年1月8日</p>
                            <p><strong>運営者</strong>：年号マスター運営チーム</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
