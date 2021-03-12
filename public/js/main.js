function goto(url){
    window.location = url;
}

let menubtn = document.getElementById("side-menu-toggle");
let sidemenu = document.getElementById("side-menu");
let backdrop = document.getElementsByClassName("backdrop")[0];

menubtn.onclick = function(){
    if(backdrop.style.display === 'none' || backdrop.style.display === ""){
        backdrop.style.display = 'block';
    }else{
        backdrop.style.display = "none";
    }
    sidemenu.classList.toggle('open')
}

backdrop.onclick = function(){
    backdrop.style.display = 'none';
    sidemenu.classList.toggle('open')
}