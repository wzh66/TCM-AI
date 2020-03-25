import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [
    {
        path: 'list',
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./list/list.module').then(m => m.DiagnoseListPageModule)
            }
        ]
    },
    {
        path: 'question',
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./question/question.module').then(m => m.DiagnoseQuestionPageModule)
            }
        ]
    },
    {
        path: 'camera',
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./camera/camera.module').then(m => m.DiagnoseCameraPageModule)
            }
        ]
    },
    {
        path: 'result',
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./result/result.module').then(m => m.DiagnoseResultModule)
            }
        ]
    },
    {
        path: 'screenshot',
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./screenshot/screenshot.module').then(m => m.DiagnoseScreenshotPageModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DiagnosePageRoutingModule {
}
