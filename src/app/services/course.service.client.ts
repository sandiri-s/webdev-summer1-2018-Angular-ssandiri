export class CourseServiceClient {
  COURSE_URL = 'https://course-mngmnt-webdev-ssandiri.herokuapp.com/api/course';
  findPublicCourses() {
    return fetch(this.COURSE_URL+"/public")
      .then(response => response.json());
  }

  findAllCourses() {
    return fetch(this.COURSE_URL)
      .then(response => response.json());
  }

  findCourseById(courseId) {
    return fetch(this.COURSE_URL + '/' + courseId)
      .then(response => response.json());
  }

  updateCourse(course) {
    return fetch(this.COURSE_URL, {
      method: 'post',
      body: JSON.stringify(course),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => {
        return response.json();
      });
  }
}
