var socket = io.connect('https://mighty-bayou-11784.herokuapp.com/');

const channelsList = [
        {
            "CHANNEL_ID": "xayoo", 
            "TWITCH" : "xayoo_"
        }, 
        {
            "CHANNEL_ID": "suchar", 
            "TWITCH" : "mokrysuchar"
        }, 
        {
            "CHANNEL_ID": "japczan", 
            "TWITCH" : "japczan"
        }, 
        {
            "CHANNEL_ID": "popo", 
            "TWITCH" : "popo"
        }, 
        {
            "CHANNEL_ID": "dejvid", 
            "TWITCH" : "dejvid"
        }, 
        {
            "CHANNEL_ID": "lukisteve", 
            "TWITCH" : "lukisteve"
        }, 
        {
            "CHANNEL_ID": "holak", 
            "TWITCH" : "holak1337"
        }, 
        {
            "CHANNEL_ID": "aki", 
            "TWITCH" : "aki_997"
        }, 
        {
            "CHANNEL_ID": "vysotzky", 
            "TWITCH" : "vysotzky"
        }, 
        {
            "CHANNEL_ID": "ile_lat_ma_xayoo", 
            "TWITCH" : "ile_lat_ma_xayoo"
        }
    ];
socket.emit('wedaj');

socket.on('xd', function(data) {
    JSON.parse(data.streams).follows.map((item, i) => sortChannels(item));
});
function sortChannels(data){
    console.log(data)
    if(data.STATUS === 1) return document.querySelector(`#${data.CHANNEL_ID}`).classList.add('bb__im__live');
}
channelsList.map((item, i) => checkChannelsStatus(item))

fetch('https://api.4uss.cyou/alarms.php')
  .then(response => response.json())
  .then(data => data.map((item, i) => api(item)));

function api(data) {
    var x = document.querySelector('.bb__select');
    var option = document.createElement("option");
    option.text = data.name;
    option.value = JSON.stringify(data);
    x.add(option);
}
function apiSelected(data) {
    var x = document.querySelector('.bb__select');
    var option = document.createElement("option");
    option.text = JSON.parse(data).name+' - Wybrany';
    option.selected = true;
    option.disabled = true;
    option.value = data;
    x.add(option);
}
document.querySelector('.bb__select').addEventListener('input', (event) => {
    document.querySelector('.bb__current__alarm').innerText = JSON.parse(event.target.value).name
    localStorage.setItem('audio-url', event.target.value);
});
document.querySelector('.bb__range').addEventListener('change', (event) => {
    localStorage.setItem('audio-range', event.target.value);
});
apiSelected(localStorage.getItem(`audio-url`))
document.querySelector('.bb__current__alarm').innerText = JSON.parse(localStorage.getItem(`audio-url`)).name;
if (localStorage.getItem(`status-settings`)) {
    if(localStorage.getItem(`status-settings`) === "true"){
        document.querySelector(`.alerts .bb__switch span[bb-type="button__off"]`).className = "bb__buton";
        document.querySelector(`.alerts .bb__switch span[bb-type="button__on"]`).className = "bb__buton_active";
    }else{
        document.querySelector(`.alerts .bb__switch span[bb-type="button__off"]`).className = "bb__buton_active";
        document.querySelector(`.alerts .bb__switch span[bb-type="button__on"]`).className = "bb__buton";
    }
}
if (localStorage.getItem(`audio-settings`)) {
    if(localStorage.getItem(`audio-settings`) === "true"){
        document.querySelector(`.alerts__audio .bb__switch span[bb-type="button__off"]`).className = "bb__buton";
        document.querySelector(`.alerts__audio .bb__switch span[bb-type="button__on"]`).className = "bb__buton_active";
    }else{
        document.querySelector(`.alerts__audio .bb__switch span[bb-type="button__off"]`).className = "bb__buton_active";
        document.querySelector(`.alerts__audio .bb__switch span[bb-type="button__on"]`).className = "bb__buton";
    }
}

function checkChannelsStatus(data){
    var buttonOff = document.querySelector(`#${data.CHANNEL_ID} .bb__switch span[bb-type="button__off"]`);
    var buttonOn = document.querySelector(`#${data.CHANNEL_ID} .bb__switch span[bb-type="button__on"]`);
    if (localStorage.getItem(`mute-${data.CHANNEL_ID}`)) {
        if(localStorage.getItem(`mute-${data.CHANNEL_ID}`) === "true"){
            buttonOff.className = "bb__buton";
            buttonOn.className = "bb__buton_active";
        }else{
            buttonOff.className = "bb__buton_active";
            buttonOn.className = "bb__buton";
        }
    }
}

