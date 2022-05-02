// Ude Import export (MANDATORY)
// Onclicking store the news in local storage with key "news" so that you can access that on news.html page
import {navbar} from "../components/navbar.js"
document.getElementById("navbar").innerHTML=navbar()
var arr=JSON.parse(localStorage.getItem("news"))||[]

let result= document.getElementById("results")
       
let search= (e)=>{
    if(e.key==="Enter"){
        
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
       
        append(data.articles)
    }
    catch(err){
        console.log(err)
    }
}

let append=(data)=>{
    data.forEach(({content,urlToImage})=>{
        // result.innerHTML=null
        let div= document.createElement("div")
        let img= document.createElement("img")
        img.src= urlToImage
        img.setAttribute("class","image")
        let h3= document.createElement("h3")
        h3.addEventListener("click",function(){
                show(elem.articles)
        })
        h3.innerText=content
        div.append(img,h3)
        result.append(div)
    })
}

function show(elem){
    arr.push(elem)
    localStorage.setItem("news",JSON.stringify(arr))
    window.location.href="news.html"
}