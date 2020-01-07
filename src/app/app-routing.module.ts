import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  // { path: '', loadChildren: './registration-form/registration-form.module#RegistrationFormPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  {
    path: 'registration-form',
    loadChildren: () => import('./registration-form/registration-form.module').then( m => m.RegistrationFormPageModule)
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./my-profile/my-profile.module').then( m => m.MyProfilePageModule)
  },
  {
    path: 'warning',
    loadChildren: () => import('./warning/warning.module').then( m => m.WarningPageModule)
  },
  {
    path: 'chat-ivr',
    loadChildren: () => import('./chat-ivr/chat-ivr.module').then( m => m.ChatIvrPageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./otp/otp.module').then( m => m.OtpPageModule)
  },
  {
    path: 'neighbour',
    loadChildren: () => import('./neighbour/neighbour.module').then( m => m.NeighbourPageModule)
  },
  {
    path: 'safety-measures',
    loadChildren: () => import('./safety-measures/safety-measures.module').then( m => m.SafetyMeasuresPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
