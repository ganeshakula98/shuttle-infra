import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { ThemeService } from './theme.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SvgComponent } from './svg/svg.component';
import { DroppableDirective } from './droppable.directive';
import { DraggableDirective } from './draggable.directive';
import { SvgTestComponent } from './svg-test/svg-test.component';


export function initializeApp(themeService: ThemeService) {
  return () => themeService.fetchData();
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SvgComponent,
    DroppableDirective,
    DraggableDirective,
    SvgTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [ThemeService],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
