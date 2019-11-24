import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list/:id',
    loadChildren: () =>
      import('./list/list.module').then(m => m.PlanListPageModule)
  },
  {
    path: 'item/:id',
    loadChildren: () =>
      import('./item/item.module').then(m => m.PlanItemPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanRoutingModule {
}
