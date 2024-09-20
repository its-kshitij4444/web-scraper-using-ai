AI Web Scraper Project
Description:<br> This project is designed to scrape content from websites, process it using an AI model, and display the parsed results. It's built with Python, Flask, and JavaScript, and integrates with Ollama models for content parsing.

<hr>
Features
Scrape and parse content from websites.
AI-driven content extraction using the Ollama model.
Dynamic display of DOM content.
Local storage of parsed content for reuse.
<hr>
Installation
Clone the repository:<br>
git clone https://github.com/your-username/your-repo-name.git

Navigate to the project directory:<br>
cd your-repo-name

Install the required dependencies:<br>
pip install -r requirements.txt

Run the application locally:<br>
python app.py
<hr>

Usage
Load the site locally on http://127.0.0.1:5000.
Use the scraping tool to fetch DOM content.<br>
Click the Parse button to process the content using the AI model.<br>
The output will be displayed in the designated text area.
Note: Not for deployment purposes, only to be used locally.<br>

<hr>
Libraries Used <br>
Flask: Backend framework to handle API requests.<br>
Flask-CORS: Manages cross-origin requests.<br>
LangChain: Helps in managing the language models.<br>
LangChain Ollama: Integration with Ollama models.<br>
Selenium: Web scraping functionality.<br>
BeautifulSoup4: Parsing HTML and XML documents.<br>
lxml: XML and HTML parsing library.<br>
html5lib: HTML parsing library.<br>
python-dotenv: Manage environment variables securely.<br>
<hr>

### Credits
- The scraping logic and backend parts were adapted from a tutorial by <strong>Tech with Tim</strong> https://www.youtube.com/watch?v=Oo8-nEuDBkk

