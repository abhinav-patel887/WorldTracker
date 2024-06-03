const API_KEY="pub_45361695c12fc36aa84589c6c69e2fb33b32f";
const url="https://api.thenewsapi.com/v1/news/top?api_token=hGKoclhRnNlssJyrQun60nYldikHLO8MvO2W220e&locale=us&limit=3";
window.addEventListener('load',()=>fetchNews());
function reload(){
    window.location.reload();
}
// document.getElementById("technology").addEventListener('click',(event)=>{
//     console.log("technology ochadu");
//     async function fetchNews(){
//         const response= await fetch("https://newsapi.org/v2/everything?q=technology&from=2024-05-01&sortBy=publishedAt&apiKey=c28551e6e0d148a5a90d58c52c956120");
//         const inf= await response.json();
//         FbindData(inf.data);
       
//     }
// })
// document.getElementById("business").addEventListener('click',(event)=>{
//     console.log("business ochadu");
//     async function fetchNews(){
//         const response= await fetch("https://newsapi.org/v2/top-headlines/sources?category=businessapiKey=API_KEY");
//         const inf= await response.json();
//         FbindData(inf.data);
       
//     }
// })
// document.getElementById("national").addEventListener('click',(event)=>{
//     console.log("national ochadu");
//     async function fetchNews(){
//         const response= await fetch("https://newsapi.org/v2/everything?q=national&from=2024-05-01&sortBy=publishedAt&apiKey=c28551e6e0d148a5a90d58c52c956120");
//         const inf= await response.json();
//         FbindData(inf.data);
       
//     }
// })
// document.getElementById("international").addEventListener('click',(event)=>{
//     console.log("international ochadu");
//     async function fetchNews(){
//         const response= await fetch("https://newsapi.org/v2/everything?q=international&from=2024-05-01&sortBy=publishedAt&apiKey=c28551e6e0d148a5a90d58c52c956120");
//         const inf= await response.json();
//         FbindData(inf.data);
       
//     }
// })
// document.getElementById("sports").addEventListener('click',(event)=>{
//     console.log("sports ochadu");
//     async function fetchNews(){
//         const response= await fetch("https://newsapi.org/v2/everything?q=sports&from=2024-05-01&sortBy=publishedAt&apiKey=c28551e6e0d148a5a90d58c52c956120");
//         const inf= await response.json();
//         FbindData(inf.data);        
//     }
// })

async function fetchNews(){
    const response= await fetch(url);
    const inf= await response.json();
    bindData(inf.data);
    //console.log(inf.data[0]);
    //const img=await fetch(inf.data[0].img_url);
    //document.getElementById('src').innerHTML=inf.data[0].image_url;
}
 function bindData(data){
   const cardsContainer=document.getElementById('cards-container');
   const newsTemplete=document.getElementById('template-news-card');
   cardsContainer.innerHTML=" ";
    // for(let i=0;i<=2;i++){
    //     console.log(data[i].title);
    //     console.log(data[i].description)
    //     console.log(data[i].image_url)
    // }
    for(let i=0;i<3;i++){
        if(!data[i].image_url) return;
        const cardClone=newsTemplete.content.cloneNode(true);
        fillDataINCard(cardClone,data[i]);
        cardsContainer.appendChild(cardClone);
    }
    return;
}
function fillDataINCard(cardClone,ob){
    const newsImg= cardClone.querySelector('#news-img');
    const newsTitle= cardClone.querySelector('#news-title');
    const newsSource= cardClone.querySelector('#news-source');
    const newsDes= cardClone.querySelector('#news-desc');
    newsImg.src=ob.image_url;
    newsTitle.innerHTML= ob.title;
    newsDes.innerHTML = ob.description;
    const date=new Date(ob.published_at).toLocaleString("en-US",{timeZone:"Asia/Jakarta"});
    newsSource.innerHTML=`${ob.source}-${date}`;
    cardClone.firstElementChild.addEventListener('click',() => {
        window.open(ob.url,"_blank");
    })
}
const cur=null;
function navclick(id){
    IfetchNews(id);
    const navitem=document.getElementById(id);
    cur?.classList.remove('active');
    cur=navitem;
    cur.classList.add('active');
}
const searchbutton=document.getElementById('search-button');
const searchtext=document.getElementById('search-text');
searchbutton.addEventListener('click',()=>{
    const query=searchtext.value;
    if(!query) return;
    IfetchNews(query);
    cur?.classList.remove('active');
    cur=null;
})  
async function IfetchNews(id){
    const response= await fetch(`https://newsdata.io/api/1/news?apikey=pub_45361695c12fc36aa84589c6c69e2fb33b32f&q=${id}&language=en`);
    const inf= await response.json();
    console.log(inf.results);
    FbindData(inf.results);
    //console.log(inf.data[0]);
    //const img=await fetch(inf.data[0].img_url);
    //document.getElementById('src').innerHTML=inf.data[0].image_url;
}
function FbindData(article){
    const cardsContainer=document.getElementById('cards-container');
   const newsTemplete=document.getElementById('template-news-card');
   cardsContainer.innerHTML=" ";
    for(let i=0;i<9;i++){
        if(!article[i].image_url) return;
        const cardClone=newsTemplete.content.cloneNode(true);
        CfillDataINCard(cardClone,article[i]);
        cardsContainer.appendChild(cardClone);
    }
    return ;
}
function CfillDataINCard(cardClone,ob){
    const newsImg= cardClone.querySelector('#news-img');
    const newsTitle= cardClone.querySelector('#news-title');
    const newsSource= cardClone.querySelector('#news-source');
    const newsDes= cardClone.querySelector('#news-desc');
    newsImg.src=ob.image_url;
    newsTitle.innerHTML= ob.title;
    newsDes.innerHTML = ob.description;
    const date=new Date(ob.pubDate).toLocaleString("en-US",{timeZone:"Asia/Jakarta"});
    newsSource.innerHTML=`${ob.source_id}-${date}`;
    cardClone.firstElementChild.addEventListener('click',() => {
        window.open(ob.url,"_blank");
    })
}