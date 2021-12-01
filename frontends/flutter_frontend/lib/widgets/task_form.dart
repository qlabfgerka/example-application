import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_frontend/models/task/task.dart';

typedef void TaskCallback(Task task);

class TaskForm extends StatefulWidget {
  TaskCallback _callback;

  TaskForm(this._callback);

  @override
  State<TaskForm> createState() => _TaskFormState();
}

class _TaskFormState extends State<TaskForm> {
  final _formKey = GlobalKey<FormState>();
  final Task _task = Task('', '');

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Container(
        margin: const EdgeInsets.only(left: 20.0, right: 20.0, top: 15.0),
        child: Column(
          children: [
            const Text(
              'Create Task',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20.0),
            ),
            Padding(
              padding: const EdgeInsets.only(bottom: 8.0),
              child: TextFormField(
                validator: (value) {
                  if (value!.isEmpty) {
                    return "Enter a task title.";
                  }
                },
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Task title',
                ),
                onSaved: (val) => setState(() => _task.title = val!),
              ),
            ),
            TextFormField(
              validator: (value) {
                if (value!.isEmpty) {
                  return "Enter a task description.";
                }
              },
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                labelText: 'Task description',
              ),
              onSaved: (val) => setState(() => _task.description = val!),
            ),
            ElevatedButton(
                onPressed: () {
                  final form = _formKey.currentState;
                  if (form!.validate()) {
                    form.save();
                    widget._callback(_task);
                  }
                },
                child: const Text("CREATE"))
          ],
        ),
      ),
    );
  }
}
