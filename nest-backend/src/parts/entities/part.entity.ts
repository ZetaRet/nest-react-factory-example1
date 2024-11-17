export interface PartInterface {
  id?: number;
  name: string;
  type: string;
  model: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Part implements PartInterface {
  public id?: number;
  public name: string;
  public type: string;
  public model: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}
