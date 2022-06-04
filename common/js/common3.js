$(function() {
    var favoriteBkn = $.cookie('favorite');
    newSaveData = createNewSaveData(null, favoriteBkn);

    // お気に入り登録されている物件にはハートを付けておく
    $.each(newSaveData, function(index, val) {
        var classBknId = '.bkn__' + val;
        $(classBknId).addClass('on');
        if (!$(classBknId + ', .js_switch-trg').hasClass('on')) {
            $(classBknId).children('.js_txtchange-trg').text('お気に入り追加');
        } else {
            $(classBknId).children('.js_txtchange-trg').text('お気に入り削除');
        }
    });

    var historyBkn = $.cookie('history');
    countCookie(favoriteBkn, 'favo');
    countCookie(historyBkn, 'his');

    //imageLiquid
    $(".imgLiquidFill").imgLiquid();

    // iPhoneX
    var isIPhoneX = window.devicePixelRatio === 3 &&
        (window.screen.width === 375 || window.screen.height === 375) &&
        /iPhone/.test(window.navigator.userAgent);

    if (isIPhoneX === true) {
        $('.orgfloatbnr_list,.footer,#action_btn,#fixedBottomSearchBar').css('padding-bottom', 'env(safe-area-inset-bottom)');
    }

    //accordion
    $(".js_multisearch-trg").on('click', function() {
        var $trg = $(this);
        if (!$trg.is('.is-active')) {
            $(".js_multisearch-trg").removeClass('is-active');
            $trg.addClass('is-active');
            var clkType = $trg.data('type');
            var $selectPanel = $('.select_panel');
            $('[data-accordion]').hide();
            $('[data-accordion="' + clkType + '"]').slideDown();
            var orgfloatbnrHeight  = $('.orgfloatbnr').height();
            var select_panelHeight = $selectPanel.height();
            var t                  = $selectPanel.offset().top; // ターゲットの位置取得
            var p                  = t - $(window).height() + orgfloatbnrHeight;  // 画面下部からのターゲットの位置
            var selectDispayHeight = $(window).height() - orgfloatbnrHeight - select_panelHeight; // 画面の高さから固定フッターと検索ボタンの高さを引いたもの
            if ($(window).scrollTop() < p) {
                $('html,body').animate({scrollTop: $selectPanel.offset().top - selectDispayHeight + orgfloatbnrHeight});
            }
        } else {
            $trg.removeClass("is-active");
            $('[data-accordion]').slideUp();
        }
    });

    $('#keywords')
        .focusin(function(e) {$('.orgfloatbnr').hide();})
        .focusout(function(e) {$('.orgfloatbnr').show();});

    $('.bkn_cnt-favorite, .js_switch-trg').on('click', function() {
        var bknId = $(this).attr('class').match(/\d+/)[0];
        var classBknId = '.bkn__' + bknId;
        var favorite = $.cookie('favorite');
        if (favorite !== null && favorite.split(',').length >= 20 && !$(this).hasClass('on')) {
            alert('お気に入りの上限は20件です');
            return false;
        }
        $(classBknId).toggleClass('on');

        if (!$(this).hasClass('on')) {
            deleteFavoriteBkn(bknId, favorite);
            favorite = $.cookie('favorite');
            countCookie(favorite, 'favo');
            $(classBknId).children('.js_txtchange-trg').text('お気に入り追加');
        } else {
            newSaveData = createNewSaveData(bknId, favorite);
            newSaveData = newSaveData.join(',');
            $.cookie('favorite', newSaveData, {
                expires: 30,
                path   : '/'
            });

            favorite = $.cookie('favorite');
            countCookie(favorite, 'favo');
            $(classBknId).children('.js_txtchange-trg').text('お気に入り削除');
        }
    });

    $('.ui_icon-mapview').click(function() {
        $('html,body').animate({scrollTop: $('#googlemap2').offset().top - 60});
    });

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

    $("#searchform").submit(function() {
        var tnVal = $("#keywords").val();

        if (tnVal != "") {
            location.href = "/freesearch/" + tnVal + "/";
        } else {
            alert("キーワードを入力して下さい");
        }
        return false;
    });

    //pagetop
    $('.pageTop').click(function() {
        $('html,body').animate({
            scrollTop: 0
        });
    });

    $('.pcsite').on('click', function() {
        return confirm('PCサイトへ移動しますが、よろしいですか？');
    });
});

//お気に入り,閲覧履歴をカウント[type:favo,his]
function countCookie(cookie, type) {
    var reCnt = 0;
    if (!cookie) {
        switch (type) {
            case 'favo':
                $(".fv_count").html(0);
                break;
            case 'his':
                $(".his_count").html(0);
                break;
        }
        return false;
    }
    cookie = cookie.split(',');
    for (i = 0; i < cookie.length; i++) {
        if (!cookie[i] === false) {
            reCnt++;
        }
    }

    if (reCnt > 20) {
        reCnt = 20;
    }
    switch (type) {
        case 'favo':
            $(".fv_count").html(reCnt);
            break;
        case 'his':
            $(".his_count").html(reCnt);
            break;
    }
}

// クッキーに保存するお気に入り物件を作成
function createNewSaveData(bknId, favorite) {
    var saveData = new Array(bknId, favorite);
    saveData     = saveData.join(',');
    saveData     = saveData.split(',');

    // 重複削除
    var tmpSaveData = saveData.filter(function(x, i, self) {
        return self.indexOf(x) === i;
    });
    // 空の配列削除
    return $.grep(tmpSaveData, function(e) {
        return e !== '';
    });
}

// お気に入り物件を削除
function deleteFavoriteBkn(bknId, favorite) {
    var saveData = favorite.split(',');
    var idx      = saveData.indexOf(bknId);
    if (idx >= 0) {
        saveData.splice(idx, 1);
    }
    // 空の配列削除
    var newSaveData = $.grep(saveData, function(e) {
        return e !== '';
    });
    $.cookie('favorite', newSaveData, {
        expires: 30,
        path   : '/'
    });
}
