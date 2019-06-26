export class Campaign {

    constructor(
        public id: number, 
        public name: string, 
        public disclaimer: string, 
        public start_date: string, //Date 
        public end_date: string, //Date
        public status: string
    ) {

    }
}
