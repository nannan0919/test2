$(function(){
    document.getElementById('game').src='base.js';
    var r = window.location.search; //获取链接?后面的内容
    r = r.replace('?', '');
    r = r.split("&&");
    var cas = [];
    for (var i = 0; i < r.length; i++) {
        a = r[i];
        a = a.substring(a.indexOf('='));
        a = a.replace('=', '');
        a = decodeURI(a);
        a = [a];
        cas = cas.concat(a);
    }
    // 所有图
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
    var out = '<img src="../images/out.png" alt="" class="out">' //出局
    var blewimg = `<img src="../images/Blew.png" class="bao" alt="">` //自杀    
    var img = '<img src="../images/police.png" alt="" class="policeBadge">' //警徽

    //数组去重
    var new_arr = [];
    var clickNumber = 1;
    if (localStorage.info) {
        var info = JSON.parse(localStorage.info);
        for (var i = 0; i < info.length; i++) {
            info[i] = JSON.stringify(info[i]);
            new_arr.push(info[i]);
        }
        info = [];
        new_arr = $.unique(new_arr);
        for (var j = 0; j < new_arr.length; j++) {
            new_arr[j] = JSON.parse(new_arr[j]);
            info.push(new_arr[j]);
        }
        console.log(new_arr)
        $.each(new_arr, function (index, element) {
            // 警长的状态
            if (element.Dkill == 'poli') {
                $('#police').removeClass();
                $('.bottom li').eq(element.i).append(img);
                clickNumber = 2
                if ($('.bottom li').eq(element.i).find('.Exited').find('img').hasClass('out')) {
                    $('.transmit').fadeIn(500)
                }
            }
            // 狼人刀死的状态
            if (element.Dkill == 'dao') {
                $('.left li,.right li').eq(element.i).css('opacity', '0.4').append(one).removeAttr("id")
                $('.bottom li').eq(element.i).css('opacity', '0.4').removeAttr("id").find('.Exited').html(out)
            }
            // 女巫毒死的状态
            if (element.Dkill == 'du') {
                $('.left li,.right li').eq(element.i).css('opacity', '0.4').append(three).removeAttr("id")
                $('.bottom li').eq(element.i).css('opacity', '0.4').removeAttr("id").find('.Exited').html(out)
            }
            //同守同救死的状态
            if (element.Dkill == 'die') {
                var img = `<img src="../images/jiu.png" class="jiu" alt=""><img src="../images/shou.png" class="shou" alt="">`
                $('.left li,.right li').eq(element.i).css('opacity', '0.4').append(img).removeAttr("id")
                $('.bottom li').eq(element.i).css('opacity', '0.4').removeAttr('id').find('.Exited').html(out)
            }
            //同刀同毒死的状态
            if (element.Dkill == 'DDdie') {
                var img = `<img src="../images/du.png" class="du" alt=""><img src="../images/dao.png" class="dao" alt="">`
                $('.left li,.right li').eq(element.i).css('opacity', '0.4').append(img).removeAttr("id")
                $('.bottom li').eq(element.i).css('opacity', '0.4').removeAttr('id').find('.Exited').html(out)
            }
            //猎人带走玩家的状态
            if (element.Dkill == 'dai') {
                $('.left li,.right li').eq(element.i).css('opacity', '0.4').append(five).removeAttr("id")
                $('.bottom li').eq(element.i).css('opacity', '0.4').removeAttr('id').find('.Exited').html(out)
            }
            //正常死的状态
            if (element.Dkill == 'voteKill') {
                $('.left li,.right li').eq(element.i).css('opacity', '0.4').removeAttr("id")
                $('.bottom li').eq(element.i).css('opacity', '0.4').removeAttr('id').find('.Exited').html(out)
            }
            // 丘比特射中的状态
            if (element.Dkill == 'cupid') {
                $('.left li,.right li').eq(element.i - 1).append(seven)
            }
            //殉情死的状态
            if (element.Dkill == 'broken') {
                $('.left li,.right li').eq(element.i).css('opacity', '0.4').append(eight).removeAttr("id")
                $('.bottom li').eq(element.i).css('opacity', '0.4').removeAttr("id").find('.Exited').html(out)
            }
            // 狼人自杀的状态
            if (element.Dkill == 'wolfBlew') {
                clickNumber = 2
                $('.left li,.right li').eq(element.i).append(blewimg).css('opacity', '0.4').removeAttr('id')
                $('.bottom li').eq(element.i).css('opacity', '0.4').removeAttr('id').find('.Exited').html(out)
            }
            //狼王杀人的状态
            if (element.Dkill == 'wolfDao') {
                $('.left li,.right li').eq(element.i).css('opacity', '0.4').append(wolfDai).removeAttr("id")
                $('.bottom li').eq(element.i).css('opacity', '0.4').removeAttr("id").find('.Exited').html(out)
            }
        })
    } else {
        var infos = [];
    }

    // 记录死亡结果
    var Index, Index0, Index1, Index2, Index3, Index4, Index5, Index6, brokenIndex, voteindex, blew; //所有死亡状态的索引 ,Index5,6丘比特射中的
    function deathState() {
        $('.death').css('display', 'block');
        var q;
        var arr = [];
        if (Index != undefined) { //刀死
            if ($('.left li,.right li').eq(Index).find('img').hasClass('xin')) {
                $('.left li,.right li').eq(Index).removeAttr('id')
                $('.xin').parent('#li').css('opacity', '0.4').append(eight)
                if ($('.left #li').find('img').hasClass('broken')) {
                    brokenIndex = $('.broken').parent('li').index()
                } else if ($('.right #li').find('img').hasClass('broken')) {
                    brokenIndex = $('.broken').parent('li').index() + 8;
                    console.log(brokenIndex)
                }
                q = (Index + 1) + '号,' + (brokenIndex + 1) + '号'
            } else {
                q = (Index + 1) + '号'
            }
            arr.push(q);
        }
        if (Index1 != undefined) { //毒死
            if ($('.left li,.right li').eq(Index1).find('img').hasClass('xin')) {
                $('.left li,.right li').eq(Index1).removeAttr('id')
                $('.xin').parent('#li').css('opacity', '0.4').append(eight)
                if ($('.left #li').find('img').hasClass('broken')) {
                    brokenIndex = $('.broken').parent('li').index()
                } else if ($('.right #li').find('img').hasClass('broken')) {
                    brokenIndex = $('.broken').parent('li').index() + 8;
                    console.log(brokenIndex)
                }
                q = (Index1 + 1) + '号,' + (brokenIndex + 1) + '号'
            } else {
                q = (Index1 + 1) + '号'
            }
            arr.push(q);

        }
        if (Index2 != undefined) { //同刀同毒死
            if ($('.left li,.right li').eq(Index2).find('img').hasClass('xin')) {
                $('.left li,.right li').eq(Index2).removeAttr('id')
                $('.xin').parent('#li').css('opacity', '0.4').append(eight)
                if ($('.left #li').find('img').hasClass('broken')) {
                    brokenIndex = $('.broken').parent('li').index()
                } else if ($('.right #li').find('img').hasClass('broken')) {
                    brokenIndex = $('.broken').parent('li').index() + 8;
                }
                q = (Index2 + 1) + '号,' + (brokenIndex + 1) + '号'

            } else {
                q = (Index2 + 1) + '号'
            }
            arr.push(q);
        }
        if (Index3 != undefined) { //同守同救死
            if ($('.left li,.right li').eq(Index3).find('img').hasClass('xin')) {
                $('.left li,.right li').eq(Index3).removeAttr('id')
                $('.xin').parent('#li').css('opacity', '0.4').append(eight)
                if ($('.left #li').find('img').hasClass('broken')) {
                    brokenIndex = $('.broken').parent('li').index()
                } else if ($('.right #li').find('img').hasClass('broken')) {
                    brokenIndex = $('.broken').parent('li').index() + 8;
                }
                q = (Index3 + 1) + '号,' + (brokenIndex + 1) + '号'

            } else {
                q = (Index3 + 1) + '号'
            }
            arr.push(q);
        }
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {　　
            var items = arr[i];　　
            if ($.inArray(items, newArr) == -1) {　　　　
                newArr.push(items);　　
            }
        }
        //宣布夜晚结果
        if (Index == undefined && Index2 == undefined && Index1 == undefined && Index3 == undefined) {
            q = '昨晚是个平安夜，没有玩家死亡'
            $('.death text').html(q)
        } else {
            var el = '';
            for (var k = 0; k < newArr.length; k++) {
                if (k == newArr.length - 1) {
                    el += newArr[k] + '玩家昨夜死亡'
                } else {
                    el += newArr[k] + ',';
                }
            }
            $('.death text').html(el)
        }
        $('.left li,.right li').eq(Index).css('opacity', '0.4').removeAttr('id')
        $('.left li,.right li').eq(Index1).css('opacity', '0.4').removeAttr('id')
        $('.left li,.right li').eq(Index2).css('opacity', '0.4').removeAttr('id')
        $('.left li,.right li').eq(Index3).css('opacity', '0.4').removeAttr('id')
        $('.left li,.right li').eq(brokenIndex).css('opacity', '0.4').removeAttr('id')
        $('.bottom li').eq(Index).css('opacity', '0.4').removeAttr('id')
        $('.bottom li').eq(Index1).css('opacity', '0.4').removeAttr('id')
        $('.bottom li').eq(Index2).css('opacity', '0.4').removeAttr('id')
        $('.bottom li').eq(Index3).css('opacity', '0.4').removeAttr('id')
        $('.bottom li').eq(brokenIndex).css('opacity', '0.4').removeAttr('id')
        $('.bottom li').eq(Index).find('.Exited').html(out)
        $('.bottom li').eq(Index1).find('.Exited').html(out)
        $('.bottom li').eq(Index2).find('.Exited').html(out)
        $('.bottom li').eq(Index3).find('.Exited').html(out)
        $('.bottom li').eq(brokenIndex).find('.Exited').html(out)
    }

    // 天亮了
    $('.light').click(function () {
        $('#speaker').css('backgroundImage','url(../images/liucheng1.png)')
        $('.bottom li').find('.foot').find('.hunt').addClass('kaiqiang').removeClass('active') // 猎人开枪标记
        $('.voice').css('display', 'block').find('img').attr('src', '../images/laba.png');
        $('.speaker i').html('天亮了').removeClass().addClass('light')
        $('body').css('background', '#2c5380') //白天背景色
        $(this).css('background', '#2dcef0') //改变自身颜色
        $('.black,.over1').css('background', '#6D9CD7') //天黑按钮的颜色
        $('#blew,#vote,#wolfDai,.hunt').css('display', 'block') //投票按钮显示
        $('.knife,.check,.poison,.save,.guArd,#design').css('display', 'none') //技能按钮消失
        $('.left #li,.right #li').toggleClass('kill').removeClass('kill saved poisond checkd shot designd guardd kingKill');
        $('.startVote,.overVote').css('background', 'rgb(109, 156, 215)')
        //刀死
        if ($('.left #li').hasClass('Dkill')) {
            Index = $('.left li.Dkill').index()
        } else if ($('.right #li').hasClass('Dkill')) {
            Index = $('.right li.Dkill').index() + 8;
        }
        //毒死
        if ($('.left #li').hasClass('Dwitch')) {
            Index1 = $('.left li.Dwitch').index()
        } else if ($('.right #li').hasClass('Dwitch')) {
            Index1 = $('.right li.Dwitch').index() + 8;
        }
        //同刀同毒死
        if ($('.left #li').hasClass('DDdie')) {
            Index2 = $('.left li.DDdie').index()
        } else if ($('.right #li').hasClass('DDdie')) {
            Index2 = $('.right li.DDdie').index() + 8;
        }
        //同守同救死
        if ($('.left #li').hasClass('die')) {
            Index3 = $('.left li.die').index()
        } else if ($('.right #li').hasClass('die')) {
            Index3 = $('.right li.die').index() + 8;
        }
        //丘比特
        if ($('.left #li,.right #li').hasClass('ccupid')) {
            Index5 = $('.left #li.ccupid,.right #li.ccupid').find('.number').text().split('号')[0]
            Index6 = $('.left #li.ccupid,.right #li.ccupid').find('.number').text().split('号')[1]
        }
        if ($('.bottom li').find('img').hasClass('Sergeant')) {
            clickNumber == 2
        } else {
            clickNumber == 1
        }
        if (clickNumber == 1) {
            $('#police').css('display', 'block')
        } else {
            $('#police').removeClass();
            deathState()
        }
        clickNumber++;
    })
    $('.black').click(function(){
        Index = Index0 = Index1 = Index2 = Index3 = Index4 = Index5 = Index6 = voteindex = brokenIndex = blew = undefined; //刀 毒 刀毒 守救 枪  殉情  
    })
    $('#sure1').click(function () {
        $('.player').find('s').remove()
        $('.death').css('display', 'none');
        //存储死亡状态
        var index = $('.policeBadge').parent('li').index()
        if (Index != undefined) {
            if (localStorage.info) {
                var info = JSON.parse(localStorage.info)
                var ruleInfo = {};
                ruleInfo = {
                    'i': Index,
                    'Dkill': 'dao'
                };
                info.push(ruleInfo)
                localStorage.info = JSON.stringify(info)
            } else {
                var ruleInfo = {
                    'i': Index,
                    'Dkill': 'dao'
                };
                infos.push(ruleInfo)
                localStorage.info = JSON.stringify(infos)
            }
        }
        if (Index1 != undefined) {
            if (localStorage.info) {
                var info = JSON.parse(localStorage.info)
                var ruleInfo = {};
                ruleInfo = {
                    'i': Index1,
                    'Dkill': 'du'
                };
                info.push(ruleInfo)
                localStorage.info = JSON.stringify(info)
            } else {
                var ruleInfo = {
                    'i': Index1,
                    'Dkill': 'du'
                };
                infos.push(ruleInfo)
                localStorage.info = JSON.stringify(infos)
            }
        }
        if (Index2 != undefined) {
            if (localStorage.info) {
                var info = JSON.parse(localStorage.info)
                var ruleInfo = {};
                ruleInfo = {
                    'i': Index2,
                    'Dkill': 'DDdie'
                };
                info.push(ruleInfo)
                localStorage.info = JSON.stringify(info)
            } else {
                var ruleInfo = {
                    'i': Index2,
                    'Dkill': 'DDdie'
                };
                infos.push(ruleInfo)
                localStorage.info = JSON.stringify(infos)
            }
        }
        if (Index3 != undefined) {
            if (localStorage.info) {
                var info = JSON.parse(localStorage.info)
                var ruleInfo = {};
                ruleInfo = {
                    'i': Index3,
                    'Dkill': 'die'
                };
                info.push(ruleInfo)
                localStorage.info = JSON.stringify(info)
            } else {
                var ruleInfo = {
                    'i': Index3,
                    'Dkill': 'die'
                };
                infos.push(ruleInfo)
                localStorage.info = JSON.stringify(infos)
            }
        }
        if (Index5 != undefined) {
            if (localStorage.info) {
                var info = JSON.parse(localStorage.info)
                var ruleInfo = {};
                ruleInfo = {
                    'i': Index5,
                    'Dkill': 'cupid'
                };
                info.push(ruleInfo)
                localStorage.info = JSON.stringify(info)
            } else {
                var ruleInfo = {
                    'i': Index5,
                    'Dkill': 'cupid'
                };
                infos.push(ruleInfo)
                localStorage.info = JSON.stringify(infos)

            }
        }
        if (Index6 != undefined) {
            if (localStorage.info) {
                var info = JSON.parse(localStorage.info)
                var ruleInfo = {};
                ruleInfo = {
                    'i': Index6,
                    'Dkill': 'cupid'
                };
                info.push(ruleInfo)
                localStorage.info = JSON.stringify(info)

            } else {
                var ruleInfo = {
                    'i': Index6,
                    'Dkill': 'cupid'
                };
                infos.push(ruleInfo)
                localStorage.info = JSON.stringify(infos)

            }
        }
        if (voteindex != undefined) {
            if (localStorage.info) {
                var info = JSON.parse(localStorage.info)
                var ruleInfo = {};
                ruleInfo = {
                    'i': voteindex,
                    'Dkill': 'voteKill'
                };
                info.push(ruleInfo)
                localStorage.info = JSON.stringify(info)
            } else {
                var ruleInfo = {
                    'i': voteindex,
                    'Dkill': 'voteKill'
                };
                infos.push(ruleInfo)
                localStorage.info = JSON.stringify(infos)
            }
        }
        if (Index0 != undefined) {
            if (localStorage.info) {
                var info = JSON.parse(localStorage.info)
                var ruleInfo = {};
                ruleInfo = {
                    'i': Index0,
                    'Dkill': 'wolfDao'
                };
                info.push(ruleInfo)
                localStorage.info = JSON.stringify(info)
            } else {
                var ruleInfo = {
                    'i': Index0,
                    'Dkill': 'wolfDao'
                };
                infos.push(ruleInfo)
                localStorage.info = JSON.stringify(infos)
            }
        }
        if (Index4 != undefined) {
            if (localStorage.info) {
                var info = JSON.parse(localStorage.info)
                var ruleInfo = {};
                ruleInfo = {
                    'i': Index4,
                    'Dkill': 'dai'
                };
                info.push(ruleInfo)
                localStorage.info = JSON.stringify(info)
            } else {
                var ruleInfo = {
                    'i': Index4,
                    'Dkill': 'dai'
                };
                infos.push(ruleInfo)
                localStorage.info = JSON.stringify(infos)
            }
        }
        if (brokenIndex != undefined) {
            if (localStorage.info) {
                var info = JSON.parse(localStorage.info)
                var ruleInfo = {};
                ruleInfo = {
                    'i': brokenIndex,
                    'Dkill': 'broken'
                };
                info.push(ruleInfo)
                localStorage.info = JSON.stringify(info)
            } else {
                var ruleInfo = {
                    'i': brokenIndex,
                    'Dkill': 'broken'
                };
                infos.push(ruleInfo)
                localStorage.info = JSON.stringify(infos)
            }
        }
        if (blew != undefined) {
            if (localStorage.info) {
                var info = JSON.parse(localStorage.info)
                var ruleInfo = {};
                ruleInfo = {
                    'i': blew,
                    'Dkill': 'wolfBlew'
                };
                info.push(ruleInfo)
                localStorage.info = JSON.stringify(info)
            } else {
                var ruleInfo = {
                    'i': blew,
                    'Dkill': 'wolfBlew'
                };
                infos.push(ruleInfo)
                localStorage.info = JSON.stringify(infos)
            }
        }
        if (index == Index || index == Index0 || index == Index1 || index == Index2 || index == Index3 || index == Index4 || index == voteindex || index == brokenIndex || index == blew) {
            $('.transmit').fadeIn(500)
        }
          
    })

    //竞选警长
    $('.start').click(function () {
        $('.left #li,.right #li').removeClass().toggleClass('Election');
        $(this).css('background', '#23b6d5')
        $('.overVote').css('background', '#6d9cd7')
        $('.over').css('background', '#6d9cd7')
    })
    // 结束竞选警长
    $('.over').click(function () {
        var index;
        $(this).css('background', '#23b6d5')
        $('.start').css('background', '#6d9cd7')
        $('#police').css('display', 'none').removeClass();
        if ($('.left #li').hasClass('Sergeant')) {
            index = $('.left li.Sergeant').index(); //索引
        }
        if ($('.right #li').hasClass('Sergeant')) {
            index = $('.right li.Sergeant').index() + 8; //索引
        }
        if (index != undefined) {
            $('.left li,.right li').removeClass('Election qwe Sergeant')
            if (localStorage.info) {
                var info = JSON.parse(localStorage.info)
                var ruleInfo = {};
                ruleInfo = {
                    'i': index,
                    'Dkill': 'poli'
                };
                info.push(ruleInfo)
                localStorage.info = JSON.stringify(info)
            } else {
                var ruleInfo = {
                    'i': index,
                    'Dkill': 'poli'
                };
                infos.push(ruleInfo)
                localStorage.info = JSON.stringify(infos)
            }
        }
        $('.bottom li').eq(index).append(img) //警徽出现
        deathState()
    })

    //投票出局
    $('.startVote').click(function () {
        $('.voice').find('img').attr('src', '../images/laba.png');
        $(this).css('background', '#23b6d5');
        $('.overVote').css('background', '#6d9cd7');
        $('.left li,.right li').removeClass();
        $('.left #li,.right #li').toggleClass('voteOut');
    })
    // 结束投票
    $('.overVote').click(function () {
        $('.left #li,.right #li').removeClass('voteOut');
        $(this).css('background', '#23b6d5')
        $('.startVote').css('background', '#6d9cd7')
        if ($('.left #li').hasClass('votingOut')) {
            voteindex = $('.left li.votingOut').index(); //索引
        }
        if ($('.right #li').hasClass('votingOut')) {
            voteindex = $('.right li.votingOut').index() + 8; //索引
        }
        if (voteindex != undefined) {
            $('.death').css('display', 'block')
            var q = (voteindex + 1) + '号玩家投票出局'
            if ($('.left li,.right li').eq(voteindex).find('img').hasClass('xin')) {
                $('.left li,.right li').eq(voteindex).removeAttr('id')
                $('.xin').parent('#li').css('opacity', '0.4').append(eight)
                if ($('.left #li').find('img').hasClass('broken')) {
                    brokenIndex = $('.broken').parent('li').index()
                } else if ($('.right #li').find('img').hasClass('broken')) {
                    brokenIndex = $('.broken').parent('li').index() + 8;
                }
                q = (voteindex + 1) + '号,' + (brokenIndex + 1) + '号玩家死亡'
            }
        }
        $('.death text').html(q);
        $('.bottom li').eq(voteindex).css('opacity', '0.4').append(out).removeAttr('id')
        $('.bottom li').eq(brokenIndex).css('opacity', '0.4').append(out).removeAttr('id')
        $('.left li,.right li').eq(voteindex).css('opacity', '0.4').removeAttr('id')
    })

    // 天亮了狼人自杀
    $('body').on('click', '.bottom #lii #blew', function () {
        blew = undefined;
        $(this).addClass('blewActive')
        blew = $(this).parent().parent('li').index(); //自杀
        var q = (blew + 1) + '号玩家是否自爆死亡'
        $('.kingWolfkill text').html(q);
        $('.kingWolfkill').css('display', 'block');
        $('.n').click(function () {
            $('.kingWolfkill').css('display', 'none');
            $('.bottom #lii').find('#blew').removeClass('blewActive')
            blew = undefined;
        })
        $('.y').click(function () {
            var q;
            $('.death>#sure1').addClass('zibao')
            $('.kingWolfkill').fadeOut(500);
            $('.death').fadeIn(500)
            $('.bottom #lii').find('#blew').removeClass('blewActive')
            $('.bottom li').eq(blew).removeAttr('id').css('opacity', '0.4').find('.Exited').html(out); //自杀的样式
            $('.left li,.right li').eq(blew).removeAttr('id').css('opacity', '0.4').append(blewimg); //左右自杀
            if ($('.left li,.right li').eq(blew).find('img').hasClass('xin')) {
                $('.xin').parent('#li').css('opacity', '0.4').append(eight).removeAttr('id') //殉情的样式
                if ($('.left li').find('img').hasClass('broken')) {
                    brokenIndex = $('.broken').parent('li').index()
                }
                if ($('.right li').find('img').hasClass('broken')) {
                    brokenIndex = $('.broken').parent('li').index() + 8;
                }
                $('.bottom li').eq(brokenIndex).removeAttr('id').css('opacity', '0.4').find('.Exited').html(out); //左右殉情
                q = (blew + 1) + '号,' + (brokenIndex + 1) + '号' + '玩家死亡'
            } else {
                q = (blew + 1) + '号玩家死亡'
            }
            $('.death').find('text').html(q)             
        })
    })
   //确定警徽流失
    $('.lossSure').click(function () {
        $(this).css('background', '#23b6d5')
        $('#cancelLoss').css('background', '#2C5380')
          $('#police').css('display', 'none').removeClass();
            clickNumber = 2;
            $('.voice').find('img').attr('src', '../images/laba.png');
            $('.lossBadge').fadeOut(500);
            $('#sure1').removeClass();
            deathState()
    })
    $('#cancelLoss').click(function () {
        $('.lossBadge').fadeOut(500)
        $('#sure1').removeClass();
        
    })
    
    // 白狼王带走玩家
    $('.attack').click(function () {
        $('#wolfDai').css('zIndex','-1');
        $('#sure1').removeClass();
        $(this).css('background', '#23b6d5')
        $('#cancel').css('background', '#2C5380');
        $('#wolfDai').removeClass('active')
        //白狼王杀死
        if ($('.left #li').hasClass('wolfDai')) {
            Index0 = $('.left li.wolfDai').index()
            $('.wolfDeath').css('display', 'none')
        } else if ($('.right #li').hasClass('wolfDai')) {
            Index0 = $('.right li.wolfDai').index() + 8;
            $('.wolfDeath').css('display', 'none')
        }
        if (Index0 != undefined) { //白狼王杀死
            $('.left li,.right li').removeClass('kingKill')
            $('.death').css('display', 'block')
            if ($('.left li,.right li').eq(Index0).find('img').hasClass('xin')) {
                $('.left li,.right li').eq(Index0).removeAttr('id')
                $('.xin').parent('#li').css('opacity', '0.4').append(eight)
                if ($('.left #li').find('img').hasClass('broken')) {
                    brokenIndex = $('.broken').parent('li').index()
                } else if ($('.right #li').find('img').hasClass('broken')) {
                    brokenIndex = $('.broken').parent('li').index() + 8;
                    console.log(brokenIndex)
                }
                q = (Index0 + 1) + '号,' + (brokenIndex + 1) + '号玩家死亡'
            } else {
                q = (Index0 + 1) + '号玩家死亡'
            }
            $('.death>text').html(q)

        }
        $('.left li,.right li').eq(Index0).css('opacity', '0.4').removeAttr('id')
        $('.bottom li').eq(Index0).css('opacity', '0.4').removeAttr('id')
        $('.bottom li').eq(Index0).find('.Exited').html(out)
        $('.left li,.right li').eq(brokenIndex).css('opacity', '0.4').removeAttr('id')
        $('.bottom li').eq(brokenIndex).css('opacity', '0.4').removeAttr('id')
        $('.bottom li').eq(brokenIndex).find('.Exited').html(out)
    })
    $('#cancel').click(function () {
        $('#sure1').removeClass();
        $('#wolfDai').css('zIndex','-1');
        $(this).css('background', '#23b6d5')
        $('.attack').css('background', '#2C5380')
        $('#wolfDai').removeClass('active')
        $('.wolfDeath').fadeOut(500)
        $('.left li,.right li').removeClass('kingKill wolfDai').find('.wolfDao').remove()
    })


    // 猎人开枪
    $('.huntShot').click(function () {
        $('#sure1').removeClass();
        $('.left li,.right li').removeClass('shot')
        $('.hunt').css('zIndex','0');
        $(this).css('background', '#23b6d5')
        $('#cancelShot').css('background', '#2C5380');
        $('.hunt').removeClass('active')
        // 猎人杀死
        if ($('.left #li').hasClass('shotDied')) {
            Index4 = $('.left li.shotDied').index()
        } else if ($('.right #li').hasClass('shotDied')) {
            Index4 = $('.right li.shotDied').index() + 8;
        }
        console.log(Index4)
        if (Index4 != undefined) { //枪杀
            $('.death').css('display', 'block')
            $('.huntDied').fadeOut(500)
            if ($('.left li,.right li').eq(Index4).find('img').hasClass('xin')) {
                $('.left li,.right li').eq(Index4).removeAttr('id')
                $('.xin').parent('#li').css('opacity', '0.4').append(eight)
                if ($('.left #li').find('img').hasClass('broken')) {
                    brokenIndex = $('.broken').parent('li').index()
                } else if ($('.right #li').find('img').hasClass('broken')) {
                    brokenIndex = $('.broken').parent('li').index() + 8;
                }
                q = (Index4 + 1) + '号,' + (brokenIndex + 1) + '号玩家死亡'
            } else {
                q = (Index4 + 1) + '号玩家死亡'
            }
            $('.death>text').html(q)
        }
        $('.left li,.right li').eq(Index4).css('opacity', '0.4').removeAttr('id')
        $('.bottom li').eq(Index4).css('opacity', '0.4').removeAttr('id')
        $('.bottom li').eq(Index4).find('.Exited').html(out)
        $('.left li,.right li').eq(brokenIndex).css('opacity', '0.4').removeAttr('id')
        $('.bottom li').eq(brokenIndex).css('opacity', '0.4').removeAttr('id')
        $('.bottom li').eq(brokenIndex).find('.Exited').html(out)
    })
    $('#cancelShot').click(function () {
        $('.hunt').css('zIndex','0');
        $(this).css('background', '#23b6d5')
        $('.huntShot').css('background', '#2C5380')
        $('.hunt').removeClass('active')
        $('.huntDied').fadeOut(500)
        $('.left li,.right li').removeClass('shot shotDied').find('.dai').remove()
    })

    // 警长移交警徽
    $('#tear').click(function () {
        $(this).css('background', '#23b6d5')
        $('#shift,#certain').css('background', '#2C5380')
        $('#certain').addClass('tear')
        $('.left #li,.right #li').removeClass('shift Confirm')
        $('.play').fadeIn(500).find('text').html('您确定撕掉警徽')
    })
    $('#shift').click(function () {
        $('#certain').removeClass('tear')
        $(this).css('background', '#23b6d5')
        $('#tear,#certain').css('background', '#2C5380')
        $('.left #li,.right #li').removeClass('shot').addClass('shift')
        $('.play').fadeIn(500).find('text').html('请选择移交玩家')
    })
    $('#certain').click(function () {
        $('.policeBadge').remove()
        $('#shift,#tear').css('background', '#2C5380')
        // 清除本地存储的警徽
        if (localStorage.info) {
            var info = JSON.parse(localStorage.info)
            var J = $('.policeBadge').parent('li').index()
            var x;
            console.log(info)
            $.each(info, function (index, element) {
                if (element.Dkill == 'poli') {
                    x = index;
                }
            })
            info.splice(x, 1)
            localStorage.info = JSON.stringify(info)
        }
        if ($(this).hasClass('tear')) {
            $('.transmit').css('display', 'none');
            $('.play').fadeOut(500);
        } else {
            var new_index;
            $(this).css('background', '#23b6d5')
            if ($('.left #li').hasClass('Confirm')) {
                new_index = $('.left li.Confirm').index(); //索引
            }
            if ($('.right #li').hasClass('Confirm')) {
                new_index = $('.right li.Confirm').index() + 8; //索引
            }
            if (new_index == undefined) {
                alert('请选择移交玩家，如果撕掉警徽，请点击按钮撕，再按确定按钮')
            } else {
                $('.left li,.right li').removeClass('shift Confirm')
                $('.transmit').css('display', 'none')
                $('.play').fadeOut(500)
            }
            $('.bottom li').eq(new_index).append(img) //警徽出现
            if (localStorage.info) {
                var info = JSON.parse(localStorage.info)
                var ruleInfo = {};
                ruleInfo = {
                    'i': new_index,
                    'Dkill': 'poli'
                };
                info.push(ruleInfo)
                localStorage.info = JSON.stringify(info)
            } else {
                var ruleInfo = {
                    'i': new_index,
                    'Dkill': 'poli'
                };
                infos.push(ruleInfo)
                localStorage.info = JSON.stringify(infos)
            }
        }

    })

    // 终止游戏
    $('#end').click(function () {
        $('#result').css('display', 'block')
        $('#result button').removeClass('active')
    })
    // 好人胜利消失
    function clear() {
        $('.result1,.result2,.result3').fadeOut(1500)
    }

    $('#result span').click(function () {
        $('#result').css('display', 'none')
    })
    $('.good').click(function () {
        $(this).toggleClass('active')
        $('.bad,.couple,.cancel').removeClass('active')
        $('.sure1').removeClass().addClass('sure1 good')
    })
    $('.bad').click(function () {
        $(this).toggleClass('active')
        $('.sure1').removeClass().addClass('sure1 bad')
        $('.good,.couple,.cancel').removeClass('active')

    })
    $('.couple').click(function () {
        $(this).toggleClass('active')
        $('.sure1').removeClass().addClass('sure1 couple')
        $('.good,.bad,.cancel').removeClass('active')
    })
    $('.cancel').click(function () {
        $(this).toggleClass('active')
        $('.sure1').removeClass().addClass('sure1 cancel')
        $('.good,.bad,.couple').removeClass('active')

    })

    var whoWin, type;
    $('.sure1').click(function () {
        var lover = [];
        if (localStorage.info) {
            $.each(JSON.parse(localStorage.info), function (index, element) {
                if (element.Dkill == 'cupid') {
                    var Q = $('.bottom li').eq(element.i - 1).find('.foot').find('text').eq(1).text().split(':')[1];
                    lover.push(Q)
                }
            })
        }
        var love=$('.bottom .cupid').find('.foot').find('text').eq(1).text().split(':')[1]
        lover.push(love)
        $('#result').css('display', 'none')
        $(this).toggleClass('active')
        if ($(this).hasClass('good')) {
            whoWin = '4';
            type = '2'
            getCdata();
        }
        if ($(this).hasClass('bad')) {
            whoWin = '5';
            type = '2'
            getCdata();
        }
        if ($(this).hasClass('couple')) {
            whoWin = '6';
            type = '2'
            getCdata();
        }
        if ($(this).hasClass('cancel')) {
            type = '1'
            getCdata();
        }

        function getCdata() {
            if(sessionStorage.home_of){
                var roomId=JSON.parse(sessionStorage.home_of).num
            }
            var req = {
                roomId: roomId,
                whoWin: whoWin,
                type: type,
                lovers: JSON.stringify(lover),
            }

            $.ajax({
                type: 'POST',
                url: admin+'/admin/endGame',
                data: req,
                xhrFields: {
                    withCredentials: true
                },
                success: function (res) {
                    var data = JSON.parse(res);
                    console.log(data)
                    if (data.code == 200) {
                        if (req.whoWin == 4) {
                            $('.result2').css('display', 'block')
                        }
                        if (req.whoWin == 5) {
                            $('.result1').css('display', 'block')
                        }
                        if (req.whoWin == 6) {
                            $('.result3').css('display', 'block')
                        }
                        setTimeout(function () {
                            clear()
                        }, 500)
                        setTimeout(function () {
                            function select(obj) {
                                $.ajaxSetup({
                                    cache: true
                                });
                                $("body").load("game-index.html");
                            }
                            select()
                            console.log(123)
                        }, 700)
                        localStorage.clear();
                    }else if(data.code==202){
                        window.location.href = '/pages/login.html';
                    }else {
                        console.log('失败')
                    }
                },
                error: function (xhr, textStatus) {
                    alert("网络异常")
                }
            })
        }
    })





})