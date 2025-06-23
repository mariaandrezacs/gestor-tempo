let tempo = 25 * 60;
let timer;
let emPausa = false;
let emFoco = true;

const display = document.getElementById('timer');
const status = document.getElementById('status');
const btnStart = document.getElementById('start');
const btnPause = document.getElementById('pause');
const btnReset = document.getElementById('reset');

function atualizarDisplay() {
  const minutos = String(Math.floor(tempo / 60)).padStart(2, '0');
  const segundos = String(tempo % 60).padStart(2, '0');
  display.textContent = `${minutos}:${segundos}`;
}

function iniciarTimer() {
  if (timer) return;
  timer = setInterval(() => {
    if (tempo > 0) {
      tempo--;
      atualizarDisplay();
    } else {
      clearInterval(timer);
      timer = null;

      const tipo = emFoco ? 'Foco' : 'Descanso';
      const duracao = emFoco ? 25 : 5;
      registrarSessao(tipo, duracao);

      alert(emFoco ? "Tempo de descanso!" : "Hora de focar!");
      alternarModo();
    }
  }, 1000);
}

function pausarTimer() {
  clearInterval(timer);
  timer = null;
}

function resetarTimer() {
  clearInterval(timer);
  timer = null;
  tempo = emFoco ? 25 * 60 : 5 * 60;
  atualizarDisplay();
}

function alternarModo() {
  emFoco = !emFoco;
  tempo = emFoco ? 25 * 60 : 5 * 60;
  status.textContent = emFoco ? "Modo: Foco" : "Modo: Descanso";
  atualizarDisplay();
}

function registrarSessao(tipo, duracaoMin) {
  const historico = document.getElementById("historico");
  const li = document.createElement("li");
  const agora = new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });
  li.textContent = `${tipo} - ${duracaoMin} min (${agora})`;
  li.classList.add(tipo === 'Foco' ? 'foco' : 'descanso');
  historico.prepend(li); // adiciona no topo
}

btnStart.onclick = iniciarTimer;
btnPause.onclick = pausarTimer;
btnReset.onclick = resetarTimer;

atualizarDisplay();
