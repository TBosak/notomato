export class Task{
    constructor(
        public id?: number,
        public category?: string,
        public tag?: string,
        public description?: string,
        public status?: string,
        public createdAt?: Date,
        public updatedAt?: Date,
        public duration?: number,
    ){}
}
