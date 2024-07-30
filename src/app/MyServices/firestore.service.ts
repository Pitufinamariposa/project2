import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, addDoc, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Country } from '../MyClasses/country';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private myCollection: CollectionReference<DocumentData>

  constructor(private firestore: Firestore) {
    this.myCollection = collection(this.firestore, "CountriesList")
  }


  getCountries() {
    return collectionData(this.myCollection, {
      idField: 'id'
    }) as Observable<Country[]>
  }


  addCountry(country: Country) {
    addDoc(this.myCollection,{
      name:country.name,
      capital:country.capital,
      region:country.region,
      flag:country.flag,
    })

  }


  deleteCountry(id:string){
    const docRef=doc(this.myCollection,id);
    deleteDoc(docRef)
  }

}
