// 辅助函数，设置时间显示格式
var zfill = function(n, width){
    var s = ''
    var len = width - String(n).length
    for (var i = 0; i < len; i++) {
        s += 0
    }
    s += String(n)
    return s
}
var formedTime = function(t){
    var t = parseInt(t)
    // log('t', t)
    var min = zfill(Math.floor(t / 60), 2)
    var sec = zfill(t % 60, 2)
    var time = `${min}:${sec}`
    return time
}
var a = e('#id-audio-player')
var buttonPlay = e('#id-button-play')
var buttonPause = e('#id-button-pause')
var picture = e('#g-music-img img')
var totalTime = e('#time-total')
var currentTime = e('#time-current')

// 转动唱片
var rotatePicture = function() {
    let picture = e('#g-music-img img')
    toggleClass(picture, 'rotate')
}

// 歌曲的播放、暂停
var toggleSong = function(){
    buttonPlay.addEventListener('click', function(event){
        a.play()
        toggleClass(buttonPause, 'hide')
        toggleClass(buttonPlay, 'hide')
        toggleClass(picture, 'img-rotate')
    })
    buttonPause.addEventListener('click', function(event){
        a.pause()
        toggleClass(buttonPause, 'hide')
        toggleClass(buttonPlay, 'hide')
        toggleClass(picture, 'img-rotate')
    })
}

// 歌曲时间显示
var showTime = function(){
    // 显示歌曲总时长
    a.addEventListener('canplay', function(){
        var t1 = a.duration
        totalTime.innerHTML = formedTime(t1)
    })
    // 显示歌曲当前时间
    setInterval(function(){
        var t2 = a.currentTime
        currentTime.innerHTML = formedTime(t2)
        var value = parseInt(t2)
        var input = e('.song-time input')
        input.value = value
        input.max = parseInt(a.duration)
        var n = Math.floor(value/input.max * 100)
        input.style.background =  '-webkit-linear-gradient(left ,#FD4848 0%,#FD4848 '+n+'%,#C4C4C4 '+n+'%, #C4C4C4 100%)'

        //log('value: ', value, e('.song-time input'), input.value, input.max)
    }, 1000)
}

// var songsBox = e('.songs-box')
// songsBox.addEventListener('click', function(event){
//     var self = event.target
//     var path = self.dataset.path
//     a.src = path
//     a.addEventListener('canplay', function(){
//         a.play()
//     })
// })
// 单曲循环
// a.addEventListener('ended', function(){
//     a.play()
// })
// 列表循环
var arrSongs = ['1.mp3', '2.mp3','3.mp3']
// var index = a.dataset.index
// a.addEventListener('ended', function(){
//     log('old', index)
//     index = (index + 1) % 3
//     log('new', index)
//     a.src = arrSongs[index]
//     a.play()
// })
// 随机播放
var randomSong = function(){
    a.addEventListener('ended', function(){
        var n = Math.floor(Math.random() * 3)
        log('n', n)
        //a.src = arrSongs[n]
        a.src = '1.mp3'
        a.play()
    })
}


// 进度条显示及事件绑定
var bindProgress = function() {
    var duration = parseInt(a.duration)
    var input = e('.song-time input')
    bindEvent(input, 'mouseenter', function(){
        var p = val(input)
        bindEvent(input, 'click', function(){
            p = val(input)
            bg(p)
            // 拖动或点击进度条改变歌曲播放进度
            var result = duration * p / 100
            a.currentTime = result
            log('click', p, input, result)
        })
        bindEvent(input, 'mousemove', function(){
            p = val(input)
            bg(p)
        })
    })

    var val = function(input) {
        return Math.floor(input.value / input.max * 100)
    }

    var bg = function(n) {
        input.style.background =  '-webkit-linear-gradient(left ,#FD4848 0%,#FD4848 '+n+'%,#C4C4C4 '+n+'%, #C4C4C4 100%)'
    }
}

var _main = function(){
    toggleSong()
    showTime()
    randomSong()
    bindProgress()
}

_main()
