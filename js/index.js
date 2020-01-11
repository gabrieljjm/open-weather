$(document).ready(atualizaTabela())

setInterval(atualizaTabela, 10000000);

function adFavorito(cidade) {
    var resultado;
    if(localStorage) {
        resultado = JSON.parse(localStorage.getItem('fav'));
        if(resultado == null) {
            var inserir = {};
            eval("inserir.FAV"+cidade+"= '"+cidade+"';");
            localStorage.setItem('fav', JSON.stringify(inserir));
        }else {
            if (eval("resultado.FAV"+cidade+"=="+cidade)){
                console.log(resultado);
                console.log(resultado.length);
                console.log("ja existe");
                eval("delete resultado.FAV"+cidade+";");
                localStorage.setItem('fav', JSON.stringify(resultado));
            }else{
                eval("resultado.FAV"+cidade+"= '"+cidade+"';");
                localStorage.setItem('fav', JSON.stringify(resultado));
            }
        }
    } else {
        alert("Desculpe, o seu navegador não suporta local storage.");
    }
    atualizaTabela();
}

function updateOpenWeather(cidade, linha){
    $.ajax({
        url:'http://api.openweathermap.org/data/2.5/weather?id=' + cidade + "&units=metric&lang=pt" + "&APPID=0799ebbcad862deddeeebe1f4ccc65d7",
        type:"GET",
        dataType:"json",
        success: function(dadosOpenWeather){
            atualizaLinha(dadosOpenWeather, linha)
        }
    });
}

function atualizaLinha(dados, linha) {
    document.getElementById(('local'+ linha)).innerHTML = dados.name + ", " + dados.sys.country;
    document.getElementById(('det'+ linha)).setAttribute("href", "detalhes.html?id=" + dados.id);
    if (localStorage){
        resultado = JSON.parse(localStorage.getItem('fav'));
        if(resultado == null) {
            document.getElementById(('fav'+ linha)).classList.remove("btn-danger");
            document.getElementById(('fav'+ linha)).classList.add("btn-outline-dark");
        }else {
            if (eval("resultado.FAV"+dados.id+"=="+dados.id)){
                document.getElementById(('fav'+ linha)).classList.remove("btn-outline-dark");
                document.getElementById(('fav'+ linha)).classList.add("btn-danger");
            }else{
                document.getElementById(('fav'+ linha)).classList.remove("btn-danger");
                document.getElementById(('fav'+ linha)).classList.add("btn-outline-dark");
            }
        }
    }
    document.getElementById(('fav'+ linha)).setAttribute("onclick", "adFavorito(" + dados.id + ")");
    document.getElementById(('tmp' + linha)).innerHTML = dados.main.temp;
    document.getElementById(('icon' + linha)).setAttribute("src", "http://openweathermap.org/img/w/" + dados.weather[0].icon + ".png");
    document.getElementById(('dsc' + linha)).innerHTML = letraGrande(dados.weather[0].description);
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
        url:'http://api.openweathermap.org/data/2.5/weather?q=' + cidade + "&units=metric&lang=pt" + "&APPID=0799ebbcad862deddeeebe1f4ccc65d7",
        type:"GET",
        dataType:"json",
        success: function(dadosOpenWeather){
            //existeLocalStorage
            console.log(dadosOpenWeather)
            atualizaLocalStorage(dadosOpenWeather)
            atualizaTabela(dadosOpenWeather)
        }
    });
}

function atualizaLocalStorage(dados) {
    var resultado;
    if (localStorage) {
        resultado = JSON.parse(localStorage.getItem('city'));
        if (resultado == null || resultado.local1 == "" && resultado.local2 == "" && resultado.local3 == "" && resultado.local4 == "" && resultado.local5 == "" && resultado.local6 == "") {
            var inserir = {};
            inserir.local1 = dados.id;
            inserir.local2 = "";
            inserir.local3 = "";
            inserir.local4 = "";
            inserir.local5 = "";
            inserir.local6 = "";
            //Guardar dados
            localStorage.setItem('city', JSON.stringify(inserir));
        } else {
            resultado = JSON.parse(localStorage.getItem('city'));
            resultado.local6 = resultado.local5;
            resultado.local5 = resultado.local4;
            resultado.local4 = resultado.local3;
            resultado.local3 = resultado.local2;
            resultado.local2 = resultado.local1;
            resultado.local1 = dados.id;
            localStorage.setItem('city', JSON.stringify(resultado));
        }
    } else {
        alert("Desculpe, o seu navegador não suporta local storage.");
    }
}

function atualizaTabela() {
    if (localStorage) {
        resultado = JSON.parse(localStorage.getItem('city'));
        if (resultado != null) {
            document.getElementById("linhahistorico").style.display = "none";
            if (resultado.local1 != ""){
                updateOpenWeather(resultado.local1, 1);
                document.getElementById("linha1").style.display = "table-row";
            }
            if (resultado.local2 != ""){
                updateOpenWeather(resultado.local2, 2);
                document.getElementById("linha2").style.display = "table-row";
            }
            if (resultado.local3 != ""){
                updateOpenWeather(resultado.local3, 3);
                document.getElementById("linha3").style.display = "table-row";
            }
            if (resultado.local4 != ""){
                updateOpenWeather(resultado.local4, 4);
                document.getElementById("linha4").style.display = "table-row";
            }
            if (resultado.local5 != ""){
                updateOpenWeather(resultado.local5, 5);
                document.getElementById("linha5").style.display = "table-row";
            }
            if (resultado.local6 != ""){
                updateOpenWeather(resultado.local6, 6);
                document.getElementById("linha6").style.display = "table-row";
            }
        }else{
            document.getElementById("linhahistorico").style.display = "table-row";
            document.getElementById("linha1").style.display = "none";
            document.getElementById("linha2").style.display = "none";
            document.getElementById("linha3").style.display = "none";
            document.getElementById("linha4").style.display = "none";
            document.getElementById("linha5").style.display = "none";
            document.getElementById("linha6").style.display = "none";
        }
    }
}




// "<td><a href=\"#\"><button type=\"button\" class=\"btn btn-default\"><span class=\"far fa-star\" aria-hidden=\"true\"></span> Adicionar Favoritos</button></a></td>"
