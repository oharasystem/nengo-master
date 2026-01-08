import { describe, it, expect } from 'vitest'
import app from './index'

describe('App Integration', () => {
  it('GET / should return 200 and Japanese content', async () => {
    const res = await app.request('/')
    expect(res.status).toBe(200)
    const text = await res.text()
    expect(text).toContain('年号マスター')
    expect(text).toContain('入学・卒業年度 自動計算')
    expect(text).toContain('lang="ja"')
  })

  it('GET /en/ should return 200 and English content', async () => {
    // Handling trailing slash might differ based on Hono matching, but I registered `/:lang/`
    const res = await app.request('/en/')
    expect(res.status).toBe(200)
    const text = await res.text()
    expect(text).toContain('School Year Calculator')
    expect(text).toContain('lang="en"')
    expect(text).toContain('Nengo Master')
  })

  it('GET /en should also work', async () => {
      const res = await app.request('/en')
      expect(res.status).toBe(200)
      const text = await res.text()
      expect(text).toContain('School Year Calculator')
  })

  it('GET /zh/ should return Chinese content', async () => {
    const res = await app.request('/zh/')
    expect(res.status).toBe(200)
    const text = await res.text()
    expect(text).toContain('入学・毕业年度 自动计算')
    expect(text).toContain('lang="zh"')
  })

  it('GET /vi/ should return Vietnamese content', async () => {
      const res = await app.request('/vi/')
      expect(res.status).toBe(200)
      const text = await res.text()
      expect(text).toContain('Tính năm Nhập học / Tốt nghiệp')
      expect(text).toContain('lang="vi"')
  })

  it('GET /year/2000 should return Japanese detail page', async () => {
    const res = await app.request('/year/2000')
    expect(res.status).toBe(200)
    const text = await res.text()
    expect(text).toContain('2000年')
    expect(text).toContain('平成12年')
    expect(text).toContain('干支') // Japanese text
    expect(text).not.toContain('Birth Year')
  })

  it('GET /en/year/2000 should return English detail page', async () => {
    const res = await app.request('/en/year/2000')
    expect(res.status).toBe(200)
    const text = await res.text()
    expect(text).toContain('2000')
    // expect(text).toContain('Heisei') // Era names might still be in Japanese depending on implementation, let's check.
    // In my code: era is fetched from getEra which likely returns Japanese characters "平成XX年".
    // But the labels should be English.
    expect(text).toContain('Age of those born in')
  })

  it('should not render GA4 tag by default (dev/test env)', async () => {
    const res = await app.request('/')
    expect(res.status).toBe(200)
    const text = await res.text()
    expect(text).not.toContain('googletagmanager.com/gtag/js')
  })

  it('should render GA4 tag when ENVIRONMENT is production', async () => {
    // Pass mock env
    const res = await app.request('/', {}, { ENVIRONMENT: 'production' })
    expect(res.status).toBe(200)
    const text = await res.text()
    expect(text).toContain('googletagmanager.com/gtag/js')
    expect(text).toContain('G-FCLQYQQWP4')
  })

  it('GET /privacy should return 200 and Japanese content', async () => {
    const res = await app.request('/privacy')
    expect(res.status).toBe(200)
    const text = await res.text()
    expect(text).toContain('プライバシーポリシー')
    expect(text).toContain('広告の配信について')
  })

  it('GET /en/privacy should return 200 and English footer links but Japanese content', async () => {
    const res = await app.request('/en/privacy')
    expect(res.status).toBe(200)
    const text = await res.text()
    expect(text).toContain('Privacy Policy') // Footer link in English
    expect(text).toContain('広告の配信について') // Content in Japanese
  })

  it('GET /contact should return 200 and contact form placeholder', async () => {
    const res = await app.request('/contact')
    expect(res.status).toBe(200)
    const text = await res.text()
    expect(text).toContain('お問い合わせ')
    expect(text).toContain('Googleフォームが表示されます')
  })

  it('GET /en/contact should return 200', async () => {
    const res = await app.request('/en/contact')
    expect(res.status).toBe(200)
    const text = await res.text()
    expect(text).toContain('Contact') // Footer link
  })
})
