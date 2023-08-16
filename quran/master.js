// بسم الله

// group -> var students[], const date 
// student -> name, revesion, newPartToMeomrize 

// todo
// 1- display_students(date)
// 2- add&remove(student, date)
// 3- display_student_info(student-name, students)

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

function displayF(names) {
    const nameHolder = document.querySelector('#name-holder');

    for (let person of names.names) {
        const li = document.createElement('li');
        console.log(person)
        li.innerHTML = person;
        nameHolder.append(li);
    }
}


document.addEventListener('DOMContentLoaded', function() {

    if (!localStorage.getItem('names')) {
        displayF({names: ['There is no name']});
    }

    const form = document.querySelector('#name-form');
    const names = document.querySelector('#name-holder');
    form.onsubmit = function() {
        let name = document.createElement('li');
        name.innerHTML = this.name.value;
        // save into memory

        names.append(name);

        return false;
    }

});