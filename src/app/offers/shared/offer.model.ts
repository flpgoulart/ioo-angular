export class Offer {

    constructor(
        public id: number, 
        public name: string,
        public brand_name: string,
        public product_id: number,
        public campaign_id: number,
        public disclaimer: string,
        public status: string,
        public unit_measure_id: number,
        public product_value: number,
        public offer_value: number,
        public campaign_name?: string
    ) {

    }
}
