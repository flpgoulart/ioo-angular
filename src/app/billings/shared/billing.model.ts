export class Billing {

    constructor(
        public id: number, 
        public document: string, 
        public doc_date: string, //Date
        public ref_ini_date: string, //Date 
        public ref_end_date: string, //Date
        public link_document: string, 
        public status: string
    ) {

    }
}
