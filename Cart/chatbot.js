const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

// Palavras-chave inteligentes
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
    
  ],
  "valor casamento": [
    "valor casamento",
    "preço casamento",
    "quanto custa o casamento",
    "casamento valor"
  ],
  "valor firma": [
    "valor firma",
    "preço firma",
    "quanto custa firma",
    "firma valor",
    "valor reconhceciento firma",
    "firma assinatura",
    "firma reconhecimento",
    
  ],
  "valor certidao": [
    "valor certidao",
    "preço certidão",
    "quanto custa certidão",
    "certidão valor"
  ],
  "documento casamento": [
    "documento casamento",
    "papéis casamento",
    "quais documentos para casar",
    "casamento documento"
  ],
  "documento firma": [
    "documento firma",
    "abrir firma",
    "reconhecimento documentos",
    "firma documento"
  ],
  "Olá": [
    "ola",
    "olá",
    "oi",
    "bom dia",  
    "boa tarde",
    "boa noite"  
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
    // Redireciona para submenu específico
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
    addMessage("Bot", "🕒 Funcionamos de segunda a sexta, das 9h às 17h.");
  }

  else if (message.includes("atendente")) {
    addMessage("Bot", "📞 Fale com a gente pelo WhatsApp: (19) 99999-9999.");
  }

  else if (message.includes("documento")) {
    const msg = document.createElement("div");
    msg.innerHTML = `
      <strong>Bot:</strong> 📄 Qual documento deseja saber?<br/><br/>
      <button onclick="respondToUser('documento casamento')" class="chat-btn">👰 Casamento</button>
      <button onclick="respondToUser('documento firma')" class="chat-btn">✍️ Firma</button>
    `;
    chatBox.appendChild(msg);
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

  else {
    addMessage("Bot", "❓ Desculpe, não entendi. Você pode perguntar sobre: documentos, horário, valores ou falar com um atendente.");
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}

// Mensagem automática ao abrir
function botoes() {
  const msg = document.createElement("div");
  msg.innerHTML = `
    <strong>Bot:</strong> 👋 Olá! Como posso ajudar?<br/><br/>
    <button onclick="respondToUser('documento')" class="chat-btn">📄 Documentos</button>
    <button onclick="respondToUser('horário')" class="chat-btn">🕒 Horário</button>
    <button onclick="respondToUser('valor')" class="chat-btn">💰 Valores</button>
    <button onclick="respondToUser('atendente')" class="chat-btn">📞 Atendente</button>
  `;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

window.onload = botoes;
