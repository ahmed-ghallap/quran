// بسم الله

// groups[] of group
// group -> var students[], const date 
// student -> name, revesion, newPartToMeomrize 

// todo
// 1- display_students(date)
// 2- add&remove(student, date)
// 3- display_student_info(student-name, students)

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}


document.addEventListener('DOMContentLoaded', function() {


    setup();
    display('group');
    message("مرحبا يا صدقي العزيز", 0);

    // add student into database
    document.querySelector('#student-form').onsubmit = function() {
        create_student(this.name.value, this.age.value, this.phone.value);
        message('تم تسجيل الطالب بنجاح', 0);
        this.name.value = this.age.value = this.phone.value = '';
        return false;
    }


    // display all studets;
    const studentsCan = document.querySelector('#students');
    studentsCan.innerHTML = '';
    get_objects_students().forEach(student => {
        const tmp = document.createElement('div');
        tmp.innerHTML = student.name;
        studentsCan.append(tmp);
    });

    //diplay all groups.
    const groupsCan = document.querySelector('#groups');
    groupsCan.innerHTML = '';
    get_objects_groups().forEach(group => {
        const tmp = document.createElement('div');
        tmp.innerHTML = group.name;
        groupsCan.append(tmp);
    });

    
    document.querySelector('#get-sura').onsubmit = function(form) {
        document.querySelector('#quran').innerHTML =
        get_chapter(this.sura.value, this.from.value, this.to.value).innerHTML;
        return false;
        
    }



});