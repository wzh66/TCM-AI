import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [
    {
        path: 'list',
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./list/list.module').then(m => m.RecordListPageModule)
            }
        ]
    },
    {
        path: 'item/:id',
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./item/item.module').then(m => m.RecordItemPageModule)
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RecordPageRoutingModule {
}
