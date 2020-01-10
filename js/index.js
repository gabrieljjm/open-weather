$(document).ready(atualizaTabela())

setInterval(atualizaTabela, 10000000);

function updateOpenWeather(cidade, linha){
    $.ajax({
        url:'http://api.openweathermap.org/data/2.5/weather?q=' + cidade + "&units=metric&lang=pt" + "&APPID=0799ebbcad862deddeeebe1f4ccc65d7",
        type:"GET",
        dataType:"jsonp",
        success: function(dadosOpenWeather){
            atualizaLinha(dadosOpenWeather, linha)
            console.log(dadosOpenWeather)
        }
    });
}

function atualizaLinha(dados, linha) {
    document.getElementById(('tmp' + linha)).innerHTML = dados.main.temp;
    document.getElementById(('hmd' + linha)).innerHTML = dados.main.temp;
}

function abreDetalhes() {

}

function show(data){
    return  "<h3><strong>Cidade/País</strong>: "+ data.name  +"," + data.country + "</h3>" +
            "<h3><strong>Tempo</strong>: "+ data.weather[0].main +"</h3>" +
            "<h3><strong>Descrição</strong>: "+ data.weather[0].description +"</h3>" +
            "<h3><strong>Temperatura (celsius) </strong>: "+ data.main.temp +" º"+"</h3>" +
            "<h3><strong>Humidade</strong>: "+ data.main.humidity +" %"+"</h3>" +
            "<h3><strong>Temperatura mínima</strong>: "+ data.main.temp_min +" º"+"</h3>" +
            "<h3><strong>Temperatura máxima</strong>: "+ data.main.temp_max +" º"+"</h3>"
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
        dataType:"jsonp",
        success: function(dadosOpenWeather){
            //existeLocalStorage
            atualizaLocalStorage(dadosOpenWeather)
            atualizaTabela(dadosOpenWeather)
        }
    });
}

function atualizaLocalStorage(dados) {
    if(localStorage) {
        resultado = JSON.parse(localStorage.getItem('city'));
        if(resultado == null || resultado.local1 == "" && resultado.local2 == "" && resultado.local3 == "" && resultado.local4 == "" && resultado.local5 == "" && resultado.local6 == "") {
            var inserir = {};
            inserir.local1 = dados.name + ", " + dados.country;
            inserir.local2 = "";
            inserir.local3 = "";
            inserir.local4 = "";
            inserir.local5 = "";
            inserir.local6 = "";

            //Guardar dados
            localStorage.setItem('city', JSON.stringify(inserir));
        }else {
            resultado = JSON.parse(localStorage.getItem('city'));
            if (resultado.local1 !== "" && resultado.local2 !== "" && resultado.local3 !== "" && resultado.local4 !== "" && resultado.local5 !== "" && resultado.local6 !== "") {
                resultado.local6 = resultado.local5;
                resultado.local5 = resultado.local4;
                resultado.local4 = resultado.local3;
                resultado.local3 = resultado.local2;
                resultado.local2 = resultado.local1;
                resultado.local1 = dados.name + ", " + dados.sys.country;
                localStorage.setItem('city', JSON.stringify(resultado));
            }else{
                if(resultado.local1 !== "" && resultado.local2 ==="" ){
                    resultado.local2 = dados.name + ", " + dados.sys.country;
                    localStorage.setItem('city', JSON.stringify(resultado));
                }else {
                    if (resultado.local2 !== "" && resultado.local3 === "") {
                        resultado.local3 = dados.name + ", " + dados.sys.country;
                        localStorage.setItem('city', JSON.stringify(resultado));
                    }else{
                        if (resultado.local3 !== "" && resultado.local4 === "") {
                            resultado.local4 = dados.name + ", " + dados.sys.country;
                            localStorage.setItem('city', JSON.stringify(resultado));
                        }else{
                            if (resultado.local4 !== "" && resultado.local5 === "") {
                                resultado.local5 = dados.name + ", " + dados.sys.country;
                                localStorage.setItem('city', JSON.stringify(resultado));
                            }else{
                                if (resultado.local5 !== "" && resultado.local6 === "") {
                                    resultado.local6 = dados.name + ", " + dados.sys.country;
                                    localStorage.setItem('city', JSON.stringify(resultado));
                                }
                            }
                        }
                    }
                }
            }
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
                document.getElementById(('local1')).innerHTML = resultado.local1;
                updateOpenWeather(resultado.local1, 1)
                document.getElementById("linha1").style.display = "table-row";
            }
            if (resultado.local2 != ""){
                document.getElementById(('local2')).innerHTML = resultado.local2;
                updateOpenWeather(resultado.local2, 2)
                document.getElementById("linha2").style.display = "table-row";
            }
            if (resultado.local3 != ""){
                document.getElementById(('local3')).innerHTML = resultado.local3;
                updateOpenWeather(resultado.local3, 3)
                document.getElementById("linha3").style.display = "table-row";
            }
            if (resultado.local4 != ""){
                document.getElementById(('local4')).innerHTML = resultado.local4;
                updateOpenWeather(resultado.local4, 4)
                document.getElementById("linha4").style.display = "table-row";
            }
            if (resultado.local5 != ""){
                document.getElementById(('local5')).innerHTML = resultado.local5;
                updateOpenWeather(resultado.local5, 5)
                document.getElementById("linha5").style.display = "table-row";
            }
            if (resultado.local6 != ""){
                document.getElementById(('local6')).innerHTML = resultado.local6;
                updateOpenWeather(resultado.local6, 6)
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
