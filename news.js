const loadCatagories=()=>{
     const url='https://openapi.programming-hero.com/api/news/categories'
     fetch(url)
     .then(res=> res.json())
     .then(data=>displayCatagories(data.data))
}
const displayCatagories=catagories=>{
     // console.log(catagories);
     const catagoriesContainer=document.getElementById('categories-container')   
     catagories.news_category.forEach(singleCatagory => {
          // console.log(singleCatagory);
          catagoriesContainer.innerHTML+=`
          <a class="nav-link" href="#"onclick="categoryAllNews('${singleCatagory.category_id}','${singleCatagory.category_name}')">${singleCatagory.category_name}</a>
          `
     }); 
}    
const categoryAllNews=(catergory_id,category_name)=>{
     // console.log(catergory_id)
     const url=`https://openapi.programming-hero.com/api/news/category/${catergory_id}`
     fetch(url)
     .then(res=> res.json())
     .then(news=> showAllNews(news.data,category_name))
}
const showAllNews=(news,category_name)=>{
     console.log(news,category_name)
     document.getElementById('news-count').innerText=news.length;
     document.getElementById('categories-name').innerText=category_name;
}