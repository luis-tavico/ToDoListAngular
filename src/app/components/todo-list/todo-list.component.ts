import { Component, OnInit } from '@angular/core';
import { Task } from './../../models/Task';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  tasks:Task[];
  inputTask:string = "";

  constructor() { }

  ngOnInit(): void {
    this.tasks = [];
  }

  newTask() {
    if (this.inputTask != "") {
      this.tasks.push({
        task: this.inputTask,
        completed: false
      });
      this.inputTask = "";
    } else {
      Swal.fire({ position: 'center', icon:'warning', title:'Warning', text:'Fill in the empty field'});
    }

  }

  taskCheck(index:number) {
    if (this.tasks[index]['completed']) {
      this.tasks[index]['completed'] = false
    } else {
      this.tasks[index]['completed'] = true
    }
  }

  deleteTask(index:number) {
    this.tasks = this.tasks.filter((v, i) => i !== index);

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000 ,
      //timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'Task deleted'
    })

  }

}
