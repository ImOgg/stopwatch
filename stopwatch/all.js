// 設定碼表按鈕: 開始、暫停以及清除
var stopwatch = function () {
    // 開始
    var startAt = 0;
    //每次按暫停 
    var laptime = 0;
    // 清除
    this.reset = function () {
        startAt = laptime = 0;
    };

    // 開始
    var now = function () {
        return (new Date().getTime());
    }
    this.start = function () {
        startAt = startAt ? startAt : now();
    };
    // 暫停
    this.stop = function () {
        laptime = startAt ? laptime + now() - startAt : laptime;
        // 暫停的時候要歸零
        startAt = 0;
    };

    // 總共經歷的時間
    this.time = function () {
        return laptime + (startAt ? now() - startAt : 0);
    };

};


// 設定時間格式: 時 分 秒 顯示到html
var x = new stopwatch();
var time;
var clocktimer;
// 時、分、秒位數 格式
function pad(num, size) {
    var s = "00" + num;
    return s.substring(s.length - size);
};
//  時、分、秒 時間計算 
function formateTime(time) {
    var h = m = s = ms = 0;
    // 停止的時間
    var newTime = "";
    // 時
    h = Math.floor(time / (60 * 60 * 1000));
    time = time % (60 * 60 * 1000)
    // 分
    m = Math.floor(time / (60 * 1000));
    time = time % (60 * 1000)
    // 秒
    ms = time % 1000;
    s = Math.floor(time / 1000)
    // 顯示時間計算結果 套用到格式上
    newTime = pad(h, 2) + ":" + pad(m, 2) + ":" + pad(s, 2) + ":" + pad(ms, 3);
    return newTime;

};
// 顯示結果放到html檔案上

function show() {
    time = document.getElementById("time");
    update();
};

function update() {
    time.innerHTML = formateTime(x.time());
};

function start() {
    clocktimer = setInterval("update()", 1);
    x.start();
};

function stop() {
    x.stop();
    clearInterval(clocktimer);
};
function reset() {
    stop();
    x.reset();
    update();
}
// 設定鍵盤的運作