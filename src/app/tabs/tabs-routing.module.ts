import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
    {
        path: 'pages',
        component: TabsPage,
        children: [
            {
                path: 'index',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../pages/index/index.module').then(m => m.IndexPageModule)
                    }
                ]
            },
            {
                path: 'news',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../pages/news/news.module').then(m => m.NewsPageModule)
                    }
                ]
            },
            {
                path: 'diagnose',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../pages/diagnose/diagnose.module').then(m => m.DiagnosePageModule)
                    }
                ]
            },
            {
                path: 'record',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../pages/record/record.module').then(m => m.RecordPageModule)
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/pages/index/index',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/pages/index/index',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabsPageRoutingModule {
}
