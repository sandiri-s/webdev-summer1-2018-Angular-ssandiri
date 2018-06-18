import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SectionServiceClient} from "../services/section.service.client";

@Component({
  selector: 'app-section-viewer',
  templateUrl: './section-viewer.component.html',
  styleUrls: ['./section-viewer.component.css']
})
export class SectionViewerComponent implements OnInit {

  constructor(private service: SectionServiceClient,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.loadSections(params['courseId']));
  }

  sectionName = '';
  maxSeats= "";
  seats = '';
  courseId = '';
  sections = [];
  selectedSection = [];
  loadSections(courseId) {
    this.courseId = courseId;
    this
      .service
      .findSectionsForCourse(courseId)
      .then(sections => this.sections = sections);
  }

  deleteSection(sectionId) {
    this
      .service
      .deleteSection(sectionId)
      .then(() => {
        this.loadSections(this.courseId);
      });
  }

  createSection(sectionName, maxSeats) {
    this
      .service
      .createSection(this.courseId, sectionName, maxSeats)
      .then(() => {
        this.loadSections(this.courseId);
      });
  }

  edit(section) {
    this.sectionName = section.name;
    this.maxSeats = section.maxSeats;
    this.selectedSection = section._id;
  }

  // enroll(section) {
  //   // alert(section._id);
  //   this.service
  //     .enrollStudentInSection(section._id)
  //     .then(() => {
  //       this.router.navigate(['profile']);
  //     });
  // }

  ngOnInit() {
  }

}
