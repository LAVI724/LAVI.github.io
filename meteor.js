// <script>
      setInterval(function() {
    const obj = addChild("#sky", "div", 2, "star");

    for (let i = 0; i < obj.children.length; i++) {
        const top = -50 + Math.random() * 200 + "px",
            left = 200 + Math.random() * 1200 + "px",
            scale = 0.3 + Math.random() * 0.5;
        const timer = 1000 + Math.random() * 1000;

        obj.children[i].style.top = top;
        obj.children[i].style.left = left;
        obj.children[i].style.transform = `scale(${scale})`;

        requestAnimation({
            ele: obj.children[i],
            attr: ["top", "left", "opacity"],
            value: [150, -150, .8],
            time: timer,
            flag: false,
            fn: function() {
                requestAnimation({
                    ele: obj.children[i],
                    attr: ["top", "left", "opacity"],
                    value: [150, -150, 0],
                    time: timer,
                    flag: false,
                    fn: () => {
                        obj.parent.removeChild(obj.children[i]);
                    }
                })
            }
        });
    }

}, 1000);

setInterval(function() {
    const obj = addChild("#stars", "div", 2, "blink");

    for (let i = 0; i < obj.children.length; i++) {
        const top = -50 + Math.random() * 500 + "px",
            left = 200 + Math.random() * 1200 + "px",
            round = 1 + Math.random() * 2 + "px";
        const timer = 1000 + Math.random() * 4000;

        obj.children[i].style.top = top;
        obj.children[i].style.left = left;
        obj.children[i].style.width = round;
        obj.children[i].style.height = round;

        requestAnimation({
            ele: obj.children[i],
            attr: "opacity",
            value: .5,
            time: timer,
            flag: false,
            fn: function() {
                requestAnimation({
                    ele: obj.children[i],
                    attr: "opacity",
                    value: 0,
                    time: timer,
                    flag: false,
                    fn: function() {
                        obj.parent.removeChild(obj.children[i]);
                    }
                });
            }
        });
    }

}, 1000);

function requestAnimation(obj) {
    
    const parameter = {
        ele: null,
        attr: null,
        value: null,
        time: 1000,
        tween: "linear",
        flag: true,
        stop: false,
        fn: ""
    }

    
    Object.assign(parameter, obj);

    let start = 0;
    let target = (typeof parameter.ele === "string" ? document.querySelector(parameter.ele) : parameter.ele), 
        attr = parameter.attr, 
        beginAttr = parseFloat(getComputedStyle(target)[attr]), 
        value = parameter.value, 
        count = value - beginAttr, 
        time = parameter.time, 
        tween = parameter.tween,
        flag = parameter.flag,
        callback = parameter.fn,
        curVal = 0;

    (function() {
        if (attr instanceof Array) {
            beginAttr = [];
            count = [];
            for (let i of attr) {
                const val = parseFloat(getComputedStyle(target)[i]);
                beginAttr.push(val);
                count.push(value - val);
            }
        }
        if (value instanceof Array) {
            for (let i in value) {
                count[i] = value[i] - beginAttr[i];
            }
        }
    })();

    function animate(timestamp) {
        if (parameter.stop) return; 

        if (!start) start = timestamp;

        let t = timestamp - start;
    
        if (beginAttr instanceof Array) {
            if (typeof count === "number") {
                if (typeof time === "number") {
                    if (t > time) t = time; 
                    for (let i in beginAttr) {
                        if (flag) curVal = Tween[tween](t, beginAttr[i], count, time);
                        else curVal = Tween[tween](t, beginAttr[i], count + beginAttr[i], time); 
                        if (attr[i] === "opacity") target.style[attr[i]] = curVal;
                        else target.style[attr[i]] = curVal + "px"; 

                        if (t < time) requestAnimationFrame(animate); 
                        else callback && callback(); 
                    }
                    return;
                }

                if (time instanceof Array) {
                    for (let i in beginAttr) {
                        if (!time[i] && time[i] !== 0) {
                            throw new Error(
                                "The input time's length is not equal to attribute's length");
                        }

                        if (parseFloat(getComputedStyle(target)[attr[i]]) === (typeof value === "number" ? value : value[i]))
                            continue;
                        if (t > time[i]) t = time[i]; 

                        if (flag || attr[i] === "opacity") curVal = Tween[tween](t, beginAttr[i], count, i); 
                        else curVal = Tween[tween](t, beginAttr[i], count + beginAttr[i], i); 
                        if (attr[i] === "opacity") target.style[attr[i]] = curVal; 
                        else target.style[attr[i]] = curVal + "px"; 
                    }

                    if (t < Math.max(...time)) requestAnimationFrame(animate); 
                    else callback && callback(); 
                    return;
                }
            }

            if (count instanceof Array) {
                if (typeof time === "number") {

                    if (t > time) t = time; 

                    for (let i in beginAttr) { 
                        if (!count[i] && count[i] !== 0) {
                            throw new Error(
                                "The input value's length is not equal to attribute's length");
                        }

                        if (flag || attr[i] === "opacity") curVal = Tween[tween](t, beginAttr[i], count[i], time); 
                        else curVal = Tween[tween](t, beginAttr[i], count[i] + beginAttr[i], time); 
                        if (attr[i] === "opacity") target.style[attr[i]] = curVal;
                        else target.style[attr[i]] = curVal + "px";
                    }

                    if (t < time) requestAnimationFrame(animate); 
                    else callback && callback();
                    return;
                }

                if (time instanceof Array) {
                    for (let i in beginAttr) {
                        if (!time[i] && time[i] !== 0) {
                            throw new Error(
                                "The input time's length is not equal to attribute's length");
                        }
                        if (parseFloat(getComputedStyle(target)[attr[i]]) === (typeof value === "number" ? value : value[i]))
                            continue;

                        if (t > time[i]) t = time[i]; 
    
                        if (!count[i] && count[i] !== 0) {
                            throw new Error(
                                "The input value's length is not equal to attribute's length");
                        }

                        if (flag || attr[i] === "opacity") curVal = Tween[tween](t, beginAttr[i], count[i], time[i]); 
                        else curVal = Tween[tween](t, beginAttr[i], count[i] + beginAttr[i], time[i]); 
                        if (attr[i] === "opacity") target.style[attr[i]] = curVal;
                        else target.style[attr[i]] = curVal + "px";
                    }

                    if (t < Math.max(...time)) requestAnimationFrame(animate);
                    else callback && callback();
                    return;
                }
            }

        }

        if (t > time) t = time;
        if (flag || attr === "opacity") curVal = Tween[tween](t, beginAttr, count, time); 
        else curVal = Tween[tween](t, beginAttr[i], count + beginAttr, time); 
        if (attr === "opacity") target.style[attr] = curVal;
        else target.style[attr] = curVal + "px";

        if (t < time) requestAnimationFrame(animate);
        else callback && callback();

    }

    requestAnimationFrame(animate);
    return parameter; 
}

