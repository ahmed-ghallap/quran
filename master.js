// بسم الله

// groups[] of group
// group -> var students[], const date 
// student -> name, revesion, newPartToMeomrize 

// todo
// 1- display_students(date)
// 2- add&remove(student, date)
// 3- display_student_info(student-name, students)



function display_group(groupName) {
    const allGroups = groups.all
    const options = document.querySelector('$all-groups');
    
    allGroups.forEach(function(group) {
        const option = document.querySelector('option');
        option.value = group.name;
        options.append(option);
    });
    
}

function display_students(names) {
    const nameHolder = document.querySelector('#student-page');
    nameHolder.innerHTML = '';

    for (let person of names.all) {
        const li = document.createElement('li');
        console.log(person)
        li.innerHTML = person;
        nameHolder.append(li);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setup();

    if (!localStorage.getItem('names')) {
        localStorage.setItem("names", JSON.stringify({all: []}));
    }

    // console.log(JSON.parse(localStorage.getItem('names')));
    display_students(JSON.parse(localStorage.getItem("names")));
    
    const form = document.querySelector('#name-form');
    form.onsubmit = function() {
        // save into memory
        let olds = JSON.parse(localStorage.getItem('names'));
        olds = olds.all;
        olds.push(this.name.value);
        this.name.value = '';
        // console.log(olds)
        const news = {all: olds};
        localStorage.setItem('names', JSON.stringify(news));
        

        
        display_students(JSON.parse(localStorage.getItem('names')));
        return false;
    }
    
});