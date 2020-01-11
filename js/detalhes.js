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
    return  "<h5><strong>Cidade/País</strong>: "+ data.name  +"</h5>" +
        "<h5><strong>Longitude</strong>: "+ data.coord.lon +"</h5>" +
        "<h5><strong>Latitude</strong>: "+ data.coord.lat +"</h5>"+
        "<h5><strong>Tempo</strong>: "+ data.weather[0].main +"</h5>" +
        "<h5><strong>Descrição</strong>: "+ data.weather[0].description +"</h5>" +
        "<h5><strong>Temperatura (celsius) </strong>: "+ data.main.temp +" ºC"+"</h5>" +
        "<h5><strong>Humidade</strong>: "+ data.main.humidity +"% "+"</h5>" +
        "<h5><strong>Temperatura mínima</strong>: "+ data.main.temp_min +" ºC"+"</h5>" +
        "<h5><strong>Temperatura máxima</strong>: "+ data.main.temp_max +" ºC"+"</h5>"+
        "<h5><strong>Wind Speed</strong>: "+ data.wind.speed +" metros por segundo"+"</h5>"+
        "<h5><strong>Percentagem de nuvens</strong>: "+ data.clouds.all +" %"+"</h5>"

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
