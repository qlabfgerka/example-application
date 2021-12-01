class Task {
  int? id;
  String title;
  String description;

  Task(this.title, this.description);

  Task.withId(this.id, this.title, this.description);

  Map<String, dynamic> toJson() {
    return {'id': id, 'title': title, 'description': description};
  }

  factory Task.fromJson(Map<String, dynamic> json) {
    return Task.withId(json['id'], json['title'], json['description']);
  }
}
