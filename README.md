<div align="center">

# 🔷 DIGIDEX

**O Digi Analyzer do mundo real: uma enciclopédia de Digimons feita com HTML, CSS e JavaScript puros.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![API](https://img.shields.io/badge/API-Digi--API-063B5C?style=for-the-badge)

</div>

---

## 📖 Sobre o projeto

O **DIGIDEX** é um site de consulta de Digimons, inspirado na Pokédex. Ele consome os dados da [Digi-API](https://digi-api.com/) e mostra uma lista de Digimons com busca, além de uma página de detalhes completa para cada um.

Projeto desenvolvido para a disciplina de **APOO**, no curso de **Informática para Internet (Infoweb) do IFRN**. Todo o código de interface (HTML, CSS e JavaScript) é escrito pelo grupo, sem frameworks.

<!--
📸 Quando tiver prints, crie a pasta docs/ e descomente:

![Listagem](docs/listagem.png)
![Detalhe](docs/detalhe.png)
-->

## ✨ Funcionalidades

- 📋 Listagem de Digimons com **paginação**
- 🔎 Busca por **nome** e por **ID** (o mesmo campo aceita os dois)
- 🎲 Botão **"Me surpreenda"**, que abre um Digimon aleatório
- 🧾 Página de detalhes com nome, número, imagem, tipo, nível, atributo, áreas, descrição e habilidades
- ◀️ ▶️ Navegação entre Digimons (anterior e próximo) usando a API
- 📱 Layout responsivo (desktop, tablet e celular)
  |

## 📁 Estrutura de pastas

```
digidex-dw/
├── versions/
│   └── v1/
│       ├── index.html        # Página inicial (listagem e busca)
│       ├── detalhe.html      # Página de detalhes do Digimon
│       ├── css/
│       │   ├── style.css     # Estilos da página inicial
│       │   └── detalhe.css   # Estilos da página de detalhes
│       ├── js/
│       │   ├── main.js       # Listagem, busca, paginação e sorteio
│       │   └── detalhe.js    # Detalhes e navegação entre Digimons
│       └── assets/           # Logotipo, ícones e imagens
├── classroom/                # Exercícios feitos em aula
└── README.md
```

## 👥 Integrantes

| Nome                               | GitHub                                               |
| ---------------------------------- | ---------------------------------------------------- |
| _Felipe Eduardo Medeiros Pinheiro_ | [@Lepao-dev2](https://github.com/Lepao-dev2)         |
| _José Ferreira dos Santos Neto_    | [@Jose-sigma](https://github.com/Jose-sigma)         |
| _Júlio César Brito Santos_         | [@8maiordoBrasil](https://github.com/8maiordoBrasil) |
| _Luiz Carlos Lima Medeiros_        | [@luizcarlodev](https://github.com/luizcarlodev)     |

## 📚 API

- Dados e imagens: [Digi-API](https://digi-api.com/)
