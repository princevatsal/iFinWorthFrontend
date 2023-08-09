import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralDataComponent } from './general-data/general-data.component';
import { FinancialValuesComponent } from './financial-values/financial-values.component';
const routes: Routes = [
  {
    path: '',
    component: GeneralDataComponent,
  },
  {
    path: 'financialvalues',
    component: FinancialValuesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
