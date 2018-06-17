export class LessonServiceClient {
  findLessonsForModule(moduleId) {
    return fetch('https://course-mngmnt-webdev-ssandiri.herokuapp.com/api/module/' + moduleId + '/lesson')
      .then(response => response.json());
  }
}
