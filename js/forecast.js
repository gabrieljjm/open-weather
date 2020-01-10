var id;
var mdtemp = [];
var tempmax = [];
var tempmin = [];
var desc = [];

function atualizaTabelas(dados) {
    fazMedia(dados);
    var i = 0;
    while (0 < 5){
        document.getElementById(('dia'+ i)).innerHTML = dados.name + ", " + dados.sys.country;
        i++;
    }
}

function show(data){
    return  "<h3><strong>Cidade/País</strong>: "+ data.city.name+ ", "  + data.city.country +" </h3>"
                +"<br>"+
            "<h4><strong>Temperatura minima</strong>: "+  data.list[0].main.temp_min +" </h4>"+
             "<h4><strong>Temperatura máxima</strong>: "+  data.list[0].main.temp_max +" </h4>"+
             "<h4><strong>Data/hora</strong>: "+  data.list[0].dt_txt +" </h4>"+
            "<br>"+
            "<h4><strong>Temperatura minima</strong>: "+  data.list[1].main.temp_min +" </h4>"+
            "<h4><strong>Temperatura máxima</strong>: "+  data.list[1].main.temp_max +" </h4>"+
            "<h4><strong>Data/hora</strong>: "+  data.list[1].dt_txt +" </h4>"
}

// Botão Pesquisar
function btnPesquisar() {
    cidade = document.getElementById("city").value;
    if (verificaCampoPreenchido(cidade)){
        recebeOpenWeather(cidade)
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
        dataType:"json",
        success: function(dadosOpenWeather){
            //existeLocalStorage
            console.log(dadosOpenWeather);
            atualizaTabelas(dadosOpenWeather);
            //var media = getMedia(dadosOpenWeather);
            //atualizaTabela1(dadosOpenWeather);
        }
    });
}

function fazMedia(dados) {
    var i = 0;
    var j = 0;
    var c = 0;
    var divide = dados.list[0].dt_txt.split(" ");
    var dt1 = divide[0];
    while (i < 5){
        console.log(mdtemp[i]);
        mdtemp[i] = 0;
        tempmax[i] = 0;
        tempmin[i] = 100;
        c = 0;
        while (dt1 === (dados.list[j].dt_txt.split(" "))[0]){
            mdtemp[i] += dados.list[j].main.temp;
            if (tempmax[i] < dados.list[j].main.temp_max){
                tempmax[i] = dados.list[j].main.temp_max;
            }
            if (tempmin[i] > dados.list[j].main.temp_min){
                tempmin[i] = dados.list[j].main.temp_min;
            }
            desc[i] = dados.list[j].weather[0].description;
            console.log(dados.list[j].weather[0].description);
            c += 1;
            console.log(dados.list[j].main.temp + "  " + j + "  " + (dados.list[j].dt_txt.split(" "))[1]);
            j++;
        }
        mdtemp[i] /= c;
        divide = dados.list[j].dt_txt.split(" ");
        dt1 = divide[0];
        i++;
        console.log(i);
        console.log(mdtemp+tempmax+tempmin);
    }
    console.log(mdtemp);
    console.log(tempmax);
    console.log(tempmin);
    console.log(desc);
}




/*
function fazMedia(dados) {
    var i = 0;
    var j = 0;
    var media = {};
    var divide = dados.list[0].dt_txt.split(" ");
    var dt1 = divide[0];
    while (i < 5){
        console.log(media[i]);
        media[i] = {"campo1": 0};
        media[i] = {"campo2": 0};
        while (dt1 === (dados.list[j].dt_txt.split(" "))[0]){
            media[i].campo1 += dados.list[j].main.temp;
            media[i].campo2 += 1;
            console.log(dados.list[j].main.temp + "  " + j + "  " + (dados.list[j].dt_txt.split(" "))[1]);
            j++;
        }
        media[i].campo1 /= media[i].campo2;
        divide = dados.list[j].dt_txt.split(" ");
        dt1 = divide[0];
        i++;
        console.log(i);
        console.log(media);
    }
    console.log(media);
}


function atualizaTabela1(dados) {
    while ()
}*/