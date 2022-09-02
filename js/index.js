const loadAllData = async () => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`;
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

    const data = await loadAllData();
    const categoriesData = data.data.news_category;

    const categoryDiv = document.getElementById('category-section');

    for (const category of categoriesData) {
        console.log(category.category_name);
        const categoryName = category.category_name;
        const div = document.createElement('div')
        div.innerHTML = `
            <h1>${categoryName}</h1>
        `;
        categoryDiv.appendChild(div)
    }

}

categoriesMenu();