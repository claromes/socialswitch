document.addEventListener('DOMContentLoaded', function () {
  const switchElement = document.getElementById('optionSwitch');
  const radioOptions = document.querySelectorAll('.option');

  // Open Supported URLs link
  let openLink = document.getElementById('openLink');
  openLink.addEventListener('click', function() {
    window.open('supported.html', '_blank');
  });

  // Change switch
  switchElement.addEventListener('change', handleSwitchChange);

  // Change redirection
  radioOptions.forEach(option => {
    option.addEventListener('change', handleOptionChange);
  });

  // Storage switch
  chrome.storage.sync.get('checkboxState', function(data) {
    if (data.checkboxState) {
      switchElement.checked = data.checkboxState;
    }
  });

  switchElement.addEventListener('change', function() {
    chrome.storage.sync.set({ 'checkboxState': switchElement.checked });
  });

  // Storage redirection
  chrome.storage.sync.get({ selectedOption: 'picuki' }, function(data) {
    const selectedOption = data.selectedOption;
    document.querySelector(`input[value="${selectedOption}"]`).checked = true;
  });

  radioOptions.forEach(function(option) {
    option.addEventListener('change', function() {
      const selectedOption = document.querySelector('input[name="option"]:checked').value;

      chrome.storage.sync.set({ selectedOption: selectedOption });
    });
  });
});

// Communication with the background.js file
function handleSwitchChange() {
  const switchState = document.getElementById('optionSwitch').checked;
  chrome.runtime.sendMessage({ switchState });
}

function handleOptionChange() {
  const selectedOption = document.querySelector('input[name="option"]:checked').value;
  chrome.runtime.sendMessage({ selectedOption });
}
