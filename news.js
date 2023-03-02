// global scope
let fetchData=[];

const loadCatagories=()=>{
     const url='https://openapi.programming-hero.com/api/news/categories'
     fetch(url)
     .then(res=> res.json())
     .then(data=>displayCatagories(data.data))
}
const displayCatagories=catagories=>{
     // console.log(catagories);
     const catagoriesContainer=document.getElementById('categories-container')   
     catagories.news_category.forEach(singleCategory => {
          // console.log(singleCategory);
          catagoriesContainer.innerHTML+=`
          <a class="nav-link" href="#"onclick="categoryAllNews('${singleCategory.category_id}','${singleCategory.category_name}')">${singleCategory.category_name}</a>
          `
     }); 
}    
const categoryAllNews=(category_id,category_name)=>{
     // console.log(category_id)
     const url=`https://openapi.programming-hero.com/api/news/category/${category_id}`
     fetch(url)
     .then(res=> res.json())
     .then(news=>{ 
      fetchData=news.data
      showAllNews(news.data,category_name)
    })
}
const showAllNews=(news,category_name)=>{
     // console.log(news,category_name)
     document.getElementById('news-count').innerText=news.length;
     document.getElementById('categories-name').innerText=category_name;

     const allNewsContainer=document.getElementById('all-news');
     allNewsContainer.innerHTML='';
     news.forEach(singleNews =>{
          console.log(singleNews);
          // destructuring =we can use value by this
          const{_id,image_url,title,details,author,total_view,rating}=singleNews;
          allNewsContainer.innerHTML+=`
          <div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${image_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8 d-flex flex-column">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${details.slice(0,200)}</p>
              </div>
              <div class="card-footer border-0 bg-body d-flex justify-content-between align-items-center">
                    <div class="gap-2">
                    <img src="${author.img}" class="img-fluid rounded-circle alt="..."height=""40 width="40">
                    <p class="m-0 p-0">${author.name ? author.name :"Not available"}</p>
                    <p class="m-0 p-0">${author.published_date}</p>
                    </div>
                    <div class="d-flex align-items-center">
                    <i class="fa-sharp fa-solid fa-eye"></i>
                    <p>${total_view ? total_view : "Not available"}</p>
                    </div>
                    <div class="d-flex">
                    ${generateStar(rating.number)}
                    <p>${rating.number}</p>
                    </div>
                    <div>
                    <i onclick="loadNewsData('${_id}')" class="fa-sharp fa-solid fa-arrow-right text-primary "data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                    </div>
              </div>
            </div>
          </div>
        </div>
           `
     })   
}

// Modal Section
const loadNewsData=news_id=>{
     const url=`https://openapi.programming-hero.com/api/news/${news_id}`
     fetch(url)
     .then(res =>res.json())
     .then(data => showNewsData(data.data[0]))
     .catch(error=>console.log(error))
}
const showNewsData=data=>{
  const{image_url,title,details,author,total_view,rating,others_info}=data;
     document.getElementById('modal-body').innerHTML=`
     <div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-12">
              <img src="${image_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-12 d-flex flex-column">
              <div class="card-body">
                <h5 class="card-title">${title}<span class="badge text-bg-warning">${others_info.is_trending?"Trending":"Not trending"}</span></h5>
                <p class="card-text">${details}</p>
              </div>
              <div class="card-footer border-0 bg-body d-flex justify-content-between align-items-center">
                    <div class="gap-2">
                    <img src="${author.img}" class="img-fluid rounded-circle alt="..."height=""40 width="40">
                    <p class="m-0 p-0">${author.name ? author.name :"Not available"}</p>
                    <p class="m-0 p-0">${author.published_date}</p>
                    </div>
                    <div class="d-flex align-items-center">
                    <i class="fa-sharp fa-solid fa-eye"></i>
                    <p>${total_view ? total_view : "Not available"}</p>
                    </div>
                    <div class="d-flex">
                    ${generateStar(rating.number)}
                    <p>${rating.number}</p>
                    </div>
              </div>
            </div>
          </div>
        </div>
     `
}    
// Show today's pick

// Show trending news
const showTrending=()=>{
  const categoriesName=document.getElementById('categories-name').innerText;
  let trendingNews=fetchData.filter(singleNews=> singleNews.others_info.is_trending===true)
  showAllNews(trendingNews,categoriesName);
}

// generating rating
const generateStar=rating=>{
  let ratingHTML='';
  for(let i=1; i<=Math.floor(rating); i++){
    ratingHTML+=`<i class="fa-sharp fa-solid fa-star"></i>`
  }
  if(rating-Math.floor(rating)>0){
    ratingHTML+=`<i class="fa-sharp fa-solid fa-star-half"></i>`
  }
  return ratingHTML;
}