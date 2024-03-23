document.addEventListener('DOMContentLoaded', function () {
  const switchElementIG = document.getElementById('optionSwitchIG');
  const switchElementTT = document.getElementById('optionSwitchTT');
  const radioOptionsIG = document.querySelectorAll('.option');
  const radioOptionsTT = document.querySelectorAll('.option-tt');

  // Open Supported URLs link
  const openLink = document.getElementById('openLink');
  openLink.addEventListener('click', function () {
    window.open('supported.html', '_blank');
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
  chrome.storage.sync.get('checkboxStateIG', function (data) {
    if (data.checkboxStateIG) {
      switchElementIG.checked = data.checkboxStateIG;
    }
  });

  chrome.storage.sync.get('checkboxStateTT', function (data) {
    if (data.checkboxStateTT) {
      switchElementTT.checked = data.checkboxStateTT;
    }
  });

  switchElementIG.addEventListener('change', function () {
    chrome.storage.sync.set({ checkboxStateIG: switchElementIG.checked });
  });

  switchElementTT.addEventListener('change', function () {
    chrome.storage.sync.set({ checkboxStateTT: switchElementTT.checked });
  });

  // Storage redirection
  chrome.storage.sync.get({ selectedOptionIG: 'picuki' }, function (data) {
    const selectedOptionIG = data.selectedOptionIG;
    document.querySelector(`input[value="${selectedOptionIG}"]`).checked = true;
  });

  chrome.storage.sync.get({ selectedOptionTT: 'urlebird' }, function (data) {
    const selectedOptionTT = data.selectedOptionTT;
    document.querySelector(`input[value="${selectedOptionTT}"]`).checked = true;
  });

  radioOptionsIG.forEach(function (option) {
    option.addEventListener('change', function () {
      const selectedOptionIG = document.querySelector(
        'input[name="option"]:checked'
      ).value;

      chrome.storage.sync.set({ selectedOptionIG: selectedOptionIG });
    });
  });

  radioOptionsTT.forEach(function (option) {
    option.addEventListener('change', function () {
      const selectedOptionTT = document.querySelector(
        'input[name="option-tt"]:checked'
      ).value;

      chrome.storage.sync.set({ selectedOptionTT: selectedOptionTT });
    });
  });
});

// Communication with the background.js file
function handleSwitchChangeIG() {
  const switchStateIG = document.getElementById('optionSwitchIG').checked;
  chrome.runtime.sendMessage({ switchStateIG });
}

function handleSwitchChangeTT() {
  const switchStateTT = document.getElementById('optionSwitchTT').checked;
  chrome.runtime.sendMessage({ switchStateTT });
}

function handleOptionChangeIG() {
  const selectedOptionIG = document.querySelector(
    'input[name="option"]:checked'
  ).value;
  chrome.runtime.sendMessage({ selectedOptionIG });
}

function handleOptionChangeTT() {
  const selectedOptionTT = document.querySelector(
    'input[name="option-tt"]:checked'
  ).value;
  chrome.runtime.sendMessage({ selectedOptionTT });
}
