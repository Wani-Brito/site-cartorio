
document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('user-input');
  if (input) {
    input.addEventListener('input', function(e) {
      // Aceita apenas letras (maiúsculas/minúsculas), espaços e acentos
      this.value = this.value.replace(/[^\p{L}\s]/gu, '');
    });
  }
});
document.addEventListener('DOMContentLoaded', function() {
  const chatWidget = document.querySelector('.chat-widget');
  const resizeBarLeft = document.querySelector('.chat-resize-left');
  let isResizingLeft = false;
  let startX = 0;
  let startWidth = 0;
  let startLeft = 0;

  if (chatWidget && resizeBarLeft) {
    resizeBarLeft.addEventListener('mousedown', function(e) {
      isResizingLeft = true;
      startX = e.clientX;
      startWidth = parseInt(window.getComputedStyle(chatWidget).width, 10);
      startLeft = chatWidget.offsetLeft;
      document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', function(e) {
      if (isResizingLeft) {
        const dx = e.clientX - startX;
        const newWidth = startWidth - dx;
        if (newWidth >= 200) {
          chatWidget.style.width = newWidth + 'px';
          chatWidget.style.left = (startLeft + dx) + 'px';
        }
      }
    });

    document.addEventListener('mouseup', function() {
      isResizingLeft = false;
      document.body.style.userSelect = '';
    });
  }
});
// Redimensionar altura do chat pelo topo (ajusta altura e top)
document.addEventListener('DOMContentLoaded', function() {
  const chatWidget = document.querySelector('.chat-widget');
  const resizeTop = document.querySelector('.chat-resize-top');
  let isResizing = false;
  let startY = 0;
  let startHeight = 0;
  const startTop = parseInt(document.defaultView.getComputedStyle(chatWidget).top, 10) || chatWidget.offsetTop;

  if (chatWidget && resizeTop) {
    resizeTop.addEventListener('mousedown', function(e) {
      isResizing = true;
      startY = e.clientY;
      startHeight = parseInt(window.getComputedStyle(chatWidget).height, 10);
      document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', function(e) {
      if (isResizing) {
        const delta = e.clientY - startY;
        let newHeight = startHeight - delta;
        let newTop = startTop + delta;
        if (newHeight > 200) {
          chatWidget.style.height = newHeight + 'px';
          chatWidget.style.top = newTop + 'px';
        }
      }
    });

    document.addEventListener('mouseup', function() {
      isResizing = false;
      document.body.style.userSelect = '';
    });
  }
});
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const chatWidget = document.querySelector(".chat-widget");
const chatHeader = document.querySelector(".chat-header");

