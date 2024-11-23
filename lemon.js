console.log("%c POWERD BY LEMON.JS",'color: lime;font-weight:bolder;border: 2px dotted darkgreen;padding: 10px;border-radius:100px;text-shadow: 0px 0px 10x white;box-shadow: 0px 0px 20px 2px red inset;font-style: italic;')
var renderer = document.createElement("canvas");
var centerX = innerWidth/2;
var centerY = innerHeight/2;

var Screen = {
  width : innerWidth,
  height : innerHeight,
  fit : ()=>{
    return [innerWidth,innerHeight];
  },
  ClearJunkPixels : true,
}
var WDG = 9.8;
var  c = renderer.getContext("2d");
var Input = {
 mouse : {
  x : 0,
  y : 0
},
 key : {
  code : 0,
  name : 0
 },
 touch : {
   x : 0,
   y : 0
 }
}
var EVENT = {
  click : (func)=>{
    addEventListener("mousedown",e=>{
      func(e);
    })
  }
}
let AllElementStorage = [];
function rgba(r,g,b,a){
  return `rgba(${r},${g},${b},${a})`;
}
function unPoint(number){
  return Math.floor(number);
}
function random(min,max){
  return min+Math.random()*(max-min);
}
function uPRandom(min,max){
  return unPoint(random(min,max))
}
function rgba(r,g,b,a){
  return `rgba(${r,g,b,a})`;
}
function InbuildFrame(){
  requestAnimationFrame(InbuildFrame)
  if(Screen.ClearJunkPixels == true){
  clear()
  }
  AllElementStorage.sort((a,b)=>{
    return a.z - b.z;
  })
}
addEventListener('mousemove',(e)=>{
  Input.mouse.x = e.x
  Input.mouse.y = e.y
})
$Keyboard(e=>{
  Input.key.code = e.keyCode;
  Input.key.name = e.key;
},e=>{
  Input.key.code = undefined;
  Input.key.name = undefined;
})
addEventListener('touchmove',e=>{
  Input.touch.x = e.touches[0].clientX;
  Input.touch.y = e.touches[0].clientY;
})
InbuildFrame()
var cameraX = 0;
var cameraY = 0;
function Camera(x,y){
  this.Transform = (x,y)=>{
    cameraX += x;
    cameraY += y;
  __(AllElementStorage,(al)=>{
    if(al.eyeArea == true){
      if(al.startX){
        al.startX -= x;
        al.startY -= y;
        al.endX -= x;
        al.endY -= y;

      }else{
      al.x -= x;
      al.y -= y;
      }
    }
  })
  }
  this.Transform(x,y);
  this.KeyboardControll = (speed)=>{
    $Keyboard(e=>{
      let key = e.keyCode;
      if(key == 37){
        this.Transform(-speed,0);
      }else if(key == 39){
        this.Transform(speed,0);
      }
      if(key == 38){
        this.Transform(0,-speed);
      }else if(key == 40){
        this.Transform(0,speed);
      }
    },e=>{

    })
  }
}
function last(arr){
  return arr[arr.length-1];
}
function distance(x1, y1, x2, y2) {
  this.destx = x2 - x1;
  this.desty = y2 - y1;
  return Math.sqrt(Math.pow(this.destx, 2) + Math.pow(this.desty, 2));
}
function _d(com, com2) {
  this.destx = com2.x - com.x;
  this.desty = com2.y - com.y;
  return Math.sqrt(Math.pow(this.destx, 2) + Math.pow(this.desty, 2));
}
function LemonView(canvas,size = Screen.fit()){
  renderer = canvas;
  renderer.style.position = 'absolute';
  renderer.style.top = "0";
  renderer.style.left = "0";
  this.width = size[0];
  this.height = size[1];
  renderer.width = this.width;
  renderer.height = this.height;
  c = renderer.getContext("2d");
  this.solidColor = function(color = 'black'){
   renderer.style.backgroundColor = color;
  }
  this.CustomRenderer = (elm)=>{
    renderer = elm;
  }
  this.gradientColor = function(color = 'red,green,blue'){
    renderer.style.backgroundImage = `linear-gradient(`+color+`)`;  
  }
  this.CSS = (code)=>{
    renderer.setAttribute("style",code);
  }
  this.disableMouse = ()=>{
    renderer.style.cursor = "none";
  }
  this.MKflex = function(){
    document.body.style.margin = '0';
  }
  this.setID = (id)=>{
    renderer.setAttribute("id",id);
  }
  this.Scrolloff = function(){
    document.body.style.overflow = 'hidden';
  }
}
function Rect(x,y,w,h,rotate,col){
    this.rotation = rotate;
    this.x = x;
    this.force = 0;
    this.forceX = 0;
    this.z = 0;
    this.mass = 1;
    this.forceY = 0;
    this.y = y;
    this.static = false;
    this.Static = false;
    this.opacity = 1;
    this.width = w;
    this.height = h;
    this.color = col;
    this.followCamera = true;
    this.shadowRadius = 0;
    this.sides = [];
    this.extraX = 0;
    this.extraY = 0;
    this.eyeArea = true;
    this.pivot = {
      x : this.width/2,
      y : this.height/2
    }
    AllElementStorage.push(this);
    this.load = function(){
      this.sides = [
                    [{ x: this.x, y: this.y }, { x: this.x, y: this.y + this.height }],
                    [{ x: this.x + this.width, y: this.y }, { x: this.x + this.width, y: this.y + this.height }],
                    [{ x: this.x, y: this.y }, { x: this.x + this.width, y: this.y }],
                    [{ x: this.x, y: this.y + this.height }, { x: this.x + this.width, y: this.y + this.height }],
                    ];
      c.beginPath()
      if(this.opacity < 0.1){
        this.opacity = 0;
      }
      c.globalAlpha = this.opacity;
      c.translate(this.x + this.width/2, this.y + this.height/2);
      c.rotate((this.rotation * Math.PI) / 180);
      c.translate(-(this.x + this.pivot.x),-(this.y + this.pivot.y))
      c.fillStyle = this.color;
      c.shadowBlur = this.shadowRadius;
      c.shadowColor = "black";
      c.fillRect(this.x,this.y,this.width,this.height);
      c.fill();
      c.globalAlpha = 1;
      c.setTransform(1,0,0,1,0,0);
    }
    this.moveY =function(rate){
      this.y += rate;
    }
    this.moveX = function(rate){
      this.x += rate;
    }
    this.touch = function(mouse = Input.mouse){
    return mouse.x >= this.x && mouse.x <= this.x + this.width && mouse.y >= this.y && mouse.y <= this.y + this.height;
    }
    this.vec2 = (vector)=>{
      this.x = vector.x;
      this.y = vector.y;
    }
  }
