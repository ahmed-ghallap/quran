function display(page) {
    document.querySelector('#main-page').style.display = 'none';
    document.querySelector('#student-page').style.display = 'none';

    document.querySelector(`#${page}-page`).style.display = 'block';
}

let ahmed = {
    name: "احمد غلاب",
    revesion: "ق",
    newQ: "البقرة"
}

let ali = {
    name: "يوسف علاء",
    revesion: "ق",
    newQ: "البقرة"
}

let mohamed = {
    name: "يحي احمد",
    revesion: "ق",
    newQ: "البقرة"
}


let group1 = {
    students: [ali, ahmed, mohamed],
    name: "مجموعة1"
}
let group2 = {
    students: [ali, ahmed, mohamed],
    name: "مجموعة2"
}
let group3 = {
    students: [ali, ahmed, mohamed],
    name: "مجموعة3"
}

let groups = {
    all: [group1, group2, group3]
}

function setup() {
    const allGroups = groups.all
    const options = document.querySelector('#groups');
    
    allGroups.forEach(function(group) {
        const option = document.createElement('option');
        option.value, option.innerHTML = group.name;
        // option.addEventListener('click')
        options.append(option);
    });
}
