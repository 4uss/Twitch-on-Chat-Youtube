let BLchatExist = false;

function beyondLabs(){
    /*!
     * BetterBrime x Twitch on Chat Youtube
     * https://betterbri.me/
     * 
     * BeyondLabs
     * https://beyondlabs.pl/
     */
    
    setInterval(() => {
        const target = document.querySelector('#item-offset #items.style-scope.yt-live-chat-item-list-renderer');
    
        if (target) {
            if (!BLchatExist || !target.hasAttribute('data-maked-observer')) {
                console.log("%c0", `
                line-height: 105px;
                background-image: url("https://cdn.betterbri.me/betterbrime_full_white.png");
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                background-color: #141414;
                border-radius: 15px;
                margin-left: calc((50% - 150px) - 1ch);
                padding-left: 150px;
                color: transparent;
                padding-right: 150px;
                `);
    
                makeObserver(target)
                BLchatExist = true;
                
                target.setAttribute('data-maked-observer', '1')
    
                document.querySelector('yt-live-chat-header-renderer #primary-content').innerHTML = 'Czat';
            }
        } else {
            //logging('chat', "Could not find chat element.")
            BLchatExist = false
        }
    }, 1000)
    
    function makeObserver(target) {
        console.log('Obserwuje chat')
        const config = {
            childList: true
        }
        const callback = function(mutationsList, observer) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(node => {
    
                        /*Array.from(node.querySelectorAll(".message span[class='m__username']")).forEach(img => {
                            if(img.hasAttribute('bb-antispam')) return;
    
                            img.setAttribute('bb-antispam', 1)
    
                            for (var i = 0; i < badgeList.length; i++) {
                                img.innerHTML = img.innerHTML.replace(new RegExp(badgeList[i].nickname + '( |$)', 'g'), `
                                <span class="bb__badge" data-badge="${badgeList[i].app_metadata.badge_name}"></span> ${badgeList[i].nickname}`);
                            }
                        })*/
                        
                        Array.from(node.querySelectorAll("div[class='style-scope yt-live-chat-item-list-renderer'] #content.style-scope.yt-live-chat-text-message-renderer yt-live-chat-author-chip")).forEach(img => {
                            if(img.hasAttribute('bb-antispam')) return;
    
                            img.setAttribute('bb-antispam', 1)
    
                            if(img.querySelector('#author-name').innerText === 'to nie holak'){
                                img.innerHTML = `
    
                                <span id="chat-badges" class="style-scope yt-live-chat-author-chip" bb-type="badge" style="margin: 0 .3rem 0 0;">
                                    <img src="https://cdn.beyondlabs.pl/XI/XI-modified.png" class="style-scope yt-live-chat-author-badge-renderer" alt="Developer">
                                </span>
    
                                <span id="chat-badges" class="style-scope yt-live-chat-author-chip" bb-type="badge" style="margin: 0 .3rem 0 0;">
                                    <img src="${img.querySelector('#chat-badges').querySelector('img').src}" class="style-scope yt-live-chat-author-badge-renderer" alt="Wspierający">
                                </span>
        
                                <span id="chip-badges" class="style-scope yt-live-chat-author-chip" bb-type="verified" style="margin: 0 .3rem 0 0;">
                                    ${img.querySelector('#chip-badges').innerHTML}
                                </span>
        
                                <span id="author-name" dir="auto" class="moderator style-scope yt-live-chat-author-chip" style="${img.querySelector('#author-name').getAttribute("style")}">
                                    ${img.querySelector('#author-name').innerText}
                                </span>`;
                            }else if(img.querySelector('#chat-badges').querySelector('img')){
                                img.innerHTML = `
                                <span id="chat-badges" class="style-scope yt-live-chat-author-chip" bb-type="badge" style="margin: 0 .3rem 0 0;">
                                    <img src="${img.querySelector('#chat-badges').querySelector('img').src}" class="style-scope yt-live-chat-author-badge-renderer" alt="Wspierający">
                                </span>
        
                                <span id="chip-badges" class="style-scope yt-live-chat-author-chip" bb-type="verified" style="margin: 0 .3rem 0 0;">
                                    ${img.querySelector('#chip-badges').innerHTML}
                                </span>
        
                                <span id="author-name" dir="auto" class="moderator style-scope yt-live-chat-author-chip" style="${img.querySelector('#author-name').getAttribute("style")}">
                                    ${img.querySelector('#author-name').innerText}
                                </span>`;
                            }else{
                                img.innerHTML = `
                                <span id="chat-badges" class="style-scope yt-live-chat-author-chip" bb-type="badge">
                                    ${img.querySelector('#chat-badges').innerHTML}
                                </span>
        
                                <span id="chip-badges" class="style-scope yt-live-chat-author-chip" bb-type="verified">
                                    ${img.querySelector('#chip-badges').innerHTML}
                                </span>
        
                                <span id="author-name" dir="auto" class="moderator style-scope yt-live-chat-author-chip" style="${img.querySelector('#author-name').getAttribute("style")}">
                                    ${img.querySelector('#author-name').innerText}
                                </span>`;
                            }
                        })
    
                    })
                }
            }
        }
        const observer = new MutationObserver(callback)
        observer.observe(target, config)
    }
    }
