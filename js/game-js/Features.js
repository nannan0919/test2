// 所有玩家天黑技能
$(function () {
    var one = `<img src="../images/dao.png" class="dao" alt="">` //刀
    var wolfDai = `<img src="../images/wolfDai.png" class="wolfDao" alt="">` //狼王刀
    var two = `<img src="../images/jiu.png" class="jiu" alt="">` //救
    var three = `<img src="../images/du.png" class="du" alt="">` //毒
    var four = `<img src="../images/yan.png" class="yan" alt="">` //验
    var five = `<img src="../images/dai.png" class="dai" alt="">` //猎
    var six = `<img src="../images/shou.png" class="shou" alt="">` //守
    var seven = `<img  src="../images/xin.png" class="xin" alt="">` //心
    var eight = `<img src="../images/broken.png" class="broken" alt="">` //殉情
    var nine = `<img src="../images/Blew.png" class="bao" alt="">` //自爆
    var blewimg = `<img src="../images/Blew.png" class="bao" alt="">` //自杀    
    // 天黑了    
    $('.black').click(function () {
        $('.hunt').css('zIndex','1');
        $('#sure1').removeClass();
        $('#speaker').css('backgroundImage', 'url(../images/liucheng1.png)')
        $('.bottom li').find('.foot').find('.hunt').removeClass('kaiqiang')
        $('.speaker i').html('天黑了').removeClass().addClass('black');
        $('.voice').css('display', 'none');
        a = [];
        $('body').css('background', '#30465e') //改变背景色
        $(this).css('background', '#2dcef0') //改变自身的颜色
        $('.light').css('background', '#6D9CD7') //改变天亮了的颜色
        $('.knife,.check,.poison,.save,.guArd,#design').css('display', 'block').removeClass('active'); //技能按钮显示
        $('#vote,#police,#blew,#wolfDai').css('display', 'none') //投票按钮隐藏
        $("#li .yan,#li .jiu,#li .shou").remove(); //添加的图标移除
        $('.left li,.right li').removeClass(); //清除添加的class,
    })
    // 第一步 狼刀
    $('.bottom li').on('click', '.knife', function () {
        $('#speaker').css('backgroundImage', 'url(../images/liucheng1.png)')
        $('.bottom #lii .knife').toggleClass('active');
        $('.left #li,.right #li').toggleClass('kill').removeClass('Dkill saved poisond checkd shot designd guardd kingKill').find('.dao').remove();
        $('.check,.poison,.save,.guArd,.hunt,#design,#wolfDai').removeClass('active');
        $('.speaker i').html('狼人出').removeClass().addClass('wolf')
    })
    // 第二步 女巫出
    // if救
    $('body').on('click', '.save', function () {
        $('#speaker').css('backgroundImage', 'url(../images/liucheng1.png)')
        $('.speaker i').html('女巫出').removeClass().addClass('Witch');
        if ($('.speaker').hasClass('WitchOut')) {
            $('.speaker i').html('女巫出').removeClass()
        }
        $(this).toggleClass('active');
        $('.check,.poison,.knife,.guArd,.hunt,#design,#wolfDai').removeClass('active');
        $('.defen').addClass('Dkill').append(one) //如果不救
        $('.left #li,.right #li').toggleClass('saved').removeClass('kill Jwitch poisond checkd defen shot designd guardd kingKill').find('.jiu').remove();
    })
    // if毒
    $('body').on('click', '.poison', function () {
        $('#speaker').css('backgroundImage', 'url(../images/liucheng1.png)')
        $('.speaker i').html('女巫出').removeClass().addClass('Witch');
        if ($('.speaker').hasClass('WitchOut')) {
            $('.speaker i').html('女巫出').removeClass()
        }
        $(this).toggleClass('active');
        $('.check,.save,.knife,.guArd,.hunt,#design,#wolfDai').removeClass('active'); //其他技能按钮功能消失       
        $('.DDdie').addClass('Dkill') //如果不毒
        $('.left #li,.right #li').toggleClass('poisond').removeClass('kill Dwitch DDdie saved checkd shot designd guardd kingKill').find('.du').remove();
    })
    // 第三步 预言家验
    $('body').on('click', '.check', function () {
        $('#speaker').css('backgroundImage', 'url(../images/liucheng1.png)')
        $('.speaker i').html('预言家出').removeClass().addClass('Prophet');
        $(this).toggleClass('active');
        $('.poison,.knife,.save,.guArd,.hunt,#design,#wolfDai').removeClass('active');
        $('.left #li,.right #li').toggleClass('checkd').removeClass('cseer kill saved poisond shot designd guardd kingKill').find('.yan').remove();
    })
    // 第四步 猎人出
    $('body').on('click', '.hunt', function () {
        $('#sure1').removeClass()
        $('#speaker').css('backgroundImage', 'url(../images/liucheng1.png)')
        $('.speaker i').html('猎人出').removeClass().toggleClass('hunter');
        $(this).toggleClass('active');
        $('.check,.knife,.save,.poison,.guArd,#design,#wolfDai').removeClass('active');
        $('.left #li,.right #li').removeClass('shotDied kill saved poisond checkd designd guardd kingKill');
    })
    // 第5步 守卫出
    $('body').on('click', '.guArd', function () {
        $('#speaker').css('backgroundImage', 'url(../images/liucheng1.png)')
        $('.speaker i').html('守卫出').removeClass().addClass('guard');
        $(this).toggleClass('active');
        $('.check,.knife,.save,.poison,.hunt,#design,#wolfDai').removeClass('active');
        $('.left #li,.right #li').toggleClass('guardd').removeClass('Guard kill saved poisond checkd shot designd kingKill').find('.shou').remove();
    })
    //第6步 丘比特出
    $('body').on('click', '#design', function () {
        $('#speaker').css('backgroundImage', 'url(../images/liucheng1.png)')
        $('.speaker i').html('丘比特出').removeClass().addClass('cupid');
        $(this).toggleClass('active');
        $('.check,.knife,.save,.guArd,.hunt,.poison,#wolfDai').removeClass('active');
        $('.left #li,.right #li').toggleClass('designd').removeClass('ccupid kill saved poisond checkd shot guardd kingKill').find('.xin').remove();
    })
    // 白天白狼王带走玩家
    $('body').on('click', '#wolfDai', function () {
        $('.bottom  #wolfDai').toggleClass('active');
        $('.wolfDeath').fadeIn(500);
        $('.attack,#cancel').css('background', '#2C5380')
        $('.left #li,.right #li').toggleClass('kingKill').removeClass('wolfDai kill saved poisond checkd shot designd guardd').find('.wolfDao').remove();
        $('.knife,.check,.poison,.save,.guArd,.hunt,#design').removeClass('active');
    })
    // 第4步 猎人带走玩家
    $('body').on('click', '.kaiqiang', function () {
        $('.huntDied').fadeIn(500);
        $('.huntShot,#cancelShot').css('background', '#2C5380')
        $('.left #li,.right #li').toggleClass('shot').removeClass('shotDied kill saved poisond checkd designd guardd kingKill').find('.dai').remove();
    })

    // 点击玩家
    // $('body').on('click', '.left #li,.right #li', function () {
    $('.left li,.right li').click(function () {
        // 1狼刀技能
        if ($(this).hasClass('kill')) {
            $('.left #li,.right #li').removeClass('Dkill').find('.dao').remove()
            $(this).addClass('Dkill').append(one)
        }
        // 狼王技能
        if ($(this).hasClass('kingKill')) {
            $('.left #li,.right #li').removeClass('wolfDai').find('.wolfDao').remove()
            $(this).addClass('wolfDai').append(wolfDai)
        }
        // 2女巫技能（救）
        if ($(this).hasClass('saved')) {
            $('.defen').addClass('Dkill').append(one)
            $('.left #li,.right #li').removeClass('Jwitch').find('.jiu').remove()
            $(this).addClass('Jwitch').append(two)
            if ($(this).hasClass('Dkill')) {
                $(this).addClass('defen').append(two).removeClass('Dkill Jwitch ').find('.dao').remove()
                $(this).removeClass('Dwitch').find('.du').remove()
            }
            if ($(this).hasClass('defend') || $(this).hasClass('Guard')) {
                $(this).removeClass('defend Guard Jwitch').addClass('die')
            }
        }
        // 女巫技能（毒）
        if ($(this).hasClass('poisond')) {
            $('.left #li,.right #li').removeClass('Dwitch').find('.du').remove()
            $(this).addClass('Dwitch').append(three)
        }
        //3 预言家技能
        if ($(this).hasClass('checkd')) {
            $('.left #li,.right #li').removeClass('cseer').find('.yan').remove()
            $(this).addClass('cseer').append(four)
        }
        // 4 猎人打死玩家技能
        if ($(this).hasClass('shot')) {
            $('.left #li,.right #li').removeClass('shotDied').find('.dai').remove()
            $(this).addClass('shotDied').append(five)
        }
        // 5守卫技能
        if ($(this).hasClass('guardd')) {
            $('.left #li,.right #li').removeClass('Guard').find('.shou').remove()
            $('.die').addClass('defen').removeClass('die')
            $('.defend').addClass('Dkill').removeClass('defend').append(one)
            $(this).addClass('Guard').append(six)
            if ($(this).hasClass('Dkill')) {
                $(this).addClass('defend').append(six).removeClass('Dkill Guard').find('.dao').remove()
            } else if ($(this).hasClass('Jwitch') || $(this).hasClass('defen')) {
                $(this).removeClass('defen Guard Jwitch').addClass('die')
            }
        }
        // 6丘比特技能
        if ($(this).hasClass('designd')) {
            if ($('.left .designd .xin,.right .designd .xin').length == 2) {} else {
                $(this).addClass('ccupid').append(seven);
            }
        }
        // 玩家选定警长
        if ($(this).hasClass('qwe')) {
            $('.left #li,.right #li').removeClass('Sergeant');
            $(this).addClass('Sergeant');
        }
        //玩家投票出局
        if ($(this).hasClass('abc')) {
            $('.left #li,.right #li').removeClass('votingOut');
            $(this).addClass('votingOut');
        }
        // //警长发言
        // if ($(this).hasClass('Election')) {
        //     $(this).addClass('qwe')
        // }
        // //投票发言
        // if ($(this).hasClass('voteOut')) {
        //     $(this).addClass('abc')
        // }
        //移交警徽
        if ($(this).hasClass('shift')) {
            $('.left #li,.right #li').removeClass('Confirm');
            $(this).addClass('Confirm');
        }
    });

})