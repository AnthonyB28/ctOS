function notFound() {
    app.not_found()
}

function before() {}(function(e, t) {
    function _(e) {
        var t = M[e] = {};
        v.each(e.split(y), function(e, n) {
            t[n] = true
        });
        return t
    }

    function H(e, n, r) {
        if (r === t && e.nodeType === 1) {
            var i = "data-" + n.replace(P, "-$1").toLowerCase();
            r = e.getAttribute(i);
            if (typeof r === "string") {
                try {
                    r = r === "true" ? true : r === "false" ? false : r === "null" ? null : +r + "" === r ? +r : D.test(r) ? v.parseJSON(r) : r
                } catch (s) {}
                v.data(e, n, r)
            } else {
                r = t
            }
        }
        return r
    }

    function B(e) {
        var t;
        for (t in e) {
            if (t === "data" && v.isEmptyObject(e[t])) {
                continue
            }
            if (t !== "toJSON") {
                return false
            }
        }
        return true
    }

    function et() {
        return false
    }

    function tt() {
        return true
    }

    function ut(e) {
        return !e || !e.parentNode || e.parentNode.nodeType === 11
    }

    function at(e, t) {
        do {
            e = e[t]
        } while (e && e.nodeType !== 1);
        return e
    }

    function ft(e, t, n) {
        t = t || 0;
        if (v.isFunction(t)) {
            return v.grep(e, function(e, r) {
                var i = !! t.call(e, r, e);
                return i === n
            })
        } else if (t.nodeType) {
            return v.grep(e, function(e, r) {
                return e === t === n
            })
        } else if (typeof t === "string") {
            var r = v.grep(e, function(e) {
                return e.nodeType === 1
            });
            if (it.test(t)) {
                return v.filter(t, r, !n)
            } else {
                t = v.filter(t, r)
            }
        }
        return v.grep(e, function(e, r) {
            return v.inArray(e, t) >= 0 === n
        })
    }

    function lt(e) {
        var t = ct.split("|"),
            n = e.createDocumentFragment();
        if (n.createElement) {
            while (t.length) {
                n.createElement(t.pop())
            }
        }
        return n
    }

    function Lt(e, t) {
        return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t))
    }

    function At(e, t) {
        if (t.nodeType !== 1 || !v.hasData(e)) {
            return
        }
        var n, r, i, s = v._data(e),
            o = v._data(t, s),
            u = s.events;
        if (u) {
            delete o.handle;
            o.events = {};
            for (n in u) {
                for (r = 0, i = u[n].length; r < i; r++) {
                    v.event.add(t, n, u[n][r])
                }
            }
        }
        if (o.data) {
            o.data = v.extend({}, o.data)
        }
    }

    function Ot(e, t) {
        var n;
        if (t.nodeType !== 1) {
            return
        }
        if (t.clearAttributes) {
            t.clearAttributes()
        }
        if (t.mergeAttributes) {
            t.mergeAttributes(e)
        }
        n = t.nodeName.toLowerCase();
        if (n === "object") {
            if (t.parentNode) {
                t.outerHTML = e.outerHTML
            }
            if (v.support.html5Clone && e.innerHTML && !v.trim(t.innerHTML)) {
                t.innerHTML = e.innerHTML
            }
        } else if (n === "input" && Et.test(e.type)) {
            t.defaultChecked = t.checked = e.checked;
            if (t.value !== e.value) {
                t.value = e.value
            }
        } else if (n === "option") {
            t.selected = e.defaultSelected
        } else if (n === "input" || n === "textarea") {
            t.defaultValue = e.defaultValue
        } else if (n === "script" && t.text !== e.text) {
            t.text = e.text
        }
        t.removeAttribute(v.expando)
    }

    function Mt(e) {
        if (typeof e.getElementsByTagName !== "undefined") {
            return e.getElementsByTagName("*")
        } else if (typeof e.querySelectorAll !== "undefined") {
            return e.querySelectorAll("*")
        } else {
            return []
        }
    }

    function _t(e) {
        if (Et.test(e.type)) {
            e.defaultChecked = e.checked
        }
    }

    function Qt(e, t) {
        if (t in e) {
            return t
        }
        var n = t.charAt(0).toUpperCase() + t.slice(1),
            r = t,
            i = Jt.length;
        while (i--) {
            t = Jt[i] + n;
            if (t in e) {
                return t
            }
        }
        return r
    }

    function Gt(e, t) {
        e = t || e;
        return v.css(e, "display") === "none" || !v.contains(e.ownerDocument, e)
    }

    function Yt(e, t) {
        var n, r, i = [],
            s = 0,
            o = e.length;
        for (; s < o; s++) {
            n = e[s];
            if (!n.style) {
                continue
            }
            i[s] = v._data(n, "olddisplay");
            if (t) {
                if (!i[s] && n.style.display === "none") {
                    n.style.display = ""
                }
                if (n.style.display === "" && Gt(n)) {
                    i[s] = v._data(n, "olddisplay", nn(n.nodeName))
                }
            } else {
                r = Dt(n, "display");
                if (!i[s] && r !== "none") {
                    v._data(n, "olddisplay", r)
                }
            }
        }
        for (s = 0; s < o; s++) {
            n = e[s];
            if (!n.style) {
                continue
            }
            if (!t || n.style.display === "none" || n.style.display === "") {
                n.style.display = t ? i[s] || "" : "none"
            }
        }
        return e
    }

    function Zt(e, t, n) {
        var r = Rt.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }

    function en(e, t, n, r) {
        var i = n === (r ? "border" : "content") ? 4 : t === "width" ? 1 : 0,
            s = 0;
        for (; i < 4; i += 2) {
            if (n === "margin") {
                s += v.css(e, n + $t[i], true)
            }
            if (r) {
                if (n === "content") {
                    s -= parseFloat(Dt(e, "padding" + $t[i])) || 0
                }
                if (n !== "margin") {
                    s -= parseFloat(Dt(e, "border" + $t[i] + "Width")) || 0
                }
            } else {
                s += parseFloat(Dt(e, "padding" + $t[i])) || 0;
                if (n !== "padding") {
                    s += parseFloat(Dt(e, "border" + $t[i] + "Width")) || 0
                }
            }
        }
        return s
    }

    function tn(e, t, n) {
        var r = t === "width" ? e.offsetWidth : e.offsetHeight,
            i = true,
            s = v.support.boxSizing && v.css(e, "boxSizing") === "border-box";
        if (r <= 0 || r == null) {
            r = Dt(e, t);
            if (r < 0 || r == null) {
                r = e.style[t]
            }
            if (Ut.test(r)) {
                return r
            }
            i = s && (v.support.boxSizingReliable || r === e.style[t]);
            r = parseFloat(r) || 0
        }
        return r + en(e, t, n || (s ? "border" : "content"), i) + "px"
    }

    function nn(e) {
        if (Wt[e]) {
            return Wt[e]
        }
        var t = v("<" + e + ">").appendTo(i.body),
            n = t.css("display");
        t.remove();
        if (n === "none" || n === "") {
            Pt = i.body.appendChild(Pt || v.extend(i.createElement("iframe"), {
                frameBorder: 0,
                width: 0,
                height: 0
            }));
            if (!Ht || !Pt.createElement) {
                Ht = (Pt.contentWindow || Pt.contentDocument).document;
                Ht.write("<!doctype html><html><body>");
                Ht.close()
            }
            t = Ht.body.appendChild(Ht.createElement(e));
            n = Dt(t, "display");
            i.body.removeChild(Pt)
        }
        Wt[e] = n;
        return n
    }

    function fn(e, t, n, r) {
        var i;
        if (v.isArray(t)) {
            v.each(t, function(t, i) {
                if (n || sn.test(e)) {
                    r(e, i)
                } else {
                    fn(e + "[" + (typeof i === "object" ? t : "") + "]", i, n, r)
                }
            })
        } else if (!n && v.type(t) === "object") {
            for (i in t) {
                fn(e + "[" + i + "]", t[i], n, r)
            }
        } else {
            r(e, t)
        }
    }

    function Cn(e) {
        return function(t, n) {
            if (typeof t !== "string") {
                n = t;
                t = "*"
            }
            var r, i, s, o = t.toLowerCase().split(y),
                u = 0,
                a = o.length;
            if (v.isFunction(n)) {
                for (; u < a; u++) {
                    r = o[u];
                    s = /^\+/.test(r);
                    if (s) {
                        r = r.substr(1) || "*"
                    }
                    i = e[r] = e[r] || [];
                    i[s ? "unshift" : "push"](n)
                }
            }
        }
    }

    function kn(e, n, r, i, s, o) {
        s = s || n.dataTypes[0];
        o = o || {};
        o[s] = true;
        var u, a = e[s],
            f = 0,
            l = a ? a.length : 0,
            c = e === Sn;
        for (; f < l && (c || !u); f++) {
            u = a[f](n, r, i);
            if (typeof u === "string") {
                if (!c || o[u]) {
                    u = t
                } else {
                    n.dataTypes.unshift(u);
                    u = kn(e, n, r, i, u, o)
                }
            }
        }
        if ((c || !u) && !o["*"]) {
            u = kn(e, n, r, i, "*", o)
        }
        return u
    }

    function Ln(e, n) {
        var r, i, s = v.ajaxSettings.flatOptions || {};
        for (r in n) {
            if (n[r] !== t) {
                (s[r] ? e : i || (i = {}))[r] = n[r]
            }
        }
        if (i) {
            v.extend(true, e, i)
        }
    }

    function An(e, n, r) {
        var i, s, o, u, a = e.contents,
            f = e.dataTypes,
            l = e.responseFields;
        for (s in l) {
            if (s in r) {
                n[l[s]] = r[s]
            }
        }
        while (f[0] === "*") {
            f.shift();
            if (i === t) {
                i = e.mimeType || n.getResponseHeader("content-type")
            }
        }
        if (i) {
            for (s in a) {
                if (a[s] && a[s].test(i)) {
                    f.unshift(s);
                    break
                }
            }
        }
        if (f[0] in r) {
            o = f[0]
        } else {
            for (s in r) {
                if (!f[0] || e.converters[s + " " + f[0]]) {
                    o = s;
                    break
                }
                if (!u) {
                    u = s
                }
            }
            o = o || u
        } if (o) {
            if (o !== f[0]) {
                f.unshift(o)
            }
            return r[o]
        }
    }

    function On(e, t) {
        var n, r, i, s, o = e.dataTypes.slice(),
            u = o[0],
            a = {}, f = 0;
        if (e.dataFilter) {
            t = e.dataFilter(t, e.dataType)
        }
        if (o[1]) {
            for (n in e.converters) {
                a[n.toLowerCase()] = e.converters[n]
            }
        }
        for (; i = o[++f];) {
            if (i !== "*") {
                if (u !== "*" && u !== i) {
                    n = a[u + " " + i] || a["* " + i];
                    if (!n) {
                        for (r in a) {
                            s = r.split(" ");
                            if (s[1] === i) {
                                n = a[u + " " + s[0]] || a["* " + s[0]];
                                if (n) {
                                    if (n === true) {
                                        n = a[r]
                                    } else if (a[r] !== true) {
                                        i = s[0];
                                        o.splice(f--, 0, i)
                                    }
                                    break
                                }
                            }
                        }
                    }
                    if (n !== true) {
                        if (n && e["throws"]) {
                            t = n(t)
                        } else {
                            try {
                                t = n(t)
                            } catch (l) {
                                return {
                                    state: "parsererror",
                                    error: n ? l : "No conversion from " + u + " to " + i
                                }
                            }
                        }
                    }
                }
                u = i
            }
        }
        return {
            state: "success",
            data: t
        }
    }

    function Fn() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {}
    }

    function In() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {}
    }

    function $n() {
        setTimeout(function() {
            qn = t
        }, 0);
        return qn = v.now()
    }

    function Jn(e, t) {
        v.each(t, function(t, n) {
            var r = (Vn[t] || []).concat(Vn["*"]),
                i = 0,
                s = r.length;
            for (; i < s; i++) {
                if (r[i].call(e, t, n)) {
                    return
                }
            }
        })
    }

    function Kn(e, t, n) {
        var r, i = 0,
            s = 0,
            o = Xn.length,
            u = v.Deferred().always(function() {
                delete a.elem
            }),
            a = function() {
                var t = qn || $n(),
                    n = Math.max(0, f.startTime + f.duration - t),
                    r = 1 - (n / f.duration || 0),
                    i = 0,
                    s = f.tweens.length;
                for (; i < s; i++) {
                    f.tweens[i].run(r)
                }
                u.notifyWith(e, [f, r, n]);
                if (r < 1 && s) {
                    return n
                } else {
                    u.resolveWith(e, [f]);
                    return false
                }
            }, f = u.promise({
                elem: e,
                props: v.extend({}, t),
                opts: v.extend(true, {
                    specialEasing: {}
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: qn || $n(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n, r) {
                    var i = v.Tween(e, f.opts, t, n, f.opts.specialEasing[t] || f.opts.easing);
                    f.tweens.push(i);
                    return i
                },
                stop: function(t) {
                    var n = 0,
                        r = t ? f.tweens.length : 0;
                    for (; n < r; n++) {
                        f.tweens[n].run(1)
                    }
                    if (t) {
                        u.resolveWith(e, [f, t])
                    } else {
                        u.rejectWith(e, [f, t])
                    }
                    return this
                }
            }),
            l = f.props;
        Qn(l, f.opts.specialEasing);
        for (; i < o; i++) {
            r = Xn[i].call(f, e, l, f.opts);
            if (r) {
                return r
            }
        }
        Jn(f, l);
        if (v.isFunction(f.opts.start)) {
            f.opts.start.call(e, f)
        }
        v.fx.timer(v.extend(a, {
            anim: f,
            queue: f.opts.queue,
            elem: e
        }));
        return f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always)
    }

    function Qn(e, t) {
        var n, r, i, s, o;
        for (n in e) {
            r = v.camelCase(n);
            i = t[r];
            s = e[n];
            if (v.isArray(s)) {
                i = s[1];
                s = e[n] = s[0]
            }
            if (n !== r) {
                e[r] = s;
                delete e[n]
            }
            o = v.cssHooks[r];
            if (o && "expand" in o) {
                s = o.expand(s);
                delete e[r];
                for (n in s) {
                    if (!(n in e)) {
                        e[n] = s[n];
                        t[n] = i
                    }
                }
            } else {
                t[r] = i
            }
        }
    }

    function Gn(e, t, n) {
        var r, i, s, o, u, a, f, l, c = this,
            h = e.style,
            p = {}, d = [],
            m = e.nodeType && Gt(e);
        if (!n.queue) {
            f = v._queueHooks(e, "fx");
            if (f.unqueued == null) {
                f.unqueued = 0;
                l = f.empty.fire;
                f.empty.fire = function() {
                    if (!f.unqueued) {
                        l()
                    }
                }
            }
            f.unqueued++;
            c.always(function() {
                c.always(function() {
                    f.unqueued--;
                    if (!v.queue(e, "fx").length) {
                        f.empty.fire()
                    }
                })
            })
        }
        if (e.nodeType === 1 && ("height" in t || "width" in t)) {
            n.overflow = [h.overflow, h.overflowX, h.overflowY];
            if (v.css(e, "display") === "inline" && v.css(e, "float") === "none") {
                if (!v.support.inlineBlockNeedsLayout || nn(e.nodeName) === "inline") {
                    h.display = "inline-block"
                } else {
                    h.zoom = 1
                }
            }
        }
        if (n.overflow) {
            h.overflow = "hidden";
            if (!v.support.shrinkWrapBlocks) {
                c.done(function() {
                    h.overflow = n.overflow[0];
                    h.overflowX = n.overflow[1];
                    h.overflowY = n.overflow[2]
                })
            }
        }
        for (r in t) {
            s = t[r];
            if (Un.exec(s)) {
                delete t[r];
                if (s === (m ? "hide" : "show")) {
                    continue
                }
                d.push(r)
            }
        }
        o = d.length;
        if (o) {
            u = v._data(e, "fxshow") || v._data(e, "fxshow", {});
            if (m) {
                v(e).show()
            } else {
                c.done(function() {
                    v(e).hide()
                })
            }
            c.done(function() {
                var t;
                v.removeData(e, "fxshow", true);
                for (t in p) {
                    v.style(e, t, p[t])
                }
            });
            for (r = 0; r < o; r++) {
                i = d[r];
                a = c.createTween(i, m ? u[i] : 0);
                p[i] = u[i] || v.style(e, i);
                if (!(i in u)) {
                    u[i] = a.start;
                    if (m) {
                        a.end = a.start;
                        a.start = i === "width" || i === "height" ? 1 : 0
                    }
                }
            }
        }
    }

    function Yn(e, t, n, r, i) {
        return new Yn.prototype.init(e, t, n, r, i)
    }

    function Zn(e, t) {
        var n, r = {
                height: e
            }, i = 0;
        t = t ? 1 : 0;
        for (; i < 4; i += 2 - t) {
            n = $t[i];
            r["margin" + n] = r["padding" + n] = e
        }
        if (t) {
            r.opacity = r.width = e
        }
        return r
    }

    function tr(e) {
        return v.isWindow(e) ? e : e.nodeType === 9 ? e.defaultView || e.parentWindow : false
    }
    var n, r, i = e.document,
        s = e.location,
        o = e.navigator,
        u = e.jQuery,
        a = e.$,
        f = Array.prototype.push,
        l = Array.prototype.slice,
        c = Array.prototype.indexOf,
        h = Object.prototype.toString,
        p = Object.prototype.hasOwnProperty,
        d = String.prototype.trim,
        v = function(e, t) {
            return new v.fn.init(e, t, n)
        }, m = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
        g = /\S/,
        y = /\s+/,
        b = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        w = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
        E = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        S = /^[\],:{}\s]*$/,
        x = /(?:^|:|,)(?:\s*\[)+/g,
        T = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        N = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
        C = /^-ms-/,
        k = /-([\da-z])/gi,
        L = function(e, t) {
            return (t + "").toUpperCase()
        }, A = function() {
            if (i.addEventListener) {
                i.removeEventListener("DOMContentLoaded", A, false);
                v.ready()
            } else if (i.readyState === "complete") {
                i.detachEvent("onreadystatechange", A);
                v.ready()
            }
        }, O = {};
    v.fn = v.prototype = {
        constructor: v,
        init: function(e, n, r) {
            var s, o, u, a;
            if (!e) {
                return this
            }
            if (e.nodeType) {
                this.context = this[0] = e;
                this.length = 1;
                return this
            }
            if (typeof e === "string") {
                if (e.charAt(0) === "<" && e.charAt(e.length - 1) === ">" && e.length >= 3) {
                    s = [null, e, null]
                } else {
                    s = w.exec(e)
                } if (s && (s[1] || !n)) {
                    if (s[1]) {
                        n = n instanceof v ? n[0] : n;
                        a = n && n.nodeType ? n.ownerDocument || n : i;
                        e = v.parseHTML(s[1], a, true);
                        if (E.test(s[1]) && v.isPlainObject(n)) {
                            this.attr.call(e, n, true)
                        }
                        return v.merge(this, e)
                    } else {
                        o = i.getElementById(s[2]);
                        if (o && o.parentNode) {
                            if (o.id !== s[2]) {
                                return r.find(e)
                            }
                            this.length = 1;
                            this[0] = o
                        }
                        this.context = i;
                        this.selector = e;
                        return this
                    }
                } else if (!n || n.jquery) {
                    return (n || r).find(e)
                } else {
                    return this.constructor(n).find(e)
                }
            } else if (v.isFunction(e)) {
                return r.ready(e)
            }
            if (e.selector !== t) {
                this.selector = e.selector;
                this.context = e.context
            }
            return v.makeArray(e, this)
        },
        selector: "",
        jquery: "1.8.2",
        length: 0,
        size: function() {
            return this.length
        },
        toArray: function() {
            return l.call(this)
        },
        get: function(e) {
            return e == null ? this.toArray() : e < 0 ? this[this.length + e] : this[e]
        },
        pushStack: function(e, t, n) {
            var r = v.merge(this.constructor(), e);
            r.prevObject = this;
            r.context = this.context;
            if (t === "find") {
                r.selector = this.selector + (this.selector ? " " : "") + n
            } else if (t) {
                r.selector = this.selector + "." + t + "(" + n + ")"
            }
            return r
        },
        each: function(e, t) {
            return v.each(this, e, t)
        },
        ready: function(e) {
            v.ready.promise().done(e);
            return this
        },
        eq: function(e) {
            e = +e;
            return e === -1 ? this.slice(e) : this.slice(e, e + 1)
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        slice: function() {
            return this.pushStack(l.apply(this, arguments), "slice", l.call(arguments).join(","))
        },
        map: function(e) {
            return this.pushStack(v.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: f,
        sort: [].sort,
        splice: [].splice
    };
    v.fn.init.prototype = v.fn;
    v.extend = v.fn.extend = function() {
        var e, n, r, i, s, o, u = arguments[0] || {}, a = 1,
            f = arguments.length,
            l = false;
        if (typeof u === "boolean") {
            l = u;
            u = arguments[1] || {};
            a = 2
        }
        if (typeof u !== "object" && !v.isFunction(u)) {
            u = {}
        }
        if (f === a) {
            u = this;
            --a
        }
        for (; a < f; a++) {
            if ((e = arguments[a]) != null) {
                for (n in e) {
                    r = u[n];
                    i = e[n];
                    if (u === i) {
                        continue
                    }
                    if (l && i && (v.isPlainObject(i) || (s = v.isArray(i)))) {
                        if (s) {
                            s = false;
                            o = r && v.isArray(r) ? r : []
                        } else {
                            o = r && v.isPlainObject(r) ? r : {}
                        }
                        u[n] = v.extend(l, o, i)
                    } else if (i !== t) {
                        u[n] = i
                    }
                }
            }
        }
        return u
    };
    v.extend({
        noConflict: function(t) {
            if (e.$ === v) {
                e.$ = a
            }
            if (t && e.jQuery === v) {
                e.jQuery = u
            }
            return v
        },
        isReady: false,
        readyWait: 1,
        holdReady: function(e) {
            if (e) {
                v.readyWait++
            } else {
                v.ready(true)
            }
        },
        ready: function(e) {
            if (e === true ? --v.readyWait : v.isReady) {
                return
            }
            if (!i.body) {
                return setTimeout(v.ready, 1)
            }
            v.isReady = true;
            if (e !== true && --v.readyWait > 0) {
                return
            }
            r.resolveWith(i, [v]);
            if (v.fn.trigger) {
                v(i).trigger("ready").off("ready")
            }
        },
        isFunction: function(e) {
            return v.type(e) === "function"
        },
        isArray: Array.isArray || function(e) {
            return v.type(e) === "array"
        },
        isWindow: function(e) {
            return e != null && e == e.window
        },
        isNumeric: function(e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        },
        type: function(e) {
            return e == null ? String(e) : O[h.call(e)] || "object"
        },
        isPlainObject: function(e) {
            if (!e || v.type(e) !== "object" || e.nodeType || v.isWindow(e)) {
                return false
            }
            try {
                if (e.constructor && !p.call(e, "constructor") && !p.call(e.constructor.prototype, "isPrototypeOf")) {
                    return false
                }
            } catch (n) {
                return false
            }
            var r;
            for (r in e) {}
            return r === t || p.call(e, r)
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) {
                return false
            }
            return true
        },
        error: function(e) {
            throw new Error(e)
        },
        parseHTML: function(e, t, n) {
            var r;
            if (!e || typeof e !== "string") {
                return null
            }
            if (typeof t === "boolean") {
                n = t;
                t = 0
            }
            t = t || i;
            if (r = E.exec(e)) {
                return [t.createElement(r[1])]
            }
            r = v.buildFragment([e], t, n ? null : []);
            return v.merge([], (r.cacheable ? v.clone(r.fragment) : r.fragment).childNodes)
        },
        parseJSON: function(t) {
            if (!t || typeof t !== "string") {
                return null
            }
            t = v.trim(t);
            if (e.JSON && e.JSON.parse) {
                return e.JSON.parse(t)
            }
            if (S.test(t.replace(T, "@").replace(N, "]").replace(x, ""))) {
                return (new Function("return " + t))()
            }
            v.error("Invalid JSON: " + t)
        },
        parseXML: function(n) {
            var r, i;
            if (!n || typeof n !== "string") {
                return null
            }
            try {
                if (e.DOMParser) {
                    i = new DOMParser;
                    r = i.parseFromString(n, "text/xml")
                } else {
                    r = new ActiveXObject("Microsoft.XMLDOM");
                    r.async = "false";
                    r.loadXML(n)
                }
            } catch (s) {
                r = t
            }
            if (!r || !r.documentElement || r.getElementsByTagName("parsererror").length) {
                v.error("Invalid XML: " + n)
            }
            return r
        },
        noop: function() {},
        globalEval: function(t) {
            if (t && g.test(t)) {
                (e.execScript || function(t) {
                    e["eval"].call(e, t)
                })(t)
            }
        },
        camelCase: function(e) {
            return e.replace(C, "ms-").replace(k, L)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, n, r) {
            var i, s = 0,
                o = e.length,
                u = o === t || v.isFunction(e);
            if (r) {
                if (u) {
                    for (i in e) {
                        if (n.apply(e[i], r) === false) {
                            break
                        }
                    }
                } else {
                    for (; s < o;) {
                        if (n.apply(e[s++], r) === false) {
                            break
                        }
                    }
                }
            } else {
                if (u) {
                    for (i in e) {
                        if (n.call(e[i], i, e[i]) === false) {
                            break
                        }
                    }
                } else {
                    for (; s < o;) {
                        if (n.call(e[s], s, e[s++]) === false) {
                            break
                        }
                    }
                }
            }
            return e
        },
        trim: d && !d.call("﻿ ") ? function(e) {
            return e == null ? "" : d.call(e)
        } : function(e) {
            return e == null ? "" : (e + "").replace(b, "")
        },
        makeArray: function(e, t) {
            var n, r = t || [];
            if (e != null) {
                n = v.type(e);
                if (e.length == null || n === "string" || n === "function" || n === "regexp" || v.isWindow(e)) {
                    f.call(r, e)
                } else {
                    v.merge(r, e)
                }
            }
            return r
        },
        inArray: function(e, t, n) {
            var r;
            if (t) {
                if (c) {
                    return c.call(t, e, n)
                }
                r = t.length;
                n = n ? n < 0 ? Math.max(0, r + n) : n : 0;
                for (; n < r; n++) {
                    if (n in t && t[n] === e) {
                        return n
                    }
                }
            }
            return -1
        },
        merge: function(e, n) {
            var r = n.length,
                i = e.length,
                s = 0;
            if (typeof r === "number") {
                for (; s < r; s++) {
                    e[i++] = n[s]
                }
            } else {
                while (n[s] !== t) {
                    e[i++] = n[s++]
                }
            }
            e.length = i;
            return e
        },
        grep: function(e, t, n) {
            var r, i = [],
                s = 0,
                o = e.length;
            n = !! n;
            for (; s < o; s++) {
                r = !! t(e[s], s);
                if (n !== r) {
                    i.push(e[s])
                }
            }
            return i
        },
        map: function(e, n, r) {
            var i, s, o = [],
                u = 0,
                a = e.length,
                f = e instanceof v || a !== t && typeof a === "number" && (a > 0 && e[0] && e[a - 1] || a === 0 || v.isArray(e));
            if (f) {
                for (; u < a; u++) {
                    i = n(e[u], u, r);
                    if (i != null) {
                        o[o.length] = i
                    }
                }
            } else {
                for (s in e) {
                    i = n(e[s], s, r);
                    if (i != null) {
                        o[o.length] = i
                    }
                }
            }
            return o.concat.apply([], o)
        },
        guid: 1,
        proxy: function(e, n) {
            var r, i, s;
            if (typeof n === "string") {
                r = e[n];
                n = e;
                e = r
            }
            if (!v.isFunction(e)) {
                return t
            }
            i = l.call(arguments, 2);
            s = function() {
                return e.apply(n, i.concat(l.call(arguments)))
            };
            s.guid = e.guid = e.guid || v.guid++;
            return s
        },
        access: function(e, n, r, i, s, o, u) {
            var a, f = r == null,
                l = 0,
                c = e.length;
            if (r && typeof r === "object") {
                for (l in r) {
                    v.access(e, n, l, r[l], 1, o, i)
                }
                s = 1
            } else if (i !== t) {
                a = u === t && v.isFunction(i);
                if (f) {
                    if (a) {
                        a = n;
                        n = function(e, t, n) {
                            return a.call(v(e), n)
                        }
                    } else {
                        n.call(e, i);
                        n = null
                    }
                }
                if (n) {
                    for (; l < c; l++) {
                        n(e[l], r, a ? i.call(e[l], l, n(e[l], r)) : i, u)
                    }
                }
                s = 1
            }
            return s ? e : f ? n.call(e) : c ? n(e[0], r) : o
        },
        now: function() {
            return (new Date).getTime()
        }
    });
    v.ready.promise = function(t) {
        if (!r) {
            r = v.Deferred();
            if (i.readyState === "complete") {
                setTimeout(v.ready, 1)
            } else if (i.addEventListener) {
                i.addEventListener("DOMContentLoaded", A, false);
                e.addEventListener("load", v.ready, false)
            } else {
                i.attachEvent("onreadystatechange", A);
                e.attachEvent("onload", v.ready);
                var n = false;
                try {
                    n = e.frameElement == null && i.documentElement
                } catch (s) {}
                if (n && n.doScroll) {
                    (function o() {
                        if (!v.isReady) {
                            try {
                                n.doScroll("left")
                            } catch (e) {
                                return setTimeout(o, 50)
                            }
                            v.ready()
                        }
                    })()
                }
            }
        }
        return r.promise(t)
    };
    v.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(e, t) {
        O["[object " + t + "]"] = t.toLowerCase()
    });
    n = v(i);
    var M = {};
    v.Callbacks = function(e) {
        e = typeof e === "string" ? M[e] || _(e) : v.extend({}, e);
        var n, r, i, s, o, u, a = [],
            f = !e.once && [],
            l = function(t) {
                n = e.memory && t;
                r = true;
                u = s || 0;
                s = 0;
                o = a.length;
                i = true;
                for (; a && u < o; u++) {
                    if (a[u].apply(t[0], t[1]) === false && e.stopOnFalse) {
                        n = false;
                        break
                    }
                }
                i = false;
                if (a) {
                    if (f) {
                        if (f.length) {
                            l(f.shift())
                        }
                    } else if (n) {
                        a = []
                    } else {
                        c.disable()
                    }
                }
            }, c = {
                add: function() {
                    if (a) {
                        var t = a.length;
                        (function r(t) {
                            v.each(t, function(t, n) {
                                var i = v.type(n);
                                if (i === "function" && (!e.unique || !c.has(n))) {
                                    a.push(n)
                                } else if (n && n.length && i !== "string") {
                                    r(n)
                                }
                            })
                        })(arguments);
                        if (i) {
                            o = a.length
                        } else if (n) {
                            s = t;
                            l(n)
                        }
                    }
                    return this
                },
                remove: function() {
                    if (a) {
                        v.each(arguments, function(e, t) {
                            var n;
                            while ((n = v.inArray(t, a, n)) > -1) {
                                a.splice(n, 1);
                                if (i) {
                                    if (n <= o) {
                                        o--
                                    }
                                    if (n <= u) {
                                        u--
                                    }
                                }
                            }
                        })
                    }
                    return this
                },
                has: function(e) {
                    return v.inArray(e, a) > -1
                },
                empty: function() {
                    a = [];
                    return this
                },
                disable: function() {
                    a = f = n = t;
                    return this
                },
                disabled: function() {
                    return !a
                },
                lock: function() {
                    f = t;
                    if (!n) {
                        c.disable()
                    }
                    return this
                },
                locked: function() {
                    return !f
                },
                fireWith: function(e, t) {
                    t = t || [];
                    t = [e, t.slice ? t.slice() : t];
                    if (a && (!r || f)) {
                        if (i) {
                            f.push(t)
                        } else {
                            l(t)
                        }
                    }
                    return this
                },
                fire: function() {
                    c.fireWith(this, arguments);
                    return this
                },
                fired: function() {
                    return !!r
                }
            };
        return c
    };
    v.extend({
        Deferred: function(e) {
            var t = [
                ["resolve", "done", v.Callbacks("once memory"), "resolved"],
                ["reject", "fail", v.Callbacks("once memory"), "rejected"],
                ["notify", "progress", v.Callbacks("memory")]
            ],
                n = "pending",
                r = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        i.done(arguments).fail(arguments);
                        return this
                    },
                    then: function() {
                        var e = arguments;
                        return v.Deferred(function(n) {
                            v.each(t, function(t, r) {
                                var s = r[0],
                                    o = e[t];
                                i[r[1]](v.isFunction(o) ? function() {
                                    var e = o.apply(this, arguments);
                                    if (e && v.isFunction(e.promise)) {
                                        e.promise().done(n.resolve).fail(n.reject).progress(n.notify)
                                    } else {
                                        n[s + "With"](this === i ? n : this, [e])
                                    }
                                } : n[s])
                            });
                            e = null
                        }).promise()
                    },
                    promise: function(e) {
                        return e != null ? v.extend(e, r) : r
                    }
                }, i = {};
            r.pipe = r.then;
            v.each(t, function(e, s) {
                var o = s[2],
                    u = s[3];
                r[s[1]] = o.add;
                if (u) {
                    o.add(function() {
                        n = u
                    }, t[e ^ 1][2].disable, t[2][2].lock)
                }
                i[s[0]] = o.fire;
                i[s[0] + "With"] = o.fireWith
            });
            r.promise(i);
            if (e) {
                e.call(i, i)
            }
            return i
        },
        when: function(e) {
            var t = 0,
                n = l.call(arguments),
                r = n.length,
                i = r !== 1 || e && v.isFunction(e.promise) ? r : 0,
                s = i === 1 ? e : v.Deferred(),
                o = function(e, t, n) {
                    return function(r) {
                        t[e] = this;
                        n[e] = arguments.length > 1 ? l.call(arguments) : r;
                        if (n === u) {
                            s.notifyWith(t, n)
                        } else if (!--i) {
                            s.resolveWith(t, n)
                        }
                    }
                }, u, a, f;
            if (r > 1) {
                u = new Array(r);
                a = new Array(r);
                f = new Array(r);
                for (; t < r; t++) {
                    if (n[t] && v.isFunction(n[t].promise)) {
                        n[t].promise().done(o(t, f, n)).fail(s.reject).progress(o(t, a, u))
                    } else {
                        --i
                    }
                }
            }
            if (!i) {
                s.resolveWith(f, n)
            }
            return s.promise()
        }
    });
    v.support = function() {
        var t, n, r, s, o, u, a, f, l, c, h, p = i.createElement("div");
        p.setAttribute("className", "t");
        p.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        n = p.getElementsByTagName("*");
        r = p.getElementsByTagName("a")[0];
        r.style.cssText = "top:1px;float:left;opacity:.5";
        if (!n || !n.length) {
            return {}
        }
        s = i.createElement("select");
        o = s.appendChild(i.createElement("option"));
        u = p.getElementsByTagName("input")[0];
        t = {
            leadingWhitespace: p.firstChild.nodeType === 3,
            tbody: !p.getElementsByTagName("tbody").length,
            htmlSerialize: !! p.getElementsByTagName("link").length,
            style: /top/.test(r.getAttribute("style")),
            hrefNormalized: r.getAttribute("href") === "/a",
            opacity: /^0.5/.test(r.style.opacity),
            cssFloat: !! r.style.cssFloat,
            checkOn: u.value === "on",
            optSelected: o.selected,
            getSetAttribute: p.className !== "t",
            enctype: !! i.createElement("form").enctype,
            html5Clone: i.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>",
            boxModel: i.compatMode === "CSS1Compat",
            submitBubbles: true,
            changeBubbles: true,
            focusinBubbles: false,
            deleteExpando: true,
            noCloneEvent: true,
            inlineBlockNeedsLayout: false,
            shrinkWrapBlocks: false,
            reliableMarginRight: true,
            boxSizingReliable: true,
            pixelPosition: false
        };
        u.checked = true;
        t.noCloneChecked = u.cloneNode(true).checked;
        s.disabled = true;
        t.optDisabled = !o.disabled;
        try {
            delete p.test
        } catch (d) {
            t.deleteExpando = false
        }
        if (!p.addEventListener && p.attachEvent && p.fireEvent) {
            p.attachEvent("onclick", h = function() {
                t.noCloneEvent = false
            });
            p.cloneNode(true).fireEvent("onclick");
            p.detachEvent("onclick", h)
        }
        u = i.createElement("input");
        u.value = "t";
        u.setAttribute("type", "radio");
        t.radioValue = u.value === "t";
        u.setAttribute("checked", "checked");
        u.setAttribute("name", "t");
        p.appendChild(u);
        a = i.createDocumentFragment();
        a.appendChild(p.lastChild);
        t.checkClone = a.cloneNode(true).cloneNode(true).lastChild.checked;
        t.appendChecked = u.checked;
        a.removeChild(u);
        a.appendChild(p);
        if (p.attachEvent) {
            for (l in {
                submit: true,
                change: true,
                focusin: true
            }) {
                f = "on" + l;
                c = f in p;
                if (!c) {
                    p.setAttribute(f, "return;");
                    c = typeof p[f] === "function"
                }
                t[l + "Bubbles"] = c
            }
        }
        v(function() {
            var n, r, s, o, u = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
                a = i.getElementsByTagName("body")[0];
            if (!a) {
                return
            }
            n = i.createElement("div");
            n.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px";
            a.insertBefore(n, a.firstChild);
            r = i.createElement("div");
            n.appendChild(r);
            r.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
            s = r.getElementsByTagName("td");
            s[0].style.cssText = "padding:0;margin:0;border:0;display:none";
            c = s[0].offsetHeight === 0;
            s[0].style.display = "";
            s[1].style.display = "none";
            t.reliableHiddenOffsets = c && s[0].offsetHeight === 0;
            r.innerHTML = "";
            r.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
            t.boxSizing = r.offsetWidth === 4;
            t.doesNotIncludeMarginInBodyOffset = a.offsetTop !== 1;
            if (e.getComputedStyle) {
                t.pixelPosition = (e.getComputedStyle(r, null) || {}).top !== "1%";
                t.boxSizingReliable = (e.getComputedStyle(r, null) || {
                    width: "4px"
                }).width === "4px";
                o = i.createElement("div");
                o.style.cssText = r.style.cssText = u;
                o.style.marginRight = o.style.width = "0";
                r.style.width = "1px";
                r.appendChild(o);
                t.reliableMarginRight = !parseFloat((e.getComputedStyle(o, null) || {}).marginRight)
            }
            if (typeof r.style.zoom !== "undefined") {
                r.innerHTML = "";
                r.style.cssText = u + "width:1px;padding:1px;display:inline;zoom:1";
                t.inlineBlockNeedsLayout = r.offsetWidth === 3;
                r.style.display = "block";
                r.style.overflow = "visible";
                r.innerHTML = "<div></div>";
                r.firstChild.style.width = "5px";
                t.shrinkWrapBlocks = r.offsetWidth !== 3;
                n.style.zoom = 1
            }
            a.removeChild(n);
            n = r = s = o = null
        });
        a.removeChild(p);
        n = r = s = o = u = a = p = null;
        return t
    }();
    var D = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        P = /([A-Z])/g;
    v.extend({
        cache: {},
        deletedIds: [],
        uuid: 0,
        expando: "jQuery" + (v.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: true,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: true
        },
        hasData: function(e) {
            e = e.nodeType ? v.cache[e[v.expando]] : e[v.expando];
            return !!e && !B(e)
        },
        data: function(e, n, r, i) {
            if (!v.acceptData(e)) {
                return
            }
            var s, o, u = v.expando,
                a = typeof n === "string",
                f = e.nodeType,
                l = f ? v.cache : e,
                c = f ? e[u] : e[u] && u;
            if ((!c || !l[c] || !i && !l[c].data) && a && r === t) {
                return
            }
            if (!c) {
                if (f) {
                    e[u] = c = v.deletedIds.pop() || v.guid++
                } else {
                    c = u
                }
            }
            if (!l[c]) {
                l[c] = {};
                if (!f) {
                    l[c].toJSON = v.noop
                }
            }
            if (typeof n === "object" || typeof n === "function") {
                if (i) {
                    l[c] = v.extend(l[c], n)
                } else {
                    l[c].data = v.extend(l[c].data, n)
                }
            }
            s = l[c];
            if (!i) {
                if (!s.data) {
                    s.data = {}
                }
                s = s.data
            }
            if (r !== t) {
                s[v.camelCase(n)] = r
            }
            if (a) {
                o = s[n];
                if (o == null) {
                    o = s[v.camelCase(n)]
                }
            } else {
                o = s
            }
            return o
        },
        removeData: function(e, t, n) {
            if (!v.acceptData(e)) {
                return
            }
            var r, i, s, o = e.nodeType,
                u = o ? v.cache : e,
                a = o ? e[v.expando] : v.expando;
            if (!u[a]) {
                return
            }
            if (t) {
                r = n ? u[a] : u[a].data;
                if (r) {
                    if (!v.isArray(t)) {
                        if (t in r) {
                            t = [t]
                        } else {
                            t = v.camelCase(t);
                            if (t in r) {
                                t = [t]
                            } else {
                                t = t.split(" ")
                            }
                        }
                    }
                    for (i = 0, s = t.length; i < s; i++) {
                        delete r[t[i]]
                    }
                    if (!(n ? B : v.isEmptyObject)(r)) {
                        return
                    }
                }
            }
            if (!n) {
                delete u[a].data;
                if (!B(u[a])) {
                    return
                }
            }
            if (o) {
                v.cleanData([e], true)
            } else if (v.support.deleteExpando || u != u.window) {
                delete u[a]
            } else {
                u[a] = null
            }
        },
        _data: function(e, t, n) {
            return v.data(e, t, n, true)
        },
        acceptData: function(e) {
            var t = e.nodeName && v.noData[e.nodeName.toLowerCase()];
            return !t || t !== true && e.getAttribute("classid") === t
        }
    });
    v.fn.extend({
        data: function(e, n) {
            var r, i, s, o, u, a = this[0],
                f = 0,
                l = null;
            if (e === t) {
                if (this.length) {
                    l = v.data(a);
                    if (a.nodeType === 1 && !v._data(a, "parsedAttrs")) {
                        s = a.attributes;
                        for (u = s.length; f < u; f++) {
                            o = s[f].name;
                            if (!o.indexOf("data-")) {
                                o = v.camelCase(o.substring(5));
                                H(a, o, l[o])
                            }
                        }
                        v._data(a, "parsedAttrs", true)
                    }
                }
                return l
            }
            if (typeof e === "object") {
                return this.each(function() {
                    v.data(this, e)
                })
            }
            r = e.split(".", 2);
            r[1] = r[1] ? "." + r[1] : "";
            i = r[1] + "!";
            return v.access(this, function(n) {
                if (n === t) {
                    l = this.triggerHandler("getData" + i, [r[0]]);
                    if (l === t && a) {
                        l = v.data(a, e);
                        l = H(a, e, l)
                    }
                    return l === t && r[1] ? this.data(r[0]) : l
                }
                r[1] = n;
                this.each(function() {
                    var t = v(this);
                    t.triggerHandler("setData" + i, r);
                    v.data(this, e, n);
                    t.triggerHandler("changeData" + i, r)
                })
            }, null, n, arguments.length > 1, null, false)
        },
        removeData: function(e) {
            return this.each(function() {
                v.removeData(this, e)
            })
        }
    });
    v.extend({
        queue: function(e, t, n) {
            var r;
            if (e) {
                t = (t || "fx") + "queue";
                r = v._data(e, t);
                if (n) {
                    if (!r || v.isArray(n)) {
                        r = v._data(e, t, v.makeArray(n))
                    } else {
                        r.push(n)
                    }
                }
                return r || []
            }
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = v.queue(e, t),
                r = n.length,
                i = n.shift(),
                s = v._queueHooks(e, t),
                o = function() {
                    v.dequeue(e, t)
                };
            if (i === "inprogress") {
                i = n.shift();
                r--
            }
            if (i) {
                if (t === "fx") {
                    n.unshift("inprogress")
                }
                delete s.stop;
                i.call(e, o, s)
            }
            if (!r && s) {
                s.empty.fire()
            }
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return v._data(e, n) || v._data(e, n, {
                empty: v.Callbacks("once memory").add(function() {
                    v.removeData(e, t + "queue", true);
                    v.removeData(e, n, true)
                })
            })
        }
    });
    v.fn.extend({
        queue: function(e, n) {
            var r = 2;
            if (typeof e !== "string") {
                n = e;
                e = "fx";
                r--
            }
            if (arguments.length < r) {
                return v.queue(this[0], e)
            }
            return n === t ? this : this.each(function() {
                var t = v.queue(this, e, n);
                v._queueHooks(this, e);
                if (e === "fx" && t[0] !== "inprogress") {
                    v.dequeue(this, e)
                }
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                v.dequeue(this, e)
            })
        },
        delay: function(e, t) {
            e = v.fx ? v.fx.speeds[e] || e : e;
            t = t || "fx";
            return this.queue(t, function(t, n) {
                var r = setTimeout(t, e);
                n.stop = function() {
                    clearTimeout(r)
                }
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, n) {
            var r, i = 1,
                s = v.Deferred(),
                o = this,
                u = this.length,
                a = function() {
                    if (!--i) {
                        s.resolveWith(o, [o])
                    }
                };
            if (typeof e !== "string") {
                n = e;
                e = t
            }
            e = e || "fx";
            while (u--) {
                r = v._data(o[u], e + "queueHooks");
                if (r && r.empty) {
                    i++;
                    r.empty.add(a)
                }
            }
            a();
            return s.promise(n)
        }
    });
    var j, F, I, q = /[\t\r\n]/g,
        R = /\r/g,
        U = /^(?:button|input)$/i,
        z = /^(?:button|input|object|select|textarea)$/i,
        W = /^a(?:rea|)$/i,
        X = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        V = v.support.getSetAttribute;
    v.fn.extend({
        attr: function(e, t) {
            return v.access(this, v.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                v.removeAttr(this, e)
            })
        },
        prop: function(e, t) {
            return v.access(this, v.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            e = v.propFix[e] || e;
            return this.each(function() {
                try {
                    this[e] = t;
                    delete this[e]
                } catch (n) {}
            })
        },
        addClass: function(e) {
            var t, n, r, i, s, o, u;
            if (v.isFunction(e)) {
                return this.each(function(t) {
                    v(this).addClass(e.call(this, t, this.className))
                })
            }
            if (e && typeof e === "string") {
                t = e.split(y);
                for (n = 0, r = this.length; n < r; n++) {
                    i = this[n];
                    if (i.nodeType === 1) {
                        if (!i.className && t.length === 1) {
                            i.className = e
                        } else {
                            s = " " + i.className + " ";
                            for (o = 0, u = t.length; o < u; o++) {
                                if (s.indexOf(" " + t[o] + " ") < 0) {
                                    s += t[o] + " "
                                }
                            }
                            i.className = v.trim(s)
                        }
                    }
                }
            }
            return this
        },
        removeClass: function(e) {
            var n, r, i, s, o, u, a;
            if (v.isFunction(e)) {
                return this.each(function(t) {
                    v(this).removeClass(e.call(this, t, this.className))
                })
            }
            if (e && typeof e === "string" || e === t) {
                n = (e || "").split(y);
                for (u = 0, a = this.length; u < a; u++) {
                    i = this[u];
                    if (i.nodeType === 1 && i.className) {
                        r = (" " + i.className + " ").replace(q, " ");
                        for (s = 0, o = n.length; s < o; s++) {
                            while (r.indexOf(" " + n[s] + " ") >= 0) {
                                r = r.replace(" " + n[s] + " ", " ")
                            }
                        }
                        i.className = e ? v.trim(r) : ""
                    }
                }
            }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e,
                r = typeof t === "boolean";
            if (v.isFunction(e)) {
                return this.each(function(n) {
                    v(this).toggleClass(e.call(this, n, this.className, t), t)
                })
            }
            return this.each(function() {
                if (n === "string") {
                    var i, s = 0,
                        o = v(this),
                        u = t,
                        a = e.split(y);
                    while (i = a[s++]) {
                        u = r ? u : !o.hasClass(i);
                        o[u ? "addClass" : "removeClass"](i)
                    }
                } else if (n === "undefined" || n === "boolean") {
                    if (this.className) {
                        v._data(this, "__className__", this.className)
                    }
                    this.className = this.className || e === false ? "" : v._data(this, "__className__") || ""
                }
            })
        },
        hasClass: function(e) {
            var t = " " + e + " ",
                n = 0,
                r = this.length;
            for (; n < r; n++) {
                if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(q, " ").indexOf(t) >= 0) {
                    return true
                }
            }
            return false
        },
        val: function(e) {
            var n, r, i, s = this[0];
            if (!arguments.length) {
                if (s) {
                    n = v.valHooks[s.type] || v.valHooks[s.nodeName.toLowerCase()];
                    if (n && "get" in n && (r = n.get(s, "value")) !== t) {
                        return r
                    }
                    r = s.value;
                    return typeof r === "string" ? r.replace(R, "") : r == null ? "" : r
                }
                return
            }
            i = v.isFunction(e);
            return this.each(function(r) {
                var s, o = v(this);
                if (this.nodeType !== 1) {
                    return
                }
                if (i) {
                    s = e.call(this, r, o.val())
                } else {
                    s = e
                } if (s == null) {
                    s = ""
                } else if (typeof s === "number") {
                    s += ""
                } else if (v.isArray(s)) {
                    s = v.map(s, function(e) {
                        return e == null ? "" : e + ""
                    })
                }
                n = v.valHooks[this.type] || v.valHooks[this.nodeName.toLowerCase()];
                if (!n || !("set" in n) || n.set(this, s, "value") === t) {
                    this.value = s
                }
            })
        }
    });
    v.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = e.attributes.value;
                    return !t || t.specified ? e.value : e.text
                }
            },
            select: {
                get: function(e) {
                    var t, n, r, i, s = e.selectedIndex,
                        o = [],
                        u = e.options,
                        a = e.type === "select-one";
                    if (s < 0) {
                        return null
                    }
                    n = a ? s : 0;
                    r = a ? s + 1 : u.length;
                    for (; n < r; n++) {
                        i = u[n];
                        if (i.selected && (v.support.optDisabled ? !i.disabled : i.getAttribute("disabled") === null) && (!i.parentNode.disabled || !v.nodeName(i.parentNode, "optgroup"))) {
                            t = v(i).val();
                            if (a) {
                                return t
                            }
                            o.push(t)
                        }
                    }
                    if (a && !o.length && u.length) {
                        return v(u[s]).val()
                    }
                    return o
                },
                set: function(e, t) {
                    var n = v.makeArray(t);
                    v(e).find("option").each(function() {
                        this.selected = v.inArray(v(this).val(), n) >= 0
                    });
                    if (!n.length) {
                        e.selectedIndex = -1
                    }
                    return n
                }
            }
        },
        attrFn: {},
        attr: function(e, n, r, i) {
            var s, o, u, a = e.nodeType;
            if (!e || a === 3 || a === 8 || a === 2) {
                return
            }
            if (i && v.isFunction(v.fn[n])) {
                return v(e)[n](r)
            }
            if (typeof e.getAttribute === "undefined") {
                return v.prop(e, n, r)
            }
            u = a !== 1 || !v.isXMLDoc(e);
            if (u) {
                n = n.toLowerCase();
                o = v.attrHooks[n] || (X.test(n) ? F : j)
            }
            if (r !== t) {
                if (r === null) {
                    v.removeAttr(e, n);
                    return
                } else if (o && "set" in o && u && (s = o.set(e, r, n)) !== t) {
                    return s
                } else {
                    e.setAttribute(n, r + "");
                    return r
                }
            } else if (o && "get" in o && u && (s = o.get(e, n)) !== null) {
                return s
            } else {
                s = e.getAttribute(n);
                return s === null ? t : s
            }
        },
        removeAttr: function(e, t) {
            var n, r, i, s, o = 0;
            if (t && e.nodeType === 1) {
                r = t.split(y);
                for (; o < r.length; o++) {
                    i = r[o];
                    if (i) {
                        n = v.propFix[i] || i;
                        s = X.test(i);
                        if (!s) {
                            v.attr(e, i, "")
                        }
                        e.removeAttribute(V ? i : n);
                        if (s && n in e) {
                            e[n] = false
                        }
                    }
                }
            }
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (U.test(e.nodeName) && e.parentNode) {
                        v.error("type property can't be changed")
                    } else if (!v.support.radioValue && t === "radio" && v.nodeName(e, "input")) {
                        var n = e.value;
                        e.setAttribute("type", t);
                        if (n) {
                            e.value = n
                        }
                        return t
                    }
                }
            },
            value: {
                get: function(e, t) {
                    if (j && v.nodeName(e, "button")) {
                        return j.get(e, t)
                    }
                    return t in e ? e.value : null
                },
                set: function(e, t, n) {
                    if (j && v.nodeName(e, "button")) {
                        return j.set(e, t, n)
                    }
                    e.value = t
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(e, n, r) {
            var i, s, o, u = e.nodeType;
            if (!e || u === 3 || u === 8 || u === 2) {
                return
            }
            o = u !== 1 || !v.isXMLDoc(e);
            if (o) {
                n = v.propFix[n] || n;
                s = v.propHooks[n]
            }
            if (r !== t) {
                if (s && "set" in s && (i = s.set(e, r, n)) !== t) {
                    return i
                } else {
                    return e[n] = r
                }
            } else {
                if (s && "get" in s && (i = s.get(e, n)) !== null) {
                    return i
                } else {
                    return e[n]
                }
            }
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var n = e.getAttributeNode("tabindex");
                    return n && n.specified ? parseInt(n.value, 10) : z.test(e.nodeName) || W.test(e.nodeName) && e.href ? 0 : t
                }
            }
        }
    });
    F = {
        get: function(e, n) {
            var r, i = v.prop(e, n);
            return i === true || typeof i !== "boolean" && (r = e.getAttributeNode(n)) && r.nodeValue !== false ? n.toLowerCase() : t
        },
        set: function(e, t, n) {
            var r;
            if (t === false) {
                v.removeAttr(e, n)
            } else {
                r = v.propFix[n] || n;
                if (r in e) {
                    e[r] = true
                }
                e.setAttribute(n, n.toLowerCase())
            }
            return n
        }
    };
    if (!V) {
        I = {
            name: true,
            id: true,
            coords: true
        };
        j = v.valHooks.button = {
            get: function(e, n) {
                var r;
                r = e.getAttributeNode(n);
                return r && (I[n] ? r.value !== "" : r.specified) ? r.value : t
            },
            set: function(e, t, n) {
                var r = e.getAttributeNode(n);
                if (!r) {
                    r = i.createAttribute(n);
                    e.setAttributeNode(r)
                }
                return r.value = t + ""
            }
        };
        v.each(["width", "height"], function(e, t) {
            v.attrHooks[t] = v.extend(v.attrHooks[t], {
                set: function(e, n) {
                    if (n === "") {
                        e.setAttribute(t, "auto");
                        return n
                    }
                }
            })
        });
        v.attrHooks.contenteditable = {
            get: j.get,
            set: function(e, t, n) {
                if (t === "") {
                    t = "false"
                }
                j.set(e, t, n)
            }
        }
    }
    if (!v.support.hrefNormalized) {
        v.each(["href", "src", "width", "height"], function(e, n) {
            v.attrHooks[n] = v.extend(v.attrHooks[n], {
                get: function(e) {
                    var r = e.getAttribute(n, 2);
                    return r === null ? t : r
                }
            })
        })
    }
    if (!v.support.style) {
        v.attrHooks.style = {
            get: function(e) {
                return e.style.cssText.toLowerCase() || t
            },
            set: function(e, t) {
                return e.style.cssText = t + ""
            }
        }
    }
    if (!v.support.optSelected) {
        v.propHooks.selected = v.extend(v.propHooks.selected, {
            get: function(e) {
                var t = e.parentNode;
                if (t) {
                    t.selectedIndex;
                    if (t.parentNode) {
                        t.parentNode.selectedIndex
                    }
                }
                return null
            }
        })
    }
    if (!v.support.enctype) {
        v.propFix.enctype = "encoding"
    }
    if (!v.support.checkOn) {
        v.each(["radio", "checkbox"], function() {
            v.valHooks[this] = {
                get: function(e) {
                    return e.getAttribute("value") === null ? "on" : e.value
                }
            }
        })
    }
    v.each(["radio", "checkbox"], function() {
        v.valHooks[this] = v.extend(v.valHooks[this], {
            set: function(e, t) {
                if (v.isArray(t)) {
                    return e.checked = v.inArray(v(e).val(), t) >= 0
                }
            }
        })
    });
    var $ = /^(?:textarea|input|select)$/i,
        J = /^([^\.]*|)(?:\.(.+)|)$/,
        K = /(?:^|\s)hover(\.\S+|)\b/,
        Q = /^key/,
        G = /^(?:mouse|contextmenu)|click/,
        Y = /^(?:focusinfocus|focusoutblur)$/,
        Z = function(e) {
            return v.event.special.hover ? e : e.replace(K, "mouseenter$1 mouseleave$1")
        };
    v.event = {
        add: function(e, n, r, i, s) {
            var o, u, a, f, l, c, h, p, d, m, g;
            if (e.nodeType === 3 || e.nodeType === 8 || !n || !r || !(o = v._data(e))) {
                return
            }
            if (r.handler) {
                d = r;
                r = d.handler;
                s = d.selector
            }
            if (!r.guid) {
                r.guid = v.guid++
            }
            a = o.events;
            if (!a) {
                o.events = a = {}
            }
            u = o.handle;
            if (!u) {
                o.handle = u = function(e) {
                    return typeof v !== "undefined" && (!e || v.event.triggered !== e.type) ? v.event.dispatch.apply(u.elem, arguments) : t
                };
                u.elem = e
            }
            n = v.trim(Z(n)).split(" ");
            for (f = 0; f < n.length; f++) {
                l = J.exec(n[f]) || [];
                c = l[1];
                h = (l[2] || "").split(".").sort();
                g = v.event.special[c] || {};
                c = (s ? g.delegateType : g.bindType) || c;
                g = v.event.special[c] || {};
                p = v.extend({
                    type: c,
                    origType: l[1],
                    data: i,
                    handler: r,
                    guid: r.guid,
                    selector: s,
                    needsContext: s && v.expr.match.needsContext.test(s),
                    namespace: h.join(".")
                }, d);
                m = a[c];
                if (!m) {
                    m = a[c] = [];
                    m.delegateCount = 0;
                    if (!g.setup || g.setup.call(e, i, h, u) === false) {
                        if (e.addEventListener) {
                            e.addEventListener(c, u, false)
                        } else if (e.attachEvent) {
                            e.attachEvent("on" + c, u)
                        }
                    }
                }
                if (g.add) {
                    g.add.call(e, p);
                    if (!p.handler.guid) {
                        p.handler.guid = r.guid
                    }
                }
                if (s) {
                    m.splice(m.delegateCount++, 0, p)
                } else {
                    m.push(p)
                }
                v.event.global[c] = true
            }
            e = null
        },
        global: {},
        remove: function(e, t, n, r, i) {
            var s, o, u, a, f, l, c, h, p, d, m, g = v.hasData(e) && v._data(e);
            if (!g || !(h = g.events)) {
                return
            }
            t = v.trim(Z(t || "")).split(" ");
            for (s = 0; s < t.length; s++) {
                o = J.exec(t[s]) || [];
                u = a = o[1];
                f = o[2];
                if (!u) {
                    for (u in h) {
                        v.event.remove(e, u + t[s], n, r, true)
                    }
                    continue
                }
                p = v.event.special[u] || {};
                u = (r ? p.delegateType : p.bindType) || u;
                d = h[u] || [];
                l = d.length;
                f = f ? new RegExp("(^|\\.)" + f.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                for (c = 0; c < d.length; c++) {
                    m = d[c];
                    if ((i || a === m.origType) && (!n || n.guid === m.guid) && (!f || f.test(m.namespace)) && (!r || r === m.selector || r === "**" && m.selector)) {
                        d.splice(c--, 1);
                        if (m.selector) {
                            d.delegateCount--
                        }
                        if (p.remove) {
                            p.remove.call(e, m)
                        }
                    }
                }
                if (d.length === 0 && l !== d.length) {
                    if (!p.teardown || p.teardown.call(e, f, g.handle) === false) {
                        v.removeEvent(e, u, g.handle)
                    }
                    delete h[u]
                }
            }
            if (v.isEmptyObject(h)) {
                delete g.handle;
                v.removeData(e, "events", true)
            }
        },
        customEvent: {
            getData: true,
            setData: true,
            changeData: true
        },
        trigger: function(n, r, s, o) {
            if (s && (s.nodeType === 3 || s.nodeType === 8)) {
                return
            }
            var u, a, f, l, c, h, p, d, m, g, y = n.type || n,
                b = [];
            if (Y.test(y + v.event.triggered)) {
                return
            }
            if (y.indexOf("!") >= 0) {
                y = y.slice(0, -1);
                a = true
            }
            if (y.indexOf(".") >= 0) {
                b = y.split(".");
                y = b.shift();
                b.sort()
            }
            if ((!s || v.event.customEvent[y]) && !v.event.global[y]) {
                return
            }
            n = typeof n === "object" ? n[v.expando] ? n : new v.Event(y, n) : new v.Event(y);
            n.type = y;
            n.isTrigger = true;
            n.exclusive = a;
            n.namespace = b.join(".");
            n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + b.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
            h = y.indexOf(":") < 0 ? "on" + y : "";
            if (!s) {
                u = v.cache;
                for (f in u) {
                    if (u[f].events && u[f].events[y]) {
                        v.event.trigger(n, r, u[f].handle.elem, true)
                    }
                }
                return
            }
            n.result = t;
            if (!n.target) {
                n.target = s
            }
            r = r != null ? v.makeArray(r) : [];
            r.unshift(n);
            p = v.event.special[y] || {};
            if (p.trigger && p.trigger.apply(s, r) === false) {
                return
            }
            m = [
                [s, p.bindType || y]
            ];
            if (!o && !p.noBubble && !v.isWindow(s)) {
                g = p.delegateType || y;
                l = Y.test(g + y) ? s : s.parentNode;
                for (c = s; l; l = l.parentNode) {
                    m.push([l, g]);
                    c = l
                }
                if (c === (s.ownerDocument || i)) {
                    m.push([c.defaultView || c.parentWindow || e, g])
                }
            }
            for (f = 0; f < m.length && !n.isPropagationStopped(); f++) {
                l = m[f][0];
                n.type = m[f][1];
                d = (v._data(l, "events") || {})[n.type] && v._data(l, "handle");
                if (d) {
                    d.apply(l, r)
                }
                d = h && l[h];
                if (d && v.acceptData(l) && d.apply && d.apply(l, r) === false) {
                    n.preventDefault()
                }
            }
            n.type = y;
            if (!o && !n.isDefaultPrevented()) {
                if ((!p._default || p._default.apply(s.ownerDocument, r) === false) && !(y === "click" && v.nodeName(s, "a")) && v.acceptData(s)) {
                    if (h && s[y] && (y !== "focus" && y !== "blur" || n.target.offsetWidth !== 0) && !v.isWindow(s)) {
                        c = s[h];
                        if (c) {
                            s[h] = null
                        }
                        v.event.triggered = y;
                        s[y]();
                        v.event.triggered = t;
                        if (c) {
                            s[h] = c
                        }
                    }
                }
            }
            return n.result
        },
        dispatch: function(n) {
            n = v.event.fix(n || e.event);
            var r, i, s, o, u, a, f, c, h, p, d = (v._data(this, "events") || {})[n.type] || [],
                m = d.delegateCount,
                g = l.call(arguments),
                y = !n.exclusive && !n.namespace,
                b = v.event.special[n.type] || {}, w = [];
            g[0] = n;
            n.delegateTarget = this;
            if (b.preDispatch && b.preDispatch.call(this, n) === false) {
                return
            }
            if (m && !(n.button && n.type === "click")) {
                for (s = n.target; s != this; s = s.parentNode || this) {
                    if (s.disabled !== true || n.type !== "click") {
                        u = {};
                        f = [];
                        for (r = 0; r < m; r++) {
                            c = d[r];
                            h = c.selector;
                            if (u[h] === t) {
                                u[h] = c.needsContext ? v(h, this).index(s) >= 0 : v.find(h, this, null, [s]).length
                            }
                            if (u[h]) {
                                f.push(c)
                            }
                        }
                        if (f.length) {
                            w.push({
                                elem: s,
                                matches: f
                            })
                        }
                    }
                }
            }
            if (d.length > m) {
                w.push({
                    elem: this,
                    matches: d.slice(m)
                })
            }
            for (r = 0; r < w.length && !n.isPropagationStopped(); r++) {
                a = w[r];
                n.currentTarget = a.elem;
                for (i = 0; i < a.matches.length && !n.isImmediatePropagationStopped(); i++) {
                    c = a.matches[i];
                    if (y || !n.namespace && !c.namespace || n.namespace_re && n.namespace_re.test(c.namespace)) {
                        n.data = c.data;
                        n.handleObj = c;
                        o = ((v.event.special[c.origType] || {}).handle || c.handler).apply(a.elem, g);
                        if (o !== t) {
                            n.result = o;
                            if (o === false) {
                                n.preventDefault();
                                n.stopPropagation()
                            }
                        }
                    }
                }
            }
            if (b.postDispatch) {
                b.postDispatch.call(this, n)
            }
            return n.result
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                if (e.which == null) {
                    e.which = t.charCode != null ? t.charCode : t.keyCode
                }
                return e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, n) {
                var r, s, o, u = n.button,
                    a = n.fromElement;
                if (e.pageX == null && n.clientX != null) {
                    r = e.target.ownerDocument || i;
                    s = r.documentElement;
                    o = r.body;
                    e.pageX = n.clientX + (s && s.scrollLeft || o && o.scrollLeft || 0) - (s && s.clientLeft || o && o.clientLeft || 0);
                    e.pageY = n.clientY + (s && s.scrollTop || o && o.scrollTop || 0) - (s && s.clientTop || o && o.clientTop || 0)
                }
                if (!e.relatedTarget && a) {
                    e.relatedTarget = a === e.target ? n.toElement : a
                }
                if (!e.which && u !== t) {
                    e.which = u & 1 ? 1 : u & 2 ? 3 : u & 4 ? 2 : 0
                }
                return e
            }
        },
        fix: function(e) {
            if (e[v.expando]) {
                return e
            }
            var t, n, r = e,
                s = v.event.fixHooks[e.type] || {}, o = s.props ? this.props.concat(s.props) : this.props;
            e = v.Event(r);
            for (t = o.length; t;) {
                n = o[--t];
                e[n] = r[n]
            }
            if (!e.target) {
                e.target = r.srcElement || i
            }
            if (e.target.nodeType === 3) {
                e.target = e.target.parentNode
            }
            e.metaKey = !! e.metaKey;
            return s.filter ? s.filter(e, r) : e
        },
        special: {
            load: {
                noBubble: true
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(e, t, n) {
                    if (v.isWindow(this)) {
                        this.onbeforeunload = n
                    }
                },
                teardown: function(e, t) {
                    if (this.onbeforeunload === t) {
                        this.onbeforeunload = null
                    }
                }
            }
        },
        simulate: function(e, t, n, r) {
            var i = v.extend(new v.Event, n, {
                type: e,
                isSimulated: true,
                originalEvent: {}
            });
            if (r) {
                v.event.trigger(i, null, t)
            } else {
                v.event.dispatch.call(t, i)
            } if (i.isDefaultPrevented()) {
                n.preventDefault()
            }
        }
    };
    v.event.handle = v.event.dispatch;
    v.removeEvent = i.removeEventListener ? function(e, t, n) {
        if (e.removeEventListener) {
            e.removeEventListener(t, n, false)
        }
    } : function(e, t, n) {
        var r = "on" + t;
        if (e.detachEvent) {
            if (typeof e[r] === "undefined") {
                e[r] = null
            }
            e.detachEvent(r, n)
        }
    };
    v.Event = function(e, t) {
        if (!(this instanceof v.Event)) {
            return new v.Event(e, t)
        }
        if (e && e.type) {
            this.originalEvent = e;
            this.type = e.type;
            this.isDefaultPrevented = e.defaultPrevented || e.returnValue === false || e.getPreventDefault && e.getPreventDefault() ? tt : et
        } else {
            this.type = e
        } if (t) {
            v.extend(this, t)
        }
        this.timeStamp = e && e.timeStamp || v.now();
        this[v.expando] = true
    };
    v.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = tt;
            var e = this.originalEvent;
            if (!e) {
                return
            }
            if (e.preventDefault) {
                e.preventDefault()
            } else {
                e.returnValue = false
            }
        },
        stopPropagation: function() {
            this.isPropagationStopped = tt;
            var e = this.originalEvent;
            if (!e) {
                return
            }
            if (e.stopPropagation) {
                e.stopPropagation()
            }
            e.cancelBubble = true
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = tt;
            this.stopPropagation()
        },
        isDefaultPrevented: et,
        isPropagationStopped: et,
        isImmediatePropagationStopped: et
    };
    v.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(e, t) {
        v.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = this,
                    i = e.relatedTarget,
                    s = e.handleObj,
                    o = s.selector;
                if (!i || i !== r && !v.contains(r, i)) {
                    e.type = s.origType;
                    n = s.handler.apply(this, arguments);
                    e.type = t
                }
                return n
            }
        }
    });
    if (!v.support.submitBubbles) {
        v.event.special.submit = {
            setup: function() {
                if (v.nodeName(this, "form")) {
                    return false
                }
                v.event.add(this, "click._submit keypress._submit", function(e) {
                    var n = e.target,
                        r = v.nodeName(n, "input") || v.nodeName(n, "button") ? n.form : t;
                    if (r && !v._data(r, "_submit_attached")) {
                        v.event.add(r, "submit._submit", function(e) {
                            e._submit_bubble = true
                        });
                        v._data(r, "_submit_attached", true)
                    }
                })
            },
            postDispatch: function(e) {
                if (e._submit_bubble) {
                    delete e._submit_bubble;
                    if (this.parentNode && !e.isTrigger) {
                        v.event.simulate("submit", this.parentNode, e, true)
                    }
                }
            },
            teardown: function() {
                if (v.nodeName(this, "form")) {
                    return false
                }
                v.event.remove(this, "._submit")
            }
        }
    }
    if (!v.support.changeBubbles) {
        v.event.special.change = {
            setup: function() {
                if ($.test(this.nodeName)) {
                    if (this.type === "checkbox" || this.type === "radio") {
                        v.event.add(this, "propertychange._change", function(e) {
                            if (e.originalEvent.propertyName === "checked") {
                                this._just_changed = true
                            }
                        });
                        v.event.add(this, "click._change", function(e) {
                            if (this._just_changed && !e.isTrigger) {
                                this._just_changed = false
                            }
                            v.event.simulate("change", this, e, true)
                        })
                    }
                    return false
                }
                v.event.add(this, "beforeactivate._change", function(e) {
                    var t = e.target;
                    if ($.test(t.nodeName) && !v._data(t, "_change_attached")) {
                        v.event.add(t, "change._change", function(e) {
                            if (this.parentNode && !e.isSimulated && !e.isTrigger) {
                                v.event.simulate("change", this.parentNode, e, true)
                            }
                        });
                        v._data(t, "_change_attached", true)
                    }
                })
            },
            handle: function(e) {
                var t = e.target;
                if (this !== t || e.isSimulated || e.isTrigger || t.type !== "radio" && t.type !== "checkbox") {
                    return e.handleObj.handler.apply(this, arguments)
                }
            },
            teardown: function() {
                v.event.remove(this, "._change");
                return !$.test(this.nodeName)
            }
        }
    }
    if (!v.support.focusinBubbles) {
        v.each({
            focus: "focusin",
            blur: "focusout"
        }, function(e, t) {
            var n = 0,
                r = function(e) {
                    v.event.simulate(t, e.target, v.event.fix(e), true)
                };
            v.event.special[t] = {
                setup: function() {
                    if (n++ === 0) {
                        i.addEventListener(e, r, true)
                    }
                },
                teardown: function() {
                    if (--n === 0) {
                        i.removeEventListener(e, r, true)
                    }
                }
            }
        })
    }
    v.fn.extend({
        on: function(e, n, r, i, s) {
            var o, u;
            if (typeof e === "object") {
                if (typeof n !== "string") {
                    r = r || n;
                    n = t
                }
                for (u in e) {
                    this.on(u, n, r, e[u], s)
                }
                return this
            }
            if (r == null && i == null) {
                i = n;
                r = n = t
            } else if (i == null) {
                if (typeof n === "string") {
                    i = r;
                    r = t
                } else {
                    i = r;
                    r = n;
                    n = t
                }
            }
            if (i === false) {
                i = et
            } else if (!i) {
                return this
            }
            if (s === 1) {
                o = i;
                i = function(e) {
                    v().off(e);
                    return o.apply(this, arguments)
                };
                i.guid = o.guid || (o.guid = v.guid++)
            }
            return this.each(function() {
                v.event.add(this, e, i, r, n)
            })
        },
        one: function(e, t, n, r) {
            return this.on(e, t, n, r, 1)
        },
        off: function(e, n, r) {
            var i, s;
            if (e && e.preventDefault && e.handleObj) {
                i = e.handleObj;
                v(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler);
                return this
            }
            if (typeof e === "object") {
                for (s in e) {
                    this.off(s, n, e[s])
                }
                return this
            }
            if (n === false || typeof n === "function") {
                r = n;
                n = t
            }
            if (r === false) {
                r = et
            }
            return this.each(function() {
                v.event.remove(this, e, r, n)
            })
        },
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        live: function(e, t, n) {
            v(this.context).on(e, this.selector, t, n);
            return this
        },
        die: function(e, t) {
            v(this.context).off(e, this.selector || "**", t);
            return this
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n)
        },
        trigger: function(e, t) {
            return this.each(function() {
                v.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            if (this[0]) {
                return v.event.trigger(e, t, this[0], true)
            }
        },
        toggle: function(e) {
            var t = arguments,
                n = e.guid || v.guid++,
                r = 0,
                i = function(n) {
                    var i = (v._data(this, "lastToggle" + e.guid) || 0) % r;
                    v._data(this, "lastToggle" + e.guid, i + 1);
                    n.preventDefault();
                    return t[i].apply(this, arguments) || false
                };
            i.guid = n;
            while (r < t.length) {
                t[r++].guid = n
            }
            return this.click(i)
        },
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    });
    v.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(e, t) {
        v.fn[t] = function(e, n) {
            if (n == null) {
                n = e;
                e = null
            }
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        };
        if (Q.test(t)) {
            v.event.fixHooks[t] = v.event.keyHooks
        }
        if (G.test(t)) {
            v.event.fixHooks[t] = v.event.mouseHooks
        }
    });
    (function(e, t) {
        function nt(e, t, n, r) {
            n = n || [];
            t = t || g;
            var i, s, a, f, l = t.nodeType;
            if (!e || typeof e !== "string") {
                return n
            }
            if (l !== 1 && l !== 9) {
                return []
            }
            a = o(t);
            if (!a && !r) {
                if (i = R.exec(e)) {
                    if (f = i[1]) {
                        if (l === 9) {
                            s = t.getElementById(f);
                            if (s && s.parentNode) {
                                if (s.id === f) {
                                    n.push(s);
                                    return n
                                }
                            } else {
                                return n
                            }
                        } else {
                            if (t.ownerDocument && (s = t.ownerDocument.getElementById(f)) && u(t, s) && s.id === f) {
                                n.push(s);
                                return n
                            }
                        }
                    } else if (i[2]) {
                        S.apply(n, x.call(t.getElementsByTagName(e), 0));
                        return n
                    } else if ((f = i[3]) && Z && t.getElementsByClassName) {
                        S.apply(n, x.call(t.getElementsByClassName(f), 0));
                        return n
                    }
                }
            }
            return vt(e.replace(j, "$1"), t, n, r, a)
        }

        function rt(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return n === "input" && t.type === e
            }
        }

        function it(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return (n === "input" || n === "button") && t.type === e
            }
        }

        function st(e) {
            return N(function(t) {
                t = +t;
                return N(function(n, r) {
                    var i, s = e([], n.length, t),
                        o = s.length;
                    while (o--) {
                        if (n[i = s[o]]) {
                            n[i] = !(r[i] = n[i])
                        }
                    }
                })
            })
        }

        function ot(e, t, n) {
            if (e === t) {
                return n
            }
            var r = e.nextSibling;
            while (r) {
                if (r === t) {
                    return -1
                }
                r = r.nextSibling
            }
            return 1
        }

        function ut(e, t) {
            var n, r, s, o, u, a, f, l = L[d][e];
            if (l) {
                return t ? 0 : l.slice(0)
            }
            u = e;
            a = [];
            f = i.preFilter;
            while (u) {
                if (!n || (r = F.exec(u))) {
                    if (r) {
                        u = u.slice(r[0].length)
                    }
                    a.push(s = [])
                }
                n = false;
                if (r = I.exec(u)) {
                    s.push(n = new m(r.shift()));
                    u = u.slice(n.length);
                    n.type = r[0].replace(j, " ")
                }
                for (o in i.filter) {
                    if ((r = J[o].exec(u)) && (!f[o] || (r = f[o](r, g, true)))) {
                        s.push(n = new m(r.shift()));
                        u = u.slice(n.length);
                        n.type = o;
                        n.matches = r
                    }
                }
                if (!n) {
                    break
                }
            }
            return t ? u.length : u ? nt.error(e) : L(e, a).slice(0)
        }

        function at(e, t, r) {
            var i = t.dir,
                s = r && t.dir === "parentNode",
                o = w++;
            return t.first ? function(t, n, r) {
                while (t = t[i]) {
                    if (s || t.nodeType === 1) {
                        return e(t, n, r)
                    }
                }
            } : function(t, r, u) {
                if (!u) {
                    var a, f = b + " " + o + " ",
                        l = f + n;
                    while (t = t[i]) {
                        if (s || t.nodeType === 1) {
                            if ((a = t[d]) === l) {
                                return t.sizset
                            } else if (typeof a === "string" && a.indexOf(f) === 0) {
                                if (t.sizset) {
                                    return t
                                }
                            } else {
                                t[d] = l;
                                if (e(t, r, u)) {
                                    t.sizset = true;
                                    return t
                                }
                                t.sizset = false
                            }
                        }
                    }
                } else {
                    while (t = t[i]) {
                        if (s || t.nodeType === 1) {
                            if (e(t, r, u)) {
                                return t
                            }
                        }
                    }
                }
            }
        }

        function ft(e) {
            return e.length > 1 ? function(t, n, r) {
                var i = e.length;
                while (i--) {
                    if (!e[i](t, n, r)) {
                        return false
                    }
                }
                return true
            } : e[0]
        }

        function lt(e, t, n, r, i) {
            var s, o = [],
                u = 0,
                a = e.length,
                f = t != null;
            for (; u < a; u++) {
                if (s = e[u]) {
                    if (!n || n(s, r, i)) {
                        o.push(s);
                        if (f) {
                            t.push(u)
                        }
                    }
                }
            }
            return o
        }

        function ct(e, t, n, r, i, s) {
            if (r && !r[d]) {
                r = ct(r)
            }
            if (i && !i[d]) {
                i = ct(i, s)
            }
            return N(function(s, o, u, a) {
                if (s && i) {
                    return
                }
                var f, l, c, h = [],
                    p = [],
                    d = o.length,
                    v = s || dt(t || "*", u.nodeType ? [u] : u, [], s),
                    m = e && (s || !t) ? lt(v, h, e, u, a) : v,
                    g = n ? i || (s ? e : d || r) ? [] : o : m;
                if (n) {
                    n(m, g, u, a)
                }
                if (r) {
                    c = lt(g, p);
                    r(c, [], u, a);
                    f = c.length;
                    while (f--) {
                        if (l = c[f]) {
                            g[p[f]] = !(m[p[f]] = l)
                        }
                    }
                }
                if (s) {
                    f = e && g.length;
                    while (f--) {
                        if (l = g[f]) {
                            s[h[f]] = !(o[h[f]] = l)
                        }
                    }
                } else {
                    g = lt(g === o ? g.splice(d, g.length) : g);
                    if (i) {
                        i(null, o, g, a)
                    } else {
                        S.apply(o, g)
                    }
                }
            })
        }

        function ht(e) {
            var t, n, r, s = e.length,
                o = i.relative[e[0].type],
                u = o || i.relative[" "],
                a = o ? 1 : 0,
                f = at(function(e) {
                    return e === t
                }, u, true),
                l = at(function(e) {
                    return T.call(t, e) > -1
                }, u, true),
                h = [
                    function(e, n, r) {
                        return !o && (r || n !== c) || ((t = n).nodeType ? f(e, n, r) : l(e, n, r))
                    }
                ];
            for (; a < s; a++) {
                if (n = i.relative[e[a].type]) {
                    h = [at(ft(h), n)]
                } else {
                    n = i.filter[e[a].type].apply(null, e[a].matches);
                    if (n[d]) {
                        r = ++a;
                        for (; r < s; r++) {
                            if (i.relative[e[r].type]) {
                                break
                            }
                        }
                        return ct(a > 1 && ft(h), a > 1 && e.slice(0, a - 1).join("").replace(j, "$1"), n, a < r && ht(e.slice(a, r)), r < s && ht(e = e.slice(r)), r < s && e.join(""))
                    }
                    h.push(n)
                }
            }
            return ft(h)
        }

        function pt(e, t) {
            var r = t.length > 0,
                s = e.length > 0,
                o = function(u, a, f, l, h) {
                    var p, d, v, m = [],
                        y = 0,
                        w = "0",
                        x = u && [],
                        T = h != null,
                        N = c,
                        C = u || s && i.find["TAG"]("*", h && a.parentNode || a),
                        k = b += N == null ? 1 : Math.E;
                    if (T) {
                        c = a !== g && a;
                        n = o.el
                    }
                    for (;
                        (p = C[w]) != null; w++) {
                        if (s && p) {
                            for (d = 0; v = e[d]; d++) {
                                if (v(p, a, f)) {
                                    l.push(p);
                                    break
                                }
                            }
                            if (T) {
                                b = k;
                                n = ++o.el
                            }
                        }
                        if (r) {
                            if (p = !v && p) {
                                y--
                            }
                            if (u) {
                                x.push(p)
                            }
                        }
                    }
                    y += w;
                    if (r && w !== y) {
                        for (d = 0; v = t[d]; d++) {
                            v(x, m, a, f)
                        }
                        if (u) {
                            if (y > 0) {
                                while (w--) {
                                    if (!(x[w] || m[w])) {
                                        m[w] = E.call(l)
                                    }
                                }
                            }
                            m = lt(m)
                        }
                        S.apply(l, m);
                        if (T && !u && m.length > 0 && y + t.length > 1) {
                            nt.uniqueSort(l)
                        }
                    }
                    if (T) {
                        b = k;
                        c = N
                    }
                    return x
                };
            o.el = 0;
            return r ? N(o) : o
        }

        function dt(e, t, n, r) {
            var i = 0,
                s = t.length;
            for (; i < s; i++) {
                nt(e, t[i], n, r)
            }
            return n
        }

        function vt(e, t, n, r, s) {
            var o, u, f, l, c, h = ut(e),
                p = h.length;
            if (!r) {
                if (h.length === 1) {
                    u = h[0] = h[0].slice(0);
                    if (u.length > 2 && (f = u[0]).type === "ID" && t.nodeType === 9 && !s && i.relative[u[1].type]) {
                        t = i.find["ID"](f.matches[0].replace($, ""), t, s)[0];
                        if (!t) {
                            return n
                        }
                        e = e.slice(u.shift().length)
                    }
                    for (o = J["POS"].test(e) ? -1 : u.length - 1; o >= 0; o--) {
                        f = u[o];
                        if (i.relative[l = f.type]) {
                            break
                        }
                        if (c = i.find[l]) {
                            if (r = c(f.matches[0].replace($, ""), z.test(u[0].type) && t.parentNode || t, s)) {
                                u.splice(o, 1);
                                e = r.length && u.join("");
                                if (!e) {
                                    S.apply(n, x.call(r, 0));
                                    return n
                                }
                                break
                            }
                        }
                    }
                }
            }
            a(e, h)(r, t, s, n, z.test(e));
            return n
        }

        function mt() {}
        var n, r, i, s, o, u, a, f, l, c, h = true,
            p = "undefined",
            d = ("sizcache" + Math.random()).replace(".", ""),
            m = String,
            g = e.document,
            y = g.documentElement,
            b = 0,
            w = 0,
            E = [].pop,
            S = [].push,
            x = [].slice,
            T = [].indexOf || function(e) {
                var t = 0,
                    n = this.length;
                for (; t < n; t++) {
                    if (this[t] === e) {
                        return t
                    }
                }
                return -1
            }, N = function(e, t) {
                e[d] = t == null || t;
                return e
            }, C = function() {
                var e = {}, t = [];
                return N(function(n, r) {
                    if (t.push(n) > i.cacheLength) {
                        delete e[t.shift()]
                    }
                    return e[n] = r
                }, e)
            }, k = C(),
            L = C(),
            A = C(),
            O = "[\\x20\\t\\r\\n\\f]",
            M = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",
            _ = M.replace("w", "w#"),
            D = "([*^$|!~]?=)",
            P = "\\[" + O + "*(" + M + ")" + O + "*(?:" + D + O + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + _ + ")|)|)" + O + "*\\]",
            H = ":(" + M + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + P + ")|[^:]|\\\\.)*|.*))\\)|)",
            B = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + O + "*((?:-\\d)?\\d*)" + O + "*\\)|)(?=[^-]|$)",
            j = new RegExp("^" + O + "+|((?:^|[^\\\\])(?:\\\\.)*)" + O + "+$", "g"),
            F = new RegExp("^" + O + "*," + O + "*"),
            I = new RegExp("^" + O + "*([\\x20\\t\\r\\n\\f>+~])" + O + "*"),
            q = new RegExp(H),
            R = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
            U = /^:not/,
            z = /[\x20\t\r\n\f]*[+~]/,
            W = /:not\($/,
            X = /h\d/i,
            V = /input|select|textarea|button/i,
            $ = /\\(?!\\)/g,
            J = {
                ID: new RegExp("^#(" + M + ")"),
                CLASS: new RegExp("^\\.(" + M + ")"),
                NAME: new RegExp("^\\[name=['\"]?(" + M + ")['\"]?\\]"),
                TAG: new RegExp("^(" + M.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + P),
                PSEUDO: new RegExp("^" + H),
                POS: new RegExp(B, "i"),
                CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\(" + O + "*(even|odd|(([+-]|)(\\d*)n|)" + O + "*(?:([+-]|)" + O + "*(\\d+)|))" + O + "*\\)|)", "i"),
                needsContext: new RegExp("^" + O + "*[>+~]|" + B, "i")
            }, K = function(e) {
                var t = g.createElement("div");
                try {
                    return e(t)
                } catch (n) {
                    return false
                } finally {
                    t = null
                }
            }, Q = K(function(e) {
                e.appendChild(g.createComment(""));
                return !e.getElementsByTagName("*").length
            }),
            G = K(function(e) {
                e.innerHTML = "<a href='#'></a>";
                return e.firstChild && typeof e.firstChild.getAttribute !== p && e.firstChild.getAttribute("href") === "#"
            }),
            Y = K(function(e) {
                e.innerHTML = "<select></select>";
                var t = typeof e.lastChild.getAttribute("multiple");
                return t !== "boolean" && t !== "string"
            }),
            Z = K(function(e) {
                e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
                if (!e.getElementsByClassName || !e.getElementsByClassName("e").length) {
                    return false
                }
                e.lastChild.className = "e";
                return e.getElementsByClassName("e").length === 2
            }),
            et = K(function(e) {
                e.id = d + 0;
                e.innerHTML = "<a name='" + d + "'></a><div name='" + d + "'></div>";
                y.insertBefore(e, y.firstChild);
                var t = g.getElementsByName && g.getElementsByName(d).length === 2 + g.getElementsByName(d + 0).length;
                r = !g.getElementById(d);
                y.removeChild(e);
                return t
            });
        try {
            x.call(y.childNodes, 0)[0].nodeType
        } catch (tt) {
            x = function(e) {
                var t, n = [];
                for (; t = this[e]; e++) {
                    n.push(t)
                }
                return n
            }
        }
        nt.matches = function(e, t) {
            return nt(e, null, null, t)
        };
        nt.matchesSelector = function(e, t) {
            return nt(t, null, null, [e]).length > 0
        };
        s = nt.getText = function(e) {
            var t, n = "",
                r = 0,
                i = e.nodeType;
            if (i) {
                if (i === 1 || i === 9 || i === 11) {
                    if (typeof e.textContent === "string") {
                        return e.textContent
                    } else {
                        for (e = e.firstChild; e; e = e.nextSibling) {
                            n += s(e)
                        }
                    }
                } else if (i === 3 || i === 4) {
                    return e.nodeValue
                }
            } else {
                for (; t = e[r]; r++) {
                    n += s(t)
                }
            }
            return n
        };
        o = nt.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? t.nodeName !== "HTML" : false
        };
        u = nt.contains = y.contains ? function(e, t) {
            var n = e.nodeType === 9 ? e.documentElement : e,
                r = t && t.parentNode;
            return e === r || !! (r && r.nodeType === 1 && n.contains && n.contains(r))
        } : y.compareDocumentPosition ? function(e, t) {
            return t && !! (e.compareDocumentPosition(t) & 16)
        } : function(e, t) {
            while (t = t.parentNode) {
                if (t === e) {
                    return true
                }
            }
            return false
        };
        nt.attr = function(e, t) {
            var n, r = o(e);
            if (!r) {
                t = t.toLowerCase()
            }
            if (n = i.attrHandle[t]) {
                return n(e)
            }
            if (r || Y) {
                return e.getAttribute(t)
            }
            n = e.getAttributeNode(t);
            return n ? typeof e[t] === "boolean" ? e[t] ? t : null : n.specified ? n.value : null : null
        };
        i = nt.selectors = {
            cacheLength: 50,
            createPseudo: N,
            match: J,
            attrHandle: G ? {} : {
                href: function(e) {
                    return e.getAttribute("href", 2)
                },
                type: function(e) {
                    return e.getAttribute("type")
                }
            },
            find: {
                ID: r ? function(e, t, n) {
                    if (typeof t.getElementById !== p && !n) {
                        var r = t.getElementById(e);
                        return r && r.parentNode ? [r] : []
                    }
                } : function(e, n, r) {
                    if (typeof n.getElementById !== p && !r) {
                        var i = n.getElementById(e);
                        return i ? i.id === e || typeof i.getAttributeNode !== p && i.getAttributeNode("id").value === e ? [i] : t : []
                    }
                },
                TAG: Q ? function(e, t) {
                    if (typeof t.getElementsByTagName !== p) {
                        return t.getElementsByTagName(e)
                    }
                } : function(e, t) {
                    var n = t.getElementsByTagName(e);
                    if (e === "*") {
                        var r, i = [],
                            s = 0;
                        for (; r = n[s]; s++) {
                            if (r.nodeType === 1) {
                                i.push(r)
                            }
                        }
                        return i
                    }
                    return n
                },
                NAME: et && function(e, t) {
                    if (typeof t.getElementsByName !== p) {
                        return t.getElementsByName(name)
                    }
                },
                CLASS: Z && function(e, t, n) {
                    if (typeof t.getElementsByClassName !== p && !n) {
                        return t.getElementsByClassName(e)
                    }
                }
            },
            relative: {
                ">": {
                    dir: "parentNode",
                    first: true
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: true
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    e[1] = e[1].replace($, "");
                    e[3] = (e[4] || e[5] || "").replace($, "");
                    if (e[2] === "~=") {
                        e[3] = " " + e[3] + " "
                    }
                    return e.slice(0, 4)
                },
                CHILD: function(e) {
                    e[1] = e[1].toLowerCase();
                    if (e[1] === "nth") {
                        if (!e[2]) {
                            nt.error(e[0])
                        }
                        e[3] = +(e[3] ? e[4] + (e[5] || 1) : 2 * (e[2] === "even" || e[2] === "odd"));
                        e[4] = +(e[6] + e[7] || e[2] === "odd")
                    } else if (e[2]) {
                        nt.error(e[0])
                    }
                    return e
                },
                PSEUDO: function(e) {
                    var t, n;
                    if (J["CHILD"].test(e[0])) {
                        return null
                    }
                    if (e[3]) {
                        e[2] = e[3]
                    } else if (t = e[4]) {
                        if (q.test(t) && (n = ut(t, true)) && (n = t.indexOf(")", t.length - n) - t.length)) {
                            t = t.slice(0, n);
                            e[0] = e[0].slice(0, n)
                        }
                        e[2] = t
                    }
                    return e.slice(0, 3)
                }
            },
            filter: {
                ID: r ? function(e) {
                    e = e.replace($, "");
                    return function(t) {
                        return t.getAttribute("id") === e
                    }
                } : function(e) {
                    e = e.replace($, "");
                    return function(t) {
                        var n = typeof t.getAttributeNode !== p && t.getAttributeNode("id");
                        return n && n.value === e
                    }
                },
                TAG: function(e) {
                    if (e === "*") {
                        return function() {
                            return true
                        }
                    }
                    e = e.replace($, "").toLowerCase();
                    return function(t) {
                        return t.nodeName && t.nodeName.toLowerCase() === e
                    }
                },
                CLASS: function(e) {
                    var t = k[d][e];
                    if (!t) {
                        t = k(e, new RegExp("(^|" + O + ")" + e + "(" + O + "|$)"))
                    }
                    return function(e) {
                        return t.test(e.className || typeof e.getAttribute !== p && e.getAttribute("class") || "")
                    }
                },
                ATTR: function(e, t, n) {
                    return function(r, i) {
                        var s = nt.attr(r, e);
                        if (s == null) {
                            return t === "!="
                        }
                        if (!t) {
                            return true
                        }
                        s += "";
                        return t === "=" ? s === n : t === "!=" ? s !== n : t === "^=" ? n && s.indexOf(n) === 0 : t === "*=" ? n && s.indexOf(n) > -1 : t === "$=" ? n && s.substr(s.length - n.length) === n : t === "~=" ? (" " + s + " ").indexOf(n) > -1 : t === "|=" ? s === n || s.substr(0, n.length + 1) === n + "-" : false
                    }
                },
                CHILD: function(e, t, n, r) {
                    if (e === "nth") {
                        return function(e) {
                            var t, i, s = e.parentNode;
                            if (n === 1 && r === 0) {
                                return true
                            }
                            if (s) {
                                i = 0;
                                for (t = s.firstChild; t; t = t.nextSibling) {
                                    if (t.nodeType === 1) {
                                        i++;
                                        if (e === t) {
                                            break
                                        }
                                    }
                                }
                            }
                            i -= r;
                            return i === n || i % n === 0 && i / n >= 0
                        }
                    }
                    return function(t) {
                        var n = t;
                        switch (e) {
                            case "only":
                            case "first":
                                while (n = n.previousSibling) {
                                    if (n.nodeType === 1) {
                                        return false
                                    }
                                }
                                if (e === "first") {
                                    return true
                                }
                                n = t;
                            case "last":
                                while (n = n.nextSibling) {
                                    if (n.nodeType === 1) {
                                        return false
                                    }
                                }
                                return true
                        }
                    }
                },
                PSEUDO: function(e, t) {
                    var n, r = i.pseudos[e] || i.setFilters[e.toLowerCase()] || nt.error("unsupported pseudo: " + e);
                    if (r[d]) {
                        return r(t)
                    }
                    if (r.length > 1) {
                        n = [e, e, "", t];
                        return i.setFilters.hasOwnProperty(e.toLowerCase()) ? N(function(e, n) {
                            var i, s = r(e, t),
                                o = s.length;
                            while (o--) {
                                i = T.call(e, s[o]);
                                e[i] = !(n[i] = s[o])
                            }
                        }) : function(e) {
                            return r(e, 0, n)
                        }
                    }
                    return r
                }
            },
            pseudos: {
                not: N(function(e) {
                    var t = [],
                        n = [],
                        r = a(e.replace(j, "$1"));
                    return r[d] ? N(function(e, t, n, i) {
                        var s, o = r(e, null, i, []),
                            u = e.length;
                        while (u--) {
                            if (s = o[u]) {
                                e[u] = !(t[u] = s)
                            }
                        }
                    }) : function(e, i, s) {
                        t[0] = e;
                        r(t, null, s, n);
                        return !n.pop()
                    }
                }),
                has: N(function(e) {
                    return function(t) {
                        return nt(e, t).length > 0
                    }
                }),
                contains: N(function(e) {
                    return function(t) {
                        return (t.textContent || t.innerText || s(t)).indexOf(e) > -1
                    }
                }),
                enabled: function(e) {
                    return e.disabled === false
                },
                disabled: function(e) {
                    return e.disabled === true
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return t === "input" && !! e.checked || t === "option" && !! e.selected
                },
                selected: function(e) {
                    if (e.parentNode) {
                        e.parentNode.selectedIndex
                    }
                    return e.selected === true
                },
                parent: function(e) {
                    return !i.pseudos["empty"](e)
                },
                empty: function(e) {
                    var t;
                    e = e.firstChild;
                    while (e) {
                        if (e.nodeName > "@" || (t = e.nodeType) === 3 || t === 4) {
                            return false
                        }
                        e = e.nextSibling
                    }
                    return true
                },
                header: function(e) {
                    return X.test(e.nodeName)
                },
                text: function(e) {
                    var t, n;
                    return e.nodeName.toLowerCase() === "input" && (t = e.type) === "text" && ((n = e.getAttribute("type")) == null || n.toLowerCase() === t)
                },
                radio: rt("radio"),
                checkbox: rt("checkbox"),
                file: rt("file"),
                password: rt("password"),
                image: rt("image"),
                submit: it("submit"),
                reset: it("reset"),
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return t === "input" && e.type === "button" || t === "button"
                },
                input: function(e) {
                    return V.test(e.nodeName)
                },
                focus: function(e) {
                    var t = e.ownerDocument;
                    return e === t.activeElement && (!t.hasFocus || t.hasFocus()) && !! (e.type || e.href)
                },
                active: function(e) {
                    return e === e.ownerDocument.activeElement
                },
                first: st(function(e, t, n) {
                    return [0]
                }),
                last: st(function(e, t, n) {
                    return [t - 1]
                }),
                eq: st(function(e, t, n) {
                    return [n < 0 ? n + t : n]
                }),
                even: st(function(e, t, n) {
                    for (var r = 0; r < t; r += 2) {
                        e.push(r)
                    }
                    return e
                }),
                odd: st(function(e, t, n) {
                    for (var r = 1; r < t; r += 2) {
                        e.push(r)
                    }
                    return e
                }),
                lt: st(function(e, t, n) {
                    for (var r = n < 0 ? n + t : n; --r >= 0;) {
                        e.push(r)
                    }
                    return e
                }),
                gt: st(function(e, t, n) {
                    for (var r = n < 0 ? n + t : n; ++r < t;) {
                        e.push(r)
                    }
                    return e
                })
            }
        };
        f = y.compareDocumentPosition ? function(e, t) {
            if (e === t) {
                l = true;
                return 0
            }
            return (!e.compareDocumentPosition || !t.compareDocumentPosition ? e.compareDocumentPosition : e.compareDocumentPosition(t) & 4) ? -1 : 1
        } : function(e, t) {
            if (e === t) {
                l = true;
                return 0
            } else if (e.sourceIndex && t.sourceIndex) {
                return e.sourceIndex - t.sourceIndex
            }
            var n, r, i = [],
                s = [],
                o = e.parentNode,
                u = t.parentNode,
                a = o;
            if (o === u) {
                return ot(e, t)
            } else if (!o) {
                return -1
            } else if (!u) {
                return 1
            }
            while (a) {
                i.unshift(a);
                a = a.parentNode
            }
            a = u;
            while (a) {
                s.unshift(a);
                a = a.parentNode
            }
            n = i.length;
            r = s.length;
            for (var f = 0; f < n && f < r; f++) {
                if (i[f] !== s[f]) {
                    return ot(i[f], s[f])
                }
            }
            return f === n ? ot(e, s[f], -1) : ot(i[f], t, 1)
        };
        [0, 0].sort(f);
        h = !l;
        nt.uniqueSort = function(e) {
            var t, n = 1;
            l = h;
            e.sort(f);
            if (l) {
                for (; t = e[n]; n++) {
                    if (t === e[n - 1]) {
                        e.splice(n--, 1)
                    }
                }
            }
            return e
        };
        nt.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        };
        a = nt.compile = function(e, t) {
            var n, r = [],
                i = [],
                s = A[d][e];
            if (!s) {
                if (!t) {
                    t = ut(e)
                }
                n = t.length;
                while (n--) {
                    s = ht(t[n]);
                    if (s[d]) {
                        r.push(s)
                    } else {
                        i.push(s)
                    }
                }
                s = A(e, pt(i, r))
            }
            return s
        };
        if (g.querySelectorAll) {
            (function() {
                var e, t = vt,
                    n = /'|\\/g,
                    r = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
                    i = [":focus"],
                    s = [":active", ":focus"],
                    u = y.matchesSelector || y.mozMatchesSelector || y.webkitMatchesSelector || y.oMatchesSelector || y.msMatchesSelector;
                K(function(e) {
                    e.innerHTML = "<select><option selected=''></option></select>";
                    if (!e.querySelectorAll("[selected]").length) {
                        i.push("\\[" + O + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)")
                    }
                    if (!e.querySelectorAll(":checked").length) {
                        i.push(":checked")
                    }
                });
                K(function(e) {
                    e.innerHTML = "<p test=''></p>";
                    if (e.querySelectorAll("[test^='']").length) {
                        i.push("[*^$]=" + O + "*(?:\"\"|'')")
                    }
                    e.innerHTML = "<input type='hidden'/>";
                    if (!e.querySelectorAll(":enabled").length) {
                        i.push(":enabled", ":disabled")
                    }
                });
                i = new RegExp(i.join("|"));
                vt = function(e, r, s, o, u) {
                    if (!o && !u && (!i || !i.test(e))) {
                        var a, f, l = true,
                            c = d,
                            h = r,
                            p = r.nodeType === 9 && e;
                        if (r.nodeType === 1 && r.nodeName.toLowerCase() !== "object") {
                            a = ut(e);
                            if (l = r.getAttribute("id")) {
                                c = l.replace(n, "\\$&")
                            } else {
                                r.setAttribute("id", c)
                            }
                            c = "[id='" + c + "'] ";
                            f = a.length;
                            while (f--) {
                                a[f] = c + a[f].join("")
                            }
                            h = z.test(e) && r.parentNode || r;
                            p = a.join(",")
                        }
                        if (p) {
                            try {
                                S.apply(s, x.call(h.querySelectorAll(p), 0));
                                return s
                            } catch (v) {} finally {
                                if (!l) {
                                    r.removeAttribute("id")
                                }
                            }
                        }
                    }
                    return t(e, r, s, o, u)
                };
                if (u) {
                    K(function(t) {
                        e = u.call(t, "div");
                        try {
                            u.call(t, "[test!='']:sizzle");
                            s.push("!=", H)
                        } catch (n) {}
                    });
                    s = new RegExp(s.join("|"));
                    nt.matchesSelector = function(t, n) {
                        n = n.replace(r, "='$1']");
                        if (!o(t) && !s.test(n) && (!i || !i.test(n))) {
                            try {
                                var a = u.call(t, n);
                                if (a || e || t.document && t.document.nodeType !== 11) {
                                    return a
                                }
                            } catch (f) {}
                        }
                        return nt(n, null, null, [t]).length > 0
                    }
                }
            })()
        }
        i.pseudos["nth"] = i.pseudos["eq"];
        i.filters = mt.prototype = i.pseudos;
        i.setFilters = new mt;
        nt.attr = v.attr;
        v.find = nt;
        v.expr = nt.selectors;
        v.expr[":"] = v.expr.pseudos;
        v.unique = nt.uniqueSort;
        v.text = nt.getText;
        v.isXMLDoc = nt.isXML;
        v.contains = nt.contains
    })(e);
    var nt = /Until$/,
        rt = /^(?:parents|prev(?:Until|All))/,
        it = /^.[^:#\[\.,]*$/,
        st = v.expr.match.needsContext,
        ot = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };
    v.fn.extend({
        find: function(e) {
            var t, n, r, i, s, o, u = this;
            if (typeof e !== "string") {
                return v(e).filter(function() {
                    for (t = 0, n = u.length; t < n; t++) {
                        if (v.contains(u[t], this)) {
                            return true
                        }
                    }
                })
            }
            o = this.pushStack("", "find", e);
            for (t = 0, n = this.length; t < n; t++) {
                r = o.length;
                v.find(e, this[t], o);
                if (t > 0) {
                    for (i = r; i < o.length; i++) {
                        for (s = 0; s < r; s++) {
                            if (o[s] === o[i]) {
                                o.splice(i--, 1);
                                break
                            }
                        }
                    }
                }
            }
            return o
        },
        has: function(e) {
            var t, n = v(e, this),
                r = n.length;
            return this.filter(function() {
                for (t = 0; t < r; t++) {
                    if (v.contains(this, n[t])) {
                        return true
                    }
                }
            })
        },
        not: function(e) {
            return this.pushStack(ft(this, e, false), "not", e)
        },
        filter: function(e) {
            return this.pushStack(ft(this, e, true), "filter", e)
        },
        is: function(e) {
            return !!e && (typeof e === "string" ? st.test(e) ? v(e, this.context).index(this[0]) >= 0 : v.filter(e, this).length > 0 : this.filter(e).length > 0)
        },
        closest: function(e, t) {
            var n, r = 0,
                i = this.length,
                s = [],
                o = st.test(e) || typeof e !== "string" ? v(e, t || this.context) : 0;
            for (; r < i; r++) {
                n = this[r];
                while (n && n.ownerDocument && n !== t && n.nodeType !== 11) {
                    if (o ? o.index(n) > -1 : v.find.matchesSelector(n, e)) {
                        s.push(n);
                        break
                    }
                    n = n.parentNode
                }
            }
            s = s.length > 1 ? v.unique(s) : s;
            return this.pushStack(s, "closest", e)
        },
        index: function(e) {
            if (!e) {
                return this[0] && this[0].parentNode ? this.prevAll().length : -1
            }
            if (typeof e === "string") {
                return v.inArray(this[0], v(e))
            }
            return v.inArray(e.jquery ? e[0] : e, this)
        },
        add: function(e, t) {
            var n = typeof e === "string" ? v(e, t) : v.makeArray(e && e.nodeType ? [e] : e),
                r = v.merge(this.get(), n);
            return this.pushStack(ut(n[0]) || ut(r[0]) ? r : v.unique(r))
        },
        addBack: function(e) {
            return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
        }
    });
    v.fn.andSelf = v.fn.addBack;
    v.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && t.nodeType !== 11 ? t : null
        },
        parents: function(e) {
            return v.dir(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return v.dir(e, "parentNode", n)
        },
        next: function(e) {
            return at(e, "nextSibling")
        },
        prev: function(e) {
            return at(e, "previousSibling")
        },
        nextAll: function(e) {
            return v.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return v.dir(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return v.dir(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return v.dir(e, "previousSibling", n)
        },
        siblings: function(e) {
            return v.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return v.sibling(e.firstChild)
        },
        contents: function(e) {
            return v.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : v.merge([], e.childNodes)
        }
    }, function(e, t) {
        v.fn[e] = function(n, r) {
            var i = v.map(this, t, n);
            if (!nt.test(e)) {
                r = n
            }
            if (r && typeof r === "string") {
                i = v.filter(r, i)
            }
            i = this.length > 1 && !ot[e] ? v.unique(i) : i;
            if (this.length > 1 && rt.test(e)) {
                i = i.reverse()
            }
            return this.pushStack(i, e, l.call(arguments).join(","))
        }
    });
    v.extend({
        filter: function(e, t, n) {
            if (n) {
                e = ":not(" + e + ")"
            }
            return t.length === 1 ? v.find.matchesSelector(t[0], e) ? [t[0]] : [] : v.find.matches(e, t)
        },
        dir: function(e, n, r) {
            var i = [],
                s = e[n];
            while (s && s.nodeType !== 9 && (r === t || s.nodeType !== 1 || !v(s).is(r))) {
                if (s.nodeType === 1) {
                    i.push(s)
                }
                s = s[n]
            }
            return i
        },
        sibling: function(e, t) {
            var n = [];
            for (; e; e = e.nextSibling) {
                if (e.nodeType === 1 && e !== t) {
                    n.push(e)
                }
            }
            return n
        }
    });
    var ct = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" + "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        ht = / jQuery\d+="(?:null|\d+)"/g,
        pt = /^\s+/,
        dt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        vt = /<([\w:]+)/,
        mt = /<tbody/i,
        gt = /<|&#?\w+;/,
        yt = /<(?:script|style|link)/i,
        bt = /<(?:script|object|embed|option|style)/i,
        wt = new RegExp("<(?:" + ct + ")[\\s/>]", "i"),
        Et = /^(?:checkbox|radio)$/,
        St = /checked\s*(?:[^=]|=\s*.checked.)/i,
        xt = /\/(java|ecma)script/i,
        Tt = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
        Nt = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        }, Ct = lt(i),
        kt = Ct.appendChild(i.createElement("div"));
    Nt.optgroup = Nt.option;
    Nt.tbody = Nt.tfoot = Nt.colgroup = Nt.caption = Nt.thead;
    Nt.th = Nt.td;
    if (!v.support.htmlSerialize) {
        Nt._default = [1, "X<div>", "</div>"]
    }
    v.fn.extend({
        text: function(e) {
            return v.access(this, function(e) {
                return e === t ? v.text(this) : this.empty().append((this[0] && this[0].ownerDocument || i).createTextNode(e))
            }, null, e, arguments.length)
        },
        wrapAll: function(e) {
            if (v.isFunction(e)) {
                return this.each(function(t) {
                    v(this).wrapAll(e.call(this, t))
                })
            }
            if (this[0]) {
                var t = v(e, this[0].ownerDocument).eq(0).clone(true);
                if (this[0].parentNode) {
                    t.insertBefore(this[0])
                }
                t.map(function() {
                    var e = this;
                    while (e.firstChild && e.firstChild.nodeType === 1) {
                        e = e.firstChild
                    }
                    return e
                }).append(this)
            }
            return this
        },
        wrapInner: function(e) {
            if (v.isFunction(e)) {
                return this.each(function(t) {
                    v(this).wrapInner(e.call(this, t))
                })
            }
            return this.each(function() {
                var t = v(this),
                    n = t.contents();
                if (n.length) {
                    n.wrapAll(e)
                } else {
                    t.append(e)
                }
            })
        },
        wrap: function(e) {
            var t = v.isFunction(e);
            return this.each(function(n) {
                v(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                if (!v.nodeName(this, "body")) {
                    v(this).replaceWith(this.childNodes)
                }
            }).end()
        },
        append: function() {
            return this.domManip(arguments, true, function(e) {
                if (this.nodeType === 1 || this.nodeType === 11) {
                    this.appendChild(e)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, true, function(e) {
                if (this.nodeType === 1 || this.nodeType === 11) {
                    this.insertBefore(e, this.firstChild)
                }
            })
        },
        before: function() {
            if (!ut(this[0])) {
                return this.domManip(arguments, false, function(e) {
                    this.parentNode.insertBefore(e, this)
                })
            }
            if (arguments.length) {
                var e = v.clean(arguments);
                return this.pushStack(v.merge(e, this), "before", this.selector)
            }
        },
        after: function() {
            if (!ut(this[0])) {
                return this.domManip(arguments, false, function(e) {
                    this.parentNode.insertBefore(e, this.nextSibling)
                })
            }
            if (arguments.length) {
                var e = v.clean(arguments);
                return this.pushStack(v.merge(this, e), "after", this.selector)
            }
        },
        remove: function(e, t) {
            var n, r = 0;
            for (;
                (n = this[r]) != null; r++) {
                if (!e || v.filter(e, [n]).length) {
                    if (!t && n.nodeType === 1) {
                        v.cleanData(n.getElementsByTagName("*"));
                        v.cleanData([n])
                    }
                    if (n.parentNode) {
                        n.parentNode.removeChild(n)
                    }
                }
            }
            return this
        },
        empty: function() {
            var e, t = 0;
            for (;
                (e = this[t]) != null; t++) {
                if (e.nodeType === 1) {
                    v.cleanData(e.getElementsByTagName("*"))
                }
                while (e.firstChild) {
                    e.removeChild(e.firstChild)
                }
            }
            return this
        },
        clone: function(e, t) {
            e = e == null ? false : e;
            t = t == null ? e : t;
            return this.map(function() {
                return v.clone(this, e, t)
            })
        },
        html: function(e) {
            return v.access(this, function(e) {
                var n = this[0] || {}, r = 0,
                    i = this.length;
                if (e === t) {
                    return n.nodeType === 1 ? n.innerHTML.replace(ht, "") : t
                }
                if (typeof e === "string" && !yt.test(e) && (v.support.htmlSerialize || !wt.test(e)) && (v.support.leadingWhitespace || !pt.test(e)) && !Nt[(vt.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = e.replace(dt, "<$1></$2>");
                    try {
                        for (; r < i; r++) {
                            n = this[r] || {};
                            if (n.nodeType === 1) {
                                v.cleanData(n.getElementsByTagName("*"));
                                n.innerHTML = e
                            }
                        }
                        n = 0
                    } catch (s) {}
                }
                if (n) {
                    this.empty().append(e)
                }
            }, null, e, arguments.length)
        },
        replaceWith: function(e) {
            if (!ut(this[0])) {
                if (v.isFunction(e)) {
                    return this.each(function(t) {
                        var n = v(this),
                            r = n.html();
                        n.replaceWith(e.call(this, t, r))
                    })
                }
                if (typeof e !== "string") {
                    e = v(e).detach()
                }
                return this.each(function() {
                    var t = this.nextSibling,
                        n = this.parentNode;
                    v(this).remove();
                    if (t) {
                        v(t).before(e)
                    } else {
                        v(n).append(e)
                    }
                })
            }
            return this.length ? this.pushStack(v(v.isFunction(e) ? e() : e), "replaceWith", e) : this
        },
        detach: function(e) {
            return this.remove(e, true)
        },
        domManip: function(e, n, r) {
            e = [].concat.apply([], e);
            var i, s, o, u, a = 0,
                f = e[0],
                l = [],
                c = this.length;
            if (!v.support.checkClone && c > 1 && typeof f === "string" && St.test(f)) {
                return this.each(function() {
                    v(this).domManip(e, n, r)
                })
            }
            if (v.isFunction(f)) {
                return this.each(function(i) {
                    var s = v(this);
                    e[0] = f.call(this, i, n ? s.html() : t);
                    s.domManip(e, n, r)
                })
            }
            if (this[0]) {
                i = v.buildFragment(e, this, l);
                o = i.fragment;
                s = o.firstChild;
                if (o.childNodes.length === 1) {
                    o = s
                }
                if (s) {
                    n = n && v.nodeName(s, "tr");
                    for (u = i.cacheable || c - 1; a < c; a++) {
                        r.call(n && v.nodeName(this[a], "table") ? Lt(this[a], "tbody") : this[a], a === u ? o : v.clone(o, true, true))
                    }
                }
                o = s = null;
                if (l.length) {
                    v.each(l, function(e, t) {
                        if (t.src) {
                            if (v.ajax) {
                                v.ajax({
                                    url: t.src,
                                    type: "GET",
                                    dataType: "script",
                                    async: false,
                                    global: false,
                                    "throws": true
                                })
                            } else {
                                v.error("no ajax")
                            }
                        } else {
                            v.globalEval((t.text || t.textContent || t.innerHTML || "").replace(Tt, ""))
                        } if (t.parentNode) {
                            t.parentNode.removeChild(t)
                        }
                    })
                }
            }
            return this
        }
    });
    v.buildFragment = function(e, n, r) {
        var s, o, u, a = e[0];
        n = n || i;
        n = !n.nodeType && n[0] || n;
        n = n.ownerDocument || n;
        if (e.length === 1 && typeof a === "string" && a.length < 512 && n === i && a.charAt(0) === "<" && !bt.test(a) && (v.support.checkClone || !St.test(a)) && (v.support.html5Clone || !wt.test(a))) {
            o = true;
            s = v.fragments[a];
            u = s !== t
        }
        if (!s) {
            s = n.createDocumentFragment();
            v.clean(e, n, s, r);
            if (o) {
                v.fragments[a] = u && s
            }
        }
        return {
            fragment: s,
            cacheable: o
        }
    };
    v.fragments = {};
    v.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        v.fn[e] = function(n) {
            var r, i = 0,
                s = [],
                o = v(n),
                u = o.length,
                a = this.length === 1 && this[0].parentNode;
            if ((a == null || a && a.nodeType === 11 && a.childNodes.length === 1) && u === 1) {
                o[t](this[0]);
                return this
            } else {
                for (; i < u; i++) {
                    r = (i > 0 ? this.clone(true) : this).get();
                    v(o[i])[t](r);
                    s = s.concat(r)
                }
                return this.pushStack(s, e, o.selector)
            }
        }
    });
    v.extend({
        clone: function(e, t, n) {
            var r, i, s, o;
            if (v.support.html5Clone || v.isXMLDoc(e) || !wt.test("<" + e.nodeName + ">")) {
                o = e.cloneNode(true)
            } else {
                kt.innerHTML = e.outerHTML;
                kt.removeChild(o = kt.firstChild)
            } if ((!v.support.noCloneEvent || !v.support.noCloneChecked) && (e.nodeType === 1 || e.nodeType === 11) && !v.isXMLDoc(e)) {
                Ot(e, o);
                r = Mt(e);
                i = Mt(o);
                for (s = 0; r[s]; ++s) {
                    if (i[s]) {
                        Ot(r[s], i[s])
                    }
                }
            }
            if (t) {
                At(e, o);
                if (n) {
                    r = Mt(e);
                    i = Mt(o);
                    for (s = 0; r[s]; ++s) {
                        At(r[s], i[s])
                    }
                }
            }
            r = i = null;
            return o
        },
        clean: function(e, t, n, r) {
            var s, o, u, a, f, l, c, h, p, d, m, g, y = t === i && Ct,
                b = [];
            if (!t || typeof t.createDocumentFragment === "undefined") {
                t = i
            }
            for (s = 0;
                (u = e[s]) != null; s++) {
                if (typeof u === "number") {
                    u += ""
                }
                if (!u) {
                    continue
                }
                if (typeof u === "string") {
                    if (!gt.test(u)) {
                        u = t.createTextNode(u)
                    } else {
                        y = y || lt(t);
                        c = t.createElement("div");
                        y.appendChild(c);
                        u = u.replace(dt, "<$1></$2>");
                        a = (vt.exec(u) || ["", ""])[1].toLowerCase();
                        f = Nt[a] || Nt._default;
                        l = f[0];
                        c.innerHTML = f[1] + u + f[2];
                        while (l--) {
                            c = c.lastChild
                        }
                        if (!v.support.tbody) {
                            h = mt.test(u);
                            p = a === "table" && !h ? c.firstChild && c.firstChild.childNodes : f[1] === "<table>" && !h ? c.childNodes : [];
                            for (o = p.length - 1; o >= 0; --o) {
                                if (v.nodeName(p[o], "tbody") && !p[o].childNodes.length) {
                                    p[o].parentNode.removeChild(p[o])
                                }
                            }
                        }
                        if (!v.support.leadingWhitespace && pt.test(u)) {
                            c.insertBefore(t.createTextNode(pt.exec(u)[0]), c.firstChild)
                        }
                        u = c.childNodes;
                        c.parentNode.removeChild(c)
                    }
                }
                if (u.nodeType) {
                    b.push(u)
                } else {
                    v.merge(b, u)
                }
            }
            if (c) {
                u = c = y = null
            }
            if (!v.support.appendChecked) {
                for (s = 0;
                    (u = b[s]) != null; s++) {
                    if (v.nodeName(u, "input")) {
                        _t(u)
                    } else if (typeof u.getElementsByTagName !== "undefined") {
                        v.grep(u.getElementsByTagName("input"), _t)
                    }
                }
            }
            if (n) {
                m = function(e) {
                    if (!e.type || xt.test(e.type)) {
                        return r ? r.push(e.parentNode ? e.parentNode.removeChild(e) : e) : n.appendChild(e)
                    }
                };
                for (s = 0;
                    (u = b[s]) != null; s++) {
                    if (!(v.nodeName(u, "script") && m(u))) {
                        n.appendChild(u);
                        if (typeof u.getElementsByTagName !== "undefined") {
                            g = v.grep(v.merge([], u.getElementsByTagName("script")), m);
                            b.splice.apply(b, [s + 1, 0].concat(g));
                            s += g.length
                        }
                    }
                }
            }
            return b
        },
        cleanData: function(e, t) {
            var n, r, i, s, o = 0,
                u = v.expando,
                a = v.cache,
                f = v.support.deleteExpando,
                l = v.event.special;
            for (;
                (i = e[o]) != null; o++) {
                if (t || v.acceptData(i)) {
                    r = i[u];
                    n = r && a[r];
                    if (n) {
                        if (n.events) {
                            for (s in n.events) {
                                if (l[s]) {
                                    v.event.remove(i, s)
                                } else {
                                    v.removeEvent(i, s, n.handle)
                                }
                            }
                        }
                        if (a[r]) {
                            delete a[r];
                            if (f) {
                                delete i[u]
                            } else if (i.removeAttribute) {
                                i.removeAttribute(u)
                            } else {
                                i[u] = null
                            }
                            v.deletedIds.push(r)
                        }
                    }
                }
            }
        }
    });
    (function() {
        var e, t;
        v.uaMatch = function(e) {
            e = e.toLowerCase();
            var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
            return {
                browser: t[1] || "",
                version: t[2] || "0"
            }
        };
        e = v.uaMatch(o.userAgent);
        t = {};
        if (e.browser) {
            t[e.browser] = true;
            t.version = e.version
        }
        if (t.chrome) {
            t.webkit = true
        } else if (t.webkit) {
            t.safari = true
        }
        v.browser = t;
        v.sub = function() {
            function e(t, n) {
                return new e.fn.init(t, n)
            }
            v.extend(true, e, this);
            e.superclass = this;
            e.fn = e.prototype = this();
            e.fn.constructor = e;
            e.sub = this.sub;
            e.fn.init = function(r, i) {
                if (i && i instanceof v && !(i instanceof e)) {
                    i = e(i)
                }
                return v.fn.init.call(this, r, i, t)
            };
            e.fn.init.prototype = e.fn;
            var t = e(i);
            return e
        }
    })();
    var Dt, Pt, Ht, Bt = /alpha\([^)]*\)/i,
        jt = /opacity=([^)]*)/,
        Ft = /^(top|right|bottom|left)$/,
        It = /^(none|table(?!-c[ea]).+)/,
        qt = /^margin/,
        Rt = new RegExp("^(" + m + ")(.*)$", "i"),
        Ut = new RegExp("^(" + m + ")(?!px)[a-z%]+$", "i"),
        zt = new RegExp("^([-+])=(" + m + ")", "i"),
        Wt = {}, Xt = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }, Vt = {
            letterSpacing: 0,
            fontWeight: 400
        }, $t = ["Top", "Right", "Bottom", "Left"],
        Jt = ["Webkit", "O", "Moz", "ms"],
        Kt = v.fn.toggle;
    v.fn.extend({
        css: function(e, n) {
            return v.access(this, function(e, n, r) {
                return r !== t ? v.style(e, n, r) : v.css(e, n)
            }, e, n, arguments.length > 1)
        },
        show: function() {
            return Yt(this, true)
        },
        hide: function() {
            return Yt(this)
        },
        toggle: function(e, t) {
            var n = typeof e === "boolean";
            if (v.isFunction(e) && v.isFunction(t)) {
                return Kt.apply(this, arguments)
            }
            return this.each(function() {
                if (n ? e : Gt(this)) {
                    v(this).show()
                } else {
                    v(this).hide()
                }
            })
        }
    });
    v.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = Dt(e, "opacity");
                        return n === "" ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            fillOpacity: true,
            fontWeight: true,
            lineHeight: true,
            opacity: true,
            orphans: true,
            widows: true,
            zIndex: true,
            zoom: true
        },
        cssProps: {
            "float": v.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(e, n, r, i) {
            if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style) {
                return
            }
            var s, o, u, a = v.camelCase(n),
                f = e.style;
            n = v.cssProps[a] || (v.cssProps[a] = Qt(f, a));
            u = v.cssHooks[n] || v.cssHooks[a];
            if (r !== t) {
                o = typeof r;
                if (o === "string" && (s = zt.exec(r))) {
                    r = (s[1] + 1) * s[2] + parseFloat(v.css(e, n));
                    o = "number"
                }
                if (r == null || o === "number" && isNaN(r)) {
                    return
                }
                if (o === "number" && !v.cssNumber[a]) {
                    r += "px"
                }
                if (!u || !("set" in u) || (r = u.set(e, r, i)) !== t) {
                    try {
                        f[n] = r
                    } catch (l) {}
                }
            } else {
                if (u && "get" in u && (s = u.get(e, false, i)) !== t) {
                    return s
                }
                return f[n]
            }
        },
        css: function(e, n, r, i) {
            var s, o, u, a = v.camelCase(n);
            n = v.cssProps[a] || (v.cssProps[a] = Qt(e.style, a));
            u = v.cssHooks[n] || v.cssHooks[a];
            if (u && "get" in u) {
                s = u.get(e, true, i)
            }
            if (s === t) {
                s = Dt(e, n)
            }
            if (s === "normal" && n in Vt) {
                s = Vt[n]
            }
            if (r || i !== t) {
                o = parseFloat(s);
                return r || v.isNumeric(o) ? o || 0 : s
            }
            return s
        },
        swap: function(e, t, n) {
            var r, i, s = {};
            for (i in t) {
                s[i] = e.style[i];
                e.style[i] = t[i]
            }
            r = n.call(e);
            for (i in t) {
                e.style[i] = s[i]
            }
            return r
        }
    });
    if (e.getComputedStyle) {
        Dt = function(t, n) {
            var r, i, s, o, u = e.getComputedStyle(t, null),
                a = t.style;
            if (u) {
                r = u[n];
                if (r === "" && !v.contains(t.ownerDocument, t)) {
                    r = v.style(t, n)
                }
                if (Ut.test(r) && qt.test(n)) {
                    i = a.width;
                    s = a.minWidth;
                    o = a.maxWidth;
                    a.minWidth = a.maxWidth = a.width = r;
                    r = u.width;
                    a.width = i;
                    a.minWidth = s;
                    a.maxWidth = o
                }
            }
            return r
        }
    } else if (i.documentElement.currentStyle) {
        Dt = function(e, t) {
            var n, r, i = e.currentStyle && e.currentStyle[t],
                s = e.style;
            if (i == null && s && s[t]) {
                i = s[t]
            }
            if (Ut.test(i) && !Ft.test(t)) {
                n = s.left;
                r = e.runtimeStyle && e.runtimeStyle.left;
                if (r) {
                    e.runtimeStyle.left = e.currentStyle.left
                }
                s.left = t === "fontSize" ? "1em" : i;
                i = s.pixelLeft + "px";
                s.left = n;
                if (r) {
                    e.runtimeStyle.left = r
                }
            }
            return i === "" ? "auto" : i
        }
    }
    v.each(["height", "width"], function(e, t) {
        v.cssHooks[t] = {
            get: function(e, n, r) {
                if (n) {
                    if (e.offsetWidth === 0 && It.test(Dt(e, "display"))) {
                        return v.swap(e, Xt, function() {
                            return tn(e, t, r)
                        })
                    } else {
                        return tn(e, t, r)
                    }
                }
            },
            set: function(e, n, r) {
                return Zt(e, n, r ? en(e, t, r, v.support.boxSizing && v.css(e, "boxSizing") === "border-box") : 0)
            }
        }
    });
    if (!v.support.opacity) {
        v.cssHooks.opacity = {
            get: function(e, t) {
                return jt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
            },
            set: function(e, t) {
                var n = e.style,
                    r = e.currentStyle,
                    i = v.isNumeric(t) ? "alpha(opacity=" + t * 100 + ")" : "",
                    s = r && r.filter || n.filter || "";
                n.zoom = 1;
                if (t >= 1 && v.trim(s.replace(Bt, "")) === "" && n.removeAttribute) {
                    n.removeAttribute("filter");
                    if (r && !r.filter) {
                        return
                    }
                }
                n.filter = Bt.test(s) ? s.replace(Bt, i) : s + " " + i
            }
        }
    }
    v(function() {
        if (!v.support.reliableMarginRight) {
            v.cssHooks.marginRight = {
                get: function(e, t) {
                    return v.swap(e, {
                        display: "inline-block"
                    }, function() {
                        if (t) {
                            return Dt(e, "marginRight")
                        }
                    })
                }
            }
        }
        if (!v.support.pixelPosition && v.fn.position) {
            v.each(["top", "left"], function(e, t) {
                v.cssHooks[t] = {
                    get: function(e, n) {
                        if (n) {
                            var r = Dt(e, t);
                            return Ut.test(r) ? v(e).position()[t] + "px" : r
                        }
                    }
                }
            })
        }
    });
    if (v.expr && v.expr.filters) {
        v.expr.filters.hidden = function(e) {
            return e.offsetWidth === 0 && e.offsetHeight === 0 || !v.support.reliableHiddenOffsets && (e.style && e.style.display || Dt(e, "display")) === "none"
        };
        v.expr.filters.visible = function(e) {
            return !v.expr.filters.hidden(e)
        }
    }
    v.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        v.cssHooks[e + t] = {
            expand: function(n) {
                var r, i = typeof n === "string" ? n.split(" ") : [n],
                    s = {};
                for (r = 0; r < 4; r++) {
                    s[e + $t[r] + t] = i[r] || i[r - 2] || i[0]
                }
                return s
            }
        };
        if (!qt.test(e)) {
            v.cssHooks[e + t].set = Zt
        }
    });
    var rn = /%20/g,
        sn = /\[\]$/,
        on = /\r?\n/g,
        un = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        an = /^(?:select|textarea)/i;
    v.fn.extend({
        serialize: function() {
            return v.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? v.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || an.test(this.nodeName) || un.test(this.type))
            }).map(function(e, t) {
                var n = v(this).val();
                return n == null ? null : v.isArray(n) ? v.map(n, function(e, n) {
                    return {
                        name: t.name,
                        value: e.replace(on, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(on, "\r\n")
                }
            }).get()
        }
    });
    v.param = function(e, n) {
        var r, i = [],
            s = function(e, t) {
                t = v.isFunction(t) ? t() : t == null ? "" : t;
                i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        if (n === t) {
            n = v.ajaxSettings && v.ajaxSettings.traditional
        }
        if (v.isArray(e) || e.jquery && !v.isPlainObject(e)) {
            v.each(e, function() {
                s(this.name, this.value)
            })
        } else {
            for (r in e) {
                fn(r, e[r], n, s)
            }
        }
        return i.join("&").replace(rn, "+")
    };
    var ln, cn, hn = /#.*$/,
        pn = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        dn = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        vn = /^(?:GET|HEAD)$/,
        mn = /^\/\//,
        gn = /\?/,
        yn = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        bn = /([?&])_=[^&]*/,
        wn = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        En = v.fn.load,
        Sn = {}, xn = {}, Tn = ["*/"] + ["*"];
    try {
        cn = s.href
    } catch (Nn) {
        cn = i.createElement("a");
        cn.href = "";
        cn = cn.href
    }
    ln = wn.exec(cn.toLowerCase()) || [];
    v.fn.load = function(e, n, r) {
        if (typeof e !== "string" && En) {
            return En.apply(this, arguments)
        }
        if (!this.length) {
            return this
        }
        var i, s, o, u = this,
            a = e.indexOf(" ");
        if (a >= 0) {
            i = e.slice(a, e.length);
            e = e.slice(0, a)
        }
        if (v.isFunction(n)) {
            r = n;
            n = t
        } else if (n && typeof n === "object") {
            s = "POST"
        }
        v.ajax({
            url: e,
            type: s,
            dataType: "html",
            data: n,
            complete: function(e, t) {
                if (r) {
                    u.each(r, o || [e.responseText, t, e])
                }
            }
        }).done(function(e) {
            o = arguments;
            u.html(i ? v("<div>").append(e.replace(yn, "")).find(i) : e)
        });
        return this
    };
    v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(e, t) {
        v.fn[t] = function(e) {
            return this.on(t, e)
        }
    });
    v.each(["get", "post"], function(e, n) {
        v[n] = function(e, r, i, s) {
            if (v.isFunction(r)) {
                s = s || i;
                i = r;
                r = t
            }
            return v.ajax({
                type: n,
                url: e,
                data: r,
                success: i,
                dataType: s
            })
        }
    });
    v.extend({
        getScript: function(e, n) {
            return v.get(e, t, n, "script")
        },
        getJSON: function(e, t, n) {
            return v.get(e, t, n, "json")
        },
        ajaxSetup: function(e, t) {
            if (t) {
                Ln(e, v.ajaxSettings)
            } else {
                t = e;
                e = v.ajaxSettings
            }
            Ln(e, t);
            return e
        },
        ajaxSettings: {
            url: cn,
            isLocal: dn.test(ln[1]),
            global: true,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: true,
            async: true,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": Tn
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": e.String,
                "text html": true,
                "text json": v.parseJSON,
                "text xml": v.parseXML
            },
            flatOptions: {
                context: true,
                url: true
            }
        },
        ajaxPrefilter: Cn(Sn),
        ajaxTransport: Cn(xn),
        ajax: function(e, n) {
            function T(e, n, s, a) {
                var l, y, b, w, S, T = n;
                if (E === 2) {
                    return
                }
                E = 2;
                if (u) {
                    clearTimeout(u)
                }
                o = t;
                i = a || "";
                x.readyState = e > 0 ? 4 : 0;
                if (s) {
                    w = An(c, x, s)
                }
                if (e >= 200 && e < 300 || e === 304) {
                    if (c.ifModified) {
                        S = x.getResponseHeader("Last-Modified");
                        if (S) {
                            v.lastModified[r] = S
                        }
                        S = x.getResponseHeader("Etag");
                        if (S) {
                            v.etag[r] = S
                        }
                    }
                    if (e === 304) {
                        T = "notmodified";
                        l = true
                    } else {
                        l = On(c, w);
                        T = l.state;
                        y = l.data;
                        b = l.error;
                        l = !b
                    }
                } else {
                    b = T;
                    if (!T || e) {
                        T = "error";
                        if (e < 0) {
                            e = 0
                        }
                    }
                }
                x.status = e;
                x.statusText = (n || T) + "";
                if (l) {
                    d.resolveWith(h, [y, T, x])
                } else {
                    d.rejectWith(h, [x, T, b])
                }
                x.statusCode(g);
                g = t;
                if (f) {
                    p.trigger("ajax" + (l ? "Success" : "Error"), [x, c, l ? y : b])
                }
                m.fireWith(h, [x, T]);
                if (f) {
                    p.trigger("ajaxComplete", [x, c]);
                    if (!--v.active) {
                        v.event.trigger("ajaxStop")
                    }
                }
            }
            if (typeof e === "object") {
                n = e;
                e = t
            }
            n = n || {};
            var r, i, s, o, u, a, f, l, c = v.ajaxSetup({}, n),
                h = c.context || c,
                p = h !== c && (h.nodeType || h instanceof v) ? v(h) : v.event,
                d = v.Deferred(),
                m = v.Callbacks("once memory"),
                g = c.statusCode || {}, b = {}, w = {}, E = 0,
                S = "canceled",
                x = {
                    readyState: 0,
                    setRequestHeader: function(e, t) {
                        if (!E) {
                            var n = e.toLowerCase();
                            e = w[n] = w[n] || e;
                            b[e] = t
                        }
                        return this
                    },
                    getAllResponseHeaders: function() {
                        return E === 2 ? i : null
                    },
                    getResponseHeader: function(e) {
                        var n;
                        if (E === 2) {
                            if (!s) {
                                s = {};
                                while (n = pn.exec(i)) {
                                    s[n[1].toLowerCase()] = n[2]
                                }
                            }
                            n = s[e.toLowerCase()]
                        }
                        return n === t ? null : n
                    },
                    overrideMimeType: function(e) {
                        if (!E) {
                            c.mimeType = e
                        }
                        return this
                    },
                    abort: function(e) {
                        e = e || S;
                        if (o) {
                            o.abort(e)
                        }
                        T(0, e);
                        return this
                    }
                };
            d.promise(x);
            x.success = x.done;
            x.error = x.fail;
            x.complete = m.add;
            x.statusCode = function(e) {
                if (e) {
                    var t;
                    if (E < 2) {
                        for (t in e) {
                            g[t] = [g[t], e[t]]
                        }
                    } else {
                        t = e[x.status];
                        x.always(t)
                    }
                }
                return this
            };
            c.url = ((e || c.url) + "").replace(hn, "").replace(mn, ln[1] + "//");
            c.dataTypes = v.trim(c.dataType || "*").toLowerCase().split(y);
            if (c.crossDomain == null) {
                a = wn.exec(c.url.toLowerCase()) || false;
                c.crossDomain = a && a.join(":") + (a[3] ? "" : a[1] === "http:" ? 80 : 443) !== ln.join(":") + (ln[3] ? "" : ln[1] === "http:" ? 80 : 443)
            }
            if (c.data && c.processData && typeof c.data !== "string") {
                c.data = v.param(c.data, c.traditional)
            }
            kn(Sn, c, n, x);
            if (E === 2) {
                return x
            }
            f = c.global;
            c.type = c.type.toUpperCase();
            c.hasContent = !vn.test(c.type);
            if (f && v.active++ === 0) {
                v.event.trigger("ajaxStart")
            }
            if (!c.hasContent) {
                if (c.data) {
                    c.url += (gn.test(c.url) ? "&" : "?") + c.data;
                    delete c.data
                }
                r = c.url;
                if (c.cache === false) {
                    var N = v.now(),
                        C = c.url.replace(bn, "$1_=" + N);
                    c.url = C + (C === c.url ? (gn.test(c.url) ? "&" : "?") + "_=" + N : "")
                }
            }
            if (c.data && c.hasContent && c.contentType !== false || n.contentType) {
                x.setRequestHeader("Content-Type", c.contentType)
            }
            if (c.ifModified) {
                r = r || c.url;
                if (v.lastModified[r]) {
                    x.setRequestHeader("If-Modified-Since", v.lastModified[r])
                }
                if (v.etag[r]) {
                    x.setRequestHeader("If-None-Match", v.etag[r])
                }
            }
            x.setRequestHeader("Accept", c.dataTypes[0] && c.accepts[c.dataTypes[0]] ? c.accepts[c.dataTypes[0]] + (c.dataTypes[0] !== "*" ? ", " + Tn + "; q=0.01" : "") : c.accepts["*"]);
            for (l in c.headers) {
                x.setRequestHeader(l, c.headers[l])
            }
            if (c.beforeSend && (c.beforeSend.call(h, x, c) === false || E === 2)) {
                return x.abort()
            }
            S = "abort";
            for (l in {
                success: 1,
                error: 1,
                complete: 1
            }) {
                x[l](c[l])
            }
            o = kn(xn, c, n, x);
            if (!o) {
                T(-1, "No Transport")
            } else {
                x.readyState = 1;
                if (f) {
                    p.trigger("ajaxSend", [x, c])
                }
                if (c.async && c.timeout > 0) {
                    u = setTimeout(function() {
                        x.abort("timeout")
                    }, c.timeout)
                }
                try {
                    E = 1;
                    o.send(b, T)
                } catch (k) {
                    if (E < 2) {
                        T(-1, k)
                    } else {
                        throw k
                    }
                }
            }
            return x
        },
        active: 0,
        lastModified: {},
        etag: {}
    });
    var Mn = [],
        _n = /\?/,
        Dn = /(=)\?(?=&|$)|\?\?/,
        Pn = v.now();
    v.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Mn.pop() || v.expando + "_" + Pn++;
            this[e] = true;
            return e
        }
    });
    v.ajaxPrefilter("json jsonp", function(n, r, i) {
        var s, o, u, a = n.data,
            f = n.url,
            l = n.jsonp !== false,
            c = l && Dn.test(f),
            h = l && !c && typeof a === "string" && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Dn.test(a);
        if (n.dataTypes[0] === "jsonp" || c || h) {
            s = n.jsonpCallback = v.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback;
            o = e[s];
            if (c) {
                n.url = f.replace(Dn, "$1" + s)
            } else if (h) {
                n.data = a.replace(Dn, "$1" + s)
            } else if (l) {
                n.url += (_n.test(f) ? "&" : "?") + n.jsonp + "=" + s
            }
            n.converters["script json"] = function() {
                if (!u) {
                    v.error(s + " was not called")
                }
                return u[0]
            };
            n.dataTypes[0] = "json";
            e[s] = function() {
                u = arguments
            };
            i.always(function() {
                e[s] = o;
                if (n[s]) {
                    n.jsonpCallback = r.jsonpCallback;
                    Mn.push(s)
                }
                if (u && v.isFunction(o)) {
                    o(u[0])
                }
                u = o = t
            });
            return "script"
        }
    });
    v.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(e) {
                v.globalEval(e);
                return e
            }
        }
    });
    v.ajaxPrefilter("script", function(e) {
        if (e.cache === t) {
            e.cache = false
        }
        if (e.crossDomain) {
            e.type = "GET";
            e.global = false
        }
    });
    v.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var n, r = i.head || i.getElementsByTagName("head")[0] || i.documentElement;
            return {
                send: function(s, o) {
                    n = i.createElement("script");
                    n.async = "async";
                    if (e.scriptCharset) {
                        n.charset = e.scriptCharset
                    }
                    n.src = e.url;
                    n.onload = n.onreadystatechange = function(e, i) {
                        if (i || !n.readyState || /loaded|complete/.test(n.readyState)) {
                            n.onload = n.onreadystatechange = null;
                            if (r && n.parentNode) {
                                r.removeChild(n)
                            }
                            n = t;
                            if (!i) {
                                o(200, "success")
                            }
                        }
                    };
                    r.insertBefore(n, r.firstChild)
                },
                abort: function() {
                    if (n) {
                        n.onload(0, 1)
                    }
                }
            }
        }
    });
    var Hn, Bn = e.ActiveXObject ? function() {
            for (var e in Hn) {
                Hn[e](0, 1)
            }
        } : false,
        jn = 0;
    v.ajaxSettings.xhr = e.ActiveXObject ? function() {
        return !this.isLocal && Fn() || In()
    } : Fn;
    (function(e) {
        v.extend(v.support, {
            ajax: !! e,
            cors: !! e && "withCredentials" in e
        })
    })(v.ajaxSettings.xhr());
    if (v.support.ajax) {
        v.ajaxTransport(function(n) {
            if (!n.crossDomain || v.support.cors) {
                var r;
                return {
                    send: function(i, s) {
                        var o, u, a = n.xhr();
                        if (n.username) {
                            a.open(n.type, n.url, n.async, n.username, n.password)
                        } else {
                            a.open(n.type, n.url, n.async)
                        } if (n.xhrFields) {
                            for (u in n.xhrFields) {
                                a[u] = n.xhrFields[u]
                            }
                        }
                        if (n.mimeType && a.overrideMimeType) {
                            a.overrideMimeType(n.mimeType)
                        }
                        if (!n.crossDomain && !i["X-Requested-With"]) {
                            i["X-Requested-With"] = "XMLHttpRequest"
                        }
                        try {
                            for (u in i) {
                                a.setRequestHeader(u, i[u])
                            }
                        } catch (f) {}
                        a.send(n.hasContent && n.data || null);
                        r = function(e, i) {
                            var u, f, l, c, h;
                            try {
                                if (r && (i || a.readyState === 4)) {
                                    r = t;
                                    if (o) {
                                        a.onreadystatechange = v.noop;
                                        if (Bn) {
                                            delete Hn[o]
                                        }
                                    }
                                    if (i) {
                                        if (a.readyState !== 4) {
                                            a.abort()
                                        }
                                    } else {
                                        u = a.status;
                                        l = a.getAllResponseHeaders();
                                        c = {};
                                        h = a.responseXML;
                                        if (h && h.documentElement) {
                                            c.xml = h
                                        }
                                        try {
                                            c.text = a.responseText
                                        } catch (e) {}
                                        try {
                                            f = a.statusText
                                        } catch (p) {
                                            f = ""
                                        }
                                        if (!u && n.isLocal && !n.crossDomain) {
                                            u = c.text ? 200 : 404
                                        } else if (u === 1223) {
                                            u = 204
                                        }
                                    }
                                }
                            } catch (d) {
                                if (!i) {
                                    s(-1, d)
                                }
                            }
                            if (c) {
                                s(u, f, c, l)
                            }
                        };
                        if (!n.async) {
                            r()
                        } else if (a.readyState === 4) {
                            setTimeout(r, 0)
                        } else {
                            o = ++jn;
                            if (Bn) {
                                if (!Hn) {
                                    Hn = {};
                                    v(e).unload(Bn)
                                }
                                Hn[o] = r
                            }
                            a.onreadystatechange = r
                        }
                    },
                    abort: function() {
                        if (r) {
                            r(0, 1)
                        }
                    }
                }
            }
        })
    }
    var qn, Rn, Un = /^(?:toggle|show|hide)$/,
        zn = new RegExp("^(?:([-+])=|)(" + m + ")([a-z%]*)$", "i"),
        Wn = /queueHooks$/,
        Xn = [Gn],
        Vn = {
            "*": [
                function(e, t) {
                    var n, r, i = this.createTween(e, t),
                        s = zn.exec(t),
                        o = i.cur(),
                        u = +o || 0,
                        a = 1,
                        f = 20;
                    if (s) {
                        n = +s[2];
                        r = s[3] || (v.cssNumber[e] ? "" : "px");
                        if (r !== "px" && u) {
                            u = v.css(i.elem, e, true) || n || 1;
                            do {
                                a = a || ".5";
                                u = u / a;
                                v.style(i.elem, e, u + r)
                            } while (a !== (a = i.cur() / o) && a !== 1 && --f)
                        }
                        i.unit = r;
                        i.start = u;
                        i.end = s[1] ? u + (s[1] + 1) * n : n
                    }
                    return i
                }
            ]
        };
    v.Animation = v.extend(Kn, {
        tweener: function(e, t) {
            if (v.isFunction(e)) {
                t = e;
                e = ["*"]
            } else {
                e = e.split(" ")
            }
            var n, r = 0,
                i = e.length;
            for (; r < i; r++) {
                n = e[r];
                Vn[n] = Vn[n] || [];
                Vn[n].unshift(t)
            }
        },
        prefilter: function(e, t) {
            if (t) {
                Xn.unshift(e)
            } else {
                Xn.push(e)
            }
        }
    });
    v.Tween = Yn;
    Yn.prototype = {
        constructor: Yn,
        init: function(e, t, n, r, i, s) {
            this.elem = e;
            this.prop = n;
            this.easing = i || "swing";
            this.options = t;
            this.start = this.now = this.cur();
            this.end = r;
            this.unit = s || (v.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = Yn.propHooks[this.prop];
            return e && e.get ? e.get(this) : Yn.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = Yn.propHooks[this.prop];
            if (this.options.duration) {
                this.pos = t = v.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration)
            } else {
                this.pos = t = e
            }
            this.now = (this.end - this.start) * t + this.start;
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this)
            }
            if (n && n.set) {
                n.set(this)
            } else {
                Yn.propHooks._default.set(this)
            }
            return this
        }
    };
    Yn.prototype.init.prototype = Yn.prototype;
    Yn.propHooks = {
        _default: {
            get: function(e) {
                var t;
                if (e.elem[e.prop] != null && (!e.elem.style || e.elem.style[e.prop] == null)) {
                    return e.elem[e.prop]
                }
                t = v.css(e.elem, e.prop, false, "");
                return !t || t === "auto" ? 0 : t
            },
            set: function(e) {
                if (v.fx.step[e.prop]) {
                    v.fx.step[e.prop](e)
                } else if (e.elem.style && (e.elem.style[v.cssProps[e.prop]] != null || v.cssHooks[e.prop])) {
                    v.style(e.elem, e.prop, e.now + e.unit)
                } else {
                    e.elem[e.prop] = e.now
                }
            }
        }
    };
    Yn.propHooks.scrollTop = Yn.propHooks.scrollLeft = {
        set: function(e) {
            if (e.elem.nodeType && e.elem.parentNode) {
                e.elem[e.prop] = e.now
            }
        }
    };
    v.each(["toggle", "show", "hide"], function(e, t) {
        var n = v.fn[t];
        v.fn[t] = function(r, i, s) {
            return r == null || typeof r === "boolean" || !e && v.isFunction(r) && v.isFunction(i) ? n.apply(this, arguments) : this.animate(Zn(t, true), r, i, s)
        }
    });
    v.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(Gt).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function(e, t, n, r) {
            var i = v.isEmptyObject(e),
                s = v.speed(t, n, r),
                o = function() {
                    var t = Kn(this, v.extend({}, e), s);
                    if (i) {
                        t.stop(true)
                    }
                };
            return i || s.queue === false ? this.each(o) : this.queue(s.queue, o)
        },
        stop: function(e, n, r) {
            var i = function(e) {
                var t = e.stop;
                delete e.stop;
                t(r)
            };
            if (typeof e !== "string") {
                r = n;
                n = e;
                e = t
            }
            if (n && e !== false) {
                this.queue(e || "fx", [])
            }
            return this.each(function() {
                var t = true,
                    n = e != null && e + "queueHooks",
                    s = v.timers,
                    o = v._data(this);
                if (n) {
                    if (o[n] && o[n].stop) {
                        i(o[n])
                    }
                } else {
                    for (n in o) {
                        if (o[n] && o[n].stop && Wn.test(n)) {
                            i(o[n])
                        }
                    }
                }
                for (n = s.length; n--;) {
                    if (s[n].elem === this && (e == null || s[n].queue === e)) {
                        s[n].anim.stop(r);
                        t = false;
                        s.splice(n, 1)
                    }
                }
                if (t || !r) {
                    v.dequeue(this, e)
                }
            })
        }
    });
    v.each({
        slideDown: Zn("show"),
        slideUp: Zn("hide"),
        slideToggle: Zn("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        v.fn[e] = function(e, n, r) {
            return this.animate(t, e, n, r)
        }
    });
    v.speed = function(e, t, n) {
        var r = e && typeof e === "object" ? v.extend({}, e) : {
            complete: n || !n && t || v.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !v.isFunction(t) && t
        };
        r.duration = v.fx.off ? 0 : typeof r.duration === "number" ? r.duration : r.duration in v.fx.speeds ? v.fx.speeds[r.duration] : v.fx.speeds._default;
        if (r.queue == null || r.queue === true) {
            r.queue = "fx"
        }
        r.old = r.complete;
        r.complete = function() {
            if (v.isFunction(r.old)) {
                r.old.call(this)
            }
            if (r.queue) {
                v.dequeue(this, r.queue)
            }
        };
        return r
    };
    v.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    };
    v.timers = [];
    v.fx = Yn.prototype.init;
    v.fx.tick = function() {
        var e, t = v.timers,
            n = 0;
        for (; n < t.length; n++) {
            e = t[n];
            if (!e() && t[n] === e) {
                t.splice(n--, 1)
            }
        }
        if (!t.length) {
            v.fx.stop()
        }
    };
    v.fx.timer = function(e) {
        if (e() && v.timers.push(e) && !Rn) {
            Rn = setInterval(v.fx.tick, v.fx.interval)
        }
    };
    v.fx.interval = 13;
    v.fx.stop = function() {
        clearInterval(Rn);
        Rn = null
    };
    v.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    v.fx.step = {};
    if (v.expr && v.expr.filters) {
        v.expr.filters.animated = function(e) {
            return v.grep(v.timers, function(t) {
                return e === t.elem
            }).length
        }
    }
    var er = /^(?:body|html)$/i;
    v.fn.offset = function(e) {
        if (arguments.length) {
            return e === t ? this : this.each(function(t) {
                v.offset.setOffset(this, e, t)
            })
        }
        var n, r, i, s, o, u, a, f = {
                top: 0,
                left: 0
            }, l = this[0],
            c = l && l.ownerDocument;
        if (!c) {
            return
        }
        if ((r = c.body) === l) {
            return v.offset.bodyOffset(l)
        }
        n = c.documentElement;
        if (!v.contains(n, l)) {
            return f
        }
        if (typeof l.getBoundingClientRect !== "undefined") {
            f = l.getBoundingClientRect()
        }
        i = tr(c);
        s = n.clientTop || r.clientTop || 0;
        o = n.clientLeft || r.clientLeft || 0;
        u = i.pageYOffset || n.scrollTop;
        a = i.pageXOffset || n.scrollLeft;
        return {
            top: f.top + u - s,
            left: f.left + a - o
        }
    };
    v.offset = {
        bodyOffset: function(e) {
            var t = e.offsetTop,
                n = e.offsetLeft;
            if (v.support.doesNotIncludeMarginInBodyOffset) {
                t += parseFloat(v.css(e, "marginTop")) || 0;
                n += parseFloat(v.css(e, "marginLeft")) || 0
            }
            return {
                top: t,
                left: n
            }
        },
        setOffset: function(e, t, n) {
            var r = v.css(e, "position");
            if (r === "static") {
                e.style.position = "relative"
            }
            var i = v(e),
                s = i.offset(),
                o = v.css(e, "top"),
                u = v.css(e, "left"),
                a = (r === "absolute" || r === "fixed") && v.inArray("auto", [o, u]) > -1,
                f = {}, l = {}, c, h;
            if (a) {
                l = i.position();
                c = l.top;
                h = l.left
            } else {
                c = parseFloat(o) || 0;
                h = parseFloat(u) || 0
            } if (v.isFunction(t)) {
                t = t.call(e, n, s)
            }
            if (t.top != null) {
                f.top = t.top - s.top + c
            }
            if (t.left != null) {
                f.left = t.left - s.left + h
            }
            if ("using" in t) {
                t.using.call(e, f)
            } else {
                i.css(f)
            }
        }
    };
    v.fn.extend({
        position: function() {
            if (!this[0]) {
                return
            }
            var e = this[0],
                t = this.offsetParent(),
                n = this.offset(),
                r = er.test(t[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : t.offset();
            n.top -= parseFloat(v.css(e, "marginTop")) || 0;
            n.left -= parseFloat(v.css(e, "marginLeft")) || 0;
            r.top += parseFloat(v.css(t[0], "borderTopWidth")) || 0;
            r.left += parseFloat(v.css(t[0], "borderLeftWidth")) || 0;
            return {
                top: n.top - r.top,
                left: n.left - r.left
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var e = this.offsetParent || i.body;
                while (e && !er.test(e.nodeName) && v.css(e, "position") === "static") {
                    e = e.offsetParent
                }
                return e || i.body
            })
        }
    });
    v.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, n) {
        var r = /Y/.test(n);
        v.fn[e] = function(i) {
            return v.access(this, function(e, i, s) {
                var o = tr(e);
                if (s === t) {
                    return o ? n in o ? o[n] : o.document.documentElement[i] : e[i]
                }
                if (o) {
                    o.scrollTo(!r ? s : v(o).scrollLeft(), r ? s : v(o).scrollTop())
                } else {
                    e[i] = s
                }
            }, e, i, arguments.length, null)
        }
    });
    v.each({
        Height: "height",
        Width: "width"
    }, function(e, n) {
        v.each({
            padding: "inner" + e,
            content: n,
            "": "outer" + e
        }, function(r, i) {
            v.fn[i] = function(i, s) {
                var o = arguments.length && (r || typeof i !== "boolean"),
                    u = r || (i === true || s === true ? "margin" : "border");
                return v.access(this, function(n, r, i) {
                    var s;
                    if (v.isWindow(n)) {
                        return n.document.documentElement["client" + e]
                    }
                    if (n.nodeType === 9) {
                        s = n.documentElement;
                        return Math.max(n.body["scroll" + e], s["scroll" + e], n.body["offset" + e], s["offset" + e], s["client" + e])
                    }
                    return i === t ? v.css(n, r, i, u) : v.style(n, r, i, u)
                }, n, o ? i : t, o, null)
            }
        })
    });
    e.jQuery = e.$ = v;
    if (typeof define === "function" && define.amd && define.amd.jQuery) {
        define("jquery", [], function() {
            return v
        })
    }
})(window);
jQuery.effects || function(e) {
    function t(t, n) {
        var r = t[1] && t[1].constructor == Object ? t[1] : {};
        if (n) r.mode = n;
        var i = t[1] && t[1].constructor != Object ? t[1] : r.duration ? r.duration : t[2];
        i = e.fx.off ? 0 : typeof i === "number" ? i : e.fx.speeds[i] || e.fx.speeds._default;
        var s = r.callback || e.isFunction(t[1]) && t[1] || e.isFunction(t[2]) && t[2] || e.isFunction(t[3]) && t[3];
        return [t[0], r, i, s]
    }

    function n(t) {
        var n;
        if (t && t.constructor == Array && t.length == 3) return t;
        if (n = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(t)) return [parseInt(n[1], 10), parseInt(n[2], 10), parseInt(n[3], 10)];
        if (n = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(t)) return [parseFloat(n[1]) * 2.55, parseFloat(n[2]) * 2.55, parseFloat(n[3]) * 2.55];
        if (n = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(t)) return [parseInt(n[1], 16), parseInt(n[2], 16), parseInt(n[3], 16)];
        if (n = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(t)) return [parseInt(n[1] + n[1], 16), parseInt(n[2] + n[2], 16), parseInt(n[3] + n[3], 16)];
        if (n = /rgba\(0, 0, 0, 0\)/.exec(t)) return i["transparent"];
        return i[e.trim(t).toLowerCase()]
    }

    function r(t, r) {
        var i;
        do {
            i = e.curCSS(t, r);
            if (i != "" && i != "transparent" || e.nodeName(t, "body")) break;
            r = "backgroundColor"
        } while (t = t.parentNode);
        return n(i)
    }
    e.effects = {
        version: "1.7.2",
        save: function(e, t) {
            for (var n = 0; n < t.length; n++) {
                if (t[n] !== null) e.data("ec.storage." + t[n], e[0].style[t[n]])
            }
        },
        restore: function(e, t) {
            for (var n = 0; n < t.length; n++) {
                if (t[n] !== null) e.css(t[n], e.data("ec.storage." + t[n]))
            }
        },
        setMode: function(e, t) {
            if (t == "toggle") t = e.is(":hidden") ? "show" : "hide";
            return t
        },
        getBaseline: function(e, t) {
            var n, r;
            switch (e[0]) {
                case "top":
                    n = 0;
                    break;
                case "middle":
                    n = .5;
                    break;
                case "bottom":
                    n = 1;
                    break;
                default:
                    n = e[0] / t.height
            }
            switch (e[1]) {
                case "left":
                    r = 0;
                    break;
                case "center":
                    r = .5;
                    break;
                case "right":
                    r = 1;
                    break;
                default:
                    r = e[1] / t.width
            }
            return {
                x: r,
                y: n
            }
        },
        createWrapper: function(e) {
            if (e.parent().is(".ui-effects-wrapper")) return e.parent();
            var t = {
                width: e.outerWidth(true),
                height: e.outerHeight(true),
                "float": e.css("float")
            };
            e.wrap('<div class="ui-effects-wrapper" style="font-size:100%;background:transparent;border:none;margin:0;padding:0"></div>');
            var n = e.parent();
            if (e.css("position") == "static") {
                n.css({
                    position: "relative"
                });
                e.css({
                    position: "relative"
                })
            } else {
                var r = e.css("top");
                if (isNaN(parseInt(r, 10))) r = "auto";
                var i = e.css("left");
                if (isNaN(parseInt(i, 10))) i = "auto";
                n.css({
                    position: e.css("position"),
                    top: r,
                    left: i,
                    zIndex: e.css("z-index")
                }).show();
                e.css({
                    position: "relative",
                    top: 0,
                    left: 0
                })
            }
            n.css(t);
            return n
        },
        removeWrapper: function(e) {
            if (e.parent().is(".ui-effects-wrapper")) return e.parent().replaceWith(e);
            return e
        },
        setTransition: function(t, n, r, i) {
            i = i || {};
            e.each(n, function(e, n) {
                unit = t.cssUnit(n);
                if (unit[0] > 0) i[n] = unit[0] * r + unit[1]
            });
            return i
        },
        animateClass: function(t, n, r, i) {
            var s = typeof r == "function" ? r : i ? i : null;
            var o = typeof r == "string" ? r : null;
            return this.each(function() {
                var r = {};
                var i = e(this);
                var u = i.attr("style") || "";
                if (typeof u == "object") u = u["cssText"];
                if (t.toggle) {
                    i.hasClass(t.toggle) ? t.remove = t.toggle : t.add = t.toggle
                }
                var a = e.extend({}, document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle);
                if (t.add) i.addClass(t.add);
                if (t.remove) i.removeClass(t.remove);
                var f = e.extend({}, document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle);
                if (t.add) i.removeClass(t.add);
                if (t.remove) i.addClass(t.remove);
                for (var l in f) {
                    if (typeof f[l] != "function" && f[l] && l.indexOf("Moz") == -1 && l.indexOf("length") == -1 && f[l] != a[l] && (l.match(/color/i) || !l.match(/color/i) && !isNaN(parseInt(f[l], 10))) && (a.position != "static" || a.position == "static" && !l.match(/left|top|bottom|right/))) r[l] = f[l]
                }
                i.animate(r, n, o, function() {
                    if (typeof e(this).attr("style") == "object") {
                        e(this).attr("style")["cssText"] = "";
                        e(this).attr("style")["cssText"] = u
                    } else e(this).attr("style", u); if (t.add) e(this).addClass(t.add);
                    if (t.remove) e(this).removeClass(t.remove);
                    if (s) s.apply(this, arguments)
                })
            })
        }
    };
    e.fn.extend({
        _show: e.fn.show,
        _hide: e.fn.hide,
        __toggle: e.fn.toggle,
        _addClass: e.fn.addClass,
        _removeClass: e.fn.removeClass,
        _toggleClass: e.fn.toggleClass,
        effect: function(t, n, r, i) {
            return e.effects[t] ? e.effects[t].call(this, {
                method: t,
                options: n || {},
                duration: r,
                callback: i
            }) : null
        },
        show: function() {
            if (!arguments[0] || arguments[0].constructor == Number || /(slow|normal|fast)/.test(arguments[0])) return this._show.apply(this, arguments);
            else {
                return this.effect.apply(this, t(arguments, "show"))
            }
        },
        hide: function() {
            if (!arguments[0] || arguments[0].constructor == Number || /(slow|normal|fast)/.test(arguments[0])) return this._hide.apply(this, arguments);
            else {
                return this.effect.apply(this, t(arguments, "hide"))
            }
        },
        toggle: function() {
            if (!arguments[0] || arguments[0].constructor == Number || /(slow|normal|fast)/.test(arguments[0]) || e.isFunction(arguments[0]) || typeof arguments[0] == "boolean") {
                return this.__toggle.apply(this, arguments)
            } else {
                return this.effect.apply(this, t(arguments, "toggle"))
            }
        },
        addClass: function(t, n, r, i) {
            return n ? e.effects.animateClass.apply(this, [{
                    add: t
                },
                n, r, i
            ]) : this._addClass(t)
        },
        removeClass: function(t, n, r, i) {
            return n ? e.effects.animateClass.apply(this, [{
                    remove: t
                },
                n, r, i
            ]) : this._removeClass(t)
        },
        toggleClass: function(t, n, r, i) {
            return typeof n !== "boolean" && n ? e.effects.animateClass.apply(this, [{
                    toggle: t
                },
                n, r, i
            ]) : this._toggleClass(t, n)
        },
        morph: function(t, n, r, i, s) {
            return e.effects.animateClass.apply(this, [{
                    add: n,
                    remove: t
                },
                r, i, s
            ])
        },
        switchClass: function() {
            return this.morph.apply(this, arguments)
        },
        cssUnit: function(t) {
            var n = this.css(t),
                r = [];
            e.each(["em", "px", "%", "pt"], function(e, t) {
                if (n.indexOf(t) > 0) r = [parseFloat(n), t]
            });
            return r
        }
    });
    e.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "color", "outlineColor"], function(t, i) {
        e.fx.step[i] = function(e) {
            if (e.state == 0) {
                e.start = r(e.elem, i);
                e.end = n(e.end)
            }
            e.elem.style[i] = "rgb(" + [Math.max(Math.min(parseInt(e.pos * (e.end[0] - e.start[0]) + e.start[0], 10), 255), 0), Math.max(Math.min(parseInt(e.pos * (e.end[1] - e.start[1]) + e.start[1], 10), 255), 0), Math.max(Math.min(parseInt(e.pos * (e.end[2] - e.start[2]) + e.start[2], 10), 255), 0)].join(",") + ")"
        }
    });
    var i = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
    };
    e.easing.jswing = e.easing.swing;
    e.extend(e.easing, {
        def: "easeOutQuad",
        swing: function(t, n, r, i, s) {
            return e.easing[e.easing.def](t, n, r, i, s)
        },
        easeInQuad: function(e, t, n, r, i) {
            return r * (t /= i) * t + n
        },
        easeOutQuad: function(e, t, n, r, i) {
            return -r * (t /= i) * (t - 2) + n
        },
        easeInOutQuad: function(e, t, n, r, i) {
            if ((t /= i / 2) < 1) return r / 2 * t * t + n;
            return -r / 2 * (--t * (t - 2) - 1) + n
        },
        easeInCubic: function(e, t, n, r, i) {
            return r * (t /= i) * t * t + n
        },
        easeOutCubic: function(e, t, n, r, i) {
            return r * ((t = t / i - 1) * t * t + 1) + n
        },
        easeInOutCubic: function(e, t, n, r, i) {
            if ((t /= i / 2) < 1) return r / 2 * t * t * t + n;
            return r / 2 * ((t -= 2) * t * t + 2) + n
        },
        easeInQuart: function(e, t, n, r, i) {
            return r * (t /= i) * t * t * t + n
        },
        easeOutQuart: function(e, t, n, r, i) {
            return -r * ((t = t / i - 1) * t * t * t - 1) + n
        },
        easeInOutQuart: function(e, t, n, r, i) {
            if ((t /= i / 2) < 1) return r / 2 * t * t * t * t + n;
            return -r / 2 * ((t -= 2) * t * t * t - 2) + n
        },
        easeInQuint: function(e, t, n, r, i) {
            return r * (t /= i) * t * t * t * t + n
        },
        easeOutQuint: function(e, t, n, r, i) {
            return r * ((t = t / i - 1) * t * t * t * t + 1) + n
        },
        easeInOutQuint: function(e, t, n, r, i) {
            if ((t /= i / 2) < 1) return r / 2 * t * t * t * t * t + n;
            return r / 2 * ((t -= 2) * t * t * t * t + 2) + n
        },
        easeInSine: function(e, t, n, r, i) {
            return -r * Math.cos(t / i * (Math.PI / 2)) + r + n
        },
        easeOutSine: function(e, t, n, r, i) {
            return r * Math.sin(t / i * (Math.PI / 2)) + n
        },
        easeInOutSine: function(e, t, n, r, i) {
            return -r / 2 * (Math.cos(Math.PI * t / i) - 1) + n
        },
        easeInExpo: function(e, t, n, r, i) {
            return t == 0 ? n : r * Math.pow(2, 10 * (t / i - 1)) + n
        },
        easeOutExpo: function(e, t, n, r, i) {
            return t == i ? n + r : r * (-Math.pow(2, -10 * t / i) + 1) + n
        },
        easeInOutExpo: function(e, t, n, r, i) {
            if (t == 0) return n;
            if (t == i) return n + r;
            if ((t /= i / 2) < 1) return r / 2 * Math.pow(2, 10 * (t - 1)) + n;
            return r / 2 * (-Math.pow(2, -10 * --t) + 2) + n
        },
        easeInCirc: function(e, t, n, r, i) {
            return -r * (Math.sqrt(1 - (t /= i) * t) - 1) + n
        },
        easeOutCirc: function(e, t, n, r, i) {
            return r * Math.sqrt(1 - (t = t / i - 1) * t) + n
        },
        easeInOutCirc: function(e, t, n, r, i) {
            if ((t /= i / 2) < 1) return -r / 2 * (Math.sqrt(1 - t * t) - 1) + n;
            return r / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n
        },
        easeInElastic: function(e, t, n, r, i) {
            var s = 1.70158;
            var o = 0;
            var u = r;
            if (t == 0) return n;
            if ((t /= i) == 1) return n + r;
            if (!o) o = i * .3;
            if (u < Math.abs(r)) {
                u = r;
                var s = o / 4
            } else var s = o / (2 * Math.PI) * Math.asin(r / u);
            return -(u * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o)) + n
        },
        easeOutElastic: function(e, t, n, r, i) {
            var s = 1.70158;
            var o = 0;
            var u = r;
            if (t == 0) return n;
            if ((t /= i) == 1) return n + r;
            if (!o) o = i * .3;
            if (u < Math.abs(r)) {
                u = r;
                var s = o / 4
            } else var s = o / (2 * Math.PI) * Math.asin(r / u);
            return u * Math.pow(2, -10 * t) * Math.sin((t * i - s) * 2 * Math.PI / o) + r + n
        },
        easeInOutElastic: function(e, t, n, r, i) {
            var s = 1.70158;
            var o = 0;
            var u = r;
            if (t == 0) return n;
            if ((t /= i / 2) == 2) return n + r;
            if (!o) o = i * .3 * 1.5;
            if (u < Math.abs(r)) {
                u = r;
                var s = o / 4
            } else var s = o / (2 * Math.PI) * Math.asin(r / u); if (t < 1) return -.5 * u * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o) + n;
            return u * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o) * .5 + r + n
        },
        easeInBack: function(e, t, n, r, i, s) {
            if (s == undefined) s = 1.70158;
            return r * (t /= i) * t * ((s + 1) * t - s) + n
        },
        easeOutBack: function(e, t, n, r, i, s) {
            if (s == undefined) s = 1.70158;
            return r * ((t = t / i - 1) * t * ((s + 1) * t + s) + 1) + n
        },
        easeInOutBack: function(e, t, n, r, i, s) {
            if (s == undefined) s = 1.70158;
            if ((t /= i / 2) < 1) return r / 2 * t * t * (((s *= 1.525) + 1) * t - s) + n;
            return r / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + n
        },
        easeInBounce: function(t, n, r, i, s) {
            return i - e.easing.easeOutBounce(t, s - n, 0, i, s) + r
        },
        easeOutBounce: function(e, t, n, r, i) {
            if ((t /= i) < 1 / 2.75) {
                return r * 7.5625 * t * t + n
            } else if (t < 2 / 2.75) {
                return r * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n
            } else if (t < 2.5 / 2.75) {
                return r * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n
            } else {
                return r * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n
            }
        },
        easeInOutBounce: function(t, n, r, i, s) {
            if (n < s / 2) return e.easing.easeInBounce(t, n * 2, 0, i, s) * .5 + r;
            return e.easing.easeOutBounce(t, n * 2 - s, 0, i, s) * .5 + i * .5 + r
        }
    })
}(jQuery);
var _Path = {
    version: "0.8.4",
    map: function(e) {
        if (_Path.routes.defined.hasOwnProperty(e)) {
            return _Path.routes.defined[e]
        } else {
            return new _Path.core.route(e)
        }
    },
    root: function(e) {
        _Path.routes.root = e
    },
    rescue: function(e) {
        _Path.routes.rescue = e
    },
    history: {
        initial: {},
        pushState: function(e, t, n) {
            if (_Path.history.supported) {
                if (_Path.dispatch(n)) {
                    history.pushState(e, t, n)
                }
            } else {
                if (_Path.history.fallback) {
                    window.location.hash = "#" + n
                }
            }
        },
        popState: function(e) {
            var t = !_Path.history.initial.popped && location.href == _Path.history.initial.URL;
            _Path.history.initial.popped = true;
            if (t) return;
            _Path.dispatch(document.location.pathname)
        },
        listen: function(e) {
            _Path.history.supported = !! (window.history && window.history.pushState);
            _Path.history.fallback = e;
            if (_Path.history.supported) {
                _Path.history.initial.popped = "state" in window.history, _Path.history.initial.URL = location.href;
                window.onpopstate = _Path.history.popState
            } else {
                if (_Path.history.fallback) {
                    for (route in _Path.routes.defined) {
                        if (route.charAt(0) != "#") {
                            _Path.routes.defined["#" + route] = _Path.routes.defined[route];
                            _Path.routes.defined["#" + route].path = "#" + route
                        }
                    }
                    _Path.listen()
                }
            }
        }
    },
    match: function(e, t) {
        var n = {}, r = null,
            i, s, o, u, a;
        for (r in _Path.routes.defined) {
            if (r !== null && r !== undefined) {
                r = _Path.routes.defined[r];
                i = r.partition();
                for (u = 0; u < i.length; u++) {
                    s = i[u];
                    a = e;
                    if (s.search(/:/) > 0) {
                        for (o = 0; o < s.split("/").length; o++) {
                            if (o < a.split("/").length && s.split("/")[o].charAt(0) === ":") {
                                n[s.split("/")[o].replace(/:/, "")] = a.split("/")[o];
                                a = a.replace(a.split("/")[o], s.split("/")[o])
                            }
                        }
                    }
                    if (s === a) {
                        if (t) {
                            r.params = n
                        }
                        return r
                    }
                }
            }
        }
        return null
    },
    dispatch: function(e) {
        var t, n;
        if (_Path.routes.current !== e) {
            _Path.routes.previous = _Path.routes.current;
            _Path.routes.current = e;
            n = _Path.match(e, true);
            if (_Path.routes.previous) {
                t = _Path.match(_Path.routes.previous);
                if (t !== null && t.do_exit !== null) {
                    t.do_exit()
                }
            }
            if (n !== null) {
                n.run();
                return true
            } else {
                if (_Path.routes.rescue !== null) {
                    _Path.routes.rescue()
                }
            }
        }
    },
    listen: function() {
        var e = function() {
            _Path.dispatch(location.hash)
        };
        if (location.hash === "") {
            if (_Path.routes.root !== null) {
                location.hash = _Path.routes.root
            }
        }
        if ("onhashchange" in window && (!document.documentMode || document.documentMode >= 8)) {
            window.onhashchange = e
        } else {
            setInterval(e, 50)
        } if (location.hash !== "") {
            _Path.dispatch(location.hash)
        }
    },
    core: {
        route: function(e) {
            this.path = e;
            this.action = null;
            this.do_enter = [];
            this.do_exit = null;
            this.params = {};
            _Path.routes.defined[e] = this
        }
    },
    routes: {
        current: null,
        root: null,
        rescue: null,
        previous: null,
        defined: {}
    }
};
_Path.core.route.prototype = {
    to: function(e) {
        this.action = e;
        return this
    },
    enter: function(e) {
        if (e instanceof Array) {
            this.do_enter = this.do_enter.concat(e)
        } else {
            this.do_enter.push(e)
        }
        return this
    },
    exit: function(e) {
        this.do_exit = e;
        return this
    },
    partition: function() {
        var e = [],
            t = [],
            n = /\(([^}]+?)\)/g,
            r, i;
        while (r = n.exec(this.path)) {
            e.push(r[1])
        }
        t.push(this.path.split("(")[0]);
        for (i = 0; i < e.length; i++) {
            t.push(t[t.length - 1] + e[i])
        }
        return t
    },
    run: function() {
        var e = false,
            t, n, r;
        if (_Path.routes.defined[this.path].hasOwnProperty("do_enter")) {
            if (_Path.routes.defined[this.path].do_enter.length > 0) {
                for (t = 0; t < _Path.routes.defined[this.path].do_enter.length; t++) {
                    n = _Path.routes.defined[this.path].do_enter[t].apply(this, null);
                    if (n === false) {
                        e = true;
                        break
                    }
                }
            }
        }
        if (!e) {
            _Path.routes.defined[this.path].action()
        }
    }
};
(function(e, t) {
    function n(e, t) {
        e.push.apply(e, t ? {}.toString.call(t) == "[object Array]" ? t : [t] : [])
    }

    function r(e, t, n) {
        for (var r = 0, i = e.length; r < i; ++r) e[r].call(t, n)
    }

    function i(e) {
        if (!(this instanceof i)) return new i(e);
        this.object = e.object;
        this.property = e.property;
        this.from = this._from = e.from || this.object[this.property];
        this.to = {}.toString.call(e.to) == "[object Array]" ? e.to : [e.to];
        this.target = 0;
        this.parser = e.parser || function(e) {
            var t = i.Parsers,
                n, r = [],
                s, o;
            for (s in t) {
                if (t.hasOwnProperty(s)) r.push(t[s])
            }
            r.sort(function(e, t) {
                return (t.priority || 0) - (e.priority || 0)
            });
            for (s = 0, o = r.length; s < o; ++s) {
                n = new r[s];
                if (n.parse(e) != null) return n
            }
            n = new t.Number;
            n.parse(e);
            return n
        }(this.from);
        this.transition = e.transition || i.Transitions.linear;
        this.duration = e.duration || 500;
        this.fps = e.fps || 40;
        this.frameInterval = 1e3 / this.fps;
        this.frames = e.frames || ~~(this.duration / this.frameInterval + .5);
        this.frame = e.frame == t ? -1 : 0;
        this.running = false;
        this.startHandlers = [];
        this.updateHandlers = [];
        this.finishHandlers = [];
        n(this.startHandlers, e.start);
        n(this.updateHandlers, e.update);
        n(this.finishHandlers, e.finish)
    }

    function s(e, t, n) {
        return (t - e) * n + e
    }
    var o = i.prototype,
        u, a, f = e.Viper;
    o.start = function() {
        if (!this.running) {
            this.resume();
            r(this.startHandlers, this, this.object)
        }
        return this
    };
    o.stop = function() {
        if (this.running) {
            this.pause();
            r(this.finishHandlers, this, this.object)
        }
        return this
    };
    o.pause = function(e) {
        if (this.running) {
            this.running = this.time = false;
            clearInterval(this.timer);
            var n = this;
            if (e != t) setTimeout(function() {
                n.resume()
            }, e)
        }
        return this
    };
    o.resume = function() {
        if (!this.running && this.frame < this.frames) {
            var e = this;
            this.timer = setInterval(function() {
                e.step(+(new Date))
            }, this.frameInterval);
            this.running = true
        }
        return this
    };
    o.step = function(e) {
        this.frame += (e - (this.time || e)) / this.frameInterval;
        this.time = e;
        this.object[this.property] = this.parser.compute(this.from, this.to[this.target], this.frame < this.frames ? this.transition(this.frame / this.frames) : 1);
        r(this.updateHandlers, this, this.object);
        if (this.frame >= this.frames) {
            this.frame = this.time = 0;
            this.parser.parse(this.from = this.to[this.target++]);
            if (this.to[this.target] == t) {
                this.parser.parse(this.from = this._from);
                this.target = 0;
                this.stop()
            }
        }
    };
    i.Transitions = {
        linear: function(e) {
            return e
        },
        sine: function(e) {
            return 1 - Math.cos(e * Math.PI / 2)
        },
        elastic: function(e) {
            return Math.pow(2, 10 * --e) * Math.cos(20 * e * Math.PI / 3)
        },
        bounce: function(e) {
            var t = 0,
                n = 1,
                r;
            while (e < (7 - 4 * t) / 11) {
                t += n;
                n /= 2
            }
            r = (11 - 6 * t - 11 * e) / 4;
            return n * n - r * r
        }
    };
    for (a in i.Transitions) {
        if (i.Transitions.hasOwnProperty(a)) {
            u = i.Transitions[a];
            u.out = function(e) {
                return function(t) {
                    return 1 - e(1 - t)
                }
            }(u);
            u.inOut = function(e) {
                return function(t) {
                    return (t > .5 ? 2 - e(2 * (1 - t)) : e(2 * t)) / 2
                }
            }(u)
        }
    }
    i.Parsers = {
        Number: function() {
            this.parse = function(e, n) {
                e += "";
                var r = /(\D*)(\d+)(.*)?/.exec(e) || [, , "x" - 2],
                    i = parseFloat(r[2]);
                if (!n) {
                    this.prefix = r[1] || "";
                    this.suffix = r[3] || "";
                    this.value = i
                }
                return isNaN(i) ? t : i
            };
            this.compute = function(e, t, n) {
                return this.prefix + s(this.value, this.parse(t, true), n) + this.suffix
            }
        },
        Color: function() {
            this.parse = function(e, t) {
                var n = parseInt,
                    r;
                if (/^#[\da-f]{6}$/i.test(e)) r = [n(e.substring(1, 3), 16), n(e.substring(3, 5), 16), n(e.substring(5, 7), 16)];
                else if (r = /^(rgb\()?(\d+),\s*(\d+),\s*(\d+)\)?$/.exec(e)) r = [n(r[2]), n(r[3]), n(r[4])];
                if (!t) this.value = r;
                return r
            };
            this.compute = function(e, t, n) {
                for (var r = [], i = this.parse(t, true), o = 0, u = this.value.length; o < u; ++o) r.push(~~(s(this.value[o], i[o], n) + .5));
                return "rgb(" + r + ")"
            }
        },
        String: function() {
            this.parse = function(e) {
                return "" + e
            };
            this.compute = function(e, t, n) {
                e += "";
                t += "";
                var r = ~~ (t.length * n + .5);
                return t.substr(0, r) + e.substr(r, e.length - r - ~~((e.length - t.length) * n + .5))
            }
        }
    };
    i.Parsers.Color.priority = 1;
    i.Parsers.String.priority = -9;
    i.noConflict = function() {
        e.Viper = f;
        return i
    };
    e.Viper = i
})(this);
var paper = new function() {
        var Base = new function() {
                function e(e, t, n) {
                    if (m) {
                        try {
                            delete e[t];
                            return m(e, t, n)
                        } catch (r) {}
                    }
                    if ((n.get || n.set) && e.__defineGetter__) {
                        n.get && e.__defineGetter__(t, n.get);
                        n.set && e.__defineSetter__(t, n.set)
                    } else {
                        e[t] = n.value
                    }
                    return e
                }

                function t(e, t) {
                    if (g) {
                        try {
                            return g(e, t)
                        } catch (n) {}
                    }
                    var r = e.__lookupGetter__ && e.__lookupGetter__(t);
                    return r ? {
                        get: r,
                        set: e.__lookupSetter__(t),
                        enumerable: true,
                        configurable: true
                    } : l.call(e, t) ? {
                        value: e[t],
                        enumerable: true,
                        configurable: true,
                        writable: true
                    } : null
                }

                function n(n, r, i, s, o, u) {
                    function f(u, a, f, d) {
                        var a = a || (a = t(r, u)) && (a.get ? a : a.value),
                            v = typeof a === "function",
                            m = a,
                            g = o || v ? a && a.get ? u in n : n[u] : null;
                        if (d && v && (!o || !d[u])) {
                            d[u] = function(e) {
                                return e && n[u].apply(e, p.call(arguments, 1))
                            }
                        }
                        if ((f || a !== undefined && l.call(r, u)) && (!o || !g)) {
                            if (v) {
                                if (g && /\bthis\.base\b/.test(a)) {
                                    var y = s && s[u] == g;
                                    m = function() {
                                        var n = t(this, "base");
                                        e(this, "base", {
                                            value: y ? s[u] : g,
                                            configurable: true
                                        });
                                        try {
                                            return a.apply(this, arguments)
                                        } finally {
                                            n ? e(this, "base", n) : delete this.base
                                        }
                                    };
                                    m.toString = function() {
                                        return a.toString()
                                    };
                                    m.valueOf = function() {
                                        return a.valueOf()
                                    }
                                }
                                if (c && a.length == 0 && (h = u.match(/^(get|is)(([A-Z])(.*))$/))) c.push([h[3].toLowerCase() + h[4], h[2]])
                            }
                            if (!m || v || !m.get && !m.set) m = {
                                value: m,
                                writable: true
                            };
                            if ((t(n, u) || {
                                configurable: true
                            }).configurable) {
                                m.configurable = true;
                                m.enumerable = i
                            }
                            e(n, u, m)
                        }
                    }
                    var c, h;
                    if (r) {
                        c = [];
                        for (var d in r)
                            if (l.call(r, d) && !a.test(d)) f(d, null, true, u);
                        f("toString");
                        f("valueOf");
                        for (var v = 0, m = c && c.length; v < m; v++) try {
                            var h = c[v],
                                g = h[1];
                            f(h[0], {
                                get: n["get" + g] || n["is" + g],
                                set: n["set" + g]
                            }, true)
                        } catch (y) {}
                    }
                    return n
                }

                function r(t) {
                    var n = function(r) {
                        if (u) e(this, "__proto__", {
                            value: t
                        });
                        if (this.initialize && r !== n.dont) return this.initialize.apply(this, arguments)
                    };
                    n.prototype = t;
                    n.toString = function() {
                        return (this.prototype.initialize || function() {}).toString()
                    };
                    return n
                }

                function i(e) {
                    return !e ? function(e) {
                        return e
                    } : typeof e !== "function" ? function(t) {
                        return t == e
                    } : e
                }

                function s(e, t, n, r) {
                    try {
                        if (e)(r || r === undefined && h(e) ? d : v).call(e, i(t), n = n || e)
                    } catch (s) {
                        if (s !== Base.stop) throw s
                    }
                    return n
                }

                function o(e) {
                    return s(e, function(e, t) {
                        this[t] = e
                    }, new e.constructor)
                }
                var u = !this.__proto__,
                    a = /^(statics|generics|preserve|enumerable|prototype|__proto__|toString|valueOf)$/,
                    f = Object.prototype,
                    l = u ? function(e) {
                        return e !== "__proto__" && this.hasOwnProperty(e)
                    } : f.hasOwnProperty,
                    c = f.toString,
                    f = Array.prototype,
                    h = Array.isArray = Array.isArray || function(e) {
                        return c.call(e) === "[object Array]"
                    }, p = f.slice,
                    d = f.forEach = f.forEach || function(e, t) {
                        for (var n = 0, r = this.length; n < r; n++) e.call(t, this[n], n, this)
                    }, v = function(e, t) {
                        for (var n in this)
                            if (this.hasOwnProperty(n)) e.call(t, this[n], n, this)
                    }, m = Object.defineProperty,
                    g = Object.getOwnPropertyDescriptor;
                return n(function() {}, {
                    inject: function(e) {
                        if (e) {
                            var t = this.prototype,
                                r = t.__proto__ && t.__proto__.constructor,
                                i = e.statics == true ? e : e.statics;
                            if (i != e) n(t, e, e.enumerable, r && r.prototype, e.preserve, e.generics && this);
                            n(this, i, true, r, e.preserve)
                        }
                        for (var s = 1, o = arguments.length; s < o; s++) this.inject(arguments[s]);
                        return this
                    },
                    extend: function(t) {
                        var i = new this(this.dont),
                            s = r(i);
                        e(i, "constructor", {
                            value: s,
                            writable: true,
                            configurable: true
                        });
                        s.dont = {};
                        n(s, this, true);
                        return arguments.length ? this.inject.apply(s, arguments) : s
                    }
                }, true).inject({
                    has: l,
                    each: s,
                    inject: function() {
                        for (var e = 0, t = arguments.length; e < t; e++) n(this, arguments[e]);
                        return this
                    },
                    extend: function() {
                        var e = new(r(this));
                        return e.inject.apply(e, arguments)
                    },
                    each: function(e, t) {
                        return s(this, e, t)
                    },
                    clone: function() {
                        return o(this)
                    },
                    statics: {
                        each: s,
                        clone: o,
                        define: e,
                        describe: t,
                        iterator: i,
                        has: function(e, t) {
                            return l.call(e, t)
                        },
                        type: function(e) {
                            return (e || e === 0) && (e._type || typeof e) || null
                        },
                        check: function(e) {
                            return !!(e || e === 0)
                        },
                        pick: function() {
                            for (var e = 0, t = arguments.length; e < t; e++)
                                if (arguments[e] !== undefined) return arguments[e];
                            return null
                        },
                        stop: {}
                    }
                })
            };
        this.Base = Base.inject({
            generics: true,
            clone: function() {
                return new this.constructor(this)
            },
            toString: function() {
                return "{ " + Base.each(this, function(e, t) {
                    if (t.charAt(0) != "_") {
                        var n = typeof e;
                        this.push(t + ": " + (n === "number" ? Base.formatNumber(e) : n === "string" ? "'" + e + "'" : e))
                    }
                }, []).join(", ") + " }"
            },
            statics: {
                read: function(e, t, n) {
                    var t = t || 0,
                        n = n || e.length - t;
                    var r = e[t];
                    if (r instanceof this || this.prototype._readNull && r == null && n <= 1) return r;
                    r = new this(this.dont);
                    return r.initialize.apply(r, t > 0 || n < e.length ? Array.prototype.slice.call(e, t, t + n) : e) || r
                },
                readAll: function(e, t) {
                    var n = [],
                        r;
                    for (var i = t || 0, s = e.length; i < s; i++) {
                        n.push(Array.isArray(r = e[i]) ? this.read(r, 0) : this.read(e, i, 1))
                    }
                    return n
                },
                splice: function(e, t, n, r) {
                    var i = t && t.length,
                        s = n === undefined;
                    n = s ? e.length : n;
                    for (var o = 0; o < i; o++) t[o]._index = n + o;
                    if (s) {
                        e.push.apply(e, t);
                        return []
                    } else {
                        var u = [n, r];
                        if (t) u.push.apply(u, t);
                        var a = e.splice.apply(e, u);
                        for (var o = 0, f = a.length; o < f; o++) delete a[o]._index;
                        for (var o = n + i, f = e.length; o < f; o++) e[o]._index = o;
                        return a
                    }
                },
                merge: function() {
                    return Base.each(arguments, function(e) {
                        Base.each(e, function(e, t) {
                            this[t] = e
                        }, this)
                    }, new Base, true)
                },
                capitalize: function(e) {
                    return e.replace(/\b[a-z]/g, function(e) {
                        return e.toUpperCase()
                    })
                },
                camelize: function(e) {
                    return e.replace(/-(\w)/g, function(e, t) {
                        return t.toUpperCase()
                    })
                },
                hyphenate: function(e) {
                    return e.replace(/[a-z][A-Z0-9]|[0-9][a-zA-Z]|[A-Z]{2}[a-z]/g, function(e) {
                        return e.charAt(0) + "-" + e.substring(1)
                    }).toLowerCase()
                },
                formatNumber: function(e) {
                    return (Math.round(e * 1e5) / 1e5).toString()
                }
            }
        });
        var PaperScope = this.PaperScope = Base.extend({
            initialize: function(e) {
                paper = this;
                this.view = null;
                this.views = [];
                this.project = null;
                this.projects = [];
                this.tool = null;
                this.tools = [];
                this._id = e && (e.getAttribute("id") || e.src) || "paperscope-" + PaperScope._id++;
                if (e) e.setAttribute("id", this._id);
                PaperScope._scopes[this._id] = this
            },
            version: .22,
            evaluate: function(e) {
                var t = PaperScript.evaluate(e, this);
                View.updateFocus();
                return t
            },
            install: function(e) {
                var t = this;
                Base.each(["project", "view", "tool"], function(n) {
                    Base.define(e, n, {
                        configurable: true,
                        writable: true,
                        get: function() {
                            return t[n]
                        }
                    })
                });
                for (var n in this) {
                    if (!/^(version|_id|load)/.test(n) && !(n in e)) e[n] = this[n]
                }
            },
            setup: function(e) {
                paper = this;
                this.project = new Project;
                if (e) this.view = new View(e)
            },
            clear: function() {
                for (var e = this.projects.length - 1; e >= 0; e--) this.projects[e].remove();
                for (var e = this.views.length - 1; e >= 0; e--) this.views[e].remove();
                for (var e = this.tools.length - 1; e >= 0; e--) this.tools[e].remove()
            },
            remove: function() {
                this.clear();
                delete PaperScope._scopes[this._id]
            },
            _needsRedraw: function() {
                if (!this._redrawNotified) {
                    for (var e = this.views.length - 1; e >= 0; e--) this.views[e]._redrawNeeded = true;
                    this._redrawNotified = true
                }
            },
            statics: {
                _scopes: {},
                _id: 0,
                get: function(e) {
                    if (typeof e === "object") e = e.getAttribute("id");
                    return this._scopes[e] || null
                },
                each: function(e) {
                    Base.each(this._scopes, e)
                }
            }
        });
        var PaperScopeItem = Base.extend({
            initialize: function(e) {
                this._scope = paper;
                this._index = this._scope[this._list].push(this) - 1;
                if (e || !this._scope[this._reference]) this.activate()
            },
            activate: function() {
                if (!this._scope) return false;
                this._scope[this._reference] = this;
                return true
            },
            remove: function() {
                if (this._index == null) return false;
                Base.splice(this._scope[this._list], null, this._index, 1);
                if (this._scope[this._reference] == this) this._scope[this._reference] = null;
                this._scope = null;
                return true
            }
        });
        var Point = this.Point = Base.extend({
            initialize: function(e, t) {
                if (t !== undefined) {
                    this.x = e;
                    this.y = t
                } else if (e !== undefined) {
                    if (e == null) {
                        this.x = this.y = 0
                    } else if (e.x !== undefined) {
                        this.x = e.x;
                        this.y = e.y
                    } else if (e.width !== undefined) {
                        this.x = e.width;
                        this.y = e.height
                    } else if (Array.isArray(e)) {
                        this.x = e[0];
                        this.y = e.length > 1 ? e[1] : e[0]
                    } else if (e.angle !== undefined) {
                        this.x = e.length;
                        this.y = 0;
                        this.setAngle(e.angle)
                    } else if (typeof e === "number") {
                        this.x = this.y = e
                    } else {
                        this.x = this.y = 0
                    }
                } else {
                    this.x = this.y = 0
                }
            },
            set: function(e, t) {
                this.x = e;
                this.y = t;
                return this
            },
            clone: function() {
                return Point.create(this.x, this.y)
            },
            toString: function() {
                var e = Base.formatNumber;
                return "{ x: " + e(this.x) + ", y: " + e(this.y) + " }"
            },
            add: function(e) {
                e = Point.read(arguments);
                return Point.create(this.x + e.x, this.y + e.y)
            },
            subtract: function(e) {
                e = Point.read(arguments);
                return Point.create(this.x - e.x, this.y - e.y)
            },
            multiply: function(e) {
                e = Point.read(arguments);
                return Point.create(this.x * e.x, this.y * e.y)
            },
            divide: function(e) {
                e = Point.read(arguments);
                return Point.create(this.x / e.x, this.y / e.y)
            },
            modulo: function(e) {
                e = Point.read(arguments);
                return Point.create(this.x % e.x, this.y % e.y)
            },
            negate: function() {
                return Point.create(-this.x, -this.y)
            },
            transform: function(e) {
                return e ? e._transformPoint(this) : this
            },
            getDistance: function(e, t) {
                e = Point.read(arguments);
                var n = e.x - this.x,
                    r = e.y - this.y,
                    i = n * n + r * r;
                return t ? i : Math.sqrt(i)
            },
            getLength: function() {
                var e = this.x * this.x + this.y * this.y;
                return arguments[0] ? e : Math.sqrt(e)
            },
            setLength: function(e) {
                if (this.isZero()) {
                    var t = this._angle || 0;
                    this.set(Math.cos(t) * e, Math.sin(t) * e)
                } else {
                    var n = e / this.getLength();
                    if (n == 0) this.getAngle();
                    this.set(this.x * n, this.y * n)
                }
                return this
            },
            normalize: function(e) {
                if (e === undefined) e = 1;
                var t = this.getLength(),
                    n = t != 0 ? e / t : 0,
                    r = Point.create(this.x * n, this.y * n);
                r._angle = this._angle;
                return r
            },
            getAngle: function() {
                return this.getAngleInRadians(arguments[0]) * 180 / Math.PI
            },
            setAngle: function(e) {
                e = this._angle = e * Math.PI / 180;
                if (!this.isZero()) {
                    var t = this.getLength();
                    this.set(Math.cos(e) * t, Math.sin(e) * t)
                }
                return this
            },
            getAngleInRadians: function() {
                if (arguments[0] === undefined) {
                    if (this._angle == null) this._angle = Math.atan2(this.y, this.x);
                    return this._angle
                } else {
                    var e = Point.read(arguments),
                        t = this.getLength() * e.getLength();
                    if (t == 0) {
                        return NaN
                    } else {
                        return Math.acos(this.dot(e) / t)
                    }
                }
            },
            getAngleInDegrees: function() {
                return this.getAngle(arguments[0])
            },
            getQuadrant: function() {
                return this.x >= 0 ? this.y >= 0 ? 1 : 4 : this.y >= 0 ? 2 : 3
            },
            getDirectedAngle: function(e) {
                e = Point.read(arguments);
                return Math.atan2(this.cross(e), this.dot(e)) * 180 / Math.PI
            },
            rotate: function(e, t) {
                e = e * Math.PI / 180;
                var n = t ? this.subtract(t) : this,
                    r = Math.sin(e),
                    i = Math.cos(e);
                n = Point.create(n.x * i - n.y * r, n.y * i + n.x * r);
                return t ? n.add(t) : n
            },
            equals: function(e) {
                e = Point.read(arguments);
                return this.x == e.x && this.y == e.y
            },
            isInside: function(e) {
                return e.contains(this)
            },
            isClose: function(e, t) {
                return this.getDistance(e) < t
            },
            isColinear: function(e) {
                return this.cross(e) < Numerical.TOLERANCE
            },
            isOrthogonal: function(e) {
                return this.dot(e) < Numerical.TOLERANCE
            },
            isZero: function() {
                return this.x == 0 && this.y == 0
            },
            isNaN: function() {
                return isNaN(this.x) || isNaN(this.y)
            },
            dot: function(e) {
                e = Point.read(arguments);
                return this.x * e.x + this.y * e.y
            },
            cross: function(e) {
                e = Point.read(arguments);
                return this.x * e.y - this.y * e.x
            },
            project: function(e) {
                e = Point.read(arguments);
                if (e.isZero()) {
                    return Point.create(0, 0)
                } else {
                    var t = this.dot(e) / e.dot(e);
                    return Point.create(e.x * t, e.y * t)
                }
            },
            statics: {
                create: function(e, t) {
                    var n = new Point(Point.dont);
                    n.x = e;
                    n.y = t;
                    return n
                },
                min: function(e, t) {
                    e = Point.read(arguments, 0, 1);
                    t = Point.read(arguments, 1, 1);
                    return Point.create(Math.min(e.x, t.x), Math.min(e.y, t.y))
                },
                max: function(e, t) {
                    e = Point.read(arguments, 0, 1);
                    t = Point.read(arguments, 1, 1);
                    return Point.create(Math.max(e.x, t.x), Math.max(e.y, t.y))
                },
                random: function() {
                    return Point.create(Math.random(), Math.random())
                }
            }
        }, new function() {
            return Base.each(["round", "ceil", "floor", "abs"], function(e) {
                var t = Math[e];
                this[e] = function() {
                    return Point.create(t(this.x), t(this.y))
                }
            }, {})
        });
        var LinkedPoint = Point.extend({
            set: function(e, t, n) {
                this._x = e;
                this._y = t;
                if (!n) this._owner[this._setter](this);
                return this
            },
            getX: function() {
                return this._x
            },
            setX: function(e) {
                this._x = e;
                this._owner[this._setter](this)
            },
            getY: function() {
                return this._y
            },
            setY: function(e) {
                this._y = e;
                this._owner[this._setter](this)
            },
            statics: {
                create: function(e, t, n, r, i) {
                    if (i) return Point.create(n, r);
                    var s = new LinkedPoint(LinkedPoint.dont);
                    s._x = n;
                    s._y = r;
                    s._owner = e;
                    s._setter = t;
                    return s
                }
            }
        });
        var Size = this.Size = Base.extend({
            initialize: function(e, t) {
                if (t !== undefined) {
                    this.width = e;
                    this.height = t
                } else if (e !== undefined) {
                    if (e == null) {
                        this.width = this.height = 0
                    } else if (e.width !== undefined) {
                        this.width = e.width;
                        this.height = e.height
                    } else if (e.x !== undefined) {
                        this.width = e.x;
                        this.height = e.y
                    } else if (Array.isArray(e)) {
                        this.width = e[0];
                        this.height = e.length > 1 ? e[1] : e[0]
                    } else if (typeof e === "number") {
                        this.width = this.height = e
                    } else {
                        this.width = this.height = 0
                    }
                } else {
                    this.width = this.height = 0
                }
            },
            toString: function() {
                var e = Base.formatNumber;
                return "{ width: " + e(this.width) + ", height: " + e(this.height) + " }"
            },
            set: function(e, t) {
                this.width = e;
                this.height = t;
                return this
            },
            clone: function() {
                return Size.create(this.width, this.height)
            },
            add: function(e) {
                e = Size.read(arguments);
                return Size.create(this.width + e.width, this.height + e.height)
            },
            subtract: function(e) {
                e = Size.read(arguments);
                return Size.create(this.width - e.width, this.height - e.height)
            },
            multiply: function(e) {
                e = Size.read(arguments);
                return Size.create(this.width * e.width, this.height * e.height)
            },
            divide: function(e) {
                e = Size.read(arguments);
                return Size.create(this.width / e.width, this.height / e.height)
            },
            modulo: function(e) {
                e = Size.read(arguments);
                return Size.create(this.width % e.width, this.height % e.height)
            },
            negate: function() {
                return Size.create(-this.width, -this.height)
            },
            equals: function(e) {
                e = Size.read(arguments);
                return this.width == e.width && this.height == e.height
            },
            isZero: function() {
                return this.width == 0 && this.height == 0
            },
            isNaN: function() {
                return isNaN(this.width) || isNaN(this.height)
            },
            statics: {
                create: function(e, t) {
                    return (new Size(Size.dont)).set(e, t)
                },
                min: function(e, t) {
                    return Size.create(Math.min(e.width, t.width), Math.min(e.height, t.height))
                },
                max: function(e, t) {
                    return Size.create(Math.max(e.width, t.width), Math.max(e.height, t.height))
                },
                random: function() {
                    return Size.create(Math.random(), Math.random())
                }
            }
        }, new function() {
            return Base.each(["round", "ceil", "floor", "abs"], function(e) {
                var t = Math[e];
                this[e] = function() {
                    return Size.create(t(this.width), t(this.height))
                }
            }, {})
        });
        var LinkedSize = Size.extend({
            set: function(e, t, n) {
                this._width = e;
                this._height = t;
                if (!n) this._owner[this._setter](this);
                return this
            },
            getWidth: function() {
                return this._width
            },
            setWidth: function(e) {
                this._width = e;
                this._owner[this._setter](this)
            },
            getHeight: function() {
                return this._height
            },
            setHeight: function(e) {
                this._height = e;
                this._owner[this._setter](this)
            },
            statics: {
                create: function(e, t, n, r, i) {
                    if (i) return Size.create(n, r);
                    var s = new LinkedSize(LinkedSize.dont);
                    s._width = n;
                    s._height = r;
                    s._owner = e;
                    s._setter = t;
                    return s
                }
            }
        });
        var Rectangle = this.Rectangle = Base.extend({
            initialize: function(e, t, n, r) {
                if (arguments.length == 4) {
                    this.x = e;
                    this.y = t;
                    this.width = n;
                    this.height = r
                } else if (arguments.length == 2) {
                    if (t && t.x !== undefined) {
                        var i = Point.read(arguments, 0, 1);
                        var s = Point.read(arguments, 1, 1);
                        this.x = i.x;
                        this.y = i.y;
                        this.width = s.x - i.x;
                        this.height = s.y - i.y;
                        if (this.width < 0) {
                            this.x = s.x;
                            this.width = -this.width
                        }
                        if (this.height < 0) {
                            this.y = s.y;
                            this.height = -this.height
                        }
                    } else {
                        var o = Point.read(arguments, 0, 1);
                        var u = Size.read(arguments, 1, 1);
                        this.x = o.x;
                        this.y = o.y;
                        this.width = u.width;
                        this.height = u.height
                    }
                } else if (e) {
                    this.x = e.x || 0;
                    this.y = e.y || 0;
                    this.width = e.width || 0;
                    this.height = e.height || 0
                } else {
                    this.x = this.y = this.width = this.height = 0
                }
            },
            set: function(e, t, n, r) {
                this.x = e;
                this.y = t;
                this.width = n;
                this.height = r;
                return this
            },
            getPoint: function() {
                return LinkedPoint.create(this, "setPoint", this.x, this.y, arguments[0])
            },
            setPoint: function(e) {
                e = Point.read(arguments);
                this.x = e.x;
                this.y = e.y;
                return this
            },
            getSize: function() {
                return LinkedSize.create(this, "setSize", this.width, this.height, arguments[0])
            },
            setSize: function(e) {
                e = Size.read(arguments);
                this.width = e.width;
                this.height = e.height;
                return this
            },
            getLeft: function() {
                return this.x
            },
            setLeft: function(e) {
                this.width -= e - this.x;
                this.x = e;
                return this
            },
            getTop: function() {
                return this.y
            },
            setTop: function(e) {
                this.height -= e - this.y;
                this.y = e;
                return this
            },
            getRight: function() {
                return this.x + this.width
            },
            setRight: function(e) {
                this.width = e - this.x;
                return this
            },
            getBottom: function() {
                return this.y + this.height
            },
            setBottom: function(e) {
                this.height = e - this.y;
                return this
            },
            getCenterX: function() {
                return this.x + this.width * .5
            },
            setCenterX: function(e) {
                this.x = e - this.width * .5;
                return this
            },
            getCenterY: function() {
                return this.y + this.height * .5
            },
            setCenterY: function(e) {
                this.y = e - this.height * .5;
                return this
            },
            getCenter: function() {
                return LinkedPoint.create(this, "setCenter", this.getCenterX(), this.getCenterY(), arguments[0])
            },
            setCenter: function(e) {
                e = Point.read(arguments);
                return this.setCenterX(e.x).setCenterY(e.y)
            },
            equals: function(e) {
                e = Rectangle.read(arguments);
                return this.x == e.x && this.y == e.y && this.width == e.width && this.height == e.height
            },
            isEmpty: function() {
                return this.width == 0 || this.height == 0
            },
            toString: function() {
                var e = Base.formatNumber;
                return "{ x: " + e(this.x) + ", y: " + e(this.y) + ", width: " + e(this.width) + ", height: " + e(this.height) + " }"
            },
            contains: function(e) {
                return e && e.width !== undefined || (Array.isArray(e) ? e : arguments).length == 4 ? this._containsRectangle(Rectangle.read(arguments)) : this._containsPoint(Point.read(arguments))
            },
            _containsPoint: function(e) {
                var t = e.x,
                    n = e.y;
                return t >= this.x && n >= this.y && t <= this.x + this.width && n <= this.y + this.height
            },
            _containsRectangle: function(e) {
                var t = e.x,
                    n = e.y;
                return t >= this.x && n >= this.y && t + e.width <= this.x + this.width && n + e.height <= this.y + this.height
            },
            intersects: function(e) {
                e = Rectangle.read(arguments);
                return e.x + e.width > this.x && e.y + e.height > this.y && e.x < this.x + this.width && e.y < this.y + this.height
            },
            intersect: function(e) {
                e = Rectangle.read(arguments);
                var t = Math.max(this.x, e.x),
                    n = Math.max(this.y, e.y),
                    r = Math.min(this.x + this.width, e.x + e.width),
                    i = Math.min(this.y + this.height, e.y + e.height);
                return Rectangle.create(t, n, r - t, i - n)
            },
            unite: function(e) {
                e = Rectangle.read(arguments);
                var t = Math.min(this.x, e.x),
                    n = Math.min(this.y, e.y),
                    r = Math.max(this.x + this.width, e.x + e.width),
                    i = Math.max(this.y + this.height, e.y + e.height);
                return Rectangle.create(t, n, r - t, i - n)
            },
            include: function(e) {
                e = Point.read(arguments);
                var t = Math.min(this.x, e.x),
                    n = Math.min(this.y, e.y),
                    r = Math.max(this.x + this.width, e.x),
                    i = Math.max(this.y + this.height, e.y);
                return Rectangle.create(t, n, r - t, i - n)
            },
            expand: function(e, t) {
                if (t === undefined) t = e;
                return Rectangle.create(this.x - e / 2, this.y - t / 2, this.width + e, this.height + t)
            },
            scale: function(e, t) {
                return this.expand(this.width * e - this.width, this.height * (t === undefined ? e : t) - this.height)
            },
            statics: {
                create: function(e, t, n, r) {
                    return (new Rectangle(Rectangle.dont)).set(e, t, n, r)
                }
            }
        }, new function() {
            return Base.each([
                ["Top", "Left"],
                ["Top", "Right"],
                ["Bottom", "Left"],
                ["Bottom", "Right"],
                ["Left", "Center"],
                ["Top", "Center"],
                ["Right", "Center"],
                ["Bottom", "Center"]
            ], function(e, t) {
                var n = e.join("");
                var r = /^[RL]/.test(n);
                if (t >= 4) e[1] += r ? "Y" : "X";
                var i = e[r ? 0 : 1],
                    s = e[r ? 1 : 0],
                    o = "get" + i,
                    u = "get" + s,
                    a = "set" + i,
                    f = "set" + s,
                    l = "get" + n,
                    c = "set" + n;
                this[l] = function() {
                    return LinkedPoint.create(this, c, this[o](), this[u](), arguments[0])
                };
                this[c] = function(e) {
                    e = Point.read(arguments);
                    return this[a](e.x)[f](e.y)
                }
            }, {})
        });
        var LinkedRectangle = Rectangle.extend({
            set: function(e, t, n, r, i) {
                this._x = e;
                this._y = t;
                this._width = n;
                this._height = r;
                if (!i) this._owner[this._setter](this);
                return this
            },
            statics: {
                create: function(e, t, n, r, i, s) {
                    var o = (new LinkedRectangle(LinkedRectangle.dont)).set(n, r, i, s, true);
                    o._owner = e;
                    o._setter = t;
                    return o
                }
            }
        }, new function() {
            var e = Rectangle.prototype;
            return Base.each(["x", "y", "width", "height"], function(e) {
                var t = Base.capitalize(e);
                var n = "_" + e;
                this["get" + t] = function() {
                    return this[n]
                };
                this["set" + t] = function(e) {
                    this[n] = e;
                    if (!this._dontNotify) this._owner[this._setter](this)
                }
            }, Base.each(["Point", "Size", "Center", "Left", "Top", "Right", "Bottom", "CenterX", "CenterY", "TopLeft", "TopRight", "BottomLeft", "BottomRight", "LeftCenter", "TopCenter", "RightCenter", "BottomCenter"], function(t) {
                var n = "set" + t;
                this[n] = function(t) {
                    this._dontNotify = true;
                    e[n].apply(this, arguments);
                    delete this._dontNotify;
                    this._owner[this._setter](this);
                    return this
                }
            }, {}))
        });
        var Matrix = this.Matrix = Base.extend({
            initialize: function(e) {
                var t = arguments.length,
                    n = true;
                if (t == 6) {
                    this.set.apply(this, arguments)
                } else if (t == 1) {
                    if (e instanceof Matrix) {
                        this.set(e._a, e._c, e._b, e._d, e._tx, e._ty)
                    } else if (Array.isArray(e)) {
                        this.set.apply(this, e)
                    } else {
                        n = false
                    }
                } else if (t == 0) {
                    this._a = this._d = 1;
                    this._c = this._b = this._tx = this._ty = 0
                } else {
                    n = false
                } if (!n) throw new Error("Unsupported matrix parameters")
            },
            clone: function() {
                return Matrix.create(this._a, this._c, this._b, this._d, this._tx, this._ty)
            },
            set: function(e, t, n, r, i, s) {
                this._a = e;
                this._c = t;
                this._b = n;
                this._d = r;
                this._tx = i;
                this._ty = s;
                return this
            },
            scale: function(e, t, n) {
                if (arguments.length < 2 || typeof t === "object") {
                    n = Point.read(arguments, 1);
                    t = e
                } else {
                    n = Point.read(arguments, 2)
                } if (n) this.translate(n);
                this._a *= e;
                this._c *= e;
                this._b *= t;
                this._d *= t;
                if (n) this.translate(n.negate());
                return this
            },
            translate: function(e) {
                e = Point.read(arguments);
                var t = e.x,
                    n = e.y;
                this._tx += t * this._a + n * this._b;
                this._ty += t * this._c + n * this._d;
                return this
            },
            rotate: function(e, t) {
                return this.concatenate(Matrix.getRotateInstance.apply(Matrix, arguments))
            },
            shear: function(e, t, n) {
                if (arguments.length < 2 || typeof t === "object") {
                    n = Point.read(arguments, 1);
                    t = e
                } else {
                    n = Point.read(arguments, 2)
                } if (n) this.translate(n);
                var r = this._a,
                    i = this._c;
                this._a += t * this._b;
                this._c += t * this._d;
                this._b += e * r;
                this._d += e * i;
                if (n) this.translate(n.negate());
                return this
            },
            toString: function() {
                var e = Base.formatNumber;
                return "[[" + [e(this._a), e(this._b), e(this._tx)].join(", ") + "], [" + [e(this._c), e(this._d), e(this._ty)].join(", ") + "]]"
            },
            getValues: function() {
                return [this._a, this._c, this._b, this._d, this._tx, this._ty]
            },
            concatenate: function(e) {
                var t = this._a,
                    n = this._b,
                    r = this._c,
                    i = this._d;
                this._a = e._a * t + e._c * n;
                this._b = e._b * t + e._d * n;
                this._tx += e._tx * t + e._ty * n;
                this._c = e._a * r + e._c * i;
                this._d = e._b * r + e._d * i;
                this._ty += e._tx * r + e._ty * i;
                return this
            },
            preConcatenate: function(e) {
                var t = this._a,
                    n = this._b,
                    r = this._c,
                    i = this._d,
                    s = this._tx,
                    o = this._ty;
                this._a = e._a * t + e._b * r;
                this._c = e._c * t + e._d * r;
                this._b = e._a * n + e._b * i;
                this._d = e._c * n + e._d * i;
                this._tx = e._a * s + e._b * o + e._tx;
                this._ty = e._c * s + e._d * o + e._ty;
                return this
            },
            transform: function(e, t, n, r, i) {
                return arguments.length < 5 ? this._transformPoint(Point.read(arguments)) : this._transformCoordinates(e, t, n, r, i)
            },
            _transformPoint: function(e, t, n) {
                var r = e.x,
                    i = e.y;
                if (!t) t = new Point(Point.dont);
                return t.set(r * this._a + i * this._b + this._tx, r * this._c + i * this._d + this._ty, n)
            },
            _transformCoordinates: function(e, t, n, r, i) {
                var s = t,
                    o = r,
                    u = t + 2 * i;
                while (s < u) {
                    var a = e[s++];
                    var f = e[s++];
                    n[o++] = a * this._a + f * this._b + this._tx;
                    n[o++] = a * this._c + f * this._d + this._ty
                }
                return n
            },
            _transformCorners: function(e) {
                var t = e.x,
                    n = e.y,
                    r = t + e.width,
                    i = n + e.height,
                    s = [t, n, r, n, r, i, t, i];
                return this._transformCoordinates(s, 0, s, 0, 4)
            },
            _transformBounds: function(e) {
                var t = this._transformCorners(e),
                    n = t.slice(0, 2),
                    r = t.slice(0);
                for (var i = 2; i < 8; i++) {
                    var s = t[i],
                        o = i & 1;
                    if (s < n[o]) n[o] = s;
                    else if (s > r[o]) r[o] = s
                }
                return Rectangle.create(n[0], n[1], r[0] - n[0], r[1] - n[1])
            },
            inverseTransform: function(e) {
                return this._inverseTransform(Point.read(arguments))
            },
            _getDeterminant: function() {
                var e = this._a * this._d - this._b * this._c;
                return isFinite(e) && Math.abs(e) > Numerical.EPSILON && isFinite(this._tx) && isFinite(this._ty) ? e : null
            },
            _inverseTransform: function(e, t, n) {
                var r = this._getDeterminant();
                if (!r) return null;
                var i = e.x - this._tx,
                    s = e.y - this._ty;
                if (!t) t = new Point(Point.dont);
                return t.set((i * this._d - s * this._b) / r, (s * this._a - i * this._c) / r, n)
            },
            getTranslation: function() {
                return new Point(this._tx, this._ty)
            },
            getScaling: function() {
                var e = Math.sqrt(this._a * this._a + this._c * this._c),
                    t = Math.sqrt(this._b * this._b + this._d * this._d);
                return new Point(this._a < 0 ? -e : e, this._b < 0 ? -t : t)
            },
            getRotation: function() {
                var e = -Math.atan2(this._b, this._d),
                    t = Math.atan2(this._c, this._a);
                return Math.abs(e - t) < Numerical.TOLERANCE ? e * 180 / Math.PI : undefined
            },
            isIdentity: function() {
                return this._a == 1 && this._c == 0 && this._b == 0 && this._d == 1 && this._tx == 0 && this._ty == 0
            },
            isInvertible: function() {
                return !!this._getDeterminant()
            },
            isSingular: function() {
                return !this._getDeterminant()
            },
            createInverse: function() {
                var e = this._getDeterminant();
                return e && Matrix.create(this._d / e, -this._c / e, -this._b / e, this._a / e, (this._b * this._ty - this._d * this._tx) / e, (this._c * this._tx - this._a * this._ty) / e)
            },
            createShiftless: function() {
                return Matrix.create(this._a, this._c, this._b, this._d, 0, 0)
            },
            setToScale: function(e, t) {
                return this.set(e, 0, 0, t, 0, 0)
            },
            setToTranslation: function(e) {
                e = Point.read(arguments);
                return this.set(1, 0, 0, 1, e.x, e.y)
            },
            setToShear: function(e, t) {
                return this.set(1, t, e, 1, 0, 0)
            },
            setToRotation: function(e, t) {
                t = Point.read(arguments, 1);
                e = e * Math.PI / 180;
                var n = t.x,
                    r = t.y,
                    i = Math.cos(e),
                    s = Math.sin(e);
                return this.set(i, s, -s, i, n - n * i + r * s, r - n * s - r * i)
            },
            applyToContext: function(e, t) {
                e[t ? "setTransform" : "transform"](this._a, this._c, this._b, this._d, this._tx, this._ty);
                return this
            },
            statics: {
                create: function(e, t, n, r, i, s) {
                    return (new Matrix(Matrix.dont)).set(e, t, n, r, i, s)
                },
                getScaleInstance: function(e, t) {
                    var n = new Matrix;
                    return n.setToScale.apply(n, arguments)
                },
                getTranslateInstance: function(e) {
                    var t = new Matrix;
                    return t.setToTranslation.apply(t, arguments)
                },
                getShearInstance: function(e, t, n) {
                    var r = new Matrix;
                    return r.setToShear.apply(r, arguments)
                },
                getRotateInstance: function(e, t) {
                    var n = new Matrix;
                    return n.setToRotation.apply(n, arguments)
                }
            }
        }, new function() {
            return Base.each({
                scaleX: "_a",
                scaleY: "_d",
                translateX: "_tx",
                translateY: "_ty",
                shearX: "_b",
                shearY: "_c"
            }, function(e, t) {
                t = Base.capitalize(t);
                this["get" + t] = function() {
                    return this[e]
                };
                this["set" + t] = function(t) {
                    this[e] = t
                }
            }, {})
        });
        var Line = this.Line = Base.extend({
            initialize: function(e, t, n) {
                e = Point.read(arguments, 0, 1);
                t = Point.read(arguments, 1, 1);
                if (arguments.length == 3) {
                    this.point = e;
                    this.vector = t.subtract(e);
                    this.infinite = n
                } else {
                    this.point = e;
                    this.vector = t;
                    this.infinite = true
                }
            },
            intersect: function(e) {
                var t = this.vector.cross(e.vector);
                if (Math.abs(t) <= Numerical.EPSILON) return null;
                var n = e.point.subtract(this.point),
                    r = n.cross(e.vector) / t,
                    i = n.cross(this.vector) / t;
                return (this.infinite || 0 <= r && r <= 1) && (e.infinite || 0 <= i && i <= 1) ? this.point.add(this.vector.multiply(r)) : null
            },
            getSide: function(e) {
                var t = this.vector,
                    n = e.subtract(this.point),
                    r = n.cross(t);
                if (r == 0) {
                    r = n.dot(t);
                    if (r > 0) {
                        r = n.subtract(t).dot(t);
                        if (r < 0) r = 0
                    }
                }
                return r < 0 ? -1 : r > 0 ? 1 : 0
            },
            getDistance: function(e) {
                var t = this.vector.y / this.vector.x,
                    n = this.point.y - t * this.point.x;
                var r = Math.abs(e.y - t * e.x - n) / Math.sqrt(t * t + 1);
                return this.infinite ? r : Math.min(r, e.getDistance(this.point), e.getDistance(this.point.add(this.vector)))
            }
        });
        var Project = this.Project = PaperScopeItem.extend({
            _list: "projects",
            _reference: "project",
            initialize: function() {
                this.base(true);
                this._currentStyle = new PathStyle;
                this._selectedItems = {};
                this._selectedItemCount = 0;
                this.layers = [];
                this.symbols = [];
                this.activeLayer = new Layer
            },
            _needsRedraw: function() {
                if (this._scope) this._scope._needsRedraw()
            },
            getCurrentStyle: function() {
                return this._currentStyle
            },
            setCurrentStyle: function(e) {
                this._currentStyle.initialize(e)
            },
            getIndex: function() {
                return this._index
            },
            getSelectedItems: function() {
                var e = [];
                Base.each(this._selectedItems, function(t) {
                    e.push(t)
                });
                return e
            },
            _updateSelection: function(e) {
                if (e._selected) {
                    this._selectedItemCount++;
                    this._selectedItems[e.getId()] = e
                } else {
                    this._selectedItemCount--;
                    delete this._selectedItems[e.getId()]
                }
            },
            selectAll: function() {
                for (var e = 0, t = this.layers.length; e < t; e++) this.layers[e].setSelected(true)
            },
            deselectAll: function() {
                for (var e in this._selectedItems) this._selectedItems[e].setSelected(false)
            },
            hitTest: function(e, t) {
                t = HitResult.getOptions(e, t);
                e = t.point;
                for (var n = this.layers.length - 1; n >= 0; n--) {
                    var r = this.layers[n].hitTest(e, t);
                    if (r) return r
                }
                return null
            },
            draw: function(e) {
                e.save();
                var t = {
                    offset: new Point(0, 0)
                };
                for (var n = 0, r = this.layers.length; n < r; n++) Item.draw(this.layers[n], e, t);
                e.restore();
                if (this._selectedItemCount > 0) {
                    e.save();
                    e.strokeWidth = 1;
                    e.strokeStyle = e.fillStyle = "#009dec";
                    t = {
                        selection: true
                    };
                    Base.each(this._selectedItems, function(n) {
                        n.draw(e, t)
                    });
                    e.restore()
                }
            }
        });
        var Symbol = this.Symbol = Base.extend({
            initialize: function(e) {
                this.project = paper.project;
                this.project.symbols.push(this);
                this.setDefinition(e);
                this._instances = {}
            },
            _changed: function(e) {
                Base.each(this._instances, function(t) {
                    t._changed(e)
                })
            },
            getDefinition: function() {
                return this._definition
            },
            setDefinition: function(e) {
                if (e._parentSymbol) e = e.clone();
                if (this._definition) delete this._definition._parentSymbol;
                this._definition = e;
                e.remove();
                e.setPosition(new Point);
                e._parentSymbol = this;
                this._changed(Change.GEOMETRY)
            },
            place: function(e) {
                return new PlacedSymbol(this, e)
            },
            clone: function() {
                return new Symbol(this._definition.clone())
            }
        });
        var ChangeFlag = {
            APPEARANCE: 1,
            HIERARCHY: 2,
            GEOMETRY: 4,
            STROKE: 8,
            STYLE: 16,
            ATTRIBUTE: 32,
            CONTENT: 64,
            PIXELS: 128,
            CLIPPING: 256
        };
        var Change = {
            HIERARCHY: ChangeFlag.HIERARCHY | ChangeFlag.APPEARANCE,
            GEOMETRY: ChangeFlag.GEOMETRY | ChangeFlag.APPEARANCE,
            STROKE: ChangeFlag.STROKE | ChangeFlag.STYLE | ChangeFlag.APPEARANCE,
            STYLE: ChangeFlag.STYLE | ChangeFlag.APPEARANCE,
            ATTRIBUTE: ChangeFlag.ATTRIBUTE | ChangeFlag.APPEARANCE,
            CONTENT: ChangeFlag.CONTENT | ChangeFlag.APPEARANCE,
            PIXELS: ChangeFlag.PIXELS | ChangeFlag.APPEARANCE
        };
        var Item = this.Item = Base.extend({
            initialize: function() {
                this._id = ++Item._id;
                if (!this._project) paper.project.activeLayer.addChild(this);
                this._style = PathStyle.create(this);
                this.setStyle(this._project.getCurrentStyle())
            },
            _changed: function(e) {
                if (e & ChangeFlag.GEOMETRY) {
                    delete this._bounds;
                    delete this._position
                }
                if (e & ChangeFlag.APPEARANCE) {
                    this._project._needsRedraw()
                }
                if (this._parentSymbol) this._parentSymbol._changed(e);
                if (this._project._changes) {
                    var t = this._project._changesById[this._id];
                    if (t) {
                        t.flags |= e
                    } else {
                        t = {
                            item: this,
                            flags: e
                        };
                        this._project._changesById[this._id] = t;
                        this._project._changes.push(t)
                    }
                }
            },
            getId: function() {
                return this._id
            },
            getName: function() {
                return this._name
            },
            setName: function(e) {
                if (this._name) this._removeFromNamed();
                this._name = e || undefined;
                if (e) {
                    var t = this._parent._children,
                        n = this._parent._namedChildren;
                    (n[e] = n[e] || []).push(this);
                    t[e] = this
                }
                this._changed(ChangeFlag.ATTRIBUTE)
            },
            getPosition: function() {
                var e = this._position || (this._position = this.getBounds().getCenter());
                return LinkedPoint.create(this, "setPosition", e._x, e._y)
            },
            setPosition: function(e) {
                this.translate(Point.read(arguments).subtract(this.getPosition()))
            },
            getStyle: function() {
                return this._style
            },
            setStyle: function(e) {
                this._style.initialize(e)
            },
            statics: {
                _id: 0
            }
        }, new function() {
            return Base.each(["locked", "visible", "blendMode", "opacity", "guide"], function(e) {
                var t = Base.capitalize(e),
                    e = "_" + e;
                this["get" + t] = function() {
                    return this[e]
                };
                this["set" + t] = function(t) {
                    if (t != this[e]) {
                        this[e] = t;
                        this._changed(e === "_locked" ? ChangeFlag.ATTRIBUTE : Change.ATTRIBUTE)
                    }
                }
            }, {})
        }, {
            _locked: false,
            _visible: true,
            _blendMode: "normal",
            _opacity: 1,
            _guide: false,
            isSelected: function() {
                if (this._children) {
                    for (var e = 0, t = this._children.length; e < t; e++)
                        if (this._children[e].isSelected()) return true
                }
                return this._selected
            },
            setSelected: function(e) {
                if (this._children) {
                    for (var t = 0, n = this._children.length; t < n; t++) {
                        this._children[t].setSelected(e)
                    }
                } else if ((e = !! e) != this._selected) {
                    this._selected = e;
                    this._project._updateSelection(this);
                    this._changed(Change.ATTRIBUTE)
                }
            },
            _selected: false,
            isFullySelected: function() {
                if (this._children && this._selected) {
                    for (var e = 0, t = this._children.length; e < t; e++)
                        if (!this._children[e].isFullySelected()) return false;
                    return true
                }
                return this._selected
            },
            setFullySelected: function(e) {
                if (this._children) {
                    for (var t = 0, n = this._children.length; t < n; t++) {
                        this._children[t].setFullySelected(e)
                    }
                }
                this.setSelected(e)
            },
            isClipMask: function() {
                return this._clipMask
            },
            setClipMask: function(e) {
                if (this._clipMask != (e = !! e)) {
                    this._clipMask = e;
                    if (e) {
                        this.setFillColor(null);
                        this.setStrokeColor(null)
                    }
                    this._changed(Change.ATTRIBUTE);
                    if (this._parent) this._parent._changed(ChangeFlag.CLIPPING)
                }
            },
            _clipMask: false,
            getProject: function() {
                return this._project
            },
            _setProject: function(e) {
                if (this._project != e) {
                    this._project = e;
                    if (this._children) {
                        for (var t = 0, n = this._children.length; t < n; t++) {
                            this._children[t]._setProject(e)
                        }
                    }
                }
            },
            getLayer: function() {
                var e = this;
                while (e = e._parent) {
                    if (e instanceof Layer) return e
                }
                return null
            },
            getParent: function() {
                return this._parent
            },
            getChildren: function() {
                return this._children
            },
            setChildren: function(e) {
                this.removeChildren();
                this.addChildren(e)
            },
            getFirstChild: function() {
                return this._children && this._children[0] || null
            },
            getLastChild: function() {
                return this._children && this._children[this._children.length - 1] || null
            },
            getNextSibling: function() {
                return this._parent && this._parent._children[this._index + 1] || null
            },
            getPreviousSibling: function() {
                return this._parent && this._parent._children[this._index - 1] || null
            },
            getIndex: function() {
                return this._index
            },
            clone: function() {
                return this._clone(new this.constructor)
            },
            _clone: function(e) {
                e.setStyle(this._style);
                if (this._children) {
                    for (var t = 0, n = this._children.length; t < n; t++) e.addChild(this._children[t].clone())
                }
                var r = ["_locked", "_visible", "_blendMode", "_opacity", "_clipMask", "_guide"];
                for (var t = 0, n = r.length; t < n; t++) {
                    var i = r[t];
                    if (this.hasOwnProperty(i)) e[i] = this[i]
                }
                e.setSelected(this._selected);
                if (this._name) e.setName(this._name);
                return e
            },
            copyTo: function(e) {
                var t = this.clone();
                if (e.layers) {
                    e.activeLayer.addChild(t)
                } else {
                    e.addChild(t)
                }
                return t
            },
            rasterize: function(e) {
                var t = this.getStrokeBounds(),
                    n = (e || 72) / 72,
                    r = CanvasProvider.getCanvas(t.getSize().multiply(n)),
                    i = r.getContext("2d"),
                    s = (new Matrix).scale(n).translate(-t.x, -t.y);
                s.applyToContext(i);
                this.draw(i, {});
                var o = new Raster(r);
                o.setBounds(t);
                return o
            },
            hitTest: function(e, t, n) {
                t = HitResult.getOptions(e, t);
                e = t.point;
                if (!this._children && !this.getRoughBounds(n).expand(t.tolerance)._containsPoint(e)) return null;
                if ((t.center || t.bounds) && !(this instanceof Layer && !this._parent)) {
                    var r = this.getBounds(),
                        i = this,
                        s = ["TopLeft", "TopRight", "BottomLeft", "BottomRight", "LeftCenter", "TopCenter", "RightCenter", "BottomCenter"],
                        o;

                    function u(s, o) {
                        var u = r["get" + o]().transform(n);
                        if (e.getDistance(u) < t.tolerance) return new HitResult(s, i, {
                            name: Base.hyphenate(o),
                            point: u
                        })
                    }
                    if (t.center && (o = u("center", "Center"))) return o;
                    if (t.bounds) {
                        for (var a = 0; a < 8; a++)
                            if (o = u("bounds", s[a])) return o
                    }
                }
                return this._children || !(t.guides && !this._guide || t.selected && !this._selected) ? this._hitTest(e, t, n) : null
            },
            _hitTest: function(e, t, n) {
                if (this._children) {
                    for (var r = this._children.length - 1; r >= 0; r--) {
                        var i = this._children[r].hitTest(e, t, n);
                        if (i) return i
                    }
                }
            },
            addChild: function(e) {
                return this.insertChild(undefined, e)
            },
            insertChild: function(e, t) {
                if (this._children) {
                    t._remove(false, true);
                    Base.splice(this._children, [t], e, 0);
                    t._parent = this;
                    t._setProject(this._project);
                    if (t._name) t.setName(t._name);
                    this._changed(Change.HIERARCHY);
                    return true
                }
                return false
            },
            addChildren: function(e) {
                for (var t = 0, n = e && e.length; t < n; t++) this.insertChild(undefined, e[t])
            },
            insertChildren: function(e, t) {
                for (var n = 0, r = t && t.length; n < r; n++) {
                    if (this.insertChild(e, t[n])) e++
                }
            },
            insertAbove: function(e) {
                return e._parent && e._parent.insertChild(e._index + 1, this)
            },
            insertBelow: function(e) {
                return e._parent && e._parent.insertChild(e._index - 1, this)
            },
            appendTop: function(e) {
                return this.addChild(e)
            },
            appendBottom: function(e) {
                return this.insertChild(0, e)
            },
            moveAbove: function(e) {
                return this.insertAbove(e)
            },
            moveBelow: function(e) {
                return this.insertBelow(e)
            },
            _removeFromNamed: function() {
                var e = this._parent._children,
                    t = this._parent._namedChildren,
                    n = this._name,
                    r = t[n],
                    i = r ? r.indexOf(this) : -1;
                if (i == -1) return;
                if (e[n] == this) delete e[n];
                r.splice(i, 1);
                if (r.length) {
                    e[n] = r[r.length - 1]
                } else {
                    delete t[n]
                }
            },
            _remove: function(e, t) {
                if (this._parent) {
                    if (e) this.setSelected(false);
                    if (this._name) this._removeFromNamed();
                    Base.splice(this._parent._children, null, this._index, 1);
                    if (t) this._parent._changed(Change.HIERARCHY);
                    this._parent = null;
                    return true
                }
                return false
            },
            remove: function() {
                return this._remove(true, true)
            },
            removeChildren: function(e, t) {
                if (!this._children) return null;
                e = e || 0;
                t = Base.pick(t, this._children.length);
                var n = this._children.splice(e, t - e);
                for (var r = n.length - 1; r >= 0; r--) n[r]._remove(true, false);
                if (n.length > 0) this._changed(Change.HIERARCHY);
                return n
            },
            reverseChildren: function() {
                if (this._children) {
                    this._children.reverse();
                    for (var e = 0, t = this._children.length; e < t; e++) this._children[e]._index = e;
                    this._changed(Change.HIERARCHY)
                }
            },
            isEditable: function() {
                var e = this;
                while (e) {
                    if (!e._visible || e._locked) return false;
                    e = e._parent
                }
                return true
            },
            _getOrder: function(e) {
                function t(e) {
                    var t = [];
                    do {
                        t.unshift(e)
                    } while (e = e._parent);
                    return t
                }
                var n = t(this),
                    r = t(e);
                for (var i = 0, s = Math.min(n.length, r.length); i < s; i++) {
                    if (n[i] != r[i]) {
                        return n[i]._index < r[i]._index ? 1 : -1
                    }
                }
                return 0
            },
            hasChildren: function() {
                return this._children && this._children.length > 0
            },
            isAbove: function(e) {
                return this._getOrder(e) == -1
            },
            isBelow: function(e) {
                return this._getOrder(e) == 1
            },
            isParent: function(e) {
                return this._parent == e
            },
            isChild: function(e) {
                return e && e._parent == this
            },
            isDescendant: function(e) {
                var t = this;
                while (t = t._parent) {
                    if (t == e) return true
                }
                return false
            },
            isAncestor: function(e) {
                return e ? e.isDescendant(this) : false
            },
            isGroupedWith: function(e) {
                var t = this._parent;
                while (t) {
                    if (t._parent && (t instanceof Group || t instanceof CompoundPath) && e.isDescendant(t)) return true;
                    t = t._parent
                }
                return false
            },
            _getBounds: function(e, t, n) {
                var r = this._children;
                if (!r || r.length == 0) return new Rectangle;
                var i = Infinity,
                    s = -i,
                    o = i,
                    u = s;
                for (var a = 0, f = r.length; a < f; a++) {
                    var l = r[a];
                    if (l._visible) {
                        var c = l[e](n[0]);
                        i = Math.min(c.x, i);
                        o = Math.min(c.y, o);
                        s = Math.max(c.x + c.width, s);
                        u = Math.max(c.y + c.height, u)
                    }
                }
                var h = Rectangle.create(i, o, s - i, u - o);
                return e == "getBounds" ? this._createBounds(h) : h
            },
            _createBounds: function(e) {
                return LinkedRectangle.create(this, "setBounds", e.x, e.y, e.width, e.height)
            },
            getBounds: function() {
                return this._getBounds("getBounds", "_bounds", arguments)
            },
            setBounds: function(e) {
                e = Rectangle.read(arguments);
                var t = this.getBounds(),
                    n = new Matrix,
                    r = e.getCenter();
                n.translate(r);
                if (e.width != t.width || e.height != t.height) {
                    n.scale(t.width != 0 ? e.width / t.width : 1, t.height != 0 ? e.height / t.height : 1)
                }
                r = t.getCenter();
                n.translate(-r.x, -r.y);
                this.transform(n)
            },
            getStrokeBounds: function() {
                return this._getBounds("getStrokeBounds", "_strokeBounds", arguments)
            },
            getHandleBounds: function() {
                return this._getBounds("getHandleBounds", "_handleBounds", arguments)
            },
            getRoughBounds: function() {
                return this._getBounds("getRoughBounds", "_roughBounds", arguments)
            },
            scale: function(e, t, n) {
                if (arguments.length < 2 || typeof t === "object") {
                    n = t;
                    t = e
                }
                return this.transform((new Matrix).scale(e, t, n || this.getPosition()))
            },
            translate: function(e) {
                var t = new Matrix;
                return this.transform(t.translate.apply(t, arguments))
            },
            rotate: function(e, t) {
                return this.transform((new Matrix).rotate(e, t || this.getPosition()))
            },
            shear: function(e, t, n) {
                if (arguments.length < 2 || typeof t === "object") {
                    n = t;
                    t = e
                }
                return this.transform((new Matrix).shear(e, t, n || this.getPosition()))
            },
            transform: function(e, t) {
                var n = this._bounds,
                    r = this._position,
                    i = this._children;
                if (this._transform) {
                    this._transform(e, t);
                    this._changed(Change.GEOMETRY)
                }
                if (n && e.getRotation() % 90 === 0) {
                    this._bounds = this._createBounds(e._transformBounds(n));
                    this._position = this._bounds.getCenter()
                } else if (r) {
                    this._position = e._transformPoint(r, r, true)
                }
                for (var s = 0, o = i && i.length; s < o; s++) i[s].transform(e, t);
                return this
            },
            fitBounds: function(e, t) {
                e = Rectangle.read(arguments);
                var n = this.getBounds(),
                    r = n.height / n.width,
                    i = e.height / e.width,
                    s = (t ? r > i : r < i) ? e.width / n.width : e.height / n.height,
                    o = e.getCenter().subtract(n.getCenter()),
                    u = new Rectangle(new Point, new Size(n.width * s, n.height * s));
                u.setCenter(e.getCenter());
                this.setBounds(u)
            },
            toString: function() {
                return (this.constructor._name || "Item") + (this._name ? " '" + this._name + "'" : " @" + this._id)
            },
            statics: {
                drawSelectedBounds: function(e, t, n) {
                    var r = n._transformCorners(e);
                    t.beginPath();
                    for (var i = 0; i < 8; i++) t[i == 0 ? "moveTo" : "lineTo"](r[i], r[++i]);
                    t.closePath();
                    t.stroke();
                    for (var i = 0; i < 8; i++) {
                        t.beginPath();
                        t.rect(r[i] - 2, r[++i] - 2, 4, 4);
                        t.fill()
                    }
                },
                draw: function(e, t, n) {
                    if (!e._visible || e._opacity == 0) return;
                    var r, i;
                    if (e._blendMode !== "normal" || e._opacity < 1 && !(e._segments && (!e.getFillColor() || !e.getStrokeColor()))) {
                        var s = e.getStrokeBounds() || e.getBounds();
                        if (!s.width || !s.height) return;
                        var o = s.getTopLeft().floor(),
                            u = s.getSize().ceil().add(new Size(1, 1));
                        r = CanvasProvider.getCanvas(u);
                        i = t;
                        t = r.getContext("2d");
                        t.save();
                        t.translate(-o.x, -o.y)
                    }
                    var a;
                    if (o) {
                        a = n.offset;
                        n.offset = o
                    }
                    e.draw(t, n);
                    if (o) n.offset = a;
                    if (r) {
                        t.restore();
                        if (e._blendMode !== "normal") {
                            var f = o.subtract(n.offset);
                            BlendMode.process(e._blendMode, t, i, e._opacity, f)
                        } else {
                            i.save();
                            i.globalAlpha = e._opacity;
                            i.drawImage(r, o.x, o.y);
                            i.restore()
                        }
                        CanvasProvider.returnCanvas(r)
                    }
                }
            }
        }, new function() {
            function e(e) {
                for (var t in e) {
                    var r = e[t];
                    r.remove();
                    for (var i in n) {
                        var s = n[i];
                        if (s != e && s[r.getId()]) delete s[r.getId()]
                    }
                }
            }

            function t(t) {
                var r = "onMouse" + Base.capitalize(t);
                var i = paper.tool[r];
                if (!i || !i._installed) {
                    var s = {};
                    s[r] = function(r) {
                        if (t === "up") n.drag = {};
                        e(n[t]);
                        n[t] = {};
                        if (this.base) this.base(r)
                    };
                    paper.tool.inject(s);
                    paper.tool[r]._installed = true
                }
            }
            var n = {
                down: {},
                drag: {},
                up: {},
                move: {}
            };
            return Base.each(["down", "drag", "up", "move"], function(e) {
                this["removeOn" + Base.capitalize(e)] = function() {
                    var t = {};
                    t[e] = true;
                    return this.removeOn(t)
                }
            }, {
                removeOn: function(e) {
                    for (var r in e) {
                        if (e[r]) {
                            n[r][this.getId()] = this;
                            if (r === "drag") t("up");
                            t(r)
                        }
                    }
                    return this
                }
            })
        });
        var Group = this.Group = Item.extend({
            initialize: function(e) {
                this.base();
                this._children = [];
                this._namedChildren = {};
                this.addChildren(!e || !Array.isArray(e) || typeof e[0] !== "object" ? arguments : e)
            },
            _changed: function(e) {
                Item.prototype._changed.call(this, e);
                if (e & (ChangeFlag.HIERARCHY | ChangeFlag.CLIPPING)) {
                    delete this._clipItem
                }
            },
            _getClipItem: function() {
                if (this._clipItem !== undefined) return this._clipItem;
                for (var e = 0, t = this._children.length; e < t; e++) {
                    var n = this._children[e];
                    if (n._clipMask) return this._clipItem = n
                }
                return this._clipItem = null
            },
            isClipped: function() {
                return !!this._getClipItem()
            },
            setClipped: function(e) {
                var t = this.getFirstChild();
                if (t) t.setClipMask(e);
                return this
            },
            draw: function(e, t) {
                var n = this._getClipItem();
                if (n) Item.draw(n, e, t);
                for (var r = 0, i = this._children.length; r < i; r++) {
                    var s = this._children[r];
                    if (s != n) Item.draw(s, e, t)
                }
            }
        });
        var Layer = this.Layer = Group.extend({
            initialize: function(e) {
                this._project = paper.project;
                this._index = this._project.layers.push(this) - 1;
                this.base.apply(this, arguments);
                this.activate()
            },
            _remove: function(e, t) {
                if (this._parent) return this.base(e, t);
                if (this._index != null) {
                    if (e) this.setSelected(false);
                    Base.splice(this._project.layers, null, this._index, 1);
                    this._project._needsRedraw();
                    return true
                }
                return false
            },
            getNextSibling: function() {
                return this._parent ? this.base() : this._project.layers[this._index + 1] || null
            },
            getPreviousSibling: function() {
                return this._parent ? this.base() : this._project.layers[this._index - 1] || null
            },
            activate: function() {
                this._project.activeLayer = this
            }
        }, new function() {
            function e(e) {
                return function(t) {
                    if (t instanceof Layer && !t._parent && this._remove(false, true)) {
                        Base.splice(t._project.layers, [this], t._index + (e ? 1 : -1), 0);
                        this._setProject(t._project);
                        return true
                    }
                    return this.base(t)
                }
            }
            return {
                insertAbove: e(true),
                insertBelow: e(false)
            }
        });
        var PlacedItem = this.PlacedItem = Item.extend({
            _transform: function(e, t) {
                this._matrix.preConcatenate(e)
            },
            _changed: function(e) {
                Item.prototype._changed.call(this, e);
                if (e & ChangeFlag.GEOMETRY) {
                    delete this._strokeBounds;
                    delete this._handleBounds;
                    delete this._roughBounds
                }
            },
            getMatrix: function() {
                return this._matrix
            },
            setMatrix: function(e) {
                this._matrix = e.clone();
                this._changed(Change.GEOMETRY)
            },
            getBounds: function() {
                var e = arguments[0] === undefined;
                if (e && this._bounds) return this._bounds;
                var t = this.getStrokeBounds(arguments[0]);
                if (e) t = this._bounds = this._createBounds(t);
                return t
            },
            _getBounds: function(e, t, n) {
                var r = n[0],
                    i = r === undefined;
                if (i && this[t]) return this[t];
                r = r ? r.clone().concatenate(this._matrix) : this._matrix;
                var s = this._calculateBounds(e, r);
                if (i) this[t] = s;
                return s
            }
        });
        var Raster = this.Raster = PlacedItem.extend({
            initialize: function(e) {
                this.base();
                if (e.getContext) {
                    this.setCanvas(e)
                } else {
                    if (typeof e === "string") e = document.getElementById(e);
                    this.setImage(e)
                }
                this._matrix = new Matrix
            },
            clone: function() {
                var e = this._image;
                if (!e) {
                    e = CanvasProvider.getCanvas(this._size);
                    e.getContext("2d").drawImage(this._canvas, 0, 0)
                }
                var t = new Raster(e);
                t._matrix = this._matrix.clone();
                return this._clone(t)
            },
            getSize: function() {
                return this._size
            },
            setSize: function() {
                var e = Size.read(arguments),
                    t = this.getImage();
                this.setCanvas(CanvasProvider.getCanvas(e));
                this.getContext(true).drawImage(t, 0, 0, e.width, e.height)
            },
            getWidth: function() {
                return this._size.width
            },
            getHeight: function() {
                return this._size.height
            },
            getPpi: function() {
                var e = this._matrix,
                    t = (new Point(0, 0)).transform(e),
                    n = (new Point(1, 0)).transform(e).subtract(t),
                    r = (new Point(0, 1)).transform(e).subtract(t);
                return new Size(72 / n.getLength(), 72 / r.getLength())
            },
            getContext: function() {
                if (!this._context) this._context = this.getCanvas().getContext("2d");
                if (arguments[0]) this._changed(Change.PIXELS);
                return this._context
            },
            setContext: function(e) {
                this._context = e
            },
            getCanvas: function() {
                if (!this._canvas) {
                    this._canvas = CanvasProvider.getCanvas(this._size);
                    if (this._image) this.getContext(true).drawImage(this._image, 0, 0)
                }
                return this._canvas
            },
            setCanvas: function(e) {
                if (this._canvas) CanvasProvider.returnCanvas(this._canvas);
                this._canvas = e;
                this._size = new Size(e.width, e.height);
                this._image = null;
                this._context = null;
                this._changed(Change.GEOMETRY)
            },
            getImage: function() {
                return this._image || this.getCanvas()
            },
            setImage: function(e) {
                if (this._canvas) CanvasProvider.returnCanvas(this._canvas);
                this._image = e;
                this._size = new Size(e.naturalWidth, e.naturalHeight);
                this._canvas = null;
                this._context = null;
                this._changed(Change.GEOMETRY)
            },
            getSubImage: function(e) {
                e = Rectangle.read(arguments);
                var t = CanvasProvider.getCanvas(e.getSize());
                t.getContext("2d").drawImage(this.getCanvas(), e.x, e.y, t.width, t.height, 0, 0, t.width, t.height);
                return t
            },
            drawImage: function(e, t) {
                t = Point.read(arguments, 1);
                this.getContext(true).drawImage(e, t.x, t.y)
            },
            getAverageColor: function(e) {
                if (!e) e = this.getBounds();
                var t, n;
                if (e instanceof PathItem) {
                    n = e;
                    t = e.getBounds()
                } else if (e.width) {
                    t = new Rectangle(e)
                } else if (e.x) {
                    t = Rectangle.create(e.x - .5, e.y - .5, 1, 1)
                }
                var r = 32,
                    i = Math.min(t.width, r),
                    s = Math.min(t.height, r);
                var o = Raster._sampleContext;
                if (!o) {
                    o = Raster._sampleContext = CanvasProvider.getCanvas(new Size(r)).getContext("2d")
                } else {
                    o.clearRect(0, 0, r, r)
                }
                o.save();
                o.scale(i / t.width, s / t.height);
                o.translate(-t.x, -t.y);
                if (n) n.draw(o, {
                    clip: true
                });
                this._matrix.applyToContext(o);
                o.drawImage(this._canvas || this._image, -this._size.width / 2, -this._size.height / 2);
                o.restore();
                var u = o.getImageData(.5, .5, Math.ceil(i), Math.ceil(s)).data,
                    a = [0, 0, 0],
                    f = 0;
                for (var l = 0, c = u.length; l < c; l += 4) {
                    var h = u[l + 3];
                    f += h;
                    h /= 255;
                    a[0] += u[l] * h;
                    a[1] += u[l + 1] * h;
                    a[2] += u[l + 2] * h
                }
                for (var l = 0; l < 3; l++) a[l] /= f;
                return f ? Color.read(a) : null
            },
            getPixel: function(e) {
                e = Point.read(arguments);
                var t = this.getContext().getImageData(e.x, e.y, 1, 1).data,
                    n = new Array(4);
                for (var r = 0; r < 4; r++) n[r] = t[r] / 255;
                return RgbColor.read(n)
            },
            setPixel: function(e, t) {
                var n = arguments.length == 2;
                e = Point.read(arguments, 0, n ? 1 : 2);
                t = Color.read(arguments, n ? 1 : 2);
                var r = this.getContext(true),
                    i = r.createImageData(1, 1),
                    s = t.getAlpha();
                i.data[0] = t.getRed() * 255;
                i.data[1] = t.getGreen() * 255;
                i.data[2] = t.getBlue() * 255;
                i.data[3] = s != null ? s * 255 : 255;
                r.putImageData(i, e.x, e.y)
            },
            createData: function(e) {
                e = Size.read(arguments);
                return this.getContext().createImageData(e.width, e.height)
            },
            getData: function(e) {
                e = Rectangle.read(arguments);
                if (e.isEmpty()) e = new Rectangle(this.getSize());
                return this.getContext().getImageData(e.x, e.y, e.width, e.height)
            },
            setData: function(e, t) {
                t = Point.read(arguments, 1);
                this.getContext(true).putImageData(e, t.x, t.y)
            },
            _calculateBounds: function(e, t) {
                return t._transformBounds((new Rectangle(this._size)).setCenter(0, 0))
            },
            getHandleBounds: function() {
                return this.getStrokeBounds(arguments[0])
            },
            getRoughBounds: function() {
                return this.getStrokeBounds(arguments[0])
            },
            draw: function(e, t) {
                if (t.selection) {
                    var n = (new Rectangle(this._size)).setCenter(0, 0);
                    Item.drawSelectedBounds(n, e, this._matrix)
                } else {
                    e.save();
                    this._matrix.applyToContext(e);
                    e.drawImage(this._canvas || this._image, -this._size.width / 2, -this._size.height / 2);
                    e.restore()
                }
            }
        });
        var PlacedSymbol = this.PlacedSymbol = PlacedItem.extend({
            initialize: function(e, t) {
                this.base();
                this.setSymbol(e instanceof Symbol ? e : new Symbol(e));
                this._matrix = t !== undefined ? t instanceof Matrix ? t : (new Matrix).translate(Point.read(arguments, 1)) : new Matrix
            },
            getSymbol: function() {
                return this._symbol
            },
            setSymbol: function(e) {
                if (this._symbol) delete this._symbol._instances[this._id];
                this._symbol = e;
                e._instances[this._id] = this
            },
            clone: function() {
                return this._clone(new PlacedSymbol(this.symbol, this._matrix.clone()))
            },
            _calculateBounds: function(e, t) {
                return this.symbol._definition[e](t)
            },
            draw: function(e, t) {
                if (t.selection) {
                    Item.drawSelectedBounds(this.symbol._definition.getStrokeBounds(), e, this._matrix)
                } else {
                    e.save();
                    this._matrix.applyToContext(e);
                    Item.draw(this.symbol.getDefinition(), e, t);
                    e.restore()
                }
            }
        });
        HitResult = Base.extend({
            initialize: function(e, t, n) {
                this.type = e;
                this.item = t;
                if (n) {
                    Base.each(n, function(e, t) {
                        this[t] = e
                    }, this)
                }
            },
            statics: {
                getOptions: function(e, t) {
                    return t && t._merged ? t : Base.merge({
                        point: Point.read(arguments, 0, 1),
                        type: null,
                        tolerance: 2,
                        fill: !t,
                        stroke: !t,
                        segments: !t,
                        handles: false,
                        ends: false,
                        center: false,
                        bounds: false,
                        guides: false,
                        selected: false,
                        _merged: true
                    }, t)
                }
            }
        });
        var Segment = this.Segment = Base.extend({
            initialize: function(e, t, n, r, i, s) {
                var o = arguments.length,
                    u = SegmentPoint.create,
                    a, f, l;
                if (o == 0) {} else if (o == 1) {
                    if (e.point) {
                        a = e.point;
                        f = e.handleIn;
                        l = e.handleOut
                    } else {
                        a = e
                    }
                } else if (o < 6) {
                    if (o == 2 && t.x === undefined) {
                        a = [e, t]
                    } else {
                        a = e;
                        f = t;
                        l = n
                    }
                } else if (o == 6) {
                    a = [e, t];
                    f = [n, r];
                    l = [i, s]
                }
                u(this, "_point", a);
                u(this, "_handleIn", f);
                u(this, "_handleOut", l)
            },
            _changed: function(e) {
                if (!this._path) return;
                var t = this._path._curves && this.getCurve(),
                    n;
                if (t) {
                    t._changed();
                    if (n = t[e == this._point || e == this._handleIn && t._segment1 == this ? "getPrevious" : "getNext"]()) {
                        n._changed()
                    }
                }
                this._path._changed(Change.GEOMETRY)
            },
            getPoint: function() {
                return this._point
            },
            setPoint: function(e) {
                e = Point.read(arguments);
                this._point.set(e.x, e.y)
            },
            getHandleIn: function() {
                return this._handleIn
            },
            setHandleIn: function(e) {
                e = Point.read(arguments);
                this._handleIn.set(e.x, e.y)
            },
            getHandleOut: function() {
                return this._handleOut
            },
            setHandleOut: function(e) {
                e = Point.read(arguments);
                this._handleOut.set(e.x, e.y)
            },
            _isSelected: function(e) {
                var t = this._selectionState;
                return e == this._point ? !! (t & SelectionState.POINT) : e == this._handleIn ? !! (t & SelectionState.HANDLE_IN) : e == this._handleOut ? !! (t & SelectionState.HANDLE_OUT) : false
            },
            _setSelected: function(e, t) {
                var n = this._path,
                    t = !! t,
                    r = this._selectionState || 0,
                    i = [ !! (r & SelectionState.POINT), !! (r & SelectionState.HANDLE_IN), !! (r & SelectionState.HANDLE_OUT)];
                if (e == this._point) {
                    if (t) {
                        i[1] = i[2] = false
                    } else {
                        var s = this.getPrevious(),
                            o = this.getNext();
                        i[1] = s && (s._point.isSelected() || s._handleOut.isSelected());
                        i[2] = o && (o._point.isSelected() || o._handleIn.isSelected())
                    }
                    i[0] = t
                } else {
                    var u = e == this._handleIn ? 1 : 2;
                    if (i[u] != t) {
                        if (t) i[0] = false;
                        i[u] = t;
                        n._changed(Change.ATTRIBUTE)
                    }
                }
                this._selectionState = (i[0] ? SelectionState.POINT : 0) | (i[1] ? SelectionState.HANDLE_IN : 0) | (i[2] ? SelectionState.HANDLE_OUT : 0);
                if (n && r != this._selectionState) n._updateSelection(this, r, this._selectionState)
            },
            isSelected: function() {
                return this._isSelected(this._point)
            },
            setSelected: function(e) {
                this._setSelected(this._point, e)
            },
            getIndex: function() {
                return this._index !== undefined ? this._index : null
            },
            getPath: function() {
                return this._path || null
            },
            getCurve: function() {
                if (this._path) {
                    var e = this._index;
                    if (!this._path._closed && e == this._path._segments.length - 1) e--;
                    return this._path.getCurves()[e] || null
                }
                return null
            },
            getNext: function() {
                var e = this._path && this._path._segments;
                return e && (e[this._index + 1] || this._path._closed && e[0]) || null
            },
            getPrevious: function() {
                var e = this._path && this._path._segments;
                return e && (e[this._index - 1] || this._path._closed && e[e.length - 1]) || null
            },
            reverse: function() {
                return new Segment(this._point, this._handleOut, this._handleIn)
            },
            remove: function() {
                return this._path ? !! this._path.removeSegment(this._index) : false
            },
            toString: function() {
                var e = ["point: " + this._point];
                if (!this._handleIn.isZero()) e.push("handleIn: " + this._handleIn);
                if (!this._handleOut.isZero()) e.push("handleOut: " + this._handleOut);
                return "{ " + e.join(", ") + " }"
            },
            _transformCoordinates: function(e, t, n) {
                var r = this._point,
                    i = !n || !this._handleIn.isZero() ? this._handleIn : null,
                    s = !n || !this._handleOut.isZero() ? this._handleOut : null,
                    o = r._x,
                    u = r._y,
                    a = 2;
                t[0] = o;
                t[1] = u;
                if (i) {
                    t[a++] = i._x + o;
                    t[a++] = i._y + u
                }
                if (s) {
                    t[a++] = s._x + o;
                    t[a++] = s._y + u
                }
                if (!e) return;
                e._transformCoordinates(t, 0, t, 0, a / 2);
                o = t[0];
                u = t[1];
                if (n) {
                    r._x = o;
                    r._y = u;
                    a = 2;
                    if (i) {
                        i._x = t[a++] - o;
                        i._y = t[a++] - u
                    }
                    if (s) {
                        s._x = t[a++] - o;
                        s._y = t[a++] - u
                    }
                } else {
                    if (!i) {
                        t[a++] = o;
                        t[a++] = u
                    }
                    if (!s) {
                        t[a++] = o;
                        t[a++] = u
                    }
                }
            }
        });
        var SegmentPoint = Point.extend({
            set: function(e, t) {
                this._x = e;
                this._y = t;
                this._owner._changed(this);
                return this
            },
            getX: function() {
                return this._x
            },
            setX: function(e) {
                this._x = e;
                this._owner._changed(this)
            },
            getY: function() {
                return this._y
            },
            setY: function(e) {
                this._y = e;
                this._owner._changed(this)
            },
            isZero: function() {
                return this._x == 0 && this._y == 0
            },
            setSelected: function(e) {
                this._owner._setSelected(this, e)
            },
            isSelected: function() {
                return this._owner._isSelected(this)
            },
            statics: {
                create: function(e, t, n) {
                    var r = new SegmentPoint(SegmentPoint.dont),
                        i, s, o;
                    if (!n) {
                        i = s = 0
                    } else if ((i = n[0]) !== undefined) {
                        s = n[1]
                    } else {
                        if ((i = n.x) === undefined) {
                            n = Point.read(arguments, 2, 1);
                            i = n.x
                        }
                        s = n.y;
                        o = n.selected
                    }
                    r._x = i;
                    r._y = s;
                    r._owner = e;
                    e[t] = r;
                    if (o) r.setSelected(true);
                    return r
                }
            }
        });
        var SelectionState = {
            HANDLE_IN: 1,
            HANDLE_OUT: 2,
            POINT: 4
        };
        var Curve = this.Curve = Base.extend({
            initialize: function(e, t, n, r, i, s, o, u) {
                var a = arguments.length;
                if (a == 0) {
                    this._segment1 = new Segment;
                    this._segment2 = new Segment
                } else if (a == 1) {
                    this._segment1 = new Segment(e.segment1);
                    this._segment2 = new Segment(e.segment2)
                } else if (a == 2) {
                    this._segment1 = new Segment(e);
                    this._segment2 = new Segment(t)
                } else if (a == 4) {
                    this._segment1 = new Segment(e, null, t);
                    this._segment2 = new Segment(r, n, null)
                } else if (a == 8) {
                    var f = Point.create(e, t),
                        l = Point.create(o, u);
                    this._segment1 = new Segment(f, null, Point.create(n, r).subtract(f));
                    this._segment2 = new Segment(l, Point.create(i, s).subtract(l), null)
                }
            },
            _changed: function() {
                delete this._length
            },
            getPoint1: function() {
                return this._segment1._point
            },
            setPoint1: function(e) {
                e = Point.read(arguments);
                this._segment1._point.set(e.x, e.y)
            },
            getPoint2: function() {
                return this._segment2._point
            },
            setPoint2: function(e) {
                e = Point.read(arguments);
                this._segment2._point.set(e.x, e.y)
            },
            getHandle1: function() {
                return this._segment1._handleOut
            },
            setHandle1: function(e) {
                e = Point.read(arguments);
                this._segment1._handleOut.set(e.x, e.y)
            },
            getHandle2: function() {
                return this._segment2._handleIn
            },
            setHandle2: function(e) {
                e = Point.read(arguments);
                this._segment2._handleIn.set(e.x, e.y)
            },
            getSegment1: function() {
                return this._segment1
            },
            getSegment2: function() {
                return this._segment2
            },
            getPath: function() {
                return this._path
            },
            getIndex: function() {
                return this._segment1._index
            },
            getNext: function() {
                var e = this._path && this._path._curves;
                return e && (e[this._segment1._index + 1] || this._path._closed && e[0]) || null
            },
            getPrevious: function() {
                var e = this._path && this._path._curves;
                return e && (e[this._segment1._index - 1] || this._path._closed && e[e.length - 1]) || null
            },
            isSelected: function() {
                return this.getHandle1().isSelected() && this.getHandle2().isSelected()
            },
            setSelected: function(e) {
                this.getHandle1().setSelected(e);
                this.getHandle2().setSelected(e)
            },
            getValues: function(e) {
                return Curve.getValues(this._segment1, this._segment2, e)
            },
            getPoints: function(e) {
                var t = this.getValues(e),
                    n = [];
                for (var r = 0; r < 8; r += 2) n.push(Point.create(t[r], t[r + 1]));
                return n
            },
            getLength: function() {
                var e = arguments[0],
                    t = arguments[1];
                fullLength = arguments.length == 0 || e == 0 && t == 1;
                if (fullLength && this._length != null) return this._length;
                var n = Curve.getLength(this.getValues(), e, t);
                if (fullLength) this._length = n;
                return n
            },
            getPart: function(e, t) {
                return new Curve(Curve.getPart(this.getValues(), e, t))
            },
            isLinear: function() {
                return this._segment1._handleOut.isZero() && this._segment2._handleIn.isZero()
            },
            getParameterAt: function(e, t) {
                return Curve.getParameterAt(this.getValues(), e, t !== undefined ? t : e < 0 ? 1 : 0)
            },
            getPoint: function(e) {
                return Curve.evaluate(this.getValues(), e, 0)
            },
            getTangent: function(e) {
                return Curve.evaluate(this.getValues(), e, 1)
            },
            getNormal: function(e) {
                return Curve.evaluate(this.getValues(), e, 2)
            },
            getParameter: function(e) {
                e = Point.read(e);
                return Curve.getParameter(this.getValues(), e.x, e.y)
            },
            getCrossings: function(e, t, n) {
                var r = this.getValues(t),
                    i = Curve.solveCubic(r, 1, e.y, n),
                    s = 0;
                for (var o = 0; o < i; o++) {
                    var u = n[o];
                    if (u >= 0 && u < 1 && Curve.evaluate(r, u, 0).x > e.x) {
                        if (u < Numerical.TOLERANCE && Curve.evaluate(this.getPrevious().getValues(t), 1, 1).y * Curve.evaluate(r, u, 1).y >= 0) continue;
                        s++
                    }
                }
                return s
            },
            reverse: function() {
                return new Curve(this._segment2.reverse(), this._segment1.reverse())
            },
            clone: function() {
                return new Curve(this._segment1, this._segment2)
            },
            toString: function() {
                var e = ["point1: " + this._segment1._point];
                if (!this._segment1._handleOut.isZero()) e.push("handle1: " + this._segment1._handleOut);
                if (!this._segment2._handleIn.isZero()) e.push("handle2: " + this._segment2._handleIn);
                e.push("point2: " + this._segment2._point);
                return "{ " + e.join(", ") + " }"
            },
            statics: {
                create: function(e, t, n) {
                    var r = new Curve(Curve.dont);
                    r._path = e;
                    r._segment1 = t;
                    r._segment2 = n;
                    return r
                },
                getValues: function(e, t, n) {
                    var r = e._point,
                        i = e._handleOut,
                        s = t._handleIn,
                        o = t._point,
                        u = [r._x, r._y, r._x + i._x, r._y + i._y, o._x + s._x, o._y + s._y, o._x, o._y];
                    return n ? n._transformCoordinates(u, 0, u, 0, 4) : u
                },
                evaluate: function(e, t, n) {
                    var r = e[0],
                        i = e[1],
                        s = e[2],
                        o = e[3],
                        u = e[4],
                        a = e[5],
                        f = e[6],
                        l = e[7],
                        c, h;
                    if (n == 0 && (t == 0 || t == 1)) {
                        c = t == 0 ? r : f;
                        h = t == 0 ? i : l
                    } else {
                        var p = Numerical.TOLERANCE;
                        if (t < p && s == r && o == i) t = p;
                        else if (t > 1 - p && u == f && a == l) t = 1 - p;
                        var d = 3 * (s - r),
                            v = 3 * (u - s) - d,
                            m = f - r - d - v,
                            g = 3 * (o - i),
                            y = 3 * (a - o) - g,
                            b = l - i - g - y;
                        switch (n) {
                            case 0:
                                c = ((m * t + v) * t + d) * t + r;
                                h = ((b * t + y) * t + g) * t + i;
                                break;
                            case 1:
                            case 2:
                                c = (3 * m * t + 2 * v) * t + d;
                                h = (3 * b * t + 2 * y) * t + g;
                                break
                        }
                    }
                    return n == 2 ? new Point(h, -c) : new Point(c, h)
                },
                subdivide: function(e, t) {
                    var n = e[0],
                        r = e[1],
                        i = e[2],
                        s = e[3],
                        o = e[4],
                        u = e[5],
                        a = e[6],
                        f = e[7];
                    if (t === undefined) t = .5;
                    var l = 1 - t,
                        c = l * n + t * i,
                        h = l * r + t * s,
                        p = l * i + t * o,
                        d = l * s + t * u,
                        v = l * o + t * a,
                        m = l * u + t * f,
                        g = l * c + t * p,
                        y = l * h + t * d,
                        b = l * p + t * v,
                        w = l * d + t * m,
                        E = l * g + t * b,
                        S = l * y + t * w;
                    return [[n, r, c, h, g, y, E, S], [E, S, b, w, v, m, a, f]]
                },
                solveCubic: function(e, t, n, r) {
                    var i = e[t],
                        s = e[t + 2],
                        o = e[t + 4],
                        u = e[t + 6],
                        a = 3 * (s - i),
                        f = 3 * (o - s) - a,
                        l = u - i - a - f;
                    return Numerical.solveCubic(l, f, a, i - n, r, Numerical.TOLERANCE)
                },
                getParameter: function(e, t, n) {
                    var r = [],
                        i = [],
                        s = Curve.solveCubic(e, 0, t, r),
                        o = Curve.solveCubic(e, 1, n, i),
                        u, a;
                    for (var f = 0; s == -1 || f < s;) {
                        if (s == -1 || (u = r[f++]) >= 0 && u <= 1) {
                            for (var l = 0; o == -1 || l < o;) {
                                if (o == -1 || (a = i[l++]) >= 0 && a <= 1) {
                                    if (s == -1) u = a;
                                    else if (o == -1) a = u;
                                    if (Math.abs(u - a) < Numerical.TOLERANCE) return (u + a) * .5
                                }
                            }
                            if (s == -1) break
                        }
                    }
                    return null
                },
                getPart: function(e, t, n) {
                    if (t > 0) e = Curve.subdivide(e, t)[1];
                    if (n < 1) e = Curve.subdivide(e, (n - t) / (1 - t))[0];
                    return e
                },
                isFlatEnough: function(e) {
                    var t = e[0],
                        n = e[1],
                        r = e[2],
                        i = e[3],
                        s = e[4],
                        o = e[5],
                        u = e[6],
                        a = e[7],
                        f = n - a,
                        l = u - t,
                        c = t * a - u * n,
                        h = f * r + l * i + c,
                        p = f * s + l * o + c;
                    return Math.abs((h * h + p * p) / (f * (f * f + l * l))) < .005
                }
            }
        }, new function() {
            function e(e) {
                var t = e[0],
                    n = e[1],
                    r = e[2],
                    i = e[3],
                    s = e[4],
                    o = e[5],
                    u = e[6],
                    a = e[7],
                    f = 9 * (r - s) + 3 * (u - t),
                    l = 6 * (t + s) - 12 * r,
                    c = 3 * (r - t),
                    h = 9 * (i - o) + 3 * (a - n),
                    p = 6 * (n + o) - 12 * i,
                    d = 3 * (i - n);
                return function(e) {
                    var t = (f * e + l) * e + c,
                        n = (h * e + p) * e + d;
                    return Math.sqrt(t * t + n * n)
                }
            }

            function t(e, t) {
                return Math.max(2, Math.min(16, Math.ceil(Math.abs(t - e) * 32)))
            }
            return {
                statics: true,
                getLength: function(n, r, i) {
                    if (r === undefined) r = 0;
                    if (i === undefined) i = 1;
                    if (n[0] == n[2] && n[1] == n[3] && n[6] == n[4] && n[7] == n[5]) {
                        var s = n[6] - n[0],
                            o = n[7] - n[1];
                        return (i - r) * Math.sqrt(s * s + o * o)
                    }
                    var u = e(n);
                    return Numerical.integrate(u, r, i, t(r, i))
                },
                getParameterAt: function(n, r, i) {
                    function s(e) {
                        var n = t(i, e);
                        h += i < e ? Numerical.integrate(f, i, e, n) : -Numerical.integrate(f, e, i, n);
                        i = e;
                        return h - r
                    }
                    if (r == 0) return i;
                    var o = r > 0,
                        u = o ? i : 0,
                        a = o ? 1 : i,
                        r = Math.abs(r),
                        f = e(n),
                        l = Numerical.integrate(f, u, a, t(u, a));
                    if (r >= l) return o ? a : u;
                    var c = r / l,
                        h = 0;
                    return Numerical.findRoot(s, f, o ? u + c : a - c, u, a, 16, Numerical.TOLERANCE)
                }
            }
        }, new function() {
            function e(e, t) {
                var n = 3,
                    r = 5,
                    i = [],
                    s = [],
                    u = [],
                    a = [];
                for (var f = 0; f <= n; f++) {
                    i[f] = e[f].subtract(t);
                    if (f < n) s[f] = e[f + 1].subtract(e[f]).multiply(n)
                }
                for (var l = 0; l < n; l++) {
                    u[l] = [];
                    for (var c = 0; c <= n; c++) u[l][c] = s[l].dot(i[c])
                }
                for (var f = 0; f <= r; f++) a[f] = new Point(f / r, 0);
                for (k = 0; k <= r; k++) {
                    var h = Math.max(0, k - n + 1),
                        p = Math.min(k, n);
                    for (var f = h; f <= p; f++) {
                        var d = k - f;
                        a[k].y += u[d][f] * o[d][f]
                    }
                }
                return a
            }

            function t(e, s) {
                switch (n(e)) {
                    case 0:
                        return [];
                    case 1:
                        if (s >= i) return [.5 * (e[0].x + e[5].x)];
                        if (r(e)) {
                            var o = new Line(e[0], e[5], true);
                            return [o.vector.getLength(true) <= Numerical.EPSILON ? o.point.x : u.intersect(o).x]
                        }
                }
                var a = [
                    []
                ],
                    f = [],
                    l = [];
                for (var c = 0; c <= 5; c++) a[0][c] = new Point(e[c]);
                for (var h = 1; h <= 5; h++) {
                    a[h] = [];
                    for (var c = 0; c <= 5 - h; c++) a[h][c] = a[h - 1][c].add(a[h - 1][c + 1]).multiply(.5)
                }
                for (var c = 0; c <= 5; c++) {
                    f[c] = a[c][0];
                    l[c] = a[5 - c][c]
                }
                return t(f, s + 1).concat(t(l, s + 1))
            }

            function n(e) {
                var t = 0,
                    n = null;
                for (var r = 0, i = e.length; r < i; r++) {
                    var s = e[r].y < 0 ? -1 : 1;
                    if (n != null && s != n) t++;
                    n = s
                }
                return t
            }

            function r(e) {
                var t = e.length - 1,
                    n = e[0].y - e[t].y,
                    r = e[t].x - e[0].x,
                    i = e[0].x * e[t].y - e[t].x * e[0].y,
                    o = 0,
                    u = 0;
                for (var a = 1; a < t; a++) {
                    var f = n * e[a].x + r * e[a].y + i,
                        l = f * f;
                    if (f < 0 && l > u) {
                        u = l
                    } else if (l > o) {
                        o = l
                    }
                }
                return Math.abs((o + u) / (2 * n * (n * n + r * r))) < s
            }
            var i = 32,
                s = Math.pow(2, -i - 1);
            var o = [
                [1, .6, .3, .1],
                [.4, .6, .6, .4],
                [.1, .3, .6, 1]
            ];
            var u = new Line(new Point(0, 0), new Point(1, 0));
            return {
                getNearestLocation: function(n, r) {
                    var i = e(this.getPoints(r), n);
                    var s = t(i, 0).concat([0, 1]);
                    var o = Infinity,
                        u, a;
                    for (var f = 0; f < s.length; f++) {
                        var l = this.getPoint(s[f]),
                            c = n.getDistance(l, true);
                        if (c < o) {
                            o = c;
                            u = s[f];
                            a = l
                        }
                    }
                    return new CurveLocation(this, u, a, Math.sqrt(o))
                },
                getNearestPoint: function(e, t) {
                    return this.getNearestLocation(e, t).getPoint()
                }
            }
        });
        CurveLocation = Base.extend({
            initialize: function(e, t, n, r) {
                this._curve = e;
                this._parameter = t;
                this._point = n;
                this._distance = r
            },
            getSegment: function() {
                if (!this._segment) {
                    var e = this._curve,
                        t = this.getParameter();
                    if (t == 0) {
                        this._segment = e._segment1
                    } else if (t == 1) {
                        this._segment = e._segment2
                    } else if (t == null) {
                        return null
                    } else {
                        this._segment = e.getLength(0, t) < e.getLength(t, 1) ? e._segment1 : e._segment2
                    }
                }
                return this._segment
            },
            getCurve: function() {
                return this._curve
            },
            getPath: function() {
                return this._curve && this._curve._path
            },
            getIndex: function() {
                return this._curve && this._curve.getIndex()
            },
            getOffset: function() {
                var e = this._curve && this._curve._path;
                return e && e._getOffset(this)
            },
            getCurveOffset: function() {
                var e = this.getParameter();
                return e != null && this._curve && this._curve.getLength(0, e)
            },
            getParameter: function() {
                if (this._parameter == null && this._curve && this._point) this._parameter = this._curve.getParameterAt(this._point);
                return this._parameter
            },
            getPoint: function() {
                if (!this._point && this._curve && this._parameter != null) this._point = this._curve.getPoint(this._parameter);
                return this._point
            },
            getTangent: function() {
                var e = this.getParameter();
                return e != null && this._curve && this._curve.getTangent(e)
            },
            getNormal: function() {
                var e = this.getParameter();
                return e != null && this._curve && this._curve.getNormal(e)
            },
            getDistance: function() {
                return this._distance
            },
            toString: function() {
                var e = [],
                    t = this.getPoint();
                if (t) e.push("point: " + t);
                var n = this.getIndex();
                if (n != null) e.push("index: " + n);
                var r = this.getParameter();
                if (r != null) e.push("parameter: " + Base.formatNumber(r));
                if (this._distance != null) e.push("distance: " + Base.formatNumber(this._distance));
                return "{ " + e.join(", ") + " }"
            }
        });
        var PathItem = this.PathItem = Item.extend({});
        var Path = this.Path = PathItem.extend({
            initialize: function(e) {
                this.base();
                this._closed = false;
                this._selectedSegmentState = 0;
                this.setSegments(!e || !Array.isArray(e) || typeof e[0] !== "object" ? arguments : e)
            },
            clone: function() {
                var e = this._clone(new Path(this._segments));
                e._closed = this._closed;
                if (this._clockwise !== undefined) e._clockwise = this._clockwise;
                return e
            },
            _changed: function(e) {
                Item.prototype._changed.call(this, e);
                if (e & ChangeFlag.GEOMETRY) {
                    delete this._strokeBounds;
                    delete this._handleBounds;
                    delete this._roughBounds;
                    delete this._length;
                    delete this._clockwise
                } else if (e & ChangeFlag.STROKE) {
                    delete this._strokeBounds
                }
            },
            getSegments: function() {
                return this._segments
            },
            setSegments: function(e) {
                if (!this._segments) {
                    this._segments = []
                } else {
                    this._selectedSegmentState = 0;
                    this._segments.length = 0;
                    if (this._curves) delete this._curves
                }
                this._add(Segment.readAll(e))
            },
            getFirstSegment: function() {
                return this._segments[0]
            },
            getLastSegment: function() {
                return this._segments[this._segments.length - 1]
            },
            getCurves: function() {
                if (!this._curves) {
                    var e = this._segments,
                        t = e.length;
                    if (!this._closed && t > 0) t--;
                    this._curves = new Array(t);
                    for (var n = 0; n < t; n++) this._curves[n] = Curve.create(this, e[n], e[n + 1] || e[0])
                }
                return this._curves
            },
            getFirstCurve: function() {
                return this.getCurves()[0]
            },
            getLastCurve: function() {
                var e = this.getCurves();
                return e[e.length - 1]
            },
            getClosed: function() {
                return this._closed
            },
            setClosed: function(e) {
                if (this._closed != (e = !! e)) {
                    this._closed = e;
                    if (this._curves) {
                        var t = this._segments.length,
                            n;
                        if (!e && t > 0) t--;
                        this._curves.length = t;
                        if (e) this._curves[n = t - 1] = Curve.create(this, this._segments[n], this._segments[0])
                    }
                    this._changed(Change.GEOMETRY)
                }
            },
            _transform: function(e, t) {
                if (!e.isIdentity()) {
                    var n = new Array(6);
                    for (var r = 0, i = this._segments.length; r < i; r++) {
                        this._segments[r]._transformCoordinates(e, n, true)
                    }
                    var s = this.getFillColor(),
                        o = this.getStrokeColor();
                    if (s && s.transform) s.transform(e);
                    if (o && o.transform) o.transform(e)
                }
            },
            _add: function(e, t) {
                var n = this._segments,
                    r = this._curves,
                    i = e.length,
                    s = t == null,
                    t = s ? n.length : t,
                    o = this.isFullySelected();
                for (var u = 0; u < i; u++) {
                    var a = e[u];
                    if (a._path) {
                        a = e[u] = new Segment(a)
                    }
                    a._path = this;
                    a._index = t + u;
                    if (o) a._selectionState = SelectionState.POINT;
                    if (a._selectionState) this._updateSelection(a, 0, a._selectionState)
                }
                if (s) {
                    n.push.apply(n, e)
                } else {
                    n.splice.apply(n, [t, 0].concat(e));
                    for (var u = t + i, f = n.length; u < f; u++) {
                        n[u]._index = u
                    }
                } if (r && --t >= 0) {
                    r.splice(t, 0, Curve.create(this, n[t], n[t + 1]));
                    var l = r[t + i];
                    if (l) {
                        l._segment1 = n[t + i]
                    }
                }
                this._changed(Change.GEOMETRY);
                return e
            },
            add: function(e) {
                return arguments.length > 1 && typeof e !== "number" ? this._add(Segment.readAll(arguments)) : this._add([Segment.read(arguments)])[0]
            },
            insert: function(e, t) {
                return arguments.length > 2 && typeof t !== "number" ? this._add(Segment.readAll(arguments, 1), e) : this._add([Segment.read(arguments, 1)], e)[0]
            },
            addSegment: function(e) {
                return this._add([Segment.read(arguments)])[0]
            },
            insertSegment: function(e, t) {
                return this._add([Segment.read(arguments, 1)], e)[0]
            },
            addSegments: function(e) {
                return this._add(Segment.readAll(e))
            },
            insertSegments: function(e, t) {
                return this._add(Segment.readAll(t), e)
            },
            removeSegment: function(e) {
                var t = this.removeSegments(e, e + 1);
                return t[0] || null
            },
            removeSegments: function(e, t) {
                e = e || 0;
                t = Base.pick(t, this._segments.length);
                var n = this._segments,
                    r = this._curves,
                    i = t >= n.length,
                    s = n.splice(e, t - e),
                    o = s.length;
                if (!o) return s;
                for (var u = 0; u < o; u++) {
                    var a = s[u];
                    if (a._selectionState) this._updateSelection(a, a._selectionState, 0);
                    s._index = s._path = undefined
                }
                for (var u = e, f = n.length; u < f; u++) n[u]._index = u;
                if (r) {
                    r.splice(e, o);
                    var l;
                    if (l = r[e - 1]) l._segment2 = n[e];
                    if (l = r[e]) l._segment1 = n[e];
                    if (i && this._closed && (l = r[r.length - 1])) l._segment2 = n[0]
                }
                this._changed(Change.GEOMETRY);
                return s
            },
            isFullySelected: function() {
                return this._selected && this._selectedSegmentState == this._segments.length * SelectionState.POINT
            },
            setFullySelected: function(e) {
                var t = this._segments.length;
                this._selectedSegmentState = e ? t * SelectionState.POINT : 0;
                for (var n = 0; n < t; n++) this._segments[n]._selectionState = e ? SelectionState.POINT : 0;
                this.setSelected(e)
            },
            _updateSelection: function(e, t, n) {
                e._selectionState = n;
                var r = this._selectedSegmentState += n - t;
                if (r > 0) this.setSelected(true)
            },
            flatten: function(e) {
                var t = new PathFlattener(this),
                    n = 0,
                    r = t.length / Math.ceil(t.length / e),
                    i = t.length + (this._closed ? -r : r) / 2;
                var s = [];
                while (n <= i) {
                    s.push(new Segment(t.evaluate(n, 0)));
                    n += r
                }
                this.setSegments(s)
            },
            simplify: function(e) {
                if (this._segments.length > 2) {
                    var t = new PathFitter(this, e || 2.5);
                    this.setSegments(t.fit())
                }
            },
            isClockwise: function() {
                function e(e, i) {
                    if (n !== undefined) t += (n - e) * (i + r);
                    n = e;
                    r = i
                }
                if (this._clockwise !== undefined) return this._clockwise;
                var t = 0,
                    n, r;
                for (var i = 0, s = this._segments.length; i < s; i++) {
                    var o = this._segments[i],
                        u = this._segments[i + 1 < s ? i + 1 : 0],
                        a = o._point,
                        f = o._handleOut,
                        l = u._handleIn,
                        c = u._point;
                    e(a._x, a._y);
                    e(a._x + f._x, a._y + f._y);
                    e(c._x + l._x, c._y + l._y);
                    e(c._x, c._y)
                }
                return t > 0
            },
            setClockwise: function(e) {
                if (this.isClockwise() != (e = !! e)) {
                    this.reverse();
                    this._clockwise = e
                }
            },
            reverse: function() {
                this._segments.reverse();
                for (var e = 0, t = this._segments.length; e < t; e++) {
                    var n = this._segments[e];
                    var r = n._handleIn;
                    n._handleIn = n._handleOut;
                    n._handleOut = r
                }
                if (this._clockwise !== undefined) this._clockwise = !this._clockwise
            },
            join: function(e) {
                if (e) {
                    var t = e._segments,
                        n = this.getLastSegment(),
                        r = e.getLastSegment();
                    if (n._point.equals(r._point)) e.reverse();
                    var i = e.getFirstSegment();
                    if (n._point.equals(i._point)) {
                        n.setHandleOut(i._handleOut);
                        this._add(t.slice(1))
                    } else {
                        var s = this.getFirstSegment();
                        if (s._point.equals(i._point)) e.reverse();
                        r = e.getLastSegment();
                        if (s._point.equals(r._point)) {
                            s.setHandleIn(r._handleIn);
                            this._add(t.slice(0, t.length - 1), 0)
                        } else {
                            this._add(t.slice(0))
                        }
                    }
                    e.remove();
                    var s = this.getFirstSegment();
                    n = this.getLastSegment();
                    if (n._point.equals(s._point)) {
                        s.setHandleIn(n._handleIn);
                        n.remove();
                        this.setClosed(true)
                    }
                    this._changed(Change.GEOMETRY);
                    return true
                }
                return false
            },
            getLength: function() {
                if (this._length == null) {
                    var e = this.getCurves();
                    this._length = 0;
                    for (var t = 0, n = e.length; t < n; t++) this._length += e[t].getLength()
                }
                return this._length
            },
            _getOffset: function(e) {
                var t = e && e.getIndex();
                if (t != null) {
                    var n = this.getCurves(),
                        r = 0;
                    for (var i = 0; i < t; i++) r += n[i].getLength();
                    var s = n[t];
                    return r + s.getLength(0, e.getParameter())
                }
                return null
            },
            getLocation: function(e) {
                var t = this.getCurves();
                for (var n = 0, r = t.length; n < r; n++) {
                    var i = t[n];
                    var s = i.getParameter(e);
                    if (s != null) return new CurveLocation(i, s)
                }
                return null
            },
            getLocationAt: function(e, t) {
                var n = this.getCurves(),
                    r = 0;
                if (t) {
                    var i = ~~e;
                    return new CurveLocation(n[i], e - i)
                }
                for (var s = 0, o = n.length; s < o; s++) {
                    var u = r,
                        a = n[s];
                    r += a.getLength();
                    if (r >= e) {
                        return new CurveLocation(a, a.getParameterAt(e - u))
                    }
                }
                if (e <= this.getLength()) return new CurveLocation(n[n.length - 1], 1);
                return null
            },
            getPointAt: function(e, t) {
                var n = this.getLocationAt(e, t);
                return n && n.getPoint()
            },
            getTangentAt: function(e, t) {
                var n = this.getLocationAt(e, t);
                return n && n.getTangent()
            },
            getNormalAt: function(e, t) {
                var n = this.getLocationAt(e, t);
                return n && n.getNormal()
            },
            getNearestLocation: function(e, t) {
                var n = this.getCurves(),
                    r = Infinity,
                    i = null;
                for (var s = 0, o = n.length; s < o; s++) {
                    var u = n[s].getNearestLocation(e, t);
                    if (u._distance < r) {
                        r = u._distance;
                        i = u
                    }
                }
                return i
            },
            getNearestPoint: function(e, t) {
                return this.getNearestLocation(e, t).getPoint()
            },
            contains: function(e, t) {
                e = Point.read(arguments);
                if (!this._closed || !this.getRoughBounds(t)._containsPoint(e)) return false;
                var n = this.getCurves(),
                    r = 0,
                    i = [];
                for (var s = 0, o = n.length; s < o; s++) r += n[s].getCrossings(e, t, i);
                return (r & 1) == 1
            },
            _hitTest: function(e, t, n) {
                function r(r, s) {
                    r._transformCoordinates(n, a);
                    for (var o = s || t.segments ? 0 : 2, u = !s && t.handles ? 6 : 2; o < u; o += 2) {
                        if (e.getDistance(a[o], a[o + 1]) < i) return new HitResult(o == 0 ? "segment" : "handle-" + (o == 2 ? "in" : "out"), f, {
                            segment: r
                        })
                    }
                }
                var i = t.tolerance || 0,
                    s = (t.stroke ? this.getStrokeWidth() / 2 : 0) + i,
                    o, u;
                var a = [],
                    f = this;
                if (t.ends && !t.segments && !this._closed) {
                    if (u = r(this.getFirstSegment(), true) || r(this.getLastSegment(), true)) return u
                } else if (t.segments || t.handles) {
                    for (var l = 0, c = this._segments.length; l < c; l++) {
                        if (u = r(this._segments[l])) return u
                    }
                }
                if (t.stroke && s > 0) o = this.getNearestLocation(e, n);
                if (!(o && o._distance <= s) && t.fill && this.getFillColor() && this.contains(e, n)) return new HitResult("fill", this);
                if (!o && t.stroke && s > 0) o = this.getNearestLocation(e, n);
                if (o && o._distance <= s) return t.stroke ? new HitResult("stroke", this, {
                    location: o
                }) : new HitResult("fill", this)
            }
        }, new function() {
            function e(e, n) {
                for (var r = 0, i = n.length; r < i; r++) {
                    var s = n[r],
                        o = s._point,
                        u = s._selectionState,
                        a = u & SelectionState.POINT;
                    if (a || u & SelectionState.HANDLE_IN) t(e, o, s._handleIn);
                    if (a || u & SelectionState.HANDLE_OUT) t(e, o, s._handleOut);
                    e.save();
                    e.beginPath();
                    e.rect(o._x - 2, o._y - 2, 4, 4);
                    e.fill();
                    if (!a) {
                        e.beginPath();
                        e.rect(o._x - 1, o._y - 1, 2, 2);
                        e.fillStyle = "#ffffff";
                        e.fill()
                    }
                    e.restore()
                }
            }

            function t(e, t, n) {
                if (!n.isZero()) {
                    var r = t._x + n._x,
                        i = t._y + n._y;
                    e.beginPath();
                    e.moveTo(t._x, t._y);
                    e.lineTo(r, i);
                    e.stroke();
                    e.beginPath();
                    e.arc(r, i, 1.75, 0, Math.PI * 2, true);
                    e.fill()
                }
            }

            function n(e, t) {
                function n(t) {
                    var n = r[t],
                        i = n._point,
                        a = i._x,
                        f = i._y,
                        l = n._handleIn;
                    if (!s) {
                        e.moveTo(a, f)
                    } else {
                        if (l.isZero() && s.isZero()) {
                            e.lineTo(a, f)
                        } else {
                            e.bezierCurveTo(o, u, l._x + a, l._y + f, a, f)
                        }
                    }
                    s = n._handleOut;
                    o = s._x + a;
                    u = s._y + f
                }
                var r = t._segments,
                    i = r.length,
                    s, o, u;
                for (var a = 0; a < i; a++) n(a);
                if (t._closed && i > 1) n(0)
            }

            function r(e, t, n, r) {
                var i = new PathFlattener(t),
                    s = r,
                    o, u = 0;
                while (s < i.length) {
                    o = s + n[u++ % n.length];
                    i.drawPart(e, s, o);
                    s = o + n[u++ % n.length]
                }
            }
            return {
                draw: function(t, i) {
                    if (!i.compound) t.beginPath();
                    var s = this.getFillColor(),
                        o = this.getStrokeColor(),
                        u = this.getDashArray() || [],
                        a = !! u.length;
                    if (i.compound || i.selection || this._clipMask || s || o && !a) {
                        n(t, this)
                    }
                    if (i.selection) {
                        t.stroke();
                        e(t, this._segments)
                    } else if (this._clipMask) {
                        t.clip()
                    } else if (!i.compound && (s || o)) {
                        t.save();
                        this._setStyles(t);
                        if (!s || !o) t.globalAlpha = this._opacity;
                        if (s) {
                            t.fillStyle = s.getCanvasStyle(t);
                            t.fill()
                        }
                        if (o) {
                            t.strokeStyle = o.getCanvasStyle(t);
                            if (a) {
                                t.beginPath();
                                r(t, this, u, this.getDashOffset())
                            }
                            t.stroke()
                        }
                        t.restore()
                    }
                }
            }
        }, new function() {
            function e(e) {
                var t = e.length,
                    n = [],
                    r = [],
                    i = 2;
                n[0] = e[0] / i;
                for (var s = 1; s < t; s++) {
                    r[s] = 1 / i;
                    i = (s < t - 1 ? 4 : 2) - r[s];
                    n[s] = (e[s] - n[s - 1]) / i
                }
                for (var s = 1; s < t; s++) {
                    n[t - s - 1] -= r[t - s] * n[t - s]
                }
                return n
            }
            var t = {
                getStrokeWidth: "lineWidth",
                getStrokeJoin: "lineJoin",
                getStrokeCap: "lineCap",
                getMiterLimit: "miterLimit"
            };
            return {
                _setStyles: function(e) {
                    for (var n in t) {
                        var r = this._style[n]();
                        if (r) e[t[n]] = r
                    }
                },
                smooth: function() {
                    var t = this._segments,
                        n = t.length,
                        r = n,
                        i;
                    if (n <= 2) return;
                    if (this._closed) {
                        i = Math.min(n, 4);
                        r += Math.min(n, i) * 2
                    } else {
                        i = 0
                    }
                    var s = [];
                    for (var o = 0; o < n; o++) s[o + i] = t[o]._point;
                    if (this._closed) {
                        for (var o = 0; o < i; o++) {
                            s[o] = t[o + n - i]._point;
                            s[o + n + i] = t[o]._point
                        }
                    } else {
                        r--
                    }
                    var u = [];
                    for (var o = 1; o < r - 1; o++) u[o] = 4 * s[o]._x + 2 * s[o + 1]._x;
                    u[0] = s[0]._x + 2 * s[1]._x;
                    u[r - 1] = 3 * s[r - 1]._x;
                    var a = e(u);
                    for (var o = 1; o < r - 1; o++) u[o] = 4 * s[o]._y + 2 * s[o + 1]._y;
                    u[0] = s[0]._y + 2 * s[1]._y;
                    u[r - 1] = 3 * s[r - 1]._y;
                    var f = e(u);
                    if (this._closed) {
                        for (var o = 0, l = n; o < i; o++, l++) {
                            var c = o / i;
                            var h = 1 - c;
                            a[l] = a[o] * c + a[l] * h;
                            f[l] = f[o] * c + f[l] * h;
                            var p = o + i,
                                d = l + i;
                            a[d] = a[p] * h + a[d] * c;
                            f[d] = f[p] * h + f[d] * c
                        }
                        r--
                    }
                    var v = null;
                    for (var o = i; o <= r - i; o++) {
                        var m = t[o - i];
                        if (v) m.setHandleIn(v.subtract(m._point));
                        if (o < r) {
                            m.setHandleOut((new Point(a[o], f[o])).subtract(m._point));
                            if (o < r - 1) v = new Point(2 * s[o + 1]._x - a[o + 1], 2 * s[o + 1]._y - f[o + 1]);
                            else v = new Point((s[r]._x + a[r - 1]) / 2, (s[r]._y + f[r - 1]) / 2)
                        }
                    }
                    if (this._closed && v) {
                        var m = this._segments[0];
                        m.setHandleIn(v.subtract(m._point))
                    }
                }
            }
        }, new function() {
            function e(e) {
                var t = e._segments;
                if (t.length == 0) throw new Error("Use a moveTo() command first");
                return t[t.length - 1]
            }
            return {
                moveTo: function(e) {
                    if (!this._segments.length) this._add([new Segment(Point.read(arguments))])
                },
                moveBy: function(e) {
                    throw new Error("moveBy() is unsupported on Path items.")
                },
                lineTo: function(e) {
                    this._add([new Segment(Point.read(arguments))])
                },
                cubicCurveTo: function(t, n, r) {
                    t = Point.read(arguments, 0, 1);
                    n = Point.read(arguments, 1, 1);
                    r = Point.read(arguments, 2, 1);
                    var i = e(this);
                    i.setHandleOut(t.subtract(i._point));
                    this._add([new Segment(r, n.subtract(r))])
                },
                quadraticCurveTo: function(t, n) {
                    t = Point.read(arguments, 0, 1);
                    n = Point.read(arguments, 1, 1);
                    var r = e(this)._point;
                    this.cubicCurveTo(t.add(r.subtract(t).multiply(1 / 3)), t.add(n.subtract(t).multiply(1 / 3)), n)
                },
                curveTo: function(t, n, r) {
                    t = Point.read(arguments, 0, 1);
                    n = Point.read(arguments, 1, 1);
                    var i = Base.pick(r, .5),
                        s = 1 - i,
                        o = e(this)._point,
                        u = t.subtract(o.multiply(s * s)).subtract(n.multiply(i * i)).divide(2 * i * s);
                    if (u.isNaN()) throw new Error("Cannot put a curve through points with parameter = " + i);
                    this.quadraticCurveTo(u, n)
                },
                arcTo: function(t, n) {
                    var r = e(this),
                        i = r._point,
                        s;
                    if (n === undefined) n = true;
                    if (typeof n === "boolean") {
                        t = Point.read(arguments, 0, 1);
                        var o = i.add(t).divide(2),
                            s = o.add(o.subtract(i).rotate(n ? -90 : 90))
                    } else {
                        s = Point.read(arguments, 0, 1);
                        t = Point.read(arguments, 1, 1)
                    }
                    var u = new Line(i.add(s).divide(2), s.subtract(i).rotate(90)),
                        a = new Line(s.add(t).divide(2), t.subtract(s).rotate(90)),
                        f = u.intersect(a),
                        l = new Line(i, t, true),
                        c = l.getSide(s);
                    if (!f) {
                        if (!c) return this.lineTo(t);
                        throw new Error("Cannot put an arc through the given points: " + [i, s, t])
                    }
                    var h = i.subtract(f),
                        p = h.getLength(),
                        d = h.getDirectedAngle(t.subtract(f)),
                        v = l.getSide(f);
                    if (v == 0) {
                        d = c * Math.abs(d)
                    } else if (c == v) {
                        d -= 360 * (d < 0 ? -1 : 1)
                    }
                    var m = Math.abs(d),
                        g = m >= 360 ? 4 : Math.ceil(m / 90),
                        y = d / g,
                        b = y * Math.PI / 360,
                        w = 4 / 3 * Math.sin(b) / (1 + Math.cos(b)),
                        E = [];
                    for (var S = 0; S <= g; S++) {
                        var x = S < g ? f.add(h) : t;
                        var T = S < g ? h.rotate(90).multiply(w) : null;
                        if (S == 0) {
                            r.setHandleOut(T)
                        } else {
                            E.push(new Segment(x, h.rotate(-90).multiply(w), T))
                        }
                        h = h.rotate(y)
                    }
                    this._add(E)
                },
                lineBy: function(t) {
                    t = Point.read(arguments);
                    var n = e(this);
                    this.lineTo(n._point.add(t))
                },
                curveBy: function(t, n, r) {
                    t = Point.read(t);
                    n = Point.read(n);
                    var i = e(this)._point;
                    this.curveTo(i.add(t), i.add(n), r)
                },
                arcBy: function(t, n) {
                    t = Point.read(t);
                    n = Point.read(n);
                    var r = e(this)._point;
                    this.arcBy(r.add(t), r.add(n))
                },
                closePath: function() {
                    this.setClosed(true)
                }
            }
        }, new function() {
            function e(e, t, n) {
                function r(e) {
                    e._transformCoordinates(t, o, false);
                    for (var r = 0; r < 2; r++) {
                        var i = u[r],
                            s = u[r + 4],
                            h = o[r + 2],
                            p = o[r];

                        function d(e, t) {
                            var o = 0;
                            if (e == null) {
                                var u = 1 - t;
                                e = u * u * u * i + 3 * u * u * t * s + 3 * u * t * t * h + t * t * t * p;
                                o = n ? n[r] : 0
                            }
                            var l = e - o,
                                c = e + o;
                            if (l < a[r]) a[r] = l;
                            if (c > f[r]) f[r] = c
                        }
                        d(p, null);
                        var v = 3 * (s - h) - i + p,
                            m = 2 * (i + h) - 4 * s,
                            g = s - i;
                        if (v == 0) {
                            if (m == 0) continue;
                            var y = -g / m;
                            if (l < y && y < c) d(null, y);
                            continue
                        }
                        var b = m * m - 4 * v * g;
                        if (b < 0) continue;
                        var w = Math.sqrt(b),
                            E = -.5 / v,
                            S = (m - w) * E,
                            x = (m + w) * E;
                        if (l < S && S < c) d(null, S);
                        if (l < x && x < c) d(null, x)
                    }
                    var T = u;
                    u = o;
                    o = T
                }
                var i = e._segments,
                    s = i[0];
                if (!s) return null;
                var o = new Array(6),
                    u = new Array(6);
                if (t && t.isIdentity()) t = null;
                s._transformCoordinates(t, u, false);
                var a = u.slice(0, 2),
                    f = a.slice(0),
                    l = Numerical.TOLERANCE,
                    c = 1 - l;
                for (var h = 1, p = i.length; h < p; h++) r(i[h]);
                if (e._closed) r(s);
                return Rectangle.create(a[0], a[1], f[0] - a[0], f[1] - a[1])
            }

            function t(e, t) {
                if (!t) return [e, e];
                var n = t.createShiftless(),
                    r = n.transform(new Point(e, 0)),
                    i = n.transform(new Point(0, e)),
                    s = r.getAngleInRadians(),
                    o = r.getLength(),
                    u = i.getLength();
                var a = -Math.atan(u * Math.tan(s)),
                    f = +Math.atan(u / Math.tan(s)),
                    l = o * Math.cos(a) * Math.cos(s) - u * Math.sin(a) * Math.sin(s),
                    c = u * Math.sin(f) * Math.cos(s) + o * Math.cos(f) * Math.sin(s);
                return [Math.abs(l), Math.abs(c)]
            }
            return {
                getBounds: function() {
                    var t = arguments[0] === undefined;
                    if (t && this._bounds) return this._bounds;
                    var n = this._createBounds(e(this, arguments[0]));
                    if (t) this._bounds = n;
                    return n
                },
                getStrokeBounds: function() {
                    function n(e) {
                        m = m.include(u ? u.transform(e) : e)
                    }

                    function r(e, t) {
                        var r = e.getPoint(t),
                            i = e.getNormal(t).normalize(f);
                        n(r.add(i));
                        n(r.subtract(i))
                    }

                    function i(e, t) {
                        if (t === "round" || !e._handleIn.isZero() && !e._handleOut.isZero()) {
                            m = m.unite(g.setCenter(u ? u.transform(e._point) : e._point))
                        } else if (t == "bevel") {
                            var s = e.getCurve();
                            r(s, 0);
                            r(s.getPrevious(), 1)
                        } else if (t == "miter") {
                            var o = e.getCurve(),
                                a = o.getPrevious(),
                                l = o.getPoint(0),
                                c = a.getNormal(1).normalize(f),
                                h = o.getNormal(0).normalize(f),
                                d = new Line(l.subtract(c), new Point(-c.y, c.x)),
                                v = new Line(l.subtract(h), new Point(-h.y, h.x)),
                                y = d.intersect(v);
                            if (!y || l.getDistance(y) > p) {
                                i(e, "bevel")
                            } else {
                                n(y)
                            }
                        }
                    }

                    function s(e, t, r) {
                        switch (t) {
                            case "round":
                                return i(e, t);
                            case "butt":
                            case "square":
                                var s = e.getCurve(),
                                    o = s.getPoint(r),
                                    u = s.getNormal(r).normalize(f);
                                if (t === "square") o = o.add(u.y, -u.x);
                                n(o.add(u));
                                n(o.subtract(u));
                                break
                        }
                    }
                    if (!this._style._strokeColor || !this._style._strokeWidth) return this.getBounds.apply(this, arguments);
                    var o = arguments[0] === undefined;
                    if (o && this._strokeBounds) return this._strokeBounds;
                    var u = arguments[0],
                        a = this.getStrokeWidth(),
                        f = a / 2,
                        l = t(f, u),
                        c = this.getStrokeJoin(),
                        h = this.getStrokeCap(),
                        p = this.getMiterLimit() * a / 2,
                        d = this._segments,
                        v = d.length,
                        m = e(this, u, t(f));
                    var g = new Rectangle((new Size(l)).multiply(2));
                    for (var y = 1, b = v - (this._closed ? 0 : 1); y < b; y++) {
                        i(d[y], c)
                    }
                    if (this._closed) {
                        i(d[0], c)
                    } else {
                        s(d[0], h, 0);
                        s(d[v - 1], h, 1)
                    } if (o) this._strokeBounds = m;
                    return m
                },
                getHandleBounds: function() {
                    var e = arguments[0],
                        t = e === undefined;
                    if (t && this._handleBounds) return this._handleBounds;
                    var n = new Array(6),
                        r = arguments[1] / 2 || 0,
                        i = arguments[2] / 2 || 0,
                        s = !this._closed,
                        o = Infinity,
                        u = -o,
                        a = o,
                        f = u;
                    for (var l = 0, c = this._segments.length; l < c; l++) {
                        var h = this._segments[l];
                        h._transformCoordinates(e, n, false);
                        for (var p = 0; p < 6; p += 2) {
                            var d = p == 0 ? i : r,
                                v = n[p],
                                m = n[p + 1],
                                g = v - d,
                                y = v + d,
                                b = m - d,
                                w = m + d;
                            if (g < o) o = g;
                            if (y > u) u = y;
                            if (b < a) a = b;
                            if (w > f) f = w
                        }
                    }
                    var E = Rectangle.create(o, a, u - o, f - a);
                    if (t) this._handleBounds = E;
                    return E
                },
                getRoughBounds: function() {
                    var e = arguments[0] === undefined;
                    if (e && this._roughBounds) return this._roughBounds;
                    var t = this.getHandleBounds(arguments[0], this.strokeWidth, this.getStrokeJoin() == "miter" ? this.strokeWidth * this.getMiterLimit() : this.strokeWidth);
                    if (e) this._roughBounds = t;
                    return t
                }
            }
        });
        Path.inject({
            statics: new function() {
                var e = 2 / 3 * (Math.sqrt(2) - 1);
                var t = [new Segment([0, .5], [0, e], [0, -e]), new Segment([.5, 0], [-e, 0], [e, 0]), new Segment([1, .5], [0, -e], [0, e]), new Segment([.5, 1], [e, 0], [-e, 0])];
                return {
                    Line: function() {
                        var e = Math.floor(arguments.length / 2);
                        return new Path(Segment.read(arguments, 0, e), Segment.read(arguments, e, e))
                    },
                    Rectangle: function(e) {
                        e = Rectangle.read(arguments);
                        var t = e.x,
                            n = e.y;
                        right = t + e.width, bottom = n + e.height, path = new Path;
                        path._add([new Segment(Point.create(t, bottom)), new Segment(Point.create(t, n)), new Segment(Point.create(right, n)), new Segment(Point.create(right, bottom))]);
                        path._closed = true;
                        return path
                    },
                    RoundRectangle: function(t, n) {
                        if (arguments.length == 2) {
                            t = Rectangle.read(arguments, 0, 1);
                            n = Size.read(arguments, 1, 1)
                        } else if (arguments.length == 6) {
                            t = Rectangle.read(arguments, 0, 4);
                            n = Size.read(arguments, 4, 2)
                        }
                        n = Size.min(n, t.getSize(true).divide(2));
                        var r = new Path,
                            i = n.multiply(e * 2),
                            s = t.getBottomLeft(true),
                            o = t.getTopLeft(true),
                            u = t.getTopRight(true),
                            a = t.getBottomRight(true);
                        r._add([new Segment(s.add(n.width, 0), null, [-i.width, 0]), new Segment(s.subtract(0, n.height), [0, i.height], null), new Segment(o.add(0, n.height), null, [0, -i.height]), new Segment(o.add(n.width, 0), [-i.width, 0], null), new Segment(u.subtract(n.width, 0), null, [i.width, 0]), new Segment(u.add(0, n.height), [0, -i.height], null), new Segment(a.subtract(0, n.height), null, [0, i.height]), new Segment(a.subtract(n.width, 0), [i.width, 0], null)]);
                        r._closed = true;
                        return r
                    },
                    Oval: function(e) {
                        e = Rectangle.read(arguments);
                        var n = new Path,
                            r = e.getPoint(true),
                            i = e.getSize(true),
                            s = new Array(4);
                        for (var o = 0; o < 4; o++) {
                            var u = t[o];
                            s[o] = new Segment(u._point.multiply(i).add(r), u._handleIn.multiply(i), u._handleOut.multiply(i))
                        }
                        n._add(s);
                        n._closed = true;
                        return n
                    },
                    Circle: function(e, t) {
                        if (arguments.length == 3) {
                            e = Point.read(arguments, 0, 2);
                            t = arguments[2]
                        } else {
                            e = Point.read(arguments, 0, 1)
                        }
                        return Path.Oval(new Rectangle(e.subtract(t), Size.create(t * 2, t * 2)))
                    },
                    Arc: function(e, t, n) {
                        var r = new Path;
                        r.moveTo(e);
                        r.arcTo(t, n);
                        return r
                    },
                    RegularPolygon: function(e, t, n) {
                        e = Point.read(arguments, 0, 1);
                        var r = new Path,
                            i = 360 / t,
                            s = !(t % 3),
                            o = new Point(0, s ? -n : n),
                            u = s ? -1 : .5,
                            a = new Array(t);
                        for (var f = 0; f < t; f++) {
                            a[f] = new Segment(e.add(o.rotate((f + u) * i)))
                        }
                        r._add(a);
                        r._closed = true;
                        return r
                    },
                    Star: function(e, t, n, r) {
                        e = Point.read(arguments, 0, 1);
                        t *= 2;
                        var i = new Path,
                            s = 360 / t,
                            o = new Point(0, -1),
                            u = new Array(t);
                        for (var a = 0; a < t; a++) {
                            u[a] = new Segment(e.add(o.rotate(s * a).multiply(a % 2 ? r : n)))
                        }
                        i._add(u);
                        i._closed = true;
                        return i
                    }
                }
            }
        });
        var CompoundPath = this.CompoundPath = PathItem.extend({
            initialize: function(e) {
                this.base();
                this._children = [];
                this._namedChildren = {};
                var t = !e || !Array.isArray(e) || typeof e[0] !== "object" ? arguments : e;
                this.addChildren(t)
            },
            insertChild: function(e, t) {
                this.base(e, t);
                if (t._clockwise === undefined) t.setClockwise(t._index == 0)
            },
            simplify: function() {
                if (this._children.length == 1) {
                    var e = this._children[0];
                    e.insertAbove(this);
                    this.remove();
                    return e
                }
                return this
            },
            smooth: function() {
                for (var e = 0, t = this._children.length; e < t; e++) this._children[e].smooth()
            },
            draw: function(e, t) {
                var n = this._children.length;
                if (n == 0) {
                    return
                }
                var r = this._children[0];
                e.beginPath();
                t.compound = true;
                for (var i = 0; i < n; i++) Item.draw(this._children[i], e, t);
                r._setStyles(e);
                var s = r.getFillColor(),
                    o = r.getStrokeColor();
                if (s) {
                    e.fillStyle = s.getCanvasStyle(e);
                    e.fill()
                }
                if (o) {
                    e.strokeStyle = o.getCanvasStyle(e);
                    e.stroke()
                }
                t.compound = false
            }
        }, new function() {
            function e(e) {
                if (!e._children.length) throw new Error("Use a moveTo() command first");
                return e._children[e._children.length - 1]
            }
            var t = {
                moveTo: function(e) {
                    var t = new Path;
                    this.addChild(t);
                    t.moveTo.apply(t, arguments)
                },
                moveBy: function(t) {
                    this.moveTo(e(this).getLastSegment()._point.add(Point.read(arguments)))
                },
                closePath: function() {
                    e(this).setClosed(true)
                }
            };
            Base.each(["lineTo", "cubicCurveTo", "quadraticCurveTo", "curveTo", "arcTo", "lineBy", "curveBy", "arcBy"], function(n) {
                t[n] = function() {
                    var t = e(this);
                    t[n].apply(t, arguments)
                }
            });
            return t
        });
        var PathFlattener = Base.extend({
            initialize: function(e) {
                function t(e, t) {
                    var n = Curve.getValues(e, t);
                    s.curves.push(n);
                    s._computeParts(n, e._index, 0, 1)
                }
                this.curves = [];
                this.parts = [];
                this.length = 0;
                this.index = 0;
                var n = e._segments,
                    r = n[0],
                    i, s = this;
                for (var o = 1, u = n.length; o < u; o++) {
                    i = n[o];
                    t(r, i);
                    r = i
                }
                if (e._closed) t(i, n[0])
            },
            _computeParts: function(e, t, n, r) {
                if (r - n > 1 / 32 && !Curve.isFlatEnough(e)) {
                    var i = Curve.subdivide(e);
                    var s = (n + r) / 2;
                    this._computeParts(i[0], t, n, s);
                    this._computeParts(i[1], t, s, r)
                } else {
                    var o = e[6] - e[0],
                        u = e[7] - e[1],
                        a = Math.sqrt(o * o + u * u);
                    if (a > Numerical.TOLERANCE) {
                        this.length += a;
                        this.parts.push({
                            offset: this.length,
                            value: r,
                            index: t
                        })
                    }
                }
            },
            getParameterAt: function(e) {
                var t, n = this.index;
                for (;;) {
                    t = n;
                    if (n == 0 || this.parts[--n].offset < e) break
                }
                for (var r = this.parts.length; t < r; t++) {
                    var i = this.parts[t];
                    if (i.offset >= e) {
                        this.index = t;
                        var s = this.parts[t - 1];
                        var o = s && s.index == i.index ? s.value : 0,
                            u = s ? s.offset : 0;
                        return {
                            value: o + (i.value - o) * (e - u) / (i.offset - u),
                            index: i.index
                        }
                    }
                }
                var i = this.parts[this.parts.length - 1];
                return {
                    value: 1,
                    index: i.index
                }
            },
            evaluate: function(e, t) {
                var n = this.getParameterAt(e);
                return Curve.evaluate(this.curves[n.index], n.value, t)
            },
            drawPart: function(e, t, n) {
                t = this.getParameterAt(t);
                n = this.getParameterAt(n);
                for (var r = t.index; r <= n.index; r++) {
                    var i = Curve.getPart(this.curves[r], r == t.index ? t.value : 0, r == n.index ? n.value : 1);
                    if (r == t.index) e.moveTo(i[0], i[1]);
                    e.bezierCurveTo.apply(e, i.slice(2))
                }
            }
        });
        var PathFitter = Base.extend({
            initialize: function(e, t) {
                this.points = [];
                var n = e._segments,
                    r;
                for (var i = 0, s = n.length; i < s; i++) {
                    var o = n[i].point.clone();
                    if (!r || !r.equals(o)) {
                        this.points.push(o);
                        r = o
                    }
                }
                this.error = t
            },
            fit: function() {
                this.segments = [new Segment(this.points[0])];
                this.fitCubic(0, this.points.length - 1, this.points[1].subtract(this.points[0]).normalize(), this.points[this.points.length - 2].subtract(this.points[this.points.length - 1]).normalize());
                return this.segments
            },
            fitCubic: function(e, t, n, r) {
                if (t - e == 1) {
                    var i = this.points[e],
                        s = this.points[t],
                        o = i.getDistance(s) / 3;
                    this.addCurve([i, i.add(n.normalize(o)), s.add(r.normalize(o)), s]);
                    return
                }
                var u = this.chordLengthParameterize(e, t),
                    a = Math.max(this.error, this.error * this.error),
                    f, l;
                for (var c = 0; c <= 4; c++) {
                    var h = this.generateBezier(e, t, u, n, r);
                    var p = this.findMaxError(e, t, h, u);
                    if (p.error < this.error) {
                        this.addCurve(h);
                        return
                    }
                    l = p.index;
                    if (p.error >= a) break;
                    this.reparameterize(e, t, u, h);
                    a = p.error
                }
                var d = this.points[l - 1].subtract(this.points[l]),
                    v = this.points[l].subtract(this.points[l + 1]),
                    m = d.add(v).divide(2).normalize();
                this.fitCubic(e, l, n, m);
                this.fitCubic(l, t, m.negate(), r)
            },
            addCurve: function(e) {
                var t = this.segments[this.segments.length - 1];
                t.setHandleOut(e[1].subtract(e[0]));
                this.segments.push(new Segment(e[3], e[2].subtract(e[3])))
            },
            generateBezier: function(e, t, n, r, i) {
                var s = Numerical.EPSILON,
                    o = this.points[e],
                    u = this.points[t],
                    a = [
                        [0, 0],
                        [0, 0]
                    ],
                    f = [0, 0];
                for (var l = 0, c = t - e + 1; l < c; l++) {
                    var h = n[l],
                        p = 1 - h,
                        d = 3 * h * p,
                        v = p * p * p,
                        m = d * p,
                        g = d * h,
                        y = h * h * h,
                        b = r.normalize(m),
                        w = i.normalize(g),
                        E = this.points[e + l].subtract(o.multiply(v + m)).subtract(u.multiply(g + y));
                    a[0][0] += b.dot(b);
                    a[0][1] += b.dot(w);
                    a[1][0] = a[0][1];
                    a[1][1] += w.dot(w);
                    f[0] += b.dot(E);
                    f[1] += w.dot(E)
                }
                var S = a[0][0] * a[1][1] - a[1][0] * a[0][1],
                    x, T;
                if (Math.abs(S) > s) {
                    var N = a[0][0] * f[1] - a[1][0] * f[0],
                        C = f[0] * a[1][1] - f[1] * a[0][1];
                    x = C / S;
                    T = N / S
                } else {
                    var k = a[0][0] + a[0][1],
                        L = a[1][0] + a[1][1];
                    if (Math.abs(k) > s) {
                        x = T = f[0] / k
                    } else if (Math.abs(k) > s) {
                        x = T = f[1] / L
                    } else {
                        x = T = 0
                    }
                }
                var A = u.getDistance(o);
                s *= A;
                if (x < s || T < s) {
                    x = T = A / 3
                }
                return [o, o.add(r.normalize(x)), u.add(i.normalize(T)), u]
            },
            reparameterize: function(e, t, n, r) {
                for (var i = e; i <= t; i++) {
                    n[i - e] = this.findRoot(r, this.points[i], n[i - e])
                }
            },
            findRoot: function(e, t, n) {
                var r = [],
                    i = [];
                for (var s = 0; s <= 2; s++) {
                    r[s] = e[s + 1].subtract(e[s]).multiply(3)
                }
                for (var s = 0; s <= 1; s++) {
                    i[s] = r[s + 1].subtract(r[s]).multiply(2)
                }
                var o = this.evaluate(3, e, n),
                    u = this.evaluate(2, r, n),
                    a = this.evaluate(1, i, n),
                    f = o.subtract(t),
                    l = u.dot(u) + f.dot(a);
                if (Math.abs(l) < Numerical.TOLERANCE) return n;
                return n - f.dot(u) / l
            },
            evaluate: function(e, t, n) {
                var r = t.slice();
                for (var i = 1; i <= e; i++) {
                    for (var s = 0; s <= e - i; s++) {
                        r[s] = r[s].multiply(1 - n).add(r[s + 1].multiply(n))
                    }
                }
                return r[0]
            },
            chordLengthParameterize: function(e, t) {
                var n = [0];
                for (var r = e + 1; r <= t; r++) {
                    n[r - e] = n[r - e - 1] + this.points[r].getDistance(this.points[r - 1])
                }
                for (var r = 1, i = t - e; r <= i; r++) {
                    n[r] /= n[i]
                }
                return n
            },
            findMaxError: function(e, t, n, r) {
                var i = Math.floor((t - e + 1) / 2),
                    s = 0;
                for (var o = e + 1; o < t; o++) {
                    var u = this.evaluate(3, n, r[o - e]);
                    var a = u.subtract(this.points[o]);
                    var f = a.x * a.x + a.y * a.y;
                    if (f >= s) {
                        s = f;
                        i = o
                    }
                }
                return {
                    error: s,
                    index: i
                }
            }
        });
        var TextItem = this.TextItem = Item.extend({
            initialize: function() {
                this.base();
                this._content = "";
                this._characterStyle = CharacterStyle.create(this);
                this.setCharacterStyle(this._project.getCurrentStyle());
                this._paragraphStyle = ParagraphStyle.create(this);
                this.setParagraphStyle()
            },
            _clone: function(e) {
                e._content = this._content;
                e.setCharacterStyle(this._characterStyle);
                e.setParagraphStyle(this._paragraphStyle);
                return this.base(e)
            },
            getContent: function() {
                return this._content
            },
            setContent: function(e) {
                this._changed(Change.CONTENT);
                this._content = "" + e
            },
            getCharacterStyle: function() {
                return this._characterStyle
            },
            setCharacterStyle: function(e) {
                this._characterStyle.initialize(e)
            },
            getParagraphStyle: function() {
                return this._paragraphStyle
            },
            setParagraphStyle: function(e) {
                this._paragraphStyle.initialize(e)
            }
        });
        var PointText = this.PointText = TextItem.extend({
            initialize: function(e) {
                this.base();
                this._point = Point.read(arguments).clone();
                this._matrix = (new Matrix).translate(this._point)
            },
            clone: function() {
                var e = this._clone(new PointText(this._point));
                e._matrix.initialize(this._matrix);
                return e
            },
            getPoint: function() {
                return LinkedPoint.create(this, "setPoint", this._point.x, this._point.y)
            },
            setPoint: function(e) {
                this.translate(Point.read(arguments).subtract(this._point))
            },
            getPosition: function() {
                return this.getPoint()
            },
            setPosition: function(e) {
                this.setPoint.apply(this, arguments)
            },
            _transform: function(e, t) {
                this._matrix.preConcatenate(e);
                e._transformPoint(this._point, this._point)
            },
            draw: function(e) {
                if (!this._content) return;
                e.save();
                e.font = this.getFontSize() + "pt " + this.getFont();
                e.textAlign = this.getJustification();
                this._matrix.applyToContext(e);
                var t = this.getFillColor();
                var n = this.getStrokeColor();
                if (!t || !n) e.globalAlpha = this._opacity;
                if (t) {
                    e.fillStyle = t.getCanvasStyle(e);
                    e.fillText(this._content, 0, 0)
                }
                if (n) {
                    e.strokeStyle = n.getCanvasStyle(e);
                    e.strokeText(this._content, 0, 0)
                }
                e.restore()
            }
        });
        var Style = Item.extend({
            initialize: function(e) {
                var t = e instanceof Style;
                return Base.each(this._defaults, function(n, r) {
                    n = e && e[r] || n;
                    this[r] = n && t && n.clone ? n.clone() : n
                }, this)
            },
            statics: {
                create: function(e) {
                    var t = new this(this.dont);
                    t._item = e;
                    return t
                },
                extend: function(e) {
                    var t = e._style,
                        n = e._flags || {};
                    e._owner.inject(Base.each(e._defaults, function(r, i) {
                        var s = !! i.match(/Color$/),
                            o = Base.capitalize(i),
                            u = "set" + o,
                            a = "get" + o;
                        e[u] = function(e) {
                            var r = this._item && this._item._children;
                            e = s ? Color.read(arguments) : e;
                            if (r) {
                                for (var o = 0, a = r.length; o < a; o++) r[o][t][u](e)
                            } else {
                                var f = this["_" + i];
                                if (f != e && !(f && f.equals && f.equals(e))) {
                                    this["_" + i] = e;
                                    if (s) {
                                        if (f) f._removeOwner(this._item);
                                        if (e) e._addOwner(this._item)
                                    }
                                    if (this._item) this._item._changed(n[i] || Change.STYLE)
                                }
                            }
                            return this
                        };
                        e[a] = function() {
                            var e = this._item && this._item._children,
                                n;
                            if (!e) return this["_" + i];
                            for (var r = 0, s = e.length; r < s; r++) {
                                var o = e[r][t][a]();
                                if (!n) {
                                    n = o
                                } else if (n != o && !(n && n.equals && n.equals(o))) {
                                    return undefined
                                }
                            }
                            return n
                        };
                        this[u] = function(e) {
                            this[t][u](e);
                            return this
                        };
                        this[a] = function() {
                            return this[t][a]()
                        }
                    }, {}));
                    return this.base(e)
                }
            }
        });
        var PathStyle = this.PathStyle = Style.extend({
            _defaults: {
                fillColor: undefined,
                strokeColor: undefined,
                strokeWidth: 1,
                strokeCap: "butt",
                strokeJoin: "miter",
                miterLimit: 10,
                dashOffset: 0,
                dashArray: []
            },
            _flags: {
                strokeWidth: Change.STROKE,
                strokeCap: Change.STROKE,
                strokeJoin: Change.STROKE,
                miterLimit: Change.STROKE
            },
            _owner: Item,
            _style: "_style"
        });
        var ParagraphStyle = this.ParagraphStyle = Style.extend({
            _defaults: {
                justification: "left"
            },
            _owner: TextItem,
            _style: "_paragraphStyle"
        });
        var CharacterStyle = this.CharacterStyle = PathStyle.extend({
            _defaults: Base.merge(PathStyle.prototype._defaults, {
                fillColor: "black",
                fontSize: 10,
                font: "sans-serif"
            }),
            _owner: TextItem,
            _style: "_characterStyle"
        });
        var Color = this.Color = Base.extend(new function() {
            function e(e) {
                var t = r[e];
                if (t) return t.clone();
                if (!i) {
                    var n = CanvasProvider.getCanvas(Size.create(1, 1));
                    i = n.getContext("2d");
                    i.globalCompositeOperation = "copy"
                }
                i.fillStyle = "rgba(0,0,0,0)";
                i.fillStyle = e;
                i.fillRect(0, 0, 1, 1);
                var s = i.getImageData(0, 0, 1, 1).data,
                    o = [s[0] / 255, s[1] / 255, s[2] / 255];
                return (r[e] = RgbColor.read(o)).clone()
            }

            function t(e) {
                var t = e.match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);
                if (t.length >= 4) {
                    var n = new Array(3);
                    for (var r = 0; r < 3; r++) {
                        var i = t[r + 1];
                        n[r] = parseInt(i.length == 1 ? i + i : i, 16) / 255
                    }
                    return RgbColor.read(n)
                }
            }
            var n = {
                gray: ["gray"],
                rgb: ["red", "green", "blue"],
                hsb: ["hue", "saturation", "brightness"],
                hsl: ["hue", "saturation", "lightness"]
            };
            var r = {}, i;
            var s = [
                [0, 3, 1],
                [2, 0, 1],
                [1, 0, 3],
                [1, 2, 0],
                [3, 1, 0],
                [0, 1, 2]
            ];
            var o = {
                "rgb-hsb": function(e) {
                    var t = e._red,
                        n = e._green,
                        r = e._blue,
                        i = Math.max(t, n, r),
                        s = Math.min(t, n, r),
                        o = i - s,
                        u = o == 0 ? 0 : (i == t ? (n - r) / o + (n < r ? 6 : 0) : i == n ? (r - t) / o + 2 : (t - n) / o + 4) * 60,
                        a = i == 0 ? 0 : o / i,
                        f = i;
                    return new HsbColor(u, a, f, e._alpha)
                },
                "hsb-rgb": function(e) {
                    var t = e._hue / 60 % 6,
                        n = e._saturation,
                        r = e._brightness,
                        i = Math.floor(t),
                        o = t - i,
                        i = s[i],
                        u = [r, r * (1 - n), r * (1 - n * o), r * (1 - n * (1 - o))];
                    return new RgbColor(u[i[0]], u[i[1]], u[i[2]], e._alpha)
                },
                "rgb-hsl": function(e) {
                    var t = e._red,
                        n = e._green,
                        r = e._blue,
                        i = Math.max(t, n, r),
                        s = Math.min(t, n, r),
                        o = i - s,
                        u = o == 0,
                        a = u ? 0 : (i == t ? (n - r) / o + (n < r ? 6 : 0) : i == n ? (r - t) / o + 2 : (t - n) / o + 4) * 60,
                        f = (i + s) / 2,
                        l = u ? 0 : f < .5 ? o / (i + s) : o / (2 - i - s);
                    return new HslColor(a, l, f, e._alpha)
                },
                "hsl-rgb": function(e) {
                    var t = e._saturation,
                        n = e._hue / 360,
                        r = e._lightness,
                        i, s, o;
                    if (t == 0) return new RgbColor(r, r, r, e._alpha);
                    var u = [n + 1 / 3, n, n - 1 / 3],
                        s = r < .5 ? r * (1 + t) : r + t - r * t,
                        i = 2 * r - s,
                        o = [];
                    for (var a = 0; a < 3; a++) {
                        var f = u[a];
                        if (f < 0) f += 1;
                        if (f > 1) f -= 1;
                        o[a] = 6 * f < 1 ? i + (s - i) * 6 * f : 2 * f < 1 ? s : 3 * f < 2 ? i + (s - i) * (2 / 3 - f) * 6 : i
                    }
                    return new RgbColor(o[0], o[1], o[2], e._alpha)
                },
                "rgb-gray": function(e) {
                    return new GrayColor(1 - (e._red * .2989 + e._green * .587 + e._blue * .114), e._alpha)
                },
                "gray-rgb": function(e) {
                    var t = 1 - e._gray;
                    return new RgbColor(t, t, t, e._alpha)
                },
                "gray-hsb": function(e) {
                    return new HsbColor(0, 0, 1 - e._gray, e._alpha)
                },
                "gray-hsl": function(e) {
                    return new HslColor(0, 0, 1 - e._gray, e._alpha)
                }
            };
            var u = {
                _readNull: true,
                initialize: function(n) {
                    var r = Array.isArray(n),
                        i = this._colorType;
                    if (typeof n === "object" && !r) {
                        if (!i) {
                            return n.red !== undefined ? new RgbColor(n.red, n.green, n.blue, n.alpha) : n.gray !== undefined ? new GrayColor(n.gray, n.alpha) : n.lightness !== undefined ? new HslColor(n.hue, n.saturation, n.lightness, n.alpha) : n.hue !== undefined ? new HsbColor(n.hue, n.saturation, n.brightness, n.alpha) : new RgbColor
                        } else {
                            return Color.read(arguments).convert(i)
                        }
                    } else if (typeof n === "string") {
                        var s = n.match(/^#[0-9a-f]{3,6}$/i) ? t(n) : e(n);
                        return i ? s.convert(i) : s
                    } else {
                        var o = r ? n : Array.prototype.slice.call(arguments);
                        if (!i) {
                            if (o.length >= 3) return new RgbColor(o);
                            return new GrayColor(o)
                        } else {
                            Base.each(this._components, function(e, t) {
                                var n = o[t];
                                this["_" + e] = n !== undefined ? n : null
                            }, this)
                        }
                    }
                },
                clone: function() {
                    var e = this.constructor,
                        t = new e(e.dont),
                        n = this._components;
                    for (var r = 0, i = n.length; r < i; r++) {
                        var s = "_" + n[r];
                        t[s] = this[s]
                    }
                    return t
                },
                convert: function(e) {
                    var t;
                    return this._colorType == e ? this.clone() : (t = o[this._colorType + "-" + e]) ? t(this) : o["rgb-" + e](o[this._colorType + "-rgb"](this))
                },
                statics: {
                    extend: function(e) {
                        e.beans = true;
                        if (e._colorType) {
                            var t = n[e._colorType];
                            e._components = t.concat(["alpha"]);
                            Base.each(t, function(e) {
                                var t = e === "hue",
                                    n = Base.capitalize(e),
                                    e = "_" + e;
                                this["get" + n] = function() {
                                    return this[e]
                                };
                                this["set" + n] = function(n) {
                                    this[e] = t ? (n % 360 + 360) % 360 : Math.min(Math.max(n, 0), 1);
                                    this._changed();
                                    return this
                                }
                            }, e)
                        }
                        return this.base(e)
                    }
                }
            };
            Base.each(n, function(e, t) {
                Base.each(e, function(e) {
                    var n = Base.capitalize(e);
                    u["get" + n] = function() {
                        return this.convert(t)[e]
                    };
                    u["set" + n] = function(n) {
                        var r = this.convert(t);
                        r[e] = n;
                        r = r.convert(this._colorType);
                        for (var i = 0, s = this._components.length; i < s; i++) {
                            var o = this._components[i];
                            this[o] = r[o]
                        }
                    }
                })
            });
            return u
        }, {
            _changed: function() {
                this._cssString = null;
                for (var e = 0, t = this._owners && this._owners.length; e < t; e++) this._owners[e]._changed(Change.STYLE)
            },
            _addOwner: function(e) {
                if (!this._owners) this._owners = [];
                this._owners.push(e)
            },
            _removeOwner: function(e) {
                var t = this._owners ? this._owners.indexOf(e) : -1;
                if (t != -1) {
                    this._owners.splice(t, 1);
                    if (this._owners.length == 0) delete this._owners
                }
            },
            getType: function() {
                return this._colorType
            },
            getComponents: function() {
                var e = this._components.length;
                var t = new Array(e);
                for (var n = 0; n < e; n++) t[n] = this["_" + this._components[n]];
                return t
            },
            getAlpha: function() {
                return this._alpha != null ? this._alpha : 1
            },
            setAlpha: function(e) {
                this._alpha = e == null ? null : Math.min(Math.max(e, 0), 1);
                this._changed();
                return this
            },
            hasAlpha: function() {
                return this._alpha != null
            },
            equals: function(e) {
                if (e && e._colorType === this._colorType) {
                    for (var t = 0, n = this._components.length; t < n; t++) {
                        var r = "_" + this._components[t];
                        if (this[r] !== e[r]) return false
                    }
                    return true
                }
                return false
            },
            toString: function() {
                var e = [],
                    t = Base.formatNumber;
                for (var n = 0, r = this._components.length; n < r; n++) {
                    var i = this._components[n],
                        s = this["_" + i];
                    if (i === "alpha" && s == null) s = 1;
                    e.push(i + ": " + t(s))
                }
                return "{ " + e.join(", ") + " }"
            },
            toCssString: function() {
                if (!this._cssString) {
                    var e = this.convert("rgb"),
                        t = e.getAlpha(),
                        n = [Math.round(e._red * 255), Math.round(e._green * 255), Math.round(e._blue * 255), t != null ? t : 1];
                    this._cssString = "rgba(" + n.join(", ") + ")"
                }
                return this._cssString
            },
            getCanvasStyle: function() {
                return this.toCssString()
            }
        });
        var GrayColor = this.GrayColor = Color.extend({
            _colorType: "gray"
        });
        var RgbColor = this.RgbColor = this.RGBColor = Color.extend({
            _colorType: "rgb"
        });
        var HsbColor = this.HsbColor = this.HSBColor = Color.extend({
            _colorType: "hsb"
        });
        var HslColor = this.HslColor = this.HSLColor = Color.extend({
            _colorType: "hsl"
        });
        var GradientColor = this.GradientColor = Color.extend({
            initialize: function(e, t, n, r) {
                this.gradient = e || new Gradient;
                this.setOrigin(t);
                this.setDestination(n);
                if (r) this.setHilite(r)
            },
            clone: function() {
                return new GradientColor(this.gradient, this._origin, this._destination, this._hilite)
            },
            getOrigin: function() {
                return this._origin
            },
            setOrigin: function(e) {
                e = Point.read(arguments).clone();
                this._origin = e;
                if (this._destination) this._radius = this._destination.getDistance(this._origin);
                this._changed();
                return this
            },
            getDestination: function() {
                return this._destination
            },
            setDestination: function(e) {
                e = Point.read(arguments).clone();
                this._destination = e;
                this._radius = this._destination.getDistance(this._origin);
                this._changed();
                return this
            },
            getHilite: function() {
                return this._hilite
            },
            setHilite: function(e) {
                e = Point.read(arguments).clone();
                var t = e.subtract(this._origin);
                if (t.getLength() > this._radius) {
                    this._hilite = this._origin.add(t.normalize(this._radius - .1))
                } else {
                    this._hilite = e
                }
                this._changed();
                return this
            },
            getCanvasStyle: function(e) {
                var t;
                if (this.gradient.type === "linear") {
                    t = e.createLinearGradient(this._origin.x, this._origin.y, this._destination.x, this._destination.y)
                } else {
                    var n = this._hilite || this._origin;
                    t = e.createRadialGradient(n.x, n.y, 0, this._origin.x, this._origin.y, this._radius)
                }
                for (var r = 0, i = this.gradient._stops.length; r < i; r++) {
                    var s = this.gradient._stops[r];
                    t.addColorStop(s._rampPoint, s._color.toCssString())
                }
                return t
            },
            equals: function(e) {
                return e == this || e && e._colorType === this._colorType && this.gradient.equals(e.gradient) && this._origin.equals(e._origin) && this._destination.equals(e._destination)
            },
            transform: function(e) {
                e._transformPoint(this._origin, this._origin, true);
                e._transformPoint(this._destination, this._destination, true);
                if (this._hilite) e._transformPoint(this._hilite, this._hilite, true);
                this._radius = this._destination.getDistance(this._origin)
            }
        });
        var Gradient = this.Gradient = Base.extend({
            initialize: function(e, t) {
                this.setStops(e || ["white", "black"]);
                this.type = t || "linear"
            },
            clone: function() {
                var e = [];
                for (var t = 0, n = this._stops.length; t < n; t++) e[t] = this._stops[t].clone();
                return new Gradient(e, this.type)
            },
            getStops: function() {
                return this._stops
            },
            setStops: function(e) {
                if (e.length < 2) throw new Error("Gradient stop list needs to contain at least two stops.");
                this._stops = GradientStop.readAll(e);
                for (var t = 0, n = this._stops.length; t < n; t++) {
                    var r = this._stops[t];
                    if (r._defaultRamp) r.setRampPoint(t / (n - 1))
                }
            },
            equals: function(e) {
                if (e.type != this.type) return false;
                if (this._stops.length == e._stops.length) {
                    for (var t = 0, n = this._stops.length; t < n; t++) {
                        if (!this._stops[t].equals(e._stops[t])) return false
                    }
                    return true
                }
                return false
            }
        });
        var GradientStop = this.GradientStop = Base.extend({
            initialize: function(e, t) {
                if (t === undefined && Array.isArray(e)) {
                    this.setColor(e[0]);
                    this.setRampPoint(e[1])
                } else if (e.color) {
                    this.setColor(e.color);
                    this.setRampPoint(e.rampPoint)
                } else {
                    this.setColor(e);
                    this.setRampPoint(t)
                }
            },
            clone: function() {
                return new GradientStop(this._color.clone(), this._rampPoint)
            },
            getRampPoint: function() {
                return this._rampPoint
            },
            setRampPoint: function(e) {
                this._defaultRamp = e == null;
                this._rampPoint = e || 0
            },
            getColor: function() {
                return this._color
            },
            setColor: function(e) {
                this._color = Color.read(arguments)
            },
            equals: function(e) {
                return e == this || e instanceof GradientStop && this._color.equals(e._color) && this._rampPoint == e._rampPoint
            }
        });
        var DomElement = {
            getBounds: function(e, t) {
                var n = e.getBoundingClientRect(),
                    r = e.ownerDocument,
                    i = r.body,
                    s = r.documentElement,
                    o = n.left - (s.clientLeft || i.clientLeft || 0),
                    u = n.top - (s.clientTop || i.clientTop || 0);
                if (!t) {
                    var a = DomElement.getViewport(r);
                    o += a.pageXOffset || s.scrollLeft || i.scrollLeft;
                    u += a.pageYOffset || s.scrollTop || i.scrollTop
                }
                return new Rectangle(o, u, n.width, n.height)
            },
            getOffset: function(e, t) {
                return this.getBounds(e, t).getPoint()
            },
            getSize: function(e) {
                return this.getBounds(e, true).getSize()
            },
            isInvisible: function(e) {
                return this.getSize(e).equals([0, 0])
            },
            isVisible: function(e) {
                return !this.isInvisible(e) && this.getViewportBounds(e).intersects(this.getBounds(e, true))
            },
            getViewport: function(e) {
                return e.defaultView || e.parentWindow
            },
            getViewportBounds: function(e) {
                var t = e.ownerDocument,
                    n = this.getViewport(t),
                    r = t.getElementsByTagName(t.compatMode === "CSS1Compat" ? "html" : "body")[0];
                return Rectangle.create(0, 0, n.innerWidth || r.clientWidth, n.innerHeight || r.clientHeight)
            },
            getComputedStyle: function(e, t) {
                if (e.currentStyle) return e.currentStyle[Base.camelize(t)];
                var n = this.getViewport(e.ownerDocument).getComputedStyle(e, null);
                return n ? n.getPropertyValue(Base.hyphenate(t)) : null
            }
        };
        var DomEvent = {
            add: function(e, t) {
                for (var n in t) {
                    var r = t[n];
                    if (e.addEventListener) {
                        e.addEventListener(n, r, false)
                    } else if (e.attachEvent) {
                        e.attachEvent("on" + n, r.bound = function() {
                            r.call(e, window.event)
                        })
                    }
                }
            },
            remove: function(e, t) {
                for (var n in t) {
                    var r = t[n];
                    if (e.removeEventListener) {
                        e.removeEventListener(n, r, false)
                    } else if (e.detachEvent) {
                        e.detachEvent("on" + n, r.bound)
                    }
                }
            },
            getPoint: function(e) {
                var t = e.targetTouches ? e.targetTouches.length ? e.targetTouches[0] : e.changedTouches[0] : e;
                return Point.create(t.pageX || t.clientX + document.documentElement.scrollLeft, t.pageY || t.clientY + document.documentElement.scrollTop)
            },
            getTarget: function(e) {
                return e.target || e.srcElement
            },
            getOffset: function(e, t) {
                return DomEvent.getPoint(e).subtract(DomElement.getOffset(t || DomEvent.getTarget(e)))
            },
            preventDefault: function(e) {
                if (e.preventDefault) {
                    e.preventDefault()
                } else {
                    e.returnValue = false
                }
            },
            stopPropagation: function(e) {
                if (e.stopPropagation) {
                    e.stopPropagation()
                } else {
                    e.cancelBubble = true
                }
            },
            stop: function(e) {
                DomEvent.stopPropagation(e);
                DomEvent.preventDefault(e)
            }
        };
        DomEvent.requestAnimationFrame = new function() {
            var e = "equestAnimationFrame",
                t = window["r" + e] || window["webkitR" + e] || window["mozR" + e] || window["oR" + e] || window["msR" + e];
            if (t) {
                t(function(e) {
                    if (e == undefined) t = null
                })
            }
            var n = [],
                r = true,
                i;
            DomEvent.add(window, {
                focus: function() {
                    r = true
                },
                blur: function() {
                    r = false
                }
            });
            return function(e, s) {
                if (t) return t(e, s);
                n.push([e, s]);
                if (i) return;
                i = window.setInterval(function() {
                    for (var e = n.length - 1; e >= 0; e--) {
                        var t = n[e],
                            i = t[0],
                            s = t[1];
                        if (!s || (PaperScript.getAttribute(s, "keepalive") == "true" || r) && DomElement.isVisible(s)) {
                            n.splice(e, 1);
                            i(Date.now())
                        }
                    }
                }, 1e3 / 60)
            }
        };
        var View = this.View = PaperScopeItem.extend({
            _list: "views",
            _reference: "view",
            initialize: function(e) {
                this.base();
                var t;
                if (typeof e === "string") e = document.getElementById(e);
                if (e instanceof HTMLCanvasElement) {
                    this._canvas = e;
                    if (PaperScript.hasAttribute(e, "resize")) {
                        var n = DomElement.getOffset(e, true),
                            r = this;
                        t = DomElement.getViewportBounds(e).getSize().subtract(n);
                        e.width = t.width;
                        e.height = t.height;
                        DomEvent.add(window, {
                            resize: function(t) {
                                if (!DomElement.isInvisible(e)) n = DomElement.getOffset(e, true);
                                r.setViewSize(DomElement.getViewportBounds(e).getSize().subtract(n))
                            }
                        })
                    } else {
                        t = DomElement.isInvisible(e) ? Size.create(parseInt(e.getAttribute("width")), parseInt(e.getAttribute("height"))) : DomElement.getSize(e)
                    } if (PaperScript.hasAttribute(e, "stats")) {
                        this._stats = new Stats;
                        var i = this._stats.domElement,
                            s = i.style,
                            n = DomElement.getOffset(e);
                        s.position = "absolute";
                        s.left = n.x + "px";
                        s.top = n.y + "px";
                        document.body.appendChild(i)
                    }
                } else {
                    t = Size.read(arguments, 1);
                    if (t.isZero()) t = new Size(1024, 768);
                    this._canvas = CanvasProvider.getCanvas(t)
                }
                this._id = this._canvas.getAttribute("id");
                if (this._id == null) this._canvas.setAttribute("id", this._id = "canvas-" + View._id++);
                View._views[this._id] = this;
                this._viewSize = LinkedSize.create(this, "setViewSize", t.width, t.height);
                this._context = this._canvas.getContext("2d");
                this._matrix = new Matrix;
                this._zoom = 1;
                this._events = this._createEvents();
                DomEvent.add(this._canvas, this._events);
                if (!View._focused) View._focused = this;
                this._scope._redrawNotified = false
            },
            remove: function() {
                if (!this.base()) return false;
                if (View._focused == this) View._focused = null;
                delete View._views[this._id];
                DomEvent.remove(this._canvas, this._events);
                this._canvas = this._events = this._onFrame = null;
                return true
            },
            _redraw: function() {
                this._redrawNeeded = true;
                if (this._onFrameCallback) {
                    this._onFrameCallback(0, true)
                } else {
                    this.draw()
                }
            },
            _transform: function(e, t) {
                this._matrix.preConcatenate(e);
                this._bounds = null;
                this._inverse = null;
                this._redraw()
            },
            getCanvas: function() {
                return this._canvas
            },
            getViewSize: function() {
                return this._viewSize
            },
            setViewSize: function(e) {
                e = Size.read(arguments);
                var t = e.subtract(this._viewSize);
                if (t.isZero()) return;
                this._canvas.width = e.width;
                this._canvas.height = e.height;
                this._viewSize.set(e.width, e.height, true);
                this._bounds = null;
                this._redrawNeeded = true;
                if (this.onResize) {
                    this.onResize({
                        size: e,
                        delta: t
                    })
                }
                this._redraw()
            },
            getBounds: function() {
                if (!this._bounds) this._bounds = this._getInverse()._transformBounds(new Rectangle(new Point, this._viewSize));
                return this._bounds
            },
            getSize: function() {
                return this.getBounds().getSize()
            },
            getCenter: function() {
                return this.getBounds().getCenter()
            },
            setCenter: function(e) {
                this.scrollBy(Point.read(arguments).subtract(this.getCenter()))
            },
            getZoom: function() {
                return this._zoom
            },
            setZoom: function(e) {
                this._transform((new Matrix).scale(e / this._zoom, this.getCenter()));
                this._zoom = e
            },
            isVisible: function() {
                return DomElement.isVisible(this._canvas)
            },
            scrollBy: function(e) {
                this._transform((new Matrix).translate(Point.read(arguments).negate()))
            },
            draw: function(e) {
                if (e && !this._redrawNeeded) return false;
                if (this._stats) this._stats.update();
                var t = this._context,
                    n = this._viewSize;
                t.clearRect(0, 0, n._width + 1, n._height + 1);
                t.save();
                this._matrix.applyToContext(t);
                this._scope.project.draw(t);
                t.restore();
                if (this._redrawNeeded) {
                    this._redrawNeeded = false;
                    this._scope._redrawNotified = false
                }
                return true
            },
            projectToView: function(e) {
                return this._matrix._transformPoint(Point.read(arguments))
            },
            viewToProject: function(e) {
                return this._getInverse()._transformPoint(Point.read(arguments))
            },
            _getInverse: function() {
                if (!this._inverse) this._inverse = this._matrix.createInverse();
                return this._inverse
            },
            getOnFrame: function() {
                return this._onFrame
            },
            setOnFrame: function(e) {
                this._onFrame = e;
                if (!e) {
                    delete this._onFrameCallback;
                    return
                }
                var t = this,
                    n = false,
                    r, i = 0,
                    s = 0;
                this._onFrameCallback = function(e, o) {
                    n = false;
                    if (!t._onFrame) return;
                    paper = t._scope;
                    n = true;
                    if (!o) {
                        DomEvent.requestAnimationFrame(t._onFrameCallback, t._canvas)
                    }
                    var u = Date.now() / 1e3,
                        a = r ? u - r : 0;
                    t._onFrame(Base.merge({
                        delta: a,
                        time: i += a,
                        count: s++
                    }));
                    r = u;
                    t.draw(true)
                };
                if (!n) this._onFrameCallback()
            },
            onResize: null
        }, {
            statics: {
                _views: {},
                _id: 0
            }
        }, new function() {
            function e(e, t) {
                return e.viewToProject(DomEvent.getOffset(t, e._canvas))
            }

            function t() {
                if (!View._focused || !View._focused.isVisible()) {
                    PaperScope.each(function(e) {
                        for (var t = 0, n = e.views.length; t < n; t++) {
                            var r = e.views[t];
                            if (r.isVisible()) {
                                View._focused = a = r;
                                throw Base.stop
                            }
                        }
                    })
                }
            }

            function n(n) {
                var r;
                if (!f) {
                    r = View._views[DomEvent.getTarget(n).getAttribute("id")];
                    if (r) {
                        View._focused = a = r
                    } else if (a && a == View._focused) {
                        View._focused = null;
                        t()
                    }
                }
                if (!(r = r || View._focused) || !(s = r._scope.tool)) return;
                var i = n && e(r, n);
                var o = !! (!s.onMouseDrag && s.onMouseMove);
                if (f && !o) {
                    u = i || u;
                    if (u && s.onHandleEvent("mousedrag", u, n)) {
                        r.draw(true);
                        DomEvent.stop(n)
                    }
                } else if ((!f || o) && s.onHandleEvent("mousemove", i, n)) {
                    r.draw(true);
                    DomEvent.stop(n)
                }
            }

            function r(t) {
                var n = View._focused;
                if (!n || !f) return;
                f = false;
                u = null;
                if (s) {
                    if (o != null) o = clearInterval(o);
                    if (s.onHandleEvent("mouseup", e(n, t), t)) {
                        n.draw(true);
                        DomEvent.stop(t)
                    }
                }
            }

            function i(e) {
                if (f) DomEvent.stop(e)
            }
            var s, o, u, a, f = false;
            DomEvent.add(document, {
                mousemove: n,
                mouseup: r,
                touchmove: n,
                touchend: r,
                selectstart: i,
                scroll: t
            });
            DomEvent.add(window, {
                load: t
            });
            return {
                _createEvents: function() {
                    function t(t) {
                        View._focused = r;
                        if (!(s = r._scope.tool)) return;
                        u = e(r, t);
                        if (s.onHandleEvent("mousedown", u, t)) r.draw(true);
                        if (s.eventInterval != null) o = setInterval(n, s.eventInterval);
                        f = true
                    }
                    var r = this;
                    return {
                        mousedown: t,
                        touchstart: t,
                        selectstart: i
                    }
                },
                statics: {
                    updateFocus: t
                }
            }
        });
        var Event = this.Event = Base.extend({
            initialize: function(e) {
                this.event = e
            },
            preventDefault: function() {
                DomEvent.preventDefault(this.event)
            },
            stopPropagation: function() {
                DomEvent.stopPropagation(this.event)
            },
            stop: function() {
                DomEvent.stop(this.event)
            },
            getModifiers: function() {
                return Key.modifiers
            }
        });
        var KeyEvent = this.KeyEvent = Event.extend(new function() {
            return {
                initialize: function(e, t, n, r) {
                    this.base(r);
                    this.type = e ? "keydown" : "keyup";
                    this.key = t;
                    this.character = n
                },
                toString: function() {
                    return "{ type: " + this.type + ", key: " + this.key + ", character: " + this.character + ", modifiers: " + this.getModifiers() + " }"
                }
            }
        });
        var Key = this.Key = new function() {
                function e(e, n, r, s) {
                    var o = String.fromCharCode(r),
                        u = t[n] || o.toLowerCase(),
                        a = e ? "onKeyDown" : "onKeyUp",
                        f = View._focused,
                        l = f && f.isVisible() && f._scope,
                        c = l && l.tool;
                    i[u] = e;
                    if (c && c[a]) {
                        var h = new KeyEvent(e, u, o, s);
                        if (c[a](h) === false) h.preventDefault();
                        if (f) f.draw(true)
                    }
                }
                var t = {
                    8: "backspace",
                    13: "enter",
                    16: "shift",
                    17: "control",
                    18: "option",
                    19: "pause",
                    20: "caps-lock",
                    27: "escape",
                    32: "space",
                    35: "end",
                    36: "home",
                    37: "left",
                    38: "up",
                    39: "right",
                    40: "down",
                    46: "delete",
                    91: "command",
                    93: "command",
                    224: "command"
                }, n = Base.merge({
                        shift: false,
                        control: false,
                        option: false,
                        command: false,
                        capsLock: false
                    }),
                    r = {}, i = {}, s;
                DomEvent.add(document, {
                    keydown: function(i) {
                        var o = i.which || i.keyCode;
                        var u = t[o],
                            a;
                        if (u) {
                            if ((a = Base.camelize(u)) in n) n[a] = true;
                            r[o] = 0;
                            e(true, o, null, i)
                        } else {
                            s = o
                        }
                    },
                    keypress: function(t) {
                        if (s != null) {
                            var n = t.which || t.keyCode;
                            r[s] = n;
                            e(true, s, n, t);
                            s = null
                        }
                    },
                    keyup: function(i) {
                        var s = i.which || i.keyCode,
                            o = t[s],
                            u;
                        if (o && (u = Base.camelize(o)) in n) n[u] = false;
                        if (r[s] != null) {
                            e(false, s, r[s], i);
                            delete r[s]
                        }
                    }
                });
                return {
                    modifiers: n,
                    isDown: function(e) {
                        return !!i[e]
                    }
                }
            };
        var ToolEvent = this.ToolEvent = Event.extend({
            initialize: function(e, t, n) {
                this.tool = e;
                this.type = t;
                this.event = n
            },
            _choosePoint: function(e, t) {
                return e ? e : t ? t.clone() : null
            },
            getPoint: function() {
                return this._choosePoint(this._point, this.tool._point)
            },
            setPoint: function(e) {
                this._point = e
            },
            getLastPoint: function() {
                return this._choosePoint(this._lastPoint, this.tool._lastPoint)
            },
            setLastPoint: function(e) {
                this._lastPoint = e
            },
            getDownPoint: function() {
                return this._choosePoint(this._downPoint, this.tool._downPoint)
            },
            setDownPoint: function(e) {
                this._downPoint = e
            },
            getMiddlePoint: function() {
                if (!this._middlePoint && this.tool._lastPoint) {
                    return this.tool._point.add(this.tool._lastPoint).divide(2)
                }
                return this.middlePoint
            },
            setMiddlePoint: function(e) {
                this._middlePoint = e
            },
            getDelta: function() {
                return !this._delta && this.tool._lastPoint ? this.tool._point.subtract(this.tool._lastPoint) : this._delta
            },
            setDelta: function(e) {
                this._delta = e
            },
            getCount: function() {
                return /^mouse(down|up)$/.test(this.type) ? this.tool._downCount : this.tool._count
            },
            setCount: function(e) {
                this.tool[/^mouse(down|up)$/.test(this.type) ? "downCount" : "count"] = e
            },
            getItem: function() {
                if (!this._item) {
                    var e = this.tool._scope.project.hitTest(this.getPoint());
                    if (e) {
                        var t = e.item,
                            n = t._parent;
                        while (n instanceof Group && !(n instanceof Layer) || n instanceof CompoundPath) {
                            t = n;
                            n = n._parent
                        }
                        this._item = t
                    }
                }
                return this._item
            },
            setItem: function(e) {
                this._item = e
            },
            toString: function() {
                return "{ type: " + this.type + ", point: " + this.getPoint() + ", count: " + this.getCount() + ", modifiers: " + this.getModifiers() + " }"
            }
        });
        var Tool = this.Tool = PaperScopeItem.extend({
            _list: "tools",
            _reference: "tool",
            initialize: function() {
                this.base();
                this._firstMove = true;
                this._count = 0;
                this._downCount = 0
            },
            eventInterval: null,
            getMinDistance: function() {
                return this._minDistance
            },
            setMinDistance: function(e) {
                this._minDistance = e;
                if (this._minDistance != null && this._maxDistance != null && this._minDistance > this._maxDistance) {
                    this._maxDistance = this._minDistance
                }
            },
            getMaxDistance: function() {
                return this._maxDistance
            },
            setMaxDistance: function(e) {
                this._maxDistance = e;
                if (this._minDistance != null && this._maxDistance != null && this._maxDistance < this._minDistance) {
                    this._minDistance = e
                }
            },
            getFixedDistance: function() {
                return this._minDistance == this._maxDistance ? this._minDistance : null
            },
            setFixedDistance: function(e) {
                this._minDistance = e;
                this._maxDistance = e
            },
            updateEvent: function(e, t, n, r, i, s, o) {
                if (!i) {
                    if (n != null || r != null) {
                        var u = n != null ? n : 0;
                        var a = t.subtract(this._point);
                        var f = a.getLength();
                        if (f < u) return false;
                        var l = r != null ? r : 0;
                        if (l != 0) {
                            if (f > l) {
                                t = this._point.add(a.normalize(l))
                            } else if (o) {
                                return false
                            }
                        }
                    }
                    if (s && t.equals(this._point)) return false
                }
                this._lastPoint = i && e == "mousemove" ? t : this._point;
                this._point = t;
                switch (e) {
                    case "mousedown":
                        this._lastPoint = this._downPoint;
                        this._downPoint = this._point;
                        this._downCount++;
                        break;
                    case "mouseup":
                        this._lastPoint = this._downPoint;
                        break
                }
                this._count = i ? 0 : this._count + 1;
                return true
            },
            onHandleEvent: function(e, t, n) {
                paper = this._scope;
                var r = false;
                switch (e) {
                    case "mousedown":
                        this.updateEvent(e, t, null, null, true, false, false);
                        if (this.onMouseDown) {
                            this.onMouseDown(new ToolEvent(this, e, n));
                            r = true
                        }
                        break;
                    case "mousedrag":
                        var i = false,
                            s = false;
                        while (this.updateEvent(e, t, this.minDistance, this.maxDistance, false, i, s)) {
                            if (this.onMouseDrag) {
                                this.onMouseDrag(new ToolEvent(this, e, n));
                                r = true
                            }
                            i = true;
                            s = true
                        }
                        break;
                    case "mouseup":
                        if ((this._point.x != t.x || this._point.y != t.y) && this.updateEvent("mousedrag", t, this.minDistance, this.maxDistance, false, false, false)) {
                            if (this.onMouseDrag) {
                                this.onMouseDrag(new ToolEvent(this, e, n));
                                r = true
                            }
                        }
                        this.updateEvent(e, t, null, this.maxDistance, false, false, false);
                        if (this.onMouseUp) {
                            this.onMouseUp(new ToolEvent(this, e, n));
                            r = true
                        }
                        this.updateEvent(e, t, null, null, true, false, false);
                        this._firstMove = true;
                        break;
                    case "mousemove":
                        while (this.updateEvent(e, t, this.minDistance, this.maxDistance, this._firstMove, true, false)) {
                            if (this.onMouseMove) {
                                this.onMouseMove(new ToolEvent(this, e, n));
                                r = true
                            }
                            this._firstMove = false
                        }
                        break
                }
                return r
            }
        });
        var CanvasProvider = {
            canvases: [],
            getCanvas: function(e) {
                if (this.canvases.length) {
                    var t = this.canvases.pop();
                    if (t.width != e.width || t.height != e.height) {
                        t.width = e.width;
                        t.height = e.height
                    } else {
                        t.getContext("2d").clearRect(0, 0, e.width + 1, e.height + 1)
                    }
                    return t
                } else {
                    var t = document.createElement("canvas");
                    t.width = e.width;
                    t.height = e.height;
                    return t
                }
            },
            returnCanvas: function(e) {
                this.canvases.push(e)
            }
        };
        var Numerical = new function() {
                var e = [
                    [.5773502691896257],
                    [0, .7745966692414834],
                    [.33998104358485626, .8611363115940526],
                    [0, .5384693101056831, .906179845938664],
                    [.2386191860831969, .6612093864662645, .932469514203152],
                    [0, .4058451513773972, .7415311855993945, .9491079123427585],
                    [.1834346424956498, .525532409916329, .7966664774136267, .9602898564975363],
                    [0, .3242534234038089, .6133714327005904, .8360311073266358, .9681602395076261],
                    [.14887433898163122, .4333953941292472, .6794095682990244, .8650633666889845, .9739065285171717],
                    [0, .26954315595234496, .5190961292068118, .7301520055740494, .8870625997680953, .978228658146057],
                    [.1252334085114689, .3678314989981802, .5873179542866175, .7699026741943047, .9041172563704749, .9815606342467192],
                    [0, .2304583159551348, .44849275103644687, .6423493394403402, .8015780907333099, .9175983992229779, .9841830547185881],
                    [.10805494870734367, .31911236892788974, .5152486363581541, .6872929048116855, .827201315069765, .9284348836635735, .9862838086968123],
                    [0, .20119409399743451, .3941513470775634, .5709721726085388, .7244177313601701, .8482065834104272, .937273392400706, .9879925180204854],
                    [.09501250983763744, .2816035507792589, .45801677765722737, .6178762444026438, .755404408355003, .8656312023878318, .9445750230732326, .9894009349916499]
                ];
                var t = [
                    [1],
                    [.8888888888888888, .5555555555555556],
                    [.6521451548625461, .34785484513745385],
                    [.5688888888888889, .47862867049936647, .23692688505618908],
                    [.46791393457269104, .3607615730481386, .17132449237917036],
                    [.4179591836734694, .3818300505051189, .27970539148927664, .1294849661688697],
                    [.362683783378362, .31370664587788727, .22238103445337448, .10122853629037626],
                    [.3302393550012598, .31234707704000286, .26061069640293544, .1806481606948574, .08127438836157441],
                    [.29552422471475287, .26926671930999635, .21908636251598204, .1494513491505806, .06667134430868814],
                    [.2729250867779006, .26280454451024665, .23319376459199048, .18629021092773426, .1255803694649046, .05566856711617366],
                    [.24914704581340277, .2334925365383548, .20316742672306592, .16007832854334622, .10693932599531843, .04717533638651183],
                    [.2325515532308739, .22628318026289723, .2078160475368885, .17814598076194574, .13887351021978725, .09212149983772845, .04048400476531588],
                    [.2152638534631578, .2051984637212956, .18553839747793782, .15720316715819355, .12151857068790319, .08015808715976021, .03511946033175186],
                    [.2025782419255613, .19843148532711158, .1861610000155622, .16626920581699392, .13957067792615432, .10715922046717194, .07036604748810812, .03075324199611727],
                    [.1894506104550685, .18260341504492358, .16915651939500254, .14959598881657674, .12462897125553388, .09515851168249279, .062253523938647894, .027152459411754096]
                ];
                var n = Math.abs,
                    r = Math.sqrt,
                    i = Math.cos,
                    s = Math.PI;
                return {
                    TOLERANCE: 1e-5,
                    EPSILON: 1e-11,
                    integrate: function(n, r, i, s) {
                        var o = e[s - 2],
                            u = t[s - 2],
                            a = .5 * (i - r),
                            f = a + r,
                            l = 0,
                            c = s + 1 >> 1,
                            h = s & 1 ? u[l++] * n(f) : 0;
                        while (l < c) {
                            var p = a * o[l];
                            h += u[l++] * (n(f + p) + n(f - p))
                        }
                        return a * h
                    },
                    findRoot: function(e, t, r, i, s, o, u) {
                        for (var a = 0; a < o; a++) {
                            var f = e(r),
                                l = f / t(r);
                            if (n(l) < u) return r;
                            var c = r - l;
                            if (f > 0) {
                                s = r;
                                r = c <= i ? .5 * (i + s) : c
                            } else {
                                i = r;
                                r = c >= s ? .5 * (i + s) : c
                            }
                        }
                    },
                    solveQuadratic: function(e, t, i, s, o) {
                        if (n(e) < o) {
                            if (n(t) >= o) {
                                s[0] = -i / t;
                                return 1
                            }
                            if (n(i) < o) return -1;
                            return 0
                        }
                        var u = t * t - 4 * e * i;
                        if (u < 0) return 0;
                        u = r(u);
                        if (t < 0) u = -u;
                        u = (t + u) * -.5;
                        var a = 0;
                        if (n(u) >= o) s[a++] = i / u;
                        if (n(e) >= o) s[a++] = u / e;
                        return a
                    },
                    solveCubic: function(e, t, o, u, a, f) {
                        if (n(e) < f) return Numerical.solveQuadratic(t, o, u, a, f);
                        t /= e;
                        o /= e;
                        u /= e;
                        var l = (t * t - 3 * o) / 9,
                            c = (2 * t * t * t - 9 * t * o + 27 * u) / 54,
                            h = l * l * l,
                            p = c * c;
                        t /= 3;
                        if (p < h) {
                            var d = Math.acos(c / r(h)),
                                v = -2 * r(l);
                            a[0] = v * i(d / 3) - t;
                            a[1] = v * i((d + 2 * s) / 3) - t;
                            a[2] = v * i((d - 2 * s) / 3) - t;
                            return 3
                        } else {
                            var m = -Math.pow(n(c) + r(p - h), 1 / 3);
                            if (c < 0) m = -m;
                            var g = n(m) < f ? 0 : l / m;
                            a[0] = m + g - t;
                            return 1
                        }
                        return 0
                    }
                }
            };
        var BlendMode = {
            process: function(e, t, n, r, i) {
                function s(e, t, n) {
                    return .2989 * e + .587 * t + .114 * n
                }

                function o(e, t, n, r) {
                    var i = r - s(e, t, n);
                    T = e + i;
                    N = t + i;
                    C = n + i;
                    var r = s(T, N, C),
                        o = p(T, N, C),
                        u = d(T, N, C);
                    if (o < 0) {
                        var a = r - o;
                        T = r + (T - r) * r / a;
                        N = r + (N - r) * r / a;
                        C = r + (C - r) * r / a
                    }
                    if (u > 255) {
                        var f = 255 - r,
                            l = u - r;
                        T = r + (T - r) * f / l;
                        N = r + (N - r) * f / l;
                        C = r + (C - r) * f / l
                    }
                }

                function u(e, t, n) {
                    return d(e, t, n) - p(e, t, n)
                }

                function a(e, t, n, r) {
                    var i = [e, t, n],
                        s = d(e, t, n),
                        o = p(e, t, n),
                        u;
                    o = o == e ? 0 : o == t ? 1 : 2;
                    s = s == e ? 0 : s == t ? 1 : 2;
                    u = p(o, s) == 0 ? d(o, s) == 1 ? 2 : 1 : 0;
                    if (i[s] > i[o]) {
                        i[u] = (i[u] - i[o]) * r / (i[s] - i[o]);
                        i[s] = r
                    } else {
                        i[u] = i[s] = 0
                    }
                    i[o] = 0;
                    T = i[0];
                    N = i[1];
                    C = i[2]
                }
                var f = t.canvas,
                    l = n.getImageData(i.x, i.y, f.width, f.height),
                    c = l.data,
                    h = t.getImageData(0, 0, f.width, f.height).data,
                    p = Math.min,
                    d = Math.max,
                    v = Math.abs,
                    m, g, y, b, w, E, S, x, T, N, C;
                var k = {
                    multiply: function() {
                        T = w * m / 255;
                        N = E * g / 255;
                        C = S * y / 255
                    },
                    screen: function() {
                        T = 255 - (255 - w) * (255 - m) / 255;
                        N = 255 - (255 - E) * (255 - g) / 255;
                        C = 255 - (255 - S) * (255 - y) / 255
                    },
                    overlay: function() {
                        T = w < 128 ? 2 * w * m / 255 : 255 - 2 * (255 - w) * (255 - m) / 255;
                        N = E < 128 ? 2 * E * g / 255 : 255 - 2 * (255 - E) * (255 - g) / 255;
                        C = S < 128 ? 2 * S * y / 255 : 255 - 2 * (255 - S) * (255 - y) / 255
                    },
                    "soft-light": function() {
                        var e = m * w / 255;
                        T = e + w * (255 - (255 - w) * (255 - m) / 255 - e) / 255;
                        e = g * E / 255;
                        N = e + E * (255 - (255 - E) * (255 - g) / 255 - e) / 255;
                        e = y * S / 255;
                        C = e + S * (255 - (255 - S) * (255 - y) / 255 - e) / 255
                    },
                    "hard-light": function() {
                        T = m < 128 ? 2 * m * w / 255 : 255 - 2 * (255 - m) * (255 - w) / 255;
                        N = g < 128 ? 2 * g * E / 255 : 255 - 2 * (255 - g) * (255 - E) / 255;
                        C = y < 128 ? 2 * y * S / 255 : 255 - 2 * (255 - y) * (255 - S) / 255
                    },
                    "color-dodge": function() {
                        T = m == 255 ? m : p(255, w * 255 / (255 - m));
                        N = g == 255 ? g : p(255, E * 255 / (255 - g));
                        C = y == 255 ? y : p(255, S * 255 / (255 - y))
                    },
                    "color-burn": function() {
                        T = m == 0 ? 0 : d(255 - (255 - w) * 255 / m, 0);
                        N = g == 0 ? 0 : d(255 - (255 - E) * 255 / g, 0);
                        C = y == 0 ? 0 : d(255 - (255 - S) * 255 / y, 0)
                    },
                    darken: function() {
                        T = w < m ? w : m;
                        N = E < g ? E : g;
                        C = S < y ? S : y
                    },
                    lighten: function() {
                        T = w > m ? w : m;
                        N = E > g ? E : g;
                        C = S > y ? S : y
                    },
                    difference: function() {
                        T = w - m;
                        if (T < 0) T = -T;
                        N = E - g;
                        if (N < 0) N = -N;
                        C = S - y;
                        if (C < 0) C = -C
                    },
                    exclusion: function() {
                        T = w + m * (255 - w - w) / 255;
                        N = E + g * (255 - E - E) / 255;
                        C = S + y * (255 - S - S) / 255
                    },
                    hue: function() {
                        a(m, g, y, u(w, E, S));
                        o(T, N, C, s(w, E, S))
                    },
                    saturation: function() {
                        a(w, E, S, u(m, g, y));
                        o(T, N, C, s(w, E, S))
                    },
                    luminosity: function() {
                        o(w, E, S, s(m, g, y))
                    },
                    color: function() {
                        o(m, g, y, s(w, E, S))
                    },
                    add: function() {
                        T = p(w + m, 255);
                        N = p(E + g, 255);
                        C = p(S + y, 255)
                    },
                    subtract: function() {
                        T = d(w - m, 0);
                        N = d(E - g, 0);
                        C = d(S - y, 0)
                    },
                    average: function() {
                        T = (w + m) / 2;
                        N = (E + g) / 2;
                        C = (S + y) / 2
                    },
                    negation: function() {
                        T = 255 - v(255 - m - w);
                        N = 255 - v(255 - g - E);
                        C = 255 - v(255 - y - S)
                    }
                };
                var L = k[e];
                if (!L) return;
                for (var A = 0, O = c.length; A < O; A += 4) {
                    m = h[A];
                    w = c[A];
                    g = h[A + 1];
                    E = c[A + 1];
                    y = h[A + 2];
                    S = c[A + 2];
                    b = h[A + 3];
                    x = c[A + 3];
                    L();
                    var M = b * r / 255,
                        _ = 1 - M;
                    c[A] = M * T + _ * w;
                    c[A + 1] = M * N + _ * E;
                    c[A + 2] = M * C + _ * S;
                    c[A + 3] = b * r + _ * x
                }
                n.putImageData(l, i.x, i.y)
            }
        };
        var PaperScript = this.PaperScript = new function() {
                function $eval(e, t, n) {
                    var r = operators[t];
                    if (e && e[r]) {
                        var i = e[r](n);
                        return t == "!=" ? !i : i
                    }
                    switch (t) {
                        case "+":
                            return e + n;
                        case "-":
                            return e - n;
                        case "*":
                            return e * n;
                        case "/":
                            return e / n;
                        case "%":
                            return e % n;
                        case "==":
                            return e == n;
                        case "!=":
                            return e != n;
                        default:
                            throw new Error("Implement Operator: " + t)
                    }
                }

                function $sign(e, t) {
                    var n = signOperators[e];
                    if (t && t[n]) {
                        return t[n]()
                    }
                    switch (e) {
                        case "+":
                            return +t;
                        case "-":
                            return -t;
                        default:
                            throw new Error("Implement Sign Operator: " + e)
                    }
                }

                function isDynamic(e) {
                    var t = e[0];
                    return t != "num" && t != "string"
                }

                function handleOperator(e, t, n) {
                    if (operators[e] && isDynamic(t)) {
                        return ["call", ["name", "$eval"], [t, ["string", e], n]]
                    }
                }

                function compile(e) {
                    var t = parse_js.parse(e),
                        n = parse_js.ast_walker(),
                        r = n.walk;
                    t = n.with_walkers({
                        binary: function(e, t, n) {
                            return handleOperator(e, t = r(t), n = r(n)) || [this[0], e, t, n]
                        },
                        assign: function(e, t, n) {
                            var i = handleOperator(e, t = r(t), n = r(n));
                            if (i) return [this[0], true, t, i];
                            return [this[0], e, t, n]
                        },
                        "unary-prefix": function(e, t) {
                            if (signOperators[e] && isDynamic(t)) {
                                return ["call", ["name", "$sign"], [
                                    ["string", e], r(t)
                                ]]
                            }
                        }
                    }, function() {
                        return r(t)
                    });
                    return parse_js.gen_code(t, {
                        beautify: true
                    })
                }

                function evaluate(code, scope) {
                    paper = scope;
                    var view = scope.view,
                        tool = /on(?:Key|Mouse)(?:Up|Down|Move|Drag)/.test(code) && new Tool,
                        res;
                    with(scope) {
                        (function() {
                            var onEditOptions, onSelect, onDeselect, onReselect, onMouseDown, onMouseUp, onMouseDrag, onMouseMove, onKeyDown, onKeyUp, onFrame, onResize, handlers = ["onEditOptions", "onSelect", "onDeselect", "onReselect", "onMouseDown", "onMouseUp", "onMouseDrag", "onMouseMove", "onKeyDown", "onKeyUp"];
                            res = eval(compile(code));
                            if (tool) {
                                Base.each(handlers, function(key) {
                                    tool[key] = eval(key)
                                })
                            }
                            if (view) {
                                view.onResize = onResize;
                                view.setOnFrame(onFrame);
                                view.draw()
                            }
                        }).call(scope)
                    }
                    return res
                }

                function request(e, t) {
                    var n = new(window.ActiveXObject || XMLHttpRequest)("Microsoft.XMLHTTP");
                    n.open("GET", e, true);
                    if (n.overrideMimeType) {
                        n.overrideMimeType("text/plain")
                    }
                    n.onreadystatechange = function() {
                        if (n.readyState === 4) {
                            return evaluate(n.responseText, t)
                        }
                    };
                    return n.send(null)
                }

                function load() {
                    var e = document.getElementsByTagName("script");
                    for (var t = 0, n = e.length; t < n; t++) {
                        var r = e[t];
                        if (/^text\/(?:x-|)paperscript$/.test(r.type) && !r.getAttribute("data-paper-loaded")) {
                            var i = new PaperScope(r);
                            i.setup(PaperScript.getAttribute(r, "canvas"));
                            if (r.src) {
                                request(r.src, i)
                            } else {
                                evaluate(r.innerHTML, i)
                            }
                            r.setAttribute("data-paper-loaded", true)
                        }
                    }
                }

                function handleAttribute(e) {
                    e += "Attribute";
                    return function(t, n) {
                        return t[e](n) || t[e]("data-paper-" + n)
                    }
                }
                var parse_js = new function() {
                        function e(e, t, n) {
                            var r = [];
                            for (var i = 0; i < e.length; ++i) r.push(t.call(n, e[i], i));
                            return r
                        }

                        function t(e) {
                            return /^[a-z_$][a-z0-9_$]*$/i.test(e) && e != "this" && !a(O, e) && !a(L, e) && !a(k, e)
                        }

                        function n(e, t) {
                            var n = {};
                            e === !0 && (e = {});
                            for (var r in t) a(t, r) && (n[r] = e && a(e, r) ? e[r] : t[r]);
                            return n
                        }

                        function r(e, t) {
                            return t < 1 ? "" : Array(t + 1).join(e)
                        }

                        function i(i, l) {
                            function h(e) {
                                var t = e[0],
                                    n = D[t];
                                if (!n) throw new Error("Can't find generator for \"" + t + '"');
                                P.push(e);
                                var r = n.apply(t, e.slice(1));
                                P.pop();
                                return r
                            }

                            function p(e) {
                                var t = e[0],
                                    n = e[1];
                                n != null && (t = N([L(t), "=", S(n, "seq")]));
                                return t
                            }

                            function d(e) {
                                return e ? e.length == 0 ? "{}" : "{" + M + C(function() {
                                    return m(e).join(M)
                                }) + M + k("}") : ";"
                            }

                            function v(t) {
                                var n = t.length;
                                return n == 0 ? "{}" : "{" + M + e(t, function(e, t) {
                                    var r = e[1].length > 0,
                                        i = C(function() {
                                            return k(e[0] ? N(["case", h(e[0]) + ":"]) : "default:")
                                        }, .5) + (r ? M + C(function() {
                                            return m(e[1]).join(M)
                                        }) : "");
                                    !A && r && t < n - 1 && (i += ";");
                                    return i
                                }).join(M) + M + k("}")
                            }

                            function m(t, n) {
                                for (var r = [], i = t.length - 1, s = 0; s <= i; ++s) {
                                    var u = t[s],
                                        a = h(u);
                                    a != ";" && (!A && s == i && (u[0] == "while" && o(u[2]) || f(u[0], ["for", "for-in"]) && o(u[4]) || u[0] == "if" && o(u[2]) && !u[3] || u[0] == "if" && u[3] && o(u[3]) ? a = a.replace(/;*\s*$/, ";") : a = a.replace(/;+\s*$/, "")), r.push(a))
                                }
                                return n ? r : e(r, k)
                            }

                            function g(t, n, r, i) {
                                var s = i || "function";
                                t && (s += " " + L(t)), s += "(" + x(e(n, L)) + ")";
                                return N([s, d(r)])
                            }

                            function y(e) {
                                if (e[0] == "do") return h(["block", [e]]);
                                var t = e;
                                for (;;) {
                                    var n = t[0];
                                    if (n == "if") {
                                        if (!t[3]) return h(["block", [e]]);
                                        t = t[3]
                                    } else if (n == "while" || n == "do") t = t[2];
                                    else if (n == "for" || n == "for-in") t = t[4];
                                    else break
                                }
                                return h(e)
                            }

                            function b(e) {
                                var t = e.toString(10),
                                    n = [t.replace(/^0\./, ".")],
                                    r;
                                Math.floor(e) === e ? (n.push("0x" + e.toString(16).toLowerCase(), "0" + e.toString(8)), (r = /^(.*?)(0+)$/.exec(e)) && n.push(r[1] + "e" + r[2].length)) : (r = /^0?\.(0+)(.*)$/.exec(e)) && n.push(r[2] + "e-" + (r[1].length + r[2].length), t.substr(t.indexOf(".")));
                                return E(n)
                            }

                            function w(e) {
                                if (e[0] == "function" || e[0] == "object") {
                                    var t = c(P),
                                        n = t.pop(),
                                        r = t.pop();
                                    while (r) {
                                        if (r[0] == "stat") return !0;
                                        if ((r[0] == "seq" || r[0] == "call" || r[0] == "dot" || r[0] == "sub" || r[0] == "conditional") && r[1] === n || (r[0] == "binary" || r[0] == "assign" || r[0] == "unary-postfix") && r[2] === n) n = r, r = t.pop();
                                        else return !1
                                    }
                                }
                                return !a($, e[0])
                            }

                            function E(e) {
                                if (e.length == 1) return e[0];
                                if (e.length == 2) {
                                    var t = e[1];
                                    e = e[0];
                                    return e.length <= t.length ? e : t
                                }
                                return E([e[0], E(e.slice(1))])
                            }

                            function S(e) {
                                var t = h(e);
                                for (var n = 1; n < arguments.length; ++n) {
                                    var r = arguments[n];
                                    if (r instanceof Function && r(e) || e[0] == r) return "(" + t + ")"
                                }
                                return t
                            }

                            function x(e) {
                                return e.join("," + _)
                            }

                            function N(e) {
                                if (A) return e.join(" ");
                                var t = [];
                                for (var n = 0; n < e.length; ++n) {
                                    var r = e[n + 1];
                                    t.push(e[n]), r && (/[a-z0-9_\x24]$/i.test(e[n].toString()) && /^[a-z0-9_\x24]/i.test(r.toString()) || /[\+\-]$/.test(e[n].toString()) && /^[\+\-]/.test(r.toString())) && t.push(" ")
                                }
                                return t.join("")
                            }

                            function C(e, t) {
                                t == null && (t = 1), O += t;
                                try {
                                    return e.apply(null, c(arguments, 1))
                                } finally {
                                    O -= t
                                }
                            }

                            function k(e) {
                                e == null && (e = ""), A && (e = r(" ", l.indent_start + O * l.indent_level) + e);
                                return e
                            }

                            function L(e) {
                                return e.toString()
                            }
                            l = n(l, {
                                indent_start: 0,
                                indent_level: 4,
                                quote_keys: !1,
                                space_colon: !1,
                                beautify: !1
                            });
                            var A = !! l.beautify,
                                O = 0,
                                M = A ? "\n" : "",
                                _ = A ? " " : "",
                                D = {
                                    string: s,
                                    num: b,
                                    name: L,
                                    toplevel: function(e) {
                                        return m(e).join(M)
                                    },
                                    splice: function(t) {
                                        var n = P[P.length - 2][0];
                                        return a(J, n) ? d.apply(this, arguments) : e(m(t, !0), function(e, t) {
                                            return t > 0 ? k(e) : e
                                        }).join(M)
                                    },
                                    block: d,
                                    "var": function(t) {
                                        return "var " + x(e(t, p)) + ";"
                                    },
                                    "const": function(t) {
                                        return "const " + x(e(t, p)) + ";"
                                    },
                                    "try": function(e, t, n) {
                                        var r = ["try", d(e)];
                                        t && r.push("catch", "(" + t[0] + ")", d(t[1])), n && r.push("finally", d(n));
                                        return N(r)
                                    },
                                    "throw": function(e) {
                                        return N(["throw", h(e)]) + ";"
                                    },
                                    "new": function(t, n) {
                                        n = n.length > 0 ? "(" + x(e(n, h)) + ")" : "";
                                        return N(["new", S(t, "seq", "binary", "conditional", "assign", function(e) {
                                            var t = u(),
                                                n = {};
                                            try {
                                                t.with_walkers({
                                                    call: function() {
                                                        throw n
                                                    },
                                                    "function": function() {
                                                        return this
                                                    }
                                                }, function() {
                                                    t.walk(e)
                                                })
                                            } catch (r) {
                                                if (r === n) return !0;
                                                throw r
                                            }
                                        }) + n])
                                    },
                                    "switch": function(e, t) {
                                        return N(["switch", "(" + h(e) + ")", v(t)])
                                    },
                                    "break": function(e) {
                                        var t = "break";
                                        e != null && (t += " " + L(e));
                                        return t + ";"
                                    },
                                    "continue": function(e) {
                                        var t = "continue";
                                        e != null && (t += " " + L(e));
                                        return t + ";"
                                    },
                                    conditional: function(e, t, n) {
                                        return N([S(e, "assign", "seq", "conditional"), "?", S(t, "seq"), ":", S(n, "seq")])
                                    },
                                    assign: function(e, t, n) {
                                        e && e !== !0 ? e += "=" : e = "=";
                                        return N([h(t), e, S(n, "seq")])
                                    },
                                    dot: function(e) {
                                        var t = h(e),
                                            n = 1;
                                        e[0] == "num" ? /\./.test(e[1]) || (t += ".") : w(e) && (t = "(" + t + ")");
                                        while (n < arguments.length) t += "." + L(arguments[n++]);
                                        return t
                                    },
                                    call: function(t, n) {
                                        var r = h(t);
                                        w(t) && (r = "(" + r + ")");
                                        return r + "(" + x(e(n, function(e) {
                                            return S(e, "seq")
                                        })) + ")"
                                    },
                                    "function": g,
                                    defun: g,
                                    "if": function(e, t, n) {
                                        var r = ["if", "(" + h(e) + ")", n ? y(t) : h(t)];
                                        n && r.push("else", h(n));
                                        return N(r)
                                    },
                                    "for": function(e, t, n, r) {
                                        var i = ["for"];
                                        e = (e != null ? h(e) : "").replace(/;*\s*$/, ";" + _), t = (t != null ? h(t) : "").replace(/;*\s*$/, ";" + _), n = (n != null ? h(n) : "").replace(/;*\s*$/, "");
                                        var s = e + t + n;
                                        s == "; ; " && (s = ";;"), i.push("(" + s + ")", h(r));
                                        return N(i)
                                    },
                                    "for-in": function(e, t, n, r) {
                                        return N(["for", "(" + (e ? h(e).replace(/;+$/, "") : h(t)), "in", h(n) + ")", h(r)])
                                    },
                                    "while": function(e, t) {
                                        return N(["while", "(" + h(e) + ")", h(t)])
                                    },
                                    "do": function(e, t) {
                                        return N(["do", h(t), "while", "(" + h(e) + ")"]) + ";"
                                    },
                                    "return": function(e) {
                                        var t = ["return"];
                                        e != null && t.push(h(e));
                                        return N(t) + ";"
                                    },
                                    binary: function(e, t, n) {
                                        var r = h(t),
                                            i = h(n);
                                        if (f(t[0], ["assign", "conditional", "seq"]) || t[0] == "binary" && W[e] > W[t[1]]) r = "(" + r + ")";
                                        if (f(n[0], ["assign", "conditional", "seq"]) || n[0] == "binary" && W[e] >= W[n[1]] && (n[1] != e || !f(e, ["&&", "||", "*"]))) i = "(" + i + ")";
                                        return N([r, e, i])
                                    },
                                    "unary-prefix": function(e, t) {
                                        var n = h(t);
                                        t[0] == "num" || t[0] == "unary-prefix" && !a(H, e + t[1]) || !w(t) || (n = "(" + n + ")");
                                        return e + (T(e.charAt(0)) ? " " : "") + n
                                    },
                                    "unary-postfix": function(e, t) {
                                        var n = h(t);
                                        t[0] == "num" || t[0] == "unary-postfix" && !a(H, e + t[1]) || !w(t) || (n = "(" + n + ")");
                                        return n + e
                                    },
                                    sub: function(e, t) {
                                        var n = h(e);
                                        w(e) && (n = "(" + n + ")");
                                        return n + "[" + h(t) + "]"
                                    },
                                    object: function(n) {
                                        return n.length == 0 ? "{}" : "{" + M + C(function() {
                                            return e(n, function(e) {
                                                if (e.length == 3) return k(g(e[0], e[1][2], e[1][3], e[2]));
                                                var n = e[0],
                                                    r = h(e[1]);
                                                l.quote_keys ? n = s(n) : (typeof n == "number" || !A && +n + "" == n) && parseFloat(n) >= 0 ? n = b(+n) : t(n) || (n = s(n));
                                                return k(N(A && l.space_colon ? [n, ":", r] : [n + ":", r]))
                                            }).join("," + M)
                                        }) + M + k("}")
                                    },
                                    regexp: function(e, t) {
                                        return "/" + e + "/" + t
                                    },
                                    array: function(t) {
                                        return t.length == 0 ? "[]" : N(["[", x(e(t, function(e) {
                                            return !A && e[0] == "atom" && e[1] == "undefined" ? "" : S(e, "seq")
                                        })), "]"])
                                    },
                                    stat: function(e) {
                                        return h(e).replace(/;*\s*$/, ";")
                                    },
                                    seq: function() {
                                        return x(e(c(arguments), h))
                                    },
                                    label: function(e, t) {
                                        return N([L(e), ":", h(t)])
                                    },
                                    "with": function(e, t) {
                                        return N(["with", "(" + h(e) + ")", h(t)])
                                    },
                                    atom: function(e) {
                                        return L(e)
                                    }
                                }, P = [];
                            return h(i)
                        }

                        function s(e) {
                            var t = 0,
                                n = 0;
                            e = e.replace(/[\\\b\f\n\r\t\x22\x27]/g, function(e) {
                                switch (e) {
                                    case "\\":
                                        return "\\\\";
                                    case "\b":
                                        return "\\b";
                                    case "\f":
                                        return "\\f";
                                    case "\n":
                                        return "\\n";
                                    case "\r":
                                        return "\\r";
                                    case "	":
                                        return "\\t";
                                    case '"':
                                        ++t;
                                        return '"';
                                    case "'":
                                        ++n;
                                        return "'"
                                }
                                return e
                            });
                            return t > n ? "'" + e.replace(/\x27/g, "\\'") + "'" : '"' + e.replace(/\x22/g, '\\"') + '"'
                        }

                        function o(e) {
                            return !e || e[0] == "block" && (!e[1] || e[1].length == 0)
                        }

                        function u() {
                            function t(e, t) {
                                var n = {}, r;
                                for (r in e) a(e, r) && (n[r] = o[r], o[r] = e[r]);
                                var i = t();
                                for (r in n) a(n, r) && (n[r] ? o[r] = n[r] : delete o[r]);
                                return i
                            }

                            function n(e) {
                                if (e == null) return null;
                                try {
                                    u.push(e);
                                    var t = e[0],
                                        n = o[t];
                                    if (n) {
                                        var r = n.apply(e, e.slice(1));
                                        if (r != null) return r
                                    }
                                    n = s[t];
                                    return n.apply(e, e.slice(1))
                                } finally {
                                    u.pop()
                                }
                            }

                            function r(t) {
                                var r = [this[0]];
                                t != null && r.push(e(t, n));
                                return r
                            }

                            function i(t) {
                                return [this[0], e(t, function(e) {
                                    var t = [e[0]];
                                    e.length > 1 && (t[1] = n(e[1]));
                                    return t
                                })]
                            }
                            var s = {
                                string: function(e) {
                                    return [this[0], e]
                                },
                                num: function(e) {
                                    return [this[0], e]
                                },
                                name: function(e) {
                                    return [this[0], e]
                                },
                                toplevel: function(t) {
                                    return [this[0], e(t, n)]
                                },
                                block: r,
                                splice: r,
                                "var": i,
                                "const": i,
                                "try": function(t, r, i) {
                                    return [this[0], e(t, n), r != null ? [r[0], e(r[1], n)] : null, i != null ? e(i, n) : null]
                                },
                                "throw": function(e) {
                                    return [this[0], n(e)]
                                },
                                "new": function(t, r) {
                                    return [this[0], n(t), e(r, n)]
                                },
                                "switch": function(t, r) {
                                    return [this[0], n(t), e(r, function(t) {
                                        return [t[0] ? n(t[0]) : null, e(t[1], n)]
                                    })]
                                },
                                "break": function(e) {
                                    return [this[0], e]
                                },
                                "continue": function(e) {
                                    return [this[0], e]
                                },
                                conditional: function(e, t, r) {
                                    return [this[0], n(e), n(t), n(r)]
                                },
                                assign: function(e, t, r) {
                                    return [this[0], e, n(t), n(r)]
                                },
                                dot: function(e) {
                                    return [this[0], n(e)].concat(c(arguments, 1))
                                },
                                call: function(t, r) {
                                    return [this[0], n(t), e(r, n)]
                                },
                                "function": function(t, r, i) {
                                    return [this[0], t, r.slice(), e(i, n)]
                                },
                                defun: function(t, r, i) {
                                    return [this[0], t, r.slice(), e(i, n)]
                                },
                                "if": function(e, t, r) {
                                    return [this[0], n(e), n(t), n(r)]
                                },
                                "for": function(e, t, r, i) {
                                    return [this[0], n(e), n(t), n(r), n(i)]
                                },
                                "for-in": function(e, t, r, i) {
                                    return [this[0], n(e), n(t), n(r), n(i)]
                                },
                                "while": function(e, t) {
                                    return [this[0], n(e), n(t)]
                                },
                                "do": function(e, t) {
                                    return [this[0], n(e), n(t)]
                                },
                                "return": function(e) {
                                    return [this[0], n(e)]
                                },
                                binary: function(e, t, r) {
                                    return [this[0], e, n(t), n(r)]
                                },
                                "unary-prefix": function(e, t) {
                                    return [this[0], e, n(t)]
                                },
                                "unary-postfix": function(e, t) {
                                    return [this[0], e, n(t)]
                                },
                                sub: function(e, t) {
                                    return [this[0], n(e), n(t)]
                                },
                                object: function(t) {
                                    return [this[0], e(t, function(e) {
                                        return e.length == 2 ? [e[0], n(e[1])] : [e[0], n(e[1]), e[2]]
                                    })]
                                },
                                regexp: function(e, t) {
                                    return [this[0], e, t]
                                },
                                array: function(t) {
                                    return [this[0], e(t, n)]
                                },
                                stat: function(e) {
                                    return [this[0], n(e)]
                                },
                                seq: function() {
                                    return [this[0]].concat(e(c(arguments), n))
                                },
                                label: function(e, t) {
                                    return [this[0], e, n(t)]
                                },
                                "with": function(e, t) {
                                    return [this[0], n(e), n(t)]
                                },
                                atom: function(e) {
                                    return [this[0], e]
                                }
                            }, o = {}, u = [];
                            return {
                                walk: n,
                                with_walkers: t,
                                parent: function() {
                                    return u[u.length - 2]
                                },
                                stack: function() {
                                    return u
                                }
                            }
                        }

                        function a(e, t) {
                            return Object.prototype.hasOwnProperty.call(e, t)
                        }

                        function f(e, t) {
                            for (var n = t.length; --n >= 0;)
                                if (t[n] === e) return !0;
                            return !1
                        }

                        function l(e) {
                            return e.split("")
                        }

                        function c(e, t) {
                            return Array.prototype.slice.call(e, t || 0)
                        }

                        function h(e) {
                            var t = {};
                            for (var n = 0; n < e.length; ++n) t[e[n]] = !0;
                            return t
                        }

                        function p(e) {
                            e instanceof Function && (e = e());
                            for (var t = 1, n = arguments.length; --n > 0; ++t) arguments[t]();
                            return e
                        }

                        function d(e) {
                            var t = c(arguments, 1);
                            return function() {
                                return e.apply(this, t.concat(c(arguments)))
                            }
                        }

                        function v(e, t, n) {
                            function r(e) {
                                try {
                                    ++st.in_loop;
                                    return e()
                                } finally {
                                    --st.in_loop
                                }
                            }

                            function i(e) {
                                var t = o(e),
                                    n = st.token.value;
                                if (it("operator") && a(z, n)) {
                                    if (s(t)) {
                                        nt();
                                        return $("assign", z[n], t, i(e))
                                    }
                                    et("Invalid assignment")
                                }
                                return t
                            }

                            function s(e) {
                                if (!t) return !0;
                                switch (e[0]) {
                                    case "dot":
                                    case "sub":
                                    case "new":
                                    case "call":
                                        return !0;
                                    case "name":
                                        return e[1] != "this"
                                }
                            }

                            function o(e) {
                                var t = u(e);
                                if (it("operator", "?")) {
                                    nt();
                                    var n = lt(!1);
                                    Q(":");
                                    return $("conditional", t, n, lt(!1, e))
                                }
                                return t
                            }

                            function u(e) {
                                return l(ft(!0), 0, e)
                            }

                            function l(e, t, n) {
                                var r = it("operator") ? st.token.value : null;
                                r && r == "in" && n && (r = null);
                                var i = r != null ? W[r] : null;
                                if (i != null && i > t) {
                                    nt();
                                    var s = l(ft(!0), i, n);
                                    return l($("binary", r, e, s), t, n)
                                }
                                return e
                            }

                            function h(e, t, n) {
                                (t == "++" || t == "--") && !s(n) && et("Invalid use of " + t + " operator");
                                return $(e, t, n)
                            }

                            function v(e, t) {
                                if (it("punc", ".")) {
                                    nt();
                                    return v($("dot", e, w()), t)
                                }
                                if (it("punc", "[")) {
                                    nt();
                                    return v($("sub", e, p(lt, d(Q, "]"))), t)
                                }
                                if (t && it("punc", "(")) {
                                    nt();
                                    return v($("call", e, T(")")), !0)
                                }
                                return t && it("operator") && a(U, st.token.value) ? p(d(h, "unary-postfix", st.token.value, e), nt) : e
                            }

                            function w() {
                                switch (st.token.type) {
                                    case "name":
                                    case "operator":
                                    case "keyword":
                                    case "atom":
                                        return p(st.token.value, nt);
                                    default:
                                        Y()
                                }
                            }

                            function E() {
                                switch (st.token.type) {
                                    case "num":
                                    case "string":
                                        return p(st.token.value, nt)
                                }
                                return w()
                            }

                            function S() {
                                var e = !0,
                                    n = [];
                                while (!it("punc", "}")) {
                                    e ? e = !1 : Q(",");
                                    if (!t && it("punc", "}")) break;
                                    var r = st.token.type,
                                        i = E();
                                    r != "name" || i != "get" && i != "set" || !! it("punc", ":") ? (Q(":"), n.push([i, lt(!1)])) : n.push([w(), ut(!1), i])
                                }
                                nt();
                                return $("object", n)
                            }

                            function x() {
                                return $("array", T("]", !t, !0))
                            }

                            function T(e, t, n) {
                                var r = !0,
                                    i = [];
                                while (!it("punc", e)) {
                                    r ? r = !1 : Q(",");
                                    if (t && it("punc", e)) break;
                                    it("punc", ",") && n ? i.push(["atom", "undefined"]) : i.push(lt(!1))
                                }
                                nt();
                                return i
                            }

                            function N() {
                                var e = ft(!1),
                                    t;
                                it("punc", "(") ? (nt(), t = T(")")) : t = [];
                                return v($("new", e, t), !0)
                            }

                            function C() {
                                return $("const", L())
                            }

                            function k(e) {
                                return $("var", L(e))
                            }

                            function L(e) {
                                var t = [];
                                for (;;) {
                                    it("name") || Y();
                                    var n = st.token.value;
                                    nt(), it("operator", "=") ? (nt(), t.push([n, lt(!1, e)])) : t.push([n]);
                                    if (!it("punc", ",")) break;
                                    nt()
                                }
                                return t
                            }

                            function A() {
                                var e = O(),
                                    t, n;
                                if (it("keyword", "catch")) {
                                    nt(), Q("("), it("name") || et("Name expected");
                                    var r = st.token.value;
                                    nt(), Q(")"), t = [r, O()]
                                }
                                it("keyword", "finally") && (nt(), n = O()), !t && !n && et("Missing catch/finally blocks");
                                return $("try", e, t, n)
                            }

                            function O() {
                                Q("{");
                                var e = [];
                                while (!it("punc", "}")) it("eof") && Y(), e.push(ot());
                                nt();
                                return e
                            }

                            function M() {
                                var e = q(),
                                    t = ot(),
                                    n;
                                it("keyword", "else") && (nt(), n = ot());
                                return $("if", e, t, n)
                            }

                            function _(e) {
                                var t = e[0] == "var" ? $("name", e[1][0]) : e;
                                nt();
                                var n = lt();
                                Q(")");
                                return $("for-in", e, t, n, r(ot))
                            }

                            function D(e) {
                                Q(";");
                                var t = it("punc", ";") ? null : lt();
                                Q(";");
                                var n = it("punc", ")") ? null : lt();
                                Q(")");
                                return $("for", e, t, n, r(ot))
                            }

                            function P() {
                                Q("(");
                                var e = null;
                                if (!it("punc", ";")) {
                                    e = it("keyword", "var") ? (nt(), k(!0)) : lt(!0, !0);
                                    if (it("operator", "in")) return _(e)
                                }
                                return D(e)
                            }

                            function H(e) {
                                var t;
                                K() || (t = it("name") ? st.token.value : null), t != null ? (nt(), f(t, st.labels) || et("Label " + t + " without matching loop or statement")) : st.in_loop == 0 && et(e + " not inside a loop or switch"), J();
                                return $(e, t)
                            }

                            function B() {
                                return $("stat", p(lt, J))
                            }

                            function j(e) {
                                st.labels.push(e);
                                var n = st.token,
                                    r = ot();
                                t && !a(X, r[0]) && Y(n), st.labels.pop();
                                return $("label", e, r)
                            }

                            function F(e) {
                                return n ? function() {
                                    var t = st.token,
                                        n = e.apply(this, arguments);
                                    n[0] = I(n[0], t, tt());
                                    return n
                                } : e
                            }

                            function I(e, t, n) {
                                return e instanceof m ? e : new m(e, t, n)
                            }

                            function q() {
                                Q("(");
                                var e = lt();
                                Q(")");
                                return e
                            }

                            function $() {
                                return c(arguments)
                            }

                            function J() {
                                it("punc", ";") ? nt() : K() || Y()
                            }

                            function K() {
                                return !t && (st.token.nlb || it("eof") || it("punc", "}"))
                            }

                            function Q(e) {
                                return G("punc", e)
                            }

                            function G(e, t) {
                                if (it(e, t)) return nt();
                                Z(st.token, "Unexpected token " + st.token.type + ", expected " + e)
                            }

                            function Y(e) {
                                e == null && (e = st.token), Z(e, "Unexpected token: " + e.type + " (" + e.value + ")")
                            }

                            function Z(e, t) {
                                et(t, e.line, e.col)
                            }

                            function et(e, t, n, r) {
                                var i = st.input.context();
                                b(e, t != null ? t : i.tokline, n != null ? n : i.tokcol, r != null ? r : i.tokpos)
                            }

                            function tt() {
                                return st.prev
                            }

                            function nt() {
                                st.prev = st.token, st.peeked ? (st.token = st.peeked, st.peeked = null) : st.token = st.input();
                                return st.token
                            }

                            function rt() {
                                return st.peeked || (st.peeked = st.input())
                            }

                            function it(e, t) {
                                return y(st.token, e, t)
                            }
                            var st = {
                                input: typeof e == "string" ? g(e, !0) : e,
                                token: null,
                                prev: null,
                                peeked: null,
                                in_function: 0,
                                in_loop: 0,
                                labels: []
                            };
                            st.token = nt();
                            var ot = F(function() {
                                it("operator", "/") && (st.peeked = null, st.token = st.input(!0));
                                switch (st.token.type) {
                                    case "num":
                                    case "string":
                                    case "regexp":
                                    case "operator":
                                    case "atom":
                                        return B();
                                    case "name":
                                        return y(rt(), "punc", ":") ? j(p(st.token.value, nt, nt)) : B();
                                    case "punc":
                                        switch (st.token.value) {
                                            case "{":
                                                return $("block", O());
                                            case "[":
                                            case "(":
                                                return B();
                                            case ";":
                                                nt();
                                                return $("block");
                                            default:
                                                Y()
                                        };
                                    case "keyword":
                                        switch (p(st.token.value, nt)) {
                                            case "break":
                                                return H("break");
                                            case "continue":
                                                return H("continue");
                                            case "debugger":
                                                J();
                                                return $("debugger");
                                            case "do":
                                                return function(e) {
                                                    G("keyword", "while");
                                                    return $("do", p(q, J), e)
                                                }(r(ot));
                                            case "for":
                                                return P();
                                            case "function":
                                                return ut(!0);
                                            case "if":
                                                return M();
                                            case "return":
                                                st.in_function == 0 && et("'return' outside of function");
                                                return $("return", it("punc", ";") ? (nt(), null) : K() ? null : p(lt, J));
                                            case "switch":
                                                return $("switch", q(), at());
                                            case "throw":
                                                return $("throw", p(lt, J));
                                            case "try":
                                                return A();
                                            case "var":
                                                return p(k, J);
                                            case "const":
                                                return p(C, J);
                                            case "while":
                                                return $("while", q(), r(ot));
                                            case "with":
                                                return $("with", q(), ot());
                                            default:
                                                Y()
                                        }
                                }
                            }),
                                ut = F(function(e) {
                                    var t = it("name") ? p(st.token.value, nt) : null;
                                    e && !t && Y(), Q("(");
                                    return $(e ? "defun" : "function", t, function(e, t) {
                                        while (!it("punc", ")")) e ? e = !1 : Q(","), it("name") || Y(), t.push(st.token.value), nt();
                                        nt();
                                        return t
                                    }(!0, []), function() {
                                        ++st.in_function;
                                        var e = st.in_loop;
                                        st.in_loop = 0;
                                        var t = O();
                                        --st.in_function, st.in_loop = e;
                                        return t
                                    }())
                                }),
                                at = d(r, function() {
                                    Q("{");
                                    var e = [],
                                        t = null;
                                    while (!it("punc", "}")) it("eof") && Y(), it("keyword", "case") ? (nt(), t = [], e.push([lt(), t]), Q(":")) : it("keyword", "default") ? (nt(), Q(":"), t = [], e.push([null, t])) : (t || Y(), t.push(ot()));
                                    nt();
                                    return e
                                }),
                                ft = F(function(e) {
                                    if (it("operator", "new")) {
                                        nt();
                                        return N()
                                    }
                                    if (it("operator") && a(R, st.token.value)) return h("unary-prefix", p(st.token.value, nt), ft(e));
                                    if (it("punc")) {
                                        switch (st.token.value) {
                                            case "(":
                                                nt();
                                                return v(p(lt, d(Q, ")")), e);
                                            case "[":
                                                nt();
                                                return v(x(), e);
                                            case "{":
                                                nt();
                                                return v(S(), e)
                                        }
                                        Y()
                                    }
                                    if (it("keyword", "function")) {
                                        nt();
                                        return v(ut(!1), e)
                                    }
                                    if (a(V, st.token.type)) {
                                        var t = st.token.type == "regexp" ? $("regexp", st.token.value[0], st.token.value[1]) : $(st.token.type, st.token.value);
                                        return v(p(t, nt), e)
                                    }
                                    Y()
                                }),
                                lt = F(function(e, t) {
                                    arguments.length == 0 && (e = !0);
                                    var n = i(t);
                                    if (e && it("punc", ",")) {
                                        nt();
                                        return $("seq", n, lt(!0, t))
                                    }
                                    return n
                                });
                            return $("toplevel", function(e) {
                                while (!it("eof")) e.push(ot());
                                return e
                            }([]))
                        }

                        function m(e, t, n) {
                            this.name = e, this.start = t, this.end = n
                        }

                        function g(e) {
                            function t(e) {
                                if (e) return u();
                                g(), w();
                                var t = D();
                                if (!t) return y("eof");
                                if (N(t)) return d();
                                if (t == '"' || t == "'") return c();
                                if (a(F, t)) return y("punc", _());
                                if (t == ".") return i();
                                if (t == "/") return s();
                                if (a(M, t)) return o();
                                if (t == "\\" || x(t)) return r();
                                v("Unexpected character '" + t + "'")
                            }

                            function n(e, t) {
                                try {
                                    return t()
                                } catch (n) {
                                    if (n === q) v(e);
                                    else throw n
                                }
                            }

                            function r() {
                                var e = m(S);
                                return a(k, e) ? a(H, e) ? y("operator", e) : a(O, e) ? y("atom", e) : y("keyword", e) : y("name", e)
                            }

                            function i() {
                                _();
                                return N(D()) ? d(".") : y("punc", ".")
                            }

                            function s() {
                                _();
                                var e = P.regex_allowed;
                                switch (D()) {
                                    case "/":
                                        P.comments_before.push(l()), P.regex_allowed = e;
                                        return t();
                                    case "*":
                                        P.comments_before.push(f()), P.regex_allowed = e;
                                        return t()
                                }
                                return P.regex_allowed ? u() : o("/")
                            }

                            function o(e) {
                                function t(e) {
                                    if (!D()) return e;
                                    var n = e + D();
                                    if (a(H, n)) {
                                        _();
                                        return t(n)
                                    }
                                    return e
                                }
                                return y("operator", t(e || _()))
                            }

                            function u() {
                                return n("Unterminated regular expression", function() {
                                    var e = !1,
                                        t = "",
                                        n, r = !1;
                                    while (n = _(!0))
                                        if (e) t += "\\" + n, e = !1;
                                        else if (n == "[") r = !0, t += n;
                                    else if (n == "]" && r) r = !1, t += n;
                                    else {
                                        if (n == "/" && !r) break;
                                        n == "\\" ? e = !0 : t += n
                                    }
                                    var i = m(function(e) {
                                        return a(I, e)
                                    });
                                    return y("regexp", [t, i])
                                })
                            }

                            function f() {
                                _();
                                return n("Unterminated multiline comment", function() {
                                    var e = C("*/", !0),
                                        t = P.text.substring(P.pos, e),
                                        n = y("comment2", t, !0);
                                    P.pos = e + 2, P.line += t.split("\n").length - 1, P.newline_before = t.indexOf("\n") >= 0;
                                    return n
                                })
                            }

                            function l() {
                                _();
                                var e = C("\n"),
                                    t;
                                e == -1 ? (t = P.text.substr(P.pos), P.pos = P.text.length) : (t = P.text.substring(P.pos, e), P.pos = e);
                                return y("comment1", t, !0)
                            }

                            function c() {
                                return n("Unterminated string constant", function() {
                                    var e = _(),
                                        t = "";
                                    for (;;) {
                                        var n = _(!0);
                                        if (n == "\\") n = p();
                                        else if (n == e) break;
                                        t += n
                                    }
                                    return y("string", t)
                                })
                            }

                            function h(e) {
                                var t = 0;
                                for (; e > 0; --e) {
                                    var n = parseInt(_(!0), 16);
                                    isNaN(n) && v("Invalid hex-character pattern in string"), t = t << 4 | n
                                }
                                return t
                            }

                            function p() {
                                var e = _(!0);
                                switch (e) {
                                    case "n":
                                        return "\n";
                                    case "r":
                                        return "\r";
                                    case "t":
                                        return "	";
                                    case "b":
                                        return "\b";
                                    case "v":
                                        return "";
                                    case "f":
                                        return "\f";
                                    case "0":
                                        return " ";
                                    case "x":
                                        return String.fromCharCode(h(2));
                                    case "u":
                                        return String.fromCharCode(h(4));
                                    case "\n":
                                        return "";
                                    default:
                                        return e
                                }
                            }

                            function d(e) {
                                var t = !1,
                                    n = !1,
                                    r = !1,
                                    i = e == ".",
                                    s = m(function(s, o) {
                                        if (s == "x" || s == "X") return r ? !1 : r = !0;
                                        if (!r && (s == "E" || s == "e")) return t ? !1 : t = n = !0;
                                        if (s == "-") return n || o == 0 && !e ? !0 : !1;
                                        if (s == "+") return n;
                                        n = !1;
                                        if (s == ".") return !i && !r ? i = !0 : !1;
                                        return T(s)
                                    });
                                e && (s = e + s);
                                var o = E(s);
                                if (!isNaN(o)) return y("num", o);
                                v("Invalid syntax: " + s)
                            }

                            function v(e) {
                                b(e, P.tokline, P.tokcol, P.tokpos)
                            }

                            function m(e) {
                                var t = "",
                                    n = D(),
                                    r = 0;
                                while (n && e(n, r++)) t += _(), n = D();
                                return t
                            }

                            function g() {
                                while (a(B, D())) _()
                            }

                            function y(e, t, n) {
                                P.regex_allowed = e == "operator" && !a(U, t) || e == "keyword" && a(A, t) || e == "punc" && a(j, t);
                                var r = {
                                    type: e,
                                    value: t,
                                    line: P.tokline,
                                    col: P.tokcol,
                                    pos: P.tokpos,
                                    nlb: P.newline_before
                                };
                                n || (r.comments_before = P.comments_before, P.comments_before = []), P.newline_before = !1;
                                return r
                            }

                            function w() {
                                P.tokline = P.line, P.tokcol = P.col, P.tokpos = P.pos
                            }

                            function C(e, t) {
                                var n = P.text.indexOf(e, P.pos);
                                if (t && n == -1) throw q;
                                return n
                            }

                            function L() {
                                return !P.peek()
                            }

                            function _(e) {
                                var t = P.text.charAt(P.pos++);
                                if (e && !t) throw q;
                                t == "\n" ? (P.newline_before = !0, ++P.line, P.col = 0) : ++P.col;
                                return t
                            }

                            function D() {
                                return P.text.charAt(P.pos)
                            }
                            var P = {
                                text: e.replace(/\r\n?|[\n\u2028\u2029]/g, "\n").replace(/^\uFEFF/, ""),
                                pos: 0,
                                tokpos: 0,
                                line: 0,
                                tokline: 0,
                                col: 0,
                                tokcol: 0,
                                newline_before: !1,
                                regex_allowed: !1,
                                comments_before: []
                            };
                            t.context = function(e) {
                                e && (P = e);
                                return P
                            };
                            return t
                        }

                        function y(e, t, n) {
                            return e.type == t && (n == null || e.value == n)
                        }

                        function b(e, t, n, r) {
                            throw new w(e, t, n, r)
                        }

                        function w(e, t, n, r) {
                            this.message = e, this.line = t, this.col = n, this.pos = r
                        }

                        function E(e) {
                            if (_.test(e)) return parseInt(e.substr(2), 16);
                            if (D.test(e)) return parseInt(e.substr(1), 8);
                            if (P.test(e)) return parseFloat(e)
                        }

                        function S(e) {
                            return x(e) || N(e)
                        }

                        function x(e) {
                            return e == "$" || e == "_" || C(e)
                        }

                        function T(e) {
                            return N(e) || C(e)
                        }

                        function N(e) {
                            e = e.charCodeAt(0);
                            return e >= 48 && e <= 57
                        }

                        function C(e) {
                            e = e.charCodeAt(0);
                            return e >= 65 && e <= 90 || e >= 97 && e <= 122
                        }
                        var k = h(["break", "case", "catch", "const", "continue", "default", "delete", "do", "else", "finally", "for", "function", "if", "in", "instanceof", "new", "return", "switch", "throw", "try", "typeof", "var", "void", "while", "with"]),
                            L = h(["abstract", "boolean", "byte", "char", "class", "debugger", "double", "enum", "export", "extends", "final", "float", "goto", "implements", "import", "int", "interface", "long", "native", "package", "private", "protected", "public", "short", "static", "super", "synchronized", "throws", "transient", "volatile"]),
                            A = h(["return", "new", "delete", "throw", "else", "case"]),
                            O = h(["false", "null", "true", "undefined"]),
                            M = h(l("+-*&%=<>!?|~^")),
                            _ = /^0x[0-9a-f]+$/i,
                            D = /^0[0-7]+$/,
                            P = /^\d*\.?\d*(?:e[+-]?\d*(?:\d\.?|\.?\d)\d*)?$/i,
                            H = h(["in", "instanceof", "typeof", "new", "void", "delete", "++", "--", "+", "-", "!", "~", "&", "|", "^", "*", "/", "%", ">>", "<<", ">>>", "<", ">", "<=", ">=", "==", "===", "!=", "!==", "?", "=", "+=", "-=", "/=", "*=", "%=", ">>=", "<<=", ">>>=", "|=", "^=", "&=", "&&", "||"]),
                            B = h(l(" \n\r	")),
                            j = h(l("[{}(,.;:")),
                            F = h(l("[]{}(),;:")),
                            I = h(l("gmsiy"));
                        w.prototype.toString = function() {
                            return this.message + " (line: " + this.line + ", col: " + this.col + ", pos: " + this.pos + ")"
                        };
                        var q = {}, R = h(["typeof", "void", "delete", "--", "++", "!", "~", "-", "+"]),
                            U = h(["--", "++"]),
                            z = function(e, t, n) {
                                while (n < e.length) t[e[n]] = e[n].substr(0, e[n].length - 1), n++;
                                return t
                            }(["+=", "-=", "/=", "*=", "%=", ">>=", "<<=", ">>>=", "|=", "^=", "&="], {
                                "=": !0
                            }, 0),
                            W = function(e, t) {
                                for (var n = 0, r = 1; n < e.length; ++n, ++r) {
                                    var i = e[n];
                                    for (var s = 0; s < i.length; ++s) t[i[s]] = r
                                }
                                return t
                            }([
                                ["||"],
                                ["&&"],
                                ["|"],
                                ["^"],
                                ["&"],
                                ["==", "===", "!=", "!=="],
                                ["<", ">", "<=", ">=", "in", "instanceof"],
                                [">>", "<<", ">>>"],
                                ["+", "-"],
                                ["*", "/", "%"]
                            ], {}),
                            X = h(["for", "do", "while", "switch"]),
                            V = h(["atom", "num", "string", "regexp", "name"]);
                        m.prototype.toString = function() {
                            return this.name
                        };
                        var $ = h(["name", "array", "object", "string", "dot", "sub", "call", "regexp"]),
                            J = h(["if", "while", "do", "for", "for-in", "with"]);
                        return {
                            parse: v,
                            gen_code: i,
                            tokenizer: g,
                            ast_walker: u
                        }
                    };
                var operators = {
                    "+": "add",
                    "-": "subtract",
                    "*": "multiply",
                    "/": "divide",
                    "%": "modulo",
                    "==": "equals",
                    "!=": "equals"
                };
                var signOperators = {
                    "-": "negate"
                };
                DomEvent.add(window, {
                    load: load
                });
                return {
                    compile: compile,
                    evaluate: evaluate,
                    load: load,
                    getAttribute: handleAttribute("get"),
                    hasAttribute: handleAttribute("has")
                }
            };
        this.load = PaperScript.load;
        Base.each(this, function(e, t) {
            if (e && e.prototype instanceof Base) {
                e._name = t
            }
        });
        this.enumerable = true;
        return new(PaperScope.inject(this))
    };
(function(e) {
    e.fn.tip = function(t) {
        var n = {
            closeTipBtn: "tip_close_btn",
            toolTipId: "tip",
            fixed: false,
            clickIt: false,
            inSpeed: 200,
            outSpeed: 100,
            tipContent: "",
            toolTipClass: "tip_tip",
            xOffset: 5,
            yOffset: 5,
            onShow: null,
            onHide: null
        }, r = e.extend({}, n, t);
        return this.each(function() {
            var t = e(this);
            if (t.attr("title")) {
                var n = t.attr("title")
            } else {
                var n = r.tipContent
            }
            var i = function() {
                e("body").append("<div id='" + r.toolTipId + "' class='" + r.toolTipClass + "'><p class='tip_content'>" + n + "</p></div>");
                if (n && r.clickIt) {
                    e("#" + r.toolTipId + " p.aToolTipContent").append("<a id='" + r.closeTipBtn + "' href='#' alt='close'>close</a>")
                }
            }, s = function() {
                    e("#" + r.toolTipId).css({
                        top: t.offset().top - e("#" + r.toolTipId).outerHeight() - r.yOffset + "px",
                        left: t.offset().left + t.outerWidth() + r.xOffset + "px"
                    }).stop().fadeIn(r.inSpeed, function() {
                        if (e.isFunction(r.onShow)) {
                            r.onShow(t)
                        }
                    })
                }, o = function() {
                    e("#" + r.toolTipId).stop().fadeOut(r.outSpeed, function() {
                        e(this).remove();
                        if (e.isFunction(r.onHide)) {
                            r.onHide(t)
                        }
                    })
                };
            if (n && !r.clickIt) {
                t.hover(function() {
                    e("#" + r.toolTipId).remove();
                    t.attr({
                        title: ""
                    });
                    i();
                    s()
                }, function() {
                    o()
                })
            }
            if (n && r.clickIt) {
                t.click(function(n) {
                    e("#" + r.toolTipId).remove();
                    t.attr({
                        title: ""
                    });
                    i();
                    s();
                    e("#" + r.closeTipBtn).click(function() {
                        o();
                        return false
                    });
                    return false
                })
            }
            if (!r.fixed && !r.clickIt) {
                t.mousemove(function(t) {
                    e("#" + r.toolTipId).css({
                        top: t.pageY - e("#" + r.toolTipId).outerHeight() - r.yOffset,
                        left: t.pageX + r.xOffset
                    })
                })
            }
        })
    }
})(jQuery);
paper.install(window);
var _url = "http://anthonybarranco.com",
    app = function() {
        function e() {
            _Path.history.listen();
            $("a").click(function(e) {})
        }

        function t() {
            for (s = 0; s < o; s++) {
                var e = 18 * Math.random();
                s / 6 != parseInt(s / 3) ? u[s] = new Path.RegularPolygon(new Point(e, e), parseInt(1 + Math.random() * 5), e) : u[s] = new Path.Rectangle([e * .71, e * .71], [e, e]);
                u[s].strokeColor = "#ff0000";
                u[s].size = e * 5;
                u[s].selected = !1;
                s % 5 == 0;
                u[s].rotate(360 / o * s);
                u[s].randomX = 6 + Math.random() * 14;
                u[s].randomY = 3 + Math.random() * 13;
                u[s].speedX = -.6 + Math.random() * 2;
                u[s].speedY = .5 + Math.random() * 2;
                u[s].speedR = .1 + Math.random() * .4;
                u[s].posY = 100 + Math.random() * $(window).height() * 3.5;
                u[s].offsetY = 0;
                s / 3 == parseInt(s / 3)
            }
        }

        function n(e) {
            a += ($(window).scrollTop() - a) * .5;
            for (s = 0; s < o; s++) {
                var t = Math.sin(e.time * u[s].speedX + s),
                    n = Math.cos(e.time * u[s].speedY + s);
                s * .5 == parseInt(s * .5) ? u[s].rotate(u[s].speedR) : u[s].rotate(-u[s].speedR);
                u[s].strokeColor = f.v;
                u[s].offsetY -= .03 * u[s].size;
                u[s].position.x = $(window).width() / o * s + t * u[s].randomX;
                u[s].position.y = u[s].posY + n * u[s].randomY - a + u[s].offsetY;
                u[s].position.y + $(window).scrollTop() < -100 && (u[s].offsetY = $(window).height() + $(window).scrollTop() + 100)
            }
        }

        function r(e) {
            l = Viper({
                object: f,
                property: "v",
                to: e,
                duration: 3e3
            }).start();
            return l
        }

        function i() {
            g + 1 >= c.length - 1 ? $("#pagi").find(".next").attr("href", "/w/" + c[0]) : $("#pagi").find(".next").attr("href", "/w/" + c[g + 1]);
            g - 1 < 0 ? $("#pagi").find(".next").attr("href", "/w/" + c[c.length - 1]) : $("#pagi").find(".next").attr("href", "/w/" + c[g - 1])
        }
        var s, o = 25,
            u = [],
            a = 0,
            f = {
                v: "#c3ccd0"
            }, l, c = ["wobio", "pazar", "istanbulite", "everyvibe", "herry", "indirimbulutu", "bavul", "exhaleenergy", "atasarim", "mono", "timid", "print"],
            h = ["#0D4699", "#FF532F", "#BFC0BE", "#96C2FF", "#FFB59A", "#2CB8FF", "#5990FF", "#55BD63", "#B4C0C3", "#857ADC", "#ffffff", "#cccccc"],
            p = "#ffffff",
            d = !0,
            v = 200,
            m = "easeOutExpo",
            g = 0;
        return {
            tween_to: function(e) {
                r(e);
                f.v = e
            },
            show_loading: function() {
                $("#loading").fadeIn()
            },
            hide_loading: function(e) {
                $("#loading").slideUp("slow", function() {
                    $(".container").css("display") == "none" && $(".container").fadeIn("slow");
                    e && e()
                })
            },
            not_found: function() {
                $(".not_found").html("Sorry, there is no such page, it may have been deleted, or something...<br><br><a href='/'>Back to home?</a>");
                $(".not_found").fadeIn()
            },
            hello_world: function() {
                var e = document.getElementById("helloworld");
                setTimeout(function() {
                    Viper({
                        object: e,
                        property: e.innerText ? "innerText" : "textContent",
                        from: "",
                        duration: 1e3,
                        finish: function() {
                            setTimeout(function() {
                                Viper({
                                    object: e,
                                    property: e.innerText ? "innerText" : "textContent",
                                    from: "Hello, thanks for visiting, have a nice day!",
                                    duration: 1e3,
                                    to: ""
                                }).start()
                            }, 6e3)
                        },
                        to: "Hello, thanks for visiting, have a nice day!"
                    }).start()
                }, 200)
            },
            clear_page: function(e) {
                $("#content").html("");
                e()
            },
            load_main: function() {
                app.show_loading();
                app.clear_page(function() {
                    app.hide_loading(function() {
                        app.tween_to("#c3ccd0");
                        $("#pagi").fadeOut();
                        $("#nav li").removeClass("active");
                        $("#nav li").eq(0).addClass("active")
                    })
                })
            },
            load_page: function(e) {
                var t = "",
                    n = "#ffffff",
                    r = !1;
                g = c.indexOf(e.toLowerCase());
                g == -1 && (g = 0);
                if (e == "info" || e == "resume") {
                    t = _url + "/" + e;
                    r = !0;
                    n = "#ffffff"
                } else {
                    t = _url + "w/" + e;
                    n = h[g]
                }
                $("body, html").animate({
                    scrollTop: 0
                }, 400, function() {
                    app.show_loading();
                    $("#thumbs").css({
                        display: "none"
                    });
                    $.ajax({
                        url: t,
                        context: document.body
                    }).done(function(e) {
                        i();
                        app.clear_page(function() {
                            var t = $(e).find("#content");
                            app.hide_loading(function() {
                                $("#nav li").removeClass("active");
                                if (r) {
                                    $("#nav li").eq(1).addClass("active");
                                    $("#pagi").fadeOut()
                                } else {
                                    $("#nav li").eq(0).addClass("active");
                                    $("#pagi").fadeIn()
                                }
                                t.css("display", "none");
                                $("#content").html(t);
                                _V_.autoSetup();
                                app.tween_to(n);
                                t.slideDown(1e3, function() {
                                    $("#thumbs").fadeIn("fast")
                                })
                            })
                        })
                    })
                })
            },
            init: function(n) {
                e();
                paper.setup("canvas");
                t();
                view.onFrame = function(e) {
                    app.draw(e)
                }
            },
            draw: function(e) {
                n(e)
            }
        }
    }();
_Path.map("").to(function() {
    app.load_main()
}).enter(before);
$(document).ready(function() {
    app.init()
})
