import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SectionServiceClient} from "../services/section.service.client";
import {Section} from "../models/section.model.client";
import {CourseServiceClient} from "../services/course.service.client";

@Component({
  selector: 'app-section-viewer',
  templateUrl: './section-viewer.component.html',
  styleUrls: ['./section-viewer.component.css']
})
export class SectionViewerComponent implements OnInit {

  constructor(private service: SectionServiceClient,
              private courseService: CourseServiceClient,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.loadSections(params['courseId']));
  }

  sectionName = '';
  maxSeats= "";
  seats = '';
  courseId = '';
  courseName='';
  sections = [];
  selectedSection :Section;
  loadSections(courseId) {
    this.courseId = courseId;
    this
      .service
      .findSectionsForCourse(courseId)
      .then(sections => this.sections = sections).then(() => {this.sectionName = "";
      this.maxSeats = "";});
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
    if(sectionName==="" ){

      this.sectionName = this.courseName + " Section " + (this.sections.length + 1).toString();
    }
    if(this.maxSeats==="" ){

      this.maxSeats = "50"
    }

    this
      .service
      .createSection(this.courseId, this.sectionName, this.maxSeats)
      .then(() => {
        this.loadSections(this.courseId);
      }).then(() => {this.sectionName = "";
      this.maxSeats = ""; this.seats = "";});
  }

  updateSection(newName, newSeats) {
    const newRem = newSeats - this.selectedSection.maxSeats + this.selectedSection.seats;
    this
      .service
      .updateSection(this.selectedSection._id, newName, newSeats, newRem)
      .then(() => {
        this.loadSections(this.courseId);
      }).then(() => {this.sectionName="";
      this.maxSeats="";  this.seats = ""; });
  }

  editSection(section) {
    this.sectionName = section.name;
    this.maxSeats = section.maxSeats;
    this.seats = section.seats;
    this.selectedSection = section;
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
  this.courseService.findCourseById(this.courseId).then(course => {this.courseName = course.title});
  }

}
