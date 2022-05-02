// Ude Import export (MANDATORY)
// Onclicking store the news in local storage with key "news" so that you can access that on news.html page
import {navbar} from "../components/navbar.js"
document.getElementById("navbar").innerHTML=navbar()
let arr=JSON.parse(localStorage.getItem("news"))||[]


let result= document.getElementById("result")
       
let search= (e)=>{
    if(e.key==="Enter"){
        window.location.href="search.html"
        searchImages()
    }
}
document.getElementById("search_input").addEventListener("keydown",search)

let searchImages=async ()=>{
    let value= document.getElementById("search_input").value;
    try{
        let res= await fetch(`https://masai-mock-api.herokuapp.com/news?q=${value}`)
        let data= await res.json()
        console.log(data.articles)
       
        arr.push(data.articles)
        // localStorage.setItem("news",JSON.stringify(arr)
    }
    catch(err){
        console.log(err)
    }
   
}
// localStorage.setItem("news",JSON.stringify(arr)

// let append=(data)=>{
//     data.forEach(({content,urlToImage})=>{
//         result.innerHTML=null
//         let div= document.createElement("div")
//         let img= document.createElement("img")
//         img.src= urlToImage
//         img.setAttribute("class","image")
//         let h3= document.createElement("h3")
//         h3.innerText=content
//         div.append(img,h3)
//         result.append(div)
//     })
// }



let searchImg=async (value)=>{
    
    try{
        let res= await fetch(`https://masai-mock-api.herokuapp.com/news/top-headlines?country=${value}`)
        let data= await res.json()
        console.log(data)
    
        return data
    }
    catch(err){
        console.log(err)
    }
}

let sidebar= document.getElementById("sidebar").children;
function cSearch(){
    searchImg(this.id).then((data)=>{
        console.log(data.articles)
        result.innerHTML=null
        append(data.articles)

    })
    console.log(this.id)
}

for(let el of sidebar){
    el.addEventListener("click",cSearch);
}


let append=(data)=>{
    data.forEach(({content,urlToImage})=>{
        
        let div= document.createElement("div")
        let img= document.createElement("img")
        img.src= urlToImage
        img.setAttribute("class","image")
        let h3= document.createElement("h3")
        h3.innerText=content
        div.append(img,h3)
        result.append(div)
    })
}