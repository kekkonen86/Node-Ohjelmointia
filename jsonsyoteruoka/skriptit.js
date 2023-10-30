document.getElementById('nappi').addEventListener('click', function(e) {
    e.preventDefault();
    let hakutermi = document.getElementById('paivat').value;
    let parametrit = `paiva=${hakutermi}`;

    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
        let tulostus = ``;

        // käsitellään JSON vain jos haku onnistui
        const jsonOlio = JSON.parse(this.responseText);
        console.log(jsonOlio);
        if(this.status == 200) {
            tulostus += `<p><b>${jsonOlio.paiva} (${jsonOlio.erikois}) </b><br>
                Pääruoka: ${jsonOlio.paaruoka}<br>
                Jälkiruoka: ${jsonOlio.jalkiruoka}</p>`;
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

