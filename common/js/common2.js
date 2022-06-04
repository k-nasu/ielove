// JavaScript Document

$(function(){
    var favoriteBkn = $.cookie('favorite');
    var historyBkn = $.cookie('history');
    countCookie(favoriteBkn,'favo');
    countCookie(historyBkn,'his');
    $(".pageTop a").click(function(){
        $('html,body').animate({ scrollTop: 0 }, 'fast');
    });
});


//お気に入り,閲覧履歴をカウント[type:favo,his]
function countCookie(cookie,type){
    var reCnt = 0 ;
    if(!cookie){
        return false;
    }
    if(!Array.isArray(cookie)){
        cookie = cookie.split(",");
    }

    for(i = 0 ; i < cookie.length ; i++ ){
        if(!cookie[i] === false){
            reCnt++;
        }
    }

    if(reCnt > 20){
        reCnt = 20;
    }

    switch(type){
       case'favo':
           $(".fv_count").html(reCnt);
           break;
       case'his':
           $(".his_count").html(reCnt);
           break;
    }
}


$(function(){
    $(".mainSearch ul li, #contents ul li, .info_more p, .tel_btn, #footer nav li,.mainSearch p.non, ul.listkodawari li").not('').click(function(){
        var href = $(this).find("a").attr("href");
        if(href !== void(0))window.location=href;
        return false;
    });
    $("#sortkey").on("click", function() {
        $('#sortval').slideToggle();
    });
    $("#close").click(function() {
        $('#sortval').slideUp();
    });
    //アコーディオン
    $(".mainSearch p").not('.non').on("click", function() {
        $(this).next().slideToggle();
        $(this).toggleClass("active");
    });

    //メニュー
    $(".orgnav").click(function(){
        var href = $(this).find("a").attr("href");
        if(href !== void(0))window.location=href;
        return false;
    });
});
//付いてくるバナー
$(window).load(function() {
    var flag = true;
    var $followbanner = $("#followbanner");
    if ($followbanner[0]) {
        // 来店予約とかぶらないように
        var $right_side_float_menu = $('#right_side_float_menu');
        $(window).scroll(function () {
            var scrollHeight = $(document).height();
            var scrollPosition = $(window).height() + $(window).scrollTop();
            if ((scrollHeight - scrollPosition) < 1 && flag) {
                $right_side_float_menu.hide();
                $followbanner.addClass("active");
                $(document).on("click touchend", "#followbanner_close", function () {
                    $followbanner.removeClass("active");
                    $right_side_float_menu.show();
                });
            }
            $(document).on("click touchend", "#followbanner_close", function () {
                flag = false;
                $followbanner.removeClass("active");
                $right_side_float_menu.show();
            });
        });
    }
});

//フリーワード検索（トップオリジナルにも読み込ませるため、commonに記述）
$(function(){

    $('#searchform').find('.btn.notext').on('click', function() {
        freesearch();
        return false;
    });

    $('#keywords').keypress(function(ev) {
        if ((ev.which && ev.which === 13) || (ev.keyCode && ev.keyCode === 13)) {
            freesearch();
            return false;
        }
    });

    function freesearch() {
        var $search = $('#searchForm');
        var URL     = location.href;
        var text    = $('#keywords').val();
        // 条件が含まれていて、キーワードが入力されている時
        if (URL.match(/freesearch/) && text !== '') {
            $search.attr('action', '/freesearch/' + text + '/');
            $('input[name="freeword"]').val(text);
            $('input[name="tN"]').val(text);
            $search.submit();
            // 条件がなく、キーワードのみ入力されている時
        } else if (text !== '') {
            location.href = '/freesearch/' + text + '/';
            // キーワードが入力されていない時
        } else {
            alert('キーワードを入力してください');
        }
    }

    $("#searchform").submit(function(){
        var tnVal = $("#keywords").val();

        if(tnVal != ""){
            location.href = "/freesearch/"+tnVal+"/";
        }else{
            alert("キーワードを入力して下さい");
        }
        return false;
    });
});
