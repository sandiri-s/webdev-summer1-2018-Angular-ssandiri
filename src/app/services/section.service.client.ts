export class SectionServiceClient {

  SECTION_URL = 'http://localhost:4000/api/course/COURSEID/section';

  findSectionsForStudent() {
    const url = 'http://localhost:4000/api/student/section';
    return fetch(url, {
      credentials: 'include'
    })
      .then(response => response.json());
  }

  enrollStudentInSection(sectionId) {
    const url = 'http://localhost:4000/api/section/' + sectionId + '/enrollment';
    return fetch(url, {
      method: 'post',
      credentials: 'include'
    });
  }

  unrollStudentInSection(sectionId) {
    const url = 'http://localhost:4000/api/section/' + sectionId + '/enrollment';
    return fetch(url, {
      method: 'delete',
      credentials: 'include'
    });
  }

  findSectionsForCourse(courseId) {
    return fetch(this.SECTION_URL.replace('COURSEID', courseId))
      .then(response => response.json());
  }

  deleteSection(sectionId) {
    return fetch('http://localhost:4000/api/section' + '/' + sectionId, {
      method: 'delete'
    });
  }

  createSection(courseId, name, maxSeats) {
    const seats = maxSeats;
    const section = {courseId, name, maxSeats, seats};
    return fetch(this.SECTION_URL.replace('COURSEID', courseId), {
      method: 'post',
      body: JSON.stringify(section),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  updateSection(sectionId, newName, newMax, newRem) {
    const section = {id : sectionId, newName: newName, newMax:newMax, newRem:newRem};
    return fetch('http://localhost:4000/api/section' + '/' + sectionId, {
      method: 'put',
      body: JSON.stringify(section),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }
}
