export class LayoutUtils {

    public constructor() { }

    public formatStatusBil(status: string) {
        if (status == 'P') {
            return 'Pendente';
        } 

        if (status == 'C') {
            return 'Cancelado';
        }

        if (status == 'A') {
            return 'Atrasado';
        }

        if (status == 'O') {
            return 'Pago';
        }
    }



    
}