from selenium import webdriver
from bs4 import BeautifulSoup
from typing import List

# TODO: should this be interactive through the terminal?


class WebScrapper:
    def __init__(self, url: str):
        self.url = url
        # fix this hardcoded path to make it portable to all OS
        self.driver = webdriver.Chrome(
            "/usr/lib/chromium-browser/chromedriver")
        self.tags = []

    def load_page(self) -> None:
        print("Loading page...")
        self.driver.get(self.url)

    def send_input(self,
                   input: str,
                   input_identifier: str,
                   strategy: str = "id") -> None:
        print("Sending input...")
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
        print("Submitting info...")
        if strategy == "id":
            self.driver.find_element_by_id(button_identifier).click()
        elif strategy == "form":
            btn = self.driver.find_element_by_xpath(
                '//*[@id="form-siding"]/input[3]')
            btn.click()
        else:
            self.driver.find_element_by_class_name(button_identifier).click()
        self.driver.close();
        self.driver.switch_to.window(self.driver.window_handles[0]);

    def scrap(self, tag: str) -> None:
        print("Scrapping...")
        self.bs = BeautifulSoup(self.driver.page_source,
                                features="html.parser")
        self.tags = self.bs.find_all(tag)

    def extract_links(self) -> None:
        print("Extracting links...")
        self.tags = list(filter(lambda x: x.string != None and x['href']!='#', self.tags))
        self.tags = list(map(lambda x: (x.string.strip(),x['href']), self.tags))
        with open('links.txt', 'w') as file:
            for c,tag in enumerate(self.tags):
                file.write(f"{c}: {tag}\n")
        self.driver.close();
