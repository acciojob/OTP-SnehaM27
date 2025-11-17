const inputs = document.querySelectorAll(".code");

// Focus first box initially
inputs[0].focus();

inputs.forEach((input, index) => {

    input.addEventListener("input", () => {
        input.value = input.value.replace(/[^0-9]/g, "");

        if (input.value && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });

    input.addEventListener("keydown", (e) => {

        // BACKSPACE behavior
        if (e.key === "Backspace") {
            if (input.value === "") {
                if (index > 0) {
                    inputs[index - 1].value = "";
                    inputs[index - 1].focus();
                }
            } else {
                // If there is content, delete it but DO NOT jump immediately
                input.value = "";
            }
        }
    });
});
