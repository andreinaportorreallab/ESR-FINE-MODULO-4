// Contenitore dei risultati:
const resultsBox = document.getElementById("results-area");

// Input post name:
const postName = document.getElementById("post-name");

// Input post description:
const postDesc = document.getElementById("post-description");

// Input post price:
const postPrice = document.getElementById("post-price");

// Alert per dati incompleti:
const inputAlert = document.getElementById("alert-msg");

// Alert per dato cancellato:
const deleteAlert = document.getElementById("delete-msg");

// Endpoint:
const apiUrl = "https://striveschool-api.herokuapp.com/api/agenda/";

// Invoca la funzione getPosts al caricamento della pagina:
window.onload = getPosts();

// Ottieni tutti i posts dall'endpoint
async function getPosts() {
    resultsBox.innerHTML = "";
    try {
        const res = await fetch(apiUrl);
        const json = await res.json(); // Qui avrò un array di oggetti (posts..)
        json.forEach((post) => {
            createPostTemplate(post);
        });
        // console.log(json);
    } catch (error) {
        console.log(error);
    }
}

// Crea il template HTML relativo al singolo post (riga di tabella...)
function createPostTemplate({ _id, name, description, price }) {
    // Template tipo:
    // --------------
    // <tr>
    //     <th>Name</th>
    //     <td>Description</td>
    //     <td>Price</td>
    //     <td>
    //         <a class="btn btn-primary btn-sm">
    //             <i class="fa-solid fa-pencil" aria-hidden="true"></i>
    //             <span class="ms-1">Edit</span>
    //         </a>
    //         <a class="btn btn-danger btn-sm ms-1">
    //             <i class="fa-solid fa-trash" aria-hidden="true"></i>
    //             <span class="ms-1">Delete</span>
    //         </a>
    //     </td>
    // </tr>

    // Istruzioni per costruire il template tramite JS:
    let tableRow = document.createElement("tr");

    let rowName = document.createElement("th");
    rowName.innerText = name;
    let rowDesc = document.createElement("td");
    rowDesc.innerText = description;
    let rowPrice = document.createElement("td");
    rowPrice.innerText = price;
    let rowOps = document.createElement("td");

    // Tasto di modifica:
    let editBtn = document.createElement("a");
    editBtn.classList.add("btn", "btn-primary", "btn-sm");
    editBtn.href = `detail.html?pid=${_id}`;
    editBtn.target = "_blank";
    let editImg = document.createElement("i");
    editImg.classList.add("fa-solid", "fa-pencil");
    let editText = document.createElement("span");
    editText.classList.add("ms-1");
    editText.innerText = "Edit";

    editBtn.appendChild(editImg);
    editBtn.appendChild(editText);

    // Tasto di cancellazione:
    let delBtn = document.createElement("a");
    delBtn.classList.add("btn", "btn-danger", "btn-sm", "ms-1");
    delBtn.addEventListener("click", () => {
        deletePost(_id);
    });
    let delImg = document.createElement("i");
    delImg.classList.add("fa-solid", "fa-trash");
    let delText = document.createElement("span");
    delText.classList.add("ms-1");
    delText.innerText = "Delete";

    delBtn.appendChild(delImg);
    delBtn.appendChild(delText);

    rowOps.appendChild(editBtn);
    rowOps.appendChild(delBtn);

    tableRow.appendChild(rowName);
    tableRow.appendChild(rowDesc);
    tableRow.appendChild(rowPrice);
    tableRow.appendChild(rowOps);

    resultsBox.appendChild(tableRow);
}

// Funzione per creare un nuovo post
async function createPost() {
    // Verifica di validazione:
    if(postName.value && postDesc.value && postPrice.value) {
        // Acquisisco i valori degli input per la creazione del post:
        let newPost = { "name": postName.value, "description": postDesc.value, "price": postPrice.value, "time": new Date() };
    
        try {
            const res = await fetch('https://striveschool-api.herokuapp.com/api/agenda', { method: "POST", body: JSON.stringify(newPost), headers: { "Content-type": "application/json;charset=UTF-8"}}); 
            getPosts();
        } catch(error) {
            console.log(error);
        }
    } else {
        // Avviso temporaneo di validation fallita
        inputAlert.classList.toggle("d-none");
        // console.log("Devi inserire tutti e 3 i campi obbligatori!");
        setTimeout(() => {
            inputAlert.classList.toggle("d-none");
        }, 5000);
    }
}

// Funzione per cancellare un post di id=pid
async function deletePost(pid) {
    const res = await fetch(apiUrl + pid, { "method": "DELETE" });
    // console.log(`Cancellazione del post ${pid} eseguita con successo!`);
    // Avviso temporaneo di avvenuta cancellazione
    deleteAlert.classList.toggle("d-none");
    setTimeout(() => {
        deleteAlert.classList.toggle("d-none");
    }, 5000);
    getPosts();
}
