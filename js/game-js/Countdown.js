$(function () {
    $('.speaker i').html('天黑了').removeClass().addClass('black');
    var time;
    //点击音乐列表
    $('.list').click(function () {
        $('#player').parent().toggleClass('music1');
        $('.bottom').toggleClass('bottom1');
        $('.play1').toggleClass('player1');
    })
    //点玩家讲话
    var audioVote = $('#vote>audio').get(0); //玩家发言
    $('body').on('click', '#li .voice', function () {
        $('.left #li,.right #li').removeClass('jingzhang');
        $(this).parent().parent('li').addClass('jingzhang');
        if ($(this).parent('.top').parent('#li').hasClass('Election')) {
            $(this).parent('.top').parent('#li').removeClass().addClass('qwe'); //竞选警长
            $(this).parent().parent('li').addClass('jingzhang');

        }
        if ($(this).parent('.top').parent('#li').hasClass('voteOut')) {
            $(this).parent('.top').parent('#li').removeClass().addClass('abc'); //玩家投票发言
            $(this).parent().parent('li').addClass('jingzhang');

        }
        $(this).find('img').attr('src', '../images/horn.png');
        clearTimeout(time)
        $('.alert-sec-circle').css('stroke-dashoffset', '0')
        //发言索引
        var K;
        if ($(this).parent('.top').parent('li').parent().parent().hasClass('left')) {
            K = $(this).parent('.top').parent('li').index() + 1
        }
        if ($(this).parent('.top').parent('li').parent().parent().hasClass('right')) {
            K = $(this).parent('.top').parent('li').index() + 9
        }
        $('#vote>audio').attr('src', '../mp3/Speakers/Player' + K + '.mp3');
        audioVote.play();
        setTimeout(function () {
            $('.model').css('display', 'block');
            alertSet('发言倒计时');
        }, 500)



    })

    // 倒计时
    function alertSet(e) {
        document.getElementById("js-alert-box").style.display = "block",
            document.getElementById("js-alert-head").innerHTML = e;

        var t;
        var JZ = $('.policeBadge').parent('li').index() //警长的索引
        var X;
        if ($('.left li').hasClass('jingzhang')) {
            X = $('.jingzhang').index()
        } else if ($('.right li').hasClass('jingzhang')) {
            X = $('.jingzhang').index() + 8
        }
        if (X == JZ) {
            t = 240;
        } else {
            t = 120;
        }
        n = document.getElementById("js-sec-circle");
        document.getElementById("js-sec-text").innerHTML = t,
            time = setInterval(function () {
                if (0 == t) {
                    audioVote.pause();
                } else {
                    t -= 1;
                    if (t == 10) {
                        $('#vote>audio').attr('src', '../mp3/gameProcess/countdown.mp3');
                        $('#vote>audio').attr('loop', 'loop');
                        audioVote.play();
                    }
                    document.getElementById("js-sec-text").innerHTML = t;
                    var e = Math.round(t / 120 * 735);
                    if (X == JZ) {
                        e = Math.round(t / 240 * 735);
                    }
                    n.style.strokeDashoffset = e - 735
                }

            }, 1000);
    }

    // 狼人自爆
    $('body').on('click', '#sure1.zibao', function () {
        var deathPlayer = $('.death').find('text').text();
        var st = deathPlayer.substr(0, deathPlayer.indexOf('号'));
        if (st == '') {

        } else {
            var audiobz= '<audio class="audiobz"></audio>';
            var audiobz1= '<audio class="audiobz1"></audio>';
            var audiobz2= '<audio class="audiobz2"></audio>';
            $('#vote').append(audiobz)            
            $('#vote').append(audiobz1)            
            $('#vote').append(audiobz2)            
            $('#vote>.audiobz').attr('src', '../mp3/Blew/baozha.mp3');
            var audiobz = $('#vote>.audiobz').get(0); 
            var audiobz1 = $('#vote>.audiobz1').get(0); 
            var audiobz2= $('#vote>.audiobz2').get(0); 
            audiobz.play();
            audiobz.addEventListener('ended', function () {
                $('#vote>.audiobz1').attr('src', '../mp3/Blew/Blew' + st + '.mp3');
            audiobz1.play();
            }, false);
            audiobz1.addEventListener('ended', function () {
                $('#vote>.audiobz2').attr('src', '../mp3/gameProcess/lastWords.mp3');
            audiobz2.play();        
            }, false);
            audiobz2.addEventListener('ended', function () {
                $('.audiobz,.audiobz1,.audiobz2').remove();
                if($('#sure1').hasClass('zibao')&&$('#police').hasClass('eligibility')){
                    $('.lossBadge').css('display','block')
                }
                          
            }, false);
        }
    })

    // 倒计时结束讲话
    $('.dele').click(function () {
        $('.model').fadeOut(500);
        $('#vote>audio').removeAttr('loop');
        clearTimeout(time)
        audioVote.pause();
        $('.alert-sec-circle').css('stroke-dashoffset', '0')
    })
    //开始投票
    $('.startVote').click(function () {
        $('#vote>audio').attr('src', '../mp3/gameProcess/vote.mp3');
        audioVote.play();
    })
    // 开始竞选警长
    $('.start').click(function () {
        $('#vote>audio').attr('src', '../mp3/gameProcess/start.mp3');
        audioVote.play();
    })

    //流程音效
    $('.speaker').click(function () {
        $('#speaker').css('backgroundImage', 'url(../images/liucheng.png)')
        var audio1 = $('#speaker>audio').get(0); //流程喇叭
        if ($(this).find('i').hasClass('black')) {
            $('#speaker>audio').attr('src', '../mp3/gameProcess/dark.mp3');
        }
        if ($(this).find('i').hasClass('light')) {
            $('#speaker>audio').attr('src', '../mp3/gameProcess/dawn.mp3');
        }
        if ($(this).hasClass('wolfOut')) {
            $(this).removeClass().addClass('speaker')
            $('#speaker>audio').attr('src', '../mp3/gameProcess/wolfBack.mp3');
        }
        if ($(this).hasClass('WitchOut')) {
            $(this).removeClass().addClass('speaker')
            $('#speaker>audio').attr('src', '../mp3/gameProcess/witchBack.mp3');
        }
        if ($(this).hasClass('ProphetOut')) {
            $(this).removeClass().addClass('speaker')
            $('#speaker>audio').attr('src', '../mp3/gameProcess/prophetBack.mp3');
        }
        if ($(this).hasClass('huntOut')) {
            $(this).removeClass().addClass('speaker')
            $('#speaker>audio').attr('src', '../mp3/gameProcess/huntBack.mp3');
        }
        if ($(this).hasClass('guardOut')) {
            $(this).removeClass().addClass('speaker')
            $('#speaker>audio').attr('src', '../mp3/gameProcess/guardBack.mp3');
        }
        if ($(this).hasClass('cupidOut')) {
            $(this).removeClass().addClass('speaker')
            $('#speaker>audio').attr('src', '../mp3/gameProcess/cupidBack.mp3');
        }

        if ($(this).find('i').hasClass('wolf')) {
            $('#speaker>audio').attr('src', '../mp3/gameProcess/wolfEyesOpen.mp3');
            $(this).addClass('wolfOut').find('i').removeClass()
        }
        if ($(this).find('i').hasClass('Witch')) {
            $('#speaker>audio').attr('src', '../mp3/gameProcess/witchEyesOpen.mp3');
            $(this).addClass('WitchOut').find('i').removeClass()
        }
        if ($(this).find('i').hasClass('Prophet')) {
            $('#speaker>audio').attr('src', '../mp3/gameProcess/prophetEyesOpen.mp3');
            $(this).addClass('ProphetOut').find('i').removeClass()
        }
        if ($(this).find('i').hasClass('hunter')) {
            $('#speaker>audio').attr('src', '../mp3/gameProcess/huntEyesOpen.mp3');
            $(this).addClass('huntOut').find('i').removeClass()
        }
        if ($(this).find('i').hasClass('cupid')) {
            $('#speaker>audio').attr('src', '../mp3/gameProcess/cupidOpen.mp3');
            $(this).addClass('cupidOut').find('i').removeClass()
        }
        if ($(this).find('i').hasClass('guard')) {
            $('#speaker>audio').attr('src', '../mp3/gameProcess/guardEyesOpen.mp3');
            $(this).addClass('guardOut').find('i').removeClass()
        }
        audio1.play();

    })
})