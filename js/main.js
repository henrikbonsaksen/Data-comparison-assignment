// diverse URL'er for datasettene
let beskrivelser = "http://wildboy.uib.no/~tpe056/folk/";
let befolkning_wildboy = "http://wildboy.uib.no/~tpe056/folk/104857.json";
let utdanning_wildboy = "http://wildboy.uib.no/~tpe056/folk/85432.json";
let sysselsatte_wildboy = "http://wildboy.uib.no/~tpe056/folk/100145.json";

// vise-og-skjule-knapp
function showBox(id) {
  var boxes = document.getElementsByClassName("infoBox");
  var box = document.getElementById(id);
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].classList.replace("show", "hidden");
  }

  if (box.classList.contains("show")) {
    box.classList.replace("show", "hidden");
  }

  else if (box.classList.contains !== "show") {
    box.classList.replace("hidden", "show");
  }
};

// HTTP call request
function performGetRequest(url, callback) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    // om readyState == 4 er det operasjonen utført
    if (request.readyState == 4 && request.status == 200) {
      callback(request.response);
    }
  }
  request.open("GET", url, true);
  request.send();
}

// konstruktoeren
function Befolkning(url) {
  this.url = url;
  this.kommuner = [];
  this.onload = null;

  // oppretting av arrays og en dictionary
  this.kommunenavn = [];
  this.kommunenummer = [];
  this.kommuneinfo = {} ;

  this.getNames = function() {
    return this.kommunenavn;
  }

  this.getIDs = function() {
    return this.kommunenummer;
  }

  this.getInfo = function(kommunenummer) {
    return this.kommuneinfo[kommunenummer];
  }

  this.getSyssel = function(kommunenummer) {
    return this.kommuneinfo[kommunenummer];
  }

  this.getUtdanning = function(kommunenummer) {
    return this.kommuneinfo[kommunenummer];
  }
  // parsing:
  this.load = function() {
    var self = this;
    performGetRequest(this.url, function(response) {
      var data = JSON.parse(response);
      for (var navn in data.elementer) {
        var kommuneData = data.elementer[navn];

        self.kommunenavn.push(navn);
        self.kommunenummer.push(kommuneData.kommunenummer);
        self.kommuneinfo[kommuneData.kommunenummer] = { population: kommuneData };
      };

      if (self.onload) {
        self.onload();
        // test for rekkefølge på datainnlasting
        console.log("Ready");
      }
    });
  }
};

// initialisering av objektene
var befolkning = new Befolkning(befolkning_wildboy);
var utdanning = new Befolkning(utdanning_wildboy);
var syssel = new Befolkning(sysselsatte_wildboy);

befolkning.onload = function() {
  populateOversiktView();
  console.log("befolkning_wildboy lastes")
}

utdanning.onload = function() {
  console.log("utdanning_wildboy lastes")
}

syssel.onload = function() {
  console.log("sysselsatte_wildboy lastes")
};
// sender en forespørsel hver om å laste ned datasettet
// og laster de ned
befolkning.load();
utdanning.load();
syssel.load();
