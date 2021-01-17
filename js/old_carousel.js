
var currentIndex = 0;
const LEFT = 1;
const RIGHT = -1;
const FPS = 60;

const width = 400 ;
const height = 400 ;

var no_of_images = document.querySelectorAll("div.carousel-image-wrapper img").length;

var container = document.querySelector('.carousel-container');

btn_previous = document.createElement('div');
btn_previous.setAttribute('class', 'btn-previous');
btn_previous.style.position = 'absolute';
btn_previous.style.top = '40%';
btn_previous.style.width = 30 + 'px';
btn_previous.style.height = 20 + 'px';
btn_previous.style.background = '#ffffff';
btn_previous.style.opacity = '0.3';
btn_previous.innerHTML = '<';
btn_previous.style.cursor = 'pointer';

container.appendChild(btn_previous);

btn_next = document.createElement('div');
btn_next.setAttribute('class', 'btn-next');
btn_next.style.position = 'absolute';
btn_next.style.top = '40%';
btn_next.style.right = 0;
btn_next.style.width = 30 + 'px';
btn_next.style.height = 20 + 'px';
btn_next.style.background = '#ffffff';
btn_next.style.opacity = '0.3';
btn_next.innerHTML = '>';
btn_next.style.cursor = 'pointer';

container.appendChild(btn_next);

dots_container = document.createElement('div');
dots_container.style.position = 'absolute';
dots_container.style.bottom = '0px';
dots_container.style.textAlign = 'center';
dots_container.style.width = '100%';

container.appendChild(dots_container);

var dots_list = [];

for(var i = 0; i< no_of_images;i++){
  dots = document.createElement('div');
  dots.style.display= 'inline-block';
  dots.setAttribute('class', 'dots');
  dots.style.width= 10 +'px';
  dots.style.height= 10 +'px';
  dots.style.background = '#848891';
  dots.style.cursor = 'pointer';
  dots.style.marginRight = 5 +'px'
  dots.style.borderRadius = 50 +'%';
  dots_container.appendChild(dots);

  dots_list.push(dots);

  let x= i;
  dots.addEventListener('click', function(){
    slideImage(currentIndex, x);
  })
}


function setActiveDots(index){
  for(var i = 0; i<dots_list.length; i++){
    if(index === i){
      dots_list[i].style.background = '#3256a8';
    } else{
      dots_list[i].style.background = '#848891';
    }
  }
}

var wrapper = document.querySelector('.carousel-image-wrapper');

wrapper.style.width = no_of_images*width + 'px';

function getPastIndex(cindex) {
  
    return (cindex - 1 + no_of_images) % no_of_images;
}

function getNextIndex(cindex) {

    return (cindex + 1) % no_of_images;
}

function getPosition(cindex) {
    return -(cindex * width);
}

function setIndex(nextIndex){
    currentIndex = nextIndex ;
    return
}

function slideImage(currentIndex, nextIndex) {

    var direction;
    if (currentIndex < nextIndex) {
      direction = LEFT;
    } else {
      direction = RIGHT;
    }

    if(currentIndex == nextIndex){
      return
    }
 
    var currentPosition = getPosition(currentIndex);
    var nextPosition = getPosition(nextIndex);
    var difference = Math.abs(nextPosition - currentPosition);
    // console.log(currentPosition,nextPosition);
    var speed = 10;
    var transitionValue = 0;

    var transition = setInterval(function () {
        transitionValue += speed;
  
        if (transitionValue >= difference) {
          // transitionValue = difference;
          setIndex(nextIndex);
  
          // wrapper.style.left = currentPosition - transitionValue * direction + 'px';
          clearInterval(transition);
          setActiveDots(nextIndex);
        }
  
        wrapper.style.left = currentPosition - transitionValue * direction + 'px';
      }, 1000 / FPS);
}


setActiveDots(currentIndex); 

btn_next.addEventListener('click', function(){
    nextIndex = getNextIndex(currentIndex);
    slideImage(currentIndex, nextIndex);
})

btn_previous.addEventListener('click', function(){
    nextIndex = getPastIndex(currentIndex);
    slideImage(currentIndex, nextIndex);
})