beyondLabs()


function wtyczkaon(){
    /*
    setTimeout(czek, 2000);
     function czek(){
         var selection = document.querySelector('span.view-count.style-scope.ytd-video-view-count-renderer') !== null;
        if (selection) {
        document.querySelector("#page-manager").style.backgroundColor="#0E0E10";
        } else {
        document.querySelector("#page-manager").style.backgroundColor="#F9F9F9";
        }
    }
    */
    window.addEventListener('popstate', function (event) {
        console.log("ZMIANA")
    });
    var adjust = () => {
        $("#masthead-container").hide();
        $("#related").hide();
        $("html").css("overflow", "hidden");
        $("#page-manager").css("margin-top", "0px");

        $("#player-theater-container").css({
            "width": "calc(100% - 350px)",
            "height": "100vh",
            "max-height": "none"
        });
        window.dispatchEvent(new Event('resize'));
    }

    var tryChat = (attempts) => {
        if (attempts < 0) return;
        setTimeout(() => { 
            if ($("#chatframe").length) {

                adjust();

                $("#chatframe").css({
                    "height": "100vh",
                    "width": "350px",
                    "position": "absolute",
                    "right": "0px",
                    "top": "0px",
                    "border": "0",
                    "border-left": "1px solid #303032"
                });
                $("#input").css({
                    "margin-left": "-35px",
                    "margin-right": "-19px"
                });
                if ($("#columns > #primary").length) {
                    $("#chatframe").insertAfter("#columns > #primary");
                } else {
                    $("#chatframe").insertAfter("#primary:visible");
                }


            } else {
                tryChat(attempts - 1);
            }
        }, 25);
    }

    var trySecondary = (attempts) => {
        if (attempts < 0) return;
        setTimeout(() => { 
            if ($("#secondary").length) {
                $("#secondary")[0].style.cssText = "filter: none !important"; 
            } else {
                trySecondary(attempts - 1);
            }
        }, 25);
    }

    var tryButton = (attempts, ifFunc, thenFunc) => {
        if (attempts < 0) return;
        setTimeout(() => { 
            if ($("#chat").length) {
                if (ifFunc()) thenFunc();
            } else {
                if (!$(".ytp-size-button").length) attempts /= 2;
                tryButton(attempts - 1, ifFunc, thenFunc);
            }
        }, 25);
    }

    var inTheater = () => {
        if (!$("#chat").length) {
            return false;
        }
        if ($(".ytp-size-button:visible").attr("title")) {
            return ($(".ytp-size-button:visible").attr("title").toLowerCase().indexOf("default") >= 0)
        }
        if ($(".ytp-size-button.ytp-button").attr("title")) {
            return ($(".ytp-size-button.ytp-button").attr("title").toLowerCase().indexOf("default") >= 0)
        }

        return (
            $("#player-theater-container:visible").children().length > 0 && 
            $("#player-theater-container:visible").css("width") != $("#player-theater-container:visible").parent().css("width")
        );
    }

    var onTheater = () => {
        // Don't twitchmode if live stream says that chat is disabled
        /*if (document.querySelector("iframe#chatframe.style-scope.ytd-live-chat-frame").src=="about:blank") return;*/
        if ($("iframe#chatframe.style-scope.ytd-live-chat-frame").height() < 100 || $("#player-theater-container").height() > 100) return;

        document.documentElement.scrollTop = 0;
        adjust();
        tryChat(25);
        trySecondary(10);
    }

    var unTheater = () => {
        $("#masthead-container").show();
        $("#related").show();
        $("#primary").show();
        $("html").css("overflow", "inherit");
        $("#page-manager").css("margin-top", "");
        $("#player-theater-container").css({
            "width": "",
            "height": "",
            "max-height": "",
        });
        $("#chatframe").css({
            "height": "",
            "width": "",
            "position": "relative",
            "border": "0",
            "border": "1px solid #303032"
        });
        
        window.dispatchEvent(new Event('resize'));

        setTimeout(() => { 
            $("#secondary")[0].style.cssText = "filter: none !important"; 
            $("#chatframe").prependTo("#chat");
            $("ytd-live-chat-frame").prependTo("#secondary-inner");
        }, 25);

        if ($("ytd-live-chat-frame .ytd-toggle-button-renderer").text().toLowerCase().indexOf("show") > -1) {
            setTimeout(() => { $("ytd-live-chat-frame").attr("collapsed", true); }, 100);
        }
    }

    var doTheater = (reversal) => {
        if (!$("#chat").length) return;
        setTimeout(() => { $("#secondary")[0].style.cssText = "filter: none !important"; }, 25);

        var doIt = !inTheater();
        if (reversal) doIt = !doIt;

        if (doIt) {
            onTheater();
        } else {
            unTheater();
        }
    }

    var isFullScreen = () => {
        return $("#player-theater-container").css("width") == ((window.innerWidth+1)+"px");
    }

    var doFullScreen = () => {
        if (!$("#chat").length) return;
        if (isFullScreen() && inTheater()) {
            onTheater();
        } else {
            unTheater();
        }
    }

    // when refreshing, maintain theater mode
    tryButton(25, inTheater, onTheater);
    window.onpopstate = function(event) {
        unTheater();
        tryButton(25, inTheater, onTheater);
        document.documentElement.scrollTop = 0;
    };

    var bindBtn = () => {
        $(".ytp-size-button").bind("click", () => {
            doTheater();
        });
        $(".ytp-fullscreen-button").bind("click", () => {
            doFullScreen();
        });
    }

    setTimeout(bindBtn, 100); 

    // when entering a youtube link internally
    var secureLinks = () => {
        $("a").bind("click", () => { 
            setTimeout(() => { 
                bindBtn(); 
                tryButton(25, inTheater, onTheater);
                secureLinks();
            }, 200); 
        });
    }

    setTimeout(secureLinks, 100); 

    $(document).keydown(function(e){
        if (e.which == 70) { //f
            doFullScreen();
        }
        if (e.which == 84) { //t
            setTimeout(() => {
            
                if (isFullScreen() && !inTheater()) {
                    doTheater();
                } else {
                    doTheater(true);
                } 

            }, 5); 
        }
    });
    // symulacja clicka w unTheater()
    function clickButton() {
        if(document.querySelector("ytd-watch-flexy[theater] #player-theater-container.ytd-watch-flexy") !== null && $("iframe#chatframe.style-scope.ytd-live-chat-frame").height() > 100 && $("iframe#chatframe.style-scope.ytd-live-chat-frame").width() > 100){
            document.querySelector(".ytp-size-button.ytp-button").click();
        }else{
            clearInterval(intervalID);
        }
    }
    var intervalID = setInterval(clickButton, 500);
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          // listen for messages sent from background.js
          if (request.message === 'hello!') {
            browser.tabs.reload();
            function clickButtonn() {
                if(document.querySelector("ytd-watch-flexy[theater] #player-theater-container.ytd-watch-flexy") !== null && $("iframe#chatframe.style-scope.ytd-live-chat-frame").height() > 100 && $("iframe#chatframe.style-scope.ytd-live-chat-frame").width() > 100){
                    document.querySelector(".ytp-size-button.ytp-button").click();
                }else{
                    clearInterval(intervalIDD);
                }
            }
            var intervalIDD = setInterval(clickButtonn, 500);
          }
      });
    // koniec symulacji
    try{
        if (document.querySelector("div#message.style-scope.yt-live-chat-restricted-participation-renderer").innerHTML=="Tryb tylko dla subskrybentów"){
            /*
            document.getElementsByClassName("style-scope yt-live-chat-header-renderer")[0].innerText+="Czat";
            */
        }else{
            document.querySelector("div#input-panel.style-scope.yt-live-chat-renderer.iron-selected").style.marginTop = "-18px";
        }
    }
    catch{
        document.querySelector("div#input-panel.style-scope.yt-live-chat-renderer.iron-selected").style.marginTop = "-18px";
    }
    document.querySelector("div#input.style-scope.yt-live-chat-text-input-field-renderer").tabIndex="1";
    /*
    document.getElementsByClassName("style-scope yt-live-chat-header-renderer")[0].innerText+="Czat";
    */
    document.getElementsByClassName("style-scope yt-live-chat-text-input-field-renderer")[0].innerHTML="Wyślij wiadomość";
    document.getElementsByClassName("style-scope yt-live-chat-text-input-field-renderer")[0].style.paddingLeft="20px";
    document.getElementsByClassName("style-scope yt-live-chat-text-input-field-renderer")[0].style.paddingTop="11.5px";
    document.getElementsByClassName("style-scope yt-live-chat-text-input-field-renderer")[0].style.paddingBottom="13px";
    document.getElementsByClassName("style-scope yt-live-chat-viewer-engagement-message-renderer")[0].style.display="none";
    document.getElementsByClassName("style-scope yt-live-chat-item-list-renderer animated")[0].style.backgroundColor="#18181B";
}
wtyczkaon();