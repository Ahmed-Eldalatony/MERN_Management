export enum TaskCategory {
  NoCategory="Not categorized",
  Work="work",
  Shopping="shopping",
  Personal="personal"
}
export class CreateTaskDto {
  userId:number;
  title:string;
  description:string;
  dueDate: Date;
  isCompleted:boolean= false;
  category:TaskCategory = TaskCategory.NoCategory;
}

