let body = document.querySelector("body"); 
let button = document.querySelector("button"); 
let links = document.querySelectorAll('#link'); 
let title = document.getElementById('title'); 
    
button.addEventListener("click", function() {
      body.classList.toggle("dark");
      links.forEach(link => link.classList.toggle('dark'));
      title.classList.toggle('dark');
}); 