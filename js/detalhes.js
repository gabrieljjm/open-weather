$(document).ready(function () {
    var parametros = recebeURL();
    var id = parametros.id;
    $.ajax({
        url:'http://api.openweathermap.org/data/2.5/weather?id=' + id + "&units=metric&lang=pt" + "&APPID=0799ebbcad862deddeeebe1f4ccc65d7",
        type:"GET",
        dataType:"json",
        success: function(data){
            var widget = show(data);
            $("#show").html (widget);
        }

    });
})

// Botão Pesquisar
function btnPesquisar() {
    cidade = document.getElementById("city").value;
    if (verificaCampoPreenchido(cidade)){
        recebeOpenWeather(cidade)
    }else {
        document.getElementById("city").style.color = "red";
    }
}

function show(data){
    return  "<div class='container'>"+
                "<h2>" + data.name  +", " + data.sys.country  + "</h2>"+
            "</div>"+
            "<p>"+ "Lat " + data.coord.lat + ", Lat " + data.coord.lon +"</p>"+
            "<div class='container'>"+
                "<table class='table table-striped table-bordered table-sm' align='center' style=\'width: 600px'>"+
                    "<thead>"+
                        "<tr align='center' style='background: lightgray'>"+
                        "</tr>"+
                    "</thead>"+
                    "<tbody>"+
                        "<tr>"+
                            "<td align='center'><strong>Descrição</td></strong>"+
                            "<td align='center'> "+ data.weather[0].description +"</td>"+
                        "</tr>"+
                        "<tr>"+
                            "<td align='center'><strong>Temperatura (celsius)</td></strong>"+
                            "<td align='center'> "+ data.main.temp + " ºC" +"</td>"+
                        "</tr>"+
                        "<tr>"+
                            "<td align='center'><strong>Humidade</td></strong>"+
                            "<td align='center'> "+ data.main.humidity +"%" +"</td>"+
                        "</tr>"+
                        "<tr>"+
                            "<td align='center'><strong>Temperatura mín. e máx.</td></strong>"+
                            "<td align='center'> "+ data.main.temp_min + " ºC" +", " + data.main.temp_max + " ºC" +"</td>"+
                        "</tr>"+
                        "<tr>"+
                            "<td align='center'><strong>Velocidade do vento</td></strong>"+
                            "<td align='center'> "+ data.wind.speed +" metros por segundo"+"</td>"+
                        "</tr>"+
                        "<tr>"+
                            "<td align='center'><strong>Percentagem de nuvens</td></strong>"+
                            "<td align='center' id='infoTeste'> "+ data.clouds.all +"%"+"</td>"+
                        "</tr>"+
                    "</tbody>"+
                "</table>"+
            "</div>"

    document.getElementById('infoTeste' + i).innerHTML = letraGrande(desc[i]);

}

// Verifica Campo da Cidade/Pais
function verificaCampoPreenchido(cidade) {
    var preenchido;
    if(cidade != ""){
        preenchido = true;
    }
    return preenchido;
}

//Fala com o OpenWeather
function recebeOpenWeather(cidade) {
    $.ajax({
        url:'http://api.openweathermap.org/data/2.5/weather?q=' + cidade + "&units=metric&lang=pt" + "&APPID=0799ebbcad862deddeeebe1f4ccc65d7",
        type:"GET",
        dataType:"json",
        success: function(data){
            var widget = show(data);
            $("#show").html (widget);
        }

    });
}

function recebeURL() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function letraGrande(str) {
    var i = 0;
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}
