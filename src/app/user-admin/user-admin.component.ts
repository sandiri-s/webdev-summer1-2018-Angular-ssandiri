import { Component, OnInit } from '@angular/core';
import {CourseServiceClient} from "../services/course.service.client";
import {Course} from "../models/coruse.model.client";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent implements OnInit {
  constructor(private service: CourseServiceClient,  private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.courseId= params['courseId']);
  }
  courses: Course[] = [];
  courseId="";
  ngOnInit() {
    this.service.findAllCourses()
      .then(courses => this.courses = courses);
  }


}
