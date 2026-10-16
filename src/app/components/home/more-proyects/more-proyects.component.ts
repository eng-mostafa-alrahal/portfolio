import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';

@Component({
  selector: 'app-more-proyects',
  templateUrl: './more-proyects.component.html',
  styleUrls: ['./more-proyects.component.scss']
})
export class MoreProyectsComponent implements OnInit {

  constructor(
    private router: Router,
    public analyticsService: AnalyticsService
    ) { }

    ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
    }

    onLinkClick(event: Event, eventName: string) {
      event.stopPropagation();
      this.analyticsService.sendAnalyticEvent(eventName, 'proyects', 'click');
    }

    redirect(route: string, event) {
      if (!route) {
        return;
      }
      const id = event && event.target ? event.target.id : '';
      if (id === 'demoLink' || id === 'ghLink') {
        return;
      }
      window.open(route, '_blank', 'noopener,noreferrer');
    }

}
