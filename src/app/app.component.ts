import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { Title, Meta } from '@angular/platform-browser';
import { SwUpdate } from '@angular/service-worker';
import { LanguageService } from "src/app/services/language/language.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mostafa-alrahal-portfolio';

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private languageService: LanguageService,
    private swUpdate: SwUpdate
  ) {
  }
  ngOnInit(): void {
    this.applyAppUpdate();

    this.languageService.initLanguage()

    this.titleService.setTitle("Mostafa Alrahal | GenAI Engineer | Production LLMs | RAG Specialist | Angular Developer");
    this.metaService.addTags([
      { name: 'keywords', content: 'Frontend, MEAN Stack Developer , MERN Stack Development , Software Engineer, software, developer' },
      { name: 'description', content: 'As a software engineer with expertise in both MEAN and MERN stacks, I have a comprehensive understanding of full-stack web development. My strong foundation in JavaScript allows me to effectively work with front-end technologies such as Angular and React, as well as back-end technologies such as Node.js and Express.' },
    ]);
    
    AOS.init();
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
