wtyczkaoon();
function wtyczkaoon() {
    let s = {},
        n = {},
        l = {},
        i = {},
        o = { changeColor: !0, showProfilePic: !1, showTimestamp: !1, showCustomemote: !0 },
        t = {
            updateSettingOptions(e) {
                var t;
                if (
                    ((i.changeColor = (e && null != e.changeColor ? e : o).changeColor),
                    (i.showProfilePic = (e && null != e.showProfilePic ? e : o).showProfilePic),
                    (i.showTimestamp = (e && null != e.showTimestamp ? e : o).showTimestamp),
                    (i.showCustomemote = (e && null != e.showCustomemote ? e : o).showCustomemote),
                    (i.keywords = new Set()),
                    e && e.keywords && 0 < e.keywords.length)
                )
                    for (t of e.keywords.split(",")) i.keywords.add(t.toLowerCase());
            },
        },
        r = {
            fetch(...e) {
                return new Promise((o, a) => {
                    fetch(...e)
                        .then((t) => {
                            t.json().then((e) => {
                                (200 === t.status ? o : a)(e);
                            });
                        })
                        .catch((e) => console.log("fetch " + e));
                }).catch((e) => console.log("NTHelper " + e));
            },
            querySelectorAsync(r, s = document, e = 100, n = 1e1) {
                return new Promise((t) => {
                    const o = Date.now() + n,
                        a = setInterval(() => {
                            var e = s.querySelector(r);
                            e || Date.now() > o ? (clearInterval(a), t(e)) : console.log("querySelectorAsync awaiting " + r);
                        }, e);
                });
            },
        },
        a = "Top chat",
        c = {
            defaultColors: ["#dd4f4f", "#6969d0", "#00ef00", "#fd5a59", "#07b961", "#92c52c", "#f07c28", "#07b961", "#d9a420", "#ff8553", "#62a5a7", "#369ffc", "#f568b1", "#b068f2", "#46ffaf", "#ffff00"],
            hashCod(t) {
                let o = 0;
                if (t) {
                    t = t.toLowerCase().trim();
                    for (let e = 0; e < t.length; e++) o = t.charCodeAt(e) + ((o << 5) - o);
                }
                return o;
            },
            getUserChatColor(e) {
                return this.defaultColors[Math.abs(this.hashCod(e) % this.defaultColors.length)];
            },
            initTarget(e, t) {
                if ((console.log("initializing target for yth-listener"), null !== t)) {
                    this.document = e;
                    const a = new MutationObserver((e) => {
                        for (var t of e) for (var o of t.addedNodes) this.handleMessage(o);
                    });
                    for (var o of this.document.querySelectorAll("yt-live-chat-text-message-renderer", e)) this.handleMessage(o);
                    a.observe(t, { attributes: !0, childList: !0, characterData: !0 });
                }
            },
            initHeader: async (e) => {
                console.log("initializing header for yth-listener");
                let t = await r.querySelectorAsync("#view-selector.yt-live-chat-header-renderer", e, 200, 4e4);
                null == t
                    ? console.error("sorry boo, somehow found header empty")
                    : "true" !== t.getAttribute("yth-listener") &&
                      (t.addEventListener("click", function () {
                          console.log("header change");
                          var e = t.querySelector("#label-text.yt-dropdown-menu");
                          !e || ((e = e.innerText) !== a && ((a = e), console.log("header change - reinit again"), c.init()));
                      }),
                      t.setAttribute("yth-listener", "true"));
            },
            init: async () => {
                var e,
                    t = "#items.yt-live-chat-item-list-renderer";
                let o = await r.querySelectorAsync(t);
                null === o
                    ? (e = await r.querySelectorAsync("#chatframe", this.document, 200, 4e4))
                        ? ((e = e.contentDocument), c.initHeader(e), (o = await r.querySelectorAsync(t, e)), null !== o && c.initTarget(e, o))
                        : console.log("chatFrame not found")
                    : (c.initHeader(document), c.initTarget(document, o));
            },
            replaceText(e) {
                var t;
                let o = [];
                for (t of e.split(" ")) {
                    var a,
                        r = t.toLowerCase();
                    n[r]
                        ? (t =
                              '<img class="emoji yt-formatted-string style-scope yt-live-chat-text-message-renderer" bb-type="emote" bb-data="BetterTTV" src="https://cdn.betterttv.net/emote/' +
                              n[r] +
                              '/1x" alt="' +
                              t +
                              '" title="' +
                              t +
                              '" />')
                        : s[r]
                        ? (t =
                              '<img class="emoji yt-formatted-string style-scope yt-live-chat-text-message-renderer" bb-type="emote" bb-data="Twitch" src="https://static-cdn.jtvnw.net/emoticons/v1/' +
                              s[r] +
                              '/1.0" alt="' +
                              t +
                              '" title="' +
                              t +
                              '" />')
                        : l[r]
                        ? ((a = l[r]),
                          (t =
                              '<img class="emoji yt-formatted-string style-scope yt-live-chat-text-message-renderer" bb-type="emote" bb-data="Custom" src="https://cdn.jsdelivr.net/gh/Kazeciorek/TOY/emotes/' +
                              a.cat +
                              "/" +
                              a.id +
                              "." +
                              a.ext +
                              '" alt="' +
                              t +
                              '" title="' +
                              t +
                              '" />'))
                        : i.keywords.has(r) && (t = "<mark>" + t + "</mark>"),
                        o.push(t);
                }
                return o.join(" ");
            },
            handleMessage(t) {
                if (!i.showProfilePic) {
                    let e = t.querySelector("#author-photo");
                    e && (e.style.display = "none");
                }
                if (!i.showTimestamp) {
                    let e = t.querySelector("#timestamp");
                    e && (e.style.display = "none");
                }
                if (i.changeColor) {
                    let e = t.querySelector("#author-name");
                    e && (e.style.color = c.getUserChatColor(e.innerText));
                }
                if (i.showCustomemote) {
                    let e = t.querySelector("#message");
                    var o;
                    e &&
                        e.innerHTML &&
                        0 < e.innerHTML.length &&
                        ((o = e.innerHTML),
                        (t = c.replaceText(o)) &&
                            0 < t.length &&
                            t !== o &&
                            ((o = document.createElement("span")).classList.add("style-scope"), o.classList.add("yt-live-chat-text-message-renderer"), o.setAttribute('bb-type', 'emoteSpan'), (o.innerHTML = t ), (e.style.display = "none"), e.parentNode.append(o)));
                }
            },
        };
    const h = {
            lastUpdate: 0,
            fetchEmotes(e) {
                return new Promise((a) => {
                    (l = e.customEmotes || {}),
                        void 0 === l || 0 == l.length || 72e5 < Date.now() - h.lastUpdate
                            ? r
                                  .fetch("https://cdn.jsdelivr.net/gh/Kazeciorek/TOY/autorskie-szerokie.json")
                                  .then((e) => {
                                      if (((h.lastUpdate = Date.now()), e && e.emotes))
                                          for (var t of e.emotes) {
                                              var o = { id: t.id, ext: t.ext, cat: t.cat };
                                              l[t.code.toLowerCase()] = o;
                                          }
                                      chrome.storage.local.set({ customEmotes: l }, () => a());
                                  })
                                  .catch(a)
                            : a();
                });
            },
        },
        d = {
            lastUpdate: 0,
            fetchGlobalEmotes(e) {
                return new Promise((o) => {
                    (s = e.globalTwitchEmotes || {}),
                        void 0 === e.globalTwitchEmotes || null === e.globalTwitchEmotes || 6048e5 < Date.now() - d.lastUpdate
                            ? r
                                  .fetch("https://cdn.jsdelivr.net/gh/Kazeciorek/TOY/globaltwitchpogchamp.json")
                                  .then((e) => {
                                      d.lastUpdate = Date.now();
                                      for (var t of e.emotes) t.code.match(/^[a-zA-Z0-9]+$/) && (s[t.code.toLowerCase()] = t.id);
                                      chrome.storage.local.set({ globalTwitchEmotes: s }, () => o());
                                  })
                                  .catch(o)
                            : o();
                });
            },
        },
        m = {
            lastUpdate: 0,
            lastUpdateTopEmotes: 0,
            isBusy: !1,
            updateSettings() {
                console.log("Updated emoticons");
            },
            loaded() {
                chrome.storage.onChanged.addListener(async function (e, t) {
                    c.getStorageItems.then((e) => c.update(e)).catch(console.error("failed to update from storage"));
                });
            },
            fetchTopEmotes(o) {
                return new Promise((e) => {
                    var t = void 0 === n || 0 == n.length;
                    if ((t && (n = o.bttvEmotes || {}), t || 72e5 < Date.now() - m.lastUpdateTopEmotes))
                        return r
                            .fetch("https://cdn.jsdelivr.net/gh/Kazeciorek/TOY/bttvpogchampp.json")
                            .then((e) => {
                                for (var t of e) {
                                    let e = t.emote;
                                    n[e.code.toLowerCase()] = e.id;
                                }
                            })
                            .finally(() => {
                                (m.lastUpdateTopEmotes = Date.now()), chrome.storage.local.set({ bttvEmotes: n }, () => e());
                            });
                    e();
                });
            },
            fetchGlobalEmotes(t) {
                return new Promise((e) => {
                    if (((n = t.bttvEmotes || {}), void 0 === n || 0 == n.length || 6048e5 < Date.now() - m.lastUpdate))
                        return r
                            .fetch("https://api.betterttv.net/3/cached/emotes/global")
                            .then((e) => {
                                for (var t of e) n[t.code.toLowerCase()] = t.id;
                            })
                            .finally(() => {
                                (m.lastUpdate = Date.now()), chrome.storage.local.set({ bttvEmotes: n }, () => e());
                            });
                    e();
                });
            },
            getStorageItems() {
                return new Promise(function (t, o) {
                    chrome.storage.local.get((e) => {
                        chrome.runtime.lastError ? (console.error(chrome.runtime.lastError.message), o(chrome.runtime.lastError.message)) : t(e);
                    });
                });
            },
            update(t) {
                return new Promise((e) => {
                    d.fetchGlobalEmotes(t).finally(() => {
                        this.fetchGlobalEmotes(t).finally(() => {
                            this.fetchTopEmotes(t).finally(() => {
                                h.fetchEmotes(t).finally(() => {
                                    this.updateSettings(), e();
                                });
                            });
                        });
                    });
                });
            },
        };
    var e = async () => {
        var e = await m.getStorageItems();
        t.updateSettingOptions(e), await m.update(e), location.hostname.toLowerCase().includes("youtube.com") ? c.init() : console.log("Only supported on youtube currently");
    };
    "loading" == document.readyState ? document.addEventListener("DOMContentLoaded", e) : e();
}
