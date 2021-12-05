import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_frontend/models/task/task.dart';
import 'package:flutter_frontend/widgets/task_form.dart';
import 'package:flutter_frontend/services/task/task.service.dart';

class EditTask extends StatefulWidget {
  final Task task;
  const EditTask({Key? key, required this.task}) : super(key: key);

  @override
  State<EditTask> createState() => _EditTaskState();
}

class _EditTaskState extends State<EditTask> {
  final TaskService taskService = TaskService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      appBar: AppBar(
        title: const Text('Tasks'),
      ),
      body: TaskForm((val) => onEditTask(val), widget.task),
    );
  }

  void onEditTask(val) {
    taskService.editTask(val);
    Navigator.pop(context);
  }
}
