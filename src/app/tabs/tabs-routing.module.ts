import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../pages/auth/auth.guard';
import {TabsPage} from './tabs.page';

const routes: Routes = [
  {
    path: 'pages',
    component: TabsPage,
    children: [
      {
        path: 'company',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/company/company.module').then(m => m.CompanyPageModule)
          }
        ]
      },
      {
        path: 'policy',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/policy/policy.module').then(m => m.PolicyPageModule)
          },
        ]
      },
      {
        path: 'industry',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/industry/industry.module').then(m => m.IndustryPageModule)
          },
        ]
      },
      {
        path: 'plan',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/plan/plan.module').then(m => m.PlanPageModule)
          }
        ]
      },
      {
        path: 'member',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/member/member.module').then(m => m.MemberPageModule)
          }
        ]
      },
      {
        path: 'auth',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/auth/auth.module').then(m => m.AuthPageModule)
          }
        ]
      },
      {
        path: 'nCoV',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/nCoV/ncov.module').then(m => m.NCoVPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/pages/company/list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/pages/company/list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class TabsPageRoutingModule {
}
