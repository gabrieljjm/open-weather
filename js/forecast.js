function atualizaTabelas(dados) {
    document.getElementById("tr3dia").innerHTML = "";
    document.getElementById("tr3dados").innerHTML = "";
    document.getElementById("tr3horas").innerHTML = "";

    var dia = [];
    var mdtemp = [];
    var tempmax = [];
    var tempmin = [];
    var desc = [];
    var icon = [];
    fazMedia(dados, dia, mdtemp, tempmax, tempmin, desc, icon);
    var i = 0;
    document.getElementById('info1').innerHTML = dados.city.name+ ", "  + dados.city.country;
    document.getElementById('info2').innerHTML = "Lat " + dados.city.coord.lat+ ", Lon "  + dados.city.coord.lon;
    for (let i = 0; i < 5; i++) {
        document.getElementById('thdia' + i).innerHTML = "<h5>" + dia[i] + "</h5>";
        document.getElementById('tdmin' + i).innerHTML = tempmin[i].toFixed(2) + " °C";
        document.getElementById('tdmed' + i).innerHTML = mdtemp[i].toFixed(2) + " °C";
        document.getElementById('tdmax' + i).innerHTML = tempmax[i].toFixed(2) + " °C";
        document.getElementById('icon' + i).setAttribute("src", "http://openweathermap.org/img/w/" + icon[i] + ".png");
        document.getElementById('tdinfo' + i).innerHTML = letraGrande(desc[i]);
    }
    var i = 0;
    var j = 0;
    var c = 0;
    var tr3dia;
    var tr3dados;
    var tr3horas;
    var divide = dados.list[0].dt_txt.split(" ");
    var dt1 = divide[0];
    while (true){
        try{
            tr3dia = document.getElementById("tr3dia").insertCell(-1);
            tr3dia.innerHTML = dados.list[j].dt_txt.split(" ")[0];
            c = 0;
            try{
                while (dt1 === (dados.list[j].dt_txt.split(" "))[0]) {
                    tr3dados = document.getElementById("tr3dados").insertCell(-1);
                    tr3dados.innerHTML = dados.list[j].main.temp + "°C";
                    tr3horas = document.getElementById("tr3horas").insertCell(-1);
                    tr3horas.innerHTML = dados.list[j].dt_txt.split(" ")[1].split(":")[0]+":"+dados.list[j].dt_txt.split(" ")[1].split(":")[1];
                    c +=1;
                    j++;
                    console.log(j);
                }
            }catch (e) {

            }
            console.log(c);
            tr3dia.setAttribute("colspan", c);
            divide = dados.list[j].dt_txt.split(" ");
            dt1 = divide[0];
            i++;
        }catch (e) {
            break;
        }

    }
    document.getElementById('tabeladias').style.display = "block";
    document.getElementById('tabelahoras').style.display = "block";
}

function letraGrande(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
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
            console.log(dadosOpenWeather);
            atualizaTabelas(dadosOpenWeather);
        }
    });
}

function fazMedia(dados, dia, mdtemp, tempmax, tempmin, desc, icon) {
    var i = 0;
    var j = 0;
    var c = 0;
    var divide = dados.list[0].dt_txt.split(" ");
    var dt1 = divide[0];
    while (true) {
        try {
            mdtemp[i] = 0;
            tempmax[i] = 0;
            tempmin[i] = 100;
            c = 0;
            while (dt1 === (dados.list[j].dt_txt.split(" "))[0]) {
                mdtemp[i] += dados.list[j].main.temp;
                dia[i] = (dados.list[j].dt_txt.split(" "))[0];
                if (tempmax[i] < dados.list[j].main.temp_max) {
                    tempmax[i] = dados.list[j].main.temp_max;
                }
                if (tempmin[i] > dados.list[j].main.temp_min) {
                    tempmin[i] = dados.list[j].main.temp_min;
                }
                desc[i] = dados.list[j].weather[0].description;
                icon[i] = dados.list[j].weather[0].icon;
                c += 1;
                j++;
            }
            mdtemp[i] /= c;
            divide = dados.list[j].dt_txt.split(" ");
            dt1 = divide[0];
            i++;
        } catch (e) {
            break;
        }
    }
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