
class Carousel{
    constructor(
        sliderId, 
        transactionTime = 2000, 
        holdTime = 1000, 
        autoplay = true,)
    {
        this.transactionTime = transactionTime;
        this.holdTime = holdTime;

        this.autoplay = autoplay;

        this.container = document.getElementById(sliderId);
        this.wrapper = this.container.querySelector('.carousel-image-wrapper');
        

        this.btn_previous = document.createElement('div');
        this.btn_next = document.createElement('div');
        this.dots_container = document.createElement('div');

        this.currentIndex = 0;
        this.images = this.wrapper.querySelectorAll('img');
        this.no_of_images = this.images.length;
        this.imageWidth = 400 ;
        this.imageHeight = 400 ;

        this.RIGHT = -1;
        this.LEFT = 1;
        this.FPS = 60;

        this.wrapper.style.width = this.no_of_images* this.imageWidth + 'px';
        this.dots_list = [];
    }

    addPreviousButton() {
        this.btn_previous.setAttribute('class', 'btn-previous');
        this.btn_previous.style.position = 'absolute';
        this.btn_previous.style.top = '40%';
        this.btn_previous.style.width = 30 + 'px';
        this.btn_previous.style.height = 20 + 'px';
        this.btn_previous.style.background = '#ffffff';
        this.btn_previous.style.opacity = '0.3';
        this.btn_previous.innerHTML = '<';
        this.btn_previous.style.cursor = 'pointer';

        this.container.appendChild(this.btn_previous);
    }

    addNextButton() {
        this.btn_next.setAttribute('class', 'btn-next');
        this.btn_next.style.position = 'absolute';
        this.btn_next.style.top = '40%';
        this.btn_next.style.right = 0;
        this.btn_next.style.width = 30 + 'px';
        this.btn_next.style.height = 20 + 'px';
        this.btn_next.style.background = '#ffffff';
        this.btn_next.style.opacity = '0.3';
        this.btn_next.innerHTML = '>';
        this.btn_next.style.cursor = 'pointer';

        this.container.appendChild(this.btn_next);
    }

    createDotsContainer() {
        this.dots_container.style.position = 'absolute';
        this.dots_container.style.bottom = '0px';
        this.dots_container.style.textAlign = 'center';
        this.dots_container.style.width = '100%';

        this.container.appendChild(this.dots_container);
        this.createDots();
    }

    createDots(){

        for(var i = 0; i< this.no_of_images;i++){
            this.dots = document.createElement('div');
            this.dots.style.display= 'inline-block';
            this.dots.setAttribute('class', 'dots');
            this.dots.style.width= 10 +'px';
            this.dots.style.height= 10 +'px';
            this.dots.style.background = '#848891';
            this.dots.style.cursor = 'pointer';
            this.dots.style.marginRight = 5 +'px'
            this.dots.style.borderRadius = 50 +'%';
            this.dots_container.appendChild(this.dots);
          
            this.dots_list.push(this.dots);
          
            let x= i;
            this.dots.addEventListener('click', () =>{
              this.slideImage(this.currentIndex, x);
            })
          }
    }

    setActiveDots(index){
        for(var i = 0; i< this.dots_list.length; i++){
          if(index === i){
            this.dots_list[i].style.background = '#3256a8';
          } else{
            this.dots_list[i].style.background = '#848891';
          }
        }
    }
    getPastIndex(cindex) {
  
        return (cindex - 1 + this.no_of_images) % this.no_of_images;
    }
    
    getNextIndex(cindex) {
    
        return (cindex + 1) % this.no_of_images;
    }
    
    getPosition(cindex) {
        return -(cindex * this.imageWidth);
    }
    
    setIndex(nextIndex){
        this.currentIndex = nextIndex ;
        return
    }

    slideImage(currentIndex, nextIndex) {

        var direction;
        if (currentIndex < nextIndex) {
          direction = this.LEFT;
        } else {
          direction = this.RIGHT;
        }
    
        if(currentIndex == nextIndex){
          return
        }
     
        var currentPosition = this.getPosition(this.currentIndex);
        var nextPosition = this.getPosition(nextIndex);
        var difference = Math.abs(nextPosition - currentPosition);
        var no_of_frames = (this.transactionTime*this.FPS)/1000;
        // var speed = (this.FPS/this.transactionTime)* difference;
        var speed = difference/no_of_frames;
        var transitionValue = 0;
    
        var transition = setInterval(() => {
            transitionValue += speed;
            
            
            if (transitionValue >= difference) {
              this.setIndex(nextIndex);
              this.wrapper.style.left = nextPosition + 'px';
              clearInterval(transition);
              this.setActiveDots(nextIndex);
              return 
            }

            this.wrapper.style.left = currentPosition - transitionValue * direction + 'px';
          }, 1000/this.FPS);
    }

    addListeners(){
        this.btn_previous.addEventListener('click',() =>{
            this.nextIndex = this.getPastIndex(this.currentIndex);
            this.slideImage(this.currentIndex, this.nextIndex);
        })

        this.btn_next.addEventListener('click', () => {
            this.nextIndex = this.getNextIndex(this.currentIndex);
            this.slideImage(this.currentIndex, this.nextIndex);
        })
    }
    


    createCarousel() {
        this.addPreviousButton();
        this.addNextButton();
        this.createDotsContainer();
        this.setActiveDots(this.currentIndex); 
        this.addListeners();

        setInterval(() =>{
            this.slideImage(this.currentIndex, (this.currentIndex+1) % this.no_of_images)
            
        }, this.holdTime + this.transactionTime)
    }

}


const carousel1 = new Carousel('first-slider', 2000, 3000);
carousel1.createCarousel();
const carousel2 = new Carousel('second-slider', 2000, 1000);
carousel2.createCarousel();
