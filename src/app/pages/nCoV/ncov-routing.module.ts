import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [

  {
    path: 'index',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./index/index.module').then(m => m.NCoVIndexPageModule)
      }
    ]
  },
  {
    path: 'list',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./list/list.module').then(m => m.NCoVListPageModule)
      }
    ]
  },
  {
    path: 'item/:id',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./item/item.module').then(m => m.NCoVItemPageModule)
      }
    ]
  },
  {
    path: 'get',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./get/get.module').then(m => m.NCoVGetPageModule)
      }
    ]
  },
  {
    path: 'central',
    children: [
      {
        path: 'list',
        loadChildren: () =>
          import('./central/list/list.module').then(m => m.NCoVCentralListPageModule)
      }
    ]
  },
  {
    path: 'work',
    children: [
      {
        path: 'list',
        loadChildren: () =>
          import('./work/list/list.module').then(m => m.NCoVWorkListPageModule)
      },
      {
        path: 'item/:id',
        loadChildren: () =>
          import('./work/item/item.module').then(m => m.NCoVWorkItemPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NCoVRoutingModule {
}
