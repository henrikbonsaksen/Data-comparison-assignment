// funksjon for å presentere data under oversikt-delen
var populateOversiktView = function() {

  // lokalisere plassering i html
  var oversiktTable = document.getElementsByClassName("oversikt")[0];

  // henting av datasett
  var kommunenavn = befolkning.getNames();
  var kommunenummer = befolkning.getIDs();
  var info = befolkning.kommuneinfo;

  // for-løkke for å fylle tabellen med data
  for (var i = 0; i < kommunenavn.length; i++) {
    var row = oversiktTable.insertRow(0);
    var nameCell = row.insertCell(0);
    var idCell = row.insertCell(1);
    var infoCell = row.insertCell(2);
    var data = (info[kommunenummer[i]].population.Menn[2018]+info[kommunenummer[i]].population.Kvinner[2018])

    nameCell.innerHTML = kommunenavn[i];
    idCell.innerHTML = kommunenummer[i];
    infoCell.innerHTML = data;
  };
}
