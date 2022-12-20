import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserInfoComponent } from './user-info/user-info.component';

const routes: Routes = [{
  path: '', redirectTo:"users", pathMatch: "full",
},
{
  path: 'users' , component: UserInfoComponent,
},
{ path:'**', redirectTo:'users', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
