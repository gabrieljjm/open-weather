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
    return  "<h3><strong>Cidade/País</strong>: "+ data.name  +"</h3>" +
        "<h3><strong>Tempo</strong>: "+ data.weather[0].main +"</h3>" +
        "<h3><strong>Descrição</strong>: "+ data.weather[0].description +"</h3>" +
        "<h3><strong>Temperatura (celsius) </strong>: "+ data.main.temp +"º "+"</h3>" +
        "<h3><strong>Humidade</strong>: "+ data.main.humidity +"% "+"</h3>" +
        "<h3><strong>Temperatura mínima</strong>: "+ data.main.temp_min +" º"+"</h3>" +
        "<h3><strong>Temperatura máxima</strong>: "+ data.main.temp_max +" º"+"</h3>"


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
