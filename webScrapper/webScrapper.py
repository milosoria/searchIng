from selenium import webdriver
from beautifulsoup4 import BeautifulSoup
import typing

# password-siding
# user-siding
# "https://www.ing.uc.cl/"

# TODO: should this be interactive through the terminal?


class WebScrapper:
    def __init__(self, url: str):
        self.url = url
        # fix this hardcoded path to make it portable to all OS
        self.driver = webdriver.Chrome(
            "/usr/lib/chromium-browser/chromedriver")
        self.loaded = False

    def load_page(self) -> None:
        self.driver.get(self.url)
        self.bs = BeautifulSoup(self.driver.page_source)

    def send_input(self,
                   input: str,
                   input_identifier: str,
                   strategy: str = "id") -> None:
        try:
            if strategy == "id":
                self.driver.find_element_by_id(input_identifier).send_keys(
                    input)
            else:
                self.driver.find_element_by_class_name(
                    input_identifier).send_keys(input)
        except Exception as e:
            print(
                "The following error ocurred when finding element and sending keys:"
                % str(e))

    def submit(self, button_identifier: str, strategy: str = "id") -> None:
        if strategy == "id":
            self.driver.find_element_by_id(button_identifier).click()
        else:
            self.driver.find_element_by_class_name(button_identifier).click()

    def scrap(self, tags: list[str], ref_str: str) -> list[str]:
        # tags example: ["a","form"]
        # ref_str to lead scrapping, for example "www"

        # self.bs.html.find_all ?
        return list(filter(lambda x: ref_str in x.string,
                               self.bs.find_all(tags)))

    def extract(self, filtered_tags : list[str]) -> None:
        pass
