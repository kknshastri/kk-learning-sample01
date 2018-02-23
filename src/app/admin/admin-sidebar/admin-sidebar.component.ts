import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  // loadQuesSets() {
  //   console.log('loadQuesSets...');
  //   // this.router.navigate(['/adminDashboard/manageSets']);
  // }

  // loadQuestions() {
  //   console.log('loadQuestions...');
  //   this.router.navigate(['/adminDashboard/manageQues']);
  // }

  // loadSections() {
  //   console.log('loadSections...');
  //   this.router.navigate(['/adminDashboard/manageSections']);
  // }

  // loadRelationshipView() {
  //   console.log('loadRelationshipView...');
  //   this.router.navigate(['/adminDashboard/relationView']);
  // }

}