function Eclipse(x,y,radiusX,radiusY,rotate,color){
    this.x = x;
    this.y = y;
    this.force = 0;
    this.forceX = 0;
    this.z = 0;
    this.mass = 1;
    this.opacity = 1;
    this.forceY = 0;
    this.xp = 0;
    this.yp = 0;
    this.radiusX = radiusX;
    this.eyeArea = true;
    AllElementStorage.push(this);
    this.radiusY = radiusY;
    this.rotation = rotate;
    this.color = color;
    this.followCamera = true;
    this.load = function(){
      c.beginPath()
      if(this.opacity < 0.1){
        this.opacity = 0;
      }
      c.globalAlpha = this.opacity;
      c.translate(this.x + this.radiusX/2, this.y + this.radiusY/2);
      c.rotate((this.rotation * Math.PI) / 180);
      c.translate(-(this.x + this.radiusX/2),-(this.y + this.radiusY/2))
      c.fillStyle = this.color
      c.ellipse(this.x,this.y,radiusX,radiusY,this.rotation,0,Math.PI*2,false)
      c.fill();
      c.globalAlpha = 1;
      c.setTransform(1,0,0,1,0,0);
    }
  }
function ImageSrc(src, x, y, w, h, rotate, flipX = false,flipY = false){
    this.img = new Image(this.src);
    this.img.src = src;
    this.mainArea;
    this.x = x
    this.z = 1;
    this.opacity = 1;
    this.y = y
    this.force = 0;
    this.forceX = 0;
    this.mass = 1;
    this.forceY = 0;
    this.rotation = rotate;
    this.eyeArea = true;
    this.force = 0;
    AllElementStorage.push(this);
    this.width = w
    this.height = h
    this.flipX = flipX;
    this.flipY = flipY;
    this.hitPoint = 1;
    this.left;
    this.right; 
    this.top;
    this.bottom;
    this.center;
    this.pivot = {
      x : this.width/2,
      y : this.height/2
    }
    this.followCamera = true;
    this.sides = [];
    this.load = function() {
    this.sides = [
 [{ x: this.x, y: this.y }, { x: this.x, y: this.y + this.height }],
 [{ x: this.x + this.width, y: this.y }, { x: this.x + this.width, y: this.y + this.height }],
 [{ x: this.x, y: this.y }, { x: this.x + this.width, y: this.y }],
 [{ x: this.x, y: this.y + this.height }, { x: this.x + this.width, y: this.y + this.height }],
              ];
      if(this.opacity < 0.1){
        this.opacity = 0;
      }
      this.left = this.x;
      this.right = this.x + this.width;
      this.top = this.y;
      this.bottom = this.y + this.height;
      this.center = new vec2(this.x+(this.width/2),this.y+(this.height/2));
      c.globalAlpha = this.opacity;
      c.translate(this.x + this.width / 2, this.y + this.height /2);
      c.rotate((this.rotation * Math.PI) / 180);
      if (this.flipX == true) {
        c.scale(-1, 1)
      }
      if (this.flipY == true) {
        c.scale(1, -1)
      }
      c.translate(-(this.x + this.pivot.x), -(this.y + this.pivot.y))
      c.beginPath()
      c.drawImage(this.img,this.x, this.y, this.width, this.height);
      c.globalAlpha = 1;
      c.setTransform(1, 0, 0, 1, 0, 0);
    }
    this.moveY = function(rate) {
      this.y += rate;
    }
    this.moveX = function(rate) {
      this.x += rate;
    }
    this.touch = function(mouse = Input.mouse) {
      return mouse.x >= this.x && mouse.x <= this.x + this.width && mouse.y >= this.y && mouse.y <= this.y + this.height;
    }
    this.setCollisionArea = ()=>{
      this.mainArea = area;
    }
  }
  function Area(component,func){
    return func(component.x,component.y);
  }
