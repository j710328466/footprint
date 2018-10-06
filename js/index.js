function initMap(){
    createMap();//创建地图
    setMapEvent();//设置地图事件
    addMapControl();//向地图添加控件
    addMarker();//向地图中添加marker
}

//创建地图
function createMap(){
    var map = new BMap.Map("container");          // 创建地图实例
    var point = new BMap.Point(101.488859,33.393234);//定义一个中心点坐标
    map.centerAndZoom(point,5);//设定地图的中心点和坐标并将地图显示在地图容器中
    window.map = map;//将map变量存储在全局
}

//地图事件设置函数：
function setMapEvent(){
    map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
    //map.enableScrollWheelZoom();//启用地图滚轮放大缩小
    map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
    map.enableKeyboard();//启用键盘上下左右键移动地图
}

 //地图控件添加函数：
function addMapControl(){
    //向地图中添加缩放控件
    var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
    map.addControl(ctrl_nav);
                //向地图中添加比例尺控件
    var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
    map.addControl(ctrl_sca);
}

//标注点数组
var markerArr = [{
        title:"杭州",
        content:"我在这里啊",
        point:"120.021683|30.260537",
        isOpen:1,
        icon:{w:21,h:21,l:0,t:0,x:6,lb:5}
    },{
        title:"余杭",
        content:"超山、潭溪小镇",
        point:"120.230991|30.44395",
        isOpen:0,
        icon:{w:21,h:21,l:0,t:0,x:6,lb:5}
    },{
        title:"鳌江",
        content:"天仓山",
        point:"120.551789|27.631581",
        isOpen:0,
        icon:{w:21,h:21,l:0,t:0,x:6,lb:5}
     },{
        title:"义乌",
        content:"食品批发市场、小商品批发市场",
        point:"120.080719|29.29767",
        isOpen:0,
        icon:{w:21,h:21,l:0,t:0,x:6,lb:5}
     },{
        title:"台州",
        content:"玉环县",
        point:"121.25726|28.885843",
        isOpen:0,
        icon:{w:21,h:21,l:0,t:0,x:6,lb:5}
     },{
        title:"厦门",
        content:"鼓浪屿、曾厝垵、珍珠湾、胡里山炮台等",
        point:"118.142483|24.497133",
        isOpen:0,
        icon:{w:21,h:21,l:0,t:0,x:6,lb:5}
     },{
        title:"北京",
        content:"天安门广场、北京博物馆",
        point:"116.405505|39.913005",
        isOpen:0,
        icon:{w:21,h:21,l:0,t:0,x:6,lb:5}
     },{
        title:"南昌",
        content:"狮子峰、秋水广场",
        point:"115.869172|28.688462",
        isOpen:0,
        icon:{w:21,h:21,l:0,t:0,x:6,lb:5}
     },{
        title:"宜春",
        content:"宜春学院、共青城",
        point:"114.363798|27.797996",
        isOpen:0,
        icon:{w:21,h:21,l:0,t:0,x:6,lb:5}
     },{
        title:"九江",
        content:"庐山、共青城",
        point:"116.001261|29.561078",
        isOpen:0,
        icon:{w:21,h:21,l:0,t:0,x:6,lb:5}
     },{
        title:"武汉",
        content:"华科大",
        point:"114.419826|30.518754",
        isOpen:0,
        icon:{w:21,h:21,l:0,t:0,x:6,lb:5}
     },{
        title:"宜春",
        content:"尖尾峡森林公园",
        point:"114.265523|28.4806",
        isOpen:0,
        icon:{w:21,h:21,l:0,t:0,x:6,lb:5}
     },{
        title:"上海",
        content:"东方明珠、外滩",
        point:"121.506377|31.245105",
        isOpen:0,
        icon:{w:21,h:21,l:0,t:0,x:6,lb:5}
     },{
        title:"香港",
        content:"尖沙咀、铜锣湾、将军澳",
        point:"114.259663|22.30051",
        isOpen:0,
        icon:{w:21,h:21,l:0,t:0,x:6,lb:5}
     }
];

//创建marker
function addMarker(){
    for(var i=0;i<markerArr.length;i++){
        var json = markerArr[i];
        var p0 = json.point.split("|")[0];
        var p1 = json.point.split("|")[1];
        var point = new BMap.Point(p0,p1);
        var iconImg = createIcon(json.icon);
        var marker = new BMap.Marker(point,{icon:iconImg});
        var iw = createInfoWindow(i);
        var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
        marker.setLabel(label);
        map.addOverlay(marker);
        label.setStyle({
                    borderColor:"#808080",
                    color:"#333",
                    cursor:"pointer"
        });
        
        (function(){
            var index = i;
            var _iw = createInfoWindow(i);
            var _marker = marker;
            _marker.addEventListener("click",function(){
                this.openInfoWindow(_iw);
            });
            _iw.addEventListener("open",function(){
                _marker.getLabel().hide();
            })
            _iw.addEventListener("close",function(){
                _marker.getLabel().show();
            })
            label.addEventListener("click",function(){
                _marker.openInfoWindow(_iw);
            })
            if(!!json.isOpen){
                label.hide();
                _marker.openInfoWindow(_iw);
            }
        })()
    }
}
//创建InfoWindow
function createInfoWindow(i){
    var json = markerArr[i];
    var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>");
    return iw;
}
//创建一个Icon
function createIcon(json){
    var myIcon = new BMap.Icon("//api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {  
        offset: new BMap.Size(10, 25), // 指定定位位置  
        imageOffset: new BMap.Size(0, 0 - 10 * 25) // 设置图片偏移  
    });  
    // var icon = new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png", new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})
    return myIcon;
}

initMap();
