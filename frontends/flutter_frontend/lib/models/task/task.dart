class Task {
  int? id;
  final String title;
  final String description;

  Task(this.title, this.description);

  Task.withId(this.id, this.title, this.description);

  factory Task.fromJson(Map<String, dynamic> json) {
    return Task.withId(json['id'], json['title'], json['description']);
  }
}
