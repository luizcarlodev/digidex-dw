const detalhe = document.querySelector("#detalhe");
const btnAnterior = document.querySelector("#btn-anterior");
const btnProximo = document.querySelector("#btn-proximo");
const el = (id) => document.querySelector(`#${id}`);

const API_URL = "https://digi-api.com/api/v1/digimon";

let idAtual =
    Number(new URLSearchParams(window.location.search).get("id")) || 1;

async function buscarDigimon(id) {
    const resposta = await fetch(`${API_URL}/${id}`);

    if (!resposta.ok) {
        throw new Error(`Digimon ${id} não encontrado`);
    }

    return resposta.json();
}

function renderizarDetalhe(digimon) {
    el("nome").textContent = digimon.name;
    el("numero").textContent = `#${String(digimon.id).padStart(3, "0")}`;
    el("id-atual").textContent = `ID ${digimon.id}`;
    el("imagem").src = digimon.images?.[0]?.href ?? "";
    el("imagem").alt = digimon.name;

    el("tipo").textContent = digimon.types?.[0]?.type ?? "-";
    el("nivel").textContent = digimon.levels?.[0]?.level ?? "-";
    el("atributo").textContent = digimon.attributes?.[0]?.attribute ?? "-";
    el("area").textContent =
        (digimon.fields ?? []).map((f) => f.field).join(", ") || "-";

    el("descricao").textContent =
        digimon.descriptions?.find((d) => d.language === "en_us")
            ?.description ?? "Sem descrição.";

    const habilidades = el("habilidades");
    habilidades.innerHTML = "";

    (digimon.skills ?? []).forEach((s) => {
        const item = document.createElement("li");
        const titulo = document.createElement("strong");
        const texto = document.createElement("p");

        titulo.textContent = s.skill;
        texto.textContent = s.description;

        item.append(titulo, texto);
        habilidades.appendChild(item);
    });
}

async function mostrar(id) {
    el("nome").textContent = "Carregando...";

    try {
        const digimon = await buscarDigimon(id);

        idAtual = digimon.id;
        renderizarDetalhe(digimon);
        btnAnterior.disabled = idAtual <= 1;
    } catch (erro) {
        console.error(erro);
        el("nome").textContent = "Não foi possível carregar este Digimon.";
    }
}

btnProximo.addEventListener("click", () => mostrar(idAtual + 1));
btnAnterior.addEventListener("click", () => mostrar(idAtual - 1));

mostrar(idAtual);
