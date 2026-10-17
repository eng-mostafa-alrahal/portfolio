import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';

interface ImageGesture {
  startX: number;
  startY: number;
  lastX: number;
  lastY: number;
  lastTime: number;
  velocityY: number;
  lock: 'x' | 'y' | null;
  scroller: HTMLElement | null;
}

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.scss']
})
export class ProyectsComponent implements OnInit, AfterViewInit, OnDestroy {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    navSpeed: 700,
    items: 1,
    autoplay: false,
    dots: true,
  }

  @ViewChild('imgContainer') imgContainer: ElementRef;
  @ViewChildren('caseMedia') caseMedia: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren(CarouselComponent) carousels: QueryList<CarouselComponent>;

  private readonly gestures = new WeakMap<HTMLElement, ImageGesture>();
  private readonly axisLockThreshold = 8;
  private readonly slideThreshold = 32;
  private gestureCleanups: Array<() => void> = [];
  private mediaChangesSub?: Subscription;
  private glideFrame = 0;


  constructor(
    public analyticsService: AnalyticsService,
    private zone: NgZone
  ) { }

  ngOnInit(): void {



  }

  ngAfterViewInit(): void {
    this.bindImageGestures();
    this.mediaChangesSub = this.caseMedia.changes.subscribe(() => this.bindImageGestures());
  }

  ngOnDestroy(): void {
    this.mediaChangesSub?.unsubscribe();
    this.unbindImageGestures();
    cancelAnimationFrame(this.glideFrame);
  }

  private bindImageGestures(): void {
    this.unbindImageGestures();
    this.caseMedia.forEach((ref, index) => {
      const el = ref.nativeElement;
      const start = (event: TouchEvent) => this.onImageTouchStart(event, el);
      const move = (event: TouchEvent) => this.onImageTouchMove(event, el);
      const end = (event: TouchEvent) => this.onImageTouchEnd(event, el, index);
      const cancel = () => this.gestures.delete(el);
      el.addEventListener('touchstart', start, { passive: true });
      el.addEventListener('touchmove', move, { passive: false });
      el.addEventListener('touchend', end);
      el.addEventListener('touchcancel', cancel);
      this.gestureCleanups.push(() => {
        el.removeEventListener('touchstart', start);
        el.removeEventListener('touchmove', move);
        el.removeEventListener('touchend', end);
        el.removeEventListener('touchcancel', cancel);
      });
    });
  }

  private unbindImageGestures(): void {
    this.gestureCleanups.forEach((cleanup) => cleanup());
    this.gestureCleanups = [];
  }

  private onImageTouchStart(event: TouchEvent, el: HTMLElement): void {
    cancelAnimationFrame(this.glideFrame);
    if (event.touches.length !== 1) {
      this.gestures.delete(el);
      return;
    }
    const touch = event.touches[0];
    const target = event.target instanceof Element ? event.target : null;
    this.gestures.set(el, {
      startX: touch.clientX,
      startY: touch.clientY,
      lastX: touch.clientX,
      lastY: touch.clientY,
      lastTime: event.timeStamp,
      velocityY: 0,
      lock: null,
      scroller: target?.closest('.img-container') as HTMLElement | null
    });
  }

  private onImageTouchMove(event: TouchEvent, el: HTMLElement): void {
    const gesture = this.gestures.get(el);
    if (!gesture || event.touches.length !== 1) {
      return;
    }
    const touch = event.touches[0];
    const distanceX = Math.abs(touch.clientX - gesture.startX);
    const distanceY = Math.abs(touch.clientY - gesture.startY);

    if (!gesture.lock) {
      if (distanceX < this.axisLockThreshold && distanceY < this.axisLockThreshold) {
        return;
      }
      gesture.lock = distanceX > distanceY ? 'x' : 'y';
    }

    if (event.cancelable) {
      event.preventDefault();
    }

    if (gesture.lock === 'y') {
      const step = touch.clientY - gesture.lastY;
      const elapsed = event.timeStamp - gesture.lastTime || 16;
      gesture.velocityY = step / elapsed;
      this.scrollVertically(gesture.scroller, step);
    }

    gesture.lastX = touch.clientX;
    gesture.lastY = touch.clientY;
    gesture.lastTime = event.timeStamp;
  }

  private onImageTouchEnd(_event: TouchEvent, el: HTMLElement, index: number): void {
    const gesture = this.gestures.get(el);
    this.gestures.delete(el);
    if (!gesture?.lock) {
      return;
    }

    if (gesture.lock === 'x') {
      const distanceX = gesture.lastX - gesture.startX;
      if (Math.abs(distanceX) < this.slideThreshold) {
        return;
      }
      const carousel = this.carousels?.get(index);
      if (!carousel) {
        return;
      }
      this.zone.run(() => {
        if (distanceX < 0) {
          carousel.next();
        } else {
          carousel.prev();
        }
      });
      return;
    }

    if (Math.abs(gesture.velocityY) > 0.35) {
      this.glide(gesture.scroller, gesture.velocityY);
    }
  }

  private scrollVertically(scroller: HTMLElement | null, fingerDeltaY: number): boolean {
    if (!scroller) {
      return false;
    }
    const max = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
    const previous = scroller.scrollTop;
    const next = Math.min(max, Math.max(0, previous - fingerDeltaY));
    if (next === previous) {
      return false;
    }
    scroller.scrollTop = next;
    return true;
  }

  private glide(scroller: HTMLElement | null, velocityPxPerMs: number): void {
    cancelAnimationFrame(this.glideFrame);
    let velocity = velocityPxPerMs;
    let last = performance.now();
    const step = (now: number) => {
      const elapsed = Math.min(32, now - last);
      last = now;
      const moved = this.scrollVertically(scroller, velocity * elapsed);
      velocity *= Math.pow(0.92, elapsed / 16);
      if (moved && Math.abs(velocity) > 0.04) {
        this.glideFrame = requestAnimationFrame(step);
      }
    };
    this.glideFrame = requestAnimationFrame(step);
  }

debug(){

  this.imgContainer.nativeElement.scroll({
    top: this.imgContainer.nativeElement.scrollHeight,
    left: 0,
    behavior: 'smooth',    
  });
}

}
