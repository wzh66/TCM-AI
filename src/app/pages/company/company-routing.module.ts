import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./list/list.module').then(m => m.CompanyListPageModule)
      }
    ]
  },
  {
    path: 'edit/:id',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./edit/edit.module').then(m => m.CompanyEditPageModule)
      }
    ]
  },
  {
    path: 'item/:id',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./item/item.module').then(m => m.CompanyItemPageModule)
      }
    ]
  },
  {
    path: 'analysis/:id',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./analysis/analysis.module').then(m => m.CompanyAnalysisPageModule)
      }
    ]
  },
  {
    path: 'log/:id',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./log/log.module').then(m => m.CompanyLogPageModule)
      }
    ]
  },
  {
    path: 'follow/list/:id',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./follow/list/list.module').then(m => m.CompanyFollowListPageModule)
      }
    ]
  },
  {
    path: 'follow/item/:id',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./follow/item/item.module').then(m => m.CompanyFollowItemPageModule)
      }
    ]
  },
  {
    path: 'case/list/:id',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./case/list/list.module').then(m => m.CompanyCaseListPageModule)
      }
    ]
  },
  {
    path: 'case/item/:id',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./case/item/item.module').then(m => m.CompanyCaseItemPageModule)
      }
    ]
  },
  {
    path: 'qualification/:id',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./qualification/qualification.module').then(m => m.CompanyQualificationPageModule)
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
export class CompanyRoutingModule {
}