function ImageSheetSrc(src,x,y,w,h,sx,sy,sw,sh,rotate){
    this.img = new Image(this.src);
    this.img.src = src;
    this.x = x
    this.y = y
    this.xp = 0;
    this.force = 0;
    this.forceX = 0;
    this.mass = 1;
    this.forceY = 0;
    this.opacity = 1;
    this.z = 0;
    this.sx = sx;
    this.sy = sy;
    this.sw = sw;
    this.sh = sh;
    this.rotation = rotate;
    this.width = w
    this.eyeArea = true;
    AllElementStorage.push(this);
    this.height = h
    this.flipX = false;
    this.flipY = false;
    this.followCamera = true;
    this.sides = [];
    this.pivot = {
      x : this.width/2,
      y : this.height/2
    }
      this.load = function(){
         this.sides = [
         [{ x: this.x, y: this.y }, { x: this.x, y: this.y + this.height }],
         [{ x: this.x + this.width, y: this.y }, { x: this.x + this.width, y: this.y + this.height }],
         [{ x: this.x, y: this.y }, { x: this.x + this.width, y: this.y }],
         [{ x: this.x, y: this.y + this.height }, { x: this.x + this.width, y: this.y + this.height }],
                      ];
      c.translate(this.x + this.width/2, this.y + this.height/2);
      c.rotate((this.rotation * Math.PI) / 180);
      if(this.flipX == true){
      c.scale(-1,1)
      }
      if(this.flipY == true){
      c.scale(1,-1)
      }
      if(this.opacity < 0.1){
        this.opacity = 0;
      }
      c.globalAlpha = this.opacity;
      c.translate(-(this.x + this.pivot.x),-(this.y + this.pivot.y))
      c.beginPath()
      c.drawImage(this.img,this.sx,this.sy,this.sw,this.sh,this.x,this.y,this.width,this.height);  
      c.globalAlpha = 1;
      c.setTransform(1,0,0,1,0,0);
    }
    this.moveY =function(rate){
      this.y += rate;
    }
    this.moveX =function(rate){
      this.x += rate;
    } 
    this.touch = function(mouse = Input.mouse){
      return mouse.x >= this.x && mouse.x <= this.x + this.width && mouse.y >= this.y && mouse.y <= this.y + this.height;
      }
  }  
function Circle(x,y,r,col){
    this.x = x;
    this.y = y;
    this.force = 0;
    this.forceX = 0;
    this.z = 0;
    this.mass = 1;
    this.forceY = 0;
    this.opacity = 1;
    this.radius = r;
    this.color = col;
    this.followCamera = true;
    AllElementStorage.push(this);
    this.eyeArea = true;
    this.load = function(){
      c.globalAlpha = this.opacity;
      c.beginPath()
      c.fillStyle = this.color;
      c.arc(this.x,this.y,this.radius,0,Math.PI *2,false);
      c.globalAlpha = 1;
      c.fill()
    }
    this.moveX = function(rate){
      this.x += rate;
    }
    this.moveY = function(rate){
      this.y += rate;
    }
    this.moveAngle = function(angle,speed){
      this.x += speed * AngleToAxis(angle).x;
      this.y += speed * AngleToAxis(angle).y;
    }
    this.touch = (mouse = Input.mouse)=>{
      return distance(mouse.x,mouse.y,this.x,this.y) < this.radius;
    }
  }
  var CONTROLL = {
    car : (component,rate)=>{
      addEventListener("keydown",e=>{
        if(e.key == "ArrowLeft"){
          component.rotation-=rate;
        }else if(e.key == "ArrowRight"){
          component.rotation+=rate;
        }
      })
    }
  }
function SolidText(x,y,size,color,text){
    this.x = x;
    this.y = y;
    this.z = 0;
    this.force = 0;
    this.opacity = 1;
    this.forceX = 0;
    this.mass = 1;
    this.forceY = 0;
    this.font = "Arial";
    this.size = size;
    this.color = color;
    this.text = text;
    this.followCamera = true;
    AllElementStorage.push(this);
    this.load = ()=>{
      if(this.opacity < 0.1){
        this.opacity = 0;
      }
      c.globalAlpha = this.opacity;
      c.fillStyle = this.color;
      c.font = this.size+`px ${this.font}`;
      c.fillText(this.text,this.x,this.y)
      c.fill()
      c.globalAlpha = 1;
    }
 }

function BorderBox(x, y, w, h,borderWidth, rotate, col) {
    this.rotation = rotate;
    this.x = x;
    this.y = y;
    this.force = 0;
    this.forceX = 0;
    this.mass = 1;
      this.z = 0;
    this.forceY = 0;
    this.width = w;
    AddToCamera(this);
    this.eyeArea = true;
    this.opacity = 1;
    this.height = h;
    this.borderWidth = borderWidth;
    this.color = col;
    this.followCamera = true;
    this.load = function() {
      c.beginPath()
      c.globalAlpha = this.opacity;
      c.translate(this.x + this.width / 2, this.y + this.height / 2);
      c.rotate((this.rotation * Math.PI) / 180);
      c.translate(-(this.x + this.width / 2), -(this.y + this.height / 2))
      c.strokeStyle = this.color;
      c.stroke()
      c.lineWidth = this.borderWidth;
      c.strokeRect(this.x, this.y, this.width, this.height);
      c.fill();
      c.stroke()
      c.globalAlpha = 1;
      c.setTransform(1, 0, 0, 1, 0, 0);
    }
    this.moveY = function(rate) {
      this.y += rate;
    }
    this.moveX = function(rate) {
      this.x += rate;
    }
    this.touch = function() {
      return mouse.x >= this.x && mouse.x <= this.x + this.width && mouse.y >= this.y && mouse.y <= this.y + this.height;
    }
    this.touchExternal = function(mouse) {
      return mouse.x >= this.x && mouse.x <= this.x + this.width && mouse.y >= this.y && mouse.y <= this.y + this.height;
    }
  }
