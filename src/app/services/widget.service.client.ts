export class WidgetServiceClient {
  findWidgetsForLesson(lessonId) {
    return fetch('https://course-mngmnt-webdev-ssandiri.herokuapp.com/api/lesson/' + lessonId + '/widget')
      .then(response => response.json());
  }
}
