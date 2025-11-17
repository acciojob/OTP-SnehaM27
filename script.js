// script.js
window.addEventListener('load', () => {
  const inputs = Array.from(document.querySelectorAll('.code'));

  if (inputs.length === 0) return;

  // Ensure first input is focused after full load (Cypress expects this).
  inputs[0].focus();

  inputs.forEach((input, idx) => {
    // Allow only digits when pasting/typing
    input.addEventListener('input', (e) => {
      const sanitized = input.value.replace(/\D/g, ''); // digits only
      input.value = sanitized.slice(0, 1);

      // move forward if a digit was entered
      if (input.value && idx < inputs.length - 1) {
        inputs[idx + 1].focus();
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace') {
        // stabilize behavior in tests by preventing default navigation
        e.preventDefault();

        // If current has a value -> clear it and move focus to previous
        if (input.value !== '') {
          input.value = '';
          if (idx > 0) {
            inputs[idx - 1].focus();
          } else {
            // stay on first if idx == 0
            inputs[0].focus();
          }
          return;
        }

        // If current is empty -> clear previous and focus it
        if (idx > 0) {
          inputs[idx - 1].value = '';
          inputs[idx - 1].focus();
        }
      } else if (e.key === 'ArrowLeft') {
        // optional: support arrow navigation
        if (idx > 0) inputs[idx - 1].focus();
      } else if (e.key === 'ArrowRight') {
        if (idx < inputs.length - 1) inputs[idx + 1].focus();
      } else {
        // allow only digit keys to proceed normally; ignore other printable keys
        // (Not strictly necessary but helps keep fields clean)
        // Do nothing special here; input event sanitizes.
      }
    });

    // Make clicking a populated field place cursor at end (not critical for tests)
    input.addEventListener('focus', () => {
      // optional: select the content so a new digit replaces the old
      input.select();
    });
  });
});
