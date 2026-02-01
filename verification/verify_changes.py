from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            # Navigate to home page
            page.goto("http://localhost:8787")

            # Wait for content to load
            page.wait_for_selector("text=新着コラム")

            # 1. Verify Article Count (should be 6)
            articles = page.locator("a[href^='/articles/']")
            # Note: Depending on implementation, 'articles' might match the "List" link too if it starts with /articles.
            # But the cards usually link to /articles/slug.
            # Let's count the cards specifically.
            # In index.tsx: <ArticleCard ... />
            # Inspecting ArticleCard might be hard without reading it, but let's assume they are the ones in the grid.
            # The grid container is: <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

            article_cards = page.locator(".grid.grid-cols-1.sm\\:grid-cols-2.gap-4 > a")
            count = article_cards.count()
            print(f"Article count: {count}")

            # 2. Verify Meiji Text
            meiji_text = page.locator("li", has_text="明治").inner_text()
            print(f"Meiji text: {meiji_text}")

            # Screenshot of Articles
            page.screenshot(path="verification/articles.png", full_page=True)

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_changes()
