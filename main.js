let ourServicesMenu = [...document.querySelectorAll('.our_services_nav li' )];
let ourServicesText = [...document.querySelectorAll('.our_services_content li' )];

let whatPeopleSayMenuInfo = [...document.querySelectorAll('.what_people_say_about_theHam_user_info li' )];
let whatPeopleSayMenuPhotos = [...document.querySelectorAll('.what_people_say_about_theHam_photos li' )];

let whatPeopleSayMenuArrows = [...document.querySelectorAll('.what_people_say_about_theHam_photos span' )];


const words = [
    "Hello, nice to meet you!",                 // English
    "Bonjour, ravi de vous rencontrer!",        // French
    "Hola, mucho gusto!",                      // Spanish
    "Привіт, приємно познайомитися!",          // Ukrainian
    "你好，很高兴认识你!",                        // Chinese (Simplified)
    "नमस्ते, आपसे मिलकर खुशी हुई!",             // Hindi
    "Kamusta, ikinagagalak kitang makilala!",  // Tagalog
    "Hallo, freut mich dich kennenzulernen!",  // German
    "Ciao, piacere di conoscerti!"             // Italian
];;

let i = 0;
let wordIndex = 0;
let currentText = "";

function type(){
    if(wordIndex === words.length){
        wordIndex = 0;
    }

    let currentWord = words[wordIndex];

    currentText = currentWord.substring(0,i);
    document.getElementById("typingText").innerHTML = currentText;

    i++;

    if(i > currentWord.length){
        i = 0;
        wordIndex++;
    }

    setTimeout(type,220);
}

type();

//------------------------------------------------common_function
let searchAnalogItem=function(arrMenu, arrAnalog, counter){
    arrAnalog.forEach(item=>{
        item.style.display='none'
    });
    if(counter){
        return arrAnalog[(arrMenu.indexOf(event.currentTarget)-counter+arrAnalog.length) % arrAnalog.length]
    } return arrAnalog[arrMenu.indexOf(event.currentTarget)];
};
// ---------------------------------------------------our_services
ourServicesMenu.forEach((item)=>{
    item.addEventListener('click', function() {
        let searchItem = searchAnalogItem(ourServicesMenu, ourServicesText);
        searchItem.style.display='flex';
    })
});
// ---------------------------------------------------our_amazing_work
let ourAmazingWorkMenu = [...document.querySelectorAll('.our_amazing_work_nav li' )];
let ourAmazingWorkContent = [...document.querySelectorAll('.our_amazing_work_content li' )];
let ourAmazingWorkButton = document.getElementsByClassName('ourAmazingWorkButton' )[0];

let counter=12;

ourAmazingWorkButton.addEventListener('click',()=>{
    for(let i=counter;i<counter+12;i++){
        ourAmazingWorkContent[i].classList.toggle("noActive");
    }
    counter+=12;
    if(counter===36){
        ourAmazingWorkButton.style.display='none';
    }
});

ourAmazingWorkMenu.forEach( item =>{
    item.addEventListener('click', function () {
        ourAmazingWorkContent.forEach(function(elemArray){
            elemArray.style.display='none';
            if(elemArray.children[1].children[2].textContent.toLowerCase()===event.currentTarget.textContent.toLowerCase()){
                elemArray.style.display='flex';
            }else if('all'===event.currentTarget.textContent.toLowerCase()) {
                elemArray.style.display = 'flex';
            }
        });
    })
});
// ---------------------------------------------------what_people_say
let pickUpItemAddBorder = function () {
     whatPeopleSayMenuPhotos.forEach((items) => {
        items.style.alignSelf = 'center';
        this.style.alignSelf = 'flex-end';

        this.style.transform = 'rotateY(360deg)';
        this.style.transition = 'all ,2s';

        items.childNodes[0].style.border = 'none';
        this.childNodes[0].style.border = '1px solid #18cfab';
    });
};

let changePhoto = function(){
    let searchItem = searchAnalogItem(whatPeopleSayMenuPhotos, whatPeopleSayMenuInfo,countClick-1);
     searchItem.style.display = 'flex';
};

let createFirstItemRemoveLast= function(){
    let NewLi = document.createElement('li');
    whatPeopleSayMenuArrows[0].after(NewLi);
    let newLiImg = document.createElement('img');
    newLiImg.setAttribute('src', whatPeopleSayMenuInfo[whatPeopleSayMenuInfo.length-countClick].lastElementChild.src);
    newLiImg.setAttribute('alt', 'face1');

    NewLi.appendChild(newLiImg);
    whatPeopleSayMenuPhotos.unshift(NewLi);
    whatPeopleSayMenuPhotos[whatPeopleSayMenuInfo.length].remove();
    whatPeopleSayMenuPhotos.pop();

    NewLi.addEventListener('click', pickUpItemAddBorder);
    NewLi.addEventListener('click', changePhoto);
};

let createLastItemRemoveFirst= function(){
    let NewLi = document.createElement('li');
    whatPeopleSayMenuArrows[whatPeopleSayMenuArrows.length-1].before(NewLi);
    let newLiImg = document.createElement('img');
    newLiImg.setAttribute('src', whatPeopleSayMenuInfo[whatPeopleSayMenuInfo.length-(countClick-1)].lastElementChild.src);
    newLiImg.setAttribute('alt', 'face1');

    NewLi.appendChild(newLiImg);
    whatPeopleSayMenuPhotos.push(NewLi);
    whatPeopleSayMenuPhotos[0].remove();
    whatPeopleSayMenuPhotos.shift();

    NewLi.addEventListener('click', pickUpItemAddBorder);
    NewLi.addEventListener('click', changePhoto);
};

let countClick=1;

whatPeopleSayMenuArrows[1].addEventListener('click',function(){
    if(countClick===whatPeopleSayMenuInfo.length+1){ countClick=1}
    createFirstItemRemoveLast();
    countClick++;
});

whatPeopleSayMenuArrows[0].addEventListener('click', function () {
    if(countClick===1){ countClick=whatPeopleSayMenuInfo.length+1}
    createLastItemRemoveFirst();
    countClick--;
});

whatPeopleSayMenuPhotos.forEach((item)=> {
    item.addEventListener('click', pickUpItemAddBorder);
    item.addEventListener('click', changePhoto);
});




