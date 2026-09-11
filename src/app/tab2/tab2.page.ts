import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonTextarea,
} from '@ionic/angular';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList,
    IonItem,
    IonLabel,
    IonCheckbox,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonInput,
    IonTextarea,
  ],
})
export class Tab2Page {
  private readonly taskService = inject(TaskService);
  readonly tasks = this.taskService.tasks;

  title = '';
  subject = '';
  dueDate = '';
  description = '';

  addTask(): void {
    if (!this.title.trim() || !this.subject.trim() || !this.dueDate) {
      return;
    }

    this.taskService.addTask({
      title: this.title.trim(),
      description: this.description.trim(),
      subject: this.subject.trim(),
      dueDate: this.dueDate,
      completed: false,
    });

    this.title = '';
    this.subject = '';
    this.dueDate = '';
    this.description = '';
  }

  toggleTask(id: number): void {
    this.taskService.toggleTask(id);
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }
}
