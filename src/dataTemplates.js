const dataTemplate = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    education: [], // Stored as [{id: x, education: education{...}}, ...]
    workHistory: [] // Stored as [{id: x, workHistory: workHistory{...}}, ...]
}

const educationTemplate = {
    at: '',
    stateDate: '',
    endDate: '',
    educationLevel: '',
    educationTitle: ''
}

const workHistoryTemplate = {
    company: '',
    position: '',
    startDate: '',
    endDate: ''
}

export function deepCopyData(data) {
    let newData = {...data};

    let workHistory = [];
    data.workHistory.forEach(element => {
        workHistory.push({
            id: element.id,
            workHistory: {...element.workHistory}
        });
    });

    let education = [];
    data.education.forEach(element => {
        education.push({
            id: element.id,
            education: {...element.education}
        });
    });

    newData.workHistory = workHistory;
    newData.education = education;

    return newData;
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