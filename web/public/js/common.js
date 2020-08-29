define("common", ["consts", "apis", "utils"], function(consts, apis, utils) {
    //检验此时是否登录
    utils.ajaxSubmit(apis.login.isLogin,'',function(data){
        if(data.userToken==''){
            window.location.href = "@@HOSTlogin.html";
        }else{
            $(".app-sidebar__user-name").text(data.userName);
            $(".app-sidebar__user-designation").text(data.roleName);
        }
    });
    //退出登录
    $("#logout").on("click",function(){
        //$.removeCookie("userName",{ path: '/'});
        $.removeCookie("userToken",{ path: '/'});
        window.location.href = "@@HOSTlogin.html";
    });
    //小铃铛的警告提示
    function warnList(){
        utils.ajaxSubmit(apis.warn.getLists, '', function (data) {
            $("#warnList").html(template('warnItem',data));
            $(".warnCnt").text(data.cnt);
            if(data.cnt>0){
                $(".warnCnt").css({display:"inline-block"});
                $(".warnCnt").parent().find("a").find("i").attr("id","bell");
            }else{
                $(".warnCnt").hide();
                $(".warnCnt").parent().find("a").find("i").removeAttr("id");
            }
        });
    }
    warnList();
    //获取排行榜的管理tag
    function getRankingList(){
        var rankParam = {
            pageNo: 1,
            pageSize:20,
            status:1
        };
        utils.ajaxSubmit(apis.ranking.getLists,rankParam,function(data){
            $("#rankingDiv").html(template('rankingItem', data));

            var currentUrl = window.location.href;
            var itemArr = $(".treeview-item");
            if(currentUrl.length>1){
                $.each(itemArr,function(i,n){
                    if(currentUrl.indexOf($(this).attr("href"))!= -1){
                        $(this).closest(".treeview").addClass("is-expanded");
                        $(this).closest("ul").show();
                        $(this).closest("ul").parent().find("i").eq(1).addClass("three_item_rotate");
                        $(this).addClass("active");
                    }
                });
            }
        });
    }
    getRankingList();
    //打开的对应的页面nav + active属性
    var currentUrl = window.location.href;
    var itemArr = $(".common-item");
    if(currentUrl.length>1){
        $.each(itemArr,function(i,n){
            if(currentUrl.indexOf($(this).attr("href"))!= -1){
                $(this).closest(".treeview").addClass("is-expanded");
                $(this).closest("ul").show();
                $(this).closest("ul").parent().find("i").eq(1).addClass("three_item_rotate");
                $(this).addClass("active");
            }
        });
    }
    //三级导航栏
    $(".three_menu_item").on("click",function(){
        var threeList = $(this).parent().find(".three_list");
        if(threeList.css("display")=="block"){
            threeList.slideUp(100);
            $(this).find("i").eq(1).removeClass("three_item_rotate");
            $(this).find("i").eq(1).addClass("three_item_rotate1");
        }else{
            threeList.slideDown(100);
            $(this).find("i").eq(1).addClass("three_item_rotate");
            $(this).find("i").eq(1).removeClass("three_item_rotate1");
        }
    });
});