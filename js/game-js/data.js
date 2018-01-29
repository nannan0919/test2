// 请求数据
function getData() {
    document.getElementById('data').src='base.js';
    if(sessionStorage.home_of){
        var req = {
            roomId:JSON.parse(sessionStorage.home_of).num,
        }
    }

    $.ajax({
        type: 'POST',
        url: admin+'/admin/roomInfo',
        data: req,
        xhrFields: {
            withCredentials: true
        },
        success: function (res) {
            var data = JSON.parse(res);
            console.log(data);
            if (data.code == 200) {
                var room = data.data.roomId;
                var text = '<text>' + room + '号房间</text>'
                $('#roomId').append(text)
                var list = ''; //左边的
                var list2 = ''; //中间的
                var list4 = ''; //右边的
                var a = [];
                var b, c, d, e, f, king;
                //渲染数据
                $.each(data.data.players, function (index, element) {
                    //左边的
                    if (data.data.players[index].seatNo <= 8) {
                        list = '<div class="top"><text class="number">' +
                            element.seatNo + '号</text><text>' + element.roleDesc + '</text><span class="voice"><img src="../images/laba.png" alt=""></span></div>'
                        $('.left ul li').eq(element.seatNo - 1).html(list).attr('id', 'li');
                    }
                    //右边的
                    else if (9 <= data.data.players[index].seatNo <= 15) {
                        list4 = '<div class="top"><text class="number">' +
                            element.seatNo + '号</text><text>' + element.roleDesc + '</text><span class="voice"><img src="../images/laba.png" alt=""></span></div>'
                        $('.right ul li').eq(element.seatNo - 9).html(list4).attr('id', 'li');
                    }
                    //中间的
                    if (data.data.players[index].seatNo) {
                        list2 = '<div class="top"><text class="number">' + element.seatNo + '号</text><text>' + element.roleDesc +
                            '</text></div><div class="foot"><text>' + element.nickName + '</text><text>ID:' + element.cardNo + '</text></div><div class="Exited"></div>'
                        $('.bottom li').eq(element.seatNo - 1).html(list2).attr('id', 'lii').addClass(element.roleName);
                    }

                    if (element.roleDesc == '狼人') {
                        a.push(element.seatNo - 1);
                    }
                    if (element.roleDesc == '猎人') {
                        b = element.seatNo - 1;
                    }
                    if (element.roleDesc == '预言家') {

                        c = element.seatNo - 1;
                    }
                    if (element.roleDesc == '丘比特') {
                        d = element.seatNo - 1;
                    }
                    if (element.roleDesc == '女巫') {
                        e = element.seatNo - 1;
                    }
                    if (element.roleDesc == '守卫') {
                        f = element.seatNo - 1;
                    }
                    if (element.roleDesc == '白狼王') {
                        king = element.seatNo - 1;
                    }
                })
                var dao = '<div class="knife">刀</div>'
                var du = '<div class="poison">毒</div>'
                var jiu = '<div class="save">救</div>'
                var yan = '<div class="check">验</div>'
                var shou = '<div class="guArd">守</div>'
                var dai = ' <div class="hunt">带</div>'
                var she = '<div id="design">射</div>'
                var blew = '<div id="blew" style="display:none">爆</div>'
                var wolfDai = '<div id="wolfDai">带</div>'
                for (var j = 0; j < a.length; j++) {
                    $('.bottom ul li').eq(a[j]).find('.foot').append(dao)
                    $('.bottom ul li').eq(a[j]).find('.foot').append(blew)
                }
                $('.bottom ul li').eq(b).find('.foot').append(dai)
                $('.bottom ul li').eq(c).find('.foot').append(yan)
                $('.bottom ul li').eq(d).find('.foot').append(she)
                $('.bottom ul li').eq(e).find('.foot').append(du)
                $('.bottom ul li').eq(e).find('.foot').append(jiu)
                $('.bottom ul li').eq(f).find('.foot').append(shou)
                $('.bottom ul li').eq(king).find('.foot').append(blew)
                $('.bottom ul li').eq(king).find('.foot').append(dao)
                $('.bottom ul li').eq(king).find('.foot').append(wolfDai)
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
                var new_arr = [];
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
                        var img = '<img src="../images/police.png" alt="" class="policeBadge">' //警徽
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

            }else if(data.code==202){
                window.location.href = '/pages/login.html';
            }
             else {
                console.log('失败')
            }
        },
        error: function (xhr, textStatus) {
            alert("网络异常")
        }
    })
}
getData();