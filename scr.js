document.getElementById('scrapeButton').addEventListener('click', function() {
        const url = document.getElementById('urlInput').value;
        const resultDiv = document.getElementById('result');
        // Show "Scraping the website" message
        const statusMessageDiv = document.getElementById('statusMessage');
        statusMessageDiv.innerText = "Scraping the website";

        // Send the URL to the Flask backend
        fetch('http://127.0.0.1:5000/scrape', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: url }),
        })
        .then(response => response.json())
        .then(data => {
            // Clear the status message
            statusMessageDiv.innerText = "";

            // Display the scraped content
            // const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = ""; // Clear previous content

            if (data.content) {
                // Store the content in localStorage for later access
                localStorage.setItem('domContent', JSON.stringify(data.content));

                // Display each part of the split content
                data.content.forEach((part, index) => {
                    const partElement = document.createElement('div');
                    partElement.className = 'part'; // Add a class for styling
                    partElement.innerHTML = `Part ${index + 1}:\n${part}`;
                    resultDiv.appendChild(partElement);
                });
                alert('Scraping has been done. Use the "Show DOM Content" button to view the content.');
            } else {
                resultDiv.innerText = "No content returned from the server.";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            statusMessageDiv.innerText = "Error occurred. Check console.";
        });
    });

document.getElementById('parseButton').addEventListener('click', function() {
    const parseDescription = document.getElementById('parseDescription').value;
    const parsedContentDiv = document.getElementById('parsedContent');
    const domContent = localStorage.getItem('domContent');

    if (domContent) {
        const domChunks = JSON.parse(domContent);
        fetch('http://127.0.0.1:5000/parse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ dom_chunks: domChunks, parse_description: parseDescription }),
        })
        .then(response => response.json())
        .then(data => {
            // Clear previous parsed content
            parsedContentDiv.innerHTML = "";

            // Display the parsed content
            if (data.parsed_content) {
                const parsedElement = document.createElement('div');
                parsedElement.className = 'parsed';
                parsedElement.innerHTML = data.parsed_content;
                parsedContentDiv.appendChild(parsedElement);
            } else {
                parsedContentDiv.innerText = "No content parsed.";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            parsedContentDiv.innerText = "Error occurred. Check console.";
        });
    } else {
        alert('No DOM content available to parse.');
    }
});

document.getElementById('expandButton').addEventListener('click', function() {
    const resultDiv = document.getElementById('result');
    const button = document.getElementById('expandButton');

    if (resultDiv.style.display === 'none' || resultDiv.style.display === '') {
        // Show the result div
        resultDiv.style.display = 'block';
        button.innerText = 'Hide DOM Content';
    } else {
        // Hide the result div
        resultDiv.style.display = 'none';
        button.innerText = 'Show DOM Content';
    }
});