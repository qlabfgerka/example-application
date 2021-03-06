import 'dart:convert';

import 'package:flutter_frontend/models/task/task.dart';
import 'package:http/http.dart' as http;

class TaskService {
  final String hostname = "http://10.0.2.2:3000";

  Future<List<Task>> getTasks(int id) async {
    final response = await http.get(Uri.parse('$hostname/task/$id'));

    return handleListResponse(response);
  }

  Future<Task> createTask(Task task, int userId) async {
    Map<String, String> customHeaders = {"content-type": "application/json"};
    final body = {};
    body['task'] = task;
    body['userId'] = userId;
    final response = await http.post(Uri.parse('$hostname/task'),
        headers: customHeaders, body: json.encode(body));

    return handleResponse(response);
  }

  Future<void> removeTask(int taskId) async {
    await http.delete(Uri.parse('$hostname/task/$taskId'),
        body: json.encode(taskId));
  }

  Future<Task> editTask(Task task) async {
    Map<String, String> customHeaders = {"content-type": "application/json"};
    final body = {};
    body['task'] = task;

    final response = await http.put(Uri.parse('$hostname/task'),
        headers: customHeaders, body: json.encode(body));

    return handleResponse(response);
  }

  List<Task> handleListResponse(http.Response response) {
    if (response.statusCode == 200) {
      return jsonDecode(response.body)
          .map((item) => Task.fromJson(item))
          .toList()
          .cast<Task>();
    } else {
      throw Exception('Failed to load Task');
    }
  }

  Task handleResponse(http.Response response) {
    if (response.statusCode == 201 || response.statusCode == 200) {
      return Task.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to load Task');
    }
  }
}
