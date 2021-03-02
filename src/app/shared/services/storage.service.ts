import { switchMap } from 'rxjs/operators';
import { Participant } from './../models/participant.model';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _db: IDBDatabase;
  private _objectStore: IDBObjectStore;
  private _dbObs$: Subject<boolean> = new Subject<boolean>();
  private _version = 0;

  constructor() {}

  buildDB(): Observable<IDBOpenDBRequest> {
    if (this._testSupport()) {
      this._version++;
      return this._handleConnection(this._createConnection());
    }
  }

  getAllData(): Observable<IDBRequest<Participant[]>> {
    return this._dbObs$.pipe(
      switchMap(() =>
        of(
          this._db
            .transaction('Participants', 'readwrite')
            .objectStore('Participants')
            .getAll()
        )
      )
    );
  }

  getData(key: string): Observable<IDBRequest> {
    return of(
      this._db
        .transaction('Participants', 'readwrite')
        .objectStore('Participants')
        .get(key)
    );
  }

  addData(participant: Participant): Observable<IDBRequest> {
    return of(
      this._db
        .transaction('Participants', 'readwrite')
        .objectStore('Participants')
        .add(participant)
    );
  }

  removeData(key: string): Observable<IDBRequest> {
    return of(
      this._db
        .transaction('Participants', 'readwrite')
        .objectStore('Participants')
        .delete(key)
    );
  }

  alterData(
    key: string,
    data: Participant
  ): Observable<IDBRequest<IDBValidKey>> {
    return of(this._objectStore.put(data, key));
  }

  private _testSupport(): boolean {
    if (!window.indexedDB) {
      window.alert(
        'Seu navegador não suporta uma versão estável do IndexedDB.' +
          'Alguns recursos não estarão disponíveis'
      );
      return false;
    } else {
      return true;
    }
  }

  private _createConnection(): IDBOpenDBRequest {
    return window.indexedDB.open('Tournament', this._version);
  }

  private _handleConnection(
    request: IDBOpenDBRequest
  ): Observable<IDBOpenDBRequest> {
    request.onerror = (event) =>
      window.alert('Erro ao abrir o banco de dados' + event);

    request.onsuccess = () => {
      this._db = request.result;
      this._dbObs$.next(true);
    };

    request.onupgradeneeded = () => {
      this._db = request.result;
      const objStore = this._db.createObjectStore('Participants', {
        keyPath: 'phoneNumber',
      });
      objStore.createIndex('phoneNumber', 'phoneNumber', {
        unique: true,
      });
      objStore.transaction.oncomplete = () => this._dbObs$.next(true);
    };

    return of(request);
  }
}
