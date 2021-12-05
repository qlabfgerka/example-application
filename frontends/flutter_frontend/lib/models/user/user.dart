import 'package:flutter_frontend/models/task/task.dart';

class User {
  int? id;
  List<Task> tasks;

  User(this.tasks);

  User.withId(this.id, this.tasks);

  factory User.fromJson(Map<String, dynamic> json) {
    return User.withId(json['id'], json['tasks'] ?? []);
  }
}
