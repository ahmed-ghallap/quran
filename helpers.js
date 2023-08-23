function display(page) {
    document.querySelector('#main-page').style.display = 'none';
    document.querySelector('#student-page').style.display = 'none';

    document.querySelector(`#${page}-page`).style.display = 'block';
}

function setup() {
    create_suraDb();
    console.log("setup function")
}

// define standerd model.
const student_in_group_model = {
    id: 0,
    count: 0,
    now: [],
    per: []
}
const student_model = {
    id: 0,
    name: null,
    groups: []
}
const group_model = {
    id: 0,
    name: null,
    students: [student_in_group_model],
    day: null
}
const sura_now = {
    sura: 0,
    aya: "1:-, -:-, 20:40"
}

// define the structure of database
if (!localStorage.getItem("table-students")) {
    localStorage.setItem("table-students", JSON.stringify([student_model]));
}
if (!localStorage.getItem("table-groups")) {
    localStorage.setItem("table-groups", JSON.stringify([group_model]));
}
if (!localStorage.getItem("table-sura")) {
    localStorage.setItem("table-sura", '[]');
}
if (!localStorage.getItem('table-quran')) {
        
    fetch('https://api.alquran.cloud/v1/quran/quran-uthmani')
    .then(response => response.json())
    .then(results => {
        localStorage.setItem("table-quran", JSON.stringify(results.data.surahs));
    })
    .catch(error => {
        console.log('error loading quran fiailed');
    });
}


    
function create_student(name) {
    // tested
    // create and save a student.
    // returns the student id.
    const Students = JSON.parse(localStorage.getItem('table-students'));
    const lastId = parseInt(Students.slice(-1)[0].id);
    const tmp = student_model;
    tmp.id = lastId+1;
    tmp.name = name;
    Students.push(tmp);
    
    localStorage.setItem("table-students", JSON.stringify(Students));
    return lastId+1;
}
function create_group(name, day) {
        // tested
        // Create a new group with empty array of students
    const groups = JSON.parse(localStorage.getItem('table-groups'));
    const oldId = parseInt(groups.slice(-1)[0].id);
    const tmp = group_model;
    tmp.name = name;
    tmp.day = day;
    tmp.id = oldId+1;
    groups.push(tmp);
    
    localStorage.setItem("table-groups", JSON.stringify(groups));
    return tmp.id;
}
function create_suraDb() {
    var suras = get_objects_sura();
    if (suras.length >= 113) {
        console.log("suras are already there.")
        return;
    }
    fetch('https://api.quran.com/api/v4/chapters?language=ar')
    .then(response => response.json())
    .then(chapters => {
        console.log("start fetch suras from API");
        chapters.chapters.forEach(chapter => {
            suras.push({name: chapter.name_arabic, id: chapter.id});
        });

        save_objects_sura(suras);
        return;
        })
        .catch(error => {
            console.log("Error: getting suras from API failed");
            console.log(error);
            return;
        });
}


function add_student_to_group(studentId, groupId) {
    // tested
    // add a student to a group using its ids
    const s = get_student_by_id(studentId);
    const g = get_group_by_id(groupId);
    if (!s || !g) {
       console.log(`Error adding ${s} to ${g}, maybe wrong student id or group id`);
       return null;
    }

    
    for (let student of g.students) {
        if (student.id == s.id) {
            console.log(`Erro adding ${s.name} to ${g.name} because he is already exist.`)
            return null
        }
    }

    const tmp = student_in_group_model;
    tmp.id = s.id;
    tmp.count = 0;

    g.students.push(tmp); // add studetn to group.
    s.groups.push(g.id); // add group refrence to student.
   
    const groupsAll = get_objects_groups();
    groupsAll[g.id] = g; // to save into database
    const studentsAll = get_objects_students();
    studentsAll[s.id] = s; // to save into database
   
    save_objects_groups(groupsAll);
    save_objects_students(studentsAll);
    return g;
}


function save_objects_groups(groups) {
    localStorage.setItem("table-groups" ,JSON.stringify(groups))
}
function save_objects_students(students) {
    localStorage.setItem("table-students" ,JSON.stringify(students))
}
function save_objects_sura(sura) {
    localStorage.setItem('table-sura', JSON.stringify(sura));
}


function get_objects_students() {
    // tested 
    // returns array of studets
    return JSON.parse(localStorage.getItem('table-students'));
}
function get_objects_groups() {
    // tested 
    // return array of groups 
    return JSON.parse(localStorage.getItem('table-groups'));
}
function get_objects_sura() {
    // not tested yet
    // return array of suras
    return JSON.parse(localStorage.getItem('table-sura'));
}
function get_objects_quran() {
    return JSON.parse(localStorage.getItem('table-quran'));
}


function get_student_by_id(id) {
    // testd
    // return the student if found.
    // reutrn null if else.
    const students = JSON.parse(localStorage.getItem('table-students'));
    let student = null;
    students.forEach(function(s) {
        if (s.id == id) {
            student = s
            return ;
        }
    });
    
    return student;
}
function get_group_by_id(groupId) {
    // tested
    // return group if found, 
    // return null if not found
    let group =  null;
    JSON.parse(localStorage.getItem('table-groups'))
    .forEach(g => {
        if (g.id === groupId) {
            group = g;
            return;
        }
    });

    return group;
}
function get_sura_by_id(suraId) {
    // not tested
    // return sura object by sura number.
    return get_objects_sura().at(suraId-1);
}

function get_chapter(sura, from=1, to=0) {
    // tested
    // return div containes the sura
    // accepts spcific ayas period.
    const ayahs = get_objects_quran().at(sura-1).ayahs;
    const max = ayahs.length;
    if (to == 0 || to > max)
        to = max;
    const chapter = document.createElement('div');
    for (let i = Math.abs(from-1); i <= to-1; i++) {
        const span = document.createElement('span');
        span.innerHTML = ayahs[i].text + `(${i})`;
        chapter.append(span);
    }
    return chapter;
}


function register_count(studentId, groupId) {
    // tested
    // update student absense registeration count.
    // return studetn's group
    const g = get_group_by_id(groupId);
    g.students.forEach(student => {
        if (student.id == studentId) {
            student.count = parseInt(student.count)+1;
            const groupsAll = get_objects_groups();
            groupsAll[groupId] = g;
            save_objects_groups(groupsAll);
            console.log(`student absence registeration count is ${student.count}`)
            return;
        }
    });
    return g;
}

function edit_student(studentId, groupId, now=[], per=[]) {
    // tested 
    // returns group of edited student.
    const g = get_group_by_id(groupId);
    g.students.forEach(student => {
        if (student.id == studentId) {
            student.now = student.now.concat(now);
            student.per = student.per.concat(per);
            const groupsAll = get_objects_groups();
            groupsAll[groupId] = g;
            save_objects_groups(groupsAll);
            return;
        }
    });
    sura_now
    return g;
}