function Line(sx,sy,ex,ey,lw,color){
  this.startX = sx;
  this.startY = sy;
  this.endX = ex;
  this.endY = ey;
  this.z = 0;
  this.force = 0;
  this.forceX = 0;
  this.mass = 1;
  this.forceY = 0;
  this.type = "LINE";
  this.lineWidth = lw;
  this.eyeArea = true;
  AllElementStorage.push(this);
  this.color = color;
  this.sides = [];
  this.load = ()=>{
    this.sides = [
      [{x:this.startX,y:this.startY},{x:this.endX,y:this.endY}]
      ];
    c.save();
		c.strokeStyle = this.color;
		c.lineWidth = this.lineWidth;
		c.beginPath();		
		c.moveTo(this.startX,this.startY);
		c.lineTo(this.endX,this.endY);	
		c.closePath();		
		c.stroke();
  }
}
function Linker(color,lineWidth){
this.color = color;
this.linker = true;
this.lineWidth = lineWidth;
this.link = (target1,target2, customize = [0,0,0,0]) =>{
c.save();
c.strokeStyle = this.color;
c.lineWidth = this.lineWidth;
c.beginPath();
c.moveTo(target1.xp + customize[0], target1.yp + customize[1]);
c.lineTo(target2.xp + customize[2], target2.yp + + customize[3]);
c.closePath();
c.stroke();
}
}
function Gradient(x1,y1,x2,y2,c1,c2){
    this.color = c.createLinearGradient(x1,y1,x2,y2);
    this.color.addColorStop(0,c1);
    this.color.addColorStop(1,c2);
}
function frame(v){
   return requestAnimationFrame(v)
}
function clear(){
    return c.clearRect(0,0,renderer.width,renderer.height);
}
function Destroy(object , timer = 0){
    setTimeout(()=>{
      object.x = 99999999999;
      object.y = 99999999999;
    },timer*1000)
  }
function Collision(object1,object2){
  if(object1.radiusX && object2.radiusX){
    if(
    _d(object1.x,object1.y,object2.x,object2.y) < object1.radiusX+object2.radiusX&&
    _d(object1.x,object1.y,object2.x,object2.y) < object1.radiusY+object2.radiusY
    ){
      return true;
   }
}else if(object1.width && object2.radiusX){
  if(
    object1.x + object1.width >= object2.x - object2.radiusX&&
    object1.x <= object2.x + object2.radiusX&&
    object1.y + object1.height >= object2.y - object2.radiusY &&
    object1.y <= object2.y + object2.radiusY
    ){
    return true;
  }
}else if(object1.radiusX && object2.width){
  if(
    object2.x+ object2.width >= object1.x - object1.radiusX&&
    object2.x <= object1.x + object1.radiusX&&
    object2.y + object2.height >= object1.y - object1.radiusY &&
    object2.y <= object1.y + object1.radiusY
    ){
    return true;
  }
}else if(object1.radius,object2.radiusX){
  if(
    _d(object1.x, object1.y, object2.x, object2.y) < object1.radius + object2.radiusX &&
    _d(object1.x, object1.y, object2.x, object2.y) < object1.radius + object2.radiusY
    ){
    return true;
  }
}else if (object1.radiusX, object2.radius) {
  if (
    _d(object1.x, object1.y, object2.x, object2.y) < object1.radiusX + object2.radius &&
    _d(object1.x, object1.y, object2.x, object2.y) < object1.radiusY + object2.radius
  ) {
    return true;
  }
}else if(object1.width && object2.width){
    if(
    object1.x + object1.width>= object2.x && object1.x <= object2.x + object2.width && object1.y <= object2.y + object2.height && object1.y + object1.height>= object2.y) {
      return true;
    }
  }else if (object1.radius && object2.radius) {
    if (distance(object1.x,object1.y,object2.x,object2.y) < object1.radius+object2.radius) {
      return true;
    }
  }else if(object1.radius && object2.width ){
    if(object1.x + object1.radius >= object2.x && object1.x - object1.radius <= object2.x + object2.width && object1.y + object1.radius >= object2.y && object1.y - object1.radius <= object2.y + object2.height){
      return true;
    }
    }else if(object1.width,object2.radius){
            if(object2.x + object2.radius >= object1.x && object2.x- object2.radius <= object1.x + object1.width && object2.y + object2.radius >= object1.y && object2.y - object2.radius <= object1.y + object1.height){
      return true;
    }
    }else{
      console.warn(`collision key of ${object1} and ${object2} is not found report bug in silver.bugfix.com`)
    }
  }
