import { html } from "hono/html";
import { Layout } from "./Layout";
import { Translation } from "../locales/types";

type Props = {
    lang: string;
    dict: Translation;
    path: string;
    env?: string;
};

export const ContactPage = (props: Props) => {
    const { lang, dict, path, env } = props;

    // Content is hardcoded in Japanese as per requirements
    return (
        <Layout title="お問い合わせ" description="お問い合わせ" lang={lang} dict={dict} path={path} env={env}>
            <div class="flex-1 w-full relative overflow-y-auto bg-slate-50">
                <div class="min-h-full flex flex-col items-center justify-start pt-8 pb-12 px-4">
                    <div class="w-full max-w-3xl bg-white p-8 rounded-xl border border-slate-200 shadow-sm">

                        <h1 class="text-2xl font-bold text-slate-800 mb-6 border-b pb-2">お問い合わせ</h1>

                        <p class="text-slate-600 leading-relaxed mb-8">
                            当サイトに関するご質問、ご要望、不具合の報告は、以下のお問い合わせフォームよりお願いいたします。
                        </p>

                        <div class="w-full min-h-[400px] flex items-center justify-center bg-slate-50 rounded-lg border border-slate-200 border-dashed">
                            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfRJqPAdZQEw94Dr_0NI4RvLgKoU0mC51Mtorh1IX3Y0ig_DA/viewform?embedded=true" class="w-full h-[750px] md:h-[985px]" frameborder="0" marginheight="0" marginwidth="0">読み込んでいます…</iframe>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
};
