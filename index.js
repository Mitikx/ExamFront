//async function recupererNom() {
//    const url = "http://localhost:8080/hello"
//    const reponse = await fetch(url, {
//        method: "GET",
//    });
//    return reponse.text();
//}
//recupererNom().then(nom => console.log(nom));

form = document.getElementById("formulaire")
    .addEventListener("submit",
        sendAndRetrieveName(
            () => {
                let name = document.getElementById(name).value
            }))

async function sendAndRetrivedName(name) {
    const params = new URLSearchParams();
    params.append("name", name);
    const reponse = await fetch('http://localhost:8080/hello', {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString()
    });
    return await reponse.text();
}
sendAndRetrivedName("John").then(r => console.log(r));


