import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../MyServices/country.service';
import { Country } from '../../MyClasses/country';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirestoreService } from '../../MyServices/firestore.service';


@Component({
  selector: 'app-plan-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './plan-trip.component.html',
  styleUrl: './plan-trip.component.css'
})
export class PlanTripComponent implements OnInit {
  public countries: Country[] = []

  public country: Country;

  showInfoForm = false

  countryName = ""

  constructor(private countryService: CountryService, private firebase: FirestoreService) {
    this.country = new Country();

  }

  ngOnInit(): void {

    this.countryService.getJSON("https://restcountries.com/v3.1/all").subscribe(
      {
        next: (data) => {
          this.countries = data.map((c: any) => {
            const country = new Country()
            country.name = c.name.common
            country.capital = c.capital
            country.region = c.region
            country.flag = c.flags.png
            return country
          })
          //console.log(this.countries)
        },
        error: err => {
          console.log(err)
        }
      })

  }

  btnInfoClick(c: Country) {
    //alert(c.capital);
    this.country = c;
    this.showInfoForm = true;
  }

  btnShowInfoClick() {
    //alert(this.countryName)
    this.showInfoForm = true;
    this.countryService.getJSON("https://restcountries.com/v3.1/name/" + this.countryName
    ).subscribe({
      next: (data) => {
        this.country = new Country();
        this.showInfoForm = false;
        if (data) {
          if (data.length > 0) {
            this.country = {
              id:"",
              name: data[0].name.common,
              capital: data[0].capital == undefined ? '' : data[0].capital[0],
              region: data[0].region,
              flag: data[0].flags.png
            }
            this.showInfoForm = true;
          }
        }
      },
    })
  }

  btnAcceptClick() {
   

    this.firebase.addCountry(this.country)

  }


}
