//declaring a variable that is inthe html ID
const canvas = document.getElementById('canvas1');
//CTX MEANS CONTEXT
const ctx = canvas.getContext('2d');
//Used to size the canvas to fit the window size
canvas.height= window.innerHeight;
canvas.width= window.innerWidth;
const particleArray= [];
let hue = 0;

window.addEventListener('resize', function(){
    canvas.width= window.innerWidth;
    canvas.height= window.innerHeight;
});

const mouse = {
    x:undefined,
    y:undefined,
}
canvas.addEventListener('click', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 10; i++){
        particleArray.push(new Particle());
    }
});
//mouse gets triggered every time the mouse moves over
canvas.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 5; i++){
        particleArray.push(new Particle());
    }
})


//introduces with the new ES6 javascript classes
class Particle{
    constructor(){
        this.x= mouse.x; // from line 29
        this.y = mouse.y; //from line 30
        //spread different particles all over the canvas
        //this.x = Math.random() *canvas.width;
        //this.y = Math.random() *canvas.height;
        this.size = Math.random() * 15 + 1;
        //creating a vector movement
        this.speedX= Math.random()*3 - 1.5;
        this.speedY= Math.random()*3 - 1.5;
        this.color = 'hsl('+hue+', 100%, 50%)';
    }
    //method is a function in an object
    //makes particles to move in all directions
    update(){
        //increases from x and y in speed
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.2) this.size -= 0.1;
    }
    draw(){
        //gives it the change in color effect 
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x , this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

//function recycles every particle array every frame of animation
function handleParticles(){
    for (let i = 0; i < particleArray.length; i++) {
        //the for loop will trigger the update and draw methods
         particleArray[i].update();
         particleArray[i].draw()
        
        //creating a nested for loop
        for(let j = i; j< particleArray.length; j++){
            //algorithm for calculating the hypotenus using the pythagorus theorem
            const dx = particleArray[i].x - particleArray[j].x;
            const dy = particleArray[i].y - particleArray[j].y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            if(distance < 100){
                ctx.beginPath();
                ctx.strokeStyle = particleArray[i].color;
                //making it dynamic
                ctx.lineWidth = 0.2;
                ctx.moveTo(particleArray[i].x, particleArray[i].y);
                ctx.lineTo(particleArray[j].x, particleArray[j].y);
                ctx.stroke();
            }
        }
        if(particleArray[i].size <= 0.3){
            particleArray.splice(i, 1);
            console.log(particleArray.length);
            i--;
        }
    }
}

//animation loop.... Makes it interactive
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // if ctx.fillRect() is left out , it would leave the particles full trails aa it moves away from the mouses
    //ctx.fillStyle = 'rgba(0, 0, 0, 0.02 )'
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue+= 2;
    requestAnimationFrame(animate);
}   
animate(); 