import { Component, DestroyRef } from '@angular/core';
import { combineLatest } from 'rxjs';
import { IUser } from '../../../core/models/interfaces/user.interface';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {

  public displayedColumns: string[];
  public dataSource!: IUser[];

  constructor(private dataService: DataService, private destroy: DestroyRef) {
    this.displayedColumns = this.dataService.displayedColumns;
    combineLatest({
      users: this.dataService.usersList$()
    }).subscribe({
      next: (data) => this.dataSource = data.users,
      error: (err) => console.error(err)
    })

    this.destroy.onDestroy(() => {
      this.dataService.usersList$();
    })
  }
}
