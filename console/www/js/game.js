gameData = `var x1=5,x2=150,y1=60,y2=60,w=5,h=20,bx=75,by=75,bw=5,bh=5,dx=-1,dy=1,move=null;function speed(e,y){return e/1e3*y}function load(){}function dpadDown(e){"UP"!==e&&"DOWN"!==e||(move=e)}function dpadUp(e){"UP"!==e&&"DOWN"!==e||(move=null)}function update(e){"UP"===move&&(y1=y2-=speed(70,e))<0&&(y1=y2=0),"DOWN"===move&&160<=(y1=y2+=speed(70,e))+h&&(y1=y2=160-h),bx+=speed(50,e)*dx,by+=speed(50,e)*dy,(bx<0||160<bx+bw)&&(dx*=-1),(by<0||160<by+bh)&&(dy*=-1)}function render(e){e.fill(x1,y1,w,h,7),e.fill(x2,y2,w,h,7),e.fill(bx,by,bw,bh,2)}`
