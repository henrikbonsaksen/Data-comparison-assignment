// hjelpefunksjon for utregning av prosentpoeng
var getProsentpoengEndring = function(nyVerdi, gammelVerdi) {
  return (nyVerdi - gammelVerdi) / gammelVerdi * 100;
}

// funksjon for henting av utvikling av sysselsetting
var hentSysselsettingUtvikling = function(kommunenummer) {
  var sysselsetting = syssel.getInfo(kommunenummer);
  var aarstall = Object.keys(sysselsetting.population.Kvinner);
  // oppretting av en variabel som skal brukes som utgangspunkt
  var foersteAar = aarstall[0];
  var utvikling = [
    {
      aar: foersteAar,
      menn: sysselsetting.population.Menn[foersteAar],
      kvinner: sysselsetting.population.Kvinner[foersteAar],
      oekningPstMenn: 0,
      oekningPstKvinner: 0
    }
  ];

  for (var i = 1; i < aarstall.length; i++) {
    var aar = aarstall[i];
    var fjoraar = aarstall[i - 1];

    var sysselsettingMenn = sysselsetting.population.Menn[aar];
    var sysselsettingKvinner = sysselsetting.population.Kvinner[aar];

    var sysselsettingMennFjoraar = sysselsetting.population.Menn[fjoraar];
    var sysselsettingKvinnerFjoraar = sysselsetting.population.Kvinner[fjoraar];
    // bruk av hjelpefunksjonen som er definert på toppen
    oekningPstMenn = getProsentpoengEndring(sysselsettingMenn, sysselsettingMennFjoraar);
    oekningPstKvinner = getProsentpoengEndring(sysselsettingKvinner, sysselsettingKvinnerFjoraar);
    // pushe data til arrayen utvikling
    utvikling.push({
      aar: aar,
      menn: sysselsettingMenn,
      kvinner: sysselsettingKvinner,
      oekningPstMenn: oekningPstMenn,
      oekningPstKvinner: oekningPstKvinner,
    });
  }
  // returnerer arrayen utvikling
  return utvikling;
}

// funksjon for å opprette sammenligne-tabellen
var opprettTabell = function(utvikling, sammenlignendeUtvikling, knr) {
  // henting av data fra objekt
  var kommunenavn = befolkning.getNames();
  var kommunenummer = befolkning.getIDs();

  // funksjonalitet for oppretting av tabellen
  var tabell = document.createElement('table');
  tabell.classList.add("flex");
  tabell.style.width = '100%';
  tabell.setAttribute('border', '1');
  var tabellHeader = document.createElement('thead');

  tabell.insertRow();
  tabell.insertRow();
  tabell.insertRow();

  var headercell1 = tabell.rows[0].insertCell();
  var headercell2 = tabell.rows[0].insertCell();

  // legger ved navn og kommunenr til tabellene de tilhører
  for (var x = 0; x < kommunenummer.length; x++){
    if (knr == kommunenummer[x]) {
      headercell1.innerHTML = kommunenavn[x];
      headercell2.innerHTML = "K.nr: " + kommunenummer[x];
    }
  }
  // for-løkke for å fylle tabellene med data
  for (var i = 0; i < utvikling.length; i++) {
    var aar = utvikling[i].aar;
    var aarCell = tabell.rows[1].insertCell();
    aarCell.innerHTML = aar;

    var mennCell = tabell.rows[1].insertCell();
    mennCell.innerHTML = "Menn: \n" + utvikling[i].menn;
    aarCell.appendChild(mennCell);

    var kvinnerCell = tabell.rows[1].insertCell();
    kvinnerCell.innerHTML = "Kvinner: \n" + utvikling[i].kvinner;
    aarCell.appendChild(kvinnerCell);

    var kvinnerHoyestOekning = utvikling[i].oekningPstKvinner > sammenlignendeUtvikling[i].oekningPstKvinner;
    var mennHoyestOekning = utvikling[i].oekningPstMenn > sammenlignendeUtvikling[i].oekningPstMenn;

    // tilegner klasse for høyeste økning i prosentpoeng
    if (kvinnerHoyestOekning) {
      kvinnerCell.classList.add('best-category')
    }
    if (mennHoyestOekning) {
      mennCell.classList.add('best-category');
    }
  }
  tabell.classList.add("sammenligning")
  return tabell;
}

// funksjon for å bruke resultat fra hjelpefunksjoner i opppretting av tabell
var visSysselsettingSammenligning = function(kommunenummer1, kommunenummer2) {
  var utviklingKommune1 = hentSysselsettingUtvikling(kommunenummer1);
  var utviklingKommune2 = hentSysselsettingUtvikling(kommunenummer2);

  var kommune1Tabell = opprettTabell(utviklingKommune1, utviklingKommune2, kommunenummer1);
  var kommune2Tabell = opprettTabell(utviklingKommune2, utviklingKommune1, kommunenummer2);

  var sammenligning = document.getElementById("Sammenligning");
  sammenligning.appendChild(kommune1Tabell);
  sammenligning.appendChild(kommune2Tabell);
}