document.querySelector('#xayoo .bb__switch span[bb-type="button__off"]').addEventListener("click", function() {
    localStorage.setItem('mute-xayoo', false)
    document.querySelector(`#xayoo .bb__switch span[bb-type="button__off"]`).className = "bb__buton_active";
    document.querySelector(`#xayoo .bb__switch span[bb-type="button__on"]`).className = "bb__buton";
});
document.querySelector('#xayoo .bb__switch span[bb-type="button__on"]').addEventListener("click", function() {
    localStorage.setItem('mute-xayoo', true)
    document.querySelector(`#xayoo .bb__switch span[bb-type="button__on"]`).className = "bb__buton_active";
    document.querySelector(`#xayoo .bb__switch span[bb-type="button__off"]`).className = "bb__buton";
});

document.querySelector('#suchar .bb__switch span[bb-type="button__off"]').addEventListener("click", function() {
    localStorage.setItem('mute-suchar', false)
    document.querySelector(`#suchar .bb__switch span[bb-type="button__off"]`).className = "bb__buton_active";
    document.querySelector(`#suchar .bb__switch span[bb-type="button__on"]`).className = "bb__buton";
});
document.querySelector('#suchar .bb__switch span[bb-type="button__on"]').addEventListener("click", function() {
    localStorage.setItem('mute-suchar', true)
    document.querySelector(`#suchar .bb__switch span[bb-type="button__on"]`).className = "bb__buton_active";
    document.querySelector(`#suchar .bb__switch span[bb-type="button__off"]`).className = "bb__buton";
});

document.querySelector('#japczan .bb__switch span[bb-type="button__off"]').addEventListener("click", function() {
    localStorage.setItem('mute-japczan', false)
    document.querySelector(`#japczan .bb__switch span[bb-type="button__off"]`).className = "bb__buton_active";
    document.querySelector(`#japczan .bb__switch span[bb-type="button__on"]`).className = "bb__buton";
});
document.querySelector('#japczan .bb__switch span[bb-type="button__on"]').addEventListener("click", function() {
    localStorage.setItem('mute-japczan', true)
    document.querySelector(`#japczan .bb__switch span[bb-type="button__on"]`).className = "bb__buton_active";
    document.querySelector(`#japczan .bb__switch span[bb-type="button__off"]`).className = "bb__buton";
});

document.querySelector('#popo .bb__switch span[bb-type="button__off"]').addEventListener("click", function() {
    localStorage.setItem('mute-popo', false)
    document.querySelector(`#popo .bb__switch span[bb-type="button__off"]`).className = "bb__buton_active";
    document.querySelector(`#popo .bb__switch span[bb-type="button__on"]`).className = "bb__buton";
});
document.querySelector('#popo .bb__switch span[bb-type="button__on"]').addEventListener("click", function() {
    localStorage.setItem('mute-popo', true)
    document.querySelector(`#popo .bb__switch span[bb-type="button__on"]`).className = "bb__buton_active";
    document.querySelector(`#popo .bb__switch span[bb-type="button__off"]`).className = "bb__buton";
});

document.querySelector('#dejvid .bb__switch span[bb-type="button__off"]').addEventListener("click", function() {
    localStorage.setItem('mute-dejvid', false)
    document.querySelector(`#dejvid .bb__switch span[bb-type="button__off"]`).className = "bb__buton_active";
    document.querySelector(`#dejvid .bb__switch span[bb-type="button__on"]`).className = "bb__buton";
});
document.querySelector('#dejvid .bb__switch span[bb-type="button__on"]').addEventListener("click", function() {
    localStorage.setItem('mute-dejvid', true)
    document.querySelector(`#dejvid .bb__switch span[bb-type="button__on"]`).className = "bb__buton_active";
    document.querySelector(`#dejvid .bb__switch span[bb-type="button__off"]`).className = "bb__buton";
});

document.querySelector('#lukisteve .bb__switch span[bb-type="button__off"]').addEventListener("click", function() {
    localStorage.setItem('mute-lukisteve', false)
    document.querySelector(`#lukisteve .bb__switch span[bb-type="button__off"]`).className = "bb__buton_active";
    document.querySelector(`#lukisteve .bb__switch span[bb-type="button__on"]`).className = "bb__buton";
});
document.querySelector('#lukisteve .bb__switch span[bb-type="button__on"]').addEventListener("click", function() {
    localStorage.setItem('mute-lukisteve', true)
    document.querySelector(`#lukisteve .bb__switch span[bb-type="button__on"]`).className = "bb__buton_active";
    document.querySelector(`#lukisteve .bb__switch span[bb-type="button__off"]`).className = "bb__buton";
});

