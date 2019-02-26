export class User {
    public constructor(
        public name: string,
        public email: string,
        public password: string,
        public passwordConfirmation: string,
        public user_type?: string,
        public id?: number
    ) {}
    
}