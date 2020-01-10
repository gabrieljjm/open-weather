function show(data){
    return  "<h4><strong>Cidade/País</strong>: "+ data.name  +"</h4>" +
        "<h4><strong>Tempo</strong>: "+ data.weather[0].main +"</h4>" +
        "<h4><strong>Descrição</strong>: "+ data.weather[0].description +"</h4>" +
        "<h4><strong>Temperatura (celsius) </strong>: "+ data.main.temp +"º "+"</h4>" +
        "<h4><strong>Humidade</strong>: "+ data.main.humidity +"% "+"</h4>" +
        "<h4><strong>Temperatura mínima</strong>: "+ data.main.temp_min +"º "+"</h4>" +
        "<h4><strong>Temperatura máxima</strong>: "+ data.main.temp_max +"º "+"</h4>"
}

// Botão Pesquisar
function btnPesquisar() {
    cidade = document.getElementById("city").value;
    if (verificaCampoPreenchido(cidade)){
        recebeOpenWeather(cidade)
    }else {
        document.getElementById("city").style.color = "red";
    }
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
        dataType:"jsonp",
        success: function(data){
            var widget = show(data);
            $("#show").html (widget);
        }

    });
}

