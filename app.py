from flask import Flask, request, jsonify
from flask_cors import CORS
from scraper import scrape_website, extraction, cleaner, splitter
from parse import parser

app = Flask(__name__)
CORS(app)

@app.route('/scrape', methods=['POST'])
def scrape():
    data = request.get_json()
    url = data.get('url')

    if not url:
        return jsonify({"error": "No URL provided"}), 400

    # Scrape the website content
    html_content = scrape_website(url)

    # Extract the body content
    body_content = extraction(html_content)

    # Clean the extracted content
    cleaned_content = cleaner(body_content)

    # Split the cleaned content into chunks
    chunks = splitter(cleaned_content)

    # Return the chunks as JSON
    return jsonify({"content": chunks})

@app.route('/parse', methods=['POST'])
def parse():
    data = request.get_json()
    dom_chunks = data.get('dom_chunks')
    parse_description = data.get('parse_description')

    if not dom_chunks or not parse_description:
        return jsonify({"error": "Missing data"}), 400

    # Parse the content
    parsed_content = parser(dom_chunks, parse_description)

    # Return the parsed content as JSON
    return jsonify({"parsed_content": parsed_content})


if __name__ == '__main__':
    app.run(debug=True)
