import { Component, OnInit } from '@angular/core';
import {CourseServiceClient} from "../services/course.service.client";
import {Course} from "../models/coruse.model.client";

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent implements OnInit {
  constructor(private service: CourseServiceClient) {

  }
  courses: Course[] = [];
  ngOnInit() {
    this.service.findAllCourses()
      .then(courses => this.courses = courses);
  }


}