function Speech(text){
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
}
function FlameParticle(x,y,radius,dtime,ftime,amount,color,gravityX,gravityY,spread){
  this.x = x;
  this.y = y;
  this.force = 0;
  this.forceX = 0;
  this.mass = 1;
  this.forceY = 0;
  this.radius = radius;
  this.dtime = dtime;
  this.ftime = ftime;
  this.amount = amount;
  this.color = color;
  this.eyeArea = true;
  AllElementStorage.push(this)
  this.gravityX = gravityX;
  this.gravityY = gravityY;
  this.spread = spread;
  this.followCamera = true;
  this.array = [];
  this.vStop = new Circle(this.x,this.y,this.radius,this.color);
  this.load = ()=>{
    this.vStop.load()
    if (this.amout < 1) {
      Destroy(this.vStop);
    }
    this.array.forEach(partical =>{
      partical.load()
      partical.x += this.gravityX - Math.random()*this.spread + Math.random()*this.spread;
      partical.y += this.gravityY;
      partical.radius -= this.dtime;
      if(partical.radius < 1){
        this.array.shift()
      }
    })
  }
  this.run = ()=>{
    setInterval(()=>{
      if(this.amount > 0){
        this.array.push(new Circle(this.x,this.y,this.radius,this.color))
        this.amount -= 1;
        this.vStop.x = this.x;
        this.vStop.y = this.y;    
      }else {
        Destroy(this.vStop);
      }
    },this.ftime)
  }
}
function $border(component,color,width){
  let a = new BorderBox(component.x, component.y, component.width, component.height, width, component.rotation, color);
  a.x = component.x;
  a.y = component.y;
  a.opacity = component.opacity;
  a.load()
}
function AngleToAxis(angle){
  return {
    x : Math.cos(angle * Math.PI/180),
    y : Math.sin(angle * Math.PI/180)
  }
}
function AxisToAngle(lx,ly,fx,fy){
  return Math.atan2(fy-ly,fx-lx)*(180/Math.PI)
}
function AxisToAngleR(lx,ly,fx,fy){
  return Math.atan2(fy-ly,fx-lx);
}
function _(components = []){
  components.forEach(component=>{
    component.load()
  })
}
var Animation = {
  Add : (animator,animations = [])=>{
   animations.forEach(animation =>{
     animator.add(animation);
   })
  }
}
function _c(x,y,w,h,r,col){
  return new Rect(x,y,w,h,r,col);
}
function _i(src,x,y,w,h,r){
  return new ImageSrc(src,x,y,w,h,r);
}
function _is(src,x,y,w,h,sx,sy,sw,sh,r){
  return new ImageSheetSrc(src,x,y,w,h,sx,sy,sw,sh,r);
}
function _cl(x,y,rx,ry,r,col){
  return new Eclipse(x,y,rx,ry,r,col)
}
function _s(x,y,r,col){
  return new Circle(x,y,r,col);
}
function _b(x,y,w,h,lw,r,col){
  return new BorderBox(x,y,w,h,lw,r,col);
}
function _l(sx,sy,ex,ey,lw,col){
  return new Line(sx,sy,ex,ey,lw,col)
}
function _lk(col,lw){
  return new Linker(col,lw)
}
function _p(x,y,r,dt,ft,am,co,gx,gy,sp){
  return new Partical(x,y,r,dt,ft,am,co,gx,gy,sp);
}
function $b(component, color, w) {
  let a = new BorderBox(component.x, component.y, component.width, component.height, w, component.rotation, color);
  a.x = component.x;
  a.y = component.y;
  a.load()
}
function $Keyboard(down = new Function,up = new Function){
  let d = down;
  let u = up;
  addEventListener("keydown",(event)=>{
    d(event)
  })
  addEventListener("keyup",(event)=>{
    u(event)
  })
}
function $Mouse(output){
  addEventListener("mousemove", event =>{
    output(event);
  })
}
function _RectMap(width,height,color,output,map){
  map.forEach(m =>{
    output.push(_c(m[0]*width,m[1]*height,width,height,0,color));
  })
}
function RectClass(width,height,rotation,color,shadowRad = 0){
  this.width = width;
  this.height = height;
  this.color = color;
  this.rotation = rotation;
  this.shadowRad = shadowRad;
  this.copy = (x,y,type)=>{
    let comp =  _c(x,y,this.width,this.height,this.rotation,this.color);
    comp.shadowRadius = this.shadowRad;
    comp.tileType = type;
    return comp;
  }
}
function CircleClass(radius, color) {
  this.radius = radius;
  this.color = color;
  this.copy = (x, y) => {
    return _s(x, y, this.radius, this.color);
  }
}
function ImageClass(src,width, height, rotation,z = 0,flipX = false,flipY = false) {
  this.src = src;
  this.width = width;
  this.height = height;
  this.z = z;
  this.rotation = rotation;
  this.copy = (x, y) => {
    let a = _i(src,x, y, this.width, this.height, this.rotation);
    a.z = this.z;
    a.flipX = flipX;
    a.flipY = flipY;
    return a;
  }
}
function ImageSheetClass(src,sx,sy,sw,sh,width,height,rotation,z = 0,fx = false,fy = false) {
  this.src = src;
  this.width = width;
  this.height = height;
  this.fx = fx;
  this.fy = fy;
  this.sx = sx;
  this.z = z;
  this.sy = sy;
  this.sw = sw;
  this.sh = sh;
  this.rotation = rotation;
  this.copy = (x, y) => {
    let a = new ImageSheetSrc(src, x, y, this.width, this.height,this.sx,this.sy,this.sw,this.sh, this.rotation); 
    a.flipX = this.fx;
    a.z = this.z;
    a.flipY = this.fy;
    return a;
  }
}
function EclipseClass(radiusX, radiusY, rotation, color) {
  this.radiusX = radiusX;
  this.radiusY = radiusY;
  this.color = color;
  this.rotation = rotation;
  this.copy = (x, y) => {
    return _cl(x, y, this.radiusX, this.radiusY, this.rotation, this.color);
  }
}
function Animator(){
  this.animationList = [];
  this.playingId = "#EMPTY";
  this.animating = [];
  this.add = (animation)=>{
    this.animationList.push(animation);
  }
  this.change = (name)=>{
    this.animationList.forEach(animation =>{
      if(animation.name == name){
        animation.playing = true;
      }else{
        animation.playing = false;
      }
      if(animation.name == name && animation.tag == "ICA" && animation.playing == true){
        let index = 0;
        animation.component.img.src = animation.spriteArray[animation.index];
        if(animation.type == "#ONE-TIME"){
          if(animation.index < animation.spriteArray.length){
            animation.index++
          }else{
            animation.end();
          }
        }else if(animation.type == "#LOOP"){
          animation.index++
          if(animation.index >= animation.spriteArray.length){
            animation.end();
            animation.index = 0;
          }
        }
      }
      if(animation.name == name && animation.tag == "SSA" && animation.playing == true){
        animation.component.img.src = animation.image;
          animation.component.sx = animation.frameX * animation.component.sw;
          animation.component.sy = animation.frameY * animation.component.sh;
          animation.frameX = animation.frame % animation.row;
          animation.frameY = Math.floor(animation.frame / animation.col);
          if(animation.type == "#ONE-TIME"){
          if(animation.frame < animation.maxframe){
            animation.frame++
          }else{
            animation.end();
          }
          }else if(animation.type == "#LOOP"){
            animation.frame++
            if(animation.frame >= animation.maxframe){
              animation.end();
              animation.frame = animation.minframe;
            }
          }
      }
      if(animation.name == name && animation.tag == "SLA"){
        animation.component.sy = animation.spriteY;
        animation.component.img.src = animation.image;
          animation.component.sx = animation.frameX*animation.component.sw;
          if(animation.type == "#ONE-TIME"){
            if(animation.frameX < animation.max){
              animation.frameX++;
            }else{
              animation.end();
            }
          }else if(animation.type == "#LOOP"){
            animation.frameX++
            if(animation.frameX >= animation.max){
              animation.end();
              animation.frameX = animation.min;
            }
          }
      }
    })
  }
  this.play = (name)=>{
    this.animating.push(name);
  }
  this.start = ()=>{
  this.change(this.animating[this.animating.length-1]);
  };
}
function ImageChangingAnimation(component,type,name,spriteArray,end = ()=>{}){
  this.playing = false;
  this.end = end;
  this.component = component;
  this.spriteArray = spriteArray;
  this.type = type;
  this.name = name;
  this.index = 0;
  this.tag = "ICA";
 }
