// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading. 
function fetchQuotes(){
    fetch(`http://localhost:3000/quotes?_embed=likes`)
    .then(response => response.json())
    .then(data => renderQuotes(data)); 
}

function renderQuotes(data){
    data.forEach(quote => {
        renderQuote(quote); 
    })
}

function renderQuote(quote){
    const ul = document.querySelector('#quote-list');

    const li = document.createElement('li');
    li.className = 'quote-card'; 
        
    const bq = document.createElement('blockquote'); 
    bq.className = 'blockquote'; 

    const p = document.createElement('p'); 
    p.className = 'mb-0'; 
    p.innerText = quote.quote; 

    const f = document.createElement('footer'); 
    f.className = 'blockquote-footer'; 
    f.innerText = quote.author; 

    const br = document.createElement('br'); 

    const likes = document.createElement('button'); 
    likes.className = 'btn-success';
    likes.innerText = "Likes: "; 

    const s = document.createElement('span'); 
    s.innerText = quote.likes.length; 

    likes.appendChild(s); 

    const d = document.createElement('button'); 
    d.className = 'btn-danger'; 
    d.innerText = "Delete"; 

    bq.appendChild(p); 
    bq.appendChild(f); 
    bq.appendChild(br); 
    bq.appendChild(likes); 
    bq.appendChild(d); 
    li.appendChild(bq); 
    ul.appendChild(li); 
}

function handleNewQuote(event){
    event.preventDefault(); 
    const formData = grabData(); 
    postQuote(formData); 
}

function postQuote(formData){
    const req = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(formData)
    }

    fetch("http://localhost:3000/quotes?_embed=likes", req)
    .then(response => response.json())
    .then(data => {
        renderQuote(data); 
    })
}




function grabData(){
    const quote = document.querySelector('#new-quote').value; 
    const author = document.querySelector('#author').value; 
    const likes = []; 
    return { quote, author, likes }; 
}








function main(){
    const newQuote = document.querySelector('#new-quote-form'); 
    const deleteQuote = document.querySelector('btn-danger'); 
    document.addEventListener('DOMContentLoaded', () => {
        fetchQuotes(); 
    })

    newQuote.addEventListener('click', event => handleNewQuote(event)); 
    // deleteQuote.addEventListener('click', event => ...)
}

main(); 
