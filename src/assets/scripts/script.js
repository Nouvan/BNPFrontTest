class WizardComponent {
    questionsList = {
        "capital-maker": [
            {
                questionLabel: "Question 2",
                inputType: "select",
                stepLabel: "02. Question2",
                stepText: "Lorem Ipsum Dolor Ister Exxeria Domma Supera",
                options: [
                    {
                        display: "Option1",
                        value: "option1",
                    },
                    {
                        display: "Option2",
                        value: "option2",
                    },
                    {
                        display: "Option3",
                        value: "option3",
                    },
                ],
            },
            {
                questionLabel: "Question 3",
                inputType: "radio",
                stepLabel: "03. Question3",
                stepText: "Lorem Ipsum Dolor Ister Exxeria Domma Supera",
                options: [
                    {
                        display: "Oui",
                        value: "oui",
                    },
                    {
                        display: "Non",
                        value: "non",
                    },
                ],
            },
            {
                questionLabel: "Question 3",
                inputType: "radio",
                stepLabel: "03. Question3",
                stepText: "Lorem Ipsum Dolor Ister Exxeria Domma Supera",
                options: [
                    {
                        display: "Oui",
                        value: "oui",
                    },
                    {
                        display: "Non",
                        value: "non",
                    },
                ],
            },
            {
                questionLabel: "Question 3",
                inputType: "radio",
                stepLabel: "03. Question3",
                stepText: "Lorem Ipsum Dolor Ister Exxeria Domma Supera",
                options: [
                    {
                        display: "Oui",
                        value: "oui",
                    },
                    {
                        display: "Non",
                        value: "non",
                    },
                ],
            },
            {
                questionLabel: "Question 3",
                inputType: "radio",
                stepLabel: "03. Question3",
                stepText: "Lorem Ipsum Dolor Ister Exxeria Domma Supera",
                options: [
                    {
                        display: "Oui",
                        value: "oui",
                    },
                    {
                        display: "Non",
                        value: "non",
                    },
                ],
            },
            {
                questionLabel: "Question 3",
                inputType: "radio",
                stepLabel: "03. Question3",
                stepText: "Lorem Ipsum Dolor Ister Exxeria Domma Supera",
                options: [
                    {
                        display: "Oui",
                        value: "oui",
                    },
                    {
                        display: "Non",
                        value: "non",
                    },
                ],
            },
            {
                questionLabel: "Question 3",
                inputType: "radio",
                stepLabel: "03. Question3",
                stepText: "Lorem Ipsum Dolor Ister Exxeria Domma Supera",
                options: [
                    {
                        display: "Oui",
                        value: "oui",
                    },
                    {
                        display: "Non",
                        value: "non",
                    },
                ],
            },
        ],
    };
    question = [];
    question = "capital-maker";
    questionLength = 1;
    questionStep = 0;

    contructor() {}

    addEventListenerOnTypeQuestion() {
        const listInput = document.getElementsByClassName("wizard-form--input");

        for (let input of listInput) {
            input.addEventListener("click", this.changeQuestions());
        }
    }

    changeQuestions() {}

    createInputs() {
        this.questions = this.questionsList[this.question];
        this.questionLength = this.questions.length + 1;
        this.questionStep = 0;

        let subQuestions = document.getElementById("wizard-subquestions");
        subQuestions.innerHTML = "";

        this.questions.forEach((question, index) => {
            let questionWrapper = document.createElement("div");
            questionWrapper.classList.add("wizard-form--bloc");

            let questionLabel = document.createElement("div");
            questionLabel.classList.add("wizard-form--question");
            questionLabel.innerHTML = question.questionLabel;

            let questionInput = document.createElement("div");
            questionInput.classList.add("wizard-form--input");

            let input = this.getInputDOM(
                question.inputType,
                index + 1,
                question.options
            );
            questionInput.appendChild(input);

            questionWrapper.appendChild(questionLabel);
            questionWrapper.appendChild(questionInput);

            subQuestions.appendChild(questionWrapper);
        });

        this.setPieWording(this.questions[0]);
    }

    getInputDOM(type, index, options) {
        switch (type) {
            case "select":
                return this.getInputDOMSelect(index, options);
                break;
            case "radio":
                return this.getInputDOMRadio(index, options);
                break;
        }
    }

    getInputDOMSelect(index, options) {
        let input = document.createElement("select");
        input.setAttribute("question", index);
        input.addEventListener("change", (event) =>
            this.updatePercentage(event)
        );

        let defaultOpt = document.createElement("option");
        defaultOpt.appendChild(
            document.createTextNode("Veuillez choisir une option")
        );
        defaultOpt.setAttribute("disabled", "disabled");
        defaultOpt.setAttribute("selected", "selected");
        input.appendChild(defaultOpt);

        for (let option of options) {
            let opt = document.createElement("option");
            opt.appendChild(document.createTextNode(option.display));
            opt.value = option.value;

            input.appendChild(opt);
        }

        return input;
    }

    getInputDOMRadio(index, options) {
        let inputList = document.createElement("div");

        for (let option of options) {
            let radioDiv = document.createElement("div");
            radioDiv.className = "input-radio";

            let radio = document.createElement("input");
            radio.setAttribute("type", "radio");
            radio.setAttribute("name", `question-${index}`);
            radio.setAttribute("value", option.value);
            radio.setAttribute("id", `question-${index}-${option.value}`);

            let label = document.createElement("label");
            label.setAttribute("question", index);
            label.setAttribute("for", `question-${index}-${option.value}`);
            label.addEventListener("click", (event) =>
                this.updatePercentage(event)
            );
            label.appendChild(document.createTextNode(option.display));

            radioDiv.appendChild(radio);
            radioDiv.appendChild(label);

            inputList.appendChild(radioDiv);
        }

        return inputList;
    }

    setPieWording(question) {
        document.getElementById("wording-title").innerHTML = question.stepLabel;
        document.getElementById("wording-text").innerHTML = question.stepText;
    }

    updatePercentage(event) {
        let questionID = event.target.getAttribute("question");
        if (questionID > this.questionStep) {
            this.questionStep = questionID;

            let percentage = Math.floor(
                (this.questionStep / this.questionLength) * 100
            );

            document.getElementById("percentage").innerHTML = percentage;
            document.getElementById(
                "percentage-pie"
            ).className = `pie-wrapper progress-${percentage}`;

            if (this.questionStep < this.questionLength) {
                this.setPieWording(this.questions[questionID]);
            }

            let wizardstep = (document.getElementById(
                "wizard-step"
            ).style.marginTop = `${this.questionStep * 170}px`);
        }
    }
}

const wizard = new WizardComponent();
wizard.createInputs();
