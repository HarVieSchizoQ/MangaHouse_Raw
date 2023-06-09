const trendAnimeList = [
    {
        img: "img/anime-1.png",
        title: "Gintama Movie 2: Kanketsu-hen - Yorozuya yo Eien Nare" 
    },
    {
        img: "img/anime-2.png",
        title: "Gintama Movie 2: Kanketsu-hen - Yorozuya yo Eien Nare"
    },
    {
        img: "img/anime-3.png",
        title: "Gintama Movie 2: Kanketsu-hen - Yorozuya yo Eien Nare"
    },
    {
        img: "img/anime-4.png",
        title: "Gintama Movie 2: Kanketsu-hen - Yorozuya yo Eien Nare"
    },
    {
        img: "img/anime-5.png",
        title: "Gintama Movie 2: Kanketsu-hen - Yorozuya yo Eien Nare"
    },
    {
        img: "img/anime-6.png",
        title: "Gintama Movie 2: Kanketsu-hen - Yorozuya yo Eien Nare"
    }
]

// const popularAnimeList = [
//     {
//         img: "img/anime-1.png",
//         title: "Gintama Movie 2: Kanketsu-hen - Yorozuya yo Eien Nare" 
//     },
//     {
//         img: "img/anime-2.png",
//         title: "Gintama Movie 2: Kanketsu-hen - Yorozuya yo Eien Nare"
//     },
//     {
//         img: "img/anime-3.png",
//         title: "Gintama Movie 2: Kanketsu-hen - Yorozuya yo Eien Nare"
//     },
//     {
//         img: "img/anime-4.png",
//         title: "Gintama Movie 2: Kanketsu-hen - Yorozuya yo Eien Nare"
//     },
//     {
//         img: "img/anime-5.png",
//         title: "Gintama Movie 2: Kanketsu-hen - Yorozuya yo Eien Nare"
//     },
//     {
//         img: "img/anime-6.png",
//         title: "Gintama Movie 2: Kanketsu-hen - Yorozuya yo Eien Nare"
//     }
// ]


// const topViewAnimeList = [
//     {
//         img: "img/anime-1.png",
//         title: "Gintama Movie 2: Kanketsu-hen - Yorozuya yo Eien Nare" 
//     },
//     {
//         img: "img/anime-2.png",
//         title: "Gintama Movie 2: Kanketsu-hen - Yorozuya yo Eien Nare"
//     },
//     {
//         img: "img/anime-3.png",
//         title: "Gintama Movie 2: Kanketsu-hen - Yorozuya yo Eien Nare"
//     },
//     {
//         img: "img/anime-4.png",
//         title: "Gintama Movie 2: Kanketsu-hen - Yorozuya yo Eien Nare"
//     },
//     {
//         img: "img/anime-5.png",
//         title: "Gintama Movie 2: Kanketsu-hen - Yorozuya yo Eien Nare"
//     },
//     {
//         img: "img/anime-6.png",
//         title: "Gintama Movie 2: Kanketsu-hen - Yorozuya yo Eien Nare"
//     }
// ]



//SELECTORS
const trendAnime = document.querySelector(".trend-anime");
const popularAnime = document.querySelector(".popular-anime");
const topViewAnime = document.querySelector(".top-anime");

//EVENT LISTENERS
window.addEventListener("DOMContentLoaded", function() {
    renderAnime(trendAnimeList, trendAnime);
    renderAnime(trendAnimeList, popularAnime);
    renderAnime(trendAnimeList, topViewAnime);
})

//FUNCTIONS

function renderAnime(animes, content) {
    let displayAnime = animes.map(function(list)  {
        return  `
               <a href="manga.html">
                   <div class="anime">
                        <div class="img-wrap">
                            <img src=${list.img} class="img"alt="">
                            <div class="actions">
                                <button id="rating">18/20</button>
                                <button id="comment"><i class="fa-solid fa-comment" ></i> 21</button>
                                <button id="view"><i class="fa-sharp fa-solid fa-eye"></i> 1000</button>
                            </div>
                        </div>
                        <div class="category">
                            <button class="cat">Active</button>
                            <button class="cat">Movie</button>
                        </div>
                        <h4 class="title">${list.title}</h4>
                    </div>
               </a>
                `
    })
    displayAnime = displayAnime.join("");
    content.innerHTML = displayAnime;
}







/*PDF*/

const url = '1.pdf';



let pdfDoc = null,
  pageNum = 1,
  pageIsRendering = false,
  pageNumIsPending = null;

const scale = 1.5,
  canvas = document.querySelector('#pdf-render'),
  ctx = canvas.getContext('2d');

// Render the page
const renderPage = num => {
  pageIsRendering = true;

  // Get page
  pdfDoc.getPage(num).then(page => {
    // Set scale
    const viewport = page.getViewport({ scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderCtx = {
      canvasContext: ctx,
      viewport
    };

    page.render(renderCtx).promise.then(() => {
      pageIsRendering = false;

      if (pageNumIsPending !== null) {
        renderPage(pageNumIsPending);
        pageNumIsPending = null;
      }
    });

    // Output current page
    document.querySelector('#page-num').textContent = num;
  });
};

// Check for pages rendering
const queueRenderPage = num => {
  if (pageIsRendering) {
    pageNumIsPending = num;
  } else {
    renderPage(num);
  }
};

// Show Prev Page
const showPrevPage = () => {
  if (pageNum <= 1) {
    return;
  }
  pageNum--;
  queueRenderPage(pageNum);
};

// Show Next Page
const showNextPage = () => {
  if (pageNum >= pdfDoc.numPages) {
    return;
  }
  pageNum++;
  queueRenderPage(pageNum);
};

// Get Document
pdfjsLib
  .getDocument(url)
  .promise.then(pdfDoc_ => {
    pdfDoc = pdfDoc_;

    document.querySelector('#page-count').textContent = pdfDoc.numPages;

    renderPage(pageNum);
  })
  .catch(err => {
    // Display error
    const div = document.createElement('div');
    div.className = 'error';
    div.appendChild(document.createTextNode(err.message));
    document.querySelector('body').insertBefore(div, canvas);
    // Remove top bar
    document.querySelector('.top-bar').style.display = 'none';
  });

// Button Events
document.querySelector('#prev-page').addEventListener('click', showPrevPage);
document.querySelector('#next-page').addEventListener('click', showNextPage);