const intents = {
  "valor reconhecimento firma": [
    "valor reconhecimento",
    "valor reconhecimento firma",
    "quanto custa reconhecimento de firma",
    "preço firma assinatura",
    "firma valor assinatura",
    "firma",
    "reconhecimento firma",
    "reconhecimento de firma",
    "preço reconhecimento de assinatura",
    "quanto paga pra reconhecer firma",
    "tarifa reconhecimento firma",
    "quanto é o reconhecimento de firma",
    "quanto custa firma reconhecida",
    "firma reconhecida valor"
  ],
  "documento": [
    "documento",
    "documentos",
    "documento necessário",
    "precisa de quais documentos",
    "quais documentos",
    "documentação",
    "o que preciso levar",
    "papéis necessários",
    "preciso levar quais documentos",
    "qual papel eu levo",
    "que documentos são exigidos"
  ],
  "horário": [
    "horário",
    "horários",
    "qual o horário de funcionamento",
    "horário de atendimento",
    "horário de abertura",
    "horário de fechamento",
    "horário de expediente",
    "horário de trabalho",
    "horário de funcionamento cartório",
    "horário de funcionamento cartório civil",
    "horário de funcionamento cartório notarial",
  ],
  "valor casamento": [
    "valor casamento",
    "preço casamento",
    "quanto custa o casamento",
    "casamento valor",
    "taxa de casamento",
    "quanto pago pra casar",
    "qual o valor do registro de casamento",
    "quanto é o casamento civil"
  ],
  "valor firma": [
    "valor firma",
    "preço firma",
    "quanto custa firma",
    "firma valor",
    "valor reconhceciento firma", 
    "firma assinatura",
    "firma reconhecimento",
    "valor pra abrir firma",
    "quanto é pra reconhecer firma",
    "quanto é abrir uma firma"
  ],
  "valor certidao": [
    "valor certidao",
    "preço certidão",
    "quanto custa certidão",
    "certidão valor",
    "taxa certidão",
    "qual valor da certidão de nascimento",
    "valor segunda via certidão",
    "certidão quanto custa"
  ],
  "documento casamento": [
    "casamento",
    "documento casamento",
    "papéis casamento",
    "quais documentos para casar",
    "casamento documento",
    "documentos pra casar no civil",
    "o que precisa para casamento",
    "documentação necessária casamento",
    "registro casamento documentos"
  ],
  "documento firma": [
    "documento firma",
    "abrir firma",
    "reconhecimento documentos",
    "firma documento",
    "o que precisa para abrir firma",
    "documentação para firma",
    "documentos abrir firma",
    "documento reconhecimento de firma"
  ],
  "Olá": [
    "ola",
    "olá",
    "oi",
    "bom dia",
    "boa tarde",
    "boa noite",
    "e aí",
    "salve",
    "oii",
    "olaaa",
    "alô"
  ],
  "segunda via": [
    "segunda via casamento",
    "segunda via óbito",
    "segunda via nascimento",
    "segunda via certidão",
    "segunda via registro civil",
    "segunda via",
    "segunda via documento",
    "perdi minha certidão",
    "como tirar segunda via",
    "preciso de outra via",
    "duplicado certidão",
    "emitir segunda via"
  ],
  "escrituras": [
    "escritura",
    "escrituras",
    "fazer escritura",
    "registro escritura",
    "documento escritura",
    "escritura pública",
    "escritura de compra e venda",
    "escritura de doação",
    "escritura de inventário"
  ],
  "procuracao": [
    "procuração",
    "fazer procuração",
    "registro procuração",
    "documento procuração",
    "procuração pública",
    "como fazer procuração",
    "modelo de procuração",
    "preciso de procuração"
  ]

};

userInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
  }
});

function sendMessage() {
  const message = userInput.value.trim();
  if (message === "") return;
  addMessage("Você", message);
  respondToUser(message.toLowerCase());
  userInput.value = "";
}

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
function getIntent(message) {
  for (const intent in intents) {
    for (const phrase of intents[intent]) {
      if (message.includes(phrase)) {
        return intent;
      }
    }
  }
  return null;
}

