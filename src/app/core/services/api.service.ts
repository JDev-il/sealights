import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, Observable, switchMap, take } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IUser } from '../models/interfaces/user.interface';
import { ICountry } from './../models/interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private countriesSource: BehaviorSubject<ICountry[]> = new BehaviorSubject<ICountry[]>([]);
  private usersSource: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([])

  constructor(private http: HttpClient) {
    this._forkedDataInit();
  }

  public get countries$(): Observable<ICountry[]> {
    return this.countriesSource.asObservable();
  }

  public get users$(): Observable<IUser[]> {
    return this.usersSource.asObservable();
  }

  public addNewCity(city: string, id: number) {
    const country = {
      countryId: id,
      name: city
    }
    this.http.post(`${this._env.url}${this._env.params.post.city}`, country).pipe(
      switchMap(() => {
        return this.http.get<ICountry[]>(`${this._env.url}${this._env.params.get.countries}`);
      })).subscribe(updatedCountries => {
        this.countriesSource.next(updatedCountries);
      });
  }

  public addUser(user: IUser): void {
    this.http.post(`${this._env.url}${this._env.params.post.user}`, user).pipe(
      switchMap(() => {
        return this.http.get<IUser>(`${this._env.url}${this._env.params.get.users}`);
      })).subscribe(users => {
        this.usersSource.next([users]);
      });
  }


  private get _env() {
    return environment.api;
  }

  private _forkedDataInit(): void {
    forkJoin({
      countries: this.http.get<ICountry[]>(`${this._env.url}${this._env.params.get.countries}`),
      users: this.http.get<IUser[]>(`${this._env.url}${this._env.params.get.users}`)
    }).pipe(
      take(1),
      map(data => {
        this.countriesSource.next(data.countries)
        this.usersSource.next(data.users);
      })).subscribe();
  }

}

