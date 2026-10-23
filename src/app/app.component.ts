import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';
import * as AOS from 'aos';
import { Title, Meta } from '@angular/platform-browser';
import { SwUpdate } from '@angular/service-worker';
import { LanguageService } from "src/app/services/language/language.service";

interface GraphNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
  accent: boolean;
}

interface GraphPulse {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'mostafa-alrahal-portfolio';

  @ViewChild('networkCanvas', { static: false }) networkCanvas?: ElementRef<HTMLCanvasElement>;

  private animationFrameId?: number;
  private nodes: GraphNode[] = [];
  private pulses: GraphPulse[] = [];
  private canvasWidth = 0;
  private canvasHeight = 0;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private languageService: LanguageService,
    private swUpdate: SwUpdate
  ) {}

  ngOnInit(): void {
    this.applyAppUpdate();
    this.languageService.initLanguage();

    this.titleService.setTitle("Mostafa Alrahal | Applied AI Engineer — RAG, LLM Applications & Agentic Systems");
    this.metaService.addTags([
      { name: 'keywords', content: 'Mostafa Alrahal, Applied AI Engineer, Generative AI Engineer, RAG, LangGraph, LangChain, Google ADK, FastAPI, Python, Multi-Agent Systems, LLM Backend Engineer' },
      { name: 'description', content: 'Applied AI Engineer (U.S. Permanent Resident; no sponsorship required) building enterprise RAG pipelines, multi-agent LangGraph workflows, and Clean Architecture FastAPI backends in Python.' },
    ]);

    AOS.init({
      once: true,
      offset: 60,
      duration: 800
    });
  }

  ngAfterViewInit(): void {
    this.initNetworkCanvas();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.setupCanvasDimensions();
  }

  private setupCanvasDimensions(): void {
    const canvas = this.networkCanvas?.nativeElement;
    if (!canvas) {
      return;
    }
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
    canvas.width = this.canvasWidth * dpr;
    canvas.height = this.canvasHeight * dpr;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const isMobile = this.canvasWidth < 768;
    const targetCount = isMobile ? 20 : 44;

    if (this.nodes.length === 0) {
      for (let i = 0; i < targetCount; i++) {
        this.nodes.push({
          x: Math.random() * this.canvasWidth,
          y: Math.random() * this.canvasHeight,
          vx: (Math.random() - 0.5) * (isMobile ? 0.28 : 0.38),
          vy: (Math.random() - 0.5) * (isMobile ? 0.28 : 0.38),
          radius: Math.random() * 1.6 + 1.2,
          pulsePhase: Math.random() * Math.PI * 2,
          accent: i % 4 === 0
        });
      }
    } else if (this.nodes.length > targetCount) {
      this.nodes.length = targetCount;
    }
  }

  private initNetworkCanvas(): void {
    if (typeof window === 'undefined' || !this.networkCanvas) {
      return;
    }
    this.setupCanvasDimensions();

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      this.renderFrame();
      return;
    }

    const animate = () => {
      this.renderFrame();
      this.animationFrameId = requestAnimationFrame(animate);
    };
    this.animationFrameId = requestAnimationFrame(animate);
  }

  private renderFrame(): void {
    const canvas = this.networkCanvas?.nativeElement;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    const isMobile = this.canvasWidth < 768;
    const maxDist = isMobile ? 135 : 185;

    for (const node of this.nodes) {
      node.x += node.vx;
      node.y += node.vy;
      node.pulsePhase += 0.02;

      if (node.x < 0) { node.x = this.canvasWidth; }
      if (node.x > this.canvasWidth) { node.x = 0; }
      if (node.y < 0) { node.y = this.canvasHeight; }
      if (node.y > this.canvasHeight) { node.y = 0; }
    }

    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const a = this.nodes[i];
        const b = this.nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * (isMobile ? 0.28 : 0.36);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = a.accent || b.accent
            ? `rgba(56, 189, 248, ${alpha})`
            : `rgba(99, 102, 241, ${alpha * 0.9})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          if (this.pulses.length < (isMobile ? 3 : 6) && Math.random() < 0.0005) {
            this.pulses.push({
              fromIdx: i,
              toIdx: j,
              progress: 0,
              speed: 0.012 + Math.random() * 0.01
            });
          }
        }
      }
    }

    for (let p = this.pulses.length - 1; p >= 0; p--) {
      const pulse = this.pulses[p];
      const from = this.nodes[pulse.fromIdx];
      const to = this.nodes[pulse.toIdx];
      if (!from || !to) {
        this.pulses.splice(p, 1);
        continue;
      }
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > maxDist * 1.15) {
        this.pulses.splice(p, 1);
        continue;
      }

      pulse.progress += pulse.speed;
      if (pulse.progress >= 1) {
        this.pulses.splice(p, 1);
        continue;
      }

      const px = from.x + dx * pulse.progress;
      const py = from.y + dy * pulse.progress;

      ctx.beginPath();
      ctx.arc(px, py, 2.1, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(125, 211, 252, 0.85)';
      ctx.fill();
    }

    for (const node of this.nodes) {
      const glowAlpha = 0.5 + Math.sin(node.pulsePhase) * 0.2;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = node.accent
        ? `rgba(56, 189, 248, ${glowAlpha + 0.3})`
        : `rgba(186, 230, 253, ${glowAlpha + 0.12})`;
      ctx.fill();

      if (node.accent) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3.1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${glowAlpha * 0.28})`;
        ctx.fill();
      }
    }
  }

  private applyAppUpdate(): void {
    if (!this.swUpdate.isEnabled) {
      return;
    }

    this.swUpdate.checkForUpdate();
    this.swUpdate.available.subscribe(() => {
      this.swUpdate.activateUpdate().then(() => document.location.reload());
    });
  }
}