function respondToUser(message) {
  const intent = getIntent(message);

  if (intent === "valor reconhecimento firma") {
    const msg = document.createElement("div");
    msg.innerHTML = `
      <strong>Bot:</strong> ✍️ Qual tipo de reconhecimento de firma?<br/><br/>
      <button onclick="respondToUser('reconhecimento por autenticacao')" class="chat-btn">🔐 Por Autenticidade</button>
      <button onclick="respondToUser('reconhecimento por semelhanca')" class="chat-btn">🖋️ Por Semelhança</button>
    `;
    chatBox.appendChild(msg);
  }

  else if (intent === "Olá") {
    addMessage("Bot", "👋 Olá! Como posso ajudar? Você pode perguntar sobre documentos, horários, valores ou falar com um atendente.");
  }
  else if (intent === "valor casamento") {
    addMessage("Bot", "💸 O valor da habilitação de casamento é de R$ 400,00 (pode variar).");
  }

  else if (intent === "valor firma") {
    respondToUser("valor reconhecimento firma");
  }

  else if (intent === "valor certidao") {
    addMessage("Bot", "📜 Certidões custam R$ 46,00.");
  }

  else if (message.includes("reconhecimento por autenticacao")) {
    addMessage("Bot", "🔐 Por autenticidade: R$ 15,00 (assinatura feita na presença do tabelião).");
  }

  else if (message.includes("reconhecimento por semelhanca")) {
    addMessage("Bot", "🖋️ Por semelhança: R$ 8,00 (assinatura comparada com a ficha de firma).");
  }

  else if (intent === "documento casamento") {
    addMessage("Bot", "👰 Documentos para casamento: RG, CPF e certidão de nascimento atualizada dos noivos.");
  }

  else if (intent === "documento firma") {
    addMessage("Bot", "✍️ Para reconhecimento de firma: RG e CPF originais. A firma deve estar aberta no cartório.");
  }

  else if (message.includes("horário")) {
    addMessage("Bot", "🕒 Funcionamos de segunda a sexta, das 8h30 às 16h30. O horário de almoço é das 12h00 às 13h00. Aos sábados os atendimentos são voltados apenas para casamentos. ");
  }

  else if (message.includes("atendente")) {
    addMessage("Bot", "📞 Fale com a gente pelo WhatsApp: (19) 99999-9999.");
  }

  else if (message.includes("escritura")) {
    addMessage("Bot", "Para mais informações sobre escrituras, consulte a aba de Notas.");
  }
  else if (message.includes("procuracao")) {
    addMessage("Bot", "Para mais informações sobre procuração, consulte a aba de Notas.");
  }


  else if (message.includes("primeira via") || message.includes("segunda via") || message.includes("certidao")) {
    const msg = document.createElement("div");
    msg.innerHTML = `
      <strong>Bot:</strong> 📄 Você deseja a <strong>primeira</strong> ou <strong>segunda via</strong> da certidão?<br/><br/>
      <button onclick="respondToUser('primeira via')" class="chat-btn">Primeira via</button>
      <button onclick="respondToUser('segunda via')" class="chat-btn">Segunda via</button>
    `;
    chatBox.appendChild(msg);
      if (message.includes("primeira via")) {
        const msg = document.createElement("div");
        msg.innerHTML = `
          <strong>Bot:</strong> ✍️ De qual certidão você precisa a primeira via?<br/><br/>
          <button onclick="respondToUser('primeira-casamento')" class="chat-btn">Casamento</button>
          <button onclick="respondToUser('primeira-obito')" class="chat-btn">Óbito</button>
          <button onclick="respondToUser('primeira-nascimento')" class="chat-btn">Nascimento</button>
        `;
        chatBox.appendChild(msg);
      }

      else if (message.includes("segunda via")) {
        const msg = document.createElement("div");
        msg.innerHTML = `
          <strong>Bot:</strong> ✍️ De qual certidão você precisa a segunda via?<br/><br/>
          <button onclick="respondToUser('segunda-casamento')" class="chat-btn">Casamento</button>
          <button onclick="respondToUser('segunda-obito')" class="chat-btn">Óbito</button>
          <button onclick="respondToUser('segunda-nascimento')" class="chat-btn">Nascimento</button>
        `;
        chatBox.appendChild(msg);
      }
  }

    else if (message.includes("primeira-casamento")) {
      addMessage("Bot", "👰 A primeira via da certidão de casamento é emitida no ato, após o registro. Consulte o cartório ou clique na Aba de Registro Civis - Casamento");
    }
    else if (message.includes("primeira-obito")) {
      addMessage("Bot", "🕊️ A primeira via da certidão de óbito é emitida gratuitamente no momento do registro.");
    }
    else if (message.includes("primeira-nascimento")) {
      addMessage("Bot", "👶 A primeira via da certidão de nascimento é gratuita e emitida diretamente no cartório e não há custos.");
    }

    else if (message.includes("segunda-casamento")) {
      addMessage("Bot", "📄 A segunda via da certidão de casamento custa R$ 46,23 + (valor de cada averbação = R$23,20). Leve os principais dados do casamento.");
    }
    else if (message.includes("segunda-obito")) {
      addMessage("Bot", "📄 A segunda via da certidão de óbito custa R$ 46,23. Leve os principais dados do falescido.");
    }
    else if (message.includes("segunda-nascimento")) {
      addMessage("Bot", "📄 A segunda via da certidão de nascimento custa R$ 46,23 + (valor de cada averbação = R$23,20). Leve os principais dados do casamento");
    }
    else if (message.includes("documento certidao")) {
      addMessage("Bot", "📜 Para solicitar certidões (nascimento, casamento ou óbito), traga um documento com foto e os dados do registro desejado.");
    }



  else if (message.includes("valor") || message.includes("valores")) {
    const msg = document.createElement("div");
    msg.innerHTML = `
      <strong>Bot:</strong> 💰 Qual valor você quer saber?<br/><br/>
      <button onclick="respondToUser('valor casamento')" class="chat-btn">👰 Casamento</button>
      <button onclick="respondToUser('valor reconhecimento firma')" class="chat-btn">✍️ Firma</button>
      <button onclick="respondToUser('valor certidao')" class="chat-btn">📜 Certidão</button>
    `;
    chatBox.appendChild(msg);
  }
  else if (intent === "documento") {
    const msg = document.createElement("div");
    msg.innerHTML = `
      <strong>Bot:</strong> 📄 Sobre qual tipo de documento você quer saber?<br/><br/>
      <button onclick="respondToUser('documento casamento')" class="chat-btn">👰 Casamento</button>
      <button onclick="respondToUser('documento firma')" class="chat-btn">✍️ Firma</button>
    `;
    chatBox.appendChild(msg);
    if (message.includes("documento casamento")) {
      addMessage("Bot", "👰 É necessário a certidão de registro cívil atualizada, RG e CPF dos noivos, e o formulário preenchido (clique na aba de Registro Civil - Casamento - e baixe o Formulário)");
    }
    else if (message.includes("documento firma")) {
      addMessage("Bot", "Documento com foto (RG ou CNH) e CPF. A firma deve estar aberta no cartório.");
    }
  }
  
  else {
    addMessage("Bot", "❓ Desculpe, não entendi. Você pode perguntar sobre: documentos, horário, valores ou falar com um atendente.");
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}

function botoes() {
  const msg = document.createElement("div");
  msg.innerHTML = `
    <strong>Bot:</strong> 👋 Olá! Como posso ajudar?<br/><br/>
    <button onclick="respondToUser('documento')" class="chat-btn">📄 Documentos</button>
    <button onclick="respondToUser('horário')" class="chat-btn">🕒 Horário</button>
    <button onclick="respondToUser('valor')" class="chat-btn">💰 Valores</button>
    <button onclick="respondToUser('atendente')" class="chat-btn">📞 Atendente</button>
    <button onclick="respondToUser('certidao')" class="chat-btn">📜 Certidões</button>
  `;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

window.onload = botoes;

let isDragging = false, offsetX, offsetY;


if (chatWidget && chatHeader) {
  chatHeader.addEventListener('mousedown', function(e) {
    isDragging = true;
    offsetX = e.clientX - chatWidget.getBoundingClientRect().left;
    offsetY = e.clientY - chatWidget.getBoundingClientRect().top;
    chatWidget.style.transition = 'none';
  });

  document.addEventListener('mousemove', function(e) {
    if (isDragging) {
      chatWidget.style.left = (e.clientX - offsetX) + 'px';
      chatWidget.style.top = (e.clientY - offsetY) + 'px';
      chatWidget.style.right = 'auto';
      chatWidget.style.bottom = 'auto';
      chatWidget.style.position = 'fixed';
    }
  });

  document.addEventListener('mouseup', function() {
    isDragging = false;
    chatWidget.style.transition = '';
  });
}