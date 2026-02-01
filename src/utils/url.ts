// URL Constants
export const PRODUCTION_URL = 'https://solooo.dev';
export const DEVELOPMENT_URL = 'http://localhost:8787';

/**
 * 環境変数に基づいてベースURLを返します
 * @param env - ENVIRONMENT環境変数の値（'production' または undefined/その他）
 * @param path - オプションのパス（指定時はベースURLに連結）
 * @returns 完全なURL
 */
export function getBaseUrl(env?: string, path?: string): string {
    const baseUrl = env === 'production' ? PRODUCTION_URL : DEVELOPMENT_URL;
    return path ? `${baseUrl}${path}` : baseUrl;
}
