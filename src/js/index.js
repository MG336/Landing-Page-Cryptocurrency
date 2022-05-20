import "../scss/style.scss"

function nav(){
    let navMenu = document.querySelector('.nav__menu');
    navMenu.addEventListener('click',(e) => {

         let navList = document.querySelector('.mobNav__list');
         navList.classList.toggle('mobNav__list--show');
    })
    
 }
 nav()  

//Scroll---------------

function onEntry(entry) {
entry.forEach(change => {
  
  if (change.isIntersecting) {
    let items = change.target.querySelectorAll('.elem-hide');
      let time = 0;
      items.forEach((item,i)=>{
        item.classList.remove('elem-hide');
        item.classList.add("elem-show");
        item.style.transitionDelay = i*.2 + 's';
        time += 500;
      })
      
  }
});
}
const mediaQuery = window.matchMedia('(min-width: 992px)');
let options;
mediaQuery.matches ? options = { threshold: [0.4]} : options = { threshold: [0.2]};
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll(".elem-animation");

for (let elm of elements) {
  observer.observe(elm);
}

//Acordion---------------
 function creatAcordion(){
      let accordion = document.getElementById('accordion');
      console.log(accordion);
     let title;
        
      accordion.addEventListener('click',(e)=>{
        
        let header = e.target.closest('.accordion__header');
          if(!header) return  
            header.addEventListener('mousedown',(e)=>{
                e.preventDefault()
            })
              let content = header.nextElementSibling;
              
            

              if(!content.classList.contains('accordion__content--show')){
                    let contentShow = accordion.querySelector('.accordion__content--show');
                    if(contentShow) {
                        contentShow.classList.remove('accordion__content--show');
                        contentShow.previousElementSibling.classList.remove('accordion__header--border');
                    };
                    
                    header.classList.add('accordion__header--border');
                    content.classList.add('accordion__content--show');

              }else {
                    header.classList.remove('accordion__header--border');
                    content.classList.remove('accordion__content--show');
              }

            })
          }
creatAcordion()

//timer------------------
function timer(){
  let deadline = Date.now() + 2678400000 * 2;
  
  const days = document.getElementById('t-days'),
  hours = document.getElementById('t-hours'),
  minutes = document.getElementById('t-minutes'),
  seconds = document.getElementById('t-seconds');

  
  return setInterval(()=>{
    let result = new Date (deadline - Date.now());
    days.innerHTML = result.getDay();
    hours.innerHTML = result.getHours();
    minutes.innerHTML = result.getMinutes();
    seconds.innerHTML = result.getSeconds();
  },1000)

}          

timer();
  
//Table------------------
function setTable(){
   function gatJson(){
       return fetch('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=5&tsym=USD')
       .then(response => response.json());
   }

   function createTable(jsonObj){
       let container = document.querySelector('.table__box');

       container.innerHTML = `
           <table class="cc-table">
               <thead>
                   <tr class="cc-table__theader">
                       <th class="cc-table__th">Top Coin</th>
                       <th class="cc-table__th cc-table-price">Price</th>

                   </tr>
               </thead>
               <tbody>

               </tbody>
           </table>
           `
       let table = document.querySelector('.cc-table');

       let td,tr,count = 0;
       for (let obj of jsonObj.Data){
           tr = document.createElement('tr');
           tr.classList.add('cc-table__tr');

           if(typeof obj === 'object'){

                   tr.innerHTML = `
                       <td class="cc-table__td" data-coin>
                           <img class = "cc-table__img src="#">
                           ${obj.CoinInfo.FullName}
                       </td>
                       <td class="cc-table__td" data-price>
                           <img class = "cc-table__img src="#">
                           ${obj.DISPLAY.USD.PRICE}
                       </td>
                   `          
           }      
           table.children[1].append(tr);
       }
   }  
   function cellSelection() {
       let table = document.querySelector('.cc-table');

       table.addEventListener('mouseover',(e) => {
           let target = e.target;
           if(!target || !target.closest('.cc-table')) return;
           if(target.innerText === 'Price' || target.innerText === 'Top Coin'){
            target.classList.add('cc-table__theader--select');
           }
       })
       table.addEventListener('mouseout',(e) => {
           let target = e.target;
           if(!target || !target.closest('.cc-table')) return;
           if(target.innerText === 'Price' || target.innerText === 'Top Coin'){
            target.classList.remove('cc-table__theader--select');

           }
       })
       table.addEventListener('mousedown',(e) => {
           let target = e.target;
           if(!target || !target.closest('.cc-table')) return;
           if(target.innerText === 'Price' || target.innerText === 'Top Coin'){
               e.preventDefault();
           }
       })
       table.addEventListener('mouseover',(e) => {
           let target = e.target.closest('tr');
           if(!target || !target.closest('.cc-table')) return;
           if(target.closest('tbody')){
              target.style.color = 0
              target.classList.add('cc-table__tr--select');
           }
       })
       table.addEventListener('mouseout',(e) => {
           let target = e.target.closest('tr');
           if(!target || !target.closest('.cc-table')) return;
           if(target.closest('tbody')){
            target.classList.remove('cc-table__tr--select');
           }
       })
   }

   function sortTable(){
       let table = document.querySelector('.cc-table'), 
       sortLess = true,
       topCoin = [...table.rows].slice(1);
       ;
       console.log(table)
       table.addEventListener('click',(e) => {
           if(e.target.textContent === 'Price'){
               let rowA, rowB;
               let rows = Array.from(table.rows)
                   .slice(1)
                   .sort((item1, item2) => {
                       rowA = +item1.cells[1].innerText.replace(/[\$\,]/g,'');
                       rowB = +item2.cells[1].innerText.replace(/[\$\,]/g,'');
                       if (sortLess){
                           return rowA > rowB ? 1 : -1
                           
                       }else {
                           return rowA < rowB ? 1 : -1
                       }
                       
                   });
               table.childNodes[3].append(...rows)
               sortLess ? sortLess = false : sortLess = true;
           }
           if(e.target.textContent === 'Top Coin'){
               table.childNodes[3].append(...topCoin)
           }
       })
   }
   gatJson().then(obj => createTable(obj)).then(() => cellSelection()).then(() => sortTable());
}
setTable()      