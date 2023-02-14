export class Filters{
  constructor(
      public categories?: string[],
      public tags?: string[],
      public startDate?: Date,
      public endDate?: Date,
      public search?: string,
      ){}
}
