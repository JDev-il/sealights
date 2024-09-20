import { HeaderComponent } from "../../core/components/header/header.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { AddressComponent } from "./add-user/address/address.component";
import { LayoutComponent } from "./layout/layout.component";
import { DialogComponent } from "./reusable/dialog/dialog.component";

import { UsersListComponent } from "./users-list/users-list.component";

export const CoreComponents = [
  HeaderComponent
]

export const SharedComponents = [
  LayoutComponent,
  AddUserComponent,
  UsersListComponent,
  AddressComponent,
  DialogComponent
]
