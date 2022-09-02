const loadCategoriesData = async () => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`;
        // const url1 = `https://openapi.programming-hero.com/api/news/category/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }
    catch (error) {
        console.log(error);
    }
}


// category menu section
const categoriesMenu = async () => {

    const data = await loadCategoriesData();
    const categoriesData = data.data.news_category;

    const categoryDiv = document.getElementById('category-section');

    categoriesData.forEach(category => {
        // console.log(category);
        const categoryName = category.category_name;

        // console.log(categoryId)
        const div = document.createElement('div')
        div.innerHTML = `
            <h1 class="cursor-pointer" onclick="categoryId(${category.category_id})">${categoryName}</h1>
        `;
        categoryDiv.appendChild(div)
    });

}

const categoryId = id => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data))
}

const displayNewsDetails = (allNews) => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    // console.log(allNews)

    // news count for category 
    const totalNews = allNews.length;
    console.log(totalNews)
    const totalNewsContainer = document.getElementById('total-news');
    totalNewsContainer.textContent = '';
    const totalNewsDiv = document.createElement('div')
    totalNewsDiv.innerHTML = `
        <h2>${totalNews} items found for this category </h2>
    `;
    totalNewsContainer.appendChild(totalNewsDiv);

    allNews.forEach(news => {

        console.log(news)
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
                <div class="card lg:card-side bg-base-100 shadow-xl">
        <figure><img class="w-full h-40" src="${news.image_url}" alt="Album"></figure>
        <div class="card-body">
            <h2 class="card-title">${news.title}</h2>
            <p>${news.details.slice(0, 300)}...</p>
            <div class="card-actions pt-4 justify-between">
           <div class="flex">
           <img class="w-10 h-10 rounded-full" src="${news.author.img}">
           <div class="pl-2">
           <p>${news.author ? news.author.name : "No data found"}</p>
           <p>${news.author ? news.author.published_date : "No data found"}</p>
           </div>
           </div>
           <div>
           <p>Views: ${news.total_view}</p>
           </div>
            <button class="btn btn-primary">Details</button>
            </div>
        </div>
        </div>
        `;
        newsContainer.appendChild(newsDiv);
    });
}


const defultNews = () => {
    const url = `https://openapi.programming-hero.com/api/news/category/08`;
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => defultNewsDisplay(data.data))
}

defultNews();

const defultNewsDisplay = (totalNews) => {
    console.log(totalNews)
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';

    if (totalNews.length > 10) {
        totalNews = totalNews.slice(0, 10)
    }

    totalNews.forEach(news => {

        console.log(news)
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
            <div class="card lg:card-side bg-base-100 shadow-xl mb-4">
    <figure><img class="w-full h-40" src="${news.image_url}" alt="Album"></figure>
    <div class="card-body">
        <h2 class="card-title">${news.title}</h2>
        <p>${news.details.slice(0, 300)}...</p>
        <div class="card-actions pt-4 justify-between">
       <div class="flex">
       <img class="w-10 h-10 rounded-full" src="${news.author.img}">
       <div class="pl-2">
       <p>${news.author ? news.author.name : "No data found"}</p>
       <p>${news.author ? news.author.published_date : "No data found"}</p>
       </div>
       </div>
       <div>
       <p>Views: ${news.total_view}</p>
       </div>
        <button class="btn btn-primary">Details</button>
        </div>
    </div>
    </div>
    `;
        newsContainer.appendChild(newsDiv);
    });

}

categoriesMenu();

// defultNewsDisplay();

