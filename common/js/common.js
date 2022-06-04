var domain = location.hostname;

function strpos (haystack, needle, offset) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Onno Marsman
  // +   bugfixed by: Daniel Esteban
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: strpos('Kevin van Zonneveld', 'e', 5);
  // *     returns 1: 14
  var i = (haystack + '').indexOf(needle, (offset || 0));
  return i === -1 ? false : i;
}

function str_pad (input, pad_length, pad_string, pad_type) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // + namespaced by: Michael White (http://getsprink.com)
  // +      input by: Marco van Oort
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: str_pad('Kevin van Zonneveld', 30, '-=', 'STR_PAD_LEFT');
  // *     returns 1: '-=-=-=-=-=-Kevin van Zonneveld'
  // *     example 2: str_pad('Kevin van Zonneveld', 30, '-', 'STR_PAD_BOTH');
  // *     returns 2: '------Kevin van Zonneveld-----'
  var half = '',
    pad_to_go;

  var str_pad_repeater = function (s, len) {
    var collect = '',
      i;

    while (collect.length < len) {
      collect += s;
    }
    collect = collect.substr(0, len);

    return collect;
  };

  input += '';
  pad_string = pad_string !== undefined ? pad_string : ' ';

  if (pad_type != 'STR_PAD_LEFT' && pad_type != 'STR_PAD_RIGHT' && pad_type != 'STR_PAD_BOTH') {
    pad_type = 'STR_PAD_RIGHT';
  }
  if ((pad_to_go = pad_length - input.length) > 0) {
    if (pad_type == 'STR_PAD_LEFT') {
      input = str_pad_repeater(pad_string, pad_to_go) + input;
    } else if (pad_type == 'STR_PAD_RIGHT') {
      input = input + str_pad_repeater(pad_string, pad_to_go);
    } else if (pad_type == 'STR_PAD_BOTH') {
      half = str_pad_repeater(pad_string, Math.ceil(pad_to_go / 2));
      input = half + input + half;
      input = input.substr(0, pad_length);
    }
  }

  return input;
}

function empty (mixed_var) {
  // Checks if the argument variable is empty
  // undefined, null, false, number 0, empty string,
  // string "0", objects without properties and empty arrays
  // are considered empty
  //
  // http://kevin.vanzonneveld.net
  // +   original by: Philippe Baumann
  // +      input by: Onno Marsman
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: LH
  // +   improved by: Onno Marsman
  // +   improved by: Francesco
  // +   improved by: Marc Jansen
  // +      input by: Stoyan Kyosev (http://www.svest.org/)
  // +   improved by: Rafal Kukawski
  // *     example 1: empty(null);
  // *     returns 1: true
  // *     example 2: empty(undefined);
  // *     returns 2: true
  // *     example 3: empty([]);
  // *     returns 3: true
  // *     example 4: empty({});
  // *     returns 4: true
  // *     example 5: empty({'aFunc' : function () { alert('humpty'); } });
  // *     returns 5: false
  var undef, key, i, len;
  var emptyValues = [undef, null, false, 0, "", "0"];

  for (i = 0, len = emptyValues.length; i < len; i++) {
    if (mixed_var === emptyValues[i]) {
      return true;
    }
  }

  if (typeof mixed_var === "object") {
    for (key in mixed_var) {
      // TODO: should we check for own properties only?
      //if (mixed_var.hasOwnProperty(key)) {
      return false;
      //}
    }
    return true;
  }

  return false;
}

//お気に入り,閲覧履歴をカウント[type:favo,his]
function countCookie(cookie,type){
    var reCnt = 0 ;
    if(empty(cookie)){
        return false;
    }
    cookie = cookie.split(",");
    var cookieLength = cookie.length;

    for(i = 0 ; i < cookieLength ; i++ ){
        if(empty(cookie[i]) === false){
            reCnt++;
        }
    }
    reCnt = str_pad(reCnt,2,'0','STR_PAD_LEFT');
    if(reCnt > 20){
        reCnt = 20;
    }
    switch(type){
       case'favo':
           $("#favoCnt").html(reCnt);
           break;
       case'his':
           $("#hisCnt").html(reCnt);
           break;
    }
}

$(function(){
    $(".accessmap a").click(function (){
        window.open("http://" + domain + "/accessmap/","accessmap","width=720,height=600,status=no,scrollbars=yes");
        return false;
    });
    var favoriteBkn = $.cookie('favorite');
    var historyBkn = $.cookie('history');
    countCookie(favoriteBkn,'favo');
    countCookie(historyBkn,'his');

    $(".favorite").click(function(){
        window.location = "http://" + domain + "/favorite/";
    });

    $(".history").click(function(){
        window.location = "http://" + domain + "/history/";
    });

});

// Gnavi
$(function(){

    $(".search_overlay").children('ul').css("display", "none");

    $(".search_overlay").mouseover(function(){
        $(this).children('ul').css("display", "block");
    });

    $(".search_overlay").mouseout(function(){
        $(this).children('ul').css("display", "none");
    });

})

$(document).ready(function() {
    $('#backtop').css("display","none");
    $(window).scroll(function () {
	    if ($(this).scrollTop() > 500) {
	       $('#backtop').fadeIn();
	    } else {
	       $('#backtop').fadeOut();
	    }
    });
});

// お問い合わせフォームに必須マークがあったら色を変える rgb(255, 210, 200)
$(function(){
    $("img").each(function(){
        if($(this).attr("src")=="/images/img_hitsu.jpg"){
	         $(this).parent("td").next("td").children("input,select,label,textarea").css("background-color","rgb(255, 210, 200)");
	         $(this).parent("th").next("td").children("input,select,label,textarea").css("background-color","rgb(255, 210, 200)");
         }
    });
});

$('.smp_button a').on('click', function() {
    return confirm('スマホサイトへ移動しますが、よろしいですか？');
});

$(function() {

    $('#submitButton').on('click', function() {
        freesearch();
    });

    $('#tN').keypress(function(ev) {
        if ((ev.which && ev.which === 13) || (ev.keyCode && ev.keyCode === 13)) {
            freesearch();
        }
    });

    function freesearch() {
        var URL   = location.search;
        var text  = $('input#tN[type="text"]').val();
        // 条件が含まれていて、キーワードが入力されている時
        if (!empty(URL) && !empty(text)) {
            $('input#tN[type="hidden"]').val(text);
            $('#searchForm').submit();
            // 条件がなく、キーワードのみ入力されている時
        } else if (!empty(text)) {
            location.href = '/freesearch/' + text + '/';
            return false;
            // キーワードが入力されていない時
        } else {
            alert('キーワードを入力してください');
            return false;
        }
    }

});
