/*!
 * classie v1.0.1
 * class helper functions
 * from bonzo https://github.com/ded/bonzo
 * MIT license
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, module: false */

(function (window)
{

    'use strict';

    // class helper functions from bonzo https://github.com/ded/bonzo

    function classReg(className)
    {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

    // classList support for class management
    // altho to be fair, the api sucks because it won't accept multiple classes at once
    var hasClass, addClass, removeClass;

    if ('classList' in document.documentElement)
    {
        hasClass = function (elem, c)
        {
            return elem.classList.contains(c);
        };
        addClass = function (elem, c)
        {
            elem.classList.add(c);
        };
        removeClass = function (elem, c)
        {
            elem.classList.remove(c);
        };
    }
    else
    {
        hasClass = function (elem, c)
        {
            return classReg(c).test(elem.className);
        };
        addClass = function (elem, c)
        {
            if (!hasClass(elem, c))
            {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function (elem, c)
        {
            elem.className = elem.className.replace(classReg(c), ' ');
        };
    }

    function toggleClass(elem, c)
    {
        var fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
    }

    var classie = {
        // full names
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        // short names
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };

    // transport
    if (typeof define === 'function' && define.amd)
    {
        // AMD
        define(classie);
    } else if (typeof exports === 'object')
    {
        // CommonJS
        module.exports = classie;
    } else
    {
        // browser global
        window.classie = classie;
    }

})(window); 

//http://tympanus.net/codrops/2013/04/17/slide-and-push-menus/
var menuLeft = document.getElementById('cbp-spmenu-s1'),
        menuRight = document.getElementById('cbp-spmenu-s2'),
        menuTop = document.getElementById('cbp-spmenu-s3'),
        menuBottom = document.getElementById('cbp-spmenu-s4'),
        showLeft = document.getElementById('showLeft'),
        showRight = document.getElementById('showRight'),
        showTop = document.getElementById('showTop'),
        showBottom = document.getElementById('showBottom'),
        showLeftPush = document.getElementById('showLeftPush'),
        showRightPush = document.getElementById('showRightPush'),
        body = document.body;

showLeft.onclick = function () {
    classie.toggle(this, 'active');
    classie.toggle(menuLeft, 'cbp-spmenu-open');
    disableOther('showLeft');
};
showRight.onclick = function () {
    classie.toggle(this, 'active');
    classie.toggle(menuRight, 'cbp-spmenu-open');
    disableOther('showRight');
};
/*
showTop.onclick = function () {
    classie.toggle(this, 'active');
    classie.toggle(menuTop, 'cbp-spmenu-open');
    disableOther('showTop');
};
showBottom.onclick = function () {
    classie.toggle(this, 'active');
    classie.toggle(menuBottom, 'cbp-spmenu-open');
    disableOther('showBottom');
};
showLeftPush.onclick = function () {
    classie.toggle(this, 'active');
    classie.toggle(body, 'cbp-spmenu-push-toright');
    classie.toggle(menuLeft, 'cbp-spmenu-open');
    disableOther('showLeftPush');
};
showRightPush.onclick = function () {
    classie.toggle(this, 'active');
    classie.toggle(body, 'cbp-spmenu-push-toleft');
    classie.toggle(menuRight, 'cbp-spmenu-open');
    disableOther('showRightPush');
};*/

function disableOther(button) {
    if (button !== 'showLeft') {
        classie.toggle(showLeft, 'disabled');
    }
    if (button !== 'showRight') {
        classie.toggle(showRight, 'disabled');
    }
    /*if (button !== 'showTop') {
        classie.toggle(showTop, 'disabled');
    }
    if (button !== 'showBottom') {
        classie.toggle(showBottom, 'disabled');
    }
    if (button !== 'showLeftPush') {
        classie.toggle(showLeftPush, 'disabled');
    }
    if (button !== 'showRightPush') {
        classie.toggle(showRightPush, 'disabled');*/
    }
}