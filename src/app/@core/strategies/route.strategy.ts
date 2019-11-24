import {RouteReuseStrategy, DefaultUrlSerializer, ActivatedRouteSnapshot, DetachedRouteHandle} from '@angular/router';

export class RouteStrategy implements RouteReuseStrategy {

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // 默认对所有路由复用 可通过给路由配置项增加data: { keep: true }来进行选择性使用
    // {path: 'search', component: SearchComponent, data: {keep: true}},
    return null;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    // 按path作为key存储路由快照&组件当前实例对象
    // path等同RouterModule.forRoot中的配置
  }

  shouldAttach(route: ActivatedRouteSnapshot) {
    // 在路由是login的时候清空缓存
    return null;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    // 从缓存中获取快照，若无则返回null
    return null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot) {
    return null;
  }
}
