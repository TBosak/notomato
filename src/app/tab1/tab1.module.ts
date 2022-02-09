/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { CountdownConfig, CountdownGlobalConfig, CountdownModule } from 'ngx-countdown';
import { ChronographComponent } from '../chronograph/chronograph.component';
import { PipesModule } from '../pipes.module';

export function countdownConfigFactory(): CountdownConfig {
  return {};
}
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    CountdownModule,
    PipesModule
  ],
  providers: [{ provide: CountdownGlobalConfig, useFactory: countdownConfigFactory }],
  declarations: [Tab1Page, ChronographComponent]
})
export class Tab1PageModule {}
