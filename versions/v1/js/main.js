const lista = document.querySelector("#lista-digimons");
const busca = document.querySelector("#busca");
const btnSurpreenda = document.querySelector("#btn-surpreenda");
let fonteDigimons = [];

let paginaAtual = 0;
const tamanhoPagina = 24;
let totalPaginas = 1;
let totalDigimons = 1000;
let termoBusca = "";
let ordenarPor = "id";
const btnOrdem = document.querySelector("#btn-ordem");

const botaoAnterior = document.querySelector("#pagina-anterior");
const botaoProxima = document.querySelector("#pagina-proxima");
const textoPagina = document.querySelector("#pagina-atual");

console.log(
    bubbleSort(
        [
            { id: 3, name: "B" },
            { id: 1, name: "C" },
            { id: 2, name: "A" },
        ],
        "name",
    ),
);

function bubbleSort(lista, campo) {
    const arr = [...lista]; // cópia, pra não mexer no original

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            const valorA = arr[j][campo];
            const valorB = arr[j + 1][campo];

            const trocar =
                typeof valorA === "string"
                    ? valorA.localeCompare(valorB) > 0
                    : valorA > valorB;

            if (trocar) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

function renderizarDigimons(listaDigimons) {
    const ordenados = bubbleSort(listaDigimons, ordenarPor);
    lista.innerHTML = "";

    ordenados.forEach((digimon) => {
        const card = document.createElement("a");

        card.classList.add("digimon-card");
        card.href = `detalhe.html?id=${digimon.id}`;
        card.title = digimon.name;

        card.innerHTML = `        
            <span class="digimon-id">#${digimon.id}</span>

            <img
                src="${digimon.image}"
                alt="${digimon.name}"
            >

            <h2>${digimon.name}</h2>
        `;

        lista.appendChild(card);
    });
}

carregarDigimonsAPI();

busca.addEventListener("input", () => {
    termoBusca = busca.value.trim();
    paginaAtual = 0;

    if (termoBusca === "") {
        carregarDigimonsAPI();
        return;
    }

    if (/^\d+$/.test(termoBusca)) {
        buscarDigimonPorId(termoBusca);
        return;
    }

    buscarDigimonsAPI(termoBusca);
});

async function carregarDigimonsAPI() {
    try {
        const resposta = await fetch(
            `https://digi-api.com/api/v1/digimon?pageSize=${tamanhoPagina}&page=${paginaAtual}`,
        );

        if (!resposta.ok) {
            throw new Error("Erro ao consultar a Digi-API");
        }

        const dados = await resposta.json();

        fonteDigimons = dados.content;
        totalPaginas = dados.pageable.totalPages;
        totalDigimons = dados.pageable.totalElements ?? totalDigimons;

        renderizarDigimons(fonteDigimons);

        textoPagina.textContent = `Página ${paginaAtual + 1}`;

        botaoAnterior.disabled = false;
        botaoProxima.disabled = false;
    } catch (erro) {
        console.error("Não foi possível carregar a API:", erro);
        lista.innerHTML = "<p>Não foi possível carregar os Digimons.</p>";
    }
}

async function buscarDigimonsAPI(termo) {
    try {
        const resposta = await fetch(
            `https://digi-api.com/api/v1/digimon?name=${encodeURIComponent(termo)}&pageSize=${tamanhoPagina}&page=${paginaAtual}`,
        );

        if (!resposta.ok) {
            throw new Error("Erro ao buscar Digimon na API");
        }

        const dados = await resposta.json();

        fonteDigimons = dados.content || [];
        totalPaginas = dados.pageable.totalPages;

        renderizarDigimons(fonteDigimons);

        textoPagina.textContent = `Página ${paginaAtual + 1}`;

        botaoAnterior.disabled = paginaAtual === 0;
        botaoProxima.disabled = paginaAtual >= totalPaginas - 1;
    } catch (erro) {
        console.error("Não foi possível buscar Digimons:", erro);
    }
}

async function buscarDigimonPorId(id) {
    try {
        const resposta = await fetch(
            `https://digi-api.com/api/v1/digimon/${id}`,
        );

        if (!resposta.ok) {
            throw new Error(`Digimon ${id} não encontrado`);
        }

        const d = await resposta.json();

        renderizarDigimons([
            { id: d.id, name: d.name, image: d.images?.[0]?.href ?? "" },
        ]);

        textoPagina.textContent = "Resultado por ID";
        botaoAnterior.disabled = true;
        botaoProxima.disabled = true;
    } catch (erro) {
        console.error(erro);
        lista.innerHTML = "<p>Nenhum Digimon encontrado com esse ID.</p>";
        botaoAnterior.disabled = true;
        botaoProxima.disabled = true;
    }
}

botaoAnterior.addEventListener("click", () => {
    if (paginaAtual > 0) {
        paginaAtual--;
    } else {
        paginaAtual = totalPaginas - 1; // volta pra última
    }

    if (termoBusca !== "") {
        buscarDigimonsAPI(termoBusca);
    } else {
        carregarDigimonsAPI();
    }
});

botaoProxima.addEventListener("click", () => {
    if (paginaAtual < totalPaginas - 1) {
        paginaAtual++;
    } else {
        paginaAtual = 0; // volta pra primeira
    }

    if (termoBusca !== "") {
        buscarDigimonsAPI(termoBusca);
    } else {
        carregarDigimonsAPI();
    }
});

async function sortearDigimon() {
    for (let tentativa = 0; tentativa < 5; tentativa++) {
        const id = Math.floor(Math.random() * totalDigimons) + 1;

        try {
            const resposta = await fetch(
                `https://digi-api.com/api/v1/digimon/${id}`,
            );

            if (resposta.ok) {
                window.location.href = `detalhe.html?id=${id}`;
                return;
            }
        } catch (erro) {
            console.error(erro);
        }
    }

    lista.innerHTML = "<p>Não foi possível sortear um Digimon agora.</p>";
}

btnSurpreenda.addEventListener("click", sortearDigimon);

btnOrdem.addEventListener("click", () => {
    ordenarPor = ordenarPor === "id" ? "name" : "id";
    btnOrdem.textContent =
        ordenarPor === "id" ? "Ordenar por Nome" : "Ordenar por ID";
    renderizarDigimons(fonteDigimons);
});
