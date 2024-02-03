function info (msg, type) {
    type = type || 'primary';
    $('.alert-background').show();
    $('.alert-background .alert-'+type).html(msg).fadeIn();

    setTimeout(function () {
        $('.alert-background').fadeOut();
        $('.alert-background .alert-'+type).fadeOut();
    }, 2000);
}

function success(msg) {
    info(msg, 'success');
}

function tip(msg) {
    info(msg);
}

function err (msg) {
    info(msg, 'danger');
}

function ajax_notify() {
    $.ajax({
        url: '/api/notify/count',
        success: function(e) {
            if (e.data) {
                $('.notify-count').html(e.data).show();
                prepend_html_title('('+e.data+') ');
            } else {
                $('.notify-count').hide();
                prepend_html_title();
            }
        }
    });
}

function prepend_html_title(str) {
    if (!prepend_html_title.origin_html_title) {
        prepend_html_title.origin_html_title = document.title;
    }
    if (str) {
        document.title = str + prepend_html_title.origin_html_title;
    } else {
        document.title = prepend_html_title.origin_html_title;
    }
}

function collect(obj, type, id)
{
    var del = $(obj).hasClass('collected') ? 1 : 0;
    var url = del ? '/api/collection/delete' : '/api/collection/add';
    $.ajax({
        url: url,
        type: 'post',
        data: {type:type, id:id},
        success: function (e) {
            if (e.code != 0) {
                err(e.msg);
                return;
            }
            $(obj).removeClass('collected').removeClass('collect').addClass(del ? 'collect' : 'collected');
            if (del) {
                $(obj).html(' ' + (parseInt($(obj).html()) - 1));
            } else {
                $(obj).html(' ' + (parseInt($(obj).html()) + 1));
            }
        }
    });
}

$(function() {
    $(window).scroll(function() {
        if ($(window).scrollTop() > 1000) {
            $('div.go-top').show();
        } else {
            $('div.go-top').hide();
        }
    });
    $('div.go-top').click(function() {
        $('html, body').animate({scrollTop: 0}, 1000);
    });
});