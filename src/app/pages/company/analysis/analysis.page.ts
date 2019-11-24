import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {Title} from '@angular/platform-browser';
import {LoadingService} from '../../../@core/data/loading.service';
/*import {DialogService} from '../../../@core/data/dialog.service';*/
import {DialogService} from '../../../@core/modules/dialog';
import {TabsService} from '../../../tabs/tabs.service';
import {AuthService} from '../../auth/auth.service';
import {CompanyService} from '../company.service';
import {map} from 'rxjs/operators';

import F2 from '@antv/f2/lib/index-all';
import $ from 'jquery';

@Component({
  selector: 'app-company-analysis',
  templateUrl: './analysis.page.html',
  styleUrls: ['./analysis.page.scss']
})

export class CompanyAnalysisPage {
  token = this.authSvc.token();
  id;
  data;
  company;
  brandCount = 0;
  brandList = [];
  patentList = [];
  copyList = [];
  patentCount = 0;
  copyCount = 0;
  brandAnalyse = {
    highRiskCount: 0,
    riskCount: 0
  };
  patentAnalyse = {
    exteriorOpportunityCount: 0,
    inventionOpportunityCount: 0,
    useOpportunityCount: 0
  };
  copyAnalyse = {
    opportunityCount: 0
  };

  exist = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: LocationStrategy,
              private titleSvc: Title,
              private loadingSvc: LoadingService,
              private dialogSvc: DialogService,
              private tabsSvc: TabsService,
              private authSvc: AuthService,
              private companySvc: CompanyService) {
    route.paramMap.pipe(map(params => this.id = params.get('id'))).subscribe(id => {
      this.companySvc.get(this.token.key, this.id).subscribe(res => {
        this.data = res;
        this.company = this.data.company;
        this.companySvc.find(encodeURIComponent('腾讯科技(深圳)有限公司')).subscribe(result => {
          if (result.code === 20000) {
            const brandList = result.data.intellectualPropertyCountDTO.brandCountResult;
            const patentList = result.data.intellectualPropertyCountDTO.patentCountResult;
            const copyList = result.data.intellectualPropertyCountDTO.productCopyRightCountResult;
            this.brandCount = result.data.intellectualPropertyCountDTO.brandCount;
            this.brandAnalyse = result.data.intellectualPropertyCountDTO.brandAnalyseResult;
            this.patentCount = result.data.intellectualPropertyCountDTO.patentCount;
            this.patentAnalyse = result.data.intellectualPropertyCountDTO.patentAnalyseResult;
            this.copyCount = result.data.intellectualPropertyCountDTO.productCopyRight;
            this.copyAnalyse = result.data.intellectualPropertyCountDTO.productCopyRightAnalyseResult;
            brandList.forEach((item) => {
              item.const = 'const';
              if (!item.name) {
                item.name = '其它';
              }
            });
            this.brandList = brandList;
            patentList.forEach((item) => {
              item.const = 'const';
              if (!item.name) {
                item.name = item.key;
              }
            });
            this.patentList = patentList;
            copyList.forEach((item) => {
              item.const = 'const';
              if (!item.name) {
                item.name = item.key;
              }
            });
            this.copyList = copyList;
            setTimeout(() => {
              this.getData(brandList, 'brand');
              this.getData(patentList, 'patent');
              this.getData(copyList, 'copy');
            });
          } else {
            this.exist = false;
            this.dialogSvc.show({content: '数据异常，请联系产品部同事处理，谢谢', cancel: '', confirm: '我知道了'}).subscribe(() => {
              this.location.back();
            });
          }
        });
      });
    });
  }

  ionViewDidEnter() {
    this.titleSvc.setTitle('数据分析');
    this.tabsSvc.set(false);
  }

  getData(dataList, target) {
    const data = dataList;
    const chart = new F2.Chart({
      id: target,
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data);
    chart.coord('polar', {
      transposed: true,
      radius: 0.9,
      innerRadius: 0.5
    });
    chart.axis(false);
    chart.legend(false);
    chart.tooltip(false);
    chart.guide().html({
      position: ['50%', '50%'],
      html: '<div style="text-align: center;width:150px;height: 50px;">\n      <p style="font-size: 12px;color: #999;margin: 0" id="title"></p>\n      <p style="font-size: 18px;color: #343434;margin: 0;font-weight: bold;" id="money"></p>\n      </div>'
    });
    chart.interval().position('const*percent').adjust('stack').color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14']);
    chart.pieLabel({
      sidePadding: 30,
      activeShape: true,
      label1: function label2(data) {
        return {
          text: data.name,
          fill: '#333'
        };
      },
      label2: function label1(data) {
        return {
          text: data.count + ', ' + data.percent + '%',
          fill: '#999',
          fontWeight: 'bold'
        };
      },
      onClick: function onClick(ev) {
        const data = ev.data;
        if (data) {
          $('#title').text(data.name);
          $('#money').text(data.percent);
        }
      }
    });
    chart.render();
  }

  back() {
    this.location.back();
  }
}
