import {Component, OnInit} from '@angular/core';
import {DateService} from '../shared/date.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Task, TasksService} from '../shared/tasks.service';
import {switchMap} from 'rxjs/operators';
import {Events, EventService} from '../shared/event.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.sass']
})
export class OrganizerComponent implements OnInit {

  form: FormGroup;

  tasks: Task[] = [];

  events: Events[] = [];

  constructor(private dataService: DateService, private taskService: TasksService, private eventService: EventService) {
  }

  ngOnInit() {
    this.dataService.date.pipe(
      switchMap(value => this.taskService.load(value))
    ).subscribe(tasks => {
      this.tasks = tasks;
      console.log('DataSerivceDatePipe', this.tasks);
    });

    // this.eventService.date.pipe(
    //   switchMap(value => this.eventService.load(value))
    // ).subscribe(events => {
    //   this.events = events;
    //   console.log('EventServiceDatePipe',this.events);
    // });

    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    });
    console.log('OnInit', this.tasks);
  }

  submit() {
    const {title} = this.form.value;

    const task: Task = {
      title,
      date: this.dataService.date.value.format('DD-MM-YYYY')
    };

    this.taskService.create(task).subscribe(task => {
      this.tasks.push(task);
      this.form.reset();
      console.log(this.tasks.length);
    }, error => console.error(error));
  }

  removeTask(task: Task) {
    this.taskService.remove(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id); console.log(task.id);
    }, error => console.error(error));
  }
}
