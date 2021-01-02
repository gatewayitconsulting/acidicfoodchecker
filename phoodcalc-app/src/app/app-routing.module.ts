import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';
// import { ContactComponent } from './pages/contact/contact.component';
// import { AboutComponent } from './pages/about/about.component';
// import { NewsStoryComponent } from './components/news-story/news-story.component';
// import { NewsComponent } from './pages/news/news.component';


const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled', // To add fragment URL /contact-us#getInTouch = routerLink="/contact-us" fragment="getInTouch"
  scrollOffset: [0, 64],
  enableTracing: true, // <-- debugging purposes only
};

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'contact-us', component: ContactComponent },
  // { path: 'about', component: AboutComponent },
  // { path: 'news/:id', component: NewsStoryComponent },
  // { path: 'news', component: NewsComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, routerOptions)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
