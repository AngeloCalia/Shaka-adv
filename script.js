
//definisco variabile per il video
var videoElement;
//Definire una variabile per verificare se ci sono annunci caricati e impostarla inizialmente su false
var adsLoaded = false;
//definisco variabile per il contenitore degli ad
var adContainer;
//definisco oggetto per la visualizzazione degli ad
var adDisplayContainer;
//definisco oggetto per il caricamento degli ad
var adsLoader;
//definisco oggetto per la gestione degli ad
var adsManager;



//Funzione che permette di collegare un evento al clic del pulsante play che attiva 
//la riproduzione dell'elemento video.
window.addEventListener('load', function (event) {
    videoElement = document.getElementById('video-element');

    initializeIMA();
    videoElement.addEventListener('play', function (event) {
        loadAds(event);
    });

    var playButton = document.getElementById('play-button');
    playButton.addEventListener('click', function (event) {
        videoElement.play();
    });
});

//inizializzazione IMA SDK
//funzione che viene eseguita quando la pagina viene caricata
function initializeIMA() {
    console.log("Inizializzare IMA");
    //prendo il div dell ad-container
    adContainer = document.getElementById('ad-container');
    //l'oggetto adDisplayContainer serve per mostrare l'ad
    adDisplayContainer = new google.ima.AdDisplayContainer(adContainer, videoElement);
    //l'istanza ima.AdsLoader serve per richiedere un insieme di annunci
    //prende in ingresso un oggetto AdDisplayContainer e può essere utilizzata 
    //per elaborare oggetti ima.AdsRequest associati a un URL di tag pubblicitario specificato.
    adsLoader = new google.ima.AdsLoader(adDisplayContainer);


    //Quando gli annunci vengono caricati correttamente, ima.AdsLoader emette un evento ADS_MANAGER_LOADED.
    adsLoader.addEventListener(
        google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
        onAdsManagerLoaded,
        false);
    
    //In questo modo Comunico all'AdsLoader la fine del video
    videoElement.addEventListener('ended', function () {
        adsLoader.contentComplete();
    });

    //ads richiesta e associo l'url
    var adsRequest = new google.ima.AdsRequest();
    adsRequest.adTagUrl =
    'https://pubads.g.doubleclick.net/gampad/ads?' +
     'iu=/21775744923/external/single_ad_samples&sz=640x480&' +
    'cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&' +
     'gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=';



    //Passo la richiesta all'adsLoader per richiedere gli annunci
    adsLoader.requestAds(adsRequest);

    //Analizzo l'evento passato alla callback per inizializzare l'oggetto AdsManager.
    //L'AdsManager carica i singoli annunci come definito dalla risposta all'URL del tag dell'annuncio.
    function onAdsManagerLoaded(adsManagerLoadedEvent) {
        //Istanzio l'AdsManager dalla risposta di adsLoader e passo l'elemento video
        adsManager = adsManagerLoadedEvent.getAdsManager(
            videoElement);
    }
}

function loadAds(event) {
    //Se gli annunci sono già stati caricati questa funzione non sarà eseguita
    if (adsLoaded) {
        return;
    }
    adsLoaded = true;

    //Impedire l'attivazione della riproduzione immediata quando gli annunci sono in caricamento
    event.preventDefault();

    console.log("loading ads");

    //Inizializzare il contenitore
    videoElement.load();
    adDisplayContainer.initialize();

    var width = videoElement.clientWidth;
    var height = videoElement.clientHeight;
    adsManager.init(width, height, google.ima.ViewMode.NORMAL);
    adsManager.start();
    // try {
    //     adsManager.init(width, height, google.ima.ViewMode.NORMAL);
    //     adsManager.start();
    // } catch (adError) {
    //     // Play the video without ads, if an error occurs
    //     console.log("AdsManager could not be started");
    //     videoElement.play();
    // }
}

