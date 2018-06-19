import { Component, OnInit } from '@angular/core';
import {User} from "../models/user.model.client";
import {UserServiceClient} from "../services/user.service.client";
import {Router} from "@angular/router";
import {SectionServiceClient} from "../services/section.service.client";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private service: UserServiceClient,
              private sectionService: SectionServiceClient,
              private router: Router) { }

  user = {};
  username;
  firstName;
  lastName;
  email;
  sections = [];

  update() {
    const user = {username : this.username, firstName: this.firstName, lastName:this.lastName, email:this.email};
    this.service.update(user).then(() => { alert("User updated"); }  );
  }

  logout() {
    this.service
      .logout()
      .then(() =>
        this.router.navigate(['login']));

  }

  unroll(section) {
    // alert(section._id);
    this.sectionService
      .unrollStudentInSection(section._id)
      .then(() => {
        this.sectionService
          .findSectionsForStudent()
          .then(sections => this.sections = sections );
      });
  }

  ngOnInit() {
    this.service
      .profile()
      .then(user =>{
        this.username = user.username;
        this.firstName= user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;});

    this.sectionService
      .findSectionsForStudent()
      .then(sections => this.sections = sections );
  }

}
