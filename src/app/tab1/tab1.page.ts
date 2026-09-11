import { Component, computed, inject } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from '@ionic/angular';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
  ],
})
export class Tab1Page {
  private readonly taskService = inject(TaskService);
  readonly tasks = this.taskService.tasks;

  readonly totalTasks = computed(() => this.tasks().length);
  readonly pendingTasks = computed(() => this.tasks().filter((task) => !task.completed).length);
  readonly completedTasks = computed(() => this.tasks().filter((task) => task.completed).length);
  readonly nextTask = computed(() =>
    this.tasks()
      .filter((task) => !task.completed)
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate))[0]
  );
}
