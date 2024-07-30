import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../MyServices/firestore.service';
import { Country } from '../../MyClasses/country';

@Component({
  selector: 'app-countries-list',
  standalone: true,
  imports: [],
  templateUrl: './countries-list.component.html',
  styleUrl: './countries-list.component.css'
})
export class CountriesListComponent implements OnInit {

  countries: Country[] = []
  id = ""

  constructor(private firebase: FirestoreService) {

  }

  ngOnInit(): void {
    this.getCoutriesFromFirestore()

  }

  getCoutriesFromFirestore() {
    this.firebase.getCountries().subscribe((data) => {
      //console.log(data)
      this.countries = data.map((c) => {
        const model = new Country()
        model.id = c.id
        model.capital = c.capital
        model.flag = c.flag
        model.name = c.name
        model.region = c.region
        return model
      })
    })

  }

  btnRemoveClick(id: string) {
    //alert(id)
    this.firebase.deleteCountry(id);
  }

}