document.querySelector('#holak .bb__switch span[bb-type="button__off"]').addEventListener("click", function() {
    localStorage.setItem('mute-holak', false)
    document.querySelector(`#holak .bb__switch span[bb-type="button__off"]`).className = "bb__buton_active";
    document.querySelector(`#holak .bb__switch span[bb-type="button__on"]`).className = "bb__buton";
});
document.querySelector('#holak .bb__switch span[bb-type="button__on"]').addEventListener("click", function() {
    localStorage.setItem('mute-holak', true)
    document.querySelector(`#holak .bb__switch span[bb-type="button__on"]`).className = "bb__buton_active";
    document.querySelector(`#holak .bb__switch span[bb-type="button__off"]`).className = "bb__buton";
});

document.querySelector('#aki .bb__switch span[bb-type="button__off"]').addEventListener("click", function() {
    localStorage.setItem('mute-aki', false)
    document.querySelector(`#aki .bb__switch span[bb-type="button__off"]`).className = "bb__buton_active";
    document.querySelector(`#aki .bb__switch span[bb-type="button__on"]`).className = "bb__buton";
});
document.querySelector('#aki .bb__switch span[bb-type="button__on"]').addEventListener("click", function() {
    localStorage.setItem('mute-aki', true)
    document.querySelector(`#aki .bb__switch span[bb-type="button__on"]`).className = "bb__buton_active";
    document.querySelector(`#aki .bb__switch span[bb-type="button__off"]`).className = "bb__buton";
});

document.querySelector('#vysotzky .bb__switch span[bb-type="button__off"]').addEventListener("click", function() {
    localStorage.setItem('mute-vysotzky', false)
    document.querySelector(`#vysotzky .bb__switch span[bb-type="button__off"]`).className = "bb__buton_active";
    document.querySelector(`#vysotzky .bb__switch span[bb-type="button__on"]`).className = "bb__buton";
});
document.querySelector('#vysotzky .bb__switch span[bb-type="button__on"]').addEventListener("click", function() {
    localStorage.setItem('mute-vysotzky', true)
    document.querySelector(`#vysotzky .bb__switch span[bb-type="button__on"]`).className = "bb__buton_active";
    document.querySelector(`#vysotzky .bb__switch span[bb-type="button__off"]`).className = "bb__buton";
});

document.querySelector('#ile_lat_ma_xayoo .bb__switch span[bb-type="button__off"]').addEventListener("click", function() {
    localStorage.setItem('mute-ile_lat_ma_xayoo', false)
    document.querySelector(`#ile_lat_ma_xayoo .bb__switch span[bb-type="button__off"]`).className = "bb__buton_active";
    document.querySelector(`#ile_lat_ma_xayoo .bb__switch span[bb-type="button__on"]`).className = "bb__buton";
});
document.querySelector('#ile_lat_ma_xayoo .bb__switch span[bb-type="button__on"]').addEventListener("click", function() {
    localStorage.setItem('mute-ile_lat_ma_xayoo', true)
    document.querySelector(`#ile_lat_ma_xayoo .bb__switch span[bb-type="button__on"]`).className = "bb__buton_active";
    document.querySelector(`#ile_lat_ma_xayoo .bb__switch span[bb-type="button__off"]`).className = "bb__buton";
});

document.querySelector('.alerts .bb__switch span[bb-type="button__off"]').addEventListener("click", function() {
    localStorage.setItem('status-settings', false)
    document.querySelector(`.alerts .bb__switch span[bb-type="button__off"]`).className = "bb__buton_active";
    document.querySelector(`.alerts .bb__switch span[bb-type="button__on"]`).className = "bb__buton";
});
document.querySelector('.alerts .bb__switch span[bb-type="button__on"]').addEventListener("click", function() {
    localStorage.setItem('status-settings', true)
    document.querySelector(`.alerts .bb__switch span[bb-type="button__on"]`).className = "bb__buton_active";
    document.querySelector(`.alerts .bb__switch span[bb-type="button__off"]`).className = "bb__buton";
});

document.querySelector('.alerts__audio .bb__switch span[bb-type="button__off"]').addEventListener("click", function() {
    localStorage.setItem('audio-settings', false)
    document.querySelector(`.alerts__audio .bb__switch span[bb-type="button__off"]`).className = "bb__buton_active";
    document.querySelector(`.alerts__audio .bb__switch span[bb-type="button__on"]`).className = "bb__buton";
});
document.querySelector('.alerts__audio .bb__switch span[bb-type="button__on"]').addEventListener("click", function() {
    localStorage.setItem('audio-settings', true)
    document.querySelector(`.alerts__audio .bb__switch span[bb-type="button__on"]`).className = "bb__buton_active";
    document.querySelector(`.alerts__audio .bb__switch span[bb-type="button__off"]`).className = "bb__buton";
});