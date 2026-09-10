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

export function getDataTemplate() {
    return {...dataTemplate}
}

export function getEducationTemplate() {
    return {...educationTemplate}
}

export function getWorkHistoryTemplate() {
    return {...workHistoryTemplate};
}