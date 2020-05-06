//søkefunksjonen for detaljer
var detaljer = function() {
  // henter elementer fra html
  var input = document.getElementById("detaljer").value;
  var detaljer = document.getElementsByClassName('detaljerTable')[0];
  // tilegner verdier fra objekt til variabler
  var kommunenavn = befolkning.getNames();
  var kommunenummer = befolkning.getIDs();
  var info = befolkning.kommuneinfo;
  var sysselsatte = syssel.kommuneinfo;
  var utd = utdanning.kommuneinfo;

  //for løkke som lager celler og rader i tabellen
  for (var i = 0; i < kommunenavn.length; i++) {
    // mulighet for søk av kommunenummer (og mulighet for søk på navn)
    if (kommunenavn[i] === input || kommunenummer[i] === input) {
      var row1 = detaljer.insertRow(0);
      var nameCell = row1.insertCell(0);
      var idCell = row1.insertCell(1);

      var row2 = detaljer.insertRow(1);
      var c1r2 = row2.insertCell(0);
      var c2r2 = row2.insertCell(1);
      var c3r2 = row2.insertCell(2);
      var c4r2 = row2.insertCell(3);

      var row3 = detaljer.insertRow(2);
      var c1r3 = row3.insertCell(0);
      var c2r3 = row3.insertCell(1);
      var c3r3 = row3.insertCell(2);
      var c4r3 = row3.insertCell(3);
      var c5r3 = row3.insertCell(4);
      var c6r3 = row3.insertCell(4);

      var row4 = detaljer.insertRow(3);
      var c1r4 = row4.insertCell(0);
      c1r4.innerHTML = "<h3>Historisk data: </h3>"

      var row6 = detaljer.insertRow(4);
      var row7 = detaljer.insertRow(5);
      var row8 = detaljer.insertRow(6);

      // kommunenavn & kommunenummer
      nameCell.innerHTML ="<h4>Kommune: </h4>" + kommunenavn[i];
      idCell.innerHTML = "<h4>Kommune.nr: </h4>" + kommunenummer[i];

      // BEFOLKNING
      c1r2.innerHTML = "<h4>Befolkning i 2018: </h4>" + (info[kommunenummer[i]].population.Menn[2018]
      + info[kommunenummer[i]].population.Kvinner[2018]);

      // SYSSELSATTE
      c2r2.innerHTML = "<h4>Sysselsatte i 2018: </h4>" + sysselsatte[kommunenummer[i]].population.Menn[2018]
      + "% av menn i arbeid og " + sysselsatte[kommunenummer[i]].population.Kvinner[2018]
      + "% av kvinner i arbeid.";

      // UTDANNING :
      // grunnskole
      c3r2.innerHTML = "<h4>Utdanning grunnskole: </h4>" + utd[kommunenummer[i]].population["01"].Menn[2017]
      + "% av menn og " + utd[kommunenummer[i]].population["01"].Kvinner[2017] +
      "% av kvinner er utdannet.";
      // VGS
      c4r2.innerHTML = "<h4>Utdanning VGS: </h4> " + utd[kommunenummer[i]].population["02a"].Menn[2017]
      + "% av menn og " + utd[kommunenummer[i]].population["02a"].Kvinner[2017] +
      "% av kvinner er utdannet.";
      // universitet / høyskole kort
      c1r3.innerHTML = "<h4>Utdanning UNI / høyskole kort: </h4>" + utd[kommunenummer[i]].population["03a"].Menn[2017]
      + "% av menn og " + utd[kommunenummer[i]].population["03a"].Kvinner[2017] +
      "% av kvinner.";
      // universitet / høyskole kort i antall
      c2r3.innerHTML = "<h4>Antall: </h4>" + ((utd[kommunenummer[i]].population["03a"].Menn[2017])/100 * info[kommunenummer[i]].population.Menn[2017]).toFixed(2)
      + " antall av menn og " + ((utd[kommunenummer[i]].population["03a"].Kvinner[2017])/100 * info[kommunenummer[i]].population.Kvinner[2017]).toFixed(2) +
      " antall av kvinner.";
      // universitet / høyskole lang
      c3r3.innerHTML = "<h4>Utdanning UNI / høyskole lang : </h4>" + utd[kommunenummer[i]].population["04a"].Menn[2017]
      + "% av menn og " + utd[kommunenummer[i]].population["04a"].Kvinner[2017] +
      "% av kvinner.";
      // universitet / høyskole lang i antall
      c4r3.innerHTML = "<h4>Antall: </h4>" + ((utd[kommunenummer[i]].population["04a"].Menn[2017])/100 * info[kommunenummer[i]].population.Menn[2017]).toFixed(2)
      + " antall av menn og " + ((utd[kommunenummer[i]].population["04a"].Kvinner[2017])/100 * info[kommunenummer[i]].population.Kvinner[2017]).toFixed(2) +
      " antall av kvinner.";
      // fagskole
      c5r3.innerHTML = "<h4>Utdanning fagskole: </h4>" + utd[kommunenummer[i]].population["11"].Menn[2017]
      + "% av menn og " + utd[kommunenummer[i]].population["11"].Kvinner[2017] +
      "% av kvinner.";
      // ingenting fullført / uoppgitt
      c6r3.innerHTML = "<h4>Ingenting fullført / uoppgitt: </h4>" + utd[kommunenummer[i]].population["09a"].Menn[2017]
      + "% av menn og " + utd[kommunenummer[i]].population["09a"].Kvinner[2017] +
      "% av kvinner.";

      // historisk utvikling av data fra 2005 - 2017
      for (var x = 2007; x < 2018; x++) {
        var b = -1; b < 11; b++;
        var cells = row6.insertCell(b);
        var cells2 = row7.insertCell(b);
        var cells3 = row8.insertCell(b);

        cells.innerHTML += "<h4>Befolkning: " + x + "</h4>" + info[kommunenummer[i]].population.Menn[x]
        + " menn og " + info[kommunenummer[i]].population.Kvinner[x] + " kvinner";

        cells2.innerHTML += "<h4>Utdanning UNI / høyskole i " + x + ": </h4>" + utd[kommunenummer[i]].population["04a"].Menn[x]
        + "% av menn og " + utd[kommunenummer[i]].population["04a"].Kvinner[x] +
        "% av kvinner.";

        cells3.innerHTML += "<h4>Sysselsatte i " + x + ": </h4>" + sysselsatte[kommunenummer[i]].population.Menn[x]
        + "% av menn og " + sysselsatte[kommunenummer[i]].population.Kvinner[x]
        + "% av kvinner.";
        }
      }
  };

}
