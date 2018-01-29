/**
 * Created by 崔博诚 on 2017/11/15.
 */
$(function () {
    document.getElementById('index').src = 'base.js';
    console.log(admin);
    var url = admin;
    var music = [];
    var type;
    var fangjianhao = 0;
    if (sessionStorage.home_of) {
        var home_of = JSON.parse(sessionStorage.home_of);
        $('#roomId').val(home_of.num);
    }
    var gameId = 0;
    $('body').css('background', '#2C5380');

    /*请求歌曲信息*/
    $.ajax({
        url: url + '/admin/merchant/musicList',
        type: "post",
        xhrFields: {
            withCredentials: true
        },
        success: function (res) {
            var res = JSON.parse(res);
            music = [];
            if (res.code == 200) {
                if (res.data.list.length) {
                    $('.list').empty('.box').css({paddingTop: '0'});
                    for (var i = 0; i < res.data.list.length; i++) {
                        music.push(res.data.list[i].link);
                        var el = `
                            <div class="box">
                            <div>${i + 1}.${res.data.list[i].name}</div>
                            <div>匿名</div>
                            <img src="../images/play.png" alt="">
                        </div>
                        `;
                        $('.list').append(el)
                    }
                } else {
                    $('.list').html('您还没有添加音乐').css({paddingTop: '0.3rem'});
                }
            }
            else if (res.code == 202) {
                self.location = '/pages/login.html'
            }
            else {
                $('.pack>.right').toast({
                    content: res.desc,
                    duration: 1500,
                    isCenter: false,
                    background: 'rgba(44,83,128,0.9)',
                });
            }
        },
        error: function (res) {
            $('.pack>.right').toast({
                content: '网络异常',
                duration: 1500,
                isCenter: false,
                background: 'rgba(44,83,128,0.9)',
            });
        }
    });

    /*初始渲染15人房间*/
    $('.six_home').empty();
    for (var i = 0; i < 15; i++) {
        var text = `
                                <div class="seat_num">${i + 1}号</div>
                                <div class="role">待定</div>
                                <img src="../images/tou1.png" alt="">
                                <div class="name">玩家昵称</div>
                        `;
        var dom = `<div class="game_player ten_home fif_home">${text}</div>`;
        $('.six_home').append(dom)
    }

    //单选框
    var num_of;
    $('.six,.ten,.twelve,.fifteen,.ding').click(function () {
        event.stopPropagation();
        $(this).addClass('actives').siblings().removeClass('actives');
        $('.edits_box').fadeIn(200);
        $('.roles>li>.as>img').attr('src', '../images/not.png').next().val(0);
        num_of = $(this).next().val();
        if (num_of == 6) {
            $('.edits_box input[name=wolf]').val('2');       //狼人
            $('.edits_box input[name=villager]').val('2');   //村民
            $('.seer,.hunter').next().find('img').attr('src', '../images/selected.png').next().val('1');
        } else if (num_of == 9) {
            $('.edits_box input[name=wolf]').val('3');       //狼人
            $('.edits_box input[name=villager]').val('3');   //村民
            $('.seer,.hunter,.witch').next().find('img').attr('src', '../images/selected.png').next().val('1')
        } else if (num_of == 12) {
            $('.edits_box input[name=wolf]').val('4');       //狼人
            $('.edits_box input[name=villager]').val('4');   //村民
            $('.seer,.hunter,.idiot,.witch').next().find('img').attr('src', '../images/selected.png').next().val('1')
        } else if (num_of == 15) {
            $('.edits_box input[name=wolf]').val('5');       //狼人
            $('.edits_box input[name=villager]').val('5');   //村民
            $('.seer,.hunter,.idiot,.guard,.witch').next().find('img').attr('src', '../images/selected.png').next().val('1')
        } else {
            $('.edits_box input[name=wolf]').val('0');       //狼人
            $('.edits_box input[name=villager]').val('0');   //村民
        }

        //初始化克隆玩家
        $('.clone>.left>img').attr('src', '../images/not.png');
    });

    //设置狼人好人角色数量
    $('.add').click(function () {
        event.stopPropagation();
        if ($(this).parent().prev().find('input').val() == 5) {
            $(this).parent().prev().find('input').val(5)
        } else {
            var val = $(this).parent().prev().find('input').val();
            val++;
            $(this).parent().prev().find('input').val(val)
        }
    });
    $('.reduce').click(function () {
        event.stopPropagation();
        if ($(this).parent().prev().find('input').val() == 0) {
            $(this).parent().prev().find('input').val(0)
        } else {
            var val = $(this).parent().prev().find('input').val();
            val--;
            $(this).parent().prev().find('input').val(val)
        }
    });

    //设置其他角色
    $('.as>img').click(function () {
        event.stopPropagation();
        if ($(this).attr('src') == '../images/selected.png') {
            $(this).attr('src', '../images/not.png').next().val('0')
        } else if ($(this).attr('src') == '../images/not.png') {
            $(this).attr('src', '../images/selected.png').next().val('1');
        }
    });

    //隐藏编辑角色框
    $('.Establish>div').eq(1).click(function () {
        event.stopPropagation();
        $('.edits_box').fadeOut(200);
    });

    function room(role_num_of) {
        //判断是否克隆角色
        if ($('.clone>.left>img').attr('src') == '../images/selected.png') {
            var clonePlayer = 1;
        } else if ($('.clone>.left>img').attr('src') == '../images/not.png') {
            var clonePlayer = 0;
        }

        //发起请求
        var ruleInfo = {
            wolf: $('.edits_box input[name=wolf]').val(),
            seer: $('.edits_box input[name=seer]').val(),
            hunter: $('.edits_box input[name=hunter]').val(),
            villager: $('.edits_box input[name=villager]').val(),
            witch: $('.edits_box input[name=witch]').val(),
            cupid: $('.edits_box input[name=cupid]').val(),
            guard: $('.edits_box input[name=guard]').val(),
            whiteKingWolf: $('.edits_box input[name=whiteKingWolf]').val(),
            idiot: $('.edits_box input[name=idiot]').val(),
        };
        var data = {
            roomId: fangjianhao,
            ruleInfo: JSON.stringify(ruleInfo),
            clonePlayer: clonePlayer
        };
        $.ajax({
            url: url + '/admin/createRoom',
            data: data,
            type: "post",
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function () {
                //请求前的处理
                $('#loading p').text('请求发送中');
                $('#loading').css({display: 'block'})
            },
            success: function (res) {
                var res = JSON.parse(res);
                if (res.code == 200) {
                    //存下房间号
                    sessionStorage.home_of = JSON.stringify({num: data.roomId});

                    $('.pack>.right').toast({
                        content: '创建成功',
                        duration: 1500,
                        isCenter: false,
                        background: 'rgba(44,83,128,0.9)',
                    });

                    $('.edits_box').fadeOut(200);
                    //出现刷新按钮
                    $('#f5').css({display: 'block'});

                    //开始按钮
                    $('.plays').removeClass('playgame');

                    //综合信息
                    $('.player_info').html(`<div class="active">还没有玩家进入房间</div>`);

                    //重新渲染座位
                    $('.six_home').empty();
                    for (var i = 0; i < 15; i++) {
                        var text = `
                                <div class="seat_num">${i + 1}号</div>
                                <div class="role">待定</div>
                                <img src="../images/tou1.png" alt="">
                                <div class="name">玩家昵称</div>
                        `;
                        var dom = `<div class="game_player ten_home fif_home">${text}</div>`;
                        $('.six_home').append(dom)
                    }

                    //房间信息
                    $('.home_info span').eq(0).text(`当前房间号:${data.roomId}号`);
                    $('.home_info span').eq(1).text(`房间类型:${role_num_of}人赛事`);

                    //gameId
                    gameId = res.data.gameId;
                } else if (res.code == 201) {
                    $('#f5').css({display: 'none'});

                    if (res.data.lastGameStatus == 0) {//比赛未开始
                        $(".right>.pack").fadeIn(200);
                        type = 0;
                    } else if (res.data.lastGameStatus == 1) {//比赛已开始
                        $(".right>.pack").fadeIn(200);
                        type = 1;
                    } else if (res.data.lastGameStatus == 7) {//比赛抢角色
                        $(".right>.pack").fadeIn(200);
                        type = 7;
                    } else {
                        $('.pack>.right').toast({
                            content: res.desc,
                            duration: 1500,
                            isCenter: false,
                            background: 'rgba(44,83,128,0.9)',
                        });
                    }
                } else if (res.code == 202) {
                    self.location = '/pages/login.html'
                } else {
                    $('.pack>.right').toast({
                        content: res.desc,
                        duration: 1500,
                        isCenter: false,
                        background: 'rgba(44,83,128,0.9)',
                    });
                }
            },
            complete: function () {
                //请求完成的处理
                $('#loading').css({display: 'none'})
            },
            error: function (res) {
                $('.pack>.right').toast({
                    content: '网络异常',
                    duration: 1500,
                    isCenter: false,
                    background: 'rgba(44,83,128,0.9)',
                });
            }
        });
    }

    //创建房间
    $('.dete').click(function () {
        event.stopPropagation();
        fangjianhao = $('#roomId').val();
        //设置角色的总数
        var role_num_of = 0;
        for (var i = 0; i < $('.edits_box input').length; i++) {
            role_num_of += parseInt($('.edits_box input').eq(i).val());
        }

        if (num_of == -1) {
            if ($('#roomId').val() != '' && $('#roomId').val() != null && $('#roomId').val() != undefined && $('#roomId').val() != 0) {
                if (0 < role_num_of && role_num_of < 16) {
                    room(role_num_of);
                } else {
                    $('.pack>.right').toast({
                        content: '角色个数不得大于15人且小于6人',
                        duration: 1500,
                        isCenter: false,
                        background: 'rgba(44,83,128,0.9)',
                    });
                }
            } else {
                $('.pack>.right').toast({
                    content: '请输入正确的房间号',
                    duration: 1500,
                    isCenter: false,
                    background: 'rgba(44,83,128,0.9)',
                });
            }
        } else {
            if ($('#roomId').val() != '' && $('#roomId').val() != null && $('#roomId').val() != undefined && $('#roomId').val() != 0) {
                if (num_of == role_num_of) {
                    room(role_num_of)
                } else {
                    $('.pack>.right').toast({
                        content: `角色个数不得大于或小于${num_of}人`,
                        duration: 1500,
                        isCenter: false,
                        background: 'rgba(44,83,128,0.9)',
                    });
                }
            } else {
                $('.pack>.right').toast({
                    content: '请输入正确的房间号',
                    duration: 1500,
                    isCenter: false,
                    background: 'rgba(44,83,128,0.9)',
                });
            }
        }
    });

    //音乐播放
    $('.list').on('click', '.box', function () {
        var audio = $('audio').get(0);
        if ($(this).hasClass('music')) {
            if (audio.paused) {
                console.log('暂停状态');
                audio.play();
                $(this).find('img').attr('src', '../images/suspend.png');
            } else {
                audio.pause();
                $(this).find('img').attr('src', '../images/play.png');
            }
        } else {
            $(this).addClass('music').siblings().removeClass('music');
            $(this).siblings().find('img').css({display: 'none'});
            var index = $(this).index();
            $('audio').attr('src', music[index]);
            $(this).find('img').css({display: 'block'}).attr('src', '../images/suspend.png');
            audio.play();
            //监听歌曲是否播放完毕
            var that = this;
            $('audio').bind('ended', function () {
                $(that).find('img').attr('src', '../images/play.png')
            });
        }
    });

    //刷新游戏房间
    $('#f5').click(function () {
        event.stopPropagation();
        $.ajax({
            url: url + '/admin/roomInfo',
            data: {roomId: fangjianhao},
            type: "post",
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function () {
                //请求前的处理
                $('#loading p').text('请求发送中');
                $('#loading').css({display: 'block'})
            },
            success: function (res) {
                var res = JSON.parse(res);
                if (res.code == 200) {
                    //gameId
                    gameId = res.data.gameId;

                    $('.player_info').empty();
                    for (var i = 0; i < res.data.players.length; i++) {
                        if (res.data.players[i].seatNo - 1 == $('.six_home>div').eq(res.data.players[i].seatNo - 1).index()) {
                            var html = `
                                        <img class="t" src="../images/t.png" alt="">
                                        <div class="seat_num">${res.data.players[i].seatNo}号</div>
                                        <div class="role">待定</div>
                                        <img class="tou" src="${res.data.players[i].imgUrl}" alt="">
                                        <div class="name1">${res.data.players[i].nickName}</div>
                                    `;
                            $('.six_home>div').eq(res.data.players[i].seatNo - 1).html(html).addClass('asd');
                        }
                        var player_info = `
                                        <div>
                                            [
                                            <span>${res.data.players[i].nickName}</span>
                                            ]进去房间,座位号[
                                            <span>${res.data.players[i].seatNo}</span>
                                            ]
                                        </div>
                                    `;
                        $('.player_info').append(player_info);
                    }
                    if ($('.player_info>div').length == res.data.roleNumber || $('.six_home>.asd').length == res.data.roleNumber) {
                        var last = `<div class="active">所有玩家已经进入房间</div>`;
                        $('.player_info').append(last);
                        $('.plays').addClass('playgame')
                    }
                } else if (res.code == 202) {
                    self.location = '/pages/login.html'
                } else {
                    $('.pack>.right').toast({
                        content: res.desc,
                        duration: 1500,
                        isCenter: false,
                        background: 'rgba(44,83,128,0.9)',
                    });
                }
            },
            complete: function () {
                //请求完成的处理
                $('#loading').css({display: 'none'})
            },
            error: function (res) {
                $('.pack>.right').toast({
                    content: '网络异常',
                    duration: 1500,
                    isCenter: false,
                    background: 'rgba(44,83,128,0.9)',
                });
            }
        });
    });

    //踢人
    $('.six_home').on('click', '.t', function () {
        event.stopPropagation();
        var that = this;
        var index = $(that).parent().index();
        $.ajax({
            url: url + '/admin/removePlayer',
            data: {gameId: gameId, seatNo: index + 1},
            type: "post",
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function () {
                //请求前的处理
                $('#loading p').text('踢人中');
                $('#loading').css({display: 'block'})
            },
            success: function (res) {
                var res = JSON.parse(res);
                if (res.code == 200) {
                    $('.plays').addClass('playgame');

                    //渲染综合信息
                    var nick_name = $(that).parent().find('.name1').text();
                    var el = `
                                        <div>
                                            [
                                            <span>${nick_name}</span>
                                            ]退出了房间
                                        </div>
                    `;
                    $('.player_info').prepend(el);

                    // 渲染座位
                    var html = `
                                <div class="seat_num">${index + 1}号</div>
                                <div class="role">待定</div>
                                <img src="../images/tou1.png" alt="">
                                <div class="name">玩家昵称</div>
                    `;
                    $('.six_home>div').eq(index).html(html).removeClass('asd');
                } else {
                    $('.pack>.right').toast({
                        content: res.desc,
                        duration: 1500,
                        isCenter: false,
                        background: 'rgba(44,83,128,0.9)',
                    });
                }
            },
            complete: function () {
                //请求完成的处理
                $('#loading').css({display: 'none'})
            },
            error: function (res) {
                $('.pack>.right').toast({
                    content: '网络异常',
                    duration: 1500,
                    isCenter: false,
                    background: 'rgba(44,83,128,0.9)',
                });
            }
        })
    });

    // //房间号输入框聚焦事件
    // $('.home_num div').eq(1).bind('input propertychange', function () {
    //     var tvalmum = $(this).text().length;
    //     if (tvalmum > 1) {
    //         var tval = $(this).text();
    //         tval = tval.substring(0, 1);
    //         $(this).text(tval);
    //     }
    //     $('.home_num input').val($(this).text());
    // });

    //结束上一场比赛
    $('.end').click(function () {
        event.stopPropagation();
        $.ajax({
            url: url + '/admin/endGame',
            data: {roomId: fangjianhao, type: 1},
            type: "post",
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function () {
                //请求前的处理
                $('#loading p').text('结束中');
                $('#loading').css({display: 'block'})
            },
            success: function (res) {
                var res = JSON.parse(res);
                if (res.code == 200) {
                    $(".right>.pack").fadeOut(200);
                    //重新渲染座位
                    $('.six_home').empty();
                    for (var i = 0; i < 15; i++) {
                        var text = `
                                <div class="seat_num">${i + 1}号</div>
                                <div class="role">待定</div>
                                <img src="../images/tou1.png" alt="">
                                <div class="name">玩家昵称</div>
                        `;
                        var dom = `<div class="game_player ten_home fif_home">${text}</div>`;
                        $('.six_home').append(dom)
                    }
                } else if (res.code == 202) {
                    self.location = '/pages/login.html'
                } else {
                    $('.pack>.right').toast({
                        content: res.desc,
                        duration: 1500,
                        isCenter: false,
                        background: 'rgba(44,83,128,0.9)',
                    });
                }
            },
            complete: function () {
                //请求完成的处理
                $('#loading').css({display: 'none'})
            },
            error: function (res) {
                $('.pack>.right').toast({
                    content: '网络异常',
                    duration: 1500,
                    isCenter: false,
                    background: 'rgba(44,83,128,0.9)',
                });
            }

        })
    });

    //游戏状态未开始判断是否进入上一场比赛
    $('.into').click(function () {
        event.stopPropagation();
        if (type == 1) {
            $('#loading p').text('请求发送中');
            $('#loading').css({display: 'block'});
            $('body').load('game.html');
            sessionStorage.home_of = JSON.stringify({num: fangjianhao});
        } else if (type == 0) {
            $.ajax({
                url: url + '/admin/roomInfo',
                data: {roomId: fangjianhao},
                type: "post",
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function () {
                    //请求前的处理
                    $('#loading p').text('请求发送中');
                    $('#loading').css({display: 'block'})
                },
                success: function (res) {
                    var res = JSON.parse(res);
                    if (res.code == 200) {
                        //刷新按钮
                        $('#f5').css({display: 'block'});

                        //开始按钮
                        $('.plays').removeClass('playgame');

                        //重新渲染座位
                        $('.six_home').empty();
                        for (var i = 0; i < 15; i++) {
                            var text = `
                                <div class="seat_num">${i + 1}号</div>
                                <div class="role">待定</div>
                                <img src="../images/tou1.png" alt="">
                                <div class="name">玩家昵称</div>
                        `;
                            var dom = `<div class="game_player ten_home fif_home">${text}</div>`;
                            $('.six_home').append(dom)
                        }

                        //综合信息
                        $('.player_info').html(`<div class="active">还没有玩家进入房间</div>`);

                        //房间信息
                        $('.home_info span').eq(0).text(`当前房间号:${res.data.roomId}号`);
                        $('.home_info span').eq(1).text(`房间类型:${res.data.roleNumber}人赛事`);

                        //渲染赛场
                        $('.home_type>div').removeClass('actives');
                        if (res.data.roleNumber == 6) {
                            $('.home_type>.six').addClass('actives');
                        } else if (res.data.roleNumber == 9 || res.data.roleNumber == 12) {
                            if (res.data.roleNumber == 9) {
                                $('.home_type>.ten').addClass('actives');
                            } else {
                                $('.home_type>.twelve').addClass('actives');
                            }
                        } else {
                            if (res.data.roleNumber == 15) {
                                $('.home_type>.fifteen').addClass('actives');
                            } else {
                                $('.home_type>.ding').addClass('actives');
                            }
                        }
                    } else if (res.code == 202) {
                        self.location = '/pages/login.html'
                    } else {
                        $('.pack>.right').toast({
                            content: res.desc,
                            duration: 1500,
                            isCenter: false,
                            background: 'rgba(44,83,128,0.9)',
                        });
                    }
                },
                complete: function () {
                    //请求完成的处理
                    $('#loading').css({display: 'none'})
                },
                error: function (res) {
                    $('.pack>.right').toast({
                        content: '网络异常',
                        duration: 1500,
                        isCenter: false,
                        background: 'rgba(44,83,128,0.9)',
                    });
                }
            });
        }
        $('.edits_box,.right > .pack').fadeOut(200);
    });

    // 开始游戏抢角色
    $('.play').on('click', '.playgame', function () {
        event.stopPropagation();
        $.ajax({
            url: url + '/admin/startGame',
            data: {roomId: fangjianhao},
            type: "post",
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function () {
                //请求前的处理
                $('#loading p').text('请求发送中');
                $('#loading').css({display: 'block'})
            },
            success: function (res) {
                var res = JSON.parse(res);
                if (res.code == 200) {
                    //隐藏loading
                    $('#loading').css({display: 'none'});

                    //等待玩家抢角色
                    $('.mask').fadeIn(200);
                    var s = res.data.secondToReadySnap + res.data.secondToSnap;
                    $('.endtime>.two').html(`等待玩家抢角色${s}s`);
                    var l = setInterval(function () {
                        s--;
                        if (s == 0) {
                            clearInterval(l);
                            $('.mask').fadeOut(200);
                            game();
                        } else {
                            $('.endtime>.two').html(`等待玩家抢角色${s}s`);
                        }
                    }, 1000);

                    //音频
                    var audio = $('audio').get(0);
                    $('audio').attr('src', '../mp3/gameProcess/ready.mp3');
                    audio.play();
                } else if (res.code == 202) {
                    self.location = '/pages/login.html'
                } else {
                    $('.pack>.right').toast({
                        content: res.desc,
                        duration: 1500,
                        isCenter: false,
                        background: 'rgba(44,83,128,0.9)',
                    });
                }
            },
            complete: function () {
                //请求完成的处理
                $('#loading').css({display: 'none'})
            },
            error: function (res) {
                $('.pack>.right').toast({
                    content: '网络异常',
                    duration: 1500,
                    isCenter: false,
                    background: 'rgba(44,83,128,0.9)',
                });
            }
        })
    });

    //倒计时结束进入游戏页面
    function game() {
        $.ajax({
            url: url + '/admin/startGame',
            data: {roomId: fangjianhao},
            type: "post",
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function () {
                //请求前的处理
                $('#loading p').text('请求发送中');
                $('#loading').css({display: 'block'})
            },
            success: function (res) {
                var res = JSON.parse(res);
                if (res.code == 200) {
                    console.log(res);
                    //请求前的处理
                    $('#loading p').text('请求发送中');
                    $('#loading').css({display: 'block'});
                    $('body').load('game.html');
                    // self.location = `game.html?roomId=${fangjianhao}`;
                } else if (res.code == 202) {
                    self.location = '/pages/login.html'
                } else {
                    $('.pack>.right').toast({
                        content: res.desc,
                        duration: 1500,
                        isCenter: false,
                        background: 'rgba(44,83,128,0.9)',
                    });
                }
            },
            error: function (res) {
                $('.pack>.right').toast({
                    content: '网络异常',
                    duration: 1500,
                    isCenter: false,
                    background: 'rgba(44,83,128,0.9)',
                });
            }
        })
    }

    //关闭弹框
    $('body').click(function () {
        $('.right>.pack').css({display: 'none'})
    });

    //克隆玩家
    $('.clone>.left').click(function () {
        event.stopPropagation();
        if ($(this).find('img').attr('src') == '../images/selected.png') {
            $(this).find('img').attr('src', '../images/not.png')
        } else if ($(this).find('img').attr('src') == '../images/not.png') {
            $(this).find('img').attr('src', '../images/selected.png')
        }
    });
});
