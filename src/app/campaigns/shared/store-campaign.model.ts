export class StoreCampaign {

    constructor(
        public id: number, 
        public store_id: number, 
        public campaign_id: number, 
        public status: string,
        public store_name: string
    ) {

    }
}
