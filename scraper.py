import selenium.webdriver as webdriver
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup

def scrape_website(website):
    print("Launching chrome browser..")
    driver_path = "./chromedriver.exe"
    opt = webdriver.ChromeOptions()
    driver = webdriver.Chrome(service=Service(driver_path), options=opt)
    
    try:
        driver.get(website)
        print("Page loaded..")
        html = driver.page_source

        return html
    
    finally:
        driver.quit()

def extraction(content):
    soup = BeautifulSoup(content,"html.parser")
    bodycontent = soup.body
    if bodycontent:
        return str(bodycontent)
    return ""

def cleaner(bodycontent):
    soup = BeautifulSoup(bodycontent,"html.parser")
    for scrsty in soup(["script","style"]):
        scrsty.extract()
    
    clean=soup.get_text(separator="\n")
    clean="\n".join(line.strip() for line in clean.splitlines() if line.strip())
    return clean

def splitter(dom,maxlen=6000):
    return [dom[i : i+maxlen] for i in range(0,len(dom),maxlen)]