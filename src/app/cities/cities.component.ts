import { Component, OnInit } from "@angular/core";

import { City } from "./shared/city.model";
import { CityService } from "./shared/city.service";

@Component({
    selector: 'cities',
    templateUrl: './cities.component.html'
})

export class CitiesComponent implements OnInit {
    public cities: Array<City>;
    public newCity: City;

    public constructor(private cityService: CityService){
        this.newCity = new City(null,'',null,null,'');
    }


    public ngOnInit(){
        this.cityService.getAll()
            .subscribe(
                cities => this.cities = cities.sort((a, b) => b.id - a.id),
                error => alert("Ocorreu um erro no servidor")
            )
    }


    public createCity(){
        this.newCity.name = this.newCity.name.trim();

        if (!this.newCity.name) {
            alert("A Cidade deve ter um nome!")
        } else {
            this.cityService.create(this.newCity)
                .subscribe(
                    (city) => {
                        this.cities.unshift(city); 
                        this.newCity = new City(null, '', null, null, '');
                    },
                    () => alert("Ocorreu um erro no servidor, tente mais tarde.")
                )
        }

    }


    public deleteCity(city: City){
        if (confirm(`Deseja realmente excluir a cidade "${city.name}"`)) {
            this.cityService.delete(city.id)
                .subscribe(
                    () => this.cities = this.cities.filter(t => t !== city),
                    () => alert("Ocorreu um erro no servidor, tente mais tarde!")
                )
        }
    }

}