let Tween = {
    linear: function(t, b, c, d) { 
        return c * t / d + b;
    },
    easeIn: function(t, b, c, d) { 
        return c * (t /= d) * t + b;
    },
    easeOut: function(t, b, c, d) { 
        return -c * (t /= d) * (t - 2) + b;
    },
    easeBoth: function(t, b, c, d) { 
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t + b;
        }
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInStrong: function(t, b, c, d) { 
        return c * (t /= d) * t * t * t + b;
    },
    easeOutStrong: function(t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeBothStrong: function(t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t * t + b;
        }
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    elasticIn: function(t, b, c, d, a, p) { 
        if (t === 0) {
            return b;
        }
        if ((t /= d) == 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    elasticOut: function(t, b, c, d, a, p) { 
        if (t === 0) {
            return b;
        }
        if ((t /= d) == 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    elasticBoth: function(t, b, c, d, a, p) {
        if (t === 0) {
            return b;
        }
        if ((t /= d / 2) == 2) {
            return b + c;
        }
        if (!p) {
            p = d * (0.3 * 1.5);
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        if (t < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) *
                Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        }
        return a * Math.pow(2, -10 * (t -= 1)) *
            Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
    },
    backIn: function(t, b, c, d, s) { 
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    backOut: function(t, b, c, d, s) {
        if (typeof s == 'undefined') {
            s = 3.70158;
        }
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    backBoth: function(t, b, c, d, s) {
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        if ((t /= d / 2) < 1) {
            return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        }
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    bounceIn: function(t, b, c, d) {
        return c - Tween['bounceOut'](d - t, 0, c, d) + b;
    },
    bounceOut: function(t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
        }
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
    },
    bounceBoth: function(t, b, c, d) {
        if (t < d / 2) {
            return Tween['bounceIn'](t * 2, 0, c, d) * 0.5 + b;
        }
        return Tween['bounceOut'](t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
    }
}
function addChild(ele, node, n, className, boolean) {
   
    let parent = null;

    if (typeof ele !== "string") parent = ele;
    else if (ele[0] === "#") parent = document.getElementById(ele.slice(1));
    else if (ele[0] === ".") {
        if (boolean === false) parent = document.getElementsByClassName(ele.slice(1))[0];
        else parent = document.getElementsByClassName(ele.slice(1));
    } else {
        if (boolean === false) parent = docuemnt.getElementsByTagName(ele)[0];
        else parent = document.getElementsByTagNameNS(ele);
    }

  
    const obj = {
        "parent": parent,
        "children": []
    };

  
    if (boolean) {
        for (let i = 0; i < parent.length; i++) {
            obj.children[i] = [];
            for (let j = 0; j < n; j++) {
                const target = document.createElement(node);
                target.className = className;
                parent[i].appendChild(target);
                obj.children[i][j] = target;
            }
        }
    } else {
        for (let i = 0; i < n; i++) {
            const target = document.createElement(node);
            target.className = className;
            parent.appendChild(target);

            obj.children.push(target);
        }
    }

  
    return obj;
}

    // </script>