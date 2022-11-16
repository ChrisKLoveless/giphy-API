import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

function getGif(keyword) {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${keyword}&limit=25&offset=0&rating=g&lang=en`;

  request.addEventListener("loadend", function () {
    const response = JSON.parse(this.responseText);
    let array = response.data;
    if (this.status === 200) {
      displayContent(keyword, array);
    }
  });
  request.open("GET", url, true);
  request.send();
}

const getTrend = () => {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=10&rating=g`;

  request.addEventListener("loadend", function () {
    const response = JSON.parse(this.responseText);
    let array = response.data;
    if (this.status === 200) {
      displayTrend(array);
    }
  });
  request.open("GET", url, true);
  request.send();
};


// UI Logic---------------------------------------------
function displayContent(keyword, array) {
console.log(keyword);
  document.getElementById("output").innerText = `Your search results for ${keyword} are ...`;

  array.forEach(function (element) {
    let imgElement = document.createElement("img");
    imgElement.setAttribute("src", element.images.fixed_width.url);
    document.getElementById("output").append(imgElement);
  }); 
}

function displayTrend(array) {

  document.getElementById("output").innerText = `Your trending GIF's are ...`;

  array.forEach(function (element) {
    let imgElement = document.createElement("img");
    imgElement.setAttribute("src", element.images.fixed_width.url);
    document.getElementById("output").append(imgElement);
  });
}

function handleFormSubmission(event) {
  event.preventDefault();

  const keyword = document.getElementById("input").value;
  document.getElementById("input").value = null;
  getGif(keyword);
}

function handleTrend(event) {
  event.preventDefault();
  getTrend();
}

window.addEventListener("load", function () {
  document.getElementById('form').addEventListener("submit", handleFormSubmission);
  document.getElementById("trend-btn").addEventListener("click", handleTrend);

});