const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

const showLoadingSpinner = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const removeLoadingSpinner = () => {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

const showNewQuote = () => {
    showLoadingSpinner();
    //Pick a random quote from apiQuotes array
    const newQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    // Check if author field is blank and replace it with 'Unknown'
    if (!newQuote.author) {
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
    removeLoadingSpinner();
}

const getApiQuotes = async () => {
    showLoadingSpinner();
    try {
        const response = await fetch("https://jacintodesign.github.io/quotes-api/data/quotes.json")
        apiQuotes = await response.json()
        showNewQuote();
    } catch (err)  {
        console.log(err)
    }
}

const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuotes();