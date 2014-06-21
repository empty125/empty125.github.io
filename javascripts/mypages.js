//pages js
define(function(require, exports, module) {
    var J =require('jquery');
    
    
    var Dnd = require('../javascripts/treeview-dnd');
    
    //Dnd.levelsAttr存储默认数据
    //J.extend({},Dnd.levelsAttr[level-1])
    var data = [
        {
           attrs:{id:''},
           children:[
               {
                    attrs:{id:''},
                    cls:'item-labelbox',
                    title:'二级节点1',
                    children:[
                        {
                           attrs:{id:''},
                           cls:'item-labelbox',
                           title:'三级节点1-1'
                        },
                        {
                           attrs:{id:''},
                           cls:'item-labelbox',
                           title:'三级节点1-2'
                        }
                    ]
               }
           ],
           cls:'item-labelbox',
           title:'一级节点1'
        },
        {
           attrs:{id:''},
           children:[
               {
                    attrs:{id:''},
                    cls:'item-labelbox',
                    title:'二级节点2',
                    children:[
                        {
                           attrs:{id:''},
                           cls:'item-labelbox',
                           title:'三级节点2-1'
                        },
                        {
                           attrs:{id:''},
                           cls:'item-labelbox',
                           title:'三级节点2-2'
                        }
                    ]
               }
           ],
           cls:'item-labelbox',
           title:'一级节点2'
        }
    ];
    Dnd.render(data,J('#treeview_id'),{'controls':'<button type="button" class="btn btn-default btn-sm delete">删除</button>'})
    var events = {
        'click':function(e){
            var _this = J(this);
            var handle = e.data.handle;
            var _dnd = e.data.dnd;
            if(!handle['selectCls']){
                return false;
            }
            if(_dnd._lastSelected){
                _dnd._lastSelected.removeClass(handle['selectCls']);
                _dnd._lastSelected = null;
            }
            _this.addClass(handle['selectCls']);
            _dnd._lastSelected = _this;
        }
    };
    Dnd.dragabled('.item-labelbox',{
        'targetCls':'dragging-target',
        'draggingCls':'dragging',
        'draghoverCls':'dragging-over',
        'selectCls':'selected',//这个是自定义的
        'drag':function(){

        },
        'dropabled':true, //drop没有分组的概念
        'events':events
    });
    
    var _items = Dnd.getDropItems(),i=0;
    for(;i<_items.length;i++){
        bindHover(_items[i]);
    }   
    
    function bindHover(target){
        if(!target)return false;
        var del = target.find('.delete');
        del.bind('click',{dnd:Dnd,target:target},function(e){
            e.stopPropagation();
            e.preventDefault();
            //维护drop
            e.data.dnd.removeItem(e.data.target);
        });
        target.hover(function(e){
            var _this = J(this);
            _this.addClass('expand-header-hover').data('control-delete').show();
        },function(e){
            var _this = J(this);
            _this.removeClass('expand-header-hover').data('control-delete').hide();
        }).data('control-delete',del);
    }
    
    
    //simpleChart start
    var chartimg =  J('<img style="margin:2px"/>');
    var loadimgimg = J('#loadingimg'); 
    var basesrc = "http://openpoor.sinaapp.com/simplechart";           
    chartimg.attr('src',basesrc).hide();
    chartimg.one('load',{lg:loadimgimg},function(e){ 
        var _this = J(this);
        _this.fadeIn();
        e.data.lg.find('em').remove();
        setInterval(function(){
            _this.attr('src',basesrc+"?_r="+Math.random());
        },3500);
    }).error(function(){
        loadimgimg.html('加载失败');
    });
    loadimgimg.append(chartimg);
    //simpleChart end
    
    
    
});


