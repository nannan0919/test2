(function ($) {
    document.getElementById('script').src='base.js';
	var playlist = [
		k = {
			title: '狼人杀背景音乐',
			album: '匿名',
			cover: '../images/7.png',
			mp3: '../mp3/background/background_crop_up.mp3',
			ogg: ''
		}

	];
	var itemInfo;
	$.ajax({
		type: "post",
		url: admin + '/admin/merchant/musicList',
		contentType: "application/x-www-form-urlencoded",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function (res) {
			var data = jQuery.parseJSON(res);
			console.log(data)
			if (data.code == 200) {
				itemInfo = data.data.list;
				if(itemInfo.length==0){}
				else{
					for (var i = 0; i < itemInfo.length; i++) {
						//音乐列表
						var k = {
							title: itemInfo[i].name,
							album: '匿名',
							cover: '../images/7.png',
							mp3: itemInfo[i].link,
							ogg: ''
						}
						playlist.push(k)
					}
				}
			

				var repeat = localStorage.repeat || 0,
					shuffle = localStorage.shuffle || 'false',
					continous = true,
					autoplay = false;
				for (var i = 0; i < playlist.length; i++) {
					var item = playlist[i];
					$('#playlist').append('<div class="line"></div><li><text>' + item.title + '</text><text>' + item.album + '</text></li>');
				}
				var time = new Date(),
					currentTrack = shuffle === 'true' ? time.getTime() % playlist.length : 0,
					trigger = false,
					audio, timeout, isPlaying, playCounts;
				// 播放
				var play = function () {
					audio.play();
					$('.playback').addClass('playing');
					timeout = setInterval(updateProgress, 100);
					isPlaying = true;
				}
				// 暂停
				var pause = function () {
					audio.pause();
					$('.playback').removeClass('playing');
					clearInterval(updateProgress);
					isPlaying = false;
				}

				// 歌曲进度条
				var setProgress = function (value) {
					var currentSec = parseInt(value % 60) < 10 ? '0' + parseInt(value % 60) : parseInt(value % 60),
						ratio = value / audio.duration * 100;
					$('.timer').html(parseInt(value / 60) + ':' + currentSec);
					$('.progress .pace').css('width', ratio + '%');
					$('.progress .slider a').css('left', ratio + '%');
				}

				var updateProgress = function () {
					setProgress(audio.currentTime);
				}

				// Progress slider
				$('.progress .slider').slider({
					step: 0.1,
					slide: function (event, ui) {
						$(this).addClass('enable');
						setProgress(audio.duration * ui.value / 100);
						clearInterval(timeout);
					},
					stop: function (event, ui) {
						audio.currentTime = audio.duration * ui.value / 100;
						$(this).removeClass('enable');
						timeout = setInterval(updateProgress, 500);
					}
				});
				// Volume slider音量
				var setVolume = function (value) {
					localStorage.volume = value;
					audio.volume = value;
					// alert('本地' + localStorage.volume + '实际音量' + audio.volume + '设置' + value)

					$('.volume .pace').css('width', value * 100 + '%');
					$('.volume .slider a').css('left', value * 100 + '%');
				}

				var volume = localStorage.volume || 0.5;
				$('.volume .slider').slider({
					max: 1,
					min: 0,
					step: 0.01,
					value: volume,
					slide: function (event, ui) {
						setVolume(ui.value);
						$(this).addClass('enable');
						$('.mute').removeClass('enable');
					},
					stop: function () {
						$(this).removeClass('enable');
					}


				}).children('.pace').css('width', volume * 100 + '%');

				$('.mute').click(function () {
					if ($(this).hasClass('enable')) {
						setVolume($(this).data('volume'));
						$(this).removeClass('enable');
					} else {
						$(this).data('volume', audio.volume).addClass('enable');
						setVolume(0);
					}

				});
				// Switch track
				var switchTrack = function (i) {
					if (i < 0) {
						track = currentTrack = playlist.length - 1;
					} else if (i >= playlist.length) {
						track = currentTrack = 0;
					} else {
						track = i;
					}

					$('.audio').remove();
					loadMusic(track);
					if (isPlaying == true) play();
				}

				// 随机播放
				var shufflePlay = function () {
					var time = new Date(),
						lastTrack = currentTrack;
					currentTrack = time.getTime() % playlist.length;
					if (lastTrack == currentTrack) ++currentTrack;
					switchTrack(currentTrack);
				}

				// Fire when track ended
				var ended = function () {
					pause();
					audio.currentTime = 0;
					playCounts++;
					if (continous == true) isPlaying = true;
					if (repeat == 1) {
						play();
					} else {
						if (shuffle === 'true') {
							shufflePlay();
						} else {
							if (repeat == 2) {
								switchTrack(++currentTrack);
							} else {
								if (currentTrack < playlist.length) switchTrack(++currentTrack);
							}
						}
					}
				}

				var beforeLoad = function () {
					var endVal = this.seekable && this.seekable.length ? this.seekable.end(0) : 0;
					$('.progress .loaded').css('width', (100 / (this.duration || 1) * endVal) + '%');
				}

				// Fire when track loaded completely
				var afterLoad = function () {
					if (autoplay == true) play();
				}

				// Load track
				var loadMusic = function (i) {
					var item = playlist[i]
					newaudio = $('<audio class="audio">').html('<source src="' + item.mp3 + '"><source src="' + item.ogg + '">').appendTo('#player');
					$('.cover').html('<img src="' + item.cover + '" alt="' + item.album + '">');
					$('.tag').html('<strong>' + item.title + '</strong>');
					$('#playlist li').removeClass('playing').eq(i).addClass('playing');
					audio = newaudio[0];
					audio.volume = $('.mute').hasClass('enable') ? 0 : volume;
					audio.addEventListener('progress', beforeLoad, false);
					audio.addEventListener('durationchange', beforeLoad, false);
					audio.addEventListener('canplay', afterLoad, false);
					audio.addEventListener('ended', ended, false);
				}

				loadMusic(currentTrack);
				$('.playback').on('click', function () {
					if ($(this).hasClass('playing')) {
						pause();
					} else {
						play();
					}
				});
				$('.light').click(function () {
					pause();

				})
				$('.black').click(function () {
					play();

				})

				// 上一首
				$('.rewind').on('click', function () {
					switchTrack(--currentTrack);
				});
				// 下一首
				$('.fastforward').on('click', function () {
					switchTrack(++currentTrack);
				});
				$('#playlist li').each(function (i) {
					var _i = i;
					$(this).on('click', function () {
						switchTrack(_i);
					});
				});

				// if (shuffle === 'true') $('.shuffle').addClass('enable');
				if (repeat == 1) {
					$('.repeat').addClass('once');
				} else if (repeat == 2) {
					$('.repeat').addClass('all');
				}

				$('.repeat').on('click', function () {
					if ($(this).hasClass('once')) {
						repeat = localStorage.repeat = 0;
						$(this).removeClass('once')
					}
					else {
						repeat = localStorage.repeat = 1;
						$(this).addClass('once');
					}
				});

				$('.shuffle').on('click', function () {
					if ($(this).hasClass('enable')) {
						shuffle = localStorage.shuffle = 'false';
						$(this).removeClass('enable');
					} else {
						shuffle = localStorage.shuffle = 'true';
						$(this).addClass('enable');
					}
				});
			} else if (data.code == 202) {
                window.location.href = '/pages/login.html';
			} else {
				console.log(data)
			}
		},
		error: function () {
			console.log("查询异常，请稍后重试！");
		}
	});
})(jQuery);