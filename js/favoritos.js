$(document).ready(atualizaTabela())

setInterval(atualizaTabela, 10000000);

function remFavorito(cidade) {
    var resultado;
    if(localStorage) {
        resultado = JSON.parse(localStorage.getItem('fav'));
        if(resultado == null) {
            var inserir = {};
            eval("inserir.FAV"+cidade+"= '"+cidade+"';");
            localStorage.setItem('fav', JSON.stringify(inserir));
        }else {
            if (eval("resultado.FAV"+cidade+"=="+cidade)){
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

function letraGrande(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}

//Fala com o OpenWeather
function recebeOpenWeather(cidade) {
    $.ajax({
        url:'http://api.openweathermap.org/data/2.5/weather?id=' + cidade + "&units=metric&lang=pt" + "&APPID=0799ebbcad862deddeeebe1f4ccc65d7",
        type:"GET",
        dataType:"json",
        success: function(dadosOpenWeather){
            constroiTabela(dadosOpenWeather);
        }
    });
}

function atualizaTabela() {
    document.getElementById("corpo").innerHTML = "";
    if (localStorage) {
        var resultado = JSON.parse(localStorage.getItem('fav'));
        if(resultado != null) {
            for (let i = 0; i < Object.keys(resultado).length; i++) {
                var cidade = Object.values(resultado)[i];
                recebeOpenWeather(cidade);
            }
            document.getElementById("corpo").style.display = "table-row-group";
            document.getElementById("linhasemfav").style.display = "none";
        }else {
            document.getElementById("corpo").style.display = "none";
            document.getElementById("linhasemfav").style.display = "table-row";
        }
    }else {
        document.getElementById("corpo").style.display = "none";
        document.getElementById("linhasemfav").style.display = "table-row";
    }
}

function constroiTabela(dados) {
    var tbody = document.getElementById('corpo').insertRow(-1);
    var cel1 = tbody.insertCell(-1);
    cel1.innerHTML = dados.name;
    cel1.setAttribute("class", "align-middle");
    var cel2 = tbody.insertCell(-1);
    cel2.innerHTML = "<p>Temperatura: "+dados.main.temp + "ºC</p><p><img src='http://openweathermap.org/img/w/" + dados.weather[0].icon + ".png' alt='Icon do Tempo'>"+ letraGrande(dados.weather[0].description) + "</p>";
    cel2.setAttribute("class", "align-middle");
    var cel3 = tbody.insertCell(-1);
    cel3.innerHTML = '<div class="btn-group-vertical btn-block"><button type="button" class="btn btn-danger"  onclick="remFavorito('+dados.id+')">Favorito</button><a type="button" class="btn btn-outline-dark" href="detalhes.html?id='+dados.id+'">Detalhes</a></div>';
    cel3.setAttribute("class", "align-middle");
}