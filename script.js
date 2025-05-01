const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];

// Show New Quote
const newQuote = () => {
    //Pick a random quote from apiQuotes array
    const newQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    // Check if author field is blank and replace it with 'Unknown'
    if (!quoteContainer.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = newQuote.author;
    }

    // Check Quote length to determine styling
    if (newQuote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = newQuote.text;
}

// Get Quotes From API
const getQuotes = async () => {
    try {
        const response = await fetch("https://jacintodesign.github.io/quotes-api/data/quotes.json")
        apiQuotes = await response.json()
        // console.log('api quotes: ', apiQuotes[12].text, 'author: ', apiQuotes[12].author);
        newQuote();
    } catch (err)  {
        console.log(err)
    }
}

// Tweet Quote
const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuotes();