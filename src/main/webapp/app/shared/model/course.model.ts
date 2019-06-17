export interface ICourse {
  id?: string;
  name?: string;
}

export class Course implements ICourse {
  constructor(public id?: string, public name?: string) {}
}
