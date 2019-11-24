import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [

  {
    path: 'list',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./list/list.module').then(m => m.IndustryListPageModule)
      }
    ]
  },
  {
    path: 'item/:id',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./item/item.module').then(m => m.IndustryItemPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndustryRoutingModule {
}
