import {Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {IonContent} from '@ionic/angular';
import {IonList} from '@ionic/angular';
import {TabsService} from '../../../tabs/tabs.service';
import {AuthService} from '../../auth/auth.service';
import {MapService} from '../../../@core/data/map.service';
import {NCoVService} from '../ncov.service';
import {WxService} from '../../../@core/modules/wx/wx.service';
import * as echarts from 'echarts';

import {DATA} from '../../../@core/data/cn';

declare const require: any;

@Component({
  selector: 'app-nCoV-list',
  templateUrl: 'index.page.html',
  styleUrls: ['index.page.scss']
})
export class NCoVIndexPage implements AfterViewInit {
  mapLoaded = false;
  options;
  data;
  centrals;
  works;
  time = new Date();
  statistics = {
    policyCount: 0,
    proviceCount: 0,
    consultCount: 0
  };
  state = 'map';
  @ViewChild(IonContent, {static: true}) private content: IonContent;
  @ViewChild('map', {static: true}) private map: ElementRef;
  @ViewChild('list', {static: true}) private list: ElementRef;
  @ViewChild('central', {static: true}) private central: ElementRef;
  @ViewChild('work', {static: true}) private work: ElementRef;

  constructor(private title: Title,
              private tabsSvc: TabsService,
              private wxSvc: WxService,
              private authSvc: AuthService,
              private mapSvc: MapService,
              private nCoVSvc: NCoVService) {
  }

  ngAfterViewInit() {
    console.log(this.content);
  }

  ionViewDidEnter() {
    this.title.setTitle('疫情期间扶持政策查询');
    this.tabsSvc.set(false);
    const items = [];
    this.mapSvc.get().subscribe(geo => {
      // hide loading:
      this.nCoVSvc.get().subscribe(res => {
        this.statistics.policyCount = res.policyCount;
        this.statistics.proviceCount = res.proviceCount;
        this.statistics.consultCount = res.consultCount;
        let max = 0;
        let value = 0;
        res.list.forEach(item => {
          item.province = item.province
          .replace('省', '')
          .replace('市', '')
          .replace('自治区', '')
          .replace('壮族', '')
          .replace('维吾尔', '')
          .replace('回族', '')
          .replace('特别行政区', '');
          if (item.policyCount > max) {
            max = item.policyCount;
          }
          if (item.province === '全国') {
            value = value + item.policyCount;
          }
          items.push({
            name: item.province,
            value: item.policyCount
          });
        });
        max = max + value;
        DATA.forEach(item => {
          let exist = false;
          items.forEach(i => {
            if (item.name === i.name) {
              exist = true;
            }
          });
          if (!exist) {
            items.push({
              name: item.name
              .replace('省', '')
              .replace('市', '')
              .replace('自治区', '')
              .replace('壮族', '')
              .replace('维吾尔', '')
              .replace('回族', '')
              .replace('特别行政区', ''),
              value
            });
          }
        });
        console.log(items);
        this.mapLoaded = true;
        // register map:
        echarts.registerMap('china', geo);
        // update options:
        this.options = {
          title: {
            show: false
          },
          tooltip: {
            show: false
          },
          toolbox: {
            show: false
          },
          visualMap: {
            min: 0,
            max,
            text: ['高', '低'],
            realtime: false,
            calculable: true

          },
          series: [
            {
              name: '香港18区人口密度',
              type: 'map',
              mapType: 'china', // map type should be registered
              itemStyle: {
                normal: {label: {show: false, fontSize: 8}},
                emphasis: {label: {show: true}}
              },
              data: items
            }
          ]
        };
      });
    });
    this.nCoVSvc.list({}).subscribe(res => {
      this.data = res.list.slice(0, 3);
    });

    this.nCoVSvc.central({}).subscribe(res => {
      this.centrals = res.list.slice(0, 3);
    });
    this.nCoVSvc.work({}).subscribe(res => {
      this.works = res.list.slice(0, 3);
    });
    this.wxSvc.config({
      title: '',
      desc: '',
      link: '',
      imgUrl: ''
    }).then(() => {
      console.log('注册成功');
      // 其它操作，可以确保注册成功以后才有效
      // this.status = '注册成功';
    }).catch((err: string) => {
      console.log(`注册失败，原因：${err}`);
      // this.status = `注册失败，原因：${err}`;
    });
  }

  scrollTo(state, y) {
    const element = this[state].nativeElement || this[state].el;
    this.state = state;
    this.content.scrollToPoint(null, element.offsetTop, 500).then();
  }

  share() {
    this.wxSvc.config({
      title: '',
      desc: '',
      link: '',
      imgUrl: ''
    }).then(() => {
      console.log('注册成功');
      // 其它操作，可以确保注册成功以后才有效
      // this.status = '注册成功';
    }).catch((err: string) => {
      console.log(`注册失败，原因：${err}`);
      // this.status = `注册失败，原因：${err}`;
    });
    this.wxSvc.show({}).subscribe(res => {
      console.log(res);
    });
  }
}
