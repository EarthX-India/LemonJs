var ltx;
// utility methods
var Util = {};
Util["id"] = (id)=>{return document.getElementById(id)}
Util["loop"] = (func)=>{requestAnimationFrame(func);clearJunkPixels()}
Util["speech"] = (text) =>{window.speechSynthesis.speak(new SpeechSynthesisUtterance(text))}
// Screen method
var centerX = innerWidth/2,
    centerY = innerHeight/2;
// input methods
var Input = {};
Input["mouse"] = {};
Input.mouse["pressed"] = false;
Input.mouse["released"] = false;
Input.mouse["x"] = 0;
Input.mouse["y"] = 0;
Input["kbd"] = {};
Input.kbd["pressed"] = false;
Input.kbd["released"] = false;
Input.kbd["key"] = undefined;
addEventListener("mousemove",e=>{
    Input.mouse.x = e.clientX;
    Input.mouse.y = e.clientY;
})
addEventListener("mousedown", e=>{
    Input.mouse.pressed = true;
    Input.mouse.released = false;
})
addEventListener("mouseup",e=>{
    Input.mouse.pressed = false;
    Input.mouse.released = true;
})
addEventListener("keydown",e=>{
    Input.kbd.pressed = true;
    Input.kbd.released = false;
    Input.kbd.key = e.key;
})
addEventListener("keyup",e=>{
    Input.kbd.pressed = false;
    Input.kbd.released = true;
})
// element storage
var Base = {};
Base["component"] = [];
var Type = {
    loop : "#LOOP",
    ot : "#ONE-TIME"
}
var RadToDeg = (180/Math.PI);
// setup
class Camera{
  constructor(x,y){
    this.move(x,y);
  }
  move(x,y){
    __(Base.component, e=>{
      if(e.cameraControll == true){
      e.x -= x;
      e.y -= y;
      }
    })
  }
}
class LemonView{
    constructor(canvas){
        this.renderer = canvas;
        ltx = this.renderer.getContext("2d");
    }
    AddStyle(style){
        this.renderer.setAttribute("style",style);
    }
    fullScreen(){
        this.renderer.width = innerWidth;
        this.renderer.height = innerHeight;
        this.renderer.style.position = "absolute";
        this.renderer.style.left = 0;
        this.renderer.style.top = 0;
        document.body.style.overflow = "hidden";
    }
    solidColor(color){
        this.renderer.style.backgroundColor = color;
    }
}
// methods
function EnableDepth(drawingStuff = []){
  drawingStuff.sort((a,b)=>{
    return a.z - b.z;
  })
}
function Destroy(component,time=0){
  setTimeout(()=>{
    component.x = Infinity;
    component.y = Infinity;
  },time);
}
function unPoint(number){
    return Math.floor(number);
}
function random(min,max){
    return min+Math.random()*(max-min);
}
function IRandom(min,max){
    return unPoint(random(min,max))
}
function clearJunkPixels(){
    ltx.clearRect(0,0,innerWidth,innerHeight);
}
function distance(pos1 = point2(0,0),pos2 = point2(0,0)){
  this.destx = pos2.x - pos1.x;
  this.desty = pos2.y - pos1.y;
  return Math.sqrt(Math.pow(this.destx, 2) + Math.pow(this.desty, 2));
}
function RectClick(area = point4(0,0,0,0)){
    return (Input.mouse.x >= area.x && Input.mouse.x <= area.x + area.width && Input.mouse.y >= area.y && Input.mouse.y <= area.y + area.width);
}
function CircleClick(area = point3(0,0,0)){
    return (distance(Input.mouse,area) <= area.radius);
}
function setBorder(component = point5(0,0,0,0,0), lw, color){
    ltx.translate(component.x + component.width/2, component.y + component.height/2);
    ltx.rotate((component.rotation * Math.PI) / 180);
    ltx.translate(-(component.x + component.width/2),-(component.y + component.height/2))
    ltx.strokeStyle = color;
    ltx.lineWidth = lw;
    ltx.strokeRect(component.x, component.y, component.width, component.height);
    ltx.stroke();
    ltx.setTransform(1,0,0,1,0,0);
}
function _(array){
    array.forEach((v)=>{
        v.load();
    })
}
function __(array,ev){
  array.forEach(v=>{
    ev(v);
  })
}
function SetMotion(animator,motion){
    setInterval(()=>{
      animator.start();
    },motion)
  }
