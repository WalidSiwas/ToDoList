class Student {
    constructor(name, dob, matriculation){
    this.name = name;
    this.dob = dob;
    this.matriculation = matriculation;
    }
}


class StudentUI {
    addStudintToList(student) {
        let list = document.getElementById('studint-list');
        let row = document.createElement('tr');
    
        row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.dob}</td>
        <td>${student.matriculation}</td>
        <td><a herf = "#" class = "delete">x</a></td>
        `;

        list.appendChild(row);
    }

    showAlert (message,className) {
        let div = document.createElement("div");
        div.className = `alret ${className}`
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector("#container");
        let form = document.querySelector("#studint-form");
        container.insertBefore(div, form);
    
        setTimeout(function () {
            document.querySelector(".alret").remove();
        },2500);
    }

    clearFileds() {
        document.getElementById('name').value = '';
        document.getElementById('dob').value = '';
        document.getElementById('matriculation').value = '';
    }

    deleteStudent(target) {
        if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
        }
    }

}

// localstorage
class LocalStorage {
    static getStudents() {
        let students;
        if(localStorage.getItem('students') === null) {
            students = [];
        } else {
        students = JSON.parse(localStorage.getItem('students'));
        }

        return students;
    }

    static displayStudents(){
        let students = LocalStorage.getStudents();
        let studentUI = new StudentUI();
        students.forEach(function(student) {
            studentUI.addStudintToList(student);
        });
    }

    static addStudent(student){
        let students = LocalStorage.getStudents();
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));
    }

    static removeStudent(matriculation){
        let students = LocalStorage.getStudents();
        students.forEach(function(student, index) {
            if(student.matriculation = matriculation){
                students.splice(index, 1);
            }
            localStorage.setItem('students', JSON.stringify(students));
            });
    }

}



document.addEventListener('DOMContentLoaded', LocalStorage.displayStudents());


document.getElementById('studint-form').addEventListener('submit', function(e) {
    let name = document.getElementById('name').value;
    let dob = document.getElementById('dob').value;
    let matriculation = document.getElementById('matriculation').value;

    let student = new Student(name, dob, matriculation);
    let studentUI = new StudentUI();

    if (name === "" || dob === "" || matriculation === "") {
        studentUI.showAlert("please fill in all fields", "error");
    } else {
        studentUI.addStudintToList(student);
        LocalStorage.addStudent(student);
        studentUI.clearFileds();
        studentUI.showAlert("student added", "succss");
    }

    e.preventDefault(e);    
});

document.getElementById('studint-list').addEventListener('click', function(e) {
    let studentUI = new StudentUI();
    studentUI.deleteStudent(e.target);
    LocalStorage.removeStudent(e.target.parentElement.previousElementSibling.textContent);
    studentUI.showAlert("student removed!", "succss");

    e.preventDefault();
})