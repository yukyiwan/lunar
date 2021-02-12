var kayden = function (kayden) {

    //First presentation class: radar chart
    kayden.Radar = class Radar extends Container{
      constructor (radius=300, dimensions=5, level=10, data=[7,6,8,6,4], color1=clear, color2="#8b92c8", color3="#dbca1c", color4=clear, time=.1) { //color=clear, borderColor="#8b92c8", borderWidth=3, dimensions=5, radius=100
        super(radius, radius);
        this._radius = radius;
        this._dimensions = dimensions;
        this._level=level;
        this._data = data;
        this._blobs = [];
        this._color1 = color1;
        this._color2 = color2;
        this._color3 = color3;
        this._color4 = color4;
        this._time= time;
        this._dataPoints = [];

        interval (time, (obj)=>{
           this._blobs.push(new Blob({color:color1, borderColor:color2, borderWidth:3, points:dimensions, radius:radius/level*obj.count, interactive:false}).alp(1/obj.count).center(this));
           if (this.stage) {
             this.stage.update()
           }
         }, level);

         timeout (1,()=>{
           loop(this._data.length, (i)=>{
            this._dataPoints.push(this._blobs[data[i]-1].points[i]);
           });
         });

         timeout (1.1,()=>{
           this._graph = new Blob (color3, color4, 5, this._dataPoints,null,null,"none").alp(0.5).center(this)
           .animate({
           props:{alpha:0.2},
           time:1,
           rewind:true,
           loop:true,
           loopCount:1
           });
           if (this.stage) {
             this.stage.update()}
         });
      }
      get radius() {
        return this._radius;
      }
      set radius(value) {
        this._radius = value;
      }
      get dimensions() {
        return this._dimensions;
      }
      set dimensions(value) {
        this._dimensions = value;
      }
      get time() {
        return this._time;
      }
      set time(value) {
        this._time = value;
      }
      changeColor(color1, color2, color3, color4) {
          this._color1 = color1;
          this._color2 = color2;
          this._color3 = color3;
          this._color4 = color4;
          loop (this._blobs.length, (i)=>{
            this._blobs[i].color = color1;
            this._blobs[i].borderColor = color2;
          });
          this._graph.color = color3;
          this._graph.borderColor = color4;
      }
      }

    //Second presentation class: Bar Chart
    kayden.Bar = class Bar extends Container{
      constructor (width=500, height=200, dimensions=12, level=10, data =[1,2,3,4,5,6,7,8,9,10,10,10], color1="#8b92c8", color2=clear, color3="#140f38", color4=clear, ref=-1, time =.5, poly=true, pSca=1) {
         super(width, height);
         this._width = width;
         this._height = height;
         this._dimensions = dimensions;
         this._color1 = color1;
         this._color2 = color2;
         this._color3 = color3;
         this._color4 = color4;
         this._ref = ref;
         this._time= time;
         this._poly=poly;
         this._pSca=pSca;
         this._rects=[];
         this._polys=[];
         this.rWidth=width/(dimensions*1.5);
         this.rWidth2=height/(level*1.5);

         let promise = new Promise((resolve, reject)=>{
           interval (time, (obj)=>{
              this._rects.push(new Rectangle(this.rWidth, data[obj.count-1]*(height/level),color1, color2,2).alp(0)
              .centerReg().pos((this.rWidth/2+this.rWidth)*(obj.count-1)+(this.rWidth/2+this.rWidth)/4, 0, LEFT, BOTTOM, this).alp(0)
              .animate({props:{alpha:data[obj.count-1]/10},time:time}));
              if (this.stage) {
                this.stage.update()
              }
            }, dimensions);

          if(this._rects){
            resolve(this._rects);
          }else{
            console.log('fail');
            reject('');
          }
        });

        promise.then((value)=>{
              this.on("mouseover", e=>{
                this._ref=value.indexOf(e.target);
              });

              if (mobile)
              {this.on("click", e=>{
                  this._ref=this._rects.indexOf(e.target);
              });}

            if (poly) {
            // });
            interval(.1, (obj)=>{
              let radius
              if (height>width) {
                radius =.3*this.rWidth*pSca;
              }else{
                radius =.3*this.rWidth2*pSca;
              }
              loop(data[obj.count-1],(i)=>{
                this._polys.push(new Poly({radius:radius, pointSize: 2.5, color:color3, borderColor:color4,borderWidth:2}).addTo(this).loc(this._rects[obj.count-1]).mov(0,(data[obj.count-1]*(height/level)/2)*pSca-radius*4-radius*4*i).alp(.8).sca(.9) //-rWidth-rWidth*i
                // .bot()
                .animate({
                props:{scale:0},
                time:.5,
                rewind:true,
                loop:true,
                loopCount:8
              }));
              });
            }, data.length);
          }

        });
      }
      get width() {
       return this._width;
      }
      set width(value) {
       this._width = value;
      }
      get height() {
       return this._height;
      }
      set height(value) {
       this._height = value;
      }
      get dimensions() {
       return this._dimensions;
      }
      set dimensions(value) {
       this._dimensions = value;
      }
      get ref() {
       return this._ref;
      }
      set ref(value) {
       this._ref = value;
      }
      get time() {
       return this._time;
      }
      set time(value) {
       this._time = value;
      }
      get poly() {
       return this._poly;
      }
      set poly(value) {
       this._poly = value;
      }
      get pSca() {
       return this._pSca;
      }
      set pSca(value) {
       this._pSca = value;
      }
      setPSca(value){
       this._pSca=value;
       loop (this._polys.length, (i)=>{
          this._polys[i].radius*=value;
       });
      }
      changeColor(color1, color2, color3, color4) {
         this._color1 = color1;
         this._color2 = color2;
         this._color3 = color3;
         this._color4 = color4;
         loop (this._rects.length, (i)=>{
           this._rects[i].color = color1;
           this._rects[i].borderColor = color2;
         });
         loop (this._polys.length, (j)=>{
           this._polys[j].color = color3;
           this._polys[j].borderColor = color4;
         });
      }
      }

    return kayden;
} (kayden || {});
