export class Store {

    constructor(
        public id: number, 
        public name: string,
        public store_type_id: number,
        public business_id: number,
        public city_id: number,
        public cep: string,
        public address_name: string,
        public contact_info: string,
        public status: string,
        public store_type_name?: string,
        public business_name?: string,
        public city_name?: string
    ) {

    }
}

