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
            <a class="cursor-pointer" onclick="categoryId(${category.category_id})">${categoryName}</a>
        `;
        categoryDiv.appendChild(div);

    });

}

const categoryId = id => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
    // console.log(url)
    try {
        fetch(url)
            .then(res => res.json())
            .then(data => displayNewsDetails(data.data))

    }
    catch (error) {
        console.log(error)
    }
    toggleSpinner(true);
}

const displayNewsDetails = (allNews) => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    // console.log(allNews)

    // news count for category 
    const totalNews = allNews.length;
    console.log(totalNews)
    const totalNewsContainer = document.getElementById('total-news');
    const noDataFound = document.getElementById('no-data-found');
    if (totalNews === 0) {
        noDataFound.classList.remove('hidden');
        totalNewsContainer.classList.add('hidden');
    }
    else {
        noDataFound.classList.add('hidden');
        totalNewsContainer.classList.remove('hidden')
    }
    totalNewsContainer.textContent = '';
    const totalNewsDiv = document.createElement('div')
    totalNewsDiv.innerHTML = `
        <h2>${totalNews} items found for this category </h2>
    `;
    totalNewsContainer.appendChild(totalNewsDiv);

    allNews.sort((a, b) => {
        return b.total_view - a.total_view;
    })

    allNews.forEach(news => {
        // console.log(news)
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
                <div class="card lg:card-side bg-base-100 shadow-xl mb-4">
        <figure><img class="w-full h-40" src="${news.image_url}" alt="Album"></figure>
        <div class="card-body">
            <h2 class="card-title">${news.title}</h2>
            <p>${news.details.slice(0, 300)}...</p>
            <div class="card-actions pt-4 justify-between">
           <div class="flex">
           <div class="pt-2">
           <img class="w-10 h-10 rounded-full" src="${news.author.img ? news.author.img : "No data found"}">
           </div>
           <div class="pl-2">
           <p>${news.author.name ? news.author.name : "No data found"}</p>
           <p>${news.author.published_date ? news.author.published_date : "No data found"}</p>
           </div>
           </div>
           <div>
           <p class="pt-4"><i class="fa-regular fa-eye"></i> ${news.total_view ? news.total_view : "No data Found"}</p>
           </div>
           <label onclick="newsDetailsId('${news._id} ')" for="my-modal" class="btn modal-button">Details</label>
            </div>
        </div>
        </div>
        `;
        newsContainer.appendChild(newsDiv);
    });
    toggleSpinner(false);
}

// news details modal 
const newsDetailsId = id => {
    console.log(id)
    const url = `https://openapi.programming-hero.com/api/news/${id}`

    try {
        fetch(url)
            .then(res => res.json())
            .then(data => newsDetailsModal(data.data[0]))
    }
    catch (error) {
        console.log(error);
    }
}

const newsDetailsModal = newsDetails => {
    console.log(newsDetails)
    const newsDetailBody = document.getElementById('news-detail-body');
    newsDetailBody.textContent = '';
    const newsModalDiv = document.createElement('div');
    newsModalDiv.innerHTML = `
        <img class="mb-2" src="${newsDetails.image_url}" alt="Album">
        <h3 class="font-bold text-lg">Author: ${newsDetails.author.name ? newsDetails.author.name : "No data found"}</h3>
        <p class="py-4">Publish Date: ${newsDetails.author.published_date ? newsDetails.author.published_date : "No data found"}</p>
        <p class="py-4">Title: ${newsDetails.title ? newsDetails.title : "No data found"}</p>
        <p class="py-4">Details: ${newsDetails.details}</p>
        <p class="py-4">Rating: Number - ${newsDetails.rating.number} & Badge - ${newsDetails.rating.badge}</p>
    
    `;
    newsDetailBody.appendChild(newsModalDiv);

}




// defult news section 
const defultNews = () => {
    const url = `https://openapi.programming-hero.com/api/news/category/08`;
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => defultNewsDisplay(data.data))
}

defultNews();

const defultNewsDisplay = (totalNews) => {
    // console.log(totalNews)
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    if (totalNews.length > 10) {
        totalNews = totalNews.slice(0, 10)
    }
    const allNews = totalNews.length;
    const totalNewsContainer = document.getElementById('total-news');

    totalNewsContainer.textContent = '';
    const totalNewsDiv = document.createElement('div')
    totalNewsDiv.innerHTML = `
        <h2>${allNews} items found for this category </h2>
    `;
    totalNewsContainer.appendChild(totalNewsDiv);
    const arr = [];

    totalNews.sort((a, b) => {
        return b.total_view - a.total_view;
    })
    totalNews.forEach(news => {
        // console.log(news)

        const newsDiv = document.createElement('div');
        const newsView = news.total_view;
        arr.push(newsView);
        // console.log(arr)

        console.log(arr)
        // console.log(newsView)
        newsDiv.innerHTML = `
            <div class="card lg:card-side bg-base-100 shadow-xl mb-4">
        <figure><img class="w-full h-40" src="${news.image_url}" alt="Album"></figure>
        <div class="card-body">
        <h2 class="card-title">${news.title}</h2>
        <p>${news.details.slice(0, 300)}...</p>
        <div class="card-actions pt-4 justify-between">
        <div class="flex">
        <div class="pt-2">
           <img class="w-10 h-10 rounded-full" src="${news.author.img ? news.author.img : "No data found"}">
           </div>
       <div class="pl-2">
       <p>${news.author.name ? news.author.name : "No data found"}</p>
       <p>${news.author.published_date ? news.author.published_date : "No data found"}</p>
       </div>
       </div>
       <div>
       <p class="pt-4"><i class="fa-regular fa-eye"></i> ${news.total_view ? news.total_view : "No Data Found"}</p>
       </div>
       <label onclick="newsDetailsId('${news._id} ')" for="my-modal" class="btn modal-button">Details</label>
        </div>
    </div>
    </div>
    `;
        newsContainer.appendChild(newsDiv);
    });

}


// spinner 

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('hidden');
    }
    else {
        loaderSection.classList.add('hidden')
    }
}

categoriesMenu();

// defultNewsDisplay();

