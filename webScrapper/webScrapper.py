from selenium import webdriver
from bs4 import BeautifulSoup
from typing import List
from sys import stdout
from webdriver_manager.chrome import ChromeDriverManager

class WebScrapper:

    def __init__(self, url: str):
        self.url = url
        try:
            self.driver = webdriver.Chrome(
                "/usr/lib/chromium-browser/chromedriver")
        except:
            self.driver = webdriver.Chrome(ChromeDriverManager().install())
        self.tags = []

    def load_page(self) -> None:
        stdout.write("WebScrapper@load_page: Loading page...\n")
        self.driver.get(self.url)

    def send_input(self,
                   input: str,
                   input_identifier: str,
                   strategy: str = "id") -> None:
        stdout.write("WebScrapper@send_input: Sending input...")
        try:
            if strategy == "id":
                self.driver.find_element_by_id(input_identifier).send_keys(
                    input)
            else:
                self.driver.find_element_by_class_name(
                    input_identifier).send_keys(input)
        except Exception as e:
            stdout.write(
                    "WebScrapper@send_input: The following error ocurred when finding element and sending keys:"
                % str(e))

    def submit(self, button_identifier: str, strategy: str = "id") -> None:
        stdout.write("WebScrapper@submit: submitting info...")
        if strategy == "id":
            self.driver.find_element_by_id(button_identifier).click()
        elif strategy == "form":
            btn = self.driver.find_element_by_xpath(
                '//*[@id="form-siding"]/input[3]')
            btn.click()
        else:
            self.driver.find_element_by_class_name(button_identifier).click()
        self.driver.close()
        self.driver.switch_to.window(self.driver.window_handles[0])

    def scrap(self, tag: str) -> None:
        stdout.write("WebScrapper@submit: Scrapping...")
        self.bs = BeautifulSoup(self.driver.page_source,
                                features="html.parser")
        self.tags = self.bs.find_all(tag)

    def extract_links(self) -> None:
        stdout.write("WebScrapper@extract_links: Extracting links...")
        self.tags = list(
            filter(lambda x: x.string != None and x['href'] != '#', self.tags))
        self.tags = list(
            map(lambda x: (x.string.strip(), x['href']), self.tags))
        with open('links.txt', 'w') as file:
            for tag in self.tags:
                # is this json like format?
                file.write(f'{tag[0]}: {tag[1]},')
        self.driver.close()
