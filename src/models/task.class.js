
export class Task {
    name = '';
    description = '';
    completed = false;

    constructor(name, description, completed){
        this.name = name;
        this.description = description;
        this.completed = completed;
    }

}