const apiKey = process.env.NEWS_API_KEY;
const url = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`

async function fetchNews() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      // TODO: Add a function call to display the news
      displayNews(data.articles);
    } catch (error) {
      console.error('There was an error!', error);
    }
  }
  
  fetchNews();

  function displayNews(articles) {

    for(const article of articles) {

      // Create the outer card div element
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card", "mb-3", "shadow", "p-3", "mb-5", "bg-body", "rounded");

      // Create the image element and set its attributes
      const imgElement = document.createElement("img");
      imgElement.classList.add("card-img-top");
      imgElement.src = `${article.urlToImage}`; // Set the source attribute to the desired URL
      imgElement.alt = "Card image cap";

      // Create the card body div element
      const cardBodyDiv = document.createElement("div");
      cardBodyDiv.classList.add("card-body");

      // Create the card title element and set its text content
      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      cardTitle.textContent = article.title;

      // Create the first card text element and set its text content
      const cardText1 = document.createElement("p");
      cardText1.classList.add("card-text");
      cardText1.textContent = article.description;

      // Create the second card text element with the small text-muted element and link inside and set its text content
      const cardText2 = document.createElement("p");
      cardText2.classList.add("card-text");
      const smallText = document.createElement("small");
      smallText.classList.add("text-muted");
      const time = new Date(article.publishedAt).toDateString(); 
      smallText.textContent = `By ${article.author} on ${time}`;
      cardText2.appendChild(smallText);

      //add link to article
      const externalLink = document.createElement("a");
      externalLink.href = `${article.url}`;
      externalLink.target = '_blank';
      externalLink.title = `${article.url}`;
      externalLink.text = "Read More";
      externalLink.classList.add("btn", "btn-primary");

      // Append the created elements to the cardDiv and cardBodyDiv
      cardDiv.appendChild(imgElement);
      cardDiv.appendChild(cardBodyDiv);
      cardBodyDiv.appendChild(cardTitle);
      cardBodyDiv.appendChild(cardText1);
      cardBodyDiv.appendChild(cardText2);
      cardBodyDiv.appendChild(externalLink);

      // Add the cardDiv to the news container
      const container = document.querySelector("#news");
      container.appendChild(cardDiv);
    }
  }