import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss']
})
export class HomeContentComponent implements OnInit {

  showCreateSectionForm = false;

  constructor() { }

  ngOnInit() {
  }

  toggleCreateSectionForm() {
    this.showCreateSectionForm = !this.showCreateSectionForm;
  }

}