function SpriteSheetAnimation(component,image,name,type,minframe,maxframe,row,col,end = ()=>{}){
  this.playing = true;
  this.end = end;
  this.image = image;
  this.component = component;
  this.type = type;
  this.name = name;
  this.frame = minframe;
  this.row = row;
  this.col = col;
  this.frameX = 0;
  this.frameY = 0;
  this.minframe = minframe;
  this.maxframe = maxframe;
  this.tag = "SSA";
 }
function SpriteLineAnimation(component,image,name,type,spriteY,min,max,end=()=>{}){
  this.component = component;
  this.image = image;
  this.type = type;
  this.end = end;
  this.spriteY = spriteY;
  this.frameX = 0;
  this.min = min;
  this.max = max;
  this.name = name;
  this.tag = "SLA";
}
function ClassMap(classname, output, map) {
  map.forEach(m => {
    output.push(classname.copy(m[0] * classname.width, m[1] * classname.height));
  })
}
function CustomVerticesComponent(x,y,color,vertices){
  this.sides = [];
  this.x = x;
  this.y = y;
  this.color = color;
  this.vertices = vertices;
  this.load = ()=>{
    this.sides = this.vertices(this.x,this.y);
    c.beginPath()
    c.moveTo(this.sides[0][0].x,this.sides[0][0].y)
    for (var i = 1; i < this.sides.length; i++) {
      c.lineTo(this.sides[i][0].x,this.sides[i][0].y);
      c.lineTo(this.sides[i][1].x,this.sides[i][1].y)
    }
    c.fillStyle = this.color;
    c.fill()
    c.closePath()
  }
}
function Time(time,func){
  setInterval(()=>{
    func()
  },time);
}
function lookAt(looker = [],focus,def = [0]){
  looker[0].rotation = AxisToAngle(looker[1].x,looker[1].y,focus.x,focus.y)-def;
}
function TileMap(x,y,dataArray,gridRows,gridCols,output,map){
  for (var eachRow = 0; eachRow < gridRows; eachRow++) {
    for (var eachCol = 0; eachCol < gridCols; eachCol++) {
      var arrayIndex = eachRow * gridRows + eachCol;
      for(let i = 0; i < dataArray.length; i++) {
        if (map[arrayIndex] === dataArray[i].index) {
          output.push(dataArray[i].class.copy(dataArray[i].class.width * eachCol + x, dataArray[i].class.height * eachRow + y,"obst"))
        } 
      }
    }
  }
}
function TileMap2C(x,y,class1,class0,gridRows,gridCols,output,map){
  for (var eachRow = 0; eachRow < gridRows; eachRow++) {
    for (var eachCol = 0; eachCol < gridCols; eachCol++) {
      var arrayIndex = eachRow * gridRows + eachCol;
      if (map[arrayIndex] === 1) {
        output.push(class1.copy(class1.width * eachCol + x, class1.height * eachRow + y,"obst"))
      }else if(map[arrayIndex] === 0){
        output.push(class0.copy(class0.width * eachCol + x, class0.height * eachRow + y,"free"))
      }
    }
  }
}
function TileMap3C(x, y, class1, class2, class0, gridRows, gridCols, output, map) {
  for (var eachRow = 0; eachRow < gridRows; eachRow++) {
    for (var eachCol = 0; eachCol < gridCols; eachCol++) {
      var arrayIndex = eachRow * gridRows + eachCol;
      if (map[arrayIndex] === 1) {
        output.push(class1.copy(class1.width * eachCol + x, class1.height * eachRow + y))
      }else if(map[arrayIndex] === 2){
        output.push(class2.copy(class2.width * eachCol + x, class2.height * eachRow + y))
      }else if(map[arrayIndex] === 0){
        output.push(class0.copy(class0.width * eachCol + x, class0.height * eachRow + y))
      }
    }
  }
}
function TileMap5C(x, y, class1, class2,class3,class4,class5, class0, gridRows, gridCols, output, map) {
  for (var eachRow = 0; eachRow < gridRows; eachRow++) {
    for (var eachCol = 0; eachCol < gridCols; eachCol++) {
      var arrayIndex = eachRow * gridRows + eachCol;
      if (map[arrayIndex] === 1) {
        output.push(class1.copy(class1.width * eachCol + x, class1.height * eachRow + y))
      }else if(map[arrayIndex] === 2){
        output.push(class2.copy(class2.width * eachCol + x, class2.height * eachRow + y))
      }else if (map[arrayIndex] === 3) {
        output.push(class3.copy(class3.width * eachCol + x, class3.height * eachRow + y))
      }else if (map[arrayIndex] === 4) {
        output.push(class4.copy(class4.width * eachCol + x, class4.height * eachRow + y))
      }else if (map[arrayIndex] === 5) {
        output.push(class5.copy(class5.width * eachCol + x, class5.height * eachRow + y))
      }else if(map[arrayIndex] === 0){
        output.push(class0.copy(class0.width * eachCol + x, class0.height * eachRow + y))
      }
    }
  }
}
function Triangle(x,y,radius,r,color){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.rotation = r;
  this.color = color;
  this.sides = [];
  this.load = ()=>{
    this.sides = [
     [{x:this.x-radius,y:this.y-this.radius},{x:this.x+radius,y:this.y-this.radius}],
     [{x:this.x+this.radius,y:this.y-radius},{x:this.x,y:this.y+this.radius}],
     [{x:this.x,y:this.y+this.radius},{x:this.x-this.radius,y:this.y-this.radius}],
      ];
     c.beginPath()
     c.moveTo(this.sides[0][0].x,this.sides[0][0].y);
     c.lineTo(this.sides[0][1].x,this.sides[0][1].y);
     c.lineTo(this.sides[1][0].x,this.sides[1][0].y);
     c.lineTo(this.sides[1][1].x,this.sides[1][1].y);
     c.lineTo(this.sides[2][0].x,this.sides[2][0].y);
     c.lineTo(this.sides[2][1].x,this.sides[2][1].y);
     c.fillStyle = this.color;
     c.fill()
     c.closePath()
   }
} 
function Polygon(x,y,side,radius,color){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.side = side;
  this.color = color;
  this.angle = Math.PI/2;
  this.sides = [];
  this.points = [];
  this.load = ()=>{
    c.beginPath()
  for (var i = 0; i <= this.side; i++) {
    let px = this.x + this.radius * Math.cos(this.angle);
    let py = this.y + this.radius * Math.sin(this.angle);
    if(i == 0){
      c.moveTo(px,py)
    }else{
      c.lineTo(px,py);
    }
    this.points.push({x:px,y:py});
    c.fillStyle = this.color;
    c.fill()
    this.angle += Math.PI*2/this.side;
  } 
  }
}
function PolygonLine(x, y, side, radius,lineWidth, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.side = side;
  this.color = color;
  this.points = [];
  this.sides = [];
  this.lineWidth = lineWidth;
  this.angle = Math.PI / 2;
  this.load = () => {
    c.beginPath()
    for (var i = 0; i <= this.side; i++) {
      let px = this.x + this.radius * Math.cos(this.angle);
      let py = this.y + this.radius * Math.sin(this.angle);
      if (i == 0) {
        c.moveTo(px, py)
      } else {
        c.lineTo(px, py);
        this.sides.push([{x:this.points[i-1].x,y:this.points[i-1].y},{x:px,y:py}])
      }
      this.points.push({x:px,y:py})
      c.strokeStyle = this.color;
      c.lineWidth = this.lineWidth;
      c.stroke()
      this.angle += Math.PI * 2 / this.side;
    }
  }

}
function lerp(A,B,t){
  return A+(B-A)*t;
}
function $(id){
  return document.getElementById(id);
}
function position(x,y){
  return {
    x : x,
    y : y,
  }
}
function vec2(x,y) {
  return {
    x : x,
    y : y
  }
}
function angleObject(x,y,Srad,Erad,color,angle,speed,min,vx,vy){
 this.speed = speed;
 this.angle = angle;
 this.Erad = Erad;
 this.x = x;
 this.y = y;
 this.color = color;
 this.Srad = Srad;
 this.gravity = 0;
 this.min = min;
 this.body = new Circle(this.x,this.y,this.Srad,this.color);
 this.vx = vx;
 this.vy = vy; 
 this.load = ()=>{
  this.body.load()
  this.body.x+= this.speed*AngleToAxis(this.angle+Math.random()*this.vx).x;
  this.body.y+= this.gravity + this.speed*AngleToAxis(this.angle+Math.random()*this.vy).y;
  if(this.body.radius > this.Erad+0.1){
    this.body.radius-=this.min;
  }else if(this.body.radius < this.Erad){
    this.body.radius+=this.min;
  }
 }
}
function AngleParticle(x,y,startRadius,endRadius,color,minAngle,angle,speed,min,amount,vx,vy){
  this.x = x;
  this.y = y;
  this.min = min;
  this.startRadius = startRadius;
  this.endRadius = endRadius;
  this.color = color;
  this.minAngle = minAngle;
  this.angle = angle;
  AllElementStorage.push(this)
  this.speed = speed;
  this.length;
  this.amount = amount;
  this.maxAngle = 25;
  this.store = [];
  this.centerPoint = new Circle(x,y,10,"red");
  this.load = ()=>{
    this.centerPoint.color = this.color;
    this.centerPoint.radius = this.startRadius;
    this.length = {
      value : this.store.length,
      log : ()=>{
        console.log(this.store.length);
      }
    }
    _(this.store);
    // this.centerPoint.load()
    if(this.amount > 0){
    for (let i = this.minAngle; i < this.maxAngle; i++) {
      this.store.push(new angleObject(this.x,this.y,this.startRadius,this.endRadius,this.color,i*(this.angle/this.maxAngle),this.speed,this.min,vx,vy)); 
      if(this.store[0].body.radius < this.min){
      this.store.splice(0,1);
      }
    }
    this.amount--;
  }else{
    Destroy(this.centerPoint);
  }
  }
}
function MouseDown(func){
  addEventListener("mousedown",e=>{
    func(e)
  })
}
function __(list = [],func = ()=>{}){
 list.forEach(val=>{
  func(val)
 })
}
function dragable(component){
  let cdn = false;
  let vx = 0;
  let vy = 0;
  var mouse = Input.mouse;
  addEventListener("mousedown",(e)=>{
    cdn = true;
    vx = component.x - e.x;
    vy = component.y - e.y;
  });
  addEventListener("mousemove",e=>{
   if(cdn == true && component.touch(e)){
    component.x = e.x + vx;
    component.y = e.y + vy;
   }
  })
  addEventListener("mouseup",()=>{cdn = false});
}
function middle(a,b){
  return (a+b)/2;
}
var type = {
  LOOP : "#LOOP",
  OT : "#ONE-TIME"
}
function AddToCamera(all){
  AllElementStorage.push(all);
  all.eyeArea = true;
}
function SET_DEPTH(drawingStuff = []){
  drawingStuff.sort((a,b)=>{
    return a.z - b.z;
  })
}
function TCA(Tclass,x,y,lx,ly,output){
  for (let i = 0; i < ly; i++) {
  for (let j = 0; j < lx; j++) {
    output.push(Tclass.copy(x+(Tclass.width*j),y+(Tclass.height*i)));
  }    
  }
}
function StartAnimator(time,animator){
  Time(time,()=>{
    animator.start();
  })
}
function remove(arr = [],i = 0){
      arr.splice(i,1);
}
function AMF(animator,motion){
  Time(motion,()=>{
    animator.start();
  })
}
function vec3(x,y,z){
  return {
    x : x,
    y : y,
    z : z
  }
}
function vec4(x,y,z,w){
  return {
    x : x,
    y : y,
    z : z,
    w : w
  }
}
function MainLight(shade,source = vec2(centerX,centerY),intensity = 700,color = vec3(0,0,0)){
  return shade.color = rgba(color.x,color.y,color.z,_d(shade,source)/intensity)
}
function EmptyObject(x = 0,y = 0,width = 0,height = 0,rotation = 0){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.rotation = rotation;
}
var Gizmos = {
  AreaMark : (obj,color = "lime")=>{
    _([new Rect(obj.x,obj.y,obj.width,obj.height,0,color)]);
  }
}
var System = {
  ObjectCache : ()=>{
    return AllElementStorage.length;
  }
}
function InstantAudio(src,volumn = 1,loop = false){
  let aud867554 = new Audio(src);
  aud867554.volume = volumn;
  aud867554.play();
  aud867554.loop = loop;
}
function Pixel(x,y,col,i){
  this.x = x;
  this.y = y;
  this.color = col;
  this.pixel = i;
  this.opacity = 1;
  this.load = ()=>{
    c.globalAlpha = this.opacity;
    c.fillStyle = this.color;
    c.fillRect(this.x,this.y,this.pixel,this.pixel);
    c.globalAlpha = 1;
  }
}
function PixelPlate(sx,sy,sw,sh,color,px = 1){
  this.x = sx;
  this.y = sy;
  this.width = sw;
  this.height = sh;
  this.center = {
    x : sx+(sw/2)*px,
    y : sy+(sh/2)*px
  }
  this.storage = [];
  this.pixelSize = px;
for(var i=0;i<sw/px;i++) {
    for(var j=0;j<sh/px;j++) {
      this.storage.push(
        new Pixel(sx+i*this.pixelSize,sy+j*this.pixelSize,color,this.pixelSize)
      );
    }
}
  this.load = ()=>{
    _(this.storage)
  }
  this.script = (action = ()=>{})=>{
    this.storage.forEach((v,i,a)=>{
      action(v,i);
    })
  }
}
var RadToDeg = (180/Math.PI);