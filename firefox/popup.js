document.addEventListener('DOMContentLoaded', function () {
  const switchElementIG = document.getElementById('optionSwitchIG');
  const switchElementTT = document.getElementById('optionSwitchTT');
  const radioOptionsIG = document.querySelectorAll('.option');
  const radioOptionsTT = document.querySelectorAll('.option-tt');

  // Open and close settings
  const toggleIG = document.getElementById('toggleIG');
  const toggleTT = document.getElementById('toggleTT');

  toggleIG.addEventListener('click', function () {
    const toggleDivIG = document.getElementById('toggleDivIG');
    toggleDivIG.style.display =
      toggleDivIG.style.display === 'grid' ? 'none' : 'grid';
  });

  toggleTT.addEventListener('click', function () {
    const toggleDivTT = document.getElementById('toggleDivTT');
    toggleDivTT.style.display =
      toggleDivTT.style.display === 'grid' ? 'none' : 'grid';
  });

  // Change switch
  switchElementIG.addEventListener('change', handleSwitchChangeIG);
  switchElementTT.addEventListener('change', handleSwitchChangeTT);

  // Change redirection
  radioOptionsIG.forEach((option) => {
    option.addEventListener('change', handleOptionChangeIG);
  });

  radioOptionsTT.forEach((option) => {
    option.addEventListener('change', handleOptionChangeTT);
  });

  // Storage switch
  browser.storage.sync.get('checkboxStateIG', function (data) {
    if (data.checkboxStateIG) {
      switchElementIG.checked = data.checkboxStateIG;
    }
  });

  browser.storage.sync.get('checkboxStateTT', function (data) {
    if (data.checkboxStateTT) {
      switchElementTT.checked = data.checkboxStateTT;
    }
  });

  switchElementIG.addEventListener('change', function () {
    browser.storage.sync.set({ checkboxStateIG: switchElementIG.checked });
  });

  switchElementTT.addEventListener('change', function () {
    browser.storage.sync.set({ checkboxStateTT: switchElementTT.checked });
  });

  // Storage redirection
  browser.storage.sync.get({ selectedOptionIG: 'picuki' }, function (data) {
    const selectedOptionIG = data.selectedOptionIG;
    document.querySelector(`input[value="${selectedOptionIG}"]`).checked = true;
  });

  browser.storage.sync.get({ selectedOptionTT: 'urlebird' }, function (data) {
    const selectedOptionTT = data.selectedOptionTT;
    document.querySelector(`input[value="${selectedOptionTT}"]`).checked = true;
  });

  radioOptionsIG.forEach(function (option) {
    option.addEventListener('change', function () {
      const selectedOptionIG = document.querySelector(
        'input[name="option"]:checked'
      ).value;

      browser.storage.sync.set({ selectedOptionIG: selectedOptionIG });
    });
  });

  radioOptionsTT.forEach(function (option) {
    option.addEventListener('change', function () {
      const selectedOptionTT = document.querySelector(
        'input[name="option-tt"]:checked'
      ).value;

      browser.storage.sync.set({ selectedOptionTT: selectedOptionTT });
    });
  });
});

// Communication with the background.js file
function handleSwitchChangeIG() {
  const switchStateIG = document.getElementById('optionSwitchIG').checked;
  browser.runtime.sendMessage({ switchStateIG });
}

function handleSwitchChangeTT() {
  const switchStateTT = document.getElementById('optionSwitchTT').checked;
  browser.runtime.sendMessage({ switchStateTT });
}

function handleOptionChangeIG() {
  const selectedOptionIG = document.querySelector(
    'input[name="option"]:checked'
  ).value;
  browser.runtime.sendMessage({ selectedOptionIG });
}

function handleOptionChangeTT() {
  const selectedOptionTT = document.querySelector(
    'input[name="option-tt"]:checked'
  ).value;
  browser.runtime.sendMessage({ selectedOptionTT });
}
