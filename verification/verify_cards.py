from playwright.sync_api import sync_playwright

def verify_articles(page):
    # Visit the home page
    print("Navigating to home page...")
    page.goto("http://localhost:8787")

    # Wait for the article section to be visible
    # The article section is conditionally rendered if articles exist.
    # We look for "新着コラム" (New Columns) heading or an article card.

    # Increase viewport to capture more content
    page.set_viewport_size({"width": 1280, "height": 1200})

    print("Waiting for content...")
    page.wait_for_selector("text=新着コラム", timeout=5000)

    # Screenshot the home page articles section
    print("Taking home page screenshot...")
    page.screenshot(path="verification/home_articles.png")

    # Visit the articles index page
    print("Navigating to articles index...")
    page.goto("http://localhost:8787/articles")
    page.wait_for_selector("text=コラム一覧")

    # Screenshot the index page
    print("Taking index page screenshot...")
    page.screenshot(path="verification/index_articles.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_articles(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
