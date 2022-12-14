import { projects, project_h1, currentInboxToDo } from ".";

const content_div = document.querySelector('.content');

const showTask = (title, description, duedate, priority, number) => {
    let row_div = document.createElement('div');
    row_div.classList.add('row');
    content_div.appendChild(row_div);
    // console.log(number)

    let left_div = document.createElement('div');
    left_div.classList.add('left');
    row_div.appendChild(left_div);


    let header_h2 = document.createElement('h2');
    header_h2.textContent = number + ' ' + title;
    left_div.appendChild(header_h2);

    let description_p = document.createElement('p');
    description_p.textContent = description;
    left_div.appendChild(description_p);


    let right_div = document.createElement('div');
    right_div.classList.add('right');
    row_div.appendChild(right_div);

    let priority_p = document.createElement('p');
    priority_p.textContent =  priority;
    right_div.appendChild(priority_p);

    let date_p = document.createElement('p');
    date_p.textContent = duedate;
    right_div.appendChild(date_p);

    // let checkbox_inp = document.createElement('input');
    // checkbox_inp.type = 'checkbox';
    // right_div.appendChild(checkbox_inp);

    let delete_btn = document.createElement('button');
    delete_btn.textContent = 'Delete';
    right_div.appendChild(delete_btn);

    delete_btn.addEventListener('click', () => {
        row_div.remove();


        // console.log(projects[0].tasks[0].title);
        // console.log(number)

        // projects.filter(t => {
        //     console.log(t.tasks[number - 1]);
        //     console.log(t.tasks);
        // })
        // console.log(projects[0].tasks);
        // projects.filter(t => t.tasks[number - 1] != t.tasks[number - 1]);
        // projects = projects.filter(t => t.tasks[number - 1] != t.tasks[number - 1]);


        if (project_h1.textContent === 'Inbox') {
            delete projects[0].tasks[number - 1];

            let newProject = projects[0].tasks.filter(element => {
                if (Object.keys(element).length !== 0) {
                    return true;
                  }
                
                  return false;
            });

            delete projects[0].tasks;
            projects[0].tasks = newProject;

            localStorage.setItem('inbox', JSON.stringify(projects[0].tasks));
        } else {
            // console.log(projects[number].tasks[number - number])
            let currentIndexProject = parseInt(document.querySelector('.currentProject').textContent.charAt(0));
            // console.log(projects[number])
            // console.log(currentIndexProject);
            // console.log(projects[number].tasks.length)
            delete projects[currentIndexProject].tasks[number - 1];

            let newProject = projects[currentIndexProject].tasks.filter(element => {
                if (Object.keys(element).length !== 0) {
                    return true;
                  }
                  return false;
            });


            delete projects[currentIndexProject].tasks;
            projects[currentIndexProject].tasks = newProject;
            localStorage.setItem(projects[currentIndexProject].title , JSON.stringify(projects[currentIndexProject].tasks));
        }

    })
}

const projects_ul = document.querySelector('.projectsUl');

const showProjects = (projectName, number) => {
    let project_li = document.createElement('li')
    project_li.setAttribute('id', 'projectTitle');
    project_li.classList.add('project' + number);
    project_li.textContent = number + ' ' + projectName;
    projects_ul.appendChild(project_li);

    let currentProject_div = document.querySelector('.currentProject');

    project_li.addEventListener('click', () => {
        deleteTasks()
        currentProject_div.textContent = number + ' ' + projectName;

        let indexOfProject = parseInt(project_li.textContent.charAt(0));

        // console.log(projects[indexOfProject - 1]);
        // console.log(indexOfProject)
        // console.log(projects[indexOfProject - 1].tasks);
        // if (projects[indexOfProject - 1].tasks === '[undefined]') {
            // console.log('none');
        // }
        // console.log(indexOfProject)
        let i = 1;
        projects[indexOfProject].tasks.forEach(task => {
            // console.log(task === undefined);
            // if (task === undefined) {
            if (task.length === 0) {
            } else {
                showTask(task.title, task.description, task.duedate, task.priority, i);
                i++;
            }
        })
    })
}


const deleteTasks = () => {
    let allRows = document.querySelectorAll('.row')
    allRows.forEach(row => { 
        row.remove()
    })
}


export { showTask, showProjects, deleteTasks };