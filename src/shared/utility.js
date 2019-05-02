export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value, rules) => {
    let res = null;

    const validation = {
        isValid: true,
        messages: []
    };

    if (rules.required) {
        res = value.trim() !== "" && validation.isValid;

        if (!res) {
            validation.isValid = false;
            validation.messages.push(rules.required.message);
        }
    }

    if (rules.max) {
        res = value.length <= rules.max.rule && validation.isValid;

        if (!res) {
            validation.isValid = false;
            validation.messages.push(rules.max.message);
        }
    }

    if (rules.min) {
        res = value.length >= rules.min.rule && validation.isValid;

        if (!res) {
            validation.isValid = false;
            validation.messages.push(rules.min.message);
        }
    }

    if (rules.isEmail) {
        res =
            /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.exec(value) &&
            validation.isValid;

        if (!res) {
            validation.isValid = false;
            validation.messages.push(rules.isEmail.message);
        }
    }

    return validation;
};

export const validation = props => {
    const rules = {
        required: rule => ({ rule: rule, message: "field is required" }),
        min: min => ({ rule: min, message: `min lenght should be ${min}` }),
        max: max => ({ rule: max, message: `max lenght should be ${max}` }),
        isEmail: rule => ({ rule: rule, message: "Field must be email" })
    };

    try {
        Object.keys(props).map(
            type => (props[type] = rules[type](props[type]))
        );
        return props;
    } catch (error) {
        console.error(error);
    }
};

export const updateForm = props => {
    const { isValid, messages } = checkValidity(
        props.event.target.value,
        props.form[props.inputId].validation
    );

    const updateFormElement = updateObject(props.form[props.inputId], {
        value: props.event.target.value,
        valid: isValid,
        helperText: messages[0],
        touched: true
    });

    const updatedForm = updateObject(props.form, {
        [props.inputId]: updateFormElement
    });

    let formIsValid = true;
    for (let key in updatedForm) {
        formIsValid = updatedForm[key].valid && formIsValid;
    }

    console.log(updatedForm);

    return {
        updatedForm: updatedForm,
        formIsValid
    };
};
