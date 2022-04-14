import "../scss/style.scss"

function nav(){
    let navMenu = document.querySelector('.nav__menu');
    navMenu.addEventListener('click',(e) => {
         let navList = document.querySelector('.mobNav__list');
         navList.classList.toggle('mobNav__list--hide');
    })
 }
 
 nav()  

 function creatAcordion(){
      let accordion = document.getElementById('accordion');
      console.log(accordion);
     let title;
     
      accordion.addEventListener('click',(e)=>{
           
          if(e.target.matches('.accordion__header')){
              let content = e.target.nextElementSibling;
              
            

              if(!content.classList.contains('accordion__content--show')){
                    let contentShow = accordion.querySelector('.accordion__content--show');
                    if(contentShow) contentShow.classList.remove('accordion__content--show');
                    
                    content.classList.add('accordion__content--show');
              }else {
                    content.classList.remove('accordion__content--show');
              }
          }
      })
      
      
 }
 creatAcordion()