function AngleToAxis(angle){
    return {
        x : Math.cos(angle * Math.PI/180),
        y : Math.sin(angle * Math.PI/180)
    }
}
function AxisToAngle(x1,y1,x2,y2){
   return Math.atan2(y2-y1,x2-x1)*(180/Math.PI);
}
function lookAt(com, target = point2(0,0)){
    com.rotation = AxisToAngle(com.x + (com.width/2), com.y + (com.height/2), target.x, target.y);
}
// @ postion
var point2 = (x,y)=>{return {x:x,y:y}};
var point3 = (x,y,r)=>{return {x:x,y:y,radius:r}};
var point4 = (x,y,w,h)=>{return {x:x,y:y,width:w,height:h}};
var point5 = (x,y,w,h,r)=>{return {x:x,y:y,width:w,height:h,rotation:r}};
// transform states
class State0{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.z = 0;
        this.opacity = 1;
        this.cameraControll = true;
    }
}
class State1 extends State0{
    constructor(x,y,width,height){
        super(x,y);
        this.width = width;
        this.height = height;
        this.collisionType = "wxh";
    }
}
class State2 extends State1{
    constructor(x,y,width,height,rotation){
        super(x,y,width,height);
        this.rotation = rotation;
        this.flipX = false;
        this.flipY = false;
    }
}
class State3 extends State0{
    constructor(text,x,y,fontSize,color){
        super(x,y);
        this.text = text;
        this.size = fontSize;
        this.color = color;
        this.font = "Arial";
    }
}
class State4{
    constructor(width,height,rotation){
        this.width = width;
        this.height = height;
        this.rotation = rotation;
    }
}
class State5{
  constructor(){
    this.x = x;
    this.y = y;
    this.amount = amount;
    this.lifeTime = lifeTime;
    this.color = color;
    this.gravityX = gravityX;
    this.gravityY = gravityY;
    this.angle = angle;
    this.rotation = rotation;
  }
}
//geometries
class Rectangle extends State1{
    constructor(x,y,width,height,rotation,color){
        super(x,y,width,height);
        this.rotation = rotation;
        this.color = color;
        Base.component.push(this);
    }
    load(){
          if(this.opacity < 0.01){
            this.opacity = 0;
          }
          ltx.globalAlpha = this.opacity;
          ltx.translate(this.x + this.width/2, this.y + this.height/2);
          ltx.rotate((this.rotation * Math.PI) / 180);
          ltx.translate(-(this.x + this.width/2),-(this.y + this.height/2))
          ltx.fillStyle = this.color;
          ltx.fillRect(this.x,this.y,this.width,this.height);
          ltx.fill();
          ltx.globalAlpha = 1;
          ltx.setTransform(1,0,0,1,0,0);
    }
}
class StrokeRectangle extends State1{
    constructor(x,y,width,height,bw,rotation,color){
        super(x,y,width,height);
        this.rotation = rotation;
        this.borderWidth = bw;
        this.color = color;
        Base.component.push(this);
    }
    load(){
          if(this.opacity < 0.01){
            this.opacity = 0;
          }
          ltx.globalAlpha = this.opacity;
          ltx.translate(this.x + this.width/2, this.y + this.height/2);
          ltx.rotate((this.rotation * Math.PI) / 180);
          ltx.translate(-(this.x + this.width/2),-(this.y + this.height/2))
          ltx.lineWidth = this.borderWidth;
          ltx.strokeStyle = this.color;
          ltx.strokeRect(this.x,this.y,this.width,this.height);
          ltx.stroke();
          ltx.globalAlpha = 1;
          ltx.setTransform(1,0,0,1,0,0);
    }
}
class Circle extends State0{
    constructor(x,y,radius,color){
        super(x,y);
        this.radius = radius;
        this.color = color;
        this.collisionType = "rxpi";
        Base.component.push(this);
    }
    load(){
        if(this.opacity < 0.01){
            this.opacity = 0;
        }
        ltx.globalAlpha = this.opacity;
        ltx.fillStyle = this.color;
        ltx.arc(this.x, this.y, this.radius, 0 , 2 * Math.PI);
        ltx.fill()
        ltx.globalAlpha = 1;
    }
}
class SingleImage extends State2{
    constructor(src,x,y,width,height,rotation){
        super(x,y,width,height,rotation);
        this.img = new Image();
        this.img.src = src;
        Base.component.push(this);
    }
    load(){
      if(this.opacity < 0.01){
        this.opacity = 0;
      }
      ltx.globalAlpha = this.opacity;
      ltx.translate(this.x + this.width / 2, this.y + this.height /2);
      ltx.rotate((this.rotation * Math.PI) / 180);
      if (this.flipX == true) {
        c.scale(-1, 1)
      }
      if (this.flipY == true) {
        c.scale(1, -1)
      }
      ltx.translate(-(this.x + this.width/2), -(this.y + this.height/2))
      ltx.beginPath()
      ltx.drawImage(this.img,this.x, this.y, this.width, this.height);
      ltx.setTransform(1, 0, 0, 1, 0, 0);
      ltx.globalAlpha = 1;
    }
}
class SheetImage extends State2{
    constructor(src,x,y,width,height,sx,sy,sw,sh,rotation){
        super(x,y,width,height,rotation);
        this.img = new Image();
        this.img.src = src;
        this.sx = sx;
        this.sy = sy;
        this.sw = sw;
        this.sh = sh;
        Base.component.push(this);
    }
    load(){
      if(this.opacity < 0.01){
          this.opacity = 0;
      }
      ltx.globalAlpha = this.opacity;
      ltx.translate(this.x + this.width / 2, this.y + this.height /2);
      ltx.rotate((this.rotation * Math.PI) / 180);
      if (this.flipX == true) {
        c.scale(-1, 1)
      }
      if (this.flipY == true) {
        c.scale(1, -1)
      }
      ltx.translate(-(this.x + this.width/2), -(this.y + this.height/2))
      ltx.beginPath()
      ltx.drawImage(this.img,this.sx,this.sy,this.sw,this.sh,this.x,this.y,this.width,this.height);
      ltx.setTransform(1, 0, 0, 1, 0, 0);
      ltx.globalAlpha = 1;
    }
}
class SolidText extends State3{
    constructor(text,x,y,size,color){
        super(text,x,y,size,color);
        Base.component.push(this);
    }
    load(){
        if(this.opacity < 0.01){
            this.opacity = 0;
        }
        ltx.globalAlpha = this.opacity;
        ltx.fillStyle = this.color;
        ltx.font = `${this.size}px ${this.font}`;
        ltx.fillText(this.text,this.x,this.y)
        ltx.fill()
        ltx.globalAlpha = 1;
    }
}
class StrokeText extends State3{
    constructor(text,x,y,size,lw,color){
        super(text,x,y,size,color);
        this.lineWidth = lw;
        Base.component.push(this);
    }
    load(){
        if(this.opacity < 0.01){
            this.opacity = 0;
        }
        ltx.globalAlpha = this.opacity;
        ltx.strokeStyle = this.color;
        ltx.lineWidth = this.lineWidth;
        ltx.font = `${this.size}px ${this.font}`;
        ltx.strokeText(this.text,this.x,this.y)
        ltx.stroke()
        ltx.globalAlpha = 1;
    }
}
function Collision(area1 = point4(0,0,0,0),area2 = point4(0,0,0,0)){
    if(area1.collisionType == area2.collisionType){
        if(area1.collisionType == "wxh"){
            return (area1.x + area1.width >= area2.x && area1.x <= area2.x + area2.width && area1.y + area1.height >= area2.y && area1.y <= area2.y + area2.height);
        }else if(area1.collisionType == "rxpi"){
            return (distance(area1,area2) <= area1.radius + area2.radius);
        }   
    }else if(area1.collisionType !== area2.collisionType){
        if(area1.collisionType == "wxh" && area2.collisionType == "rxpi"){
            return (area1.x + area1.width >= area2.x && area1.x <= area2.x + area2.radius && area1.y + area1.height >= area2.y && area1.y <= area2.y + area2.radius);
        }else if(area1.collisionType == "rxpi" && area2.collisionType == "wxh"){
            return (area1.x + area1.radius >= area2.x && area1.x <= area2.x + area2.width && area1.y + area1.radius >= area2.y && area1.y <= area2.y + area2.height);
        }
    }else{
        console.warn("collision method does not expected your given argument, please check.");
    }
}
class RectCloner extends State4{
    constructor(width,height,rotation,color){
        super(width, height, rotation);
        this.color = color;
    }
    copy(x,y){
        return new Rectangle(x,y,this.width,this.height,this.rotation,this.color);
    }
}
class ImageCloner extends State4{
    constructor(width, height, rotation, src){
        super(width, height, rotation);
        this.src = src;
    }
    copy(x,y){
        return new SingleImage(this.src, x, y, this.width, this.height, this.rotation);
    }
}
class SheetCloner extends State4{
    constructor(sx, sy, sw, sh, width, height, rotation, src){
        super(width, height, rotation);
        this.src = src;
        this.sx = sx;
        this.sy = sy;
        this.sw = sw;
        this.sh = sh;
    }
    copy(x,y){
        return new SheetImage(this.src, x, y, this.width, this.height, this.sx, this.sy, this.sw, this.sh, this.rotation);
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
  function Pixel(x,y,col,i){
    this.x = x;
    this.y = y;
    this.color = col;
    this.pixel = i;
    this.opacity = 1;
    this.load = ()=>{
      ltx.globalAlpha = this.opacity;
      ltx.fillStyle = this.color;
      ltx.fillRect(this.x,this.y,this.pixel,this.pixel);
      ltx.globalAlpha = 1;
    }
  }
  function PixelPlate(x,y,w,h,color,px = 1){
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.center = {
      x : x+(w/2)*px,
      y : y+(h/2)*px
    }
    this.storage = [];
    this.pixelSize = px;
  for(var i=0;i<w/px;i++) {
      for(var j=0;j<h/px;j++) {
        this.storage.push(
          new Pixel(x+i*this.pixelSize,y+j*this.pixelSize,color,this.pixelSize)
        );
      }
  }
    this.load = ()=>{
      _(this.storage)
    }
    this.script = (action = ()=>{})=>{
      this.storage.forEach((v,i)=>{
        action(v,i);
      })
    }
  }
  function InstantAudio(src,volumn = 1,loop = false){
    let aud867554 = new Audio(src);
    aud867554.volume = volumn;
    aud867554.play();
    aud867554.loop = loop;
  }
function BlockTiles(x,y,cloner,output,map){
    for (let i = 0; i < map.length; i++) {
      output.push(cloner.copy((map[i][0]*cloner.width)+x,(map[i][1]*cloner.height)+y));
    }
}
function xMove(component,fd,location,speed){
    if(fd == 0){
      if(component.x == location.x && component.y == location.y){
        return true;
        }else{
         if(component.x < location.x){
          component.x+=speed;
         }else if(component.x > location.x){
           component.x-=speed;
         }
         if(component.y < location.y){
           component.y+=speed;
         }else if(component.y > location.y){
           component.y-=speed;
         }
        }
    }else if(fd == 1){
      if(component.x == location.x && component.y == location.y){
        return true;
        }else{
         if(component.y < location.y){
           component.y+=speed;
         }else if(component.y > location.y){
           component.y-=speed;
         }
         if(component.x < location.x){
          component.x+=speed;
         }else if(component.x > location.x){
           component.x-=speed;
         }
        }
    }
}
class MoveMap{
  constructor(fd,map){
    this.index = 0;
    this.fd = fd;
    this.map = map;
  }
  move(component,speed){
    if(this.map.length > 0){
      if(component.x === this.map[this.index][0] && component.y === this.map[this.index][1]){
        if(this.index < this.map.length-1){
        this.index++
      }
      }else{
        xMove(component,this.fd,point2(this.map[this.index][0],this.map[this.index][1]),speed);
      }
    }
  }
}
