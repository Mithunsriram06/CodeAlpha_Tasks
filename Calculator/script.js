const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';

function updateDisplay() {
  display.value = currentInput;
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    handleInput(btn.dataset.key);
  });
});

document.addEventListener('keydown', (e) => {
  const key = e.key;
  const validKeys = "0123456789+-*/.=EnterBackspaceC";

  if (validKeys.includes(key) || key === "Escape") {
    handleInput(key === "Escape" ? "C" : key);
  }
});

function handleInput(key) {
  if (key === 'C') {
    currentInput = '';
  } else if (key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
  } else if (key === '=' || key === 'Enter') {
    try {
      currentInput = eval(currentInput).toString();
    } catch {
      currentInput = 'Error';
    }
  } else {
    currentInput += key;
  }
  updateDisplay();
}
