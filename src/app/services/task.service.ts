import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly storageKey = 'studyflow_tasks';

  private readonly initialTasks: Task[] = [
    {
      id: 1,
      title: 'Completar proyecto de Ionic',
      description: 'Terminar las vistas principales y documentar el proyecto.',
      subject: 'Programación Móvil II',
      dueDate: '2026-09-11',
      completed: false,
    },
    {
      id: 2,
      title: 'Estudiar Angular',
      description: 'Repasar componentes, rutas, servicios e interfaces.',
      subject: 'Programación Móvil II',
      dueDate: '2026-09-13',
      completed: false,
    },
    {
      id: 3,
      title: 'Preparar exposición',
      description: 'Preparar una explicación breve del funcionamiento de la app.',
      subject: 'Proyecto',
      dueDate: '2026-09-15',
      completed: true,
    },
  ];

  readonly tasks = signal<Task[]>(this.loadTasks());

  private loadTasks(): Task[] {
    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : this.initialTasks;
  }

  private saveTasks(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasks()));
  }

  addTask(task: Omit<Task, 'id'>): void {
    const newTask: Task = {
      ...task,
      id: Date.now(),
    };
    this.tasks.update((tasks) => [newTask, ...tasks]);
    this.saveTasks();
  }

  toggleTask(id: number): void {
    this.tasks.update((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    this.saveTasks();
  }

  deleteTask(id: number): void {
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));
    this.saveTasks();
  }

  resetData(): void {
    this.tasks.set(this.initialTasks);
    this.saveTasks();
  }
}
