//这是一个立即执行的函数，是一个独立的作用域，不用担心参数命名重复的问题，它会自动调用自己，不用我们去手动调用
(function flexble(window, docmount) {
    var docEl = docmount.documentElement; //获取html的根元素（<html> 和 </html> 之间的内容）
    //dpr 俗称物理像素比
    var dpr = window.devicePixelRatio || 1;

    //adjust body font size 设置body的字体大小
    function setBodyFonSize() {
        //如果页面中有body，就设置body的字体大小
        if (document.body) {
            document.body.style.fontSize = (12 * dpr) + 'px';
        } else {
            //如果页面当中没有body元素，则等待页面DOM元素加载完毕再去设置body字体大小
            document.addEventListener('DOMContentLoaded', setBodyFonSize)
        }
    }
    setBodyFonSize();

    //set 1rem = viewWidth / 10     设置html元素的文字大小
    function setRemUnit() {
        var rem = docEl.clientWidth / 10; //把屏幕划分成十等分
        docEl.style.fontSize = rem + 'px';
    }
    setRemUnit();

    //reset rem unit on page resize     当页面大小发生改变的时候，要重新设置rem的值
    window.addEventListener('resize', setRemUnit);
    //pageshow:当页面重新加载时触发的事件   不管浏览器有没有缓存都会执行，而有的浏览器会判断是否缓存而执行load事件
    window.addEventListener('pageshow', function (e) {
        //e.persisted：返回的是true。如果这个页面是从缓存里面取过来的页面，也需要重新设置rem的大小
        if (e.persisted) {
            setRemUnit();
        }
    });

    //detect 0.5px supports 有的手机端不支持0.5大小的像素处理方法
    if (dpr >= 2) {
        var fakeBody = document.createElement('body');
        var testElement = document.createElement('div');
        testElement.style.border = '.5px solid transparent';
        fakeBody.appendChild(testElement);
        docEl.appendChild(fakeBody);
        if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines');
        }
        docEl.removeChild(fakeBody);
    }
}(window, document)); //window、document是传递的参数
//立即执行函数的两种不同的写法
// (function (parameter1，parameter2) { }(arguments1,arguments2))  
// (function (parameter1，parameter2) { })(arguments1,arguments2)