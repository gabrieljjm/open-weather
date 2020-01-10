function show(data){
    return  "<h3><strong>Cidade/País</strong>: "+ data.city.name+ ", "  + data.city.country +" </h3>"
                +"<br>"+
            "<h4><strong>Temperatura minima</strong>: "+  data.list[0].main.temp_min +" </h4>"+
             "<h4><strong>Temperatura máxima</strong>: "+  data.list[0].main.temp_max +" </h4>"+
             "<h4><strong>Data/hora</strong>: "+  data.list[0].dt_txt +" </h4>"


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
        url:'http://api.openweathermap.org/data/2.5/forecast?q=' + cidade + "&units=metric&lang=pt" + "&APPID=0799ebbcad862deddeeebe1f4ccc65d7",
        type:"GET",
        dataType:"jsonp",
        success: function(data){
            console.log(data);
            var widget = show(data);
            $("#show").html (widget);
        }

    });
}