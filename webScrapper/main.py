from webScrapper import WebScrapper

if __name__ == "__main__":
    scrapper = WebScrapper("https://www.ing.uc.cl/")
    scrapper.load_page()
    with open("credentials.txt", "r") as f:
        # siding username
        scrapper.send_input(f.readline().strip(),"user-siding", "id")
        # siding password
        scrapper.send_input(f.readline().strip(),"password-siding", "id")
    # search for the btn inside the siding form
    scrapper.submit("btn", "form")
    # scrap for "a" tags
    scrapper.scrap("a")
    # select only those with inner text and href attribute (different from "#")
    scrapper.extract_links()
