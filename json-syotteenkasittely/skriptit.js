document.getElementById('niminappi').addEventListener('click', function(e) {
    e.preventDefault();
    let hakutermi = document.getElementById('nimi').value;
    let parametrit = `nimi=${hakutermi}`;

    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
        let tulostus = ``;

        // käsitellään JSON vain jos haku onnistui
        const jsonOlio = JSON.parse(this.responseText);
        console.log(jsonOlio);
        if(this.status == 200 && jsonOlio.nimi != "undefined") {
            tulostus += `<p>Nimi: ${jsonOlio.nimi}<br>
                Ikä: ${jsonOlio.ika}<br>
                Ammatti: ${jsonOlio.ammatti}</p>`;
        } else {
            tulostus = 'Tapahtui virhe.';
        }
        const tulostusAlue = document.getElementById("tulos");
        tulostusAlue.innerHTML = tulostus;
    };
    xmlhttp.open('GET', 'http://localhost:3000?' + parametrit);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send();
    console.log(parametrit);
    });

document.getElementById('ammattinappi').addEventListener('click', function(e) {
    e.preventDefault();
    let hakutermi = document.getElementById('ammatti').value;
    let parametrit = `ammatti=${hakutermi}`;
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
        const jsonOlio = JSON.parse(this.responseText);
        let tulostus = ``;
        for (let henkilo of jsonOlio) {
        // jokainen henkilö on olio, joten sen kentät saa pistemerkinnällä
            tulostus += `<p>Nimi: ${henkilo.nimi}<br>
                Ikä: ${henkilo.ika}<br>
                Ammatti: ${henkilo.ammatti}</p>`;
        }
        // laitetaan tulostusmuotoon muotoiltu data div-elementtiin, jonka id on “tulos”
        const tulostusAlue = document.getElementById("tulos");
        tulostusAlue.innerHTML = tulostus;
    };
    xmlhttp.open("GET", "http://localhost:3000?" + parametrit);
    console.log(parametrit);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send();
    });

