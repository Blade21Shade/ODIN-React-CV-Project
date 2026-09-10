const dataTemplate = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    education: [],
    workHistory: []
}

const educationTemplate = {
    at: '',
    stateDate: '',
    endDate: '',
    educationLevel: '',
    educationTitle: ''
}

const workHistoryTemplate = {
    companyName: '',
    positionTitle: '',
    startDate: '',
    endDate: ''
}

function getDataTemplate() {
    return {...dataTemplate}
}

function getEducationTemplate() {
    return {...educationTemplate}
}

function getWorkHistoryTemplate() {
    return {...workHistoryTemplate};
}