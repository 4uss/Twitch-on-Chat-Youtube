//NIE TYKAĆ toy.js 229
chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
      // read changeInfo data and do something with it
      // like send the new url to contentscripts.js
      if (changeInfo.url) {
        chrome.tabs.sendMessage( tabId, {
          message: 'hello!',
          url: changeInfo.url
        })
      }
    }
  );
// KONIEC

var socket = io.connect('https://mighty-bayou-11784.herokuapp.com/');
// 👇 Liczba kanałów online
var amountofchannels = 0;
//Localstorage
if(!localStorage.getItem('status-settings')){ localStorage.setItem('status-settings', true)};
if(!localStorage.getItem('audio-settings')){ localStorage.setItem('audio-settings', false)};
if(!localStorage.getItem('audio-url')){ localStorage.setItem('audio-url', '{"name":"Domyślny","url":"https://xayooindustries.us/alarms/default.mp3"}')};
if(!localStorage.getItem('audio-range')){ localStorage.setItem('audio-range', '0.50')};

socket.on('xd', function(data) {
    logging('countChannels', 'Initializing function');
    var temp = 0;

    //console.log(`When: ${Date.now()}`);

    var a = JSON.parse(data.streams);

    a.follows.map((item, i) => goha(item.STATUS));

    function goha(s){
        if(s === 1){
            temp++;
        }
        amountofchannels = temp;
        onlineBox();
    }
});
    setInterval(() => {
        socket.emit('wedaj');
    }, 60 * 1000);

    socket.on('XI_NOT_POLAND', function(data) {
        localStorage.setItem('status-settings', false)
    });
    socket.on('XI_Alert', function(data) {

        // 👇 to odpowiada za wyłączenie dodatku jak coś 
        if(localStorage.getItem('status-settings') === 'false') return;
        
        if(data.platform === 'YouTube' && localStorage.getItem(`mute-${data.channel_id}`) === 'true') return alercik(data.title, data.thumbnail, data.stream, 'YouTube', data.ytchannelID);

        if(localStorage.getItem(`mute-${data.channel_id}`) === 'true') return alercik(data.title, data.thumbnail, data.stream);
        
    });

    // tutaj wyłapuje powiadomienia
    // jeśli ktoś wyśle z panelu
    socket.on('serviceMessage', function(data) {
        var options = {body: data.message,icon: 'https://i.imgur.com/IMY8i6I.png',dir: "ltr",image: 'https://static.4uss.cyou/project_x/thumbnail/matixoxoo.png'};
        if (Notification.permission === "granted") {
            var notification = new Notification(`${data.author} 🔒`, options);
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function(permission) {
                if (permission === "granted") {
                    var notification = new Notification(`${data.author} 🔒 `, options);
                }
            });
        }
    });

    // tworzenie powiadomienia
    // z url po kliknięciu
function alercik(title, thumbnail, stream, platform, ytchannelID){
    var options = {body: title,icon: 'https://cdn.beyondlabs.pl/XI/XI-Chat.png',dir: "ltr",image: thumbnail};
    if (Notification.permission === "granted") {
        var notification = new Notification(`${stream} odpalił stream VisLaud`, options);
        notification.onclick = function(event) {
            event.preventDefault();
            if(platform === 'YouTube'){
                window.open(`https://youtube.com/channel/${ytchannelID}/live`, '_blank');
            }else{
                window.open(`https://www.twitch.tv/${stream}`, '_blank');
            }
          }
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function(permission) {
            if (permission === "granted") {
                var notification = new Notification(`${stream} odpalił stream VisLaud`, options);
                notification.onclick = function(event) {
                    event.preventDefault();
                    if(platform === 'YouTube'){
                        window.open(`https://youtube.com/channel/${ytchannelID}/live`, '_blank');
                    }else{
                        window.open(`https://www.twitch.tv/${stream}`, '_blank');
                    }
                  }
            }
        });
    } 
    if(localStorage.getItem(`audio-settings`) === 'true'){
        document.getElementById("radioPlay").volume = localStorage.getItem(`audio-range`);

        document.querySelector('#radioPlay').src = JSON.parse(localStorage.getItem(`audio-url`)).url;
        document.getElementById("radioPlay").play();
    }
}

// tworzenie kwadrata z liczbą
// osób nadających na żywo
function onlineBox(){
    if(amountofchannels === 0){
        chrome.browserAction.setBadgeBackgroundColor({ color: "#b30b2f" })
        chrome.browserAction.setBadgeText({ text: "0" })
    }else{
        chrome.browserAction.setBadgeBackgroundColor({ color: "#b5a300" })
        chrome.browserAction.setBadgeText({ text: `${amountofchannels}` })
    }

}

// Obsługiwane Kanały
if(!localStorage.getItem('mute-xayoo')){ localStorage.setItem('mute-xayoo', true)};
if(!localStorage.getItem('mute-suchar')){ localStorage.setItem('mute-suchar', true)};
if(!localStorage.getItem('mute-japczan')){ localStorage.setItem('mute-japczan', true)};
if(!localStorage.getItem('mute-popo')){ localStorage.setItem('mute-popo', true)};
if(!localStorage.getItem('mute-dejvid')){ localStorage.setItem('mute-dejvid', true)};
if(!localStorage.getItem('mute-lukisteve')){ localStorage.setItem('mute-lukisteve', true)};
if(!localStorage.getItem('mute-holak')){ localStorage.setItem('mute-holak', true)};
if(!localStorage.getItem('mute-aki')){ localStorage.setItem('mute-aki', true)};
if(!localStorage.getItem('mute-vysotzky')){ localStorage.setItem('mute-vysotzky', true)};
if(!localStorage.getItem('mute-mlodziutki7')){ localStorage.setItem('mute-mlodziutki7', true)};
if(!localStorage.getItem('mute-dejvid_tibijski_zadymiarz')){ localStorage.setItem('mute-dejvid_tibijski_zadymiarz', true)};



function logging(w, m){
    console.log(`%cBeyondLabs [%c${w}%c]:%c ${m}`, 'color:#3947bd; font-weight:bold', '', 'color:#3947bd; font-weight:bold', '